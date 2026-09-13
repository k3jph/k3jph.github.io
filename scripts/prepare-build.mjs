import { rm } from 'node:fs/promises'; import path from 'node:path';
await rm(path.join(process.cwd(),'dist'),{recursive:true,force:true});
await rm(path.join(process.cwd(),'.astro'),{recursive:true,force:true});
