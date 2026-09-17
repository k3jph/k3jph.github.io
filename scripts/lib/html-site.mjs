import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';

export const SITE_ORIGIN = 'https://jameshoward.us';
const SITE_HOSTS = new Set(['jameshoward.us', 'www.jameshoward.us']);

export async function walk(directory) {
  const files = [];
  for (const name of await readdir(directory)) {
    const file = path.join(directory, name);
    (await stat(file)).isDirectory() ? files.push(...await walk(file)) : files.push(file);
  }
  return files;
}

export function routeForFile(dist, file) {
  const relative = `/${path.relative(dist, file).split(path.sep).join('/')}`;
  if (relative === '/index.html') return '/';
  if (relative.endsWith('/index.html')) return relative.slice(0, -'index.html'.length);
  return relative;
}

export function parseHtml(html) {
  return parse(html, { sourceCodeLocationInfo: false });
}

export function attr(node, name) {
  return node.attrs?.find((item) => item.name === name)?.value;
}

export function hasRel(node, value) {
  return (attr(node, 'rel') ?? '').split(/\s+/).includes(value);
}

export function textContent(node) {
  if (node.nodeName === '#text') return node.value ?? '';
  return (node.childNodes ?? []).map(textContent).join('');
}

export function elements(root, predicate = () => true) {
  const output = [];
  const visit = (node) => {
    if (node.tagName && predicate(node)) output.push(node);
    for (const child of node.childNodes ?? []) visit(child);
    if (node.content) visit(node.content);
  };
  visit(root);
  return output;
}

export function elementChildren(node) {
  return (node.childNodes ?? []).filter((child) => child.tagName);
}

export function safeDecodePath(pathname) {
  try {
    return decodeURI(pathname);
  } catch {
    return pathname;
  }
}

export function resolveUrl(raw, sourceRoute) {
  if (!raw || /^(?:mailto|tel|data|javascript|blob):/i.test(raw)) return undefined;
  try {
    return new URL(raw, `${SITE_ORIGIN}${sourceRoute}`);
  } catch {
    return undefined;
  }
}

export function isSameSiteUrl(url) {
  return ['http:', 'https:'].includes(url.protocol) && SITE_HOSTS.has(url.hostname.toLowerCase());
}

export function routeForUrl(url, routes) {
  if (!isSameSiteUrl(url)) return undefined;
  const pathname = safeDecodePath(url.pathname);
  const candidates = [
    pathname,
    pathname === '/' ? undefined : pathname.endsWith('/') ? pathname.slice(0, -1) : `${pathname}/`,
    pathname.endsWith('.html') ? undefined : `${pathname.replace(/\/$/, '')}.html`,
  ].filter(Boolean);
  return candidates.find((candidate) => routes.has(candidate));
}

export function staticPathForUrl(url, relativeFiles) {
  if (!isSameSiteUrl(url)) return undefined;
  const pathname = safeDecodePath(url.pathname);
  const candidates = [
    pathname,
    pathname === '/' ? '/index.html' : undefined,
    pathname.endsWith('/') ? `${pathname}index.html` : `${pathname}/index.html`,
    pathname.endsWith('.html') ? undefined : `${pathname}.html`,
  ].filter(Boolean);
  return candidates.find((candidate) => relativeFiles.has(candidate));
}

export function idsInDocument(document) {
  const ids = new Set();
  for (const node of elements(document)) {
    const id = attr(node, 'id');
    const name = node.tagName === 'a' ? attr(node, 'name') : undefined;
    if (id) ids.add(id);
    if (name) ids.add(name);
  }
  return ids;
}
