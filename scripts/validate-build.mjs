import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

async function walk(directory) {
  const output = [];
  for (const name of await readdir(directory)) {
    const file = path.join(directory, name);
    (await stat(file)).isDirectory() ? output.push(...await walk(file)) : output.push(file);
  }
  return output;
}

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const relativeFiles = new Set(files.map((file) => `/${path.relative(dist, file).split(path.sep).join('/')}`));
const generatedWriting = JSON.parse(await readFile(path.join(root, '.generated/data/writing.json'), 'utf8'));
const generatedSubjects = JSON.parse(await readFile(path.join(root, '.generated/data/subjects.json'), 'utf8'));
const failures = [];
const warnings = [];
let references = 0;
let redirectRoutes = 0;

function exists(url) {
  const clean = decodeURI(url.split(/[?#]/)[0]);
  if (!clean || clean === '/') return relativeFiles.has('/index.html');
  return relativeFiles.has(clean) || relativeFiles.has(`${clean.replace(/\/$/, '')}/index.html`) || relativeFiles.has(`${clean.replace(/\/$/, '')}.html`) || relativeFiles.has(`${clean}/index.html`);
}

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const route = `/${path.relative(dist, file).replaceAll(path.sep, '/').replace(/index\.html$/, '')}`;
  const redirect = /<meta[^>]+http-equiv=["']?refresh/i.test(html);
  if (redirect) redirectRoutes++;

  if (/\{%|\{\{/.test(html)) failures.push(`${route}: unresolved Liquid`);
  if (/::section-heading\{/.test(html)) failures.push(`${route}: unresolved section-heading directive`);
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${route}: missing title`);
  if (route !== '/laserprj.html' && !/<link rel="canonical" href="https:\/\/jameshoward\.us\//i.test(html)) failures.push(`${route}: missing canonical`);

  if (!redirect) {
    const h1Count = [...html.matchAll(/<h1\b/gi)].length;
    if (h1Count !== 1) failures.push(`${route}: expected one h1, found ${h1Count}`);
  }
  for (const image of html.matchAll(/<img\b([^>]*)>/gi)) if (!/\balt=/.test(image[1])) failures.push(`${route}: image without alt`);
  for (const iframe of html.matchAll(/<iframe\b([^>]*)>/gi)) if (!/\btitle=/.test(iframe[1])) failures.push(`${route}: iframe without title`);
  if (/data-footnote-ref/.test(html) && !/data-footnote-backref/.test(html)) failures.push(`${route}: footnotes lack backlinks`);

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (!reference.startsWith('/') || reference.startsWith('//')) continue;
    references++;
    if (!exists(reference)) failures.push(`${route}: missing ${reference}`);
  }
}

const required = [
  '/index.html', '/blog/index.html', '/ancestry/index.html', '/books/index.html',
  '/about-me/index.html',
  '/honors/index.html', '/media/index.html', '/service/index.html', '/software/index.html', '/teaching/index.html',
  ...generatedWriting.routes.map((route) => `/${route.replace(/^\/+|\/+$/g, '')}/index.html`),
  ...generatedSubjects.routes.map((route) => `/${route.replace(/^\/+|\/+$/g, '')}/index.html`),
  '/search/index.html', '/contact-me/index.html', '/contact-me.html', '/404.html', '/feed.xml', '/atom.xml',
  '/coat-of-arms/index.html', '/coat-of-arms/arms/index.html', '/coat-of-arms/emblazonments/index.html',
  '/coat-of-arms/insignia/index.html', '/coat-of-arms/tartan/index.html', '/coat-of-arms/records/index.html',
  '/honors/grand-duchy-of-westarctica/index.html', '/honors/royal-order-of-the-star-of-oceania/index.html',
  '/2026/09/10/githubs-ongoing-actions-outage/index.html',
  '/2024/11/03/the-evolution-of-the-royal-arms/index.html', '/2024/12/10/on-the-royal-badges/index.html',
  '/2016/07/03/runaway-trolley-never-coming-back/index.html',
  '/feed/atom.xml', '/sitemap.xml', '/sitemap-pages.xml', '/sitemap-ancestry.xml',
  '/data/search.json', '/CNAME', '/robots.txt',
];
for (const file of required) if (!relativeFiles.has(file)) failures.push(`missing required output ${file}`);
const searchIndex = await readFile(path.join(dist, 'data/search.json'), 'utf8');
if (!searchIndex.includes('"title":"Media Archive"') || !searchIndex.includes('"url":"/media/"')) failures.push('search index: missing Media Archive');
const searchRecords = JSON.parse(searchIndex);
const searchRoutes = new Set(searchRecords.map((item) => item.url));
const pagesSitemap = await readFile(path.join(dist, 'sitemap-pages.xml'), 'utf8');
if (!pagesSitemap.includes('<loc>https://jameshoward.us/media/</loc>')) failures.push('pages sitemap: missing /media/');
const mainSitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
if (!mainSitemap.includes('<loc>https://jameshoward.us/media/</loc>')) failures.push('main sitemap: missing /media/');
for (const route of generatedWriting.routes) {
  if (!searchRoutes.has(route)) failures.push(`search index: missing ${route}`);
  if (!pagesSitemap.includes(`<loc>https://jameshoward.us${route}</loc>`)) failures.push(`pages sitemap: missing ${route}`);
  if (!mainSitemap.includes(`<loc>https://jameshoward.us${route}</loc>`)) failures.push(`main sitemap: missing ${route}`);
}
for (const route of generatedSubjects.routes) {
  if (!searchRoutes.has(route)) failures.push(`search index: missing ${route}`);
  if (!pagesSitemap.includes(`<loc>https://jameshoward.us${route}</loc>`)) failures.push(`pages sitemap: missing ${route}`);
  if (!mainSitemap.includes(`<loc>https://jameshoward.us${route}</loc>`)) failures.push(`main sitemap: missing ${route}`);
}
const generatedPosts = JSON.parse(await readFile(path.join(root, '.generated/data/posts.json'), 'utf8'));
const historicalPosts = generatedPosts.filter((post) => post.historical_status);
const historicalLabels = { historical: 'Historical context', superseded: 'Superseded information', resolved: 'Resolved event', discontinued: 'Discontinued' };
for (const post of historicalPosts) {
  const route = post.route.endsWith('/') ? post.route : `${post.route}/`;
  const output = path.join(dist, route.replace(/^\//, ''), 'index.html');
  const html = await readFile(output, 'utf8');
  const notice = html.indexOf('<aside class="historical-status"');
  const content = html.indexOf('<div class="content"');
  if (notice < 0) failures.push(`${post.route}: missing historical-status notice`);
  if (notice >= 0 && content >= 0 && notice > content) failures.push(`${post.route}: historical-status notice follows article body`);
  if (!html.includes(`>${historicalLabels[post.historical_status.type]}</p>`)) failures.push(`${post.route}: missing historical-status label`);
  if (!searchRoutes.has(post.route)) failures.push(`${post.route}: historical post missing from search index`);
  if (!mainSitemap.includes(`<loc>https://jameshoward.us${post.route}</loc>`)) failures.push(`${post.route}: historical post missing from sitemap`);
}
for (const route of [
  '/2015/08/18/criticize-mars-one-but-dont-stand-in-their-way/',
  '/2016/07/04/watch-interview-mars-one-candidate-heidi-hecht/',
  '/2018/01/02/get-flu-shot/',
  '/2026/09/10/githubs-ongoing-actions-outage/',
]) {
  const html = await readFile(path.join(dist, route.replace(/^\//, ''), 'index.html'), 'utf8');
  if (html.includes('<aside class="historical-status"')) failures.push(`${route}: unmarked post rendered a historical-status notice`);
}
const rss = await readFile(path.join(dist, 'feed.xml'), 'utf8');
const atom = await readFile(path.join(dist, 'atom.xml'), 'utf8');
if (!rss.includes('<rss') || !rss.includes('<item>')) failures.push('feed.xml: invalid or empty RSS output');
if (!atom.includes('<rss') || !atom.includes('<item>')) failures.push('atom.xml: invalid or empty compatibility feed output');
if (rss.includes('https://jameshoward.us/writing/') || atom.includes('https://jameshoward.us/writing/')) failures.push('feeds: Writing landing pages were added to blog-post feeds');

const writingHub = await readFile(path.join(dist, 'writing/index.html'), 'utf8');
for (const heading of ['Selected Writing', 'Subjects', 'Series', 'Complete Blog Archive']) if (!writingHub.includes(`>${heading}</h2>`)) failures.push(`/writing/: missing ${heading} section`);
const primaryNav = writingHub.match(/<nav id="site-nav"[\s\S]*?<\/nav>/)?.[0] ?? '';
if (!primaryNav.includes('href="/writing/"') || !primaryNav.includes('>Writing</a>')) failures.push('primary navigation: missing Writing link');
if (primaryNav.includes('href="/blog/"')) failures.push('primary navigation: Blog remains alongside Writing');
if (primaryNav.includes('href="/subjects/"')) failures.push('primary navigation: Subjects was added to the destination-oriented navbar');
const blogIndex = await readFile(path.join(dist, 'blog/index.html'), 'utf8');
const firstPageCards = [...blogIndex.matchAll(/class="[^"]*\bpost-card\b/g)].length;
if (firstPageCards !== 12) failures.push(`/blog/: expected 12 archive cards, found ${firstPageCards}`);

const homepage = await readFile(path.join(dist, 'index.html'), 'utf8');
const homepageSections = ['subjects', 'work', 'elsewhere', 'blog'].map((section) => homepage.indexOf(`data-home-section="${section}"`));
if (homepageSections.some((position) => position < 0) || homepageSections.some((position, index) => index > 0 && position <= homepageSections[index - 1])) failures.push('homepage: discovery sections are missing or out of order');
if (homepage.includes('Explore My World') || homepage.includes('The working archive') || homepage.includes('jh-card--featured')) failures.push('homepage: legacy six-card destination architecture remains');
for (const subject of generatedSubjects.subjects) if (!homepage.includes(`href="${subject.route}"`)) failures.push(`homepage: missing canonical Subject ${subject.route}`);
for (const route of ['/writing/', '/scholarship/', '/books/', '/software/', '/teaching/', '/service/', '/ancestry/', '/honors/', '/coat-of-arms/', '/media/', '/blog/']) {
  if (!homepage.includes(`href="${route}"`)) failures.push(`homepage: missing destination ${route}`);
}
const homepagePostRoutes = [...homepage.matchAll(/class="card-media" href="([^"]+)"/g)].map((match) => match[1]);
if (homepagePostRoutes.length !== 3) failures.push(`homepage: expected 3 recent Blog posts, found ${homepagePostRoutes.length}`);
for (const route of homepagePostRoutes) if (!searchRecords.some((record) => record.type === 'Blog' && record.url === route)) failures.push(`homepage: recent post is not in the Blog collection: ${route}`);
const homepageJsonLd = [...homepage.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => {
  try { return JSON.parse(match[1]); } catch { return null; }
});
if (!homepageJsonLd.some((value) => value?.['@type'] === 'Person' && value.name && value.url)) failures.push('homepage: missing valid identity structured data');

const aiSeries = generatedWriting.series.find((series) => series.slug === 'history-of-artificial-intelligence');
if (!aiSeries || aiSeries.part_count !== 11) failures.push('Writing data: AI-history series must contain 11 ordered parts');
const aiSeriesHtml = await readFile(path.join(dist, 'writing/series/history-of-artificial-intelligence/index.html'), 'utf8');
if (!/<ol\b[^>]*class="[^"]*\beditorial-post-list--ordered\b/.test(aiSeriesHtml)) failures.push('AI-history series: reading sequence is not a semantic ordered list');
for (const post of aiSeries?.posts ?? []) if (!aiSeriesHtml.includes(`href="${post.route}"`)) failures.push(`AI-history series: missing part ${post.part} ${post.route}`);
const aiOpening = await readFile(path.join(dist, '2026/04/29/when-machines-learned-to-choose/index.html'), 'utf8');
if (!aiOpening.includes('class="series-context"') || !aiOpening.includes('Part 1 of 11') || !aiOpening.includes('href="/2026/05/06/when-the-theory-ran-ahead-of-the-world/"')) failures.push('AI-history opening post: incomplete series context');
const socialSecurity = await readFile(path.join(dist, '2019/05/07/social-security-policysplainer/index.html'), 'utf8');
const historicalNotice = socialSecurity.indexOf('<aside class="historical-status"');
const seriesNotice = socialSecurity.indexOf('<nav class="series-context"');
const articleContent = socialSecurity.indexOf('<div class="content"');
if (!(historicalNotice >= 0 && seriesNotice > historicalNotice && articleContent > seriesNotice)) failures.push('Social Security Policysplainer: historical notice, series context, and article body are out of order');
const ordinaryPost = await readFile(path.join(dist, '2016/07/03/runaway-trolley-never-coming-back/index.html'), 'utf8');
if (ordinaryPost.includes('class="series-context"')) failures.push('ordinary non-series post rendered series context');

const subjectIndex = await readFile(path.join(dist, 'subjects/index.html'), 'utf8');
if (!/class="[^"]*\bsubject-directory\b/.test(subjectIndex) || !subjectIndex.includes('Ways into the site by idea rather than by document type.')) failures.push('/subjects/: incomplete Subject directory');
for (const subject of generatedSubjects.subjects) {
  const html = await readFile(path.join(dist, subject.route.replace(/^\//, ''), 'index.html'), 'utf8');
  for (const group of subject.groups) {
    if (!group.items.length) failures.push(`${subject.route}: empty ${group.type} group in generated data`);
    if (!html.includes(`>${group.title}</h2>`)) failures.push(`${subject.route}: missing ${group.title} resource group`);
    for (const item of group.items) {
      const href = item.route ?? item.href;
      if (href && !html.includes(`href="${href}"`)) failures.push(`${subject.route}: missing ${group.type} resource ${item.title}`);
    }
  }
  if (subject.writing_subject && !html.includes(`href="${subject.writing_subject.route}"`)) failures.push(`${subject.route}: missing related Writing Subject link`);
}
for (const route of ['/writing/', '/scholarship/', '/books/', '/software/', '/teaching/']) {
  const html = await readFile(path.join(dist, route.replace(/^\//, ''), 'index.html'), 'utf8');
  if (!html.includes('class="subject-links"')) failures.push(`${route}: missing destination Subject links`);
}

const representativeChecks = [
  ['/index.html', '/teaching/'],
  ['/about-me/index.html', 'class="recognition-list"'],
  ['/media/index.html', '>Media Archive</h1>'],
  ['/media/index.html', 'id="interviews_appearances"'],
  ['/media/index.html', 'id="quoted_consulted"'],
  ['/media/index.html', 'id="profiles_coverage"'],
  ['/books/computational-methods-numerical-analysis-r/index.html', 'class="book-detail"'],
  ['/service/maryland-defense-force/index.html', 'data-ribbon-type="personal"'],
  ['/coat-of-arms/index.html', 'class="content-preface"'],
  ['/coat-of-arms/arms/index.html', 'id="blazon"'],
  ['/coat-of-arms/arms/index.html', 'id="canonical-emblazonment"'],
  ['/coat-of-arms/arms/index.html', 'Eckbert'],
  ['/coat-of-arms/emblazonments/index.html', 'id="additional-emblazonments"'],
  ['/coat-of-arms/insignia/index.html', 'id="english-heraldic-badges"'],
  ['/coat-of-arms/tartan/index.html', 'id="tartan"'],
  ['/coat-of-arms/records/index.html', 'id="american-armigers"'],
  ['/2020/05/31/the-lotka-volterra-equations/index.html', 'class="katex-display"'],
  ['/2026/06/25/neurons-all-the-way-down/index.html', 'data-footnote-backref'],
  ['/2026/09/10/githubs-ongoing-actions-outage/index.html', '<code>workflow_dispatch</code>'],
  ['/2026/09/10/githubs-ongoing-actions-outage/index.html', 'Thursday, September 10, 2026'],
];
for (const [file, pattern] of representativeChecks) {
  const html = await readFile(path.join(dist, file), 'utf8');
  if (!html.includes(pattern)) failures.push(`${file}: missing representative rendering ${pattern}`);
}

for (const [file, title] of [
  ['/coat-of-arms/index.html', 'The Grant'],
  ['/coat-of-arms/arms/index.html', 'The Arms'],
  ['/coat-of-arms/emblazonments/index.html', 'Emblazonments'],
  ['/coat-of-arms/insignia/index.html', 'Derived Devices & Insignia'],
  ['/coat-of-arms/tartan/index.html', 'Tartan'],
  ['/coat-of-arms/records/index.html', 'Other Records & Registrations'],
]) {
  const html = await readFile(path.join(dist, file), 'utf8');
  const encodedTitle = title.replaceAll('&', '&amp;');
  const escaped = encodedTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const headings = [...html.matchAll(new RegExp(`<h[12][^>]*>${escaped}<\\/h[12]>`, 'g'))].length;
  if (headings !== 1) failures.push(`${file}: expected page title once across h1/h2, found ${headings}`);
}

const contactAlias = await readFile(path.join(dist, 'contact-me.html'), 'utf8');
if (!contactAlias.includes('url=/contact-me/')) failures.push('/contact-me.html: does not redirect to /contact-me/');
if (relativeFiles.has('/contact-source/index.html')) failures.push('/contact-source/: accidental route remains');

for (const alias of ['/coa/index.html', '/malta/index.html', '/honors/grant-of-arms/index.html']) {
  const html = await readFile(path.join(dist, alias), 'utf8');
  if (!html.includes('url=/coat-of-arms/')) failures.push(`${alias}: does not redirect to the grant`);
}
const tartanAlias = await readFile(path.join(dist, 'tartan/index.html'), 'utf8');
if (!tartanAlias.includes('url=/coat-of-arms/tartan/')) failures.push('/tartan/: does not redirect to the tartan chapter');

for (const [alias, target] of [
  ['/westarctica/index.html', '/honors/grand-duchy-of-westarctica/'],
  ['/honors/westarctica/index.html', '/honors/grand-duchy-of-westarctica/'],
  ['/hawaii/index.html', '/honors/royal-order-of-the-star-of-oceania/'],
  ['/honors/hawaii/index.html', '/honors/royal-order-of-the-star-of-oceania/'],
  ['/honors/kingdom-of-hawaii/index.html', '/honors/royal-order-of-the-star-of-oceania/'],
]) {
  const html = await readFile(path.join(dist, alias), 'utf8');
  if (!html.includes(`url=${target}`)) failures.push(`${alias}: does not redirect to ${target}`);
}

const headerSource = await readFile(path.join(root, 'src/components/SiteHeader.astro'), 'utf8');
for (const pattern of ['Math.min(260, Math.max(160, window.innerHeight * .25))', 'background:#303030', 'background-color .5s', 'border-color .5s', 'box-shadow .5s', "addEventListener('pageshow'", '@media(prefers-reduced-motion:reduce)']) {
  if (!headerSource.includes(pattern)) failures.push(`SiteHeader: missing behavior contract ${pattern}`);
}
if (/transition\s*:\s*all\b/.test(headerSource)) failures.push('SiteHeader: uses transition: all');
const heroTokens = await readFile(path.join(root, 'src/styles/tokens.css'), 'utf8');
if (!heroTokens.includes('--hero-overlay: rgb(48 48 48 / 90%)')) failures.push('hero: uniform charcoal overlay token changed');

const routeLedger = JSON.parse(await readFile(path.join(root, '.generated/data/route-ledger.json'), 'utf8'));
for (const route of ['/contact-me', '/contact-me/', '/contact-me.html', '/media', '/media/']) if (!routeLedger.routes.some((item) => item.route === route)) failures.push(`route ledger: missing ${route}`);
for (const route of generatedWriting.routes) if (!routeLedger.routes.some((item) => item.route === route && item.source === '_data/writing.yml')) failures.push(`route ledger: missing Writing route ${route}`);
for (const route of generatedSubjects.routes) if (!routeLedger.routes.some((item) => item.route === route && item.source === '_data/subjects.yml')) failures.push(`route ledger: missing Subject route ${route}`);

const generatedSite = JSON.parse(await readFile(path.join(root, '.generated/data/site.json'), 'utf8'));
const mediaRecords = generatedSite.media ?? [];
if (mediaRecords.length !== 26) failures.push(`media archive: expected 26 distinct records, found ${mediaRecords.length}`);
if (new Set(mediaRecords.map((item) => item.id)).size !== mediaRecords.length) failures.push('media archive: duplicate record IDs');
for (const [category, expected] of Object.entries({ interviews_appearances: 8, quoted_consulted: 15, profiles_coverage: 3 })) {
  const found = mediaRecords.filter((item) => item.category === category).length;
  if (found !== expected) failures.push(`media archive: expected ${expected} ${category} records, found ${found}`);
}
for (const item of mediaRecords) for (const field of ['id', 'date', 'title', 'outlet', 'category']) if (!item[field]) failures.push(`media archive: ${item.id ?? 'unknown'} missing ${field}`);

const unique = [...new Set(failures)];
console.log(JSON.stringify({ html_routes: htmlFiles.length, redirect_routes: redirectRoutes, static_files: files.length, local_references: references, errors: unique.length, warnings: warnings.length }, null, 2));
if (warnings.length) console.warn(warnings.slice(0, 20).join('\n'));
if (unique.length) {
  console.error(unique.slice(0, 100).join('\n'));
  process.exit(1);
}
