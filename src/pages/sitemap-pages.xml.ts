import {getCollection} from 'astro:content';import {urlset,xmlHeaders} from '../lib/xml';
export async function GET(){const pages=(await getCollection('pages')).filter(p=>p.data.sitemap!==false);return new Response(urlset(pages.map(p=>({route:p.data.route,lastmod:p.data.date}))),{headers:xmlHeaders});}
