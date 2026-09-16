# Repository Forensic Audit

Audit date: 2026-09-16

Repository: `k3jph/k3jph.github.io`

Branch: `rebuild/astro`

Audited starting SHA: `cb18066e5d3e78bfa71a63da18f604b247520044`
Git version: `2.51.1`

## Executive summary

### What is the “1.2 GB”?

It is primarily the packed Git object database, but the current site is almost as large in its own right.

| Population | Exact bytes | Human size | What it means |
| --- | ---: | ---: | --- |
| Current tracked tree | 1,057,634,538 | 1.058 GB / 1008.64 MiB | Files present at the audited `rebuild/astro` commit |
| Fresh-clone `.git` directory | 1,247,321,183 | 1.247 GB / 1.162 GiB | Local Git database and administrative files |
| Single packfile | 1,246,595,234 | 1.247 GB / 1.161 GiB | Nearly the entire `.git` size |
| All reachable blobs, logical | 1,600,096,442 | 1.600 GB / 1.490 GiB | Unique uncompressed blob content across all fetched refs |
| Current unique blobs, packed estimate | 770,950,298 | 770.95 MB / 735.24 MiB | Packed bytes attributable to objects still present in the current tree |
| Historical-only blobs, packed estimate | 474,849,409 | 474.85 MB / 452.85 MiB | Packed bytes attributable to blobs absent from the current tree |
| Built `dist/` | 1,099,669,523 | 1.100 GB / 1.024 GiB | The generated site, measured separately from the repository |

The packed blob population is approximately **61.9% current material and 38.1% historical-only material**. The historical portion is overwhelmingly old image content, especially JPEG and PNG files retained after the May 2024 WebP conversion. The current portion is legitimately large: 529.49 MB of documents, 488.18 MB of images, and 34.96 MB of audio.

The repository is therefore large for two independent reasons:

1. The current site doubles as a substantial documentary archive.
2. Git retains roughly 475 MB of packed historical blob data beyond the present tree.

It is **not** large because of committed dependencies, build output, caches, ZIP backups, tags, or forgotten feature branches. Those hypotheses were tested and rejected.

### Five causes that materially matter

1. **Current documentary files:** PDFs, presentations, editable certificate/commission sources, ancestry records, and audio account for most of the present tree.
2. **Current images:** 1,182 WebP files plus unusually large editable SVG scans contribute 483 MB between them.
3. **The original 2024 imports:** the first two large commits account for 613.36 MB, or 49.2%, of reachable packed blob storage.
4. **Raster conversion history:** historical-only PNG and JPG blobs total 453.27 MB logical; adding JPEG brings the old raster total to 460.12 MB.
5. **Public-directory deployment:** Astro publishes everything in `public/`, producing a 1.100-GB `dist/` even though only about 584 MB of unique asset content has a direct present-source reference.

## Governing conclusion

There is no evidence for a broad deletion pass. Most large current files are either active site assets, editable source, documentary evidence, or recoverable historical material. The useful immediate distinction is not “keep versus delete”; it is:

- **must remain publicly deployed;**
- **worth preserving in Git but need not be in `public/`;**
- **worth preserving outside ordinary Git;**
- **true mechanical redundancy;**
- **historical-only data that requires a history rewrite to reclaim.**

No destructive action was taken.

## Method and scope

The audit used a fresh, full clone from GitHub, not a shallow clone and not an older working directory. The clone fetched all 26 remote branch tips plus `origin/HEAD`; there were no tags. Measurements used:

- `git ls-tree -r -l` for current logical tree size;
- `git count-objects -vH` and direct packfile inspection for Git storage;
- `git rev-list --objects --all` with `git cat-file --batch-check` for reachable objects;
- `git verify-pack -v` for packed-object verification and delta behavior;
- `git fsck --full` for integrity;
- Git object IDs for exact-current duplicates;
- generated-site source/reference scanning for present asset-use evidence;
- commit/diff history for first-seen objects, binary churn, and growth events;
- an actual Astro build for the deployed payload.

The committed `scripts/audit-repository.mjs` reproduces the important measurements and emits the complete top-100 and duplicate inventories as JSON:

```sh
npm run audit:repository
```

It is read-only. It has no cleanup, deletion, repack, or rewrite mode.

## Forensic baseline

### Fresh-clone Git database

`git count-objects -vH` reported:

| Measure | Result |
| --- | ---: |
| Loose objects | 0 |
| Loose-object bytes | 0 |
| Packed objects | 11,330 |
| Packfiles | 1 |
| Pack size | 1.16 GiB |
| Prune-packable objects | 0 |
| Garbage objects | 0 |
| Garbage bytes | 0 |

The pack inventory was:

| File | Bytes |
| --- | ---: |
| `pack-ab04e1a55318f09d2b5d7cf513d6c73b62fd6e85.pack` | 1,246,595,234 |
| matching `.idx` | 318,312 |
| matching `.rev` | 45,372 |

The reachable population comprises 6,669 blobs plus commits and trees. `git verify-pack` reported the pack as valid. Its deepest delta chain is 50; large compressed binaries generally remain full objects, while related XML/Office/SVG content often delta-compresses efficiently.

### Integrity and local-only material

`git fsck --full --no-progress` completed with no output and exit status 0. There were no corrupt, dangling, unreachable, loose, prune-packable, or garbage objects in the fresh clone.

This is important: the 1.247-GB `.git` directory is not local reflog debris. It is a close proxy for what a fresh full clone from GitHub currently requires.

## Current-tree composition

The audited commit contains 2,712 files. Median file size is 29,769 bytes; the maximum is 44,840,790 bytes.

### By material class

| Class | Files | Bytes | Share of current tree |
| --- | ---: | ---: | ---: |
| Documents | 263 | 529,493,072 | 50.06% |
| Images | 1,408 | 488,180,265 | 46.16% |
| Audio/video | 2 | 34,955,777 | 3.31% |
| Source/text | 1,024 | 4,496,981 | 0.43% |
| Fonts | 10 | 508,318 | 0.05% |
| Other | 5 | 125 | negligible |

### Large-file thresholds

| Threshold | Files at or above threshold |
| --- | ---: |
| 1 MiB | 141 |
| 5 MiB | 35 |
| 10 MiB | 22 |
| 25 MiB | 3 |
| 50 MiB | 0 |
| 100 MiB | 0 |

No individual file reaches GitHub's 50-MiB warning threshold or 100-MiB hard block.

### By top-level directory

| Directory | Files | Logical bytes | Characterization |
| --- | ---: | ---: | --- |
| `public/` | 1,726 | 1,053,712,729 | Static site assets; 99.63% of current bytes |
| `_posts/` | 794 | 2,756,276 | Canonical historical/current article source used by Astro |
| repository root | 18 | 363,200 | Top-level content and configuration |
| `_ancestry/` | 46 | 257,528 | Canonical ancestry content used by Astro |
| `src/` | 64 | 135,386 | Astro presentation and routing source |
| `_data/` | 14 | 86,296 | Canonical structured data |
| `scripts/` | 12 before this audit | 80,785 | Migration, generation, and validation logic |
| `docs/` | 10 before this audit | 76,833 | Migration and architectural records |
| `archive/` | 6 | 56,897 | Recovered/historical page source |
| other content directories | 19 | 107,015 | Books, Honors, Service, Games, and fragments |

The historical Jekyll-shaped directories are not obsolete build machinery. `scripts/prepare-content.mjs` intentionally uses `_posts/`, `_ancestry/`, `_data/`, and the top-level content directories as canonical authoring sources for Astro.

Within `public/assets/`:

| Directory | Bytes |
| --- | ---: |
| `docs/` | 597,982,195 |
| `img/` | 419,119,448 |
| `audio/` | 34,955,777 |
| FontAwesome | 730,802 |
| fonts | 487,405 |
| seasonal | 355,497 |
| CSS | 59,988 |
| JavaScript | 20,744 |

### By extension

| Extension | Files | Bytes | Interpretation |
| --- | ---: | ---: | --- |
| PDF | 249 | 436,525,488 | Published research, certificates, media copies, syllabi, reports, and scans |
| SVG | 208 | 280,005,997 | Heraldry plus large editable scan/vector sources |
| WebP | 1,182 | 203,212,980 | Current web image corpus |
| PPTX | 8 | 71,294,938 | Presentation source/documents |
| MP3 | 2 | 34,955,777 | Preserved media appearances |
| DOCX | 5 | 21,622,877 | Documentary/working sources |
| GIF | 10 | 3,743,455 | Historical web imagery |
| Markdown | 888 | 3,333,757 | Canonical site content |
| PNG | 4 | 1,160,373 | Small residual current raster set |
| CSS | 35 | 563,258 | Current and legacy styles |
| all remaining types | 380 | 2,215,638 | Source, data, fonts, and small assets |

The current tree contains no `.jpg` files and only three small `.jpeg` files. The former JPG/PNG corpus survives mainly in history after conversion to WebP.

## Current asset-reference evidence

The audit matched canonical asset paths against Markdown, HTML, YAML, Astro, CSS, JavaScript, JSON, and generated-source inputs. This is evidence, not a deletion rule: it cannot detect external hotlinks, remembered stable asset URLs, or future reintegration.

| Evidence class | Unique blobs | Logical bytes | Packed-object estimate |
| --- | ---: | ---: | ---: |
| Directly referenced by current source | 1,219 | 584,262,832 | 515,496,290 |
| No direct current-source reference found | 440 | 458,583,277 | 259,425,253 |

The apparently unreferenced group is not homogeneous:

| Type | Unique logical bytes | Packed estimate | Likely meaning |
| --- | ---: | ---: | --- |
| SVG | 226,326,606 | 78,142,842 | Mostly editable certificate, commission, heraldry, and identity sources |
| PDF | 85,026,931 | 79,384,819 | Research, press, credentials, or preserved documents requiring review |
| PPTX | 70,297,267 | 45,945,555 | Presentation source and documentary archive |
| WebP | 52,389,994 | 51,868,112 | Recovered imagery, alternate crops, old post assets, and some duplicates |
| DOCX | 21,591,979 | 1,275,728 | Working/documentary source; highly compressible in this pack |
| all other formats | 2,950,500 | 2,808,197 | Legacy fonts, small images, and one small audio file |

