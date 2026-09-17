import { readFile } from 'node:fs/promises';
import path from 'node:path';
import Fuse from 'fuse.js';

const index = JSON.parse(await readFile(path.join(process.cwd(), 'dist/data/search.json'), 'utf8'));
const fuse = new Fuse(index, { keys: ['title', 'text', 'tags'], threshold: .34, ignoreLocation: true });
const cases = [
  ["GitHub's Ongoing Actions Outage", '/2026/09/10/githubs-ongoing-actions-outage/', 'recent Blog title'],
  ['Runaway Trolley', '/2016/07/03/runaway-trolley-never-coming-back/', 'old Blog content'],
  ['Quakers', '/ancestry/national-society-descendants-of-early-quakers/', 'ancestry'],
  ['Handbook Military Defense Operations Research', '/books/handbook-military-defense-operations-research/', 'book'],
  ['tartan-maker', '/software/', 'software'],
  ['Foundations Research Methods', '/teaching/', 'Teaching'],
  ['Writing', '/writing/', 'Writing'],
  ['Artificial Intelligence', '/writing/subjects/artificial-intelligence/', 'Writing Subject'],
  ['Operations Research Decision Systems', '/subjects/operations-research-decision-systems/', 'site-wide Subject'],
  ['Media Archive', '/media/', 'Media Archive'],
  ['Consulting', '/consulting/', 'Consulting'],
];

const results = cases.map(([query, expected, family]) => {
  const matches = fuse.search(query, { limit: 10 }).map((result) => result.item.url);
  return { query, family, expected, rank: matches.indexOf(expected) + 1, matches };
});
const redirectOnlyRoutes = ['/projects/'];
const indexedRedirects = redirectOnlyRoutes.filter((route) => index.some((item) => item.url === route));
const failures = [
  ...results.filter((result) => result.rank === 0).map((result) => `${result.family}: ${result.expected} not found for “${result.query}”`),
  ...indexedRedirects.map((route) => `redirect-only route is indexed: ${route}`),
];

console.log(JSON.stringify({ records: index.length, query_cases: results.length, successful_cases: results.length - failures.length, indexed_redirects: indexedRedirects, failures, results }, null, 2));
if (failures.length) process.exitCode = 1;
