import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const target = '/contact-me/';
const redirect = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Contact Me | James Howard</title><link rel="canonical" href="https://jameshoward.us${target}"><meta http-equiv="refresh" content="0;url=${target}"></head><body><p><a href="${target}">Continue to Contact Me</a></p></body></html>`;
await writeFile(path.join(dist, 'contact-me.html'), redirect);