The large unreferenced SVG files are Inkscape sources with active PDF or WebP siblings. They are not ordinary generated waste. Moving reviewed source SVGs outside `public/` is plausible; deleting them is not supported by this audit.

### Important format families

These are not exact duplicates. They are source/render or document/presentation families:

| Family | Combined current bytes | Members |
| --- | ---: | --- |
| UMBC C.Phil. | 59,543,935 | PDF + SVG |
| MDDF commission | 57,981,692 | PDF + SVG + WebP |
| Westarctica KtS | 34,588,209 | PDF + SVG + WebP |
| Matikonis appointment | 29,330,655 | PDF + SVG + WebP |
| Krigsvold appointment | 24,603,810 | PDF + SVG + WebP |
| MPA credential | 22,968,596 | PDF + SVG + WebP |
| CNBS design alternatives | 21,113,508 | DOCX + PDF |
| Howard County resolution | 21,050,736 | PDF + SVG |
| BS Mathematics credential | 19,684,042 | PDF + SVG + WebP |
| OSG 2021 | 8,477,136 | PDF + PPTX |

The very large SVGs compress substantially in Git, but remain expensive in the checkout and Pages payload.

## PDF and document audit

PDFs are the largest current extension class at 436.53 MB. That size is substantively justified in large part:

- `public/assets/docs/ancestry/` contains 38 files totaling 155,947,835 bytes; all 38 have current source references.
- The Teaching data names 84 unique syllabus PDFs totaling 21,862,315 bytes; every named file exists.
- The two semester-specific copies of the identical PAF 9172 policies PDF are deliberate references, not accidental forgotten files.
- Large research, service, press, and honors documents are used as preserved evidence or local copies when third-party sources disappear.

Thirty-eight unique PDF blobs totaling 85.03 MB lack a direct source reference. Their names and context include research papers, presentation exports, credentials, and press copies. They should be reviewed individually, not removed as a class.

## Ancestry, heraldry, and honors material

This material is a significant part of the repository by design:

| Area | Current bytes | Finding |
| --- | ---: | --- |
| Ancestry documents | 155,947,835 | All 38 files currently referenced; preserve |
| Ancestry images | 56,037,338 | Active and recoverable genealogical/armorial evidence |
| Armory images | 15,216,916 | Active presentation plus editable heraldic sources |
| Honors images | 91,529,858 | PDF/SVG/WebP documentary families; many source variants not directly rendered |
| Service images | 58,407,494 | Dominated by the MDDF commission source/render family |

Unreferenced material in these directories should be treated as **recoverable historical source** or **documentary archive** unless a later object-by-object review proves redundancy.

## Git-history composition

### Current versus historical amplification

| Class | Current tree bytes | Reachable historical blob bytes | Amplification |
| --- | ---: | ---: | ---: |
| Images | 488,180,265 | 1,013,600,013 | 2.08× |
| Documents | 529,493,072 | 530,775,330 | 1.00× |
| Audio/video | 34,955,777 | 34,955,777 | 1.00× |
| Source/text | 4,496,981 | 20,169,322 | 4.49×, but only 20.17 MB total |
| Fonts | 508,318 | 508,318 | 1.00× |
| **All blobs** | **1,057,634,538** | **1,600,096,442** | **1.51×** |

Historical image amplification, not document churn, is the main history problem.

### Historical-only blobs

There are 3,994 historical-only blobs totaling 558,427,557 logical bytes and approximately 474,849,409 packed bytes.

| Historical-only type | Blobs | Logical bytes |
| --- | ---: | ---: |
| PNG | 343 | 240,346,609 |
| JPG | 618 | 212,919,896 |
| SVG | 192 | 71,776,858 |
| Markdown | 2,010 | 10,902,405 |
| PDF | 6 | 8,310,215 |
| JPEG | 23 | 6,848,117 |
| WebP | 9 | 2,464,814 |
| all remaining formats | 793 | 4,859,643 |

The historical JPG/PNG/JPEG total is 460,114,622 logical bytes. Many are the original raster sources later converted to WebP. They may be valuable as higher-resolution originals even though the current site uses WebP.

## Ref audit

The clone contains two local branches, 26 remote branch tips plus `origin/HEAD`, and no tags.

| Reachability set | Unique blob bytes, logical | Packed estimate |
| --- | ---: | ---: |
| `main` | 1,593,754,781 | 1,243,733,028 |
| `rebuild/astro` | 1,599,160,421 | 1,245,710,497 |
| `rebuild/astro` beyond `main` | 5,405,640 | 1,977,469 |
| All other refs beyond `main` + `rebuild/astro` | 936,021 | 89,210 |

`main` already retains essentially the entire large-object history. Deleting old feature branches would recover approximately 89 KB of packed blob data, not hundreds of megabytes. There are no tags retaining a separate large stratum.

## When the repository became large

The repository was born large and then accumulated a second image format generation.

| Rank | Commit | Date | Event | New logical blob bytes | Packed estimate | Cumulative share of current packed blob storage |
| ---: | --- | --- | --- | ---: | ---: | ---: |
| 1 | `7104977` | 2024-04-03 | Getting started | 386,514,538 | 373,170,860 | 30.0% |
| 2 | `bf1c45f` | 2024-04-10 | Numerous updates | 309,777,234 | 240,187,423 | 49.2% |
| 3 | `e60e668` | 2024-05-14 | Complete conversion to WebP | 99,561,422 | 98,319,161 | 57.1% |
| 4 | `c43adb9` | 2024-05-06 | Revised and updated scans | 97,298,888 | 57,138,758 | 61.7% |
| 5 | `e66ee88` | 2024-05-04 | Improved Westarctica scans | 96,080,517 | 51,604,674 | 65.9% |
| 6 | `0509e49` | 2024-05-03 | Add MDDF commission | 63,127,055 | 36,362,346 | 68.8% |
| 7 | `8c81439` | 2025-02-02 | OFFM certificate | 26,916,309 | 26,899,081 | 70.9% |
| 8 | `ca32dcf` | 2024-05-02 | Update credential PDFs/scans | 51,500,355 | 25,928,897 | 73.0% |

The first commit was 383.48 MB of images plus small source files. The second added 256.16 MB of documents, 34.78 MB of audio, and 18.22 MB of images. The WebP conversion added 97.89 MB of new image blobs; Git correctly retained the prior rasters.

### Binary churn

Repeated editing of one pathname is not the principal cause. The worst same-path binary series are:

| Historical pathname | Versions | Logical bytes across versions | Packed bytes across versions |
| --- | ---: | ---: | ---: |
| `assets/docs/JHoward-UMBC-CPhil.pdf` | 2 | 16,535,736 | 16,539,471 |
| `assets/docs/UMBC-PHD-POLICY.pdf` | 2 | 2,532,272 | 2,527,898 |
| `assets/img/jhoward-maltese-salmeron-960px.png` | 2 | 1,978,720 | 1,972,080 |
| `assets/img/identity/jameshoward-arms.svg` | 30 | 17,923,921 | 1,145,096 |
| `assets/img/honors/KCRSO-medal.svg` | 9 | 11,843,304 | 167,813 |

The SVG series demonstrate effective delta compression. Large one-time binary imports and raster-format generations matter much more than routine SVG edits.

## Exact duplicates in the current tree

The current tree contains 36 exact-content groups, representing 37 extra pathname copies and a theoretical checkout/deployment saving of 15,965,653 bytes (15.97 MB, 1.51% of the tree) if every group were collapsed to one path.

That does **not** imply 15.97 MB of Git-database savings. Git already stores identical content once per object ID. Removing a duplicate pathname while retaining another path to the same blob saves checkout and Pages bytes, but essentially no blob storage.

Most of the larger groups are deliberate:

- three royal-arms files use one drawing in distinct historical/semantic positions;
- two identical flood-safety PDFs are independently linked from Media and a historical post;
- the two identical PAF 9172 policy files represent separate course terms;
- many `assets/img/` and `assets/img/news/` pairs preserve old paths.

The strongest mechanical candidate is the unreferenced filename containing a literal question mark next to the referenced sanitized copy of the same 4,567,396-byte TheStreet PDF. Even that should receive a direct-URL compatibility decision before removal.

## Old engines, generated material, dependencies, and containers

### Current tree

- No `node_modules`, Ruby vendor tree, Python environment, browser runtime, package cache, `_site`, `dist`, `.cache`, or coverage directory is committed.
- No ZIP, TAR, RAR, 7z, database dump, or site-export container is present in the current tree or reachable history.
- `.generated/`, `dist/`, `.astro/`, and `node_modules/` are correctly ignored.
- The historical Markdown/Jekyll directory names are canonical input to Astro and cannot be removed as “old Jekyll.”
- Six superseded page-specific CSS files plus the old icon-font family appear unused, but together are only about 1.27 MB and may still have archaeological value.
- No materially large reproducible generated artifact was found in the current commit.

### History

The history contains old Jekyll layouts, CSS, HTML, and prior Astro/source versions, but historical-only source/text totals only 15.67 MB. Removing old implementation strata would carry archaeological risk for negligible size benefit.

## Git LFS

Git LFS is not in use and no evidence of prior use was found:

- no current `.gitattributes` LFS rules;
- no current LFS pointer files;
- no historical `.gitattributes` commit containing `filter=lfs`.

GitHub documents that LFS replaces Git content with pointer files, but also states that **Git LFS cannot be used with GitHub Pages**. Moving files to LFS would therefore not directly solve this site's deployed-asset problem. It would also leave old ordinary-Git blobs in history unless combined with a history rewrite. See [GitHub's LFS documentation](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage).

## GitHub and Pages constraints

GitHub currently:

- recommends repositories remain ideally below 1 GB and strongly recommends staying below 5 GB;
- documents a 10-GB recommended maximum for compressed `.git` storage;
- warns on ordinary Git files above 50 MiB and blocks files above 100 MiB;
- recommends individual objects stay below 1 MB for repository health;
- limits published GitHub Pages sites to 1 GB.

