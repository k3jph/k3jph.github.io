import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { marked } from 'marked';
import YAML from 'yaml';

const root = process.cwd();
const generated = path.join(root, '.generated');
const special = new Set(['404.md','ancestry.md','blog/index.html','books.md','contact-me.html','honors.md','index.html','search.md','service.md','software.md','teaching.md','tartan.md']);
await rm(generated, { recursive: true, force: true });
await mkdir(path.join(generated, 'content'), { recursive: true });
await mkdir(path.join(generated, 'data'), { recursive: true });

const parse = (source, file) => matter(source, { engines: { yaml: (text) => YAML.parse(text) ?? {} } });
const array = (value) => value == null || value === false ? [] : Array.isArray(value) ? value : [value];
const esc = (value) => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const attr = (value) => esc(value).replaceAll('\n','&#10;');
const slug = (value) => String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
function route(value, file) {
  if (value) { const text = String(value).trim(); const out = text.startsWith('/') ? text : `/${text}`; return out === '/' || path.posix.extname(out) || out.endsWith('/') ? out : `${out}/`; }
  const ext = path.posix.extname(file); const name = file.slice(0, -ext.length); return name === 'index' ? '/' : ext === '.html' ? `/${file}` : `/${name}/`;
}
function image(value) { const text=String(value??'').trim(); if(!text||/^(?:https?:)?\/\//.test(text)||text.startsWith('data:'))return text; const rooted=text.startsWith('/')?text:`/${text}`; return rooted.startsWith('/assets/')?rooted:`/assets/img${rooted}`; }
function text(value) { return String(value??'').replace(/<[^>]+>/g,' ').replace(/!\[[^\]]*\]\([^)]*\)/g,' ').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/\{[%{][\s\S]*?[}%]\}/g,' ').replace(/[#_*`>|~]/g,' ').replace(/\s+/g,' ').trim(); }
function excerpt(value, words=32) { const parts=text(value).split(' '); return `${parts.slice(0,words).join(' ')}${parts.length>words?'…':''}`; }
function includeArgs(expression) {
  const match=expression.trim().match(/^([^\s]+)([\s\S]*)$/); if(!match)return{name:'',args:{}};
  const args={}; let source=match[2], i=0;
  while(i<source.length){while(/\s/.test(source[i]??''))i++;const key=source.slice(i).match(/^([\w-]+)\s*=\s*/);if(!key)break;i+=key[0].length;const quote=['"',"'"].includes(source[i])?source[i++]:null;let value='';if(quote){while(i<source.length){const c=source[i++];if(c===quote&&source[i-2]!=='\\')break;value+=c;}}else while(i<source.length&&!/\s/.test(source[i]))value+=source[i++];args[key[1]]=value==='true'?true:value==='false'?false:value;}
  return {name:match[1],args};
}

async function yaml(file){return YAML.parse(await readFile(path.join(root,file),'utf8'));}
const [books,honors,service,software,teaching,settings,profile,mddfRibbons]=await Promise.all(['_data/books.yml','_data/honors.yml','_data/service.yml','_data/software.yml','_data/teaching.yml','_data/settings.yml','_data/profile.yml','_data/mddf_ribbons.yaml'].map(yaml));
const postFiles=(await fg('_posts/**/*.{md,markdown}',{cwd:root})).sort();
const posts=[];
for(const file of postFiles){const p=parse(await readFile(path.join(root,file),'utf8'),file);posts.push({file,data:p.data,body:p.content,route:route(p.data.permalink,file)});}
const routeLedger=posts.map(p=>({source:p.file,route:p.route,type:'blog'}));

function postCard(post){return `<article class="card post-card"><a class="card-media" href="${attr(post.route)}"><img src="${attr(image(post.data.featured_image||'identity/kamon-info.svg'))}" alt="" loading="lazy"></a><div class="card-body"><p class="eyebrow">${esc(String(post.data.date).slice(0,10))}</p><h3><a href="${attr(post.route)}">${esc(post.data.title)}</a></h3><p>${esc(excerpt(post.body,25))}</p></div></article>`;}
function bookCards(){return (books.published??[]).map(b=>`<article class="card book-card"><a class="book-cover" href="${attr(b.detail_url)}"><img src="${attr(image(b.cover))}" alt="${attr(b.cover_alt)}" loading="lazy"></a><div class="card-body"><p class="eyebrow">${esc(b.edition)} · ${esc(b.year)}</p><h3><a href="${attr(b.detail_url)}">${esc(b.title)}</a></h3><p>${b.summary}</p></div></article>`).join('');}
function bookDetail(want){const b=(books.published??[]).find(x=>x.slug===want);if(!b)return'';return `<article class="book-detail"><div class="book-detail-hero"><img src="${attr(image(b.cover))}" alt="${attr(b.cover_alt)}"><div><p class="eyebrow">${esc(b.edition)} · ${esc(b.year)}</p><p>${b.summary}</p><p class="link-row"><a href="${attr(b.publisher_url)}">Publisher page ↗</a><a href="/books/">All books →</a></p></div></div><dl class="facts"><div><dt>Role</dt><dd>${esc(b.role)}</dd></div><div><dt>Publisher</dt><dd>${esc(b.publisher)}</dd></div><div><dt>Print ISBN</dt><dd>${esc(b.print_isbn)}</dd></div>${b.doi?`<div><dt>DOI</dt><dd><a href="https://doi.org/${attr(b.doi)}">${esc(b.doi)}</a></dd></div>`:''}</dl></article>`;}
function projects(args){const key=String(args.projects??'').split('.').at(-1);return `<div class="record-grid">${(software[key]??[]).map(p=>`<article class="record-card"><p class="eyebrow">${esc(p.status)} · ${esc(p.period)}</p><h3>${esc(p.name)}</h3><p>${p.summary}</p><p class="link-row">${(p.links??[]).map(l=>`<a href="${attr(l.url)}">${esc(l.label)} →</a>`).join('')}</p></article>`).join('')}</div>`;}
function professional(){return `<ul>${honors.filter(h=>h.category==='professional').map(h=>`<li>${esc(h.title)} of the ${h.evidence?`<a href="${attr(h.evidence)}">${esc(h.issuer)}</a>`:esc(h.issuer)}, ${esc(h.date)}</li>`).join('')}</ul>`;}
function ribbons(type){return `<div class="ribbonrack"><div class="ribbon-grid">${mddfRibbons.filter(r=>r.type===type).map(r=>`<a href="${attr(r.url||`#${r.id}`)}" class="ribbon"><img src="${attr(r.img)}" alt="${attr(r.alt)}" title="${attr(r.alt)}" loading="lazy"></a>`).join('')}</div></div>`;}
function renderInclude(name,args){
  if(name==='figure.html'){const raw=String(args.width??'100%');const n=Number.parseFloat(raw);const width=raw.includes('%')?n:n<=12?n/12*100:n;const place=['left','right','center'].includes(args.placement)?args.placement:'center';const pic=`<img src="${attr(image(args.image))}" alt="${attr(args.alt??'')}" loading="${attr(args.loading??'lazy')}"${args.border?' class="image-border"':''}>`;return `<figure class="content-figure content-figure--${place}" style="--figure-width:${Number.isFinite(width)?width:100}%">${args.link?`<a href="${attr(args.link)}">${pic}</a>`:pic}${args.cap?`<figcaption>${marked.parseInline(String(args.cap))}</figcaption>`:''}</figure>`;}
  if(name==='youtube.html')return `<div class="embed embed--video"><iframe src="https://www.youtube-nocookie.com/embed/${attr(args.id)}" title="YouTube video" loading="lazy" allowfullscreen></iframe></div>`;
  if(name==='iframely.html')return `<p class="embed-link"><a href="${attr(args.url)}">View embedded source</a></p>`;
  if(name==='fbembed.html')return `<p class="embed-link"><a href="${attr(args.url)}">View the original Facebook post</a></p>`;
  if(name==='pdfembed.html'){const href=`/assets/docs/${String(args.pdf??'').replace(/^\/+/,'')}`;return `<div class="embed embed--document"><iframe src="${attr(href)}" title="Embedded PDF document" loading="lazy"></iframe><p><a href="${attr(href)}">Open the PDF document</a></p></div>`;}
  if(name==='eqn.html')return `\n\n$$\n${String(args.eqn??'').trim()}\n$$\n\n`;
  if(name==='doi.html'){const doi=String(args.doi??'').replace(/^doi:\s*/i,'');return `<a href="https://doi.org/${attr(doi)}">doi:${esc(doi)}</a>`;}
  if(name==='relatedposts.html'){const tag=String(args.tag??'');return `<section class="related-posts"><h2>Related posts</h2><div class="card-grid">${posts.filter(p=>array(p.data.tags).map(String).includes(tag)).slice(0,6).map(postCard).join('')}</div></section>`;}
  if(name==='book-cards.html')return `<div class="book-grid">${bookCards()}</div>`;
  if(name==='book-detail.html')return bookDetail(String(args.slug??''));
  if(name==='software-projects.html')return projects(args);
  if(name==='cloudflare_image.html')return `<img src="${attr(image(args.image))}" alt="${attr(args.alt??'')}" loading="lazy">`;
  if(name==='background_header.html')return `<img class="featured-bg" src="${attr(image(args.image??'header-home.webp'))}" alt="">`;
  if(name==='markdown.html')return marked.parse(String(args.contentmd??''));
  if(name==='inset.html')return `<aside class="inset"><h3>${esc(args.title)}</h3>${marked.parse(String(args.text??''))}</aside>`;
  if(name==='honor-card.html')return '';
  if(name==='ancestry-service.html')return '';
  return '';
}
async function transform(body){
  let out=body;
  for(const match of body.matchAll(/{%\s*include(?:_relative)?\s+(_includes\/(?:grants|pubs)\.md)\s*%}/g))out=out.replace(match[0],await readFile(path.join(root,match[1]),'utf8'));
  out=out.replace(/{%\s*comment\s*%}[\s\S]*?{%\s*endcomment\s*%}/g,'');
  out=out.replace(/{%\s*assign\s+professional_recognition[^%]*%}[\s\S]*?{%\s*endfor\s*%}\s*<\/ul>/g,professional());
  out=out.replace(/{%\s*assign\s+ribbons\s*=\s*site\.data\.mddf_ribbons\s*\|\s*where:\s*["']type["'],["']([^"']+)["']\s*%}[\s\S]*?<\/div>\s*<\/div>(?=\s*####)/g,(_m,t)=>ribbons(t));
  out=out.replace(/{%\s*highlight\s+([^\s%]+)[^%]*%}([\s\S]*?){%\s*endhighlight\s*%}/g,(_m,l,c)=>`\n\n\`\`\`${String(l).toLowerCase()}\n${c.trim()}\n\`\`\`\n\n`);
  out=out.replace(/^```R\s*$/gm,'```r');
  out=out.replace(/{%\s*include(?:_relative)?\s+([\s\S]*?)%}/g,(_m,x)=>{const {name,args}=includeArgs(x);return renderInclude(name,args);});
  return out.replace(/{{\s*'([^']+)'\s*\|\s*(?:relative_url|cloudflare_image_url(?::[^}]*)?)\s*}}/g,'$1').replace(/{{\s*site\.url\s*}}/g,'https://jameshoward.us').replace(/{{\s*'now'\s*\|\s*date:\s*["']%Y["']\s*}}/g,String(new Date().getUTCFullYear()));
}
async function write(collection,file,data,body,url){const destination=path.join(generated,'content',collection,file.replace(/\.(?:html|markdown)$/i,'.md'));await mkdir(path.dirname(destination),{recursive:true});await writeFile(destination,`---\n${YAML.stringify({...data,route:url,source_path:data.source_path,redirect_from:array(data.redirect_from).map(String)}).trimEnd()}\n---\n${await transform(body)}`);}
for(const p of posts)await write('blog',p.file.replace(/^_posts\//,''),{...p.data,excerpt:excerpt(p.body),source_path:p.file},p.body,p.route);
const ancestryFiles=(await fg('_ancestry/**/*.{md,markdown}',{cwd:root})).sort();
for(const file of ancestryFiles){const p=parse(await readFile(path.join(root,file),'utf8'),file);const url=route(p.data.permalink,file);routeLedger.push({source:file,route:url,type:'ancestry'});await write('ancestry',file.replace(/^_ancestry\//,''),{...p.data,source_path:file},p.content,url);}
const pagePatterns=['*.{md,html}','archive/**/*.{md,html}','books/**/*.{md,html}','games/**/*.{md,html}','honors/**/*.{md,html}','service/**/*.{md,html}'];
const pageFiles=(await fg(pagePatterns,{cwd:root})).filter(f=>!special.has(f)&&!['README.md','_templates/post.md','laserprj.html'].includes(f)).sort();
for(const file of pageFiles){const p=parse(await readFile(path.join(root,file),'utf8'),file);const url=route(p.data.permalink,file);routeLedger.push({source:file,route:url,type:'page'});await write('pages',file,{...p.data,title:p.data.title??path.basename(file),source_path:file},p.content,url);}
const redirects=[];
for(const p of posts)for(const from of array(p.data.redirect_from))redirects.push({from:route(from,''),to:p.route,source:p.file});
for(const file of [...ancestryFiles,...pageFiles,...special]){try{const p=parse(await readFile(path.join(root,file),'utf8'),file);const to=file==='index.html'?'/':route(p.data.permalink,file);for(const from of array(p.data.redirect_from))redirects.push({from:route(from,''),to,source:file});if(p.data.redirect_to)redirects.push({from:to,to:String(p.data.redirect_to),source:file});}catch(error){if(error.code!=='ENOENT')throw error;}}
redirects.push({from:'/tartan/',to:'/coat-of-arms/#tartan',source:'tartan.md'},{from:'/contact-me/',to:'/contact-me.html',source:'contact-me.html'});
const redirectMap=new Map();for(const item of redirects){const prior=redirectMap.get(item.from);if(prior&&prior.to!==item.to)throw new Error(`Conflicting redirects for ${item.from}: ${prior.to} and ${item.to}`);redirectMap.set(item.from,item);}const uniqueRedirects=[...redirectMap.values()];
await writeFile(path.join(generated,'data','site.json'),`${JSON.stringify({siteUrl:'https://jameshoward.us',books,honors,service,software,teaching,settings,profile,mddfRibbons,redirects:uniqueRedirects},null,2)}\n`);
await writeFile(path.join(generated,'data','posts.json'),`${JSON.stringify(posts.map(p=>({...p.data,route:p.route,source_path:p.file,excerpt:excerpt(p.body)})),null,2)}\n`);
await writeFile(path.join(generated,'data','route-ledger.json'),`${JSON.stringify({generated_at:new Date().toISOString(),routes:routeLedger,redirects:uniqueRedirects},null,2)}\n`);
console.log(`Prepared ${posts.length} posts, ${ancestryFiles.length} ancestry records, ${pageFiles.length} pages, and ${uniqueRedirects.length} redirects.`);
