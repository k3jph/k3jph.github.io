# Release readiness

## Migration gates

- [x] All 794 posts enter the Astro content collection.
- [x] All 46 ancestry records enter the Astro content collection.
- [x] Permanent pages and historical aliases are included in the route ledger.
- [x] Assets, CNAME, robots.txt, search, feeds, sitemap, and custom 404 are emitted.
- [x] Scheduled-post filtering is enforced at collection consumption points.
- [x] Astro diagnostics pass without errors.
- [x] The production build and internal-reference audit pass.
- [ ] Review representative pages in a browser and compare against production.
- [ ] Merge `rebuild/astro` only after stakeholder review.

## Representative review matrix

Check desktop and mobile rendering for: home, blog archive, an old post, a recent post, a math-heavy post, a figure-heavy post, a tag archive, search, ancestry index/detail, books index/detail, honors, service, software, teaching, contact, and 404. Confirm keyboard navigation, visible focus, menu behavior, filters, forms, image loading, and PDF links.

## Rollback

The migration remains isolated on `rebuild/astro`. Until that branch is merged, the production site and `main` are unchanged. After a merge, revert the merge commit and redeploy the last successful Pages artifact if an issue appears.
