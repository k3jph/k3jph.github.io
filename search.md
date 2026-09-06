---
layout: search
title: Search
subtitle: Find articles, site pages, and family-history research.
sitemap: false
description: Search jameshoward.us
stylesheet: /assets/css/search.css
---

<section class="search-panel" aria-labelledby="search-label">
    <form id="search-form" class="search-form" role="search" action="{{ '/search/' | relative_url }}" method="get">
        <label id="search-label" for="search-input">Search JamesHoward.us</label>
        <div class="search-control">
            <i class="fa-solid fa-magnifying-glass search-control-icon" aria-hidden="true"></i>
            <input
                type="search"
                id="search-input"
                name="q"
                class="form-control"
                placeholder="Try a name, topic, title, or phrase"
                autocomplete="off"
                enterkeyhint="search"
                aria-describedby="search-help"
                aria-controls="search-results"
                data-index-url="{{ '/data/search.json' | relative_url }}"
                data-limit="50"
                data-text-length="260"
                data-delay="350">
            <button type="reset" id="search-clear" class="search-clear" hidden>Clear</button>
        </div>
        <p id="search-help" class="search-help">Search blog posts, Ancestry research, and the rest of the site.</p>
    </form>

    <div class="search-feedback">
        <p id="search-status" class="search-status" role="status" aria-live="polite" aria-atomic="true">Loading the search index&hellip;</p>

        <fieldset id="search-filters" class="search-filters" hidden>
            <legend>Filter results by type</legend>
            <button type="button" class="search-filter is-active" data-search-type="All" aria-pressed="true">
                All <span class="search-filter-count">0</span>
            </button>
            <button type="button" class="search-filter" data-search-type="Blog" aria-pressed="false">
                Blog <span class="search-filter-count">0</span>
            </button>
            <button type="button" class="search-filter" data-search-type="Ancestry" aria-pressed="false">
                Ancestry <span class="search-filter-count">0</span>
            </button>
            <button type="button" class="search-filter" data-search-type="Page" aria-pressed="false">
                Page <span class="search-filter-count">0</span>
            </button>
        </fieldset>
    </div>

    <ol id="search-results" class="search-results" aria-busy="true"></ol>

    <div id="search-empty" class="search-message" hidden>
        <i class="fa-regular fa-compass" aria-hidden="true"></i>
        <h2>No matches found</h2>
        <p>Try a shorter phrase, a different spelling, or a broader topic.</p>
    </div>

    <div id="search-failure" class="search-message search-message--failure" hidden>
        <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
        <h2>Search is temporarily unavailable</h2>
        <p>The search index could not be loaded. Check your connection and try again.</p>
        <button type="button" id="search-retry" class="btn btn-fill btn-info">Try again</button>
    </div>

    <noscript>
        <div class="search-message search-message--failure">
            <h2>JavaScript is required</h2>
            <p>This on-site search runs in your browser and needs JavaScript to display results.</p>
        </div>
    </noscript>
</section>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2" defer></script>
<script src="{{ '/assets/js/search.js' | relative_url }}" defer></script>
