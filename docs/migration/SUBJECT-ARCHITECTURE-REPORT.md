# Subject Architecture Report

Reviewed September 16, 2026 on `rebuild/astro`.

## Outcome

The site now has two independent but connected ways to move through its material.

- Destinations answer what kind of thing a resource is: Writing, Scholarship, Books, Software, Teaching, Service, Ancestry, Honors, and the other permanent sections.
- Subjects answer what the resource is about.

The destination architecture remains authoritative. Subjects do not duplicate articles, books, software, courses, or scholarly work; they resolve and present selected canonical resources from the existing shelves.

The canonical subject source is `_data/subjects.yml`. The preparation pipeline validates its references against the Blog collection, Writing data, the selected-work section of `scholarship.md`, `_data/books.yml`, `_data/software.yml`, `_data/teaching.yml`, and the small set of substantively relevant records in `_data/service.yml`. It then writes disposable `.generated/data/subjects.json` for Astro.

## Final subject set

| Subject | Rationale | Destination families | Resource assignments |
| --- | --- | --- | ---: |
| Artificial Intelligence | AI recurs as technical history, applied forecasting, agent-based modeling, software, and institutional judgment rather than as a large Blog tag alone. | Writing, Scholarship, Software | 9 |
| Mathematics & Statistics | This is the strongest connection across mathematical essays, scholarly software, books, R packages, statistics courses, and research-methods teaching. | Writing, Scholarship, Books, Software, Teaching | 14 |
| Operations Research & Decision Systems | Operations research deserves its own universal subject because it links models and constrained decisions across six destination families, including professional editorial service. | Writing, Scholarship, Books, Software, Teaching, Service | 15 |
| Risk & Resilience | Risk is broader here than uncertainty alone: it includes hazards, disease surveillance, disasters, insurance, resilience, operational failure, and the decisions made around them. | Writing, Scholarship, Books, Software, Teaching | 13 |
| Public Policy & Institutions | Government design, public finance, regulatory standards, public programs, and institutional service form a coherent body across six destination families. | Writing, Scholarship, Books, Software, Teaching, Service | 14 |
| Software & Open Systems | The common thread is not a programming language. It is inspectable software, open standards, reusable methods, systems history, and small machines that do useful work. | Writing, Scholarship, Books, Software | 12 |
| Teaching & Learning | The site contains a real pedagogical record across essays, scholarship, book-length work, instructional software, representative courses, and institutional teaching service. | Writing, Scholarship, Books, Software, Teaching, Service | 13 |

Counts are subject assignments, not unique resources. Overlap is intentional and informative.

## Resource counts by type

| Subject | Writing | Scholarship | Books | Software | Teaching | Service |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Artificial Intelligence | 5 | 2 | 0 | 2 | 0 | 0 |
| Mathematics & Statistics | 5 | 1 | 2 | 3 | 3 | 0 |
| Operations Research & Decision Systems | 5 | 3 | 1 | 2 | 2 | 2 |
| Risk & Resilience | 6 | 2 | 2 | 1 | 2 | 0 |
| Public Policy & Institutions | 5 | 1 | 2 | 1 | 3 | 2 |
| Software & Open Systems | 5 | 2 | 1 | 4 | 0 | 0 |
| Teaching & Learning | 5 | 1 | 2 | 1 | 3 | 1 |

## Representative resources

Each subject identifies three points of entry drawn from different destination families. These are editorial choices, not the newest items and not an automated ranking.

- **Artificial Intelligence:** “The Model Is Not the System”; “Crystal Cube: Forecasting Disruptive Events”; Kami.
- **Mathematics & Statistics:** *Computational Methods for Numerical Analysis with R*; “Phonetic Spelling Algorithm Implementations for R”; STAT 200.
- **Operations Research & Decision Systems:** *Handbook of Military and Defense Operations Research*; the wearable-sensor disease-surveillance work; “The Model Is Not the System.”
- **Risk & Resilience:** *Socioeconomic Effects of the National Flood Insurance Program*; “Mixed Reality for Post-Disaster Situational Awareness”; the Kivu Ebola analysis.
- **Public Policy & Institutions:** the NFIP book; “Social Security Policysplainer”; Howard County Board of Appeals service.
- **Software & Open Systems:** FreeGrep; the numerical-analysis book; “The Case for RISC-V.”
- **Teaching & Learning:** *Teaching and Learning Mathematics Online*; the tertiary STEM teaching study; “Your Major Is Irrelevant.”

## Relationship to Writing Subjects

Six site-wide subjects correspond to a deeper Writing Subject and link to it after showing a short representative Writing selection.

| Site-wide subject | Writing Subject |
| --- | --- |
| Artificial Intelligence | Artificial Intelligence |
| Mathematics & Statistics | Mathematics & Statistics |
| Risk & Resilience | Risk & Uncertainty |
| Public Policy & Institutions | Public Policy & Institutions |
| Software & Open Systems | Software, Computing & the Internet |
| Teaching & Learning | Teaching & Learning |

Operations Research & Decision Systems has no equivalent Writing Subject. Its justification comes from the cross-destination record, and its representative essays are maintained directly in the universal subject source.

The universal data does not copy the complete Writing Subject lists. It stores only the representative routes needed for the cross-site dossier and resolves all post metadata from the canonical Blog collection.

## Candidates considered but not adopted

