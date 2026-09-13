import {getCollection} from 'astro:content';import {urlset,xmlHeaders} from '../lib/xml';
export async function GET(){const records=(await getCollection('ancestry')).filter(p=>p.data.sitemap!==false);return new Response(urlset(records.map(p=>({route:p.data.route}))),{headers:xmlHeaders});}
