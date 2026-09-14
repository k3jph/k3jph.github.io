# Media Archive Rebuild

Reviewed September 14, 2026 on `rebuild/astro`.

## Outcome

The former “Media, Press, and News” bibliography contained 27 source entries.
Those citations are preserved as 26 distinct media records because the same
Breakthrough Entertainment appearance about *The Purge* appeared twice under
different titles and adjacent dates. The consolidated record preserves both
historical titles in its context note.

| Category | Records |
| --- | ---: |
| Interviews & Appearances | 8 |
| Quoted & Consulted | 15 |
| Profiles & Coverage | 3 |
| **Total** | **26** |

The production page is now a native Astro route at `/media/`, backed by
`_data/media.yml` and rendered by `MediaArchive.astro`. The historical
`media.md` file remains as a route/source marker but is intentionally excluded
from the generated Markdown page collection.

## Link and preservation audit

### Live or usefully redirecting external sources

1. Towson *Business Dialog* — original article live; local PDF also retained.
2. SuperMoney! — article discoverable at the original URL; local PDF retained.
3. Oyster.com — corrected to the surviving English article. The old archive had
   mistakenly linked this citation to an unrelated Heidi Hecht video post.
4. TheStreet — exact article remains discoverable; local PDF retained.
5. *Global Trade* — original article live; local magazine PDF retained.
6. QuoteWizard — original URL redirects to a current ValuePenguin article; the
   historical QuoteWizard PDF is retained.
7. INFORMS — a current INFORMS community record documents the *Resoundingly
   Human* episode.

### Unavailable external sources with a local record

1. Federal Blockchain News — original episode page unavailable; MP3 preserved.
2. InformationWeek — original article URL unavailable; JamesHoward.us post
   preserves the quotation and citation.
3. Flarrio — original site unavailable; PDF preserved.
4. Breakthrough Entertainment — station audio unavailable; related post
   preserves the appearance and explicitly records the loss.

### External sources not treated as dead without stronger evidence

1. U.S. News & World Report blocks automated retrieval; PDF preserved.
2. The Simple Dollar article could not be independently verified; PDF preserved.
3. Maryland Defense Force Defender could not be independently verified; PDF
   preserved.
4. SoundCloud, Facebook, and YouTube media embedded in five related posts could
   not all be independently verified in the audit environment. The local posts
   and original identifiers remain intact.

### No surviving copy located

1. Learn How to Become still serves the same URL, but the page has been
   substantially rewritten and no longer preserves the cited 2016 contribution.
2. The Rick Barnes / Maryland Defense Force Facebook citation has no public URL
   or local copy in the repository. The bibliographic record is retained and
   marked unavailable.

### Local-first archival records

The Hartford, HPE Insights, HighYa, and two Roomi records were already represented
by durable local PDFs rather than external links. Those files remain the primary
links.

## Genuine ambiguities

- Federal Blockchain News is dated October 5, 2020 in the historical archive,
  while a surviving podcast syndication listing places the episode on October
  12. The archive retains JamesHoward.us’s historical date pending a primary
  source.
- *Export Credit Agencies Abide* has only a year in the historical source, so it
  sorts after precisely dated 2016 entries rather than claiming a month or day.
- The two *Purge* citations were one appearance, not two separate media events.
  They are consolidated without discarding either historical title.
- Several embedded media hosts resist automated verification. Those sources are
  marked unverified, not declared dead.

## Route policy

- Canonical route: `/media/`
- Compatibility: `/media` continues to resolve to the same directory route.
- No `/media/archive/` route was created.
- The native archive is included explicitly in site search and both XML sitemaps.
- No homepage destination or Writing architecture was changed.
