import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

async function walk(directory) {
  const files = [];
  for (const name of await readdir(directory)) {
    const file = path.join(directory, name);
    (await stat(file)).isDirectory() ? files.push(...await walk(file)) : files.push(file);
  }
  return files;
}

function routeForFile(dist, file) {
  const relative = `/${path.relative(dist, file).split(path.sep).join('/')}`;
  if (relative === '/index.html') return '/';
  if (relative.endsWith('/index.html')) return relative.slice(0, -'index.html'.length);
  return relative;
}

export function classifyNavigationRoute(route) {
  if (route === '/') return 'homepage';
  if (route === '/404.html') return '404';
  if (route === '/search/') return 'search';
  if (/^\/(terms-of-use|privacy-and-cookie-notice|copyright|disclosure-statement)\/$/.test(route)) return 'legal/notices';
  if (route === '/writing/') return 'Writing hub/index';
  if (route === '/writing/subjects/' || route === '/writing/series/') return 'Writing index';
  if (route.startsWith('/writing/subjects/')) return 'Writing Subject';
  if (route.startsWith('/writing/series/')) return 'Writing Series';
  if (route === '/subjects/') return 'destination index';
  if (route.startsWith('/subjects/')) return 'site-wide Subject';
  if (route === '/blog/' || route.startsWith('/blog/page/')) return 'Blog archive/pagination';
  if (route.startsWith('/tag/')) return 'tag archive';
  if (/^\/\d{4}\/\d{2}\/\d{2}\//.test(route)) return 'Blog post';
  if (route === '/ancestry/') return 'destination index';
  if (route.startsWith('/ancestry/')) return 'ancestry record';
  if (route === '/honors/') return 'primary destination';
  if (route.startsWith('/honors/')) return 'honor/detail record';
  if (route === '/coat-of-arms/' || route.startsWith('/coat-of-arms/')) return 'Coat of Arms section';
  if (route === '/books/') return 'primary destination';
  if (route.startsWith('/books/')) return 'book detail';
  if (route === '/service/') return 'primary destination';
  if (route.startsWith('/service/')) return 'service detail';
  if (['/about-me/', '/scholarship/', '/teaching/', '/software/', '/media/', '/consulting/', '/contact-me/'].includes(route)) return 'primary destination';
  return 'other permanent page';
}

export function parentRouteFor(route) {
  const nestedBook = route.match(/^\/books\/([^/]+)\/.+\/$/);
  if (nestedBook) return `/books/${nestedBook[1]}/`;
  if (/^\/\d{4}\/\d{2}\/\d{2}\//.test(route)) return '/blog/';
  if (route.startsWith('/ancestry/') && route !== '/ancestry/') return '/ancestry/';
  if (route.startsWith('/honors/') && route !== '/honors/') return '/honors/';
  if (route.startsWith('/coat-of-arms/') && route !== '/coat-of-arms/') return '/coat-of-arms/';
  if (route.startsWith('/books/') && route !== '/books/') return '/books/';
  if (route.startsWith('/service/') && route !== '/service/') return '/service/';
  if (route.startsWith('/games/') && route !== '/games/') return '/games/';
  if (route.startsWith('/subjects/') && route !== '/subjects/') return '/subjects/';
  if (route.startsWith('/writing/subjects/') && route !== '/writing/subjects/') return '/writing/subjects/';
  if (route.startsWith('/writing/series/') && route !== '/writing/series/') return '/writing/series/';
  return undefined;
}

function normalizeInternalHref(href) {
  if (href.startsWith('https://jameshoward.us/')) return new URL(href).pathname;
  if (!href.startsWith('/') || href.startsWith('//')) return undefined;
  return href.split(/[?#]/)[0] || '/';
}

function resolveRoute(href, routes) {
  const pathname = normalizeInternalHref(href);
  if (!pathname) return undefined;
  const candidates = [pathname, pathname.endsWith('/') ? pathname.slice(0, -1) : `${pathname}/`];
  return candidates.find((candidate) => routes.has(candidate));
}

export async function buildNavigationGraph(dist) {
  const htmlFiles = (await walk(dist)).filter((file) => file.endsWith('.html'));
  const documents = new Map();
  let redirectCount = 0;

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    if (/<meta[^>]+http-equiv=["']?refresh/i.test(html)) {
      redirectCount++;
      continue;
    }
    documents.set(routeForFile(dist, file), html);
  }

  const routes = new Set(documents.keys());
  const outbound = new Map([...routes].map((route) => [route, new Set()]));
  const inbound = new Map([...routes].map((route) => [route, new Set()]));
  let edgeCount = 0;

  for (const [route, html] of documents) {
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
      const target = resolveRoute(match[1], routes);
      if (!target || target === route || outbound.get(route).has(target)) continue;
      outbound.get(route).add(target);
      inbound.get(target).add(route);
      edgeCount++;
    }
  }

  const reachable = new Set(['/']);
  const queue = ['/'];
  while (queue.length > 0) {
    const route = queue.shift();
    for (const target of outbound.get(route) ?? []) {
      if (reachable.has(target)) continue;
      reachable.add(target);
      queue.push(target);
    }
  }

  const detailRoutes = [...routes].filter((route) => parentRouteFor(route));
  const parentCoverage = detailRoutes.map((route) => {
    const parent = parentRouteFor(route);
    const sources = inbound.get(route);
    const covered = classifyNavigationRoute(route) === 'Blog post'
      ? [...sources].some((source) => classifyNavigationRoute(source) === 'Blog archive/pagination')
      : sources.has(parent);
    return { route, parent, covered };
  });

  const classCounts = {};
  for (const route of routes) {
    const classification = classifyNavigationRoute(route);
    classCounts[classification] = (classCounts[classification] ?? 0) + 1;
  }

  return {
    documents,
    routes,
    outbound,
    inbound,
    reachable,
    redirectCount,
    edgeCount,
    classCounts,
    zeroInbound: [...routes].filter((route) => inbound.get(route).size === 0).sort(),
    unreachable: [...routes].filter((route) => !reachable.has(route)).sort(),
    parentCoverage,
  };
}

export function navigationGraphSummary(graph) {
  return {
    canonical_html_routes: graph.routes.size,
    redirect_routes: graph.redirectCount,
    unique_internal_route_edges: graph.edgeCount,
    classifications: graph.classCounts,
    parent_relationships: {
      total: graph.parentCoverage.length,
      covered: graph.parentCoverage.filter((item) => item.covered).length,
      missing: graph.parentCoverage.filter((item) => !item.covered),
    },
    zero_inbound: graph.zeroInbound,
    unreachable_from_home: graph.unreachable,
  };
}
