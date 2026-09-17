import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { buildNavigationGraph, navigationGraphSummary } from './lib/navigation-graph.mjs';
import {
  SITE_ORIGIN,
  attr,
  elements,
  hasRel,
  idsInDocument,
  isSameSiteUrl,
  parseHtml,
  resolveUrl,
  routeForFile,
  routeForUrl,
  safeDecodePath,
  staticPathForUrl,
  textContent,
  walk,
} from './lib/html-site.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
const allFiles = await walk(dist);
const htmlFiles = allFiles.filter((file) => file.endsWith('.html'));
const relativeFiles = new Set(allFiles.map((file) => `/${path.relative(dist, file).split(path.sep).join('/')}`));
const allRoutes = new Set(htmlFiles.map((file) => routeForFile(dist, file)));
const documents = new Map();
const redirects = new Map();
const failures = [];
const warnings = [];
const addFailure = (type, route, detail) => failures.push({ type, route, detail });
const addWarning = (type, route, detail) => warnings.push({ type, route, detail });

function normalizedText(node) {
  return textContent(node).replace(/\s+/g, ' ').trim();
}

function metaContent(document, selectorName, selectorValue) {
  return elements(document, (node) => node.tagName === 'meta' && attr(node, selectorName)?.toLowerCase() === selectorValue.toLowerCase())
    .map((node) => attr(node, 'content') ?? '');
}

function fragmentValue(url) {
  if (!url.hash || url.hash === '#') return undefined;
  try {
    return decodeURIComponent(url.hash.slice(1));
  } catch {
    return url.hash.slice(1);
  }
}

function routeCandidate(url, routes = allRoutes) {
  return routeForUrl(url, routes);
}

function hasAncestor(node, tagName) {
  for (let current = node.parentNode; current; current = current.parentNode) if (current.tagName === tagName) return true;
  return false;
}

