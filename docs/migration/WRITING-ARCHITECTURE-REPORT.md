# Writing Architecture Report

Reviewed September 16, 2026 on `rebuild/astro`.

## Outcome

The complete 794-post Blog remains the chronological record at `/blog/`. The new Writing layer at `/writing/` is an editorial route into that record: 18 selected pieces, eight durable subjects, and three genuine series. Every essay continues to use its existing canonical post URL.

The canonical editorial source is `_data/writing.yml`. The preparation pipeline validates it, resolves post metadata from the Blog collection, and writes the disposable `.generated/data/writing.json` used by the Astro pages. No Writing taxonomy was added to individual post frontmatter.

## Review method

The review covered all 794 active posts. Mechanical discovery recorded publication dates, titles, categories, tags, body length, explicit sequence language, and recurring phrases. It identified high-frequency subjects, unusually substantial pieces, long-running topical clusters, and posts that described themselves as part of a sequence.

Mechanical signals produced candidates, not decisions. Final choices were made by reading the relevant posts and asking whether each piece remained useful, distinctive, representative of a recurring interest, or unusually effective at explaining its subject. Publication date, length, and tag frequency were not used as scores.

The result is intentionally uneven. Subjects contain different numbers of essays. Series exist only where the posts have conceptual continuity and a useful reading order. Selected Writing reaches across the archive rather than treating recent work as a substitute for review.

## Selected Writing

The first four entries receive the prominent `PostCard` treatment. The remaining fourteen use the compact editorial-list treatment.

