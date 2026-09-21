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
  const firstDifference = (left, right, path = 'root') => {
    if (Object.is(left, right)) return null;
    if (typeof left !== typeof right || left === null || right === null) return { path, generated: left, expected: right };
    if (Array.isArray(left) || Array.isArray(right)) {
      if (!Array.isArray(left) || !Array.isArray(right)) return { path, generated: left, expected: right };
      if (left.length !== right.length) return { path: path + '.length', generated: left.length, expected: right.length };
      for (let index = 0; index < left.length; index += 1) {
        const difference = firstDifference(left[index], right[index], path + '[' + index + ']');
        if (difference) return difference;
      }
      return null;
    }
    if (typeof left === 'object') {
      const leftKeys = Object.keys(left);
      const rightKeys = Object.keys(right);
      if (JSON.stringify(leftKeys) !== JSON.stringify(rightKeys)) return { path: path + ' keys', generated: leftKeys, expected: rightKeys };
      for (const key of leftKeys) {
        const difference = firstDifference(left[key], right[key], path + '.' + key);
        if (difference) return difference;
      }
      return null;
    }
    return { path, generated: left, expected: right };
  };
  console.error('Generated Subject data does not match _data/subjects.yml and the canonical destination data.');
  const comparableExpected = JSON.parse(JSON.stringify(expected));
  console.error(JSON.stringify(firstDifference(generated, comparableExpected), null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  subjects: Object.fromEntries(generated.subjects.map((subject) => [subject.slug, subject.resource_counts])),
  routes: generated.routes.length,
}, null, 2));
