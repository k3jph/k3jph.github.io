import { readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const prerender = path.join(dist, '.prerender');
const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

// Astro can finish materializing this build-only bundle just after its parent
// command returns. Require a stable absence window so deployment validation is
// deterministic instead of racing that late write.
let absentChecks = 0;
for (let attempt = 0; attempt < 32 && absentChecks < 6; attempt++) {
  await rm(prerender, { recursive: true, force: true });
  await pause(250);
  try {
    await stat(prerender);
    absentChecks = 0;
  } catch {
    absentChecks++;
  }
}
if (absentChecks < 6) throw new Error('Astro .prerender output did not stop reappearing');
const target = '/contact-me/';
const redirect = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Contact Me | James Howard</title><link rel="canonical" href="https://jameshoward.us${target}"><meta http-equiv="refresh" content="0;url=${target}"></head><body><p><a href="${target}">Continue to Contact Me</a></p></body></html>`;
await writeFile(path.join(dist, 'contact-me.html'), redirect);

// Cloudflare Workers Static Assets has a hard 25 MiB limit per file.
// Preserve the larger podcast recording in GitHub and serve the existing public
// URL via a temporary redirect rather than remove or re-encode the archive.
// GitHub Pages ignores these directives and continues serving its local copy.
// When the recording moves to R2, update only the destination below.
const preservedPodcast = 'assets/audio/fbn_e2_james_howard.mp3';
const podcastSource = '/' + preservedPodcast;
const podcastDestination = 'https://raw.githubusercontent.com/k3jph/k3jph.github.io/main/public/assets/audio/fbn_e2_james_howard.mp3';

async function ensureDirective(filename, directive) {
  let current = '';
  try {
    current = await readFile(filename, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (current.split(/\r?\n/).includes(directive)) return;
  const newline = current && !current.endsWith('\n') ? '\n' : '';
  await writeFile(filename, current + newline + directive + '\n');
}

await ensureDirective(path.join(dist, '.assetsignore'), preservedPodcast);
await ensureDirective(path.join(dist, '_redirects'), `${podcastSource} ${podcastDestination} 302`);
