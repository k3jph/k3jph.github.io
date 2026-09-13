import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import YAML from 'yaml';

const root = process.cwd();
const generated = path.join(root, '.generated');
await rm(generated, { recursive: true, force: true });
await mkdir(path.join(generated, 'content'), { recursive: true });
await mkdir(path.join(generated, 'data'), { recursive: true });

const parse = (source) => matter(source, { engines: { yaml: (text) => YAML.parse(text) ?? {} } });
const array = (value) => value == null || value === false ? [] : Array.isArray(value) ? value : [value];

function route(value, file) {
  if (value) {
    const text = String(value).trim();
    const out = text.startsWith('/') ? text : `/${text}`;
    return out === '/' || path.posix.extname(out) || out.endsWith('/') ? out : `${out}/`;
  }
  const ext = path.posix.extname(file);
  const name = file.slice(0, -ext.length);
  return name === 'index' ? '/' : ext === '.html' ? `/${file}` : `/${name}/`;
}

function plainText(value) {
  return String(value ?? '').replace(/<[^>]+>/g, ' ').replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[#_*`>|~]/g, ' ').replace(/\s+/g, ' ').trim();
}

function excerpt(value, words = 32) {
  const parts = plainText(value).split(' ');
  return `${parts.slice(0, words).join(' ')}${parts.length > words ? '…' : ''}`;
}

async function expandFragments(body, sourcePath) {
  let output = body;
  for (const match of body.matchAll(/::fragment\{name=["']([\w-]+)["']\}/g)) {
    const fragmentPath = path.join(root, 'content', 'fragments', `${match[1]}.md`);
    output = output.replace(match[0], await readFile(fragmentPath, 'utf8'));
  }
  if (/\{%|\{\{/.test(output)) throw new Error(`${sourcePath}: unresolved Liquid syntax`);
  return output;
}

async function loadYaml(file) {
  return YAML.parse(await readFile(path.join(root, file), 'utf8'));
}

const [books, honors, service, software, teaching, settings, profile, mddfRibbons] = await Promise.all([
  '_data/books.yml', '_data/honors.yml', '_data/service.yml', '_data/software.yml',
  '_data/teaching.yml', '_data/settings.yml', '_data/profile.yml', '_data/mddf_ribbons.yaml',
].map(loadYaml));

const postFiles = (await fg('_posts/**/*.{md,markdown}', { cwd: root })).sort();
const posts = [];
const routeLedger = [];

async function writeEntry(collection, file, data, body, url) {
  const destination = path.join(generated, 'content', collection, file.replace(/\.(?:html|markdown)$/i, '.md'));
  await mkdir(path.dirname(destination), { recursive: true });
  const frontmatter = YAML.stringify({ ...data, route: url, source_path: data.source_path, redirect_from: array(data.redirect_from).map(String) }).trimEnd();
  await writeFile(destination, `---\n${frontmatter}\n---\n${await expandFragments(body, data.source_path)}`);
}

for (const file of postFiles) {
  const parsed = parse(await readFile(path.join(root, file), 'utf8'));
  const url = route(parsed.data.permalink, file);
  const item = { file, data: parsed.data, body: parsed.content, route: url };
  posts.push(item);
  routeLedger.push({ source: file, route: url, type: 'blog' });
  await writeEntry('blog', file.replace(/^_posts\//, ''), { ...parsed.data, excerpt: excerpt(parsed.content), source_path: file }, parsed.content, url);
}

const ancestryFiles = (await fg('_ancestry/**/*.{md,markdown}', { cwd: root })).sort();
for (const file of ancestryFiles) {
  const parsed = parse(await readFile(path.join(root, file), 'utf8'));
  const url = route(parsed.data.permalink, file);
  routeLedger.push({ source: file, route: url, type: 'ancestry' });
  await writeEntry('ancestry', file.replace(/^_ancestry\//, ''), { ...parsed.data, source_path: file }, parsed.content, url);
}

const pagePatterns = ['*.{md,html}', 'archive/**/*.{md,html}', 'books/**/*.{md,html}', 'games/**/*.{md,html}', 'honors/**/*.{md,html}', 'service/**/*.{md,html}'];
const pageFiles = (await fg(pagePatterns, { cwd: root })).filter((file) => !['README.md', '_templates/post.md', 'laserprj.html'].includes(file)).sort();
for (const file of pageFiles) {
  const parsed = parse(await readFile(path.join(root, file), 'utf8'));
  const url = route(parsed.data.permalink, file);
  routeLedger.push({ source: file, route: url, type: 'page' });
  await writeEntry('pages', file, { ...parsed.data, title: parsed.data.title ?? path.basename(file), source_path: file }, parsed.content, url);
}

const redirects = [
  { from: '/hereditary-societies/', to: '/ancestry/', source: 'native-route-policy' },
  { from: '/hs/', to: '/ancestry/', source: 'native-route-policy' },
  { from: '/family/', to: '/ancestry/', source: 'native-route-policy' },
  { from: '/tartan/', to: '/coat-of-arms/#tartan', source: 'native-route-policy' },
  { from: '/contact-me/', to: '/contact-me.html', source: 'native-route-policy' },
];
for (const item of posts) for (const from of array(item.data.redirect_from)) redirects.push({ from: route(from, ''), to: item.route, source: item.file });
for (const file of [...ancestryFiles, ...pageFiles]) {
  const parsed = parse(await readFile(path.join(root, file), 'utf8'));
  const to = route(parsed.data.permalink, file);
  for (const from of array(parsed.data.redirect_from)) redirects.push({ from: route(from, ''), to, source: file });
  if (parsed.data.redirect_to) redirects.push({ from: to, to: String(parsed.data.redirect_to), source: file });
}

const redirectMap = new Map();
for (const item of redirects) {
  const prior = redirectMap.get(item.from);
  if (prior && prior.to !== item.to) throw new Error(`Conflicting redirects for ${item.from}: ${prior.to} and ${item.to}`);
  redirectMap.set(item.from, item);
}
const uniqueRedirects = [...redirectMap.values()];

await writeFile(path.join(generated, 'data', 'site.json'), `${JSON.stringify({ siteUrl: 'https://jameshoward.us', books, honors, service, software, teaching, settings, profile, mddfRibbons, redirects: uniqueRedirects }, null, 2)}\n`);
await writeFile(path.join(generated, 'data', 'posts.json'), `${JSON.stringify(posts.map((post) => ({ ...post.data, route: post.route, source_path: post.file, excerpt: excerpt(post.body) })), null, 2)}\n`);
await writeFile(path.join(generated, 'data', 'route-ledger.json'), `${JSON.stringify({ generated_at: new Date().toISOString(), routes: routeLedger, redirects: uniqueRedirects }, null, 2)}\n`);
console.log(`Prepared ${posts.length} posts, ${ancestryFiles.length} ancestry records, ${pageFiles.length} pages, and ${uniqueRedirects.length} redirects.`);
