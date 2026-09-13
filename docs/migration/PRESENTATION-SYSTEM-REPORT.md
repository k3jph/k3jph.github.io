# Astro Presentation-System Report

Branch: `rebuild/astro`

This pass establishes a shared presentation grammar for the native Astro site while preserving the content corpus and the production branch boundary.

## Shared shell and identity

- The header now uses the existing shield-and-wordmark asset once, with an accessible link label and no duplicated visible name.
- The header is fixed over every hero. It begins transparent, switches to `#303030` at `clamp(160px, 25vh, 260px)`, and returns to transparent above that threshold.
- Only background, border, and shadow transition over 0.5 seconds. Initial, restored, fragment, and back/forward scroll positions are evaluated in the shared component before transitions are enabled.
- The mobile menu uses an opaque charcoal surface while open. Reduced-motion mode shortens the transition to an effectively immediate state change.
- Current navigation uses both gold color and a rule, with independent hover and keyboard-focus treatment.
- The footer retains the current JamesHoward.us wording, other sites, notices, social links, identity badge, and copyright range, with revised spacing and mobile stacking.
- The ancestry breadcrumb introduced during conversion was removed. No visible breadcrumb convention remains.

## Tokens, typography, and layout

- Tokens now distinguish charcoal photographic identity (`#303030`) from structural navy, and define the site's blue, gold, cream, slate, text, spacing, radius, shadow, and transition values.
- The established Cinzel, Cambo, and Lato typography remains in place.
- Long-form prose uses a 46rem reading measure, general content uses 78rem, and dense archives may use 88rem.
- Body rhythm, headings, metadata, captions, links, lists, blockquotes, code, equations, tables, and footnotes now share global rules.
- Section bands provide default, navy, cream, and pale-slate surfaces with a common spacing scale.

## Heading and card architecture

- `HeadingDivider` owns the rule/mon/rule ornament, three semantic color variants, responsive sizing, and decorative accessibility.
- `SectionHeading` composes eyebrow, heading, divider, and optional description.
- The content directive of the same grammar replaces 38 historical separator blocks across Coat of Arms and five Honors records. No source-content separator fossil remains.
- `JHCard` owns border, radius, shadow, padding, media, title, and responsive behavior with default, compact, featured, and dark variants.
- `PostCard` and `DataCard` compose the base card. Home destinations, books, service, honors, software, and ancestry indexes use the same base system.
- Ancestry records use a two-column desktop grid and prioritize society, `Jure` ancestor, member number, and classification in that order. Finder controls use the shared form vocabulary and stack at narrow widths.

## Heroes and destinations

- `PageIntro` remains the one shared hero for permanent, detail, archive, and post pages. It uses the page image, a charcoal filter, a softer lower gradient, shared title/subtitle hierarchy, and the canonical divider.
- Search, tag, and contact pages now provide relevant hero images instead of inheriting the homepage image.
- About, Scholarship, Teaching, Service, Software, Books, Honors, and Ancestry were reviewed as compositions of the shared system.
- Search, contact, and 404 now use the same forms, buttons, shell, hero, and reading surfaces as the rest of the site.

## Figures, galleries, documents, and TOCs

- All 294 figure directives receive a semantic render role. At the final build, the distribution is 108 primary, 105 documentary, 48 supporting, 19 emblem, 13 gallery, and 1 portrait. The corpus audit counts 347 total figure structures, including preserved authored HTML figures.
- The Coat of Arms achievement is explicitly primary; five grant/registration images are documentary; the Chief Herald image is supporting; and 13 additional emblazonments are gallery items.
- Role rules, rather than source-image dimensions, now constrain prominence. Floats collapse on mobile, documentary images receive an inspectable surface, and unusually large SVGs remain bounded.
- Gallery items use consistent grid sizing and gaps. The native dialog viewer supports click, Enter/Space, Escape, outside-click close, and Left/Right keyboard movement.
- Document actions, embedded previews, related-post sections, and callouts share content-level styling.
- One canonical TOC treatment serves automatic and authored TOCs. Pages with an authored TOC no longer receive a second automatic TOC.

## Content-boundary repairs

- Duplicate Related Posts headings were removed from Howard County and Long Reach; the shared directive now owns the single section heading.
- A remaining Bootstrap-era strategy card in an archived post and one Honors record were migrated to semantic callout/card structures.
- The audit now rejects historical separator classes, content breadcrumbs, and the known Bootstrap presentation classes.

## Responsive and accessibility review

- Forty-four screenshots were produced: 22 required representative routes at desktop and mobile sizes.
- Additional layout checks cover 320×568, 430×932, 768×1024, 1024×768, 1366×768, and 1920×1080 viewports.
- Screenshot diagnostics found one narrow-screen credit overflow; the credit renderer and wrapping were corrected. The final review has no horizontal overflow, missing page-level headings, unexpected response status, or duplicate TOCs.
- Decorative mon images use empty alternative text. Forms have explicit labels, controls retain touch-sized targets, focus is visible, current navigation is not color-only, and reduced motion is honored.
- Header checks confirmed transparent top/before-threshold states, charcoal after-threshold/restored/mobile-menu states, reverse scrolling, and an unchanged 74.6px header height across state changes.

## Validation and scope

- `npm run audit`: 0 errors.
- `astro check`: 0 errors, warnings, or hints.
- Build verification: 2,225 HTML routes, 125 redirects, 4,019 static files, 68,332 local references, 0 errors, and 0 warnings.
- Deferred by scope: Media, Writing, subject architecture, final internal navigation, production merge, and the historical-asset forensic audit.
