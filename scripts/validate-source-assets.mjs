import { createHash } from 'node:crypto';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const manifestPath = path.join(root, 'source-assets/manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const failures = [];
const referenceExtensions = new Set([
  '.astro', '.css', '.csv', '.html', '.htm', '.js', '.json', '.jsx', '.md', '.mjs', '.scss',
  '.ts', '.tsx', '.txt', '.yaml', '.yml',
]);
const sourceFormats = new Set(['.doc', '.docx', '.ppt', '.pptx', '.svg', '.xls', '.xlsx']);
const excludedDirectories = new Set(['.astro', '.generated', '.git', 'dist', 'docs', 'node_modules', 'scripts', 'source-assets']);

async function walk(directory, options = {}) {
  const output = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    if (item.isDirectory() && options.skip?.has(item.name)) continue;
    const absolute = path.join(directory, item.name);
    if (item.isDirectory()) output.push(...await walk(absolute, options));
    else output.push(absolute);
  }
  return output;
}

async function fileMetadata(file) {
  try {
    const metadata = await stat(path.join(root, file));
    return metadata.isFile() ? metadata : undefined;
  } catch {
    return undefined;
  }
}

async function sha256(file) {
  const hash = createHash('sha256');
  hash.update(await readFile(file));
  return hash.digest('hex');
}

const referenceFiles = (await walk(root, { skip: excludedDirectories }))
  .filter((file) => referenceExtensions.has(path.extname(file).toLowerCase()));
const referenceCorpus = (await Promise.all(referenceFiles.map(async (file) => {
  const metadata = await stat(file);
  return metadata.size <= 10 * 1024 * 1024 ? await readFile(file, 'utf8') : '';
}))).join('\n');

if (referenceCorpus.includes('source-assets/')) failures.push('Website source links into the non-public source-assets tree');

const publicFiles = await walk(path.join(root, 'public'));
const publicBySize = new Map();
for (const file of publicFiles) {
  const metadata = await stat(file);
  if (!publicBySize.has(metadata.size)) publicBySize.set(metadata.size, []);
  publicBySize.get(metadata.size).push(file);
}

let archiveBytes = 0;
for (const entry of manifest.files) {
  const sourceMetadata = await fileMetadata(entry.source_path);
  if (!sourceMetadata) {
    failures.push(`Missing preserved source ${entry.source_path}`);
    continue;
  }
  archiveBytes += sourceMetadata.size;
  if (sourceMetadata.size !== entry.bytes) failures.push(`${entry.source_path}: manifest size ${entry.bytes}, actual ${sourceMetadata.size}`);
  if (await fileMetadata(entry.previous_public_path)) failures.push(`${entry.previous_public_path}: stale public copy remains`);
  for (const derivative of entry.public_derivatives) if (!await fileMetadata(derivative)) failures.push(`${entry.source_path}: missing public derivative ${derivative}`);

  const oldPublicUrl = `/${entry.previous_public_path.replace(/^public\//, '')}`;
  if (referenceCorpus.includes(entry.previous_public_path) || referenceCorpus.includes(oldPublicUrl)) {
    failures.push(`${entry.previous_public_path}: website source still references the former public location`);
  }

  const candidates = publicBySize.get(sourceMetadata.size) ?? [];
  if (candidates.length) {
    const sourceHash = await sha256(path.join(root, entry.source_path));
    for (const candidate of candidates) {
      if (await sha256(candidate) === sourceHash) failures.push(`${entry.source_path}: exact public duplicate remains at ${path.relative(root, candidate)}`);
    }
  }
}

const publicSourceAssets = [];
for (const file of publicFiles) {
  const extension = path.extname(file).toLowerCase();
  if (!sourceFormats.has(extension)) continue;
  const relative = path.relative(root, file).split(path.sep).join('/');
  const publicUrl = `/${relative.replace(/^public\//, '')}`;
  const metadata = await stat(file);
  publicSourceAssets.push({
    path: relative,
    bytes: metadata.size,
    referenced: referenceCorpus.includes(relative) || referenceCorpus.includes(publicUrl),
  });
}
const reviewCandidates = publicSourceAssets.filter((entry) => !entry.referenced).sort((a, b) => b.bytes - a.bytes);

const result = {
  manifest_files: manifest.files.length,
  preserved_source_bytes: archiveBytes,
  public_source_format_files: publicSourceAssets.length,
  public_source_format_bytes: publicSourceAssets.reduce((sum, entry) => sum + entry.bytes, 0),
  unreferenced_public_source_format_files: reviewCandidates.length,
  unreferenced_public_source_format_bytes: reviewCandidates.reduce((sum, entry) => sum + entry.bytes, 0),
  largest_review_candidates: reviewCandidates.slice(0, 10),
  errors: failures.length,
};

console.log(JSON.stringify(result, null, 2));
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
