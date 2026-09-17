import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { EnvHttpProxyAgent, setGlobalDispatcher } from 'undici';
import { attr, elements, isSameSiteUrl, parseHtml, resolveUrl, routeForFile, walk } from './lib/html-site.mjs';

setGlobalDispatcher(new EnvHttpProxyAgent());

const root = process.cwd();
const dist = path.join(root, 'dist');
const timeoutMs = Number(process.env.EXTERNAL_LINK_TIMEOUT_MS ?? 10_000);
const globalConcurrency = Number(process.env.EXTERNAL_LINK_CONCURRENCY ?? 12);
const perHostConcurrency = Number(process.env.EXTERNAL_LINK_HOST_CONCURRENCY ?? 2);
const links = new Map();

for (const file of (await walk(dist)).filter((item) => item.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  const document = parseHtml(html);
  if (elements(document, (node) => node.tagName === 'meta' && attr(node, 'http-equiv')?.toLowerCase() === 'refresh').length) continue;
  const route = routeForFile(dist, file);
  for (const link of elements(document, (node) => node.tagName === 'a' && attr(node, 'href'))) {
    const url = resolveUrl(attr(link, 'href'), route);
    if (!url || !['http:', 'https:'].includes(url.protocol) || isSameSiteUrl(url)) continue;
    url.hash = '';
    const key = url.href;
    if (!links.has(key)) links.set(key, new Set());
    links.get(key).add(route);
  }
}

const shardCount = Number(process.env.EXTERNAL_LINK_SHARD_COUNT ?? 1);
const shardIndex = Number(process.env.EXTERNAL_LINK_SHARD_INDEX ?? 0);
if (!Number.isInteger(shardCount) || shardCount < 1 || !Number.isInteger(shardIndex) || shardIndex < 0 || shardIndex >= shardCount) throw new Error('Invalid external-link shard configuration');
const hostShard = (url) => [...new URL(url).hostname].reduce((hash, character) => ((hash * 31) + character.codePointAt(0)) >>> 0, 0) % shardCount;
const selectedLinks = [...links.keys()].filter((url) => hostShard(url) === shardIndex);
process.stderr.write(`Checking ${selectedLinks.length}/${links.size} unique external URLs (shard ${shardIndex + 1}/${shardCount}, global concurrency ${globalConcurrency}, per-host ${perHostConcurrency}, timeout ${timeoutMs} ms).\n`);

function routeClass(routes) {
  if ([...routes].some((route) => !/^\/\d{4}\/\d{2}\/\d{2}\//.test(route))) return 'current-permanent';
  if ([...routes].some((route) => Number(route.slice(1, 5)) >= 2025)) return 'recent-blog';
  return 'historical-blog';
}

function errorClass(error) {
  if (error?.name === 'TimeoutError' || error?.name === 'AbortError') return 'timeout';
  const message = String(error?.cause?.code ?? error?.message ?? error);
  if (/ENOTFOUND|EAI_AGAIN|dns/i.test(message)) return 'dns-failure';
  if (/CERT|TLS|SSL/i.test(message)) return 'tls-failure';
  return 'network-failure';
}

async function request(url, method) {
  return fetch(url, {
    method,
    redirect: 'follow',
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      'user-agent': 'JamesHoward.us final acceptance audit (+https://jameshoward.us)',
      ...(method === 'GET' ? { range: 'bytes=0-0' } : {}),
    },
  });
}

async function check(url) {
  try {
    let response = await request(url, 'HEAD');
    if ([400, 404, 405, 406, 410, 500, 501].includes(response.status)) response = await request(url, 'GET');
    const status = response.status;
    let classification = 'other-http';
    if (status >= 200 && status < 300) classification = response.url !== url ? 'redirected-success' : 'success';
    else if ([401, 403, 429].includes(status)) classification = 'blocked-or-rate-limited';
    else if ([404, 410].includes(status)) classification = 'not-found';
    else if (status >= 500) classification = 'server-error';
    else if (status >= 300 && status < 400) classification = 'redirect-unresolved';
    return { url, status, final_url: response.url, classification };
  } catch (error) {
    return { url, status: null, final_url: null, classification: errorClass(error), error: String(error?.cause?.code ?? error?.message ?? error) };
  }
}

const queue = [...selectedLinks];
const queueTotal = queue.length;
const activeByHost = new Map();
const results = [];
let active = 0;

await new Promise((resolve) => {
  const schedule = () => {
    if (!queue.length && active === 0) return resolve();
    let progressed = true;
    while (active < globalConcurrency && queue.length && progressed) {
      progressed = false;
      for (let index = 0; index < queue.length && active < globalConcurrency; index++) {
        const url = queue[index];
        const host = new URL(url).hostname;
        if ((activeByHost.get(host) ?? 0) >= perHostConcurrency) continue;
        queue.splice(index, 1);
        index--;
        progressed = true;
        active++;
        activeByHost.set(host, (activeByHost.get(host) ?? 0) + 1);
        check(url).then((result) => {
          results.push(result);
          if (results.length % 100 === 0 || results.length === queueTotal) process.stderr.write(`Checked ${results.length}/${queueTotal} external URLs.\n`);
        }).finally(() => {
          active--;
          activeByHost.set(host, activeByHost.get(host) - 1);
          schedule();
        });
      }
    }
  };
  schedule();
});

const classifications = {};
const editorial = { 'current-permanent': {}, 'recent-blog': {}, 'historical-blog': {} };
for (const result of results) {
  classifications[result.classification] = (classifications[result.classification] ?? 0) + 1;
  const sourceClass = routeClass(links.get(result.url));
  editorial[sourceClass][result.classification] = (editorial[sourceClass][result.classification] ?? 0) + 1;
}
const actionable = results.filter((result) => ['not-found', 'server-error', 'dns-failure', 'tls-failure', 'network-failure', 'timeout'].includes(result.classification)).map((result) => ({
  ...result,
  source_class: routeClass(links.get(result.url)),
  source_routes: [...links.get(result.url)].slice(0, 12),
}));

const report = {
  generated_at: new Date().toISOString(),
  timeout_ms: timeoutMs,
  shard: { index: shardIndex, count: shardCount },
  unique_links_discovered: links.size,
  unique_links_checked: results.length,
  reference_count: [...links.values()].reduce((total, routes) => total + routes.size, 0),
  classifications,
  editorial_classification: editorial,
  actionable_count: actionable.length,
  actionable: actionable.slice(0, 250),
};
const serialized = `${JSON.stringify(report, null, 2)}\n`;
if (process.env.EXTERNAL_LINK_REPORT_PATH) await writeFile(process.env.EXTERNAL_LINK_REPORT_PATH, serialized);
console.log(serialized.trimEnd());
