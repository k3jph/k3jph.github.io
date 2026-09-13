# JamesHoward.us

The source for [jameshoward.us](https://jameshoward.us), built as a static Astro site. It contains a long-running blog plus scholarship, teaching, software, public-service, book, heraldry, and ancestry archives.

## Local development

Node.js 24 is the supported runtime.

```bash
npm ci
npm run dev
```

Astro’s local server prints its preview URL. Changes to Markdown source are translated into disposable content collections before each run.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Prepare content and start the development server |
| `npm run audit` | Reject Liquid, Bootstrap classes, inline styles, and scripts in active content |
| `npm run check` | Validate Astro and TypeScript |
| `npm run build` | Create the production site in `dist/` |
| `npm run validate` | Run the complete diagnostics, build, route, and local-link gate |

## Content

- Blog posts: `_posts/YYYY/`
- Ancestry records: `_ancestry/`
- Structured records: `_data/`
- Permanent Markdown pages: repository root and topic directories
- Composed Markdown fragments: `content/fragments/`
- Static assets: `public/assets/`

Content uses semantic Markdown directives such as `figure`, `document`, `book-detail`, and `ribbon-rack`; `src/plugins/remark-site-primitives.mjs` owns their rendering. Generated files under `.generated/` must not be edited. Existing `permalink` and `redirect_from` values are part of the public URL contract. Astro accepts slashless and trailing-slash requests during development while emitting directory-formatted static pages.

GitHub Actions validates pull requests. The deployment workflow builds and publishes `main` to GitHub Pages on pushes, manual dispatch, and the nightly scheduled-post check.

See [the architecture notes](docs/migration/ARCHITECTURE.md) and [release checklist](docs/migration/RELEASE-READINESS.md) for migration details.
