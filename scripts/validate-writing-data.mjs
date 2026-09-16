import { readFile } from 'node:fs/promises';
import YAML from 'yaml';
import { buildWritingData } from './lib/writing-data.mjs';

const root = process.cwd();
const [sourceText, generatedText, postsText, ledgerText] = await Promise.all([
  readFile(`${root}/_data/writing.yml`, 'utf8'),
  readFile(`${root}/.generated/data/writing.json`, 'utf8'),
  readFile(`${root}/.generated/data/posts.json`, 'utf8'),
  readFile(`${root}/.generated/data/route-ledger.json`, 'utf8'),
]);

const source = YAML.parse(sourceText);
const generated = JSON.parse(generatedText);
const posts = JSON.parse(postsText);
const ledger = JSON.parse(ledgerText);
const occupiedRoutes = ledger.routes.filter((item) => item.source !== '_data/writing.yml').map((item) => item.route);
const expected = buildWritingData(source, posts, occupiedRoutes);

if (JSON.stringify(generated) !== JSON.stringify(expected)) {
  console.error('Generated Writing data does not match _data/writing.yml and the canonical post collection.');
  process.exit(1);
}

console.log(JSON.stringify({
  selected: generated.selected.length,
  subjects: Object.fromEntries(generated.subjects.map((subject) => [subject.slug, subject.posts.length])),
  series: Object.fromEntries(generated.series.map((series) => [series.slug, series.part_count])),
  routes: generated.routes.length,
}, null, 2));
