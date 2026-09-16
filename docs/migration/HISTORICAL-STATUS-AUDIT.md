# Historical-Status Audit

Review date: September 16, 2026

## Summary

This audit reviewed the complete active blog corpus for material time-sensitive information that a present-day reader could reasonably mistake for current information. Age alone was not a selection criterion.

| Measure | Count |
| --- | ---: |
| Active blog posts scanned | 794 |
| Mechanical candidates | 227 |
| Candidates manually reviewed | 227 |
| Notices added | 21 |
| Historical | 7 |
| Superseded | 3 |
| Resolved | 1 |
| Discontinued | 10 |

The mechanical discovery pass is reproducible with `node scripts/audit-historical-candidates.mjs`. Its output is intentionally broad. No status is assigned by that script.

## Method

Candidate discovery searched titles, tags, and bodies for four broad classes of signals:

- public-health events and active emergencies;
- time-bound rules, benefits, registration, and procedures;
- versioned instructions, API endpoints, and service configuration;
- projects, services, platforms, and programs that may no longer operate.

It also looked for temporal phrases when they appeared with action-oriented language. Every result was then read editorially. A notice was added only when a reader arriving without surrounding context could mistake a material claim, instruction, condition, or operating project for a current one.

The review deliberately did not use publication age, topic alone, or the presence of a word such as “currently” as an assignment rule.

A subject's later failure, closure, or discontinuation does not by itself make an old post misleading. A notice is warranted only when the post itself could reasonably be mistaken for current operational information, guidance, availability, or status. The system contextualizes posts, not the subsequent fate of everything mentioned in them.

Accordingly, `discontinued` generally identifies a service, tool, project, venture, API, bot, or program that a reader might otherwise reasonably believe remains available or active from the post itself. It is not assigned merely because the third-party subject of an essay, interview, or historical account later ceased operating.

## Notices added

### Historical

| Post | Reason for notice |
| --- | --- |
| [Flubola](/2014/11/08/flubola/) | A risk comparison written during the 2014 Ebola outbreak. |
| [Where is New Horizons Going?](/2015/07/13/where-is-new-horizons-going/) | Written before the Pluto flyby and later Kuiper Belt mission results. |
| [Zika For the Rest of Us](/2016/02/12/zika-for-the-rest-of-us/) | Uses outbreak-era local reports, projections, and guidance. |
| [Social Security Policysplainer](/2019/05/07/social-security-policysplainer/) | Contains 2019 contribution limits, revenue figures, and solvency projections. |
| [Why Social Distancing Works](/2020/03/14/why-social-distancing-works/) | Early-pandemic assumptions predate vaccines, variants, and later transmission and masking evidence. |
| [The Risk of Dying From COVID-19](/2020/05/19/the-risk-of-dying-from-covid-19/) | Calculates risk from May 2020 case counts and then-limited clinical evidence. |
| [How Do We Know a COVID-19 Vaccine Will Work?](/2020/09/18/how-do-we-know-a-covid-19-vaccine-will-work/) | A preauthorization forecast written before real-world vaccine and variant data. |

### Superseded

| Post | Reason for notice |
| --- | --- |
| [A Brief Note on Feeds](/2008/02/08/a-brief-note-on-feeds/) | Describes an obsolete Textpattern, FeedBurner, and Yahoo Pipes arrangement; links to the current feed. |
| [Drone Hobbyists Need to Calm Down About Registration](/2015/12/23/drone-hobbyists-need-to-calm-down-about-registration/) | Describes the original 2015 federal registration framework; links to current FAA guidance. |
| [Using Rust on the Open Science Grid](/2019/01/03/using-rust-on-the-open-science-grid/) | Contains commands and job-submission details for the 2019 OSG Connect environment; links to current documentation. |

### Resolved

| Post | Reason for notice |
| --- | --- |
| [Prepare for Hurricane Florence Like a Professional](/2018/09/09/prepare-for-hurricane-florence-like-a-professional/) | Gives a forecast and preparation timeline for an emergency that concluded in September 2018. |

### Discontinued

