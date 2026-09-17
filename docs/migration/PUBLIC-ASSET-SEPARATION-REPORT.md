# Public Asset Separation Report

Date: 2026-09-17

Repository: `k3jph/k3jph.github.io`

Branch: `rebuild/astro`

Starting SHA: `e24c6b50bc17113b3aa78c0af724489445c11e7f`

## Outcome

The first deployment-separation tranche moved 11 editable SVG originals totaling **213,842,090 bytes** out of `public/` and into the tracked, non-public `source-assets/` tree. Their public PDF and/or WebP representations remain in place.

The generated site now contains **875,024,612 bytes (834.49 MiB)**, below both the 1,000,000,000-byte hard ceiling and the 900,000,000-byte warning threshold.

No preserved asset was deleted, re-encoded, or changed. No Git history was rewritten.

## Directory policy

### `public/`

Contains files the deployed website must serve: rendered imagery, linked documents, public audio, fonts, CSS/JavaScript, and intentionally stable public artifacts.

### `source-assets/`

Contains canonical or editable repository assets that should remain preserved in Git but do not need to be copied into the website payload. Paths below this root preserve the meaningful former structure below `public/`.

`source-assets/manifest.json` records each moved file, former public path, exact size, retained public derivative, and reason for the move. `scripts/validate-source-assets.mjs` enforces that manifest.

## Files moved

All 11 files are Inkscape/editable SVG sources. The exact bytes of the files did not change during the moves.

| Family | Former public source | Bytes | Public representation retained |
| --- | --- | ---: | --- |
| UMBC C.Phil. | `public/assets/docs/JHoward-UMBC-CPhil.svg` | 44,840,790 | Linked PDF |
| Maryland Defense Force commission | `public/assets/img/service/jhoward-mddf-commission.svg` | 42,525,053 | Displayed WebP and linked PDF |
| Order of the Snowflake brevet | `public/assets/img/honors/jhoward-kts.svg` | 25,712,227 | Displayed WebP and documentary PDF |
| Baron of Matikonis letters patent | `public/assets/img/honors/jhoward-matikonis.svg` | 22,110,234 | Displayed WebP and linked PDF |
| Count of Krigsvold letters patent | `public/assets/img/honors/jhoward-krigsvold.svg` | 18,248,986 | Displayed WebP and linked PDF |
| MPA credential | `public/assets/docs/JHoward-MPA-PPA.svg` | 17,572,692 | Linked PDF and rendered WebP |
| Howard County resolution | `public/assets/docs/jhoward-hoco-crcres.svg` | 15,494,183 | Displayed WebP and documentary PDF |
| BS Mathematics credential | `public/assets/docs/JHoward-BS-Math.svg` | 14,826,650 | Linked PDF and rendered WebP |
| UMBC historical credential | `public/assets/docs/jhoward-umbc-phd.svg` | 5,495,541 | Rendered WebP retained for reintegration |
| FBCS credential | `public/assets/docs/JHoward-FBCS.svg` | 4,195,066 | Linked PDF and rendered WebP |
| UMD College Park Scholars credential | `public/assets/docs/JHoward-UMD-CPS.svg` | 2,820,668 | Linked PDF |
| **Total** |  | **213,842,090** |  |

The files now live at the corresponding paths below `source-assets/assets/`.

## Reference and URL review

Before the move:

- the corrected current-source scan found no Markdown, HTML, YAML, Astro, CSS, JavaScript, or generated-source reference to any moved SVG;
- the retained PDFs and WebPs were verified against the actual About, Service, Honors, and related site sources;
- a fetched-history search across 1,186 commits found no content reference to the moved `.svg` URLs;
- the files themselves were recognized as editable sources rather than the rendered objects used by visitors.

The repository has no server-access logs, so the absence of an unknown external hotlink cannot be proved. That residual concern is why this pass was limited to source/render families with preserved public representations.

## Before and after

| Measure | Before | After | Change |
| --- | ---: | ---: | ---: |
| `public/` files | 1,726 | 1,715 | −11 |
| `public/` bytes | 1,053,712,729 | 839,870,639 | −213,842,090 |
| `dist/` files | 4,161 | 4,023 | −138 |
| `dist/` bytes | 1,099,669,523 | 875,024,612 | −224,644,911 |
| Margin below 1,000,000,000-byte ceiling | exceeded by 99,669,523 | 124,975,388 | compliant |
| Margin below 900,000,000-byte warning | exceeded by 199,669,523 | 24,975,388 | no warning |

