import { readFile } from 'node:fs/promises';
import fg from 'fast-glob';
import matter from 'gray-matter';
import YAML from 'yaml';

const parse = (source) => matter(source, { engines: { yaml: (text) => YAML.parse(text) ?? {} } });
const historicalTypes = new Set(['historical', 'superseded', 'resolved', 'discontinued']);
const historicalFields = new Set(['type', 'reviewed', 'note', 'current_url', 'current_label']);

const groups = {
  blog: await fg('_posts/**/*.{md,markdown}'),
  ancestry: await fg('_ancestry/**/*.{md,markdown}'),
  pages: await fg(['*.{md,html}', 'archive/**/*.{md,html}', 'books/**/*.{md,html}', 'games/**/*.{md,html}', 'honors/**/*.{md,html}', 'service/**/*.{md,html}', 'content/fragments/*.md'], { ignore: ['README.md'] }),
};
const bootstrap = /^(?:row|container-fluid|col-(?:xs|sm|md|lg|xl)-\d+|btn(?:-[a-z]+)?|pull-(?:left|right)|m[trblxy]?-[n]?\d+|p[trblxy]?-[n]?\d+)$/;
const allowedDirectives = new Set(['book-detail', 'callout', 'credential-grid', 'document', 'embed', 'figure', 'fragment', 'professional-recognition', 'related-posts', 'ribbon-rack', 'section-heading', 'youtube']);
const errors = [];
const report = {};

for (const [name, files] of Object.entries(groups)) {
  const totals = { files: files.length, liquid: 0, bootstrap_classes: 0, inline_styles: 0, content_scripts: 0, raw_divs: 0, figures: 0, directives: 0, legacy_media_patterns: 0, legacy_media_files: 0, historical_statuses: 0 };
  for (const file of files) {
    const source = await readFile(file, 'utf8');
    if (name === 'blog') {
      const status = parse(source).data.historical_status;
      if (status != null) {
        totals.historical_statuses++;
        if (!status || typeof status !== 'object' || Array.isArray(status)) {
          errors.push(`${file}: historical_status must be an object`);
        } else {
          for (const field of Object.keys(status)) if (!historicalFields.has(field)) errors.push(`${file}: unsupported historical_status field ${field}`);
          if (!historicalTypes.has(status.type)) errors.push(`${file}: unsupported historical_status.type ${status.type}`);
          const reviewed = status.reviewed instanceof Date ? status.reviewed.toISOString().slice(0, 10) : String(status.reviewed ?? '');
          const parsedReview = new Date(`${reviewed}T00:00:00Z`);
          if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewed) || Number.isNaN(parsedReview.valueOf()) || parsedReview.toISOString().slice(0, 10) !== reviewed) errors.push(`${file}: invalid historical_status.reviewed`);
          if (typeof status.note !== 'string' || !status.note.trim()) errors.push(`${file}: historical_status.note is required`);
          if (status.current_label && !status.current_url) errors.push(`${file}: historical_status.current_label requires current_url`);
          if (status.current_url && typeof status.current_url !== 'string') errors.push(`${file}: historical_status.current_url must be a string`);
          if (typeof status.current_url === 'string' && !((status.current_url.startsWith('/') && !status.current_url.startsWith('//')) || /^https?:\/\/[^\s]+$/i.test(status.current_url))) errors.push(`${file}: invalid historical_status.current_url`);
        }
      }
    }
    const liquid = [...source.matchAll(/\{%|\{\{/g)].length;
    const inlineStyles = [...source.matchAll(/\sstyle\s*=/gi)].length;
    const contentScripts = [...source.matchAll(/<script\b/gi)].length;
    const rawDivs = [...source.matchAll(/<div\b/gi)].length;
    const figures = [...source.matchAll(/(?:<figure\b|:::figure\b)/gi)].length;
    const legacyMediaPatterns = [...source.matchAll(/\b(?:content-float-(?:left|right)|content-grid__item--(?:wide|half|third|quarter|narrow))\b/g)].length;
    let bootstrapClasses = 0;
    for (const match of source.matchAll(/class=["']([^"']+)["']/gi)) bootstrapClasses += match[1].split(/\s+/).filter((token) => bootstrap.test(token)).length;
    for (const match of source.matchAll(/^:{2,3}([a-z][\w-]*)/gm)) {
      totals.directives++;
      if (!allowedDirectives.has(match[1])) errors.push(`${file}: unknown content directive ${match[1]}`);
    }
    Object.assign(totals, {
      liquid: totals.liquid + liquid,
      bootstrap_classes: totals.bootstrap_classes + bootstrapClasses,
      inline_styles: totals.inline_styles + inlineStyles,
      content_scripts: totals.content_scripts + contentScripts,
      raw_divs: totals.raw_divs + rawDivs,
      figures: totals.figures + figures,
      legacy_media_patterns: totals.legacy_media_patterns + legacyMediaPatterns,
      legacy_media_files: totals.legacy_media_files + Number(legacyMediaPatterns > 0),
    });
    if (liquid) errors.push(`${file}: ${liquid} Liquid construct(s)`);
    if (bootstrapClasses) errors.push(`${file}: ${bootstrapClasses} Bootstrap class(es)`);
    if (inlineStyles) errors.push(`${file}: ${inlineStyles} inline style(s)`);
    if (contentScripts) errors.push(`${file}: ${contentScripts} content script(s)`);
    if (/\b(?:title-area|separator-(?:info|warning)|card-body|card-title|h-100)\b/.test(source)) errors.push(`${file}: legacy presentation class`);
    if (/class=["']breadcrumbs?["']/.test(source)) errors.push(`${file}: content breadcrumb`);
    for (const iframe of source.matchAll(/<iframe\b([^>]*)>/gi)) if (!/\btitle\s*=/.test(iframe[1])) errors.push(`${file}: iframe without a title`);
  }
  report[name] = totals;
}

console.log(JSON.stringify({ ...report, errors: errors.length }, null, 2));
if (errors.length) {
  console.error(errors.slice(0, 100).join('\n'));
  process.exit(1);
}
