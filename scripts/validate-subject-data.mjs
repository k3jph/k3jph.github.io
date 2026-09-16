import { readFile } from 'node:fs/promises';
import YAML from 'yaml';
import { buildSubjectsData } from './lib/subject-data.mjs';

const root = process.cwd();
const [sourceText, generatedText, postsText, writingText, siteText, ledgerText, scholarshipMarkdown] = await Promise.all([
  readFile(`${root}/_data/subjects.yml`, 'utf8'),
  readFile(`${root}/.generated/data/subjects.json`, 'utf8'),
  readFile(`${root}/.generated/data/posts.json`, 'utf8'),
  readFile(`${root}/.generated/data/writing.json`, 'utf8'),
  readFile(`${root}/.generated/data/site.json`, 'utf8'),
  readFile(`${root}/.generated/data/route-ledger.json`, 'utf8'),
  readFile(`${root}/scholarship.md`, 'utf8'),
]);

const source = YAML.parse(sourceText);
const generated = JSON.parse(generatedText);
const posts = JSON.parse(postsText);
const writing = JSON.parse(writingText);
const site = JSON.parse(siteText);
const ledger = JSON.parse(ledgerText);
const occupiedRoutes = ledger.routes.filter((item) => item.source !== '_data/subjects.yml').map((item) => item.route);
const expected = buildSubjectsData(source, {
  posts,
  writing,
  scholarshipMarkdown,
  books: site.books,
  software: site.software,
  teaching: site.teaching,
  service: site.service,
}, occupiedRoutes);

if (JSON.stringify(generated) !== JSON.stringify(expected)) {
  console.error('Generated Subject data does not match _data/subjects.yml and the canonical destination data.');
  process.exit(1);
}

console.log(JSON.stringify({
  subjects: Object.fromEntries(generated.subjects.map((subject) => [subject.slug, subject.resource_counts])),
  routes: generated.routes.length,
}, null, 2));