| Post | Reason for notice |
| --- | --- |
| [Updates to the Search List](/2007/03/01/updates-to-the-search-list/) | Refers to the former Howard County Search service. |
| [Add the Howard County Search to Your Website](/2007/04/02/add-the-howard-county-search-to-your-website/) | Provides installation material for that former service. |
| [New Search Buttons for Your Toolbar](/2007/05/12/new-search-buttons-for-your-toolbar/) | Provides browser tools for that former service. |
| [More Additions to the Howard County Search](/2007/05/23/more-additions-to-the-howard-county-search/) | Reports an update to that former service. |
| [New Updates to the Howard County Search](/2007/09/30/new-updates-to-the-howard-county-search/) | Reports an update to that former service. |
| [OpenPGP Bot on Twitter](/2010/12/01/openpgp-bot-on-twitter-2/) | Announces an automated account that no longer operates. |
| [OPM DC Operating Status via Twitter](/2011/02/23/opm-dc-operating-status-via-twitter/) | Announces a public-information bot that no longer operates. |
| [A RESTful interface for MD5 hashes](/2011/07/21/a-restful-interface-for-md5-hashes/) | Presents an experimental API endpoint that is no longer available. |
| [Hello Assent, or My Startup](/2015/07/18/hello-assent-or-my-startup/) | Presents Assent Systems as an active venture; it is no longer operating. |
| [My Robot, or Announcing DC Closings](/2016/01/24/my-robot-or-announcing-dc-closings/) | Announces an automated service that no longer operates. |

## Representative candidates left unchanged

| Post | Decision |
| --- | --- |
| [Why You Should Get Your Flu Shot](/2018/01/02/get-flu-shot/) | The illustrative figures are dated, but the post's explanation of vaccination and community protection remains intelligible and is not procedural medical guidance. |
| [Why Is mRNA in My Vaccine?](/2021/01/20/why-is-mrna-in-my-vaccine/) | A durable explanation of the mechanism, not a claim about then-current availability or policy. |
| [Solar Eclipse Mathematics](/2024/04/08/solar-eclipse-mathematics/) | The event is dated, but the mathematical explanation is not time-sensitive. |
| [Presidential Tax Returns and Filing Requirements](/2017/06/03/presidential-tax-returns-filing-requirements/) | A legal and policy argument about a contemporary bill, not filing instructions for a reader. |
| [Source Code for LX, a Link Shortener](/2009/12/16/source-code-for-lx-a-link-shortener/) | The body already states that the code does not work and requires substantial revision. |
| [The Nonprofit Project Takes Off](/2015/03/02/the-nonprofit-project-takes-off/) | Clearly presents a dated course project rather than an apparently current public program. |
| [Confucianism in the Time of Coronavirus](/2020/03/27/confucianism-in-the-time-of-coronavirus/) | A contemporary philosophical reflection without operational or medical guidance. |
| [Runaway Trolley, Never Coming Back](/2016/07/03/runaway-trolley-never-coming-back/) | A timeless thought-experiment essay despite its age. |
| [Criticize Mars One, but Don't Stand in Their Way](/2015/08/18/criticize-mars-one-but-dont-stand-in-their-way/) | A valid contemporaneous argument rather than current operational guidance; Mars One's later failure does not make the post misleading. |
| [Watch My Interview With Mars One Candidate Heidi Hecht](/2016/07/04/watch-interview-mars-one-candidate-heidi-hecht/) | A documentary record of an interview and a real candidacy at the time; the subject's later closure does not require retrospective annotation. |

## Boundary and ambiguous cases

- **GitHub's Ongoing Actions Outage** (September 10, 2026) describes a recent incident that had not been conclusively resolved at the review date. Assigning `resolved` would be premature; it should be reconsidered when a reliable resolution is known.
- **Flubola** is brief and visibly dated. A restrained `historical` notice was applied because the central comparison depends specifically on the 2014 outbreak environment.

## Intentionally excluded classes

The review generally left these classes untouched unless a post contained a separate actionable or materially misleading time-bound claim:

- political and election commentary after the election;
- dated talks, recordings, meeting notes, and event announcements;
- personal news and project retrospectives that already identify their period;
- historical, mathematical, philosophical, or scientific explanations whose substance remains durable;
- old software essays whose bodies explicitly identify their own broken or experimental state.

## Preservation and architecture

The 21 canonical posts with notices were edited only in frontmatter. Their Markdown bodies, publication dates, permalinks, tags, and categories remain unchanged. The two Mars One posts retain their original content and metadata other than removal of the unnecessary `historical_status` object.

`historical_status` is a strict optional nested object in the blog collection schema. `HistoricalStatus.astro` owns the four labels, presentation, review date, optional successor link, and accessible landmark. The shared dynamic blog route renders it after the hero and tags and before the article body. Posts without the object produce no notice markup.

The canonical-content audit validates supported fields and types, a nonempty note, a real review date, URL shape, and the `current_label`/`current_url` dependency. The Astro collection schema independently validates generated content. Historical status does not change indexing, search inclusion, archive inclusion, feeds, sitemaps, canonical URLs, or redirects.