function classifySourceRoute(route) {
  if (!/^\/\d{4}\/\d{2}\/\d{2}\//.test(route)) return 'permanent';
  const year = Number(route.slice(1, 5));
  return year >= 2025 ? 'recent-blog' : 'historical-blog';
}

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const route = routeForFile(dist, file);
  const document = parseHtml(html);
  const refresh = elements(document, (node) => node.tagName === 'meta' && attr(node, 'http-equiv')?.toLowerCase() === 'refresh')[0];
  if (refresh) {
    const target = (attr(refresh, 'content') ?? '').match(/(?:^|;)\s*url\s*=\s*(.+)$/i)?.[1]?.trim().replace(/^['"]|['"]$/g, '');
    redirects.set(route, target);
    continue;
  }
  const ids = idsInDocument(document);
  documents.set(route, { route, file, html, document, ids });
}

const canonicalRoutes = new Set(documents.keys());
const titleRoutes = new Map();
const internalFailures = [];
const fragmentFailures = [];
const redirectLinks = [];
const deliberateRedirectContentLinks = new Set([
  '/books/teaching-learning-mathematics-online/call-for-proposals/ -> /tlmo/',
  '/teaching-learning-mathematics-online/second-edition-call-for-proposals/ -> /tlmo/cfp2e/',
]);
const externalLinks = new Map();
const headingJumps = [];
const tablesWithoutHeaders = [];
const veryShortPages = [];
const pageLengths = [];
let internalReferences = 0;
let fragmentReferences = 0;
let imagesChecked = 0;
let externalReferences = 0;
let sourceAssetLeaks = 0;

for (const [route, entry] of documents) {
  const { document, html, ids } = entry;
  const nodes = elements(document);
  const titleNodes = nodes.filter((node) => node.tagName === 'title');
  const title = titleNodes.length === 1 ? normalizedText(titleNodes[0]) : '';
  if (titleNodes.length !== 1 || !title) addFailure('title', route, `expected one nonempty title, found ${titleNodes.length}`);
  if (title) {
    if (!titleRoutes.has(title)) titleRoutes.set(title, []);
    titleRoutes.get(title).push(route);
  }

  const descriptions = metaContent(document, 'name', 'description');
  if (descriptions.length !== 1 || !descriptions[0].trim()) addFailure('description', route, `expected one nonempty meta description, found ${descriptions.length}`);
  else if (descriptions[0].length > 320) addWarning('description', route, `${descriptions[0].length} characters`);

  const canonicals = nodes.filter((node) => node.tagName === 'link' && hasRel(node, 'canonical')).map((node) => attr(node, 'href'));
  const expectedCanonical = `${SITE_ORIGIN}${route}`;
  if (canonicals.length !== 1) addFailure('canonical', route, `expected one canonical, found ${canonicals.length}`);
  else if (canonicals[0] !== expectedCanonical) addFailure('canonical', route, `expected ${expectedCanonical}, found ${canonicals[0]}`);

  for (const [property, expected] of [['og:title', title], ['og:description', descriptions[0]], ['og:url', expectedCanonical]]) {
    const values = metaContent(document, 'property', property);
    if (values.length !== 1 || !values[0]) addFailure('open-graph', route, `expected one ${property}`);
    else if (property === 'og:url' && values[0] !== expected) addFailure('open-graph', route, `${property} is ${values[0]}`);
  }
  const ogImages = metaContent(document, 'property', 'og:image');
  if (ogImages.length !== 1 || !ogImages[0]) addFailure('open-graph', route, 'expected one og:image');
  else {
    const imageUrl = resolveUrl(ogImages[0], route);
    if (!imageUrl || !staticPathForUrl(imageUrl, relativeFiles)) addFailure('open-graph', route, `missing social image ${ogImages[0]}`);
  }

  const jsonLdNodes = nodes.filter((node) => node.tagName === 'script' && attr(node, 'type') === 'application/ld+json');
  for (const node of jsonLdNodes) {
    try { JSON.parse(textContent(node)); } catch (error) { addFailure('json-ld', route, error.message); }
  }

  const headings = nodes.filter((node) => /^h[1-6]$/.test(node.tagName));
  const h1s = headings.filter((node) => node.tagName === 'h1');
  if (h1s.length !== 1) addFailure('heading', route, `expected one h1, found ${h1s.length}`);
  for (let index = 1; index < headings.length; index++) {
    const previous = Number(headings[index - 1].tagName[1]);
    const current = Number(headings[index].tagName[1]);
    if (current > previous + 1) headingJumps.push({ route, from: headings[index - 1].tagName, to: headings[index].tagName, text: normalizedText(headings[index]).slice(0, 100) });
  }
  if (h1s.length === 1) {
    const h1Index = headings.indexOf(h1s[0]);
    const next = headings[h1Index + 1];
    if (next?.tagName === 'h2' && normalizedText(next).toLowerCase() === normalizedText(h1s[0]).toLowerCase()) addWarning('heading', route, 'page title immediately repeated as h2');
  }

  const duplicateIds = new Map();
  for (const node of nodes) {
    const id = attr(node, 'id');
    if (id) duplicateIds.set(id, (duplicateIds.get(id) ?? 0) + 1);
  }
  for (const [id, count] of duplicateIds) if (count > 1) addFailure('duplicate-id', route, `${id} appears ${count} times`);

  for (const image of nodes.filter((node) => node.tagName === 'img')) {
    imagesChecked++;
    if (attr(image, 'alt') === undefined) addFailure('image-alt', route, attr(image, 'src') ?? '(no src)');
  }
  for (const iframe of nodes.filter((node) => node.tagName === 'iframe')) if (!attr(iframe, 'title')) addFailure('iframe-title', route, attr(iframe, 'src') ?? '(no src)');

  const navs = nodes.filter((node) => node.tagName === 'nav');
  const navLabels = [];
  for (const nav of navs) {
    const label = attr(nav, 'aria-label') ?? attr(nav, 'aria-labelledby');
    if (!label) addFailure('navigation-label', route, 'navigation landmark has no accessible label');
    else navLabels.push(label);
  }
  for (const label of new Set(navLabels)) if (navLabels.filter((item) => item === label).length > 1) addFailure('navigation-label', route, `duplicate navigation label: ${label}`);
  if (nodes.filter((node) => node.tagName === 'main').length !== 1) addFailure('landmark', route, 'expected exactly one main landmark');

  for (const link of nodes.filter((node) => node.tagName === 'a' && attr(node, 'aria-current') === 'page')) {
    const href = attr(link, 'href');
    const url = resolveUrl(href, route);
    const target = url ? routeCandidate(url, canonicalRoutes) : undefined;
    if (target !== route) addFailure('aria-current', route, `${href} resolves to ${target ?? 'no canonical route'}`);
  }

  for (const table of nodes.filter((node) => node.tagName === 'table')) {
    if (!elements(table, (node) => node.tagName === 'th').length) tablesWithoutHeaders.push({ route, preview: normalizedText(table).slice(0, 120) });
  }

  const main = nodes.find((node) => node.tagName === 'main');
  const contentCharacters = main ? normalizedText(main).length : 0;
  pageLengths.push({ route, html_bytes: Buffer.byteLength(html), content_characters: contentCharacters, headings: headings.length });
  if (contentCharacters < 160) veryShortPages.push({ route, content_characters: contentCharacters });
  if (html.includes('source-assets/')) {
    sourceAssetLeaks++;
    addFailure('source-assets', route, 'non-public source-assets path leaked into generated HTML');
  }

  const urlAttributes = [
    ['a', 'href'], ['area', 'href'], ['link', 'href'], ['img', 'src'], ['script', 'src'], ['iframe', 'src'],
    ['source', 'src'], ['video', 'src'], ['video', 'poster'], ['audio', 'src'], ['object', 'data'], ['embed', 'src'], ['form', 'action'],
  ];
  for (const [tagName, attribute] of urlAttributes) {
    for (const node of nodes.filter((item) => item.tagName === tagName && attr(item, attribute))) {
      const raw = attr(node, attribute);
      const url = resolveUrl(raw, route);
      if (!url || !['http:', 'https:'].includes(url.protocol)) continue;
      if (!isSameSiteUrl(url)) {
        if (tagName === 'a') {
          externalReferences++;
          const clean = url.href.split('#')[0];
          if (!externalLinks.has(clean)) externalLinks.set(clean, new Set());
          externalLinks.get(clean).add(route);
        }
        continue;
      }
      internalReferences++;
      const staticPath = staticPathForUrl(url, relativeFiles);
      if (!staticPath) {
        const failure = { source: route, attribute, target: raw };
        internalFailures.push(failure);
        continue;
      }
      if (tagName === 'a') {
        const targetRoute = routeCandidate(url, allRoutes);
        if (targetRoute && redirects.has(targetRoute)) redirectLinks.push({ source: route, target: targetRoute, in_navigation: hasAncestor(node, 'nav'), source_type: classifySourceRoute(route) });
        const fragment = fragmentValue(url);
        if (fragment) {
          fragmentReferences++;
          const targetCanonical = routeCandidate(url, canonicalRoutes);
          const targetDocument = targetCanonical ? documents.get(targetCanonical) : undefined;
          if (!targetDocument?.ids.has(fragment)) fragmentFailures.push({ source: route, target: raw, resolved_route: targetCanonical });
        }
      }
    }
  }

  for (const node of nodes.filter((item) => ['img', 'source'].includes(item.tagName) && attr(item, 'srcset'))) {
    for (const candidate of attr(node, 'srcset').split(',').map((item) => item.trim().split(/\s+/)[0]).filter(Boolean)) {
      const url = resolveUrl(candidate, route);
      if (!url || !isSameSiteUrl(url)) continue;
      internalReferences++;
      if (!staticPathForUrl(url, relativeFiles)) internalFailures.push({ source: route, attribute: 'srcset', target: candidate });
    }
  }
}

for (const item of internalFailures) addFailure('internal-reference', item.source, `${item.attribute}=${item.target}`);
for (const item of fragmentFailures) addFailure('fragment', item.source, item.target);
for (const item of redirectLinks.filter((link) => link.in_navigation)) addFailure('redirect-navigation', item.source, item.target);
for (const item of redirectLinks.filter((link) => !link.in_navigation && link.source_type === 'permanent')) {
  if (!deliberateRedirectContentLinks.has(`${item.source} -> ${item.target}`)) addWarning('redirect-link', item.source, item.target);
}
for (const jump of headingJumps) addWarning('heading-jump', jump.route, `${jump.from} to ${jump.to}: ${jump.text}`);
for (const table of tablesWithoutHeaders) addWarning('table-semantics', table.route, table.preview);
for (const [title, routes] of titleRoutes) if (routes.length > 1) addWarning('duplicate-title', routes.join(', '), title);

for (const [route, rawTarget] of redirects) {
  const url = resolveUrl(rawTarget, route);
  if (!url || !isSameSiteUrl(url)) continue;
  const targetRoute = routeCandidate(url, allRoutes);
  if (!targetRoute) addFailure('redirect-target', route, rawTarget ?? '(missing)');
  else if (redirects.has(targetRoute)) addFailure('redirect-chain', route, `${targetRoute} -> ${redirects.get(targetRoute)}`);
}

const sitemapFiles = ['sitemap.xml', 'sitemap-pages.xml', 'sitemap-ancestry.xml'];
const sitemapCounts = {};
const sitemapLocations = new Set();
for (const name of sitemapFiles) {
  const xml = await readFile(path.join(dist, name), 'utf8');
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replaceAll('&amp;', '&'));
  sitemapCounts[name] = locations.length;
  for (const location of locations) sitemapLocations.add(location);
  for (const location of locations) {
    const url = resolveUrl(location, '/');
    const target = url ? routeCandidate(url, canonicalRoutes) : undefined;
    if (!target) addFailure('sitemap', name, `noncanonical or missing ${location}`);
  }
}
for (const [route, entry] of documents) {
  const robots = metaContent(entry.document, 'name', 'robots').join(',').toLowerCase();
  const expected = `${SITE_ORIGIN}${route}`;
  if (!robots.includes('noindex') && !sitemapLocations.has(expected) && !route.startsWith('/archive/')) addWarning('sitemap-coverage', route, 'indexable page is absent from all sitemaps');
}

const robotsTxt = await readFile(path.join(dist, 'robots.txt'), 'utf8');
if (!/sitemap:\s*https:\/\/jameshoward\.us\/sitemap\.xml/i.test(robotsTxt)) addFailure('robots', '/robots.txt', 'missing canonical sitemap declaration');
if (robotsTxt.includes('source-assets')) addFailure('robots', '/robots.txt', 'source-assets should not exist in deployment policy');

const rss = await readFile(path.join(dist, 'feed.xml'), 'utf8');
const atom = await readFile(path.join(dist, 'atom.xml'), 'utf8');
const feedCounts = {
  rss_items: [...rss.matchAll(/<item>/g)].length,
  atom_compatibility_items: [...atom.matchAll(/<item>/g)].length,
};
if (!rss.startsWith('<?xml') || !rss.includes('<rss')) addFailure('feed', '/feed.xml', 'invalid RSS envelope');
if (!atom.startsWith('<?xml') || !atom.includes('<rss')) addFailure('feed', '/atom.xml', 'invalid compatibility-feed envelope');

const navigationGraph = await buildNavigationGraph(dist);
const deploymentBytes = (await Promise.all(allFiles.map((file) => stat(file)))).reduce((total, item) => total + item.size, 0);
const generatedPosts = JSON.parse(await readFile(path.join(root, '.generated/data/posts.json'), 'utf8'));
const generatedWriting = JSON.parse(await readFile(path.join(root, '.generated/data/writing.json'), 'utf8'));
const generatedSubjects = JSON.parse(await readFile(path.join(root, '.generated/data/subjects.json'), 'utf8'));
const countsByType = (items) => Object.fromEntries([...new Set(items.map((item) => item.type))].sort().map((type) => [type, items.filter((item) => item.type === type).length]));

const summary = {
  generated_at: new Date().toISOString(),
  deployment_bytes: deploymentBytes,
  static_files: allFiles.length,
  html_routes: allRoutes.size,
  canonical_html_routes: canonicalRoutes.size,
  redirects: redirects.size,
  internal_references_checked: internalReferences,
  broken_internal_references: internalFailures.length,
  fragment_references_checked: fragmentReferences,
  fragment_failures: fragmentFailures.length,
  links_to_redirects: {
    total: redirectLinks.length,
    navigation: redirectLinks.filter((item) => item.in_navigation).length,
    permanent_content: redirectLinks.filter((item) => !item.in_navigation && item.source_type === 'permanent').length,
    deliberate_permanent_content: redirectLinks.filter((item) => deliberateRedirectContentLinks.has(`${item.source} -> ${item.target}`)).length,
    recent_blog: redirectLinks.filter((item) => item.source_type === 'recent-blog').length,
    historical_blog: redirectLinks.filter((item) => item.source_type === 'historical-blog').length,
  },
  external_links: { references: externalReferences, unique: externalLinks.size },
  images_checked: imagesChecked,
  heading_jumps: headingJumps.length,
  tables_without_headers: tablesWithoutHeaders.length,
  source_asset_leaks: sourceAssetLeaks,
  sitemap_counts: sitemapCounts,
  feed_counts: feedCounts,
  publication_counts: {
    source_blog_posts: generatedPosts.length,
    published_blog_posts: generatedPosts.filter((post) => post.published !== false).length,
    unpublished_blog_posts: generatedPosts.filter((post) => post.published === false).length,
    ancestry_records: navigationGraph.classCounts['ancestry record'],
    writing_selections: generatedWriting.selected.length,
    writing_subjects: generatedWriting.subjects.length,
    writing_series: generatedWriting.series.length,
    site_wide_subjects: generatedSubjects.subjects.length,
    historical_status_notices: generatedPosts.filter((post) => post.historical_status).length,
  },
  navigation: navigationGraphSummary(navigationGraph),
  shortest_pages: veryShortPages.sort((a, b) => a.content_characters - b.content_characters).slice(0, 15),
  longest_pages: pageLengths.sort((a, b) => b.content_characters - a.content_characters).slice(0, 15),
  failures: failures.length,
  warnings: warnings.length,
  failure_types: countsByType(failures),
  warning_types: countsByType(warnings),
  failure_details: failures.slice(0, 200),
  warning_details: warnings.slice(0, 200),
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exitCode = 1;
