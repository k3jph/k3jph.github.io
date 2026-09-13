import { readFile,rm,writeFile } from 'node:fs/promises'; import path from 'node:path';
const dist=path.join(process.cwd(),'dist');const source=path.join(dist,'contact-source');const html=await readFile(path.join(source,'index.html'),'utf8');await rm(source,{recursive:true});await writeFile(path.join(dist,'contact-me.html'),html);
