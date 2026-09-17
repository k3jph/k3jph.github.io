import { execFile, spawn } from 'node:child_process';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = process.cwd();
const TOP_COUNT = 100;
const LARGE_THRESHOLDS = [1, 5, 10, 25, 50, 100].map((mb) => ({ mb, bytes: mb * 1024 * 1024 }));
const textExtensions = new Set([
  '.astro', '.css', '.csv', '.html', '.htm', '.js', '.json', '.jsx', '.md', '.mjs', '.scss',
  '.svg', '.ts', '.tsx', '.txt', '.xml', '.yaml', '.yml',
]);
const referenceSourceExtensions = new Set([
  '.astro', '.css', '.csv', '.html', '.htm', '.js', '.json', '.jsx', '.md', '.mjs', '.scss',
  '.ts', '.tsx', '.txt', '.yaml', '.yml',
]);
const nonSiteReferencePrefixes = ['docs/migration/', 'scripts/', 'source-assets/', '.github/'];

const imageExtensions = new Set(['.avif', '.bmp', '.gif', '.ico', '.jpeg', '.jpg', '.png', '.svg', '.tif', '.tiff', '.webp']);
const documentExtensions = new Set(['.doc', '.docx', '.epub', '.odt', '.pdf', '.ppt', '.pptx', '.rtf', '.xls', '.xlsx']);
const audioVideoExtensions = new Set(['.aac', '.avi', '.flac', '.m4a', '.m4v', '.mkv', '.mov', '.mp3', '.mp4', '.mpeg', '.mpg', '.ogg', '.ogv', '.wav', '.webm']);
const archiveExtensions = new Set(['.7z', '.bz2', '.gz', '.rar', '.tar', '.tgz', '.xz', '.zip']);
const fontExtensions = new Set(['.eot', '.otf', '.ttc', '.ttf', '.woff', '.woff2']);
const binaryExtensions = new Set(['.bin', '.class', '.dll', '.dylib', '.exe', '.o', '.obj', '.so']);

const git = async (args, options = {}) => {
  if (options.input !== undefined) return await new Promise((resolve, reject) => {
    const child = spawn('git', args, { cwd: root, stdio: ['pipe', 'pipe', 'pipe'] });
    const stdout = [];
    const stderr = [];
    child.stdout.on('data', (chunk) => stdout.push(chunk));
    child.stderr.on('data', (chunk) => stderr.push(chunk));
    child.on('error', reject);
    child.on('close', (code) => code === 0
      ? resolve(Buffer.concat(stdout).toString(options.encoding ?? 'utf8'))
      : reject(new Error(`git ${args.join(' ')} failed (${code}): ${Buffer.concat(stderr).toString('utf8')}`)));
    child.stdin.end(options.input);
  });
  const { stdout } = await execFileAsync('git', args, {
    cwd: root,
    encoding: options.encoding ?? 'utf8',
    maxBuffer: 1024 * 1024 * 1024,
  });
  return stdout;
};

const extensionFor = (file) => {
  const lower = file.toLowerCase();
  for (const compound of ['.tar.gz', '.tar.bz2', '.tar.xz']) if (lower.endsWith(compound)) return compound;
  return path.extname(lower) || '[none]';
};

const topLevelFor = (file) => file.includes('/') ? file.split('/')[0] : '[root]';

const categoryFor = (file) => {
  const extension = extensionFor(file);
  if (imageExtensions.has(extension)) return 'image';
  if (documentExtensions.has(extension)) return 'document';
  if (audioVideoExtensions.has(extension)) return 'audio/video';
  if (archiveExtensions.has(extension) || extension.startsWith('.tar.')) return 'archive/container';
  if (fontExtensions.has(extension)) return 'font';
  if (binaryExtensions.has(extension)) return 'executable/binary';
  if (textExtensions.has(extension)) return 'source/text';
  return 'other';
};

const parseLsTree = (raw) => raw.split('\0').filter(Boolean).map((record) => {
  const match = record.match(/^(\d+) (\w+) ([0-9a-f]+) +(-|\d+)\t([\s\S]+)$/);
  if (!match) throw new Error(`Unable to parse git ls-tree record: ${record.slice(0, 120)}`);
  const [, mode, type, oid, size, file] = match;
  return {
    path: file,
    mode,
    type,
    oid,
    size: size === '-' ? 0 : Number(size),
    extension: extensionFor(file),
    top_level: topLevelFor(file),
    category: categoryFor(file),
  };
});

