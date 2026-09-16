# Astro architecture

JamesHoward.us is statically generated with Astro. The historical Markdown corpus remains in `_posts`, `_ancestry`, and the top-level content directories so authors retain familiar source files and Git history.

`scripts/prepare-content.mjs` copies validated front matter and Markdown into generated Astro content collections under `.generated/`. It composes the named scholarship fragments and records every canonical route and alias in `.generated/data/route-ledger.json`. It does not interpret Liquid or Jekyll templates. Generated content is disposable and must not be edited directly.

Reusable content concepts are Markdown directives rendered by `src/plugins/remark-site-primitives.mjs`: figures, documents, media links, book details, professional recognition, ribbon racks, callouts, and credential grids. Structured records remain in `_data/` as the canonical source for index and detail views.

The editorial Writing layer is canonical in `_data/writing.yml`. `scripts/prepare-content.mjs` validates its selected essays, subjects, series, route references, and route ownership, then resolves post metadata into disposable `.generated/data/writing.json`. Writing pages never duplicate post titles, dates, images, excerpts, or historical status in their canonical data.

The site-wide Subjects discovery layer is canonical in `_data/subjects.yml`. It selects resources by stable identifier from Writing, Scholarship, Books, Software, Teaching, and the substantively relevant portions of Service. `scripts/prepare-content.mjs` resolves the destination metadata into disposable `.generated/data/subjects.json`; Subject pages do not create canonical copies of the underlying resources.

The presentation layer lives in `src/`: shared layouts and components, native archive pages, dynamic post/page routing, tag pagination, client-side search, RSS/Atom, and the sitemap. Static assets are served unchanged from `public/assets`.

## Publishing contract

- Future-dated posts remain out of the build until their publication time.
- Existing permalinks and `redirect_from` aliases are generated as static routes.
- `/contact-me.html`, `CNAME`, and `robots.txt` retain their historical filenames.
- Astro uses `trailingSlash: "ignore"` for compatible local navigation and retains directory-formatted static output.
- `npm run validate` rejects legacy content constructs, type-checks, builds, audits local links, checks accessibility invariants, and verifies representative content primitives.
- GitHub Pages deploys only from `main`; pull requests run validation without deployment.

## Authoring

Create a dated Markdown file under `_posts/YYYY/`, preserving the existing front-matter conventions. Run `npm ci` once, then `npm run dev`. Before opening a pull request, run `npm run validate`.
