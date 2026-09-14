export const SITE = {
  title: 'James Howard', name: 'James P. Howard, II', url: 'https://jameshoward.us',
  description: 'The long-lived personal archive of James P. Howard, II: mathematics, software, teaching, public service, scholarship, history, genealogy, heraldry, and the occasional strange project.',
  authorEmail: 'jh@jameshoward.us', socialImage: '/assets/img/header-home.webp',
};
export const BLOG_PAGE_SIZE = 12;
export function normalizeAssetPath(value?: string) {
  if (!value) return SITE.socialImage;
  if (/^(?:https?:)?\/\//.test(value) || value.startsWith('data:')) return value;
  const rooted = value.startsWith('/') ? value : `/${value}`;
  return rooted.startsWith('/assets/') ? rooted : `/assets/img${rooted}`;
}
export const absoluteUrl = (value: string) => new URL(value, SITE.url).toString();
export function formatDate(value: Date | string, style: 'long' | 'short' = 'long') {
  const calendarDate = typeof value === 'string' && /^D\d{4}-\d{2}-\d{2}$/.test(value);
  const date = value instanceof Date ? value : new Date(calendarDate ? `${value.slice(1)}T00:00:00Z` : value);
  return new Intl.DateTimeFormat('en-US', style === 'long' ? { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: calendarDate ? 'UTC' : 'America/New_York' } : { month: 'short', day: 'numeric', year: 'numeric', timeZone: calendarDate ? 'UTC' : 'America/New_York' }).format(date);
}
export function slugifyTag(value: string) { return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }
export function isPublished(data: { published?: boolean; date?: Date }, now = new Date()) { return data.published !== false && (!data.date || data.date.getTime() <= now.getTime()); }
export function routeParam(route: string) { return route.replace(/^\/+|\/+$/g, ''); }
/** Canonical internal-link form. File routes keep their extension; pages use a trailing slash. */
export function sitePath(value: string) {
  if (!value || value === '/') return '/';
  if (/^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith('#') || value.startsWith('mailto:')) return value;
  const match = value.match(/^([^?#]*)([?#].*)?$/);
  const pathname = match?.[1] ?? value;
  const suffix = match?.[2] ?? '';
  const rooted = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (rooted.endsWith('/') || /\.[a-z0-9]+$/i.test(rooted)) return `${rooted}${suffix}`;
  return `${rooted}/${suffix}`;
}