Sources: [About large files on GitHub](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github), [Repository limits](https://docs.github.com/en/repositories/creating-and-managing-repositories/repository-limits), and [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

Repository evidence:

- `.git` is 1.247 GB: above the ideal target, but far below the 10-GB repository-health maximum.
- No file reaches the 50-MiB warning threshold.
- 141 current files exceed GitHub's recommended 1-MB object size.
- The generated site is **1,099,669,523 bytes**, exceeding 1 GB by 99,669,523 decimal bytes and exceeding 1 GiB by 25,927,699 bytes.

The Pages payload is the immediate operational concern. Astro copies `public/` wholesale, so source-only and recovered assets are deployed even when no page refers to them.

## Ranked findings

| Rank | Finding | Current impact | Historical impact | Confidence | Recommended action |
| ---: | --- | ---: | ---: | --- | --- |
| 1 | Documents and images are genuinely large in the current tree | 1,017.67 MB | Same objects dominate history | High | Preserve; separate web-serving need from archival need |
| 2 | Historical-only old imagery | none in checkout | 474.85 MB packed, mostly raster | High | Preserve before considering any rewrite |
| 3 | `dist/` exceeds the documented Pages limit | 1,099.67 MB deployed | none | High | Move reviewed source-only assets out of `public/` |
| 4 | Unreferenced editable/documentary formats | 318.22 MB for SVG/PPTX/DOCX | 125.36 MB packed | High | Move rather than delete after provenance review |
| 5 | Exact current duplicates | 15.97 MB maximum checkout/Pages | approximately zero blob savings | High | Resolve path-compatibility purpose first |
| 6 | The WebP migration retained old raster generations | current WebP: 203.21 MB | old JPG/PNG/JPEG: 460.11 MB logical | High | Preserve originals externally before any rewrite |
| 7 | Other branches/tags | negligible | 89 KB packed beyond primary branches | High | Do nothing for size reasons |
| 8 | Generated/vendor/cache material | none material | none material | High | Existing ignore policy is correct |
| 9 | Teaching syllabi | 21.86 MB linked | little amplification | High | Preserve |
| 10 | Legacy CSS/fonts | about 1.27 MB | negligible | Medium | Optional review; not a size project |

## Candidate classification

| Class | Candidate | Bytes / estimate | Why |
| --- | --- | ---: | --- |
| A — safe mechanical cleanup | Six unused page CSS files | 46,394 | Replaced by the shared Astro presentation system; build/source scan finds no references |
| A/B boundary | Literal-`?` duplicate TheStreet PDF | 4,567,396 | Exact duplicate of the referenced sanitized filename; confirm old direct URL policy |
| B — probably removable after review | Legacy icon-font/CSS family | about 1.22 MB | No stylesheet is loaded by the current site; one old post still carries FontAwesome class names |
| B — probably removable after review | Other exact duplicate paths | up to 11.40 MB beyond the TheStreet pair | Most appear deliberate or route-compatible; do not bulk-remove |
| C — preserve | Teaching syllabus archive | 21,862,315 | 84 named documents, all present |
| C — preserve | Ancestry documents | 155,947,835 | All current documents referenced |
| C — preserve | Historical original JPG/PNG/JPEG blobs | 460,114,622 logical in history | Potentially higher-quality original source for recovered material |
| C — preserve | Media MP3 | 34,781,070 | Active locally preserved appearance |
| D — move rather than delete | Unreferenced SVG/PPTX/DOCX source formats | 318,215,852 current bytes | Valuable source/documentary material need not all be publicly deployed |
| D — move rather than delete | Selected unreferenced PDFs/WebPs | up to 137,416,925 current bytes | Many are documentary/recovered; external archive or non-public repository path may fit better |
| E — history rewrite candidate | Historical-only blobs after preservation | 450–475 MB packed estimate | Only a rewrite can reclaim them from full clones |
| F — uncertain | 38 unreferenced PDF blobs | 85,026,931 | Individual editorial/provenance review needed |

No broad class of large files qualifies as category A.

## Cleanup scenarios

### Scenario 0 — Do nothing

- **Storage impact:** none. `.git` remains approximately 1.247 GB; checkout remains 1.058 GB; `dist/` remains 1.100 GB.
- **Risk:** no preservation risk, but the generated site remains above GitHub's documented Pages limit and clone/CI work remains heavy.
**Benefit:** zero coordination and no historical loss.

### Scenario 1 — Safe current-tree cleanup only

Remove only the unused 46-KB CSS set and, after direct-URL confirmation, the 4.57-MB punctuation twin.

- **Estimated checkout/Pages saving:** approximately 4.61 MB (0.44%).
- **Git clone saving:** effectively zero; identical content is already one Git blob and historical references remain.
- **Risk:** low after URL confirmation.
**Conclusion:** worthwhile housekeeping, not a repository-size solution.

The absolute exact-duplicate ceiling is 15.97 MB (1.51%), but reaching it would break intentional semantic or compatibility paths.

### Scenario 2 — Preserve source material outside `public/`

Move reviewed, unreferenced editable sources—especially the large SVGs, PPTX files, and DOCX files—to a non-published source/archive directory while keeping them in the repository.

- **Candidate payload:** 318.22 MB current logical bytes.
- **Likely first tranche:** the large unreferenced source SVGs alone exceed 226 MB.
- **Pages effect:** a 100–225 MB reviewed move would bring `dist/` below the 1-GB limit.
- **Checkout effect:** none if files stay in Git under another directory.
- **Clone effect:** none.
- **Preservation:** complete within Git.
**Risk:** old direct asset URLs may break; check URL history and add an explicit preservation policy first.

This is the recommended first response because it solves the immediate Pages problem without deletion or history surgery.

### Scenario 3 — Move large archival material outside ordinary Git

Place reviewed source/documentary objects in a durable archival home—such as a separate archival repository, GitHub Releases, Internet Archive where appropriate, or durable object storage—and leave stable links/manifests in the site repository.

- **Candidate current bytes:** up to 458.58 MB lack a direct source reference, but this is an upper bound, not a removal recommendation.
- **Clearly source-oriented subset:** SVG/PPTX/DOCX total 318.22 MB logical and about 125.36 MB in the current pack.
- **Checkout/Pages effect:** substantial if moved out of `public/` and the repository.
- **Clone effect without rewrite:** little to none, because old blobs remain reachable.
**Risk:** medium; preservation durability, link stability, licensing, privacy, and editorial reintegration all need decisions.

### Scenario 4 — Rewrite Git history

If every historical-only blob were removed while preserving the current tree exactly, the defensible upper-bound saving is about **474.85 MB packed** (38.1% of packed blob storage). Repacking variance makes **450–475 MB** the realistic estimate. The resulting pack would be roughly 770–800 MB.

If a reviewed set of large current source artifacts were externalized first, a rewrite could save more. Removing all currently unreferenced objects would raise the theoretical packed saving to about 734 MB, but that is not editorially acceptable as a blanket operation. A narrower SVG/PPTX/DOCX archival move plus rewrite could plausibly bring total savings into the **550–600 MB** range.

- **Checkout effect:** only files removed from the current tree shrink the checkout.
- **Clone/GitHub storage effect:** substantial.
- **Risk:** high.
**Operational consequences:** every rewritten commit SHA changes; tags would need recreation if they existed; old clones, forks, PR references, and links to commits become stale; every branch must be coordinated; GitHub Pages and Actions should be paused or carefully sequenced; a protected archival mirror must exist first.

This scenario is justified only after Scenario 2 or 3 establishes where the historical originals will live.

## Problem solved by each action

| Action | Checkout | Clone / `.git` | Pages payload | Repository clarity | Historical preservation |
| --- | --- | --- | --- | --- | --- |
| Remove one exact duplicate pathname | Small improvement | No meaningful change | Small improvement | Slight | Other identical path remains |
| Move a file out of `public/` but keep it in Git | No change | No change | Yes | Yes | Yes |
| Delete/move current file outside repo, no rewrite | Yes | No meaningful change | Yes | Yes | Only if moved to durable storage |
| Adopt LFS for future source files | Future checkout behavior | Future growth only unless rewritten | Not usable directly by Pages | Mixed | Yes, subject to LFS retention/billing |
| Rewrite history, preserve current tree | No | Yes, approximately 450–475 MB | No | Historical simplification | Requires separate archive |
| Externalize reviewed current archives and rewrite | Yes | Yes | Yes | Yes | Only with a durable external archive |

## Recommended course

1. **Do not delete or rewrite history now.**
2. **Solve Pages separately:** review the large unreferenced source SVG/PPTX/DOCX families and move enough confirmed source-only material outside `public/` to put `dist/` comfortably below 1 GB.
3. **Create an archival manifest** before moving anything outside the repository: original path, Git blob ID, checksum, description, provenance, license, and new durable location.
4. **Preserve a full mirror** of the present repository and all refs before any future rewrite.
5. **Only then decide whether 450–475 MB of full-clone savings is worth invalidating history.** At 1.247 GB, the repository is above GitHub's ideal size but well under its 10-GB recommended maximum; a rewrite is optional, not an emergency.

## Site validation

The audit added only a script, one package-script entry, and this report. It did not change site content or presentation.

`npm run validate` passed:

- 63 Astro files checked;
- 0 errors, warnings, or hints;
- 2,239 HTML routes;
- 2,113 canonical HTML routes;
- 126 redirects;
- 4,034 validated static files;
- 71,361 local references;
- 0 validation errors or warnings.

The generated `dist/` contains 4,161 filesystem files totaling 1,099,669,523 bytes.

## Limitations

- The audit has no server access logs, so it cannot prove that an unreferenced static URL has no external users.
- Source-reference evidence is exact-path based. It may miss programmatically constructed or externally consumed URLs; indirectly referenced legacy fonts were treated cautiously.
- Per-object packed sizes reflect the current pack's delta choices. A future repack will not reproduce every byte exactly.
- No perceptual image hash was run. Exact object hashes, format-family analysis, dimensions/paths, and the documented WebP conversion were sufficient to explain the material size.
- Office files and PDFs were not treated as disposable merely because a rendered sibling exists.
- GitHub-side billing/account storage was not available. A fresh full clone provided the relevant reachable-storage evidence.

## Destructive-action declaration

**No destructive action was taken.** No file was deleted, no ref was moved or removed, no object was pruned, no history was rewritten, and no asset was converted.

## Appendix A — 100 largest current files

The `Referenced` column records a direct current-source string match. `No` means “review,” not “remove.” Git object IDs prove exact identity and duplicate groups.

| # | Size | Kind | Source reference | Copies | Blob | Path |
|---:|---:|---|---|---:|---|---|
| 1 | 42.76 MiB | SVG | no direct match | 1 | <code>8fba36be73</code> | <code>public/assets/docs/JHoward-UMBC-CPhil.svg</code> |
| 2 | 40.56 MiB | SVG | no direct match | 1 | <code>092faf2d88</code> | <code>public/assets/img/service/jhoward-mddf-commission.svg</code> |
| 3 | 33.17 MiB | MP3 | yes | 1 | <code>23f54410dc</code> | <code>public/assets/audio/fbn_e2_james_howard.mp3</code> |
| 4 | 24.78 MiB | PDF | yes | 1 | <code>77562bb744</code> | <code>public/assets/docs/ancestry/OFFM-Teague.pdf</code> |
| 5 | 24.52 MiB | SVG | no direct match | 1 | <code>560768bedb</code> | <code>public/assets/img/honors/jhoward-kts.svg</code> |
| 6 | 22.89 MiB | PPTX | no direct match | 1 | <code>d8416b9fdc</code> | <code>public/assets/docs/JHoward - Online Assessment and Evaluation.pptx</code> |
| 7 | 21.09 MiB | SVG | no direct match | 1 | <code>310946f5a4</code> | <code>public/assets/img/honors/jhoward-matikonis.svg</code> |
| 8 | 19.41 MiB | DOCX | no direct match | 1 | <code>7d26e1867c</code> | <code>public/assets/docs/CNBS-Design-Alternatives.docx</code> |
| 9 | 19.31 MiB | PDF | no direct match | 1 | <code>a24b2cad7a</code> | <code>public/assets/docs/XR21-Presentation.pdf</code> |
| 10 | 17.45 MiB | PDF | yes | 1 | <code>0d65f3b03c</code> | <code>public/assets/docs/ancestry/OFGD-Teague.pdf</code> |
| 11 | 17.40 MiB | SVG | no direct match | 1 | <code>a9835066fb</code> | <code>public/assets/img/honors/jhoward-krigsvold.svg</code> |
| 12 | 16.88 MiB | PPTX | no direct match | 1 | <code>ea11952d30</code> | <code>public/assets/docs/Planning-for-Martian-Polity-43.pptx</code> |
| 13 | 16.88 MiB | PPTX | no direct match | 1 | <code>bc69786cde</code> | <code>public/assets/docs/Planning-for-Martian-Polity.pptx</code> |
| 14 | 16.76 MiB | SVG | no direct match | 1 | <code>2fe1e64eb9</code> | <code>public/assets/docs/JHoward-MPA-PPA.svg</code> |
| 15 | 16.03 MiB | PDF | yes | 1 | <code>c99f687ceb</code> | <code>public/assets/docs/ancestry/CFPC-MinaElizabethHall.pdf</code> |
| 16 | 14.78 MiB | SVG | no direct match | 1 | <code>05a1efa8b5</code> | <code>public/assets/docs/jhoward-hoco-crcres.svg</code> |
| 17 | 14.52 MiB | PDF | yes | 1 | <code>99d17fd99e</code> | <code>public/assets/img/service/jhoward-mddf-commission.pdf</code> |
| 18 | 14.28 MiB | PDF | yes | 1 | <code>5c677a5759</code> | <code>public/assets/docs/JSM-2018-Forecasting-Artificial-Earth-Satellite-Populations.pdf</code> |
| 19 | 14.14 MiB | SVG | no direct match | 1 | <code>e07a767d46</code> | <code>public/assets/docs/JHoward-BS-Math.svg</code> |
| 20 | 14.02 MiB | PDF | yes | 1 | <code>6f8aeca5c2</code> | <code>public/assets/docs/JHoward-UMBC-CPhil.pdf</code> |
| 21 | 10.64 MiB | PDF | no direct match | 1 | <code>1634ec02bc</code> | <code>public/assets/docs/msp202001.issue.pdf</code> |
| 22 | 10.03 MiB | PDF | yes | 1 | <code>8f0d4e172c</code> | <code>public/assets/docs/JHoward-MA-USW.pdf</code> |
| 23 | 8.80 MiB | PDF | yes | 1 | <code>c7034989ba</code> | <code>public/assets/docs/ancestry/SDCC-Underwood.pdf</code> |
| 24 | 8.44 MiB | PDF | yes | 1 | <code>d9e4f2502e</code> | <code>public/assets/docs/ancestry/NSDEQ-JonathanNewman.pdf</code> |
| 25 | 8.36 MiB | PDF | yes | 1 | <code>6bcb92d43b</code> | <code>public/assets/docs/ancestry/NSDAR-Williams.pdf</code> |
| 26 | 8.29 MiB | PDF | no direct match | 1 | <code>8713f97574</code> | <code>public/assets/img/honors/jhoward-kts.pdf</code> |
| 27 | 8.19 MiB | PDF | yes | 1 | <code>f6854066b7</code> | <code>public/assets/docs/ancestry/ODCPC-Taylor.pdf</code> |
| 28 | 7.10 MiB | PDF | no direct match | 1 | <code>73510dce31</code> | <code>public/assets/docs/Crystal Cube Forecasting Disruptive Events.pdf</code> |
| 29 | 6.73 MiB | PDF | yes | 1 | <code>20713b339a</code> | <code>public/assets/img/honors/jhoward-matikonis.pdf</code> |
| 30 | 6.41 MiB | PDF | yes | 1 | <code>f71639ed6a</code> | <code>public/assets/docs/Megan-Price-Protecting-Marylands-Voting-Process.pdf</code> |
| 31 | 5.91 MiB | PDF | yes | 1 | <code>164e901aed</code> | <code>public/assets/img/honors/jhoward-krigsvold.pdf</code> |
| 32 | 5.70 MiB | PDF | yes | 1 | <code>3b535f5e84</code> | <code>public/assets/docs/ancestry/DEP-Adams.pdf</code> |
| 33 | 5.30 MiB | PDF | no direct match | 1 | <code>efe6d9ad7c</code> | <code>public/assets/docs/jhoward-hoco-crcres.pdf</code> |
| 34 | 5.24 MiB | SVG | no direct match | 1 | <code>c02000274f</code> | <code>public/assets/docs/jhoward-umbc-phd.svg</code> |
| 35 | 5.07 MiB | PDF | yes | 1 | <code>4ce5d00c40</code> | <code>public/assets/docs/Long-Reach-Master-Plan.pdf</code> |
| 36 | 4.98 MiB | PDF | yes | 1 | <code>111293a7da</code> | <code>public/assets/docs/Help! My Basement Is Flooded &#124; Personal Finance &#124; US News.pdf</code> |
| 37 | 4.88 MiB | PDF | yes | 1 | <code>e01c92bf0d</code> | <code>public/assets/docs/JHoward-MPA-PPA.pdf</code> |
| 38 | 4.78 MiB | PPTX | no direct match | 1 | <code>61854e8cb5</code> | <code>public/assets/docs/OSG2021.pptx</code> |
| 39 | 4.43 MiB | PDF | yes | 1 | <code>25c6b6c1f9</code> | <code>public/assets/docs/EXPORT CREDIT AGENCIES abide - Global Trade Magazine.pdf</code> |
| 40 | 4.42 MiB | PDF | yes | 1 | <code>c3eee0b1f3</code> | <code>public/assets/docs/JHoward-BS-Math.pdf</code> |
| 41 | 4.39 MiB | PDF | no direct match | 1 | <code>803102b79b</code> | <code>public/assets/docs/tpoc_03.pdf</code> |
| 42 | 4.36 MiB | PDF | yes | 1 | <code>c11a8939b7</code> | <code>public/assets/docs/ancestry/DOM-AlexanderSynder.pdf</code> |
| 43 | 4.36 MiB | PDF | yes | 2 | <code>475098dd96</code> | <code>public/assets/docs/So You Want to Be a Billionaire - Buy Lottery Tickets, Maybe - TheStreet.pdf</code> |
| 44 | 4.36 MiB | PDF | no direct match | 2 | <code>475098dd96</code> | <code>public/assets/docs/So You Want to Be a Billionaire? Buy Lottery Tickets, Maybe - TheStreet.pdf</code> |
| 45 | 4.30 MiB | PDF | yes | 1 | <code>85ce14e1e2</code> | <code>public/assets/docs/ancestry/GSW1812-Ray.pdf</code> |
| 46 | 4.16 MiB | PDF | yes | 1 | <code>272eb2e2e7</code> | <code>public/assets/docs/jhoward-malta-letters-patent-binder.pdf</code> |
| 47 | 4.03 MiB | PDF | yes | 1 | <code>93aabd729f</code> | <code>public/assets/docs/malta-government-gazette-20240216.pdf</code> |
| 48 | 4.01 MiB | SVG | yes | 1 | <code>1fe9baae60</code> | <code>public/assets/img/2025/the-lion-and-the-unicorn/Royal_Coat_of_Arms_of_the_Kingdom_of_Scotland_(Variant_1).svg</code> |
| 49 | 4.00 MiB | SVG | no direct match | 1 | <code>337b1ed526</code> | <code>public/assets/docs/JHoward-FBCS.svg</code> |
| 50 | 3.99 MiB | PDF | yes | 1 | <code>5f4519d9b8</code> | <code>public/assets/docs/HowardCounty-CRC2019-FinalReport.pdf</code> |
| 51 | 3.99 MiB | PDF | yes | 1 | <code>4a8a9c066c</code> | <code>public/assets/docs/howard-county-charter-review-2019-report.pdf</code> |
| 52 | 3.59 MiB | PDF | yes | 1 | <code>dbcbc678a5</code> | <code>public/assets/docs/ancestry/MD1812-Ray.pdf</code> |
| 53 | 3.48 MiB | PDF | yes | 1 | <code>18d9b2646c</code> | <code>public/assets/docs/ancestry/NSSAR-Coates.pdf</code> |
| 54 | 3.45 MiB | PDF | yes | 1 | <code>655e41b85f</code> | <code>public/assets/docs/Long-Reach-Master-Plan-Committee-Recommendation.pdf</code> |
| 55 | 3.31 MiB | PDF | yes | 1 | <code>a2724fb607</code> | <code>public/assets/docs/OSG2021.pdf</code> |
| 56 | 2.96 MiB | PDF | no direct match | 1 | <code>06a3e6bd1d</code> | <code>public/assets/docs/JHoward-COE-Diploma-Taoism.pdf</code> |
| 57 | 2.91 MiB | PPTX | no direct match | 1 | <code>d431ed8965</code> | <code>public/assets/docs/wmgrs-nfip.pptx</code> |
| 58 | 2.89 MiB | PDF | yes | 1 | <code>520e74c99e</code> | <code>public/assets/docs/ancestry/HCGS-CFHC-Williams.pdf</code> |
| 59 | 2.87 MiB | PDF | yes | 1 | <code>c4552c90e9</code> | <code>public/assets/docs/jhoward-american-armigers-registration.pdf</code> |
| 60 | 2.84 MiB | WEBP | no direct match | 1 | <code>1580c91dfc</code> | <code>public/assets/img/2024/tartans-as-woven-heraldry-in-scotland/royal-stewart.webp</code> |
| 61 | 2.81 MiB | PDF | yes | 1 | <code>df0adc262f</code> | <code>public/assets/docs/ancestry/DVF-Darby.pdf</code> |
| 62 | 2.78 MiB | PDF | yes | 1 | <code>e95876f29d</code> | <code>public/assets/docs/ancestry/HCGS-SHBC-Curran.pdf</code> |
| 63 | 2.77 MiB | WEBP | yes | 1 | <code>1fdaee1b45</code> | <code>public/assets/img/2025/how-local-zoning-appeals-influence-development.webp</code> |
| 64 | 2.69 MiB | SVG | no direct match | 1 | <code>fb9d676c73</code> | <code>public/assets/docs/JHoward-UMD-CPS.svg</code> |
| 65 | 2.61 MiB | SVG | yes | 1 | <code>e65fe8ff7e</code> | <code>public/assets/img/2024/the-evolution-of-the-royal-arms/arms-william-mary.svg</code> |
| 66 | 2.60 MiB | PDF | no direct match | 1 | <code>dada1b69de</code> | <code>public/assets/docs/JHoward-RHSC-L2.pdf</code> |
| 67 | 2.53 MiB | WEBP | yes | 1 | <code>58c4095809</code> | <code>public/assets/img/2025/the-edmund-fitzgerald-and-fifty-years-of-memory.webp</code> |
| 68 | 2.51 MiB | PDF | yes | 1 | <code>51d4d376b0</code> | <code>public/assets/docs/ancestry/OGS-SCWFO-Newman.pdf</code> |
| 69 | 2.49 MiB | SVG | no direct match | 2 | <code>f444c16db0</code> | <code>public/assets/img/Greater_Coat_of_Arms_of_Westarctica.svg</code> |
| 70 | 2.49 MiB | SVG | no direct match | 2 | <code>f444c16db0</code> | <code>public/assets/img/news/Greater_Coat_of_Arms_of_Westarctica.svg</code> |
| 71 | 2.42 MiB | SVG | yes | 1 | <code>bf423d1360</code> | <code>public/assets/img/2025/the-lion-and-the-unicorn/Coat_of_arms_of_the_United_Kingdom_in_Scotland.svg</code> |
| 72 | 2.38 MiB | PDF | yes | 1 | <code>acd63ae3e3</code> | <code>public/assets/docs/certifications/JHoward-CGFM.pdf</code> |
| 73 | 2.36 MiB | PDF | yes | 1 | <code>eef3769d1d</code> | <code>public/assets/docs/ancestry/FFMC-Burch.pdf</code> |
| 74 | 2.35 MiB | PDF | no direct match | 1 | <code>52c0c423be</code> | <code>public/assets/docs/SBCA-2013-Slides.pdf</code> |
| 75 | 2.34 MiB | WEBP | no direct match | 1 | <code>9e77b7f2c6</code> | <code>public/assets/img/news/landscape-nature-forest-outdoor-snow-winter-913771-pxhere.com_.webp</code> |
| 76 | 2.31 MiB | PPTX | no direct match | 1 | <code>92debf7c38</code> | <code>public/assets/docs/SBCA-2013-Slides.pptx</code> |
| 77 | 2.27 MiB | PDF | yes | 1 | <code>a35f983f12</code> | <code>public/assets/docs/ancestry/OFNA-Chappell.pdf</code> |
| 78 | 2.07 MiB | SVG | yes | 1 | <code>e9d5a30da4</code> | <code>public/assets/img/armory/jhoward-seal.svg</code> |
| 79 | 1.94 MiB | PDF | yes | 1 | <code>3e16cc1e82</code> | <code>public/assets/docs/UMBC-PHD-POLICY.pdf</code> |
| 80 | 1.93 MiB | SVG | yes | 1 | <code>ab534a49a5</code> | <code>public/assets/img/2025/false-quartering-in-heraldic-design/false-quartering.svg</code> |
| 81 | 1.90 MiB | WEBP | no direct match | 1 | <code>eab28243c3</code> | <code>public/assets/img/2024/tartans-as-woven-heraldry-in-scotland/black-watch.webp</code> |
| 82 | 1.81 MiB | PDF | no direct match | 1 | <code>f6e4879f78</code> | <code>public/assets/docs/JHoward-NFIP-Proposal-Defense.pdf</code> |
| 83 | 1.79 MiB | WEBP | yes | 1 | <code>cd7ece3238</code> | <code>public/assets/img/2024/the-evolution-of-the-royal-arms.webp</code> |
| 84 | 1.78 MiB | WEBP | yes | 1 | <code>330973d8b9</code> | <code>public/assets/img/news/the-challenge-of-assessment-and-evaluation-in-online-education.webp</code> |
| 85 | 1.75 MiB | SVG | yes | 1 | <code>f5ef6c2142</code> | <code>public/assets/img/2024/the-evolution-of-the-royal-arms/arms-mary-philip-milan.svg</code> |
| 86 | 1.73 MiB | PDF | yes | 1 | <code>7b61acef7e</code> | <code>public/assets/docs/UMGC-BA-EAS.pdf</code> |
| 87 | 1.72 MiB | PDF | yes | 1 | <code>70f36802b6</code> | <code>public/assets/docs/ancestry/OGS-SBO-Rees.pdf</code> |
| 88 | 1.70 MiB | PDF | yes | 1 | <code>f1f9b6f50a</code> | <code>public/assets/docs/ancestry/FSSV-Saffer.pdf</code> |
| 89 | 1.69 MiB | PDF | yes | 1 | <code>2fe5d485f5</code> | <code>public/assets/docs/JHoward-Dissertation.pdf</code> |
| 90 | 1.63 MiB | SVG | yes | 1 | <code>11603cd1c7</code> | <code>public/assets/img/2025/the-lion-and-the-unicorn/arms-james-i-scottish.svg</code> |
| 91 | 1.63 MiB | PDF | yes | 1 | <code>85d04f61be</code> | <code>public/assets/docs/ancestry/GCAT-JeremiahCloud.pdf</code> |
| 92 | 1.59 MiB | WEBP | no direct match | 1 | <code>eb065153d8</code> | <code>public/assets/img/2024/tartans-as-woven-heraldry-in-scotland/scottish-police-tartan.webp</code> |
| 93 | 1.58 MiB | PDF | yes | 1 | <code>3f12e27674</code> | <code>public/assets/docs/ancestry/OGS-CFO-Hall.pdf</code> |
| 94 | 1.57 MiB | PDF | yes | 1 | <code>47f584552c</code> | <code>public/assets/docs/ancestry/OGS-FFO-Bunnell.pdf</code> |
| 95 | 1.56 MiB | PDF | yes | 1 | <code>4f4161c74d</code> | <code>public/assets/docs/ancestry/FFF-Hall.pdf</code> |
| 96 | 1.53 MiB | PDF | yes | 1 | <code>8be80ff2fd</code> | <code>public/assets/docs/JHU-MS-EES.pdf</code> |
| 97 | 1.53 MiB | WEBP | yes | 1 | <code>d09c0b3b8d</code> | <code>public/assets/img/ancestry/offm/pembrooke-teggs-delight-pg1.webp</code> |
| 98 | 1.53 MiB | PDF | yes | 1 | <code>a5573b1976</code> | <code>public/assets/docs/JHoward-JHU-MS-ACM.pdf</code> |
| 99 | 1.50 MiB | PDF | yes | 1 | <code>6d01028fdb</code> | <code>public/assets/docs/jhoward-ach-registration.pdf</code> |
| 100 | 1.49 MiB | PDF | yes | 1 | <code>08775c7d51</code> | <code>public/assets/docs/HowardCounty-CRC2019-PreliminaryReport.pdf</code> |

## Appendix B — 100 largest reachable historical blobs

`Packed` is this fresh clone's per-object on-disk estimate. `Current` states whether the exact blob remains in the audited tree. `First seen` is the first diff event in the complete fetched-ref traversal.

| # | Logical size | Packed size | Kind | Current | Blob | First seen | Historical path |
|---:|---:|---:|---|---|---|---|---|
| 1 | 42.76 MiB | 16.21 MiB | SVG | yes | <code>8fba36be73</code> | 2024-05-06 — Revised and updated scans | <code>public/assets/docs/JHoward-UMBC-CPhil.svg</code> |
| 2 | 40.56 MiB | 15.03 MiB | SVG | yes | <code>092faf2d88</code> | 2024-05-03 — Add MDDF commission | <code>public/assets/img/service/jhoward-mddf-commission.svg</code> |
| 3 | 33.17 MiB | 30.33 MiB | MP3 | yes | <code>23f54410dc</code> | 2024-04-10 — Numerous updates | <code>public/assets/audio/fbn_e2_james_howard.mp3</code> |
| 4 | 24.78 MiB | 24.79 MiB | PDF | yes | <code>77562bb744</code> | 2025-02-02 — OFFM Certificate | <code>public/assets/docs/ancestry/OFFM-Teague.pdf</code> |
| 5 | 24.52 MiB | 7.99 MiB | SVG | yes | <code>560768bedb</code> | 2024-05-04 — Improved Westarctica scans | <code>public/assets/img/honors/jhoward-kts.svg</code> |
| 6 | 22.89 MiB | 16.94 MiB | PPTX | yes | <code>d8416b9fdc</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/JHoward - Online Assessment and Evaluation.pptx</code> |
| 7 | 21.44 MiB | 10.12 MiB | SVG | historical only | <code>516fa89612</code> | 2024-05-02 — Add KCRSO | <code>assets/img/honors/jhoward-kcrso.svg</code> |
| 8 | 21.09 MiB | 6.89 MiB | SVG | yes | <code>310946f5a4</code> | 2024-05-04 — Improved Westarctica scans | <code>public/assets/img/honors/jhoward-matikonis.svg</code> |
| 9 | 19.41 MiB | 0.64 MiB | DOCX | yes | <code>7d26e1867c</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/CNBS-Design-Alternatives.docx</code> |
| 10 | 19.31 MiB | 19.24 MiB | PDF | yes | <code>a24b2cad7a</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/XR21-Presentation.pdf</code> |
| 11 | 17.45 MiB | 17.45 MiB | PDF | yes | <code>0d65f3b03c</code> | 2025-01-14 — Got OFGD cert | <code>public/assets/docs/ancestry/OFGD-Teague.pdf</code> |
| 12 | 17.40 MiB | 5.73 MiB | SVG | yes | <code>a9835066fb</code> | 2024-05-04 — Improved Westarctica scans | <code>public/assets/img/honors/jhoward-krigsvold.svg</code> |
| 13 | 16.88 MiB | 0.07 MiB | PPTX | yes | <code>ea11952d30</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/Planning-for-Martian-Polity-43.pptx</code> |
| 14 | 16.88 MiB | 16.82 MiB | PPTX | yes | <code>bc69786cde</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/Planning-for-Martian-Polity.pptx</code> |
| 15 | 16.76 MiB | 4.95 MiB | SVG | yes | <code>2fe1e64eb9</code> | 2024-05-02 — Update the PDFs for UMD, UB, and BCS certs | <code>public/assets/docs/JHoward-MPA-PPA.svg</code> |
| 16 | 16.03 MiB | 16.03 MiB | PDF | yes | <code>c99f687ceb</code> | 2024-09-21 — Adding CFPC certificate | <code>public/assets/docs/ancestry/CFPC-MinaElizabethHall.pdf</code> |
| 17 | 14.78 MiB | 6.13 MiB | SVG | yes | <code>05a1efa8b5</code> | 2024-05-06 — Revised and updated scans | <code>public/assets/docs/jhoward-hoco-crcres.svg</code> |
| 18 | 14.52 MiB | 14.53 MiB | PDF | yes | <code>99d17fd99e</code> | 2024-05-03 — Add MDDF commission | <code>public/assets/img/service/jhoward-mddf-commission.pdf</code> |
| 19 | 14.28 MiB | 12.97 MiB | PDF | yes | <code>5c677a5759</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/JSM-2018-Forecasting-Artificial-Earth-Satellite-Populations.pdf</code> |
| 20 | 14.14 MiB | 4.05 MiB | SVG | yes | <code>e07a767d46</code> | 2024-05-02 — Update the PDFs for UMD, UB, and BCS certs | <code>public/assets/docs/JHoward-BS-Math.svg</code> |
| 21 | 14.02 MiB | 14.03 MiB | PDF | yes | <code>6f8aeca5c2</code> | 2024-05-06 — Revised and updated scans | <code>public/assets/docs/JHoward-UMBC-CPhil.pdf</code> |
| 22 | 13.05 MiB | 13.01 MiB | PNG | historical only | <code>3a5f6b6efd</code> | 2024-04-10 — Numerous updates | <code>assets/img/jhoward-maltese-coa-salmeron-960px.png</code> |
| 23 | 10.64 MiB | 9.34 MiB | PDF | yes | <code>1634ec02bc</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/msp202001.issue.pdf</code> |
| 24 | 10.03 MiB | 10.03 MiB | PDF | yes | <code>8f0d4e172c</code> | 2024-08-24 — I got an MA | <code>public/assets/docs/JHoward-MA-USW.pdf</code> |
| 25 | 9.58 MiB | 9.47 MiB | PNG | historical only | <code>35e571ada5</code> | 2024-04-03 — Getting started | <code>assets/img/news/20140504_120423.png</code> |
| 26 | 8.93 MiB | 8.80 MiB | PNG | historical only | <code>f73bdd565a</code> | 2024-04-03 — Getting started | <code>assets/img/news/20140504_120530.png</code> |
| 27 | 8.80 MiB | 8.80 MiB | PDF | yes | <code>c7034989ba</code> | 2025-02-15 — Got SDCC cert | <code>public/assets/docs/ancestry/SDCC-Underwood.pdf</code> |
| 28 | 8.69 MiB | 8.69 MiB | PNG | historical only | <code>0aa16beb79</code> | 2024-04-03 — Getting started | <code>assets/img/news/20140504_120417.png</code> |
| 29 | 8.44 MiB | 8.44 MiB | PDF | yes | <code>d9e4f2502e</code> | 2024-10-04 — Added NSDEQ certificate, which arrived today | <code>public/assets/docs/ancestry/NSDEQ-JonathanNewman.pdf</code> |
| 30 | 8.36 MiB | 8.36 MiB | PDF | yes | <code>6bcb92d43b</code> | 2024-12-21 — Added NSDAR cert | <code>public/assets/docs/ancestry/NSDAR-Williams.pdf</code> |
| 31 | 8.29 MiB | 8.29 MiB | PDF | yes | <code>8713f97574</code> | 2024-05-04 — Improved Westarctica scans | <code>public/assets/img/honors/jhoward-kts.pdf</code> |
| 32 | 8.19 MiB | 8.19 MiB | PDF | yes | <code>f6854066b7</code> | 2025-04-27 — Cert for ODCPC | <code>public/assets/docs/ancestry/ODCPC-Taylor.pdf</code> |
| 33 | 7.10 MiB | 5.81 MiB | PDF | yes | <code>73510dce31</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/Crystal Cube Forecasting Disruptive Events.pdf</code> |
| 34 | 6.73 MiB | 6.74 MiB | PDF | yes | <code>20713b339a</code> | 2024-05-04 — Improved Westarctica scans | <code>public/assets/img/honors/jhoward-matikonis.pdf</code> |
| 35 | 6.41 MiB | 6.28 MiB | PDF | yes | <code>f71639ed6a</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/Megan-Price-Protecting-Marylands-Voting-Process.pdf</code> |
| 36 | 5.91 MiB | 5.91 MiB | PDF | yes | <code>164e901aed</code> | 2024-05-04 — Improved Westarctica scans | <code>public/assets/img/honors/jhoward-krigsvold.pdf</code> |
| 37 | 5.70 MiB | 5.70 MiB | PDF | yes | <code>3b535f5e84</code> | 2025-04-24 — Adding DEPM | <code>public/assets/docs/ancestry/DEP-Adams.pdf</code> |
| 38 | 5.45 MiB | 3.38 MiB | PNG | historical only | <code>562942a634</code> | 2024-04-03 — Getting started | <code>assets/img/news/tumblr_m8kiiji2DP1qzzrygo1_1280.png</code> |
| 39 | 5.30 MiB | 5.30 MiB | PDF | yes | <code>efe6d9ad7c</code> | 2024-05-06 — Revised and updated scans | <code>public/assets/docs/jhoward-hoco-crcres.pdf</code> |
| 40 | 5.24 MiB | 2.24 MiB | SVG | yes | <code>c02000274f</code> | 2024-05-06 — Revised and updated scans | <code>public/assets/docs/jhoward-umbc-phd.svg</code> |
| 41 | 5.12 MiB | 5.13 MiB | PNG | historical only | <code>92f146e0e6</code> | 2024-05-03 — Add MDDF commission | <code>assets/img/other/jhoward-mddf-commission.png</code> |
| 42 | 5.07 MiB | 4.93 MiB | PDF | yes | <code>4ce5d00c40</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/Long-Reach-Master-Plan.pdf</code> |
| 43 | 4.98 MiB | 2.83 MiB | PDF | yes | <code>111293a7da</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/Help! My Basement Is Flooded &#124; Personal Finance &#124; US News.pdf</code> |
| 44 | 4.88 MiB | 4.88 MiB | PDF | historical only | <code>814346a987</code> | 2024-05-02 — Add KCRSO | <code>assets/img/honors/jhoward-kcrso.pdf</code> |
| 45 | 4.88 MiB | 4.88 MiB | PDF | yes | <code>e01c92bf0d</code> | 2024-05-02 — Update the PDFs for UMD, UB, and BCS certs | <code>public/assets/docs/JHoward-MPA-PPA.pdf</code> |
| 46 | 4.78 MiB | 4.45 MiB | PPTX | yes | <code>61854e8cb5</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/OSG2021.pptx</code> |
| 47 | 4.72 MiB | 4.65 MiB | PNG | historical only | <code>b912a42f87</code> | 2024-05-06 — Revised and updated scans | <code>assets/docs/jhoward-umbc-phd.png</code> |
| 48 | 4.43 MiB | 4.42 MiB | PDF | yes | <code>25c6b6c1f9</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/EXPORT CREDIT AGENCIES abide - Global Trade Magazine.pdf</code> |
| 49 | 4.42 MiB | 4.42 MiB | PDF | yes | <code>c3eee0b1f3</code> | 2024-05-02 — Update the PDFs for UMD, UB, and BCS certs | <code>public/assets/docs/JHoward-BS-Math.pdf</code> |
| 50 | 4.39 MiB | 3.69 MiB | PDF | yes | <code>803102b79b</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/tpoc_03.pdf</code> |
| 51 | 4.36 MiB | 4.36 MiB | PDF | yes | <code>c11a8939b7</code> | 2025-02-03 — Got DOM cert today | <code>public/assets/docs/ancestry/DOM-AlexanderSynder.pdf</code> |
| 52 | 4.36 MiB | 4.33 MiB | PDF | yes | <code>475098dd96</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/So You Want to Be a Billionaire - Buy Lottery Tickets, Maybe - TheStreet.pdf</code> |
| 53 | 4.30 MiB | 4.30 MiB | PDF | yes | <code>85ce14e1e2</code> | 2025-09-25 — Added GSW1812 cert | <code>public/assets/docs/ancestry/GSW1812-Ray.pdf</code> |
| 54 | 4.16 MiB | 3.33 MiB | PDF | yes | <code>272eb2e2e7</code> | 2024-05-04 — Make Malta Live Now | <code>public/assets/docs/jhoward-malta-letters-patent-binder.pdf</code> |
| 55 | 4.03 MiB | 2.78 MiB | PDF | yes | <code>93aabd729f</code> | 2024-04-19 — A bunch of cleanups | <code>public/assets/docs/malta-government-gazette-20240216.pdf</code> |
| 56 | 4.02 MiB | 3.99 MiB | PNG | historical only | <code>b48e4afe91</code> | 2024-05-06 — Revised and updated scans | <code>assets/img/service/jhoward-hoco-crcres.png</code> |
| 57 | 4.01 MiB | 0.52 MiB | SVG | yes | <code>1fe9baae60</code> | 2025-01-01 — The Lion and the Unicorn | <code>public/assets/img/2025/the-lion-and-the-unicorn/Royal_Coat_of_Arms_of_the_Kingdom_of_Scotland_(Variant_1).svg</code> |
| 58 | 4.00 MiB | 1.56 MiB | SVG | yes | <code>337b1ed526</code> | 2024-05-02 — Update the PDFs for UMD, UB, and BCS certs | <code>public/assets/docs/JHoward-FBCS.svg</code> |
| 59 | 3.99 MiB | 0.02 MiB | PDF | yes | <code>5f4519d9b8</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/HowardCounty-CRC2019-FinalReport.pdf</code> |
| 60 | 3.99 MiB | 3.68 MiB | PDF | yes | <code>4a8a9c066c</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/howard-county-charter-review-2019-report.pdf</code> |
| 61 | 3.59 MiB | 3.59 MiB | PDF | yes | <code>dbcbc678a5</code> | 2025-01-12 — Add MD1812 certificate | <code>public/assets/docs/ancestry/MD1812-Ray.pdf</code> |
| 62 | 3.55 MiB | 3.55 MiB | JPG | historical only | <code>0b03c3cbeb</code> | 2024-04-03 — Getting started | <code>assets/img/news/IMG_20180328_183417.jpg</code> |
| 63 | 3.53 MiB | 3.52 MiB | JPG | historical only | <code>4d48da8746</code> | 2024-04-03 — Getting started | <code>assets/img/news/cincinnati-style-chili-coneys.jpg</code> |
| 64 | 3.49 MiB | 3.47 MiB | JPG | historical only | <code>ec7e458ac7</code> | 2024-04-03 — Getting started | <code>assets/img/news/the-challenge-of-assessment-and-evaluation-in-online-education.jpg</code> |
| 65 | 3.48 MiB | 3.48 MiB | JPG | historical only | <code>7115055e86</code> | 2024-04-03 — Getting started | <code>assets/img/news/IMG_20180328_182742.jpg</code> |
| 66 | 3.48 MiB | 3.48 MiB | PDF | yes | <code>18d9b2646c</code> | 2025-04-09 — Got NSSAR cert | <code>public/assets/docs/ancestry/NSSAR-Coates.pdf</code> |
| 67 | 3.45 MiB | 3.32 MiB | PDF | yes | <code>655e41b85f</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/Long-Reach-Master-Plan-Committee-Recommendation.pdf</code> |
| 68 | 3.31 MiB | 3.18 MiB | PDF | yes | <code>a2724fb607</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/OSG2021.pdf</code> |
| 69 | 3.05 MiB | 3.04 MiB | JPG | historical only | <code>6de60041c1</code> | 2024-04-03 — Getting started | <code>assets/img/news/IMG_20180328_184621.jpg</code> |
| 70 | 3.04 MiB | 3.02 MiB | JPG | historical only | <code>9bd4b87d22</code> | 2024-04-03 — Getting started | <code>assets/img/news/8402217133_216b2ffdd2_o.jpg</code> |
| 71 | 2.96 MiB | 2.84 MiB | PDF | yes | <code>06a3e6bd1d</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/JHoward-COE-Diploma-Taoism.pdf</code> |
| 72 | 2.91 MiB | 2.89 MiB | PPTX | yes | <code>d431ed8965</code> | 2024-04-10 — Numerous updates | <code>public/assets/docs/wmgrs-nfip.pptx</code> |
| 73 | 2.89 MiB | 2.89 MiB | PDF | yes | <code>520e74c99e</code> | 2024-11-19 — New certs from HCGS and MCHGS | <code>public/assets/docs/ancestry/HCGS-CFHC-Williams.pdf</code> |
| 74 | 2.88 MiB | 2.88 MiB | PNG | historical only | <code>3b43691829</code> | 2024-04-27 — Fixup the Krigsvold post | <code>assets/img/2024/count-of-krigsvold.png</code> |
| 75 | 2.87 MiB | 2.83 MiB | PDF | yes | <code>c4552c90e9</code> | 2025-07-13 — Added American Armigers certificate | <code>public/assets/docs/jhoward-american-armigers-registration.pdf</code> |
| 76 | 2.85 MiB | 2.85 MiB | JPG | historical only | <code>bc3dfbd66a</code> | 2024-04-03 — Getting started | <code>assets/img/news/IMG_20180328_174612.jpg</code> |
| 77 | 2.85 MiB | 2.85 MiB | PNG | historical only | <code>f51a243b1e</code> | 2024-04-03 — Getting started | <code>assets/img/news/the-battle-for-tsmc.png</code> |
| 78 | 2.84 MiB | 2.77 MiB | WEBP | yes | <code>1580c91dfc</code> | 2024-05-14 — Complete conversion to webp | <code>public/assets/img/2024/tartans-as-woven-heraldry-in-scotland/royal-stewart.webp</code> |
| 79 | 2.81 MiB | 2.70 MiB | PDF | yes | <code>df0adc262f</code> | 2025-05-21 — Got DVF cert | <code>public/assets/docs/ancestry/DVF-Darby.pdf</code> |
| 80 | 2.81 MiB | 2.81 MiB | JPG | historical only | <code>83552836d3</code> | 2024-04-03 — Getting started | <code>assets/img/news/IMG_20180328_174608.jpg</code> |
| 81 | 2.78 MiB | 2.78 MiB | PDF | yes | <code>e95876f29d</code> | 2024-11-19 — New certs from HCGS and MCHGS | <code>public/assets/docs/ancestry/HCGS-SHBC-Curran.pdf</code> |
| 82 | 2.77 MiB | 2.77 MiB | WEBP | yes | <code>1fdaee1b45</code> | 2025-07-30 — New blog post on Zoning appeals | <code>public/assets/img/2025/how-local-zoning-appeals-influence-development.webp</code> |
| 83 | 2.69 MiB | 1.82 MiB | SVG | yes | <code>fb9d676c73</code> | 2025-01-19 — Added CPS certificate | <code>public/assets/docs/JHoward-UMD-CPS.svg</code> |
| 84 | 2.61 MiB | 0.62 MiB | SVG | yes | <code>e65fe8ff7e</code> | 2024-11-03 — New Royal Arms post | <code>public/assets/img/2024/the-evolution-of-the-royal-arms/arms-william-mary.svg</code> |
| 85 | 2.60 MiB | 2.61 MiB | PDF | yes | <code>dada1b69de</code> | 2024-08-16 — Adding Level 2 of RHSC | <code>public/assets/docs/JHoward-RHSC-L2.pdf</code> |
| 86 | 2.59 MiB | 2.59 MiB | JPG | historical only | <code>5afe569f8c</code> | 2024-04-03 — Getting started | <code>assets/img/news/Einstein_1921.jpg</code> |
| 87 | 2.57 MiB | 2.57 MiB | JPG | historical only | <code>597fb3f16e</code> | 2024-04-03 — Getting started | <code>assets/img/news/20160402_125535.jpg</code> |
| 88 | 2.56 MiB | 2.55 MiB | JPG | historical only | <code>19ee7be167</code> | 2024-04-12 — Numerous updates | <code>assets/img/2024/fourier-transforms-in-communication/joseph-fourier.jpg</code> |
| 89 | 2.53 MiB | 2.41 MiB | JPG | historical only | <code>e8662cd564</code> | 2024-04-03 — Getting started | <code>assets/img/news/landscape-nature-forest-outdoor-snow-winter-913771-pxhere.com_.jpg</code> |
| 90 | 2.53 MiB | 2.50 MiB | WEBP | yes | <code>58c4095809</code> | 2025-10-15 — Added Big Fitz post | <code>public/assets/img/2025/the-edmund-fitzgerald-and-fifty-years-of-memory.webp</code> |
| 91 | 2.51 MiB | 2.42 MiB | PDF | yes | <code>51d4d376b0</code> | 2025-05-05 — SCWFO Certificate | <code>public/assets/docs/ancestry/OGS-SCWFO-Newman.pdf</code> |
| 92 | 2.49 MiB | 0.45 MiB | SVG | yes | <code>f444c16db0</code> | 2024-04-03 — Getting started | <code>public/assets/img/Greater_Coat_of_Arms_of_Westarctica.svg</code> |
| 93 | 2.48 MiB | 1.00 MiB | JPG | historical only | <code>66b2db867f</code> | 2024-04-16 — Blog post on Heraldry | <code>assets/img/2024/tartans-as-woven-heraldry-in-scotland/royal-stewart.jpg</code> |
| 94 | 2.46 MiB | 2.46 MiB | JPG | historical only | <code>94c84abfd7</code> | 2024-04-12 — Numerous updates | <code>assets/img/2024/lord-baltimores-influence-on-marylands-heraldry.jpg</code> |
| 95 | 2.42 MiB | 0.49 MiB | SVG | yes | <code>bf423d1360</code> | 2025-01-01 — The Lion and the Unicorn | <code>public/assets/img/2025/the-lion-and-the-unicorn/Coat_of_arms_of_the_United_Kingdom_in_Scotland.svg</code> |
| 96 | 2.41 MiB | 2.40 MiB | JPG | historical only | <code>fa8b29dccb</code> | 2024-04-03 — Getting started | <code>assets/img/news/20160402_115328.jpg</code> |
| 97 | 2.38 MiB | 2.38 MiB | PDF | yes | <code>acd63ae3e3</code> | 2025-09-25 — Added CGFM cert | <code>public/assets/docs/certifications/JHoward-CGFM.pdf</code> |
| 98 | 2.37 MiB | 2.37 MiB | PNG | historical only | <code>60983b6eee</code> | 2024-04-03 — Getting started | <code>assets/img/news/20160402_115553.png</code> |
| 99 | 2.36 MiB | 2.28 MiB | PDF | yes | <code>eef3769d1d</code> | 2026-05-03 — FFMC cert | <code>public/assets/docs/ancestry/FFMC-Burch.pdf</code> |
| 100 | 2.36 MiB | 2.36 MiB | PNG | historical only | <code>6cc68875df</code> | 2024-04-03 — Getting started | <code>assets/img/news/Big-Data-in-the-Online-Classroom.png</code> |

## Appendix C — Exact duplicate groups

Each group is one Git blob referenced by multiple current paths. `Checkout saving` assumes one path remains.

| Avoidable checkout bytes | Copies | Blob | Paths |
|---:|---:|---|---|
| 4.36 MiB | 2 | <code>475098dd96</code> | <code>public/assets/docs/So You Want to Be a Billionaire - Buy Lottery Tickets, Maybe - TheStreet.pdf</code><br><code>public/assets/docs/So You Want to Be a Billionaire? Buy Lottery Tickets, Maybe - TheStreet.pdf</code> |
| 2.52 MiB | 3 | <code>1122f977fc</code> | <code>public/assets/img/2024/the-evolution-of-the-royal-arms/arms-anne.svg</code><br><code>public/assets/img/2024/the-evolution-of-the-royal-arms/arms-james-i.svg</code><br><code>public/assets/img/2025/the-lion-and-the-unicorn/arms-james-i-english.svg</code> |
| 2.49 MiB | 2 | <code>f444c16db0</code> | <code>public/assets/img/Greater_Coat_of_Arms_of_Westarctica.svg</code><br><code>public/assets/img/news/Greater_Coat_of_Arms_of_Westarctica.svg</code> |
| 1.10 MiB | 2 | <code>b50697c9ea</code> | <code>public/assets/docs/6critflood.pdf</code><br><code>public/assets/docs/The 6 Critical Steps of a Flood Safety Plan &#124; Roomi &#124; blog.pdf</code> |
| 0.73 MiB | 2 | <code>49b3c4cdfd</code> | <code>public/assets/img/2024/the-evolution-of-the-royal-arms/arms-george-england.svg</code><br><code>public/assets/img/2024/the-evolution-of-the-royal-arms/arms-george-scotland.svg</code> |
| 0.43 MiB | 2 | <code>89224428a4</code> | <code>public/assets/docs/HPE-mindsmachines.pdf</code><br><code>public/assets/docs/In the minds of machines- Fundamental change from deep analytics – Bill Marcus.pdf</code> |
| 0.35 MiB | 2 | <code>e1d3db12a2</code> | <code>public/assets/docs/Pokemon Go_ From Accidents to Stranger Danger, Tips to Keeping Kids Safe.pdf</code><br><code>public/assets/docs/pokemon-go-advice-parents.pdf</code> |
| 0.34 MiB | 2 | <code>c8b1cb8aa3</code> | <code>public/assets/img/news/the-divine-wind-and-mongolian-invasions-1.webp</code><br><code>public/assets/img/news/the-divine-wind-and-mongolian-invasions.webp</code> |
| 0.28 MiB | 2 | <code>a6045b174b</code> | <code>public/assets/img/news/tlmo-cover.webp</code><br><code>public/assets/img/tlmo-cover.webp</code> |
| 0.26 MiB | 2 | <code>908ab68f58</code> | <code>public/assets/img/news/warren-shades.webp</code><br><code>public/assets/img/warren-shades.webp</code> |
| 0.26 MiB | 2 | <code>b2ec16abcf</code> | <code>public/assets/img/news/warren-shades-420.webp</code><br><code>public/assets/img/warren-shades-420.webp</code> |
| 0.24 MiB | 2 | <code>0ddae0a4d3</code> | <code>public/assets/img/news/tlmo-cover-scaled.webp</code><br><code>public/assets/img/tlmo-cover-scaled.webp</code> |
| 0.21 MiB | 2 | <code>7f7d9dd3da</code> | <code>public/assets/docs/Emmet-Pierce-How-El-Niño-and-La-Niña-Affect-the-Weather.pdf</code><br><code>public/assets/docs/elninolaninaweather.pdf</code> |
| 0.20 MiB | 2 | <code>d603b9415e</code> | <code>public/assets/img/JHoward-Westarctica-KtS.webp</code><br><code>public/assets/img/news/JHoward-Westarctica-KtS.webp</code> |
| 0.19 MiB | 2 | <code>345eb45d03</code> | <code>public/assets/img/news/westarctica-arms.webp</code><br><code>public/assets/img/westarctica-arms.webp</code> |
| 0.17 MiB | 2 | <code>e3b22e7ab4</code> | <code>public/assets/img/JHoward-Westarctica-Krigsvold.webp</code><br><code>public/assets/img/news/JHoward-Westarctica-Krigsvold.webp</code> |
| 0.17 MiB | 2 | <code>f1a378884d</code> | <code>public/assets/img/JHoward-Westarctica-Matikonis.webp</code><br><code>public/assets/img/news/JHoward-Westarctica-Matikonis.webp</code> |
| 0.16 MiB | 2 | <code>5cba7ad804</code> | <code>public/assets/img/news/westarctica-flag.webp</code><br><code>public/assets/img/westarctica-flag.webp</code> |
| 0.14 MiB | 2 | <code>d49aac3feb</code> | <code>public/assets/docs/PAF9172-Fa21-Syllabus-Policies.pdf</code><br><code>public/assets/docs/PAF9172-Sp22-Syllabus-Policies.pdf</code> |
| 0.13 MiB | 2 | <code>528f164c85</code> | <code>public/assets/img/mddf-dui.webp</code><br><code>public/assets/img/news/mddf-dui.webp</code> |
| 0.12 MiB | 2 | <code>e55b02ca4c</code> | <code>public/assets/docs/4 Must-Know Tornado Safety Tips for Renters &#124; Roomi Connect.pdf</code><br><code>public/assets/docs/4tornado.pdf</code> |
| 0.05 MiB | 2 | <code>e59a0db235</code> | <code>public/assets/img/news/tlmo.webp</code><br><code>public/assets/img/tlmo.webp</code> |
| 0.04 MiB | 2 | <code>be0a198835</code> | <code>public/assets/img/SE-NFIP-cover.webp</code><br><code>public/assets/img/news/SE-NFIP-cover.webp</code> |
| 0.04 MiB | 2 | <code>52921d7637</code> | <code>public/assets/img/Coat-of-Arms-Chief-Herald-Malta.webp</code><br><code>public/assets/img/news/Coat-of-Arms-Chief-Herald-Malta.webp</code> |
| 0.03 MiB | 2 | <code>fea7bb2879</code> | <code>public/assets/img/news/Gemini3.webp</code><br><code>public/assets/img/news/Gemini31.webp</code> |
| 0.03 MiB | 2 | <code>7279e1621e</code> | <code>public/assets/img/2024/tartans-as-woven-heraldry-in-scotland/scotland-arms.svg</code><br><code>public/assets/img/2025/the-lion-and-the-unicorn/Royal_Arms_of_the_Kingdom_of_Scotland.svg</code> |
| 0.03 MiB | 2 | <code>111805e908</code> | <code>public/assets/img/akureyri-shades-420.webp</code><br><code>public/assets/img/news/11083859_564729687262_847602682778668174_n.webp</code> |
| 0.03 MiB | 2 | <code>b548acf17e</code> | <code>public/assets/img/mddf-ssi.webp</code><br><code>public/assets/img/news/mddf-ssi.webp</code> |
| 0.02 MiB | 2 | <code>ea7f36c8b0</code> | <code>public/assets/img/news/tlmo-cover-300px.webp</code><br><code>public/assets/img/tlmo-cover-300px.webp</code> |
| 0.02 MiB | 2 | <code>e0b0665ffd</code> | <code>public/assets/img/CMNA-cover-300.webp</code><br><code>public/assets/img/news/CMNA-cover-300.webp</code> |
| 0.02 MiB | 2 | <code>da96cd154c</code> | <code>public/assets/img/mdor-cover.webp</code><br><code>public/assets/img/news/mdor-cover.webp</code> |
| 0.02 MiB | 2 | <code>274ece4e08</code> | <code>public/assets/img/GURPS_Disasters_Hurricane.webp</code><br><code>public/assets/img/news/GURPS_Disasters_Hurricane.webp</code> |
| 0.02 MiB | 2 | <code>8f58c080fe</code> | <code>public/assets/img/news/1898286_541285404792_914859516_n-1.webp</code><br><code>public/assets/img/news/1898286_541285404792_914859516_n.webp</code> |
| 0.02 MiB | 2 | <code>b043cf1acf</code> | <code>public/assets/img/mdor-cover-300w.webp</code><br><code>public/assets/img/news/mdor-cover-300w.webp</code> |
| 0.01 MiB | 2 | <code>ac8a9ae928</code> | <code>public/assets/img/SE-NFIP-cover-300.webp</code><br><code>public/assets/img/news/SE-NFIP-cover-300.webp</code> |
| 0.01 MiB | 2 | <code>39cca13a5d</code> | <code>public/assets/img/news/tumblr_maknpsqHTA1rejfwpo1_1280.webp</code><br><code>public/assets/img/news/tumblr_maknpsqHTA1rejfwpo1_12801.webp</code> |
