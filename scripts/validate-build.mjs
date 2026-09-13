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
  '/honors/index.html', '/service/index.html', '/software/index.html', '/teaching/index.html',
  '/search/index.html', '/contact-me.html', '/404.html', '/feed.xml', '/atom.xml',
  '/feed/atom.xml', '/sitemap.xml', '/sitemap-pages.xml', '/sitemap-ancestry.xml',
  '/data/search.json', '/CNAME', '/robots.txt',
];
for (const file of required) if (!relativeFiles.has(file)) failures.push(`missing required output ${file}`);

const representativeChecks = [
  ['/index.html', '/teaching/'],
  ['/about-me/index.html', 'class="recognition-list"'],
  ['/books/computational-methods-numerical-analysis-r/index.html', 'class="book-detail"'],
  ['/service/maryland-defense-force/index.html', 'data-ribbon-type="personal"'],
  ['/coat-of-arms/index.html', 'id="tartan"'],
  ['/2020/05/31/the-lotka-volterra-equations/index.html', 'class="katex-display"'],
  ['/2026/06/25/neurons-all-the-way-down/index.html', 'data-footnote-backref'],
];
for (const [file, pattern] of representativeChecks) {
  const html = await readFile(path.join(dist, file), 'utf8');
  if (!html.includes(pattern)) failures.push(`${file}: missing representative rendering ${pattern}`);
}

const unique = [...new Set(failures)];
console.log(JSON.stringify({ html_routes: htmlFiles.length, redirect_routes: redirectRoutes, static_files: files.length, local_references: references, errors: unique.length, warnings: warnings.length }, null, 2));
if (warnings.length) console.warn(warnings.slice(0, 20).join('\n'));
if (unique.length) {
  console.error(unique.slice(0, 100).join('\n'));
  process.exit(1);
}
