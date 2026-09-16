import path from 'node:path';
import { buildNavigationGraph, navigationGraphSummary } from './lib/navigation-graph.mjs';

const graph = await buildNavigationGraph(path.join(process.cwd(), 'dist'));
console.log(JSON.stringify(navigationGraphSummary(graph), null, 2));
