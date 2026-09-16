# Internal Navigation Report

Date: 2026-09-16  
Branch: `rebuild/astro`

## Executive summary

This pass establishes a small, consistent internal-navigation grammar without changing the site's major information architecture. It adds persistent family navigation to Writing and the Blog archive, low-chrome return links to detail pages, and reverse Subject links derived from the curated Subject data. Existing authored related-post lists, series context, tables of contents, and the Coat of Arms family navigation remain intact.

A same-day follow-on also resurrected `/consulting/` as a current page and gave it deliberate inbound paths from the homepage, About, and Contact without adding it to the primary navbar or flattening it into the destination directory.

The current generated-site graph contains 2,114 canonical HTML routes and 36,911 unique internal route edges. Every one of the 878 expected collection/detail relationships is covered. Six routes remain without inbound links: the 404 document, four recovered archive pages awaiting reintegration during the broader resurrection work, and the legacy `/projects/` concept awaiting an editorial decision.

## 1. Initial graph audit

The audit was run against the generated production site rather than inferred from source templates. Redirect documents were excluded from the canonical graph, and absolute `jameshoward.us` links were normalized as internal links.

| Measure | Initial result |
| --- | ---: |
| Canonical HTML routes | 2,114 |
| Redirect routes | 125 |
| Blog posts | 793 |
| Blog archive and pagination pages | 67 |
| Tag archives | 1,137 |
| Ancestry records | 46 |
| Writing Subjects | 8 |
| Writing Series | 3 |
| Site-wide Subjects | 7 |
| Routes with no inbound links | 9 |

The initial zero-inbound routes were:

- `/404.html`
- `/archive/recovering-a-lost-admin-password/`
- `/archive/terrapin-scholar/`
- `/archive/the-once-and-future-m-net/`
- `/archive/the-real-freebsd/`
- `/consulting/`
- `/games/`
- `/projects/`
- `/subjects/`

Collection discoverability was already fundamentally sound. Blog pagination exposed all 793 published posts, and the major record indexes exposed their detail pages. The problem was not that content had disappeared from its indexes; it was that readers arriving on detail pages often lacked a consistent way to understand the collection or move back up its hierarchy.

## 2. Weak or inconsistent navigation found

- `/subjects/` was a structural orphan. The homepage and contextual links reached individual Subjects, but the Subject pages did not return to the complete Subject index.
- `/games/` had no inbound link, and its sole record link unnecessarily passed through a redirect.
- Books, Ancestry records, Honors records, Service records, and Games records did not share a consistent parent-return treatment.
- Blog posts returned only to the Blog archive and did not acknowledge Writing as the site's editorial layer.
- The Writing family strip was inconsistently placed, absent from the Writing landing page and Blog archive, and sometimes appeared only after the main content.
- Curated Subjects pointed outward to resources, but those resources did not identify the Subjects that included them.
- Tags were numerous and useful as metadata, but were too broad and mechanical to function as the primary editorial navigation system.
- `/consulting/` was preserved but stranded inside the old information architecture even though its underlying purpose still made sense.

## 3. Navigation grammar

The resulting grammar uses four distinct patterns:

| Context | Pattern | Purpose |
| --- | --- | --- |
| Writing and Blog archive | Persistent family strip | Shows Writing, Subjects, Series, and the complete Blog archive as one family |
| Detail record | Low-chrome parent return | Returns to the owning collection without adding breadcrumbs or a card |
| Curated resource | Related Subjects | Shows the reverse of explicit Subject-to-resource assignments |
| Article | Authored related posts and continuation links | Preserves editorial recommendations and offers Writing/Blog continuation |

The Coat of Arms retains its existing six-part `ArmoryNav`. A second navigation system was not added there.

Consulting is treated as an active permanent destination but not as a new navigation family. It receives ordinary contextual links from pages where a reader might reasonably need it.

## 4. Writing and Blog family

`WritingLinks.astro` is now a true local family navigation component. It appears immediately below the hero on:

- `/writing/`
- `/writing/subjects/`
- every Writing Subject page
- `/writing/series/`
- every Writing Series page
- `/blog/`
- every Blog pagination page

It always exposes the same four destinations:

- Writing
- Subjects
- Series
- Complete Blog Archive

The current destination remains a link and is marked with `aria-current="page"`. On narrow screens the strip remains one keyboard-accessible list with horizontal overflow rather than collapsing into a hidden menu.

Individual posts do not repeat the full strip. Their closing continuation offers two clear choices: explore Writing or open the complete Blog archive.

## 5. Parent returns

The new `ParentNav.astro` component provides the same quiet return treatment for:

- 46 Ancestry records
- 6 top-level book pages and nested book material
- 5 Honors detail records
- 4 Service detail records
- the Games record
- 7 site-wide Subject pages

Nested book material returns to the owning book rather than skipping directly to the complete Books index. Coat of Arms sections use their richer family navigation instead of a parent link.

The generated-site validator checks 878 expected collection/detail relationships. Blog posts count as covered when they are discoverable through Blog archive pagination; other detail records require their exact parent relationship. Coverage remains 878 of 878.

## 6. Reverse Subject navigation

The Subject data remains the single source of editorial truth. `src/lib/subjects.ts` reverses only explicit, canonical, site-relative resource assignments. It does not infer relationships from tags, titles, or prose.

The final mapping contains:

| Measure | Count |
| --- | ---: |
| Distinct locally linked resources | 39 |
| Curated Subject-to-resource relationships | 48 |

