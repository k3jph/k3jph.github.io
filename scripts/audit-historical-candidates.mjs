import { readFile } from 'node:fs/promises';
import fg from 'fast-glob';
import matter from 'gray-matter';
import YAML from 'yaml';

const root = process.cwd();
const parse = (source) => matter(source, { engines: { yaml: (text) => YAML.parse(text) ?? {} } });

const directSignals = [
  ['public-health-event', /\b(?:COVID-?19|coronavirus|stay-at-home|social distancing|Zika|Ebola(?:virus)?|Flubola|pandemic|epidemic|outbreak)\b/i],
  ['live-incident', /\b(?:outage|government shutdown|operating status|temporary closure|state of emergency)\b/i],
  ['named-active-event', /\b(?:Hurricane Florence|New Horizons|JSM ?20\d{2}|eclipse)\b/i],
  ['discontinued-program', /(?:\b(?:Mars One|Google\+|OpenPGP bot|link shortener|Howard County search|FeedBurner|Google Gadgets|Google Toolbar|Assent Systems)\b|@opmdcstatus|api\.jameshoward\.us|Yahoo!? Pipes|DC Closings)/i],
  ['time-bound-rule', /\b(?:filing requirements?|registration requirements?|benefit eligibility|Social Security benefits?|tax filing|polling place|ballot rules?|application deadline)\b/i],
  ['versioned-instructions', /\b(?:installation instructions?|setup instructions?|how to install|configure|configuration|API endpoint|version \d+(?:\.\d+)*)\b/i],
];

const temporalSignal = /\b(?:currently|right now|today|this week|this month|this year|as of|at present|upcoming|deadline|now available|currently available|has announced|will begin|will end|scheduled for|still ongoing|tomorrow|tonight)\b/i;
const actionSignal = /\b(?:install|download|register|apply|file|submit|vote|attend|evacuate|prepare|follow these|instructions?|requirements?|eligibility|available|open|closed|service|program|project|price|rate)\b/i;

const files = (await fg('_posts/**/*.{md,markdown}', { cwd: root })).sort();
const candidates = [];

for (const file of files) {
  const parsed = parse(await readFile(`${root}/${file}`, 'utf8'));
  const haystack = [
    parsed.data.title,
    ...(Array.isArray(parsed.data.tags) ? parsed.data.tags : []),
    parsed.content,
  ].filter(Boolean).join('\n');
  const signals = directSignals.filter(([, pattern]) => pattern.test(haystack)).map(([name]) => name);
  if (temporalSignal.test(haystack) && actionSignal.test(haystack)) signals.push('temporal-action-language');
  if (!signals.length) continue;
  candidates.push({
    file,
    title: parsed.data.title,
    date: String(parsed.data.date ?? '').slice(0, 10),
    signals: [...new Set(signals)],
  });
}

console.log(JSON.stringify({ posts_scanned: files.length, candidates: candidates.length, records: candidates }, null, 2));
