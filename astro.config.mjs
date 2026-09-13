import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

function remarkExplicitHeadingIds() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'heading') {
        const last = node.children?.at(-1);
        if (last?.type === 'text') {
          const match = last.value.match(/\s*\{#([^}]+)\}\s*$/);
          if (match) {
            last.value = last.value.slice(0, match.index).trimEnd();
            node.data = { ...(node.data ?? {}), hProperties: { ...(node.data?.hProperties ?? {}), id: match[1] } };
          }
        }
      }
      for (const child of node.children ?? []) walk(child);
    };
    walk(tree);
  };
}

export default defineConfig({
  site: 'https://jameshoward.us',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  markdown: {
    processor: unified({ gfm: true, remarkPlugins: [remarkGfm, remarkMath, remarkExplicitHeadingIds], rehypePlugins: [rehypeKatex] }),
    shikiConfig: { theme: 'github-dark', wrap: true },
  },
});
