# Native Astro conversion report

## Outcome

The conversion sweep keeps the production Jekyll site on `main` as the control and changes only `rebuild/astro`. Astro now accepts slashless and trailing-slash requests in development while retaining directory-formatted static output.

The active corpus no longer relies on Liquid parsing, Jekyll includes, Bootstrap layout classes, inline presentation styles, or scripts embedded in content. Content preparation is now a collection/front-matter pipeline, not a compatibility template engine.

## Corpus audit

| Family | Files | Liquid | Bootstrap classes | Inline styles | Content scripts | Semantic directives | Raw divs retained |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Blog | 794 | 0 | 0 | 0 | 0 | 294 | 274 |
| Ancestry | 46 | 0 | 0 | 0 | 0 | 52 | 30 |
| Permanent/detail pages and fragments | 36 | 0 | 0 | 0 | 0 | 81 | 148 |
| **Total** | **876** | **0** | **0** | **0** | **0** | **427** | **452** |

The initial inventory found 428 historical include calls, 64 Liquid highlight blocks, and 126 Liquid URL expressions in active content. They were converted to directives, fenced code, or ordinary URLs. Twelve obsolete duplicate page sources and 47 unreferenced Bootstrap, jQuery, Gaia Sass, and legacy helper files were removed.

Raw HTML remains where it represents substantive structures, especially heraldic galleries, documentary record groups, tables, and historical embeds. The highest-density files for the later visual pass are:

- `2024-11-03-the-evolution-of-the-royal-arms.md`
- `coat-of-arms.md`
- `2024-12-10-on-the-royal-badges.md`
- `2025-01-01-the-lion-and-the-unicorn.md`
- `honors/kingdom-of-hawaii.md`
- `honors/grand-duchy-of-westarctica.md`
- `2025-05-15-how-to-design-a-tartan.md`

Their old grid and utility classes have been replaced with site-owned semantic classes. Their detailed visual tuning is intentionally deferred.

## Native primitives and page systems

- One `PageIntro` hero system covers archives, posts, ancestry records, and permanent/detail pages; the homepage retains its purposeful identity hero.
- `figure` owns images, captions, borders, alignment, lazy loading, and the historical twelve-column width meaning.
- `document`, `youtube`, and `embed` own document and external-media presentation.
- `book-detail`, `professional-recognition`, and `ribbon-rack` render canonical YAML records rather than duplicated page markup.
- `credential-grid`, `callout`, and `related-posts` express page concepts without Bootstrap.
- A shared accessible dialog replaces four duplicated ancestry modal scripts.
- Tables retained in content are actual rank or statistical data tables, not layout tables.
- Standard Markdown footnotes render accessible backlinks; fenced code and KaTeX continue through the Astro Markdown pipeline.

`BaseLayout` remains the single document shell. `PageIntro`, `BlogArchive`, `TableOfContents`, `DataCard`, and `PostCard` provide the shared structures needed by the permanent, detail, archive, and long-form families; separate layouts were not created where composition already expressed the distinction cleanly. The dynamic catch-all selects the relevant content family and composes those primitives.

Canonical data remains in `_data/books.yml`, `_data/honors.yml`, and `_data/mddf_ribbons.yaml`. Book details, professional recognition, and ribbon displays now read those sources directly, eliminating their duplicated content markup. Scholarship's reusable publication and grant records moved from Jekyll include storage to native Markdown fragments.

## Routing audit

The shared `sitePath()` helper canonicalizes generated internal page links while preserving file routes, query strings, fragments, mail links, and external URLs. It is used by the primary navigation, footer notices, post cards, data cards, ancestry record cards, and book cards. Archive pagination, tag links, breadcrumbs, homepage cards, feed links, and static redirects already emit valid directory URLs.

Historical `redirect_from` values still produce static aliases. The ancestry aliases (`/hereditary-societies/`, `/hs/`, and `/family/`), `/tartan/`, and the contact alias are declared in the native route policy after their obsolete Jekyll source pages were removed.

Deployment must still test both URL forms on GitHub Pages before any merge because host behavior is outside Astro's development router.

Routing classes corrected were the primary navigation, footer notices, homepage destinations, post and data cards, ancestry cards, and book cards. The existing archive pagination, tags, breadcrumbs, feeds, collection links, and redirect outputs were audited and already conformed to the policy.

## Required final searches

