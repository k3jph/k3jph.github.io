import { readFileSync } from 'node:fs';
import YAML from 'yaml';

const books = YAML.parse(readFileSync(new URL('../../_data/books.yml', import.meta.url), 'utf8'));
const honors = YAML.parse(readFileSync(new URL('../../_data/honors.yml', import.meta.url), 'utf8'));
const ribbons = YAML.parse(readFileSync(new URL('../../_data/mddf_ribbons.yaml', import.meta.url), 'utf8'));

const escapeHtml = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function assetPath(value = '') {
  const clean = String(value).trim();
  if (/^(?:https?:)?\/\//.test(clean) || clean.startsWith('data:')) return clean;
  const rooted = clean.startsWith('/') ? clean : `/${clean}`;
  return rooted.startsWith('/assets/') ? rooted : `/assets/img${rooted}`;
}

function walk(node) {
  for (const child of node.children ?? []) walk(child);
  if (!['containerDirective', 'leafDirective', 'textDirective'].includes(node.type)) return;
  const attributes = node.attributes ?? {};

  if (node.name === 'current-year') {
    node.type = 'text';
    node.value = String(new Date().getUTCFullYear());
    delete node.children;
    return;
  }

  if (node.name === 'figure') {
    const rawWidth = Number.parseFloat(attributes.width ?? '100') || 100;
    // Historical figure widths used Bootstrap's twelve-column scale when the
    // value was <= 12. Preserve that meaning without retaining the grid.
    const width = Math.max(10, Math.min(100, Math.round(rawWidth <= 12 ? rawWidth / 12 * 100 : rawWidth)));
    const align = ['left', 'right', 'center'].includes(attributes.align) ? attributes.align : 'center';
    const allowedRoles = ['primary', 'documentary', 'supporting', 'emblem', 'portrait', 'gallery'];
    const inferredRole = attributes.role ?? (width <= 33 ? (align === 'center' ? 'emblem' : 'supporting') : width >= 75 ? (attributes.border === 'true' ? 'documentary' : 'primary') : 'documentary');
    const role = allowedRoles.includes(inferredRole) ? inferredRole : 'documentary';
    const classes = ['content-figure', `content-figure--${align}`, `content-figure--w-${width}`, `content-figure--${role}`];
    const source = assetPath(attributes.src);
    const image = { type: 'image', url: source, alt: attributes.alt ?? '', title: null, data: { hProperties: { loading: attributes.loading ?? 'lazy', className: attributes.border === 'true' ? ['image-border'] : [], ...(role === 'gallery' ? { 'data-gallery-src': source } : {}) } } };
    const media = attributes.link ? { type: 'link', url: attributes.link, children: [image] } : image;
    const caption = node.children ?? [];
    if (caption[0]?.type === 'paragraph') caption[0].data = { ...(caption[0].data ?? {}), hName: 'figcaption' };
    node.data = { hName: 'figure', hProperties: { className: classes } };
    node.children = [media, ...caption];
    return;
  }

  if (node.name === 'section-heading') {
    const title = escapeHtml(attributes.title);
    const id = attributes.id ? ` id="${escapeHtml(attributes.id)}"` : '';
    const level = attributes.level === 'h3' ? 'h3' : 'h2';
    const variant = ['navy', 'gold', 'light'].includes(attributes.variant) ? attributes.variant : 'navy';
    const description = attributes.description ? `<p class="section-heading__description">${escapeHtml(attributes.description)}</p>` : '';
    const image = variant === 'navy' ? '/assets/img/identity/kamon-info.svg' : '/assets/img/identity/kamon-warning.svg';
    node.type = 'html';
    node.value = `<header class="section-heading section-heading--${variant}"><${level}${id}>${title}</${level}><div class="heading-divider heading-divider--${variant}" aria-hidden="true"><span class="heading-divider__rule"></span><img src="${image}" alt="" width="32" height="32"><span class="heading-divider__rule"></span></div>${description}</header>`;
    delete node.children;
    return;
  }

  if (node.name === 'youtube') {
    const id = escapeHtml(attributes.video ?? attributes.id);
    node.type = 'html';
    node.value = `<div class="embed embed--video"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video" loading="lazy" allowfullscreen></iframe></div>`;
    delete node.children;
    return;
  }

  if (node.name === 'document') {
    const href = escapeHtml(attributes.src ?? attributes.href);
    const label = escapeHtml(attributes.label ?? 'Open the document');
    node.type = 'html';
    node.value = attributes.embed === 'true'
      ? `<div class="document-embed"><iframe src="${href}" title="${label}" loading="lazy"></iframe><p><a class="document-link" href="${href}">${label}</a></p></div>`
      : `<p class="document-action"><a class="document-link" href="${href}">${label}</a></p>`;
    delete node.children;
    return;
  }

  if (node.name === 'embed') {
    const href = escapeHtml(attributes.href);
    const label = escapeHtml(attributes.label ?? 'View the original embedded source');
    node.type = 'html';
    node.value = `<p class="embed-link"><a href="${href}">${label}</a></p>`;
    delete node.children;
    return;
  }

  if (node.name === 'related-posts') {
    // The page shell reads this directive from the source and renders the
    // canonical RelatedPosts component outside the article. Leave no second
    // inline rendering behind in the document flow.
    node.type = 'html';
    node.value = '';
    delete node.children;
    return;
  }

  if (node.name === 'book-detail') {
    const book = books.published.find((item) => item.slug === attributes.slug);
    if (!book) throw new Error(`Unknown book-detail slug: ${attributes.slug}`);
    const doi = book.doi ? `<div><dt>DOI</dt><dd><a href="https://doi.org/${escapeHtml(book.doi)}">${escapeHtml(book.doi)}</a></dd></div>` : '';
    node.type = 'html';
    node.value = `<article class="book-detail"><div class="book-detail-hero"><img src="${escapeHtml(assetPath(book.cover))}" alt="${escapeHtml(book.cover_alt)}"><div><p class="eyebrow">${escapeHtml(book.edition)} · ${escapeHtml(book.year)}</p><p>${book.summary}</p><p class="link-row"><a href="${escapeHtml(book.publisher_url)}">Publisher page ↗</a><a href="/books/">All books →</a></p></div></div><dl class="facts"><div><dt>Role</dt><dd>${escapeHtml(book.role)}</dd></div><div><dt>Publisher</dt><dd>${escapeHtml(book.publisher)}</dd></div><div><dt>Print ISBN</dt><dd>${escapeHtml(book.print_isbn)}</dd></div>${doi}</dl></article>`;
    delete node.children;
    return;
  }

  if (node.name === 'professional-recognition') {
    const items = honors.filter((honor) => honor.category === 'professional').map((honor) => {
      const issuer = honor.evidence ? `<a href="${escapeHtml(honor.evidence)}">${escapeHtml(honor.issuer)}</a>` : escapeHtml(honor.issuer);
      return `<li>${escapeHtml(honor.title)} of the ${issuer}, ${escapeHtml(honor.date)}</li>`;
    }).join('');
    node.type = 'html';
    node.value = `<ul class="recognition-list">${items}</ul>`;
    delete node.children;
    return;
  }

  if (node.name === 'ribbon-rack') {
    const items = ribbons.filter((ribbon) => ribbon.type === attributes.type).map((ribbon) => `<a href="${escapeHtml(ribbon.url ?? `#${ribbon.id}`)}" class="ribbon"><img src="${escapeHtml(ribbon.img)}" alt="${escapeHtml(ribbon.alt)}" title="${escapeHtml(ribbon.alt)}" loading="lazy"></a>`).join('');
    node.type = 'html';
    node.value = `<div class="ribbonrack" data-ribbon-type="${escapeHtml(attributes.type)}"><div class="ribbon-grid">${items}</div></div>`;
    delete node.children;
    return;
  }

  if (node.name === 'callout') {
    const title = attributes.title ? `<h3>${escapeHtml(attributes.title)}</h3>` : '';
    node.data = { hName: 'aside', hProperties: { className: ['content-callout'] } };
    if (title) node.children.unshift({ type: 'html', value: title });
  }


  if (node.name === 'credential-grid') {
    node.data = { hName: 'section', hProperties: { className: ['credential-grid'] } };
  }
}

export default function remarkSitePrimitives() {
  return (tree) => walk(tree);
}
