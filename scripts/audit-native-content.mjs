import { readFile } from 'node:fs/promises';
import fg from 'fast-glob';

const groups = {
  blog: await fg('_posts/**/*.{md,markdown}'),
  ancestry: await fg('_ancestry/**/*.{md,markdown}'),
  pages: await fg(['*.{md,html}', 'archive/**/*.{md,html}', 'books/**/*.{md,html}', 'games/**/*.{md,html}', 'honors/**/*.{md,html}', 'service/**/*.{md,html}', 'content/fragments/*.md'], { ignore: ['README.md'] }),
};
const bootstrap = /^(?:row|container-fluid|col-(?:xs|sm|md|lg|xl)-\d+|btn(?:-[a-z]+)?|pull-(?:left|right)|m[trblxy]?-[n]?\d+|p[trblxy]?-[n]?\d+)$/;
const allowedDirectives = new Set(['book-detail', 'callout', 'credential-grid', 'document', 'embed', 'figure', 'fragment', 'professional-recognition', 'related-posts', 'ribbon-rack', 'youtube']);
const errors = [];
const report = {};

for (const [name, files] of Object.entries(groups)) {
  const totals = { files: files.length, liquid: 0, bootstrap_classes: 0, inline_styles: 0, content_scripts: 0, raw_divs: 0, figures: 0, directives: 0 };
  for (const file of files) {
    const source = await readFile(file, 'utf8');
    const liquid = [...source.matchAll(/\{%|\{\{/g)].length;
    const inlineStyles = [...source.matchAll(/\sstyle\s*=/gi)].length;
    const contentScripts = [...source.matchAll(/<script\b/gi)].length;
    const rawDivs = [...source.matchAll(/<div\b/gi)].length;
    const figures = [...source.matchAll(/(?:<figure\b|:::figure\b)/gi)].length;
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
    });
    if (liquid) errors.push(`${file}: ${liquid} Liquid construct(s)`);
    if (bootstrapClasses) errors.push(`${file}: ${bootstrapClasses} Bootstrap class(es)`);
    if (inlineStyles) errors.push(`${file}: ${inlineStyles} inline style(s)`);
    if (contentScripts) errors.push(`${file}: ${contentScripts} content script(s)`);
    for (const iframe of source.matchAll(/<iframe\b([^>]*)>/gi)) if (!/\btitle\s*=/.test(iframe[1])) errors.push(`${file}: iframe without a title`);
  }
  report[name] = totals;
}

console.log(JSON.stringify({ ...report, errors: errors.length }, null, 2));
if (errors.length) {
  console.error(errors.slice(0, 100).join('\n'));
  process.exit(1);
}