| Pattern or dependency | Active-content result | Disposition |
| --- | ---: | --- |
| `{%` | 0 files | All Liquid tags removed. |
| `{{` | 0 files | All Liquid output expressions removed. |
| `relative_url` | 0 files | Replaced by ordinary URLs or native route handling. |
| `absolute_url` | 0 files | Replaced by ordinary URLs or native route handling. |
| `style=` | 0 files | Presentation moved to site-owned CSS and primitives. |
| Bootstrap layout classes | 0 files | Content dependency removed; old Bootstrap/Gaia infrastructure deleted. |
| `site.` | 20 occurrences in 18 files | Ordinary prose and URL/filename text such as “website.” and “frontpage.webp”; no template variables. |
| `page.` | 20 occurrences in 18 files | Ordinary prose and URL/filename text such as “page.” and “coverpage.webp”; no template variables. |

References to Jekyll and Bootstrap remain only where they are descriptive documentation, enforcement code, a historical comment, the privacy helper's comment, or Font Awesome's unrelated Bootstrap brand icon. None is a runtime content dependency.

## Validation

`npm run validate` now enforces:

- no Liquid, Bootstrap layout classes, inline styles, content scripts, unknown directives, or untitled iframes in active content;
- Astro and TypeScript diagnostics;
- production build completion;
- required output routes and every local `href`/`src` target;
- one page-level `h1` on non-redirect HTML, image alt attributes, iframe titles, and footnote backlinks;
- representative book, recognition, ribbon, Coat of Arms, KaTeX, and footnote output.

The completed build contains 2,225 HTML routes, including 125 redirect routes, 4,019 static files, and 68,347 checked local references. The ten supplied long-form sample posts were also resolved through the route ledger and confirmed present in `dist`.

Content counts remain 794 posts and 46 ancestry records before and after the sweep. The 12 removed root sources were obsolete duplicates of native Astro routes, not unique content. The build reports no missing-content discrepancy.

## Representative review notes

The rendered-output gate checks the homepage navigation, About recognition data, a book detail, the Maryland Defense Force ribbon groups, the Coat of Arms tartan section, display mathematics, and a long post's footnote backlinks. The source audit separately covers every blog post and ancestry record.

| Representative route | Architecture review | Deferred presentation review |
| --- | --- | --- |
| Homepage | Native page, shared header/footer, collection-backed recent posts | Hero rhythm and card density |
| About | Native content with canonical recognition and credential primitives | Credential spacing |
| Service | Native page and data cards; detail routes share the common shell | Card and section rhythm |
| Teaching | Native route and canonical link policy; both URL forms accepted by Astro | Hero transition |
| Scholarship | Native page composed from publication/grant fragments | Dense-list typography |
| Blog index | Native collection archive and post cards | Measure and pagination styling |
| Recent post | Common post family, metadata, figures, and related links | Long-form type scale |
| Old complicated post | Converted directives, semantic retained HTML, code/math support | Per-post media sizing |
| Ancestry index | Native collection cards and filtering | Mobile filter density |
| Long ancestry page | Common detail family plus shared gallery dialog | Gallery spacing |
| Honors | Canonical data views and common detail routes | Card consistency |
| Coat of Arms | Full content retained; figures, document links, and semantic galleries normalized | Large-gallery pacing |
| Search | Native utility route with generated search data | Result-density tuning |
| 404 | Native utility route included in output validation | Final copy/spacing check |

Browser screenshot capture could not be completed in the build environment because the browser binary download failed certificate validation. No certificate checks were bypassed. Desktop/mobile screenshots and the final production-host two-form URL test therefore remain explicit pre-merge review items in `RELEASE-READINESS.md`.

## Delivery inventory

- Liquid: 428 include calls, 64 highlight blocks, and 126 URL expressions removed; none remain in active content.
- Figures: 347 figure directives across the three audited families; captions, borders, alignment, credits/links, responsive width meaning, and lazy loading are centralized.
- Documents and embeds: repeated structured download/embed treatments use `document`, `youtube`, and `embed`; surviving raw embeds are historical content and all iframes have titles.
- TOCs: long-form routes use the shared Astro `TableOfContents`; bespoke meaningful internal link lists remain content.
- Footnotes, math, and code: Markdown footnotes with backlinks, KaTeX, and fenced syntax highlighting are production-build assertions.
- Raw HTML: 452 `div` elements remain across 876 files where they support substantive galleries, records, actual tables, and historical embeds; layout classes and inline presentation are gone.
- JavaScript: four duplicate ancestry modal scripts became one accessible shared gallery dialog; content-embedded scripts are zero.
- Infrastructure: 12 duplicate route sources and 47 dead Bootstrap, jQuery, Gaia Sass, theme, and helper files were removed. Historical assets were preserved.
- Identity shell: the navigation uses the shield asset, and the canonical footer restores the JamesHoward.us identity, notices, related sites, social links, and copyright wording.
- Hero system: one `PageIntro` system covers archive, post, ancestry, and permanent/detail families; fine visual tuning is intentionally deferred.
