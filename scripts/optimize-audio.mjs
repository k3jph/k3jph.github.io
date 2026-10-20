import { createHash } from 'node:crypto';
import { createReadStream, createWriteStream } from 'node:fs';
import { chmod, mkdtemp, readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createGunzip } from 'node:zlib';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

// The archived source stays in public/ and Git. Only the dist/ derivative is
// recompressed, keeping the existing Media Archive URL unchanged.
const root = process.cwd();
const relativeAudio = 'assets/audio/fbn_e2_james_howard.mp3';
const source = path.join(root, 'public', relativeAudio);
const destination = path.join(root, 'dist', relativeAudio);
const maxBytes = 25 * 1024 * 1024;

// Cloudflare's Ubuntu build image does not include FFmpeg. Use the host FFmpeg
// when available; otherwise download a pinned, SHA-256-verified Linux binary.
// This build-only tool never enters the deployed static-assets directory.
const linuxBinaryUrl = 'https://github.com/eugeneware/ffmpeg-static/releases/download/b6.1.1/ffmpeg-linux-x64.gz';
const linuxBinarySha256 = 'bfe8a8fc511530457b528c48d77b5737527b504a3797a9bc4866aeca69c2dffa';

function run(binary, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(binary, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let stderr = '';
    child.stderr?.on('data', (chunk) => { stderr = (stderr + chunk).slice(-8192); });
    child.on('error', reject);
    child.on('close', (code) => code === 0 ? resolve() : reject(new Error(`${binary} exited ${code}: ${stderr.trim()}`)));
  });
}

async function resolveEncoder(tempDirectory) {
  try {
    await run('ffmpeg', ['-version']);
    return 'ffmpeg';
  } catch (error) {
    if (process.platform !== 'linux' || process.arch !== 'x64') {
      throw new Error(`FFmpeg unavailable on ${process.platform}/${process.arch}; install FFmpeg to encode the podcast`);
    }
  }

  const archive = path.join(tempDirectory, 'ffmpeg.gz');
  const encoder = path.join(tempDirectory, 'ffmpeg');
  const response = await fetch(linuxBinaryUrl, { signal: AbortSignal.timeout(120_000) });
  if (!response.ok || !response.body) throw new Error(`FFmpeg download failed: HTTP ${response.status}`);
  await pipeline(Readable.fromWeb(response.body), createWriteStream(archive));
  const digest = createHash('sha256');
  for await (const chunk of createReadStream(archive)) digest.update(chunk);
  if (digest.digest('hex') !== linuxBinarySha256) throw new Error('FFmpeg download failed SHA-256 verification');
  await pipeline(createReadStream(archive), createGunzip(), createWriteStream(encoder));
  await chmod(encoder, 0o755);
  await run(encoder, ['-version']);
  return encoder;
}

async function removeFallbackDirective(filename, isMatch) {
  let existing;
  try {
    existing = await readFile(filename, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }
  const remaining = existing.split(/\r?\n/).filter((line) => !isMatch(line));
  const updated = remaining.filter(Boolean).join('\n');
  if (updated) await writeFile(filename, `${updated}\n`);
  else await rm(filename, { force: true });
}

await stat(source); // A missing archival source is a hard error.
await stat(destination); // Astro must have copied it before this stage.
const tempDirectory = await mkdtemp(path.join(tmpdir(), 'jhcu-audio-'));
try {
  const encoder = await resolveEncoder(tempDirectory);
  const encoded = path.join(tempDirectory, 'podcast.mp3');
  await run(encoder, [
    '-hide_banner', '-loglevel', 'error', '-nostdin', '-y',
    '-i', source, '-map', '0:a:0', '-vn', '-ac', '1',
    '-codec:a', 'libmp3lame', '-b:a', '64k',
    '-map_metadata', '0', '-id3v2_version', '3', encoded,
  ]);
  const { size } = await stat(encoded);
  if (size === 0 || size > maxBytes) {
    throw new Error(`Encoded audio ${size} bytes is outside Workers' 1–25 MiB range`);
  }
  await rename(encoded, destination);
  await removeFallbackDirective(path.join(root, 'dist', '.assetsignore'), (line) => line.trim() === relativeAudio);
  await removeFallbackDirective(path.join(root, 'dist', '_redirects'), (line) => line.startsWith(`/${relativeAudio} `));
  console.log(`Optimized podcast for Cloudflare: ${(size / 1048576).toFixed(2)} MiB (64 kbps mono); archival original unchanged.`);
} catch (error) {
  // The existing redirect to the archived GitHub recording stays in place if
  // encoding cannot run, preserving the already-working Workers deployment.
  console.warn(`Podcast optimization skipped: ${error.message}`);
  console.warn('Retaining Cloudflare assetsignore + redirect to the original GitHub recording.');
} finally {
  await rm(tempDirectory, { recursive: true, force: true });
}