The file moves account for exactly 213,842,090 bytes of the reduction. Final validation also identified Astro's build-only `.prerender/` bundle inside the baseline `dist/`; it varied between builds and was never a website response. The finalizer now removes it, accounting for the remaining 10,802,821 baseline bytes and making the measured deployment payload deterministic.

### Final public composition

| Class | Files | Bytes |
| --- | ---: | ---: |
| Documents | 263 | 529,493,072 |
| Images | 1,397 | 274,338,175 |
| Audio/video | 2 | 34,955,777 |
| Source/text | 40 | 575,228 |
| Fonts | 10 | 508,318 |
| Other | 3 | 69 |

## Deliberately retained and deferred

The deployment target was met without moving PPTX or DOCX files. The source-asset validator reports **70 apparently unreferenced public source-format files totaling 106,982,128 bytes** for later review.

The largest deferred candidates are:

| Candidate | Bytes | Why deferred |
| --- | ---: | --- |
| `JHoward - Online Assessment and Evaluation.pptx` | 24,005,146 | No clearly established public derivative or URL policy |
| `CNBS-Design-Alternatives.docx` | 20,352,677 | PDF sibling exists, but documentary/download status needs review |
| Two `Planning-for-Martian-Polity` PPTX files | 35,392,636 | Historical presentation sources with possible durable-download significance |
| `OSG2021.pptx` | 5,010,228 | PDF is linked, but the presentation source was unnecessary to move in this tranche |
| `wmgrs-nfip.pptx` | 3,050,957 | Historical presentation provenance and public status remain ambiguous |
| Two Westarctica arms SVG paths | 5,216,732 | Exact content duplicate, but historical/semantic URL compatibility may be intentional |
| `SBCA-2013-Slides.pptx` | 2,427,251 | Historical presentation source; local PDF and external Slideshare presentation exist |
| `jhoward-arms-sodacan-glasshouse.svg` | 1,485,639 | Heraldic source artwork with potential future presentation use |

Public PDFs, Teaching syllabi, ancestry evidence, audio, and the general WebP corpus were intentionally left untouched.

## Validation contracts added

`scripts/validate-source-assets.mjs` now fails validation if:

- a manifest source is missing or its byte size changes without a manifest update;
- a stale copy remains at the former public path;
- a required public derivative disappears;
- website source links to the old SVG URL or into `source-assets/`;
- an exact copy of a preserved source reappears under `public/`.

It also reports remaining unreferenced SVG/PPTX/DOCX-style candidates without failing the build merely because review is pending.

`scripts/finalize-build.mjs` now removes Astro's build-only `.prerender/` bundle. `scripts/validate-build.mjs` waits for `dist/` to settle, fails if `.prerender/` reappears, and then enforces:

- warning above **900,000,000 bytes**;
- build failure above **1,000,000,000 bytes**.

## Validation results

`npm run validate` passed:

- Astro: 63 files, 0 errors, 0 warnings, 0 hints;
- 2,239 HTML routes;
- 2,113 canonical HTML routes;
- 126 redirects;
- 4,023 static files;
- 71,361 local references;
- 36,892 internal route edges;
- 878/878 canonical parent relationships covered;
- deployment guard: 875,024,612 bytes, 0 errors, 0 warnings.

The local-reference pass covers the representative About, Service, Honors, Coat of Arms, Ancestry, Scholarship, Teaching, and Blog outputs and found no missing moved asset.

## Repository effect

The asset contents remain tracked by Git, so the current logical tree, `.git`, and fresh-clone size are not expected to decrease materially. This pass solves deployment size, not repository storage. The forensic audit script was adjusted so migration reports and the non-public source archive cannot create false-positive website references, and so `asset_reference_evidence` now describes deployable assets under `public/`.

No preserved material was deleted. No historical ref was moved or removed. No history rewrite, destructive repack, Git LFS migration, binary conversion, or recompression occurred.
