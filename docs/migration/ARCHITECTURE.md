# Astro architecture

JamesHoward.us is statically generated with Astro. The historical Markdown corpus remains in `_posts`, `_ancestry`, and the top-level content directories so authors retain familiar source files and Git history.

`scripts/prepare-content.mjs` translates front matter and the small set of legacy Liquid includes into generated Astro content collections under `.generated/`. It also records every canonical route and alias in `.generated/data/route-ledger.json`. Generated content is disposable and must not be edited directly.

The presentation layer lives in `src/`: shared layouts and components, native archive pages, dynamic post/page routing, tag pagination, client-side search, RSS/Atom, and the sitemap. Static assets are served unchanged from `public/assets`.

## Publishing contract

- Future-dated posts remain out of the build until their publication time.
- Existing permalinks and `redirect_from` aliases are generated as static routes.
- `/contact-me.html`, `CNAME`, and `robots.txt` retain their historical filenames.
- `npm run validate` type-checks, builds, audits local links, checks required routes, and rejects unresolved Liquid in output.
- GitHub Pages deploys only from `main`; pull requests run validation without deployment.

## Authoring

Create a dated Markdown file under `_posts/YYYY/`, preserving the existing front-matter conventions. Run `npm install` once, then `npm run dev`. Before opening a pull request, run `npm run validate`.