- **Science & Technology** was too broad to clarify discovery. Most of its strongest material already belongs more precisely to AI, mathematics, risk, software, or operations research.
- **History, Culture & Ideas** remains a useful Writing Subject, but the broader material is still concentrated in Writing and the site's heritage destinations. Making it universal now would mostly rename existing paths.
- **Complex Systems** is genuine but not yet a separate first-generation subject. Agent-based modeling, emergence, forecasting, and organizational systems are represented under AI or Operations Research & Decision Systems according to their use.
- **Environmental and Flood Research** is substantial but works better as overlap between Risk & Resilience and Public Policy & Institutions than as a narrow additional silo.
- **Scientific Computing** is represented through Mathematics & Statistics and Software & Open Systems rather than separated from both.

## Deliberately destination-only material

Ancestry, Heraldry, Honors, Westarctica, Hawaiʻi, and the rest of the micronational and identity material remain in their existing destinations. The same is true of art-history experiments, tartan work, old utilities without a useful cross-subject relationship, and most personal or ceremonial service.

Service participates only where the work is substantively connected to a subject: operations-research editorial stewardship, public institutional governance, and learning-management-system selection. Service was not added merely to increase family counts.

## Canonical identifiers and resolution

- Writing references use canonical post routes.
- Writing Subject connections use the canonical Writing Subject slug.
- Scholarship references use the stable URL already present in the Selected Work section of `scholarship.md`; title, citation context, and description are parsed from that canonical prose.
- Books use slugs from `_data/books.yml`.
- Software uses the unique project name from `_data/software.yml`.
- Teaching uses institution ID plus course code from `_data/teaching.yml`.
- Service uses stable IDs in `_data/service.yml`.

No titles, dates, covers, course descriptions, software summaries, or service summaries are copied into `_data/subjects.yml`.

## Routes and presentation

Eight routes were added:

- `/subjects/`
- `/subjects/artificial-intelligence/`
- `/subjects/mathematics-statistics/`
- `/subjects/operations-research-decision-systems/`
- `/subjects/risk-resilience/`
- `/subjects/public-policy-institutions/`
- `/subjects/software-open-systems/`
- `/subjects/teaching-learning/`

The Subjects index describes the second discovery axis and lists the seven subjects with their participating destination families. Subject pages use a short set of representative entry points followed by resource groups organized by destination type. Writing uses `EditorialPostList`; the other families use a shared restrained documentary list rather than a card wall.

The primary navigation remains destination-oriented. Subjects was not added to the navbar, and the homepage was not changed.

## Destination integration

The shared `SubjectLinks.astro` component adds a restrained subject path near the end of:

- Writing;
- Scholarship;
- Books;
- Software; and
- Teaching.

Each destination receives only the subjects it can substantively support. No subject badges were added to individual posts, citations, books, projects, or courses.

## Components

- `SubjectDirectory.astro` presents the subject index without counts or dashboard styling.
- `SubjectResourceGroup.astro` presents non-Writing resources as quiet editorial records.
- `SubjectLinks.astro` provides the shared cross-link treatment on destination and subject pages.
- `EditorialPostList.astro`, `PageIntro.astro`, and `SectionHeading.astro` remain the established primitives for Writing lists and page structure.

## Search, sitemap, and route ownership

The Subjects index and all seven dossier pages are included in site search. Subject search entries contain subject descriptions, participating destination families, and resource titles, but do not copy the underlying bodies.

All eight routes are included in both the pages sitemap and the main sitemap. Subject routes are also recorded in the generated route ledger, and the dynamic legacy route handler treats them as occupied native routes.

## Validation contract

The Subject data validator enforces:

- a nonempty, flat subject list;
- unique lowercase kebab-case slugs;
- at least two destination families per universal subject;
- a closed set of supported resource types;
- type-specific identifiers for every resource family;
- unique resources within each subject group;
- no unresolved post, scholarship, book, software, course, or service reference;
- published status for referenced posts;
- valid Writing Subject references;
- featured resources that are already members of the subject dossier;
- no collisions with existing native, Writing, content, or redirect routes; and
- exact agreement between canonical YAML and disposable generated JSON.

The generated-site validator additionally checks every Subject route, search record, sitemap entry, resource group, linked resource, destination cross-link, route-ledger entry, and the absence of Subjects from the primary destination navbar.

## Editorial ambiguities

- Kami legitimately belongs to both AI and operations research because the agent-based modeling work connects emergence to operational analysis.
- Kivu Ebola analysis belongs to Risk & Resilience and Operations Research & Decision Systems; the two placements describe different uses of the same model.
- The numerical-analysis book and `cmna` package connect mathematics, software, and teaching without becoming generic filler in every technical subject.
- The military and defense operations-research handbook belongs to Public Policy & Institutions as well as operations research because its problems are institutional and governmental, not merely mathematical.
- `waterfall` appears under mathematics and public policy because its quantitative visualization was built around public-organizational accounting. It is not included under Software & Open Systems merely because it is code.

These overlaps are intentional. No resource is assigned everywhere, and no subject is treated as a score or primary intellectual identity.

## Visual QA

The generated DOM was checked for the Subjects index, all seven dossiers, and the five destination integrations. Every page has one H1; the index exposes all seven routes; every expected resource group and Writing Subject link is present; empty groups are absent; and the shared directory and link components collapse to one-column/mobile layouts at their defined breakpoints.

Automated screenshot capture remains unavailable in this workspace. The prescribed `agent-browser` command is not installed, the connected cloud browser is blocked from workspace loopback addresses, and the container has no local Chromium, Chrome, Firefox, or other screenshot-capable browser binary. Accordingly, human desktop, intermediate-width, and mobile inspection remains the final visual gate. No screenshots are represented as completed deliverables.