const summarize = (entries, key) => {
  const groups = new Map();
  for (const entry of entries) {
    const value = entry[key];
    const group = groups.get(value) ?? { count: 0, bytes: 0 };
    group.count++;
    group.bytes += entry.size;
    groups.set(value, group);
  }
  return Object.fromEntries([...groups.entries()].sort((a, b) => b[1].bytes - a[1].bytes || a[0].localeCompare(b[0])));
};

const parseCountObjects = (raw) => Object.fromEntries(raw.trim().split('\n').map((line) => {
  const [key, value] = line.split(': ');
  return [key.replaceAll('-', '_'), Number(value)];
}));

const currentEntries = parseLsTree(await git(['ls-tree', '-r', '-l', '-z', 'HEAD']));
const currentBlobs = currentEntries.filter((entry) => entry.type === 'blob');
const currentLogicalBytes = currentBlobs.reduce((sum, entry) => sum + entry.size, 0);
const sortedCurrentSizes = currentBlobs.map((entry) => entry.size).sort((a, b) => a - b);
const currentOidSet = new Set(currentBlobs.map((entry) => entry.oid));
const workingPaths = (await git(['ls-files', '-co', '--exclude-standard', '-z'])).split('\0').filter(Boolean);
const workingFiles = await Promise.all(workingPaths.map(async (file) => ({ path: file, size: (await stat(path.join(root, file))).size })));

const duplicateGroups = [...Map.groupBy(currentBlobs, (entry) => entry.oid).entries()]
  .filter(([, entries]) => entries.length > 1 && entries[0].size > 0)
  .map(([oid, entries]) => ({
    oid,
    copies: entries.length,
    bytes_each: entries[0].size,
    duplicate_bytes: entries[0].size * (entries.length - 1),
    paths: entries.map((entry) => entry.path).sort(),
  }))
  .sort((a, b) => b.duplicate_bytes - a.duplicate_bytes);

const sourceCorpusParts = [];
for (const entry of currentBlobs) {
  if (
    !referenceSourceExtensions.has(entry.extension)
    || nonSiteReferencePrefixes.some((prefix) => entry.path.startsWith(prefix))
    || entry.size > 10 * 1024 * 1024
  ) continue;
  try {
    sourceCorpusParts.push(await readFile(path.join(root, entry.path), 'utf8'));
  } catch {
    // Some text-like historical formats may not decode cleanly; absence remains uncertain.
  }
}
const sourceCorpus = sourceCorpusParts.join('\n');
const assetCategories = new Set(['image', 'document', 'audio/video', 'font', 'archive/container', 'executable/binary']);
const preservedSourceAssets = currentBlobs
  .filter((entry) => entry.path.startsWith('source-assets/') && assetCategories.has(entry.category));
const assetCandidates = currentBlobs
  .filter((entry) => entry.path.startsWith('public/') && assetCategories.has(entry.category));
const aliasTargets = new Map();
for (const entry of assetCandidates) {
  const aliases = [entry.path];
  if (entry.path.startsWith('public/')) aliases.push(`/${entry.path.slice('public/'.length)}`);
  for (const alias of aliases) {
    if (!aliasTargets.has(alias)) aliasTargets.set(alias, new Set());
    aliasTargets.get(alias).add(entry.path);
  }
}
const matcher = [{ next: new Map(), fail: 0, outputs: [] }];
for (const [alias, targets] of aliasTargets) {
  let state = 0;
  for (const character of alias) {
    if (!matcher[state].next.has(character)) {
      matcher[state].next.set(character, matcher.length);
      matcher.push({ next: new Map(), fail: 0, outputs: [] });
    }
    state = matcher[state].next.get(character);
  }
  matcher[state].outputs.push(...targets);
}
const queue = [...matcher[0].next.values()];
for (let position = 0; position < queue.length; position++) {
  const state = queue[position];
  for (const [character, nextState] of matcher[state].next) {
    queue.push(nextState);
    let fallback = matcher[state].fail;
    while (fallback && !matcher[fallback].next.has(character)) fallback = matcher[fallback].fail;
    matcher[nextState].fail = matcher[fallback].next.get(character) ?? 0;
    matcher[nextState].outputs.push(...matcher[matcher[nextState].fail].outputs);
  }
}
const referencedAssetPaths = new Set();
let matcherState = 0;
for (const character of sourceCorpus) {
  while (matcherState && !matcher[matcherState].next.has(character)) matcherState = matcher[matcherState].fail;
  matcherState = matcher[matcherState].next.get(character) ?? 0;
  for (const target of matcher[matcherState].outputs) referencedAssetPaths.add(target);
}
const sourceReferenceFor = (file) => referencedAssetPaths.has(file);
const assetReferenceEntries = assetCandidates.map((entry) => ({ ...entry, source_referenced: sourceReferenceFor(entry.path) }));
const apparentlyUnreferencedAssets = assetReferenceEntries.filter((entry) => !entry.source_referenced);

