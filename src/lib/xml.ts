import { absoluteUrl } from './site';
export const xmlEscape = (value: unknown) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const xmlHeaders = { 'Content-Type': 'application/xml; charset=utf-8' };
export function urlset(items: Array<{ route: string; lastmod?: Date | string; priority?: number }>) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items.map((item) => `<url><loc>${xmlEscape(absoluteUrl(item.route))}</loc>${item.lastmod ? `<lastmod>${new Date(item.lastmod).toISOString()}</lastmod>` : ''}${item.priority ? `<priority>${item.priority}</priority>` : ''}</url>`).join('')}</urlset>`;
}