1. [The Model Is Not the System](/2026/06/29/the-model-is-not-the-system/)
2. [Seventy-Three Cents of Civilization](/2025/05/12/seventy-three-cents-of-civilization/)
3. [Saving the Ozone Layer](/2023/07/18/saving-the-ozone-layer/)
4. [Origami—Wabi-Sabi on Paper](/2022/07/22/origami-wabi-sabi-paper/)
5. [Public Goods Often Aren't](/2014/12/02/public-goods-often-arent/)
6. [Bitcoin Mining Pools and Income Smoothing](/2015/08/10/bitcoin-mining-pools-and-income-smoothing/)
7. [Applying Bayes to KIC 8462852](/2015/10/17/applying-bayes-to-kic-8462852/)
8. [Runaway Trolley, Never Coming Back](/2016/07/03/runaway-trolley-never-coming-back/)
9. [Statistical Likelihood of Extreme Events and the Ellicott City Floods](/2016/08/09/statistical-likelihood-extreme-events-ellicott-city-floods/)
10. [Postponing American Elections Doesn't Work](/2018/02/02/postponing-american-elections-doesnt-work/)
11. [Social Security Policysplainer](/2019/05/07/social-security-policysplainer/)
12. [Understanding Radioactive Exposure](/2019/06/15/understanding-radioactive-exposure/)
13. [Why is mRNA in My Vaccine?](/2021/01/20/why-is-mrna-in-my-vaccine/)
14. [The Case for RISC-V](/2023/01/30/case-risc-v/)
15. [How Math Influences Legal Decisions](/2023/11/05/how-math-influences-legal-decisions/)
16. [Spatial Reasoning Insights from Hunt the Wumpus and ChatGPT](/2024/03/02/spatial-reasoning-insights-from-hunt-the-wumpus-and-chatgpt/)
17. [Lessons on Invisible Authority and Expert Power from Alien Observers](/2024/11/12/lessons-on-invisible-authority-and-expert-power-from-alien-observers/)
18. [The Electoral College was Designed to Disenfranchise](/2025/05/26/the-electoral-college-was-designed-to-disenfranchise/)

`Social Security Policysplainer` intentionally retains its historical-status notice. Its 2019 figures need context, but the explanation remains strong enough for Selected Writing.

## Writing Subjects

| Subject | Selected essays |
| --- | ---: |
| Artificial Intelligence | 21 |
| Mathematics & Statistics | 17 |
| Risk & Uncertainty | 16 |
| Public Policy & Institutions | 20 |
| Software, Computing & the Internet | 17 |
| Science & Technology | 18 |
| Teaching & Learning | 15 |
| History, Culture & Ideas | 18 |

These are Writing subjects, not site-wide ontology. Existing tag pages remain intact and continue to answer a different question.

### Candidate subjects not adopted separately

- **Environmental policy** has a large mechanical footprint, but the strongest essays divide more naturally among Risk & Uncertainty, Public Policy & Institutions, and Science & Technology.
- **Howard County and Columbia** account for a great deal of historical material, including meeting minutes and campaign records. The strongest essays remain available under Public Policy & Institutions; the larger cluster is an archive, not one durable reading path.
- **Heraldry** is substantial enough to deserve future site-wide treatment connecting Writing, Ancestry, Honors, and the armorial record. Creating a Writing-only ontology for it now would pre-empt that later architecture, so the essayistic material sits under History, Culture & Ideas.
- **Project and program management** contains several substantial essays, but much of the surrounding record belongs more naturally to Scholarship and Teaching. It was not promoted into a Writing subject in isolation.
- **Space and futures studies** recur across the archive, but the current essay set is too heterogeneous to be clearer than Science & Technology, Risk & Uncertainty, and Public Policy & Institutions.

## Series

| Series | Parts | Basis |
| --- | ---: | --- |
| A History of Artificial Intelligence | 11 | A continuous historical argument with an identifiable beginning, internal transitions, and a concluding essay that states the series question. |
| Mission, Vision, and Values | 5 | An explicitly announced week-long series with forward links and a concluding post that identifies Parts 1–4. |
| Policysplainer | 2 | Two deliberately branded explainers sharing a consistent purpose and form. |

### A History of Artificial Intelligence

1. [When Machines Learned to Choose](/2026/04/29/when-machines-learned-to-choose/)
2. [When the Theory Ran Ahead of the World](/2026/05/06/when-the-theory-ran-ahead-of-the-world/)
3. [The First Winter](/2026/05/13/the-first-winter/)
4. [The Rule-Based Interregnum](/2026/05/20/the-rule-based-interregnum/)
5. [The Second Winter](/2026/06/04/the-second-winter/)
6. [Simple Rules, Surprising Worlds](/2026/06/10/simple-rules-surprising-worlds/)
7. [Let the Data Decide](/2026/06/25/let-the-data-decide/)
8. [Neurons All the Way Down](/2026/06/25/neurons-all-the-way-down/)
9. [Attention Is All You Need](/2026/07/01/attention-is-all-you-need/)
10. [The Naming Problem](/2026/07/16/the-naming-problem/)
11. [What We Do Now](/2026/07/22/what-we-do-now/)

Adjacent 2026 essays about labor, governance, finance, infrastructure, and education were not inserted into the history series merely because they concern AI. They remain available through the Artificial Intelligence subject.

### Series candidates considered but rejected

- **Historical social discount rates** traces a real research project across three posts, but the last entry is primarily a conference presentation embed. The cluster documents a project; it does not yet form a useful general reading sequence.
- **KIC 8462852** contains two connected probability essays. The second is a topical follow-up rather than a larger work with a distinct arc.
- **Flood insurance and the NFIP** form a large research record, but the posts mix findings, data releases, talks, and professional milestones. They belong to several subjects rather than one series.
- **COVID-19 and vaccination** contain several related explanations written for different moments and purposes. They remain a subject cluster, not an intended sequence.
- **AI governance after the history series** is a coherent interest but not a linear continuation. Those essays are intentionally separated from the historical arc.
- **The nonprofit course project** and other sustained project narratives are valuable records, but their update-by-update structure does not yet justify a permanent reading-order architecture.
- **The 6502 computer post** points to Ben Eater's external video series; JamesHoward.us contains one local post, not a local series.

## Architecture

### Canonical and generated data

- `_data/writing.yml` — the only canonical Writing inventory.
- `scripts/lib/writing-data.mjs` — strict normalization, post resolution, publication checks, duplicate checks, slug checks, series minimums, and route-collision checks.
- `.generated/data/writing.json` — disposable resolved data used by Astro.
- `scripts/validate-writing-data.mjs` — proves that generated data matches the canonical YAML and current post collection.

Every reference uses an existing canonical post route. Titles, dates, images, excerpts, and historical status come from the post collection rather than Writing YAML.

### Routes

- `/writing/`
- `/writing/subjects/`
- eight `/writing/subjects/{subject-slug}/` routes
- `/writing/series/`
- three `/writing/series/{series-slug}/` routes

`/blog/` remains the complete archive. `/writing` and `/writing/` resolve to the same directory-formatted static page under Astro's existing trailing-slash policy. No `/writing/blog/` or `/writing/archive/` route was added.

### Components

- `EditorialPostList.astro` — compact bibliographic lists and semantic ordered series lists.
- `WritingDirectory.astro` — shared subject/series directory presentation.
- `SeriesContext.astro` — restrained previous/series/next navigation on series posts.
- `WritingLinks.astro` — shared secondary navigation among Writing, Subjects, Series, and Blog Archive.
- Existing `PostCard`, `PageIntro`, and `SectionHeading` components are reused.

Series context is resolved centrally from Writing data. It appears after `HistoricalStatus` and before the article table of contents or body. Ordinary posts receive no series markup. Subject badges were not added to posts.

## Navigation, search, sitemaps, and feeds

- The primary navigation now presents `Writing → /writing/` instead of Blog.
- The homepage's accurate “From the Blog” and archive link remain unchanged pending a later homepage architecture pass.
- Search includes the Writing hub, both indexes, every subject, and every series. Post bodies remain indexed only at their canonical post routes.
- Both applicable XML sitemaps include all 14 Writing routes without duplicating post URLs.
- RSS and Atom remain feeds of Blog posts only.
- Existing Blog pagination, tags, post navigation, redirects, search inclusion, and historical-status behavior remain intact.

## Validation contracts

Validation rejects:

- unknown or unpublished post routes;
- duplicate routes within Selected Writing, a subject, or a series;
- duplicate or malformed subject and series slugs;
- subject or series route collisions;
- series with fewer than two parts;
- generated data that differs from canonical YAML and post metadata;
- missing Writing output, search entries, sitemap entries, ordered-list semantics, or route-ledger records;
- misplaced historical and series context;
- series context on a representative ordinary post;
- accidental Writing entries in Blog feeds;
- a primary navigation that still contains Blog alongside Writing;
- any change from twelve posts on the first Blog archive page.

The global generated-site validator continues to check every local link and asset reference.

## Visual QA and remaining gate

The generated DOM and responsive contracts were checked for the Writing hub, Artificial Intelligence subject, AI-history series, the opening AI-history post, `Social Security Policysplainer`, an ordinary non-series post, and the Blog archive. The shared layouts collapse the two-column directories and featured selections to one column at 48rem, and the series navigation wraps at 36rem. All target routes returned HTTP 200 from the built static site, including both `/writing` and `/writing/`.

Desktop, intermediate, and mobile screenshots could not be captured in this workspace. The required browser helper is absent, no browser binary is installed, and the environment refused the supported Chromium download. Human visual inspection therefore remains the final acceptance gate for exact text wrapping, page length, and hero crop.

## Genuine ambiguities

- `Let the Data Decide` has a June 19 source date but a June 25 canonical route, the same public date as `Neurons All the Way Down`. The chosen order follows source chronology and the conceptual transition from statistical learning to the return of neural networks.
- Policysplainer contains only two essays. It was retained as a series because the shared name, purpose, and form are explicit; a third installment is not fabricated.
- History, Culture & Ideas is intentionally broad. It keeps the Writing architecture useful without prematurely defining a site-wide subject system for heraldry, religion, genealogy, or cultural history.
- The existing Blog hero is reused for the Writing family. A distinct image may be considered later, but imagery was not allowed to delay the information architecture.