const formatFamilyKey = (file) => {
  const extension = extensionFor(file);
  return file.slice(0, -extension.length).replace(/^public\//, '');
};
const currentFormatFamilies = [...Map.groupBy(assetReferenceEntries, (entry) => formatFamilyKey(entry.path)).entries()]
  .filter(([, entries]) => new Set(entries.map((entry) => entry.extension)).size > 1)
  .map(([key, entries]) => ({
    key,
    bytes: entries.reduce((sum, entry) => sum + entry.size, 0),
    files: entries.map((entry) => ({ path: entry.path, size: entry.size, extension: entry.extension })),
  }))
  .sort((a, b) => b.bytes - a.bytes);

const revObjectsRaw = await git(['rev-list', '--objects', '--all']);
const reachableRecords = revObjectsRaw.trim().split('\n').filter(Boolean).map((line) => {
  const separator = line.indexOf(' ');
  return separator === -1 ? { oid: line, path: undefined } : { oid: line.slice(0, separator), path: line.slice(separator + 1) };
});
const reachablePathByOid = new Map();
for (const record of reachableRecords) if (record.path && !reachablePathByOid.has(record.oid)) reachablePathByOid.set(record.oid, record.path);
const reachableOids = [...new Set(reachableRecords.map((record) => record.oid))];
const batchInput = `${reachableOids.join('\n')}\n`;
const batchRaw = await git(['cat-file', `--batch-check=%(objectname)\t%(objecttype)\t%(objectsize)\t%(objectsize:disk)`], { input: batchInput });
const reachableObjects = batchRaw.trim().split('\n').filter(Boolean).map((line) => {
  const [oid, type, size, diskSize] = line.split('\t');
  const historicalPath = reachablePathByOid.get(oid);
  return {
    oid,
    type,
    size: Number(size),
    disk_size: Number(diskSize),
    historical_path: historicalPath,
    extension: historicalPath ? extensionFor(historicalPath) : '[unknown]',
    category: historicalPath ? categoryFor(historicalPath) : 'unknown',
    present_in_current_tree: currentOidSet.has(oid),
  };
});
const reachableBlobs = reachableObjects.filter((entry) => entry.type === 'blob');
const currentUniqueBlobs = reachableBlobs.filter((entry) => entry.present_in_current_tree);
const historicalOnlyBlobs = reachableBlobs.filter((entry) => !entry.present_in_current_tree);
const reachableObjectByOid = new Map(reachableObjects.map((entry) => [entry.oid, entry]));
const summarizeUniqueObjectStorage = (entries) => {
  const objects = [...new Set(entries.map((entry) => entry.oid))].map((oid) => reachableObjectByOid.get(oid)).filter(Boolean);
  return {
    blobs: objects.length,
    logical_bytes: objects.reduce((sum, entry) => sum + entry.size, 0),
    disk_bytes: objects.reduce((sum, entry) => sum + entry.disk_size, 0),
  };
};
const summarizeUniqueObjectStorageBy = (entries, key) => Object.fromEntries([...Map.groupBy(entries, (entry) => entry[key]).entries()]
  .map(([value, group]) => [value, summarizeUniqueObjectStorage(group)])
  .sort((a, b) => b[1].logical_bytes - a[1].logical_bytes || a[0].localeCompare(b[0])));
const objectIdsForRevisions = async (revisions) => new Set((await git(['rev-list', '--objects', ...revisions]))
  .trim().split('\n').filter(Boolean).map((line) => line.split(' ', 1)[0]));
const mainObjectIds = await objectIdsForRevisions(['main']);
const rebuildObjectIds = await objectIdsForRevisions(['rebuild/astro']);
const primaryObjectIds = await objectIdsForRevisions(['main', 'rebuild/astro']);
const summarizeObjectSubset = (include, exclude = new Set()) => {
  const blobs = [...include].filter((oid) => !exclude.has(oid)).map((oid) => reachableObjectByOid.get(oid)).filter((entry) => entry?.type === 'blob');
  return {
    blobs: blobs.length,
    logical_bytes: blobs.reduce((sum, entry) => sum + entry.size, 0),
    disk_bytes: blobs.reduce((sum, entry) => sum + entry.disk_size, 0),
    largest: [...blobs].sort((a, b) => b.size - a.size).slice(0, 20),
  };
};

const refsRaw = await git(['for-each-ref', '--format=%(refname)\t%(objectname)\t%(objecttype)\t%(creatordate:iso-strict)\t%(subject)']);
const refs = refsRaw.trim().split('\n').filter(Boolean).map((line) => {
  const [ref, oid, type, date, ...subject] = line.split('\t');
  return { ref, oid, type, date, subject: subject.join('\t') };
});

const countObjects = parseCountObjects(await git(['count-objects', '-v']));
const packDirectory = path.join(root, '.git', 'objects', 'pack');
const packInventory = [];
for (const item of await readdir(packDirectory, { withFileTypes: true })) {
  if (!item.isFile()) continue;
  const metadata = await stat(path.join(packDirectory, item.name));
  packInventory.push({ file: item.name, bytes: metadata.size });
}
packInventory.sort((a, b) => b.bytes - a.bytes);

const currentLfsPointers = [];
for (const entry of currentBlobs.filter((item) => item.size < 2048)) {
  try {
    const content = await readFile(path.join(root, entry.path), 'utf8');
    if (content.startsWith('version https://git-lfs.github.com/spec/v1')) currentLfsPointers.push(entry.path);
  } catch {
    // Ignore undecodable small blobs.
  }
}
const gitattributes = currentBlobs.find((entry) => entry.path === '.gitattributes')
  ? await readFile(path.join(root, '.gitattributes'), 'utf8')
  : '';
const historicalLfsConfig = await git(['log', '--all', '--format=%H', '-Sfilter=lfs', '--', '.gitattributes']);

const topCurrent = [...currentBlobs].sort((a, b) => b.size - a.size).slice(0, TOP_COUNT).map((entry) => ({
  ...entry,
  source_referenced: sourceReferenceFor(entry.path),
  duplicate_copies: duplicateGroups.find((group) => group.oid === entry.oid)?.copies ?? 1,
}));
const topHistorical = [...reachableBlobs].sort((a, b) => b.size - a.size).slice(0, TOP_COUNT);

const growthLog = await git([
  'log', '--all', '--reverse', '--topo-order', '--root', '--raw', '--no-abbrev', '--no-renames',
  '--format=@@@%H\t%aI\t%s',
]);
const introducedOids = new Set();
const introducedByOid = new Map();
const lastChangeByOid = new Map();
const growthByCommit = new Map();
const versionsByPath = new Map();
let currentCommit;
for (const line of growthLog.split('\n')) {
  if (line.startsWith('@@@')) {
    const [oid, date, ...subject] = line.slice(3).split('\t');
    currentCommit = { oid, date, subject: subject.join('\t') };
    if (!growthByCommit.has(oid)) growthByCommit.set(oid, { ...currentCommit, new_blobs: 0, logical_bytes: 0, disk_bytes: 0, by_category: {} });
    continue;
  }
  const match = line.match(/^:\d+ \d+ ([0-9a-f]+) ([0-9a-f]+) [A-Z]\s+(.+)$/);
  if (!match || !currentCommit) continue;
  const [, oldOid, newOid, changedPath] = match;
  if (!/^0+$/.test(oldOid) && reachableObjectByOid.get(oldOid)?.type === 'blob') lastChangeByOid.set(oldOid, currentCommit);
  const object = reachableObjectByOid.get(newOid);
  if (!object || object.type !== 'blob') continue;
  if (!versionsByPath.has(changedPath)) versionsByPath.set(changedPath, new Set());
  versionsByPath.get(changedPath).add(newOid);
  lastChangeByOid.set(newOid, currentCommit);
  if (introducedOids.has(newOid)) continue;
  introducedOids.add(newOid);
  introducedByOid.set(newOid, currentCommit);
  const growth = growthByCommit.get(currentCommit.oid);
  growth.new_blobs++;
  growth.logical_bytes += object.size;
  growth.disk_bytes += object.disk_size;
  const category = object.category;
  const categoryGrowth = growth.by_category[category] ?? { blobs: 0, logical_bytes: 0, disk_bytes: 0 };
  categoryGrowth.blobs++;
  categoryGrowth.logical_bytes += object.size;
  categoryGrowth.disk_bytes += object.disk_size;
  growth.by_category[category] = categoryGrowth;
}
const enrichHistorical = (entry) => ({
  ...entry,
  first_seen_commit: introducedByOid.get(entry.oid),
  last_change_commit: lastChangeByOid.get(entry.oid),
});
const binaryChurn = [...versionsByPath.entries()].map(([changedPath, oids]) => {
  const blobs = [...oids].map((oid) => reachableObjectByOid.get(oid)).filter(Boolean);
  return {
    path: changedPath,
    versions: blobs.length,
    logical_bytes: blobs.reduce((sum, entry) => sum + entry.size, 0),
    disk_bytes: blobs.reduce((sum, entry) => sum + entry.disk_size, 0),
    category: categoryFor(changedPath),
    current: currentBlobs.some((entry) => entry.path === changedPath),
  };
}).filter((entry) => entry.versions > 1 && entry.category !== 'source/text').sort((a, b) => b.disk_bytes - a.disk_bytes);

const result = {
  generated_at: new Date().toISOString(),
  baseline: {
    branch: (await git(['branch', '--show-current'])).trim(),
    head: (await git(['rev-parse', 'HEAD'])).trim(),
    git_version: (await git(['version'])).trim(),
    working_tree_files: workingFiles.length,
    working_tree_file_bytes: workingFiles.reduce((sum, entry) => sum + entry.size, 0),
    current_tree_files: currentBlobs.length,
    current_tree_logical_bytes: currentLogicalBytes,
    current_tree_median_file_bytes: sortedCurrentSizes.length % 2
      ? sortedCurrentSizes[Math.floor(sortedCurrentSizes.length / 2)]
      : (sortedCurrentSizes[sortedCurrentSizes.length / 2 - 1] + sortedCurrentSizes[sortedCurrentSizes.length / 2]) / 2,
    current_tree_max_file_bytes: sortedCurrentSizes.at(-1) ?? 0,
    reachable_objects: reachableObjects.length,
    reachable_blobs: reachableBlobs.length,
    reachable_blob_logical_bytes: reachableBlobs.reduce((sum, entry) => sum + entry.size, 0),
    reachable_blob_disk_bytes: reachableBlobs.reduce((sum, entry) => sum + entry.disk_size, 0),
    current_unique_blobs: currentUniqueBlobs.length,
    current_unique_blob_logical_bytes: currentUniqueBlobs.reduce((sum, entry) => sum + entry.size, 0),
    current_unique_blob_disk_bytes: currentUniqueBlobs.reduce((sum, entry) => sum + entry.disk_size, 0),
    historical_only_blobs: historicalOnlyBlobs.length,
    historical_only_blob_logical_bytes: historicalOnlyBlobs.reduce((sum, entry) => sum + entry.size, 0),
    historical_only_blob_disk_bytes: historicalOnlyBlobs.reduce((sum, entry) => sum + entry.disk_size, 0),
    refs: refs.length,
    local_branches: refs.filter((entry) => entry.ref.startsWith('refs/heads/')).length,
    remote_branches: refs.filter((entry) => entry.ref.startsWith('refs/remotes/')).length,
    tags: refs.filter((entry) => entry.ref.startsWith('refs/tags/')).length,
  },
  current_tree: {
    by_top_level: summarize(currentBlobs, 'top_level'),
    by_extension: summarize(currentBlobs, 'extension'),
    by_category: summarize(currentBlobs, 'category'),
    large_file_counts: Object.fromEntries(LARGE_THRESHOLDS.map(({ mb, bytes }) => [`over_${mb}_mib`, currentBlobs.filter((entry) => entry.size >= bytes).length])),
    top_files: topCurrent,
    asset_reference_evidence: {
      source_referenced: summarize(assetReferenceEntries.filter((entry) => entry.source_referenced), 'category'),
      apparently_unreferenced: summarize(apparentlyUnreferencedAssets, 'category'),
      source_referenced_unique_object_storage: summarizeUniqueObjectStorage(assetReferenceEntries.filter((entry) => entry.source_referenced)),
      apparently_unreferenced_unique_object_storage: summarizeUniqueObjectStorage(apparentlyUnreferencedAssets),
      apparently_unreferenced_object_storage_by_extension: summarizeUniqueObjectStorageBy(apparentlyUnreferencedAssets, 'extension'),
      apparently_unreferenced_object_storage_by_category: summarizeUniqueObjectStorageBy(apparentlyUnreferencedAssets, 'category'),
      largest_apparently_unreferenced: [...apparentlyUnreferencedAssets].sort((a, b) => b.size - a.size).slice(0, TOP_COUNT),
    },
    non_public_source_assets: {
      files: preservedSourceAssets.length,
      logical_bytes: preservedSourceAssets.reduce((sum, entry) => sum + entry.size, 0),
      by_extension: summarize(preservedSourceAssets, 'extension'),
      largest: [...preservedSourceAssets].sort((a, b) => b.size - a.size).slice(0, TOP_COUNT),
    },
    format_families: currentFormatFamilies.slice(0, TOP_COUNT),
  },
  duplicates: {
    groups: duplicateGroups.length,
    duplicate_copies: duplicateGroups.reduce((sum, group) => sum + group.copies - 1, 0),
    theoretical_savings_bytes: duplicateGroups.reduce((sum, group) => sum + group.duplicate_bytes, 0),
    largest_groups: duplicateGroups.slice(0, TOP_COUNT),
  },
  git_database: {
    count_objects: countObjects,
    pack_inventory: packInventory,
    reachable_objects_by_type: summarize(reachableObjects, 'type'),
    refs,
    ref_reachability: {
      main: summarizeObjectSubset(mainObjectIds),
      rebuild_astro: summarizeObjectSubset(rebuildObjectIds),
      main_and_rebuild: summarizeObjectSubset(primaryObjectIds),
      rebuild_only_vs_main: summarizeObjectSubset(rebuildObjectIds, mainObjectIds),
      main_only_vs_rebuild: summarizeObjectSubset(mainObjectIds, rebuildObjectIds),
      other_refs_only: summarizeObjectSubset(new Set(reachableOids), primaryObjectIds),
    },
  },
  reachable_history: {
    by_extension: summarize(reachableBlobs.filter((entry) => entry.historical_path), 'extension'),
    by_category: summarize(reachableBlobs.filter((entry) => entry.historical_path), 'category'),
    current_unique_by_extension: summarize(currentUniqueBlobs.filter((entry) => entry.historical_path), 'extension'),
    current_unique_by_category: summarize(currentUniqueBlobs.filter((entry) => entry.historical_path), 'category'),
    historical_only_by_extension: summarize(historicalOnlyBlobs.filter((entry) => entry.historical_path), 'extension'),
    historical_only_by_category: summarize(historicalOnlyBlobs.filter((entry) => entry.historical_path), 'category'),
    top_blobs: topHistorical.map(enrichHistorical),
    generated_or_vendor_paths: reachableBlobs.filter((entry) => entry.historical_path && /(^|\/)(node_modules|vendor|dist|_site|\.cache|coverage)(\/|$)/.test(entry.historical_path)).sort((a, b) => b.size - a.size).slice(0, TOP_COUNT),
  },
  lfs: {
    current_gitattributes_rules: gitattributes.split('\n').filter((line) => /filter=lfs/.test(line)),
    current_pointer_files: currentLfsPointers,
    historical_gitattributes_commits: historicalLfsConfig.trim().split('\n').filter(Boolean),
  },
  growth: {
    commits_analyzed: growthByCommit.size,
    attributed_blobs: introducedOids.size,
    largest_introductions_by_logical_bytes: [...growthByCommit.values()].sort((a, b) => b.logical_bytes - a.logical_bytes).slice(0, 50),
    largest_introductions_by_disk_bytes: [...growthByCommit.values()].sort((a, b) => b.disk_bytes - a.disk_bytes).slice(0, 50),
    binary_churn: binaryChurn.slice(0, 100),
  },
};

console.log(JSON.stringify(result, null, 2));