`ResourceSubjects.astro` renders these as a short, low-chrome list near the end of the resource. It appears only when a resource has an explicit assignment. An ordinary unassigned post therefore receives no automatic Subject label.

Six Writing Subjects have an intentional counterpart in the site-wide Subject system and provide a reverse path. Operations has no canonical Writing Subject counterpart, while History, Culture & Ideas has no site-wide Subject counterpart; no relationship was invented for either.

## 7. Related Posts and other preserved systems

Existing authored Related Posts remain unchanged and are not replaced by automatic similarity. Series context remains distinct from Related Posts. Local tables of contents remain available where they help with a long page. The new Subject and parent links share one closing navigation region so that multiple systems do not become competing bands of cards.

## 8. Routes intentionally left without inbound links

| Route | Classification | Rationale |
| --- | --- | --- |
| `/404.html` | Acceptable utility exception | Error document, not an ordinary destination |
| `/archive/recovering-a-lost-admin-password/` | Recovered archive — reintegration pending | Resurrected historical material retained while the broader archive-recovery work determines its best contextual home |
| `/archive/terrapin-scholar/` | Recovered archive — reintegration pending | Resurrected historical material retained while the broader archive-recovery work determines its best contextual home |
| `/archive/the-once-and-future-m-net/` | Recovered archive — reintegration pending | Resurrected historical material retained while the broader archive-recovery work determines its best contextual home |
| `/archive/the-real-freebsd/` | Recovered archive — reintegration pending | Resurrected historical material retained while the broader archive-recovery work determines its best contextual home |
| `/projects/` | Legacy concept requiring an editorial decision | Preserved for now, but its old catch-all purpose overlaps newer Software, Writing, Subject, and archive structures |

The four `/archive/` exceptions are not declarations that those pages should remain isolated. They are an explicit reintegration queue for the ongoing historical-material resurrection campaign. The validator will warn when any gains a legitimate inbound link so its exception can be removed.

## 9. Current graph

| Measure | Current result |
| --- | ---: |
| Canonical HTML routes | 2,114 |
| Redirect routes | 125 |
| Unique internal route edges | 36,911 |
| Expected parent relationships | 878 |
| Covered parent relationships | 878 |
| Reverse-Subject resources | 39 |
| Reverse-Subject relationships | 48 |
| Routes with no inbound links | 6 |

`/subjects/`, `/games/`, and `/consulting/` are no longer orphans. The Games index links directly to its canonical detail route, and the detail record returns to Games. Consulting is reachable directly from the homepage and contextually from About and Contact.

The validator confirms that the following major destinations are reachable from the homepage graph: Writing, Scholarship, Books, Software, Teaching, Service, Consulting, Subjects, Ancestry, Honors, Coat of Arms, and Media.

## 10. Validation added

The graph logic lives in `scripts/lib/navigation-graph.mjs` and is available independently through:

```sh
npm run audit:navigation
```

The normal generated-site validator checks:

- canonical routes separately from redirects;
- homepage reachability of major destinations;
- exact zero-inbound exceptions;
- collection/detail coverage;
- the complete Writing family strip on all Writing and Blog archive pages;
- complete Coat of Arms family navigation;
- correct parent links on detail records;
- Blog-post continuation to both Writing and the Blog archive;
- reverse Subject links derived from curated data;
- absence of automatic Subjects on an unassigned control post;
- absence of redirect targets in the new navigation components;
- Consulting output, search/sitemap inclusion, homepage reachability, and contextual links from About and Contact.

With the Consulting follow-on, the expected generated-site totals are 2,239 HTML routes and 4,034 static files with 71,392 local references. The full validation remains required to confirm those totals and preserve the zero-error, zero-warning gate.

## 11. Accessibility and responsive behavior

- Each navigation component has a contextual accessible label.
- Current family destinations use `aria-current="page"`.
- Links remain ordinary anchors and inherit the site's visible keyboard focus treatment.
- Related Subjects are a semantic list, not visually styled metadata pills.
- Parent returns use clear visible text rather than icon-only controls.
- Mobile Writing navigation remains available without JavaScript.
- Resource connections stack naturally at narrow widths and do not rely on hover.
- Consulting adds only ordinary text links and no new interactive navigation mechanism.

## 12. Homepage re-evaluation

The homepage hierarchy remains unchanged: Hero → What I Do → Explore by Subject → Browse the Work → Elsewhere on the Site → From the Blog.

Consulting was resurrected without adding a seventh peer to the destination directory. A single low-chrome line beneath Browse the Work now offers `Consulting →` to readers who have a problem of their own. This preserves the distinction between destinations that document bodies of work and Consulting as a way to engage that work.

Media remains secondary rather than being restored to the primary work destinations.

The homepage remains dense enough to warrant normal human visual review before release, but the graph does not reveal a structural navigation gap that would justify another homepage architecture change in this pass.

## 13. Exclusions and unresolved items

This pass deliberately did not:

- add breadcrumbs;
- turn tags into Subjects;
- generate related posts algorithmically;
- add a universal “back” button;
- add navigation cards to every page;
- change historical permalinks or redirects;
- merge or alter `main`;
- force recovered archive material into premature destinations;
- decide the future editorial status of `/projects/`.

The production build and static DOM were checked at the component and generated-markup levels, including the responsive rules for the navigation system. A browser binary was not available in the refreshed workspace, so final human desktop, intermediate-width, and mobile visual inspection remains a release gate rather than being represented here as completed browser QA.
