import { readFile } from 'node:fs/promises';
import path from 'node:path';
import axe from 'axe-core';
import { JSDOM } from 'jsdom';

const root = process.cwd();
const dist = path.join(root, 'dist');
const routes = [
  '/', '/about-me/', '/consulting/', '/contact-me/', '/search/', '/404.html',
  '/writing/', '/scholarship/', '/books/', '/books/handbook-military-defense-operations-research/',
  '/software/', '/teaching/', '/service/', '/service/maryland-defense-force/',
  '/subjects/', '/subjects/artificial-intelligence/', '/subjects/mathematics-statistics/',
  '/subjects/operations-research-decision-systems/', '/writing/subjects/',
  '/writing/subjects/artificial-intelligence/', '/writing/series/',
  '/writing/series/history-of-artificial-intelligence/',
  '/2026/04/29/when-machines-learned-to-choose/', '/2026/06/10/simple-rules-surprising-worlds/',
  '/2026/07/22/what-we-do-now/', '/2016/07/03/runaway-trolley-never-coming-back/',
  '/2026/09/10/githubs-ongoing-actions-outage/', '/2024/11/03/the-evolution-of-the-royal-arms/',
  '/2024/12/10/on-the-royal-badges/', '/2019/05/07/social-security-policysplainer/',
  '/2020/05/19/the-risk-of-dying-from-covid-19/', '/2020/05/31/the-lotka-volterra-equations/',
  '/2026/06/25/neurons-all-the-way-down/', '/2022/07/22/origami-wabi-sabi-paper/',
  '/ancestry/', '/ancestry/first-families-of-warren-county-ohio/',
  '/ancestry/order-of-americans-of-armorial-ancestry/', '/honors/',
  '/honors/grand-duchy-of-westarctica/', '/honors/royal-order-of-the-star-of-oceania/',
  '/coat-of-arms/', '/coat-of-arms/arms/', '/coat-of-arms/emblazonments/',
  '/coat-of-arms/insignia/', '/coat-of-arms/tartan/', '/coat-of-arms/records/', '/media/',
  '/archive/recovering-a-lost-admin-password/', '/archive/terrapin-scholar/',
  '/archive/the-once-and-future-m-net/', '/archive/the-real-freebsd/',
];

function fileForRoute(route) {
  return route.endsWith('.html') ? path.join(dist, route.slice(1)) : path.join(dist, route.slice(1), 'index.html');
}

const violations = [];
const incomplete = [];
let passes = 0;

for (const route of routes) {
  const html = await readFile(fileForRoute(route), 'utf8');
  const dom = new JSDOM(html, {
    url: new URL(route, 'https://jameshoward.us/').href,
    runScripts: 'outside-only',
    pretendToBeVisual: true,
  });
  dom.window.eval(axe.source);
  const result = await dom.window.axe.run(dom.window.document, {
    rules: {
      // jsdom does not calculate layout or rendered foreground/background colors.
      'color-contrast': { enabled: false },
    },
  });
  passes += result.passes.length;
  for (const finding of result.violations) violations.push({
    route,
    id: finding.id,
    impact: finding.impact ?? 'unknown',
    help: finding.help,
    help_url: finding.helpUrl,
    nodes: finding.nodes.map((node) => ({ target: node.target, html: node.html, summary: node.failureSummary })),
  });
  for (const finding of result.incomplete) {
    if (!finding.nodes.length) continue;
    incomplete.push({ route, id: finding.id, impact: finding.impact ?? 'unknown', nodes: finding.nodes.length });
  }
  dom.window.close();
}

const byImpact = { critical: 0, serious: 0, moderate: 0, minor: 0, unknown: 0 };
for (const finding of violations) byImpact[finding.impact] = (byImpact[finding.impact] ?? 0) + finding.nodes.length;
const summary = {
  generated_at: new Date().toISOString(),
  runtime: `axe-core ${axe.version} in jsdom (nonvisual DOM scan)`,
  pages_scanned: routes.length,
  rule_passes: passes,
  violation_rules: violations.length,
  violation_nodes_by_impact: byImpact,
  incomplete_rules: incomplete.length,
  color_contrast_scanned: false,
  violations,
  incomplete,
};

console.log(JSON.stringify(summary, null, 2));
if (byImpact.critical || byImpact.serious) process.exitCode = 1;
