---
id: ancestry
title: Ancestry
author: James Howard
layout: page
featured_image: /assets/img/ancestry.webp
guid: ancestry
stylesheet: /assets/css/ancestry.css
script: /assets/js/ancestry.js
redirect_from:
  - /hereditary-societies
  - /hs
  - /family
---

{% assign ancestry_total = site.ancestry | size %}
{% assign lineage_records = site.ancestry | where: "class", "lineage" %}
{% assign certificate_records = site.ancestry | where: "class", "certificate" %}
{% assign family_records = site.ancestry | where: "class", "family" %}
{% assign military_records = site.ancestry | where: "class", "military" %}
{% assign all_places = "" | split: "" %}
{% assign all_topics = "" | split: "" %}
{% for record in site.ancestry %}
  {% if record.places %}{% assign all_places = all_places | concat: record.places %}{% endif %}
  {% if record.topics %}{% assign all_topics = all_topics | concat: record.topics %}{% endif %}
{% endfor %}
{% assign all_places = all_places | uniq | sort %}
{% assign all_topics = all_topics | uniq | sort %}

<div class="ancestry-introduction">
  <p>Genealogy is mostly an exercise in refusing to believe family stories until the paperwork shows up. This section collects my work in historical genealogy: not a complete family tree, but a series of case studies in documented descent, each centered on an ancestor, a place, or a historical circumstance.</p>

  <p>The records draw on primary sources and strong secondary evidence: land and probate files, church records, military service, migration, occupations, and family relationships. Ambiguity stays visible. A tidy story is not a substitute for a defensible one.</p>

  <p>Societies and certificate programs provide the organizing structure because their applications force lineages into a documented, reviewable form. The ancestors and their lives remain the subject. This is ongoing research, revised when better evidence appears, with clarity, transparency, and fidelity to the historical record taking precedence over genealogical mythmaking.</p>
</div>

<section class="ancestry-finder-band" id="find-a-record" aria-labelledby="find-a-record-heading">
  <div class="ancestry-band-inner">
    <header class="ancestry-section-header">
      <p class="ancestry-section-kicker">Search the collection</p>
      <h2 id="find-a-record-heading">Find a Record</h2>
      <p>Search names, organizations, chapters, places, historical contexts, and member or certificate numbers.</p>
    </header>

    <form class="ancestry-finder" id="ancestry-finder" role="search" action="{{ '/ancestry/' | relative_url }}" method="get" hidden>
      <div class="ancestry-search-field">
        <label for="ancestry-query">Search the ancestry archive</label>
        <div class="ancestry-search-control">
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <input type="search" id="ancestry-query" name="q" placeholder="Try Hoar, Ohio, Quakers, or 1185" autocomplete="off" enterkeyhint="search">
        </div>
      </div>

      <div class="ancestry-filter-grid">
        <div>
          <label for="ancestry-type">Type</label>
          <select id="ancestry-type" name="type">
            <option value="">All record types</option>
            <option value="lineage">Hereditary Society</option>
            <option value="certificate">Heritage Certificate</option>
            <option value="family">Family Association</option>
            <option value="military">Military Company</option>
          </select>
        </div>
        <div>
          <label for="ancestry-place">Place</label>
          <select id="ancestry-place" name="place">
            <option value="">All places</option>
            {% for place in all_places %}<option value="{{ place | escape }}">{{ place }}</option>{% endfor %}
          </select>
        </div>
        <div>
          <label for="ancestry-topic">Historical context</label>
          <select id="ancestry-topic" name="topic">
            <option value="">All contexts</option>
            {% for topic in all_topics %}<option value="{{ topic | escape }}">{{ topic }}</option>{% endfor %}
          </select>
        </div>
        <div class="ancestry-reset-wrap">
          <button type="reset" id="ancestry-reset">Reset filters</button>
        </div>
      </div>
    </form>

    <noscript>
      <p class="ancestry-noscript">The finder needs JavaScript, but the complete archive remains available below, organized by record type.</p>
    </noscript>
  </div>
</section>

<section class="ancestry-explore" aria-labelledby="browse-by-record-type">
  <header class="ancestry-section-header">
    <p class="ancestry-section-kicker">{{ ancestry_total }} documented records</p>
    <h2 id="browse-by-record-type">Browse by Record Type</h2>
    <p>These four kinds of record organize the archive. They overlap in method, but they do not mean the same thing.</p>
  </header>

  <div class="ancestry-category-grid">
    <a class="ancestry-category-card" href="#hereditary-societies" data-ancestry-type-link="lineage">
      <span class="ancestry-category-count">{{ lineage_records | size }}</span>
      <h3>Hereditary Societies</h3>
      <p>Formal organizations requiring documented descent from a qualifying person.</p>
    </a>
    <a class="ancestry-category-card" href="#heritage-certificates" data-ancestry-type-link="certificate">
      <span class="ancestry-category-count">{{ certificate_records | size }}</span>
      <h3>Heritage Certificates</h3>
      <p>Place-based programs documenting early settlement or long residence.</p>
    </a>
    <a class="ancestry-category-card" href="#family-associations" data-ancestry-type-link="family">
      <span class="ancestry-category-count">{{ family_records | size }}</span>
      <h3>Family Associations</h3>
      <p>Research and preservation centered on a progenitor or surname.</p>
    </a>
    <a class="ancestry-category-card" href="#historic-military-companies" data-ancestry-type-link="military">
      <span class="ancestry-category-count">{{ military_records | size }}</span>
      <h3>Historic Military Companies</h3>
      <p>Continuing institutions in which descent is one path to membership.</p>
    </a>
  </div>
</section>

<section class="ancestry-archive" id="research-index" aria-labelledby="research-index-heading">
  <header class="ancestry-section-header ancestry-archive-header">
    <div>
      <p class="ancestry-section-kicker">The complete documentary index</p>
      <h2 id="research-index-heading">Research Index</h2>
      <p>Every ancestry record appears below. Chapters remain with their parent organizations.</p>
    </div>
    <p id="ancestry-result-count" class="ancestry-result-count" role="status" aria-live="polite" aria-atomic="true">Showing all {{ ancestry_total }} records.</p>
  </header>

  <div id="ancestry-empty" class="ancestry-empty" hidden>
    <h3>No ancestry records match those filters.</h3>
    <p>Try a broader search or clear the filters.</p>
    <button type="button" id="ancestry-empty-reset">Reset filters</button>
  </div>

  <div id="ancestry-results">
    {% include ancestry-record-group.html class="lineage" id="hereditary-societies" kicker="Lineage organizations" heading="Hereditary Societies" %}
    {% include ancestry-record-group.html class="certificate" id="heritage-certificates" kicker="Place-based programs" heading="Heritage Certificates" %}
    {% include ancestry-record-group.html class="family" id="family-associations" kicker="Shared research and preservation" heading="Family Associations" %}
    {% include ancestry-record-group.html class="military" id="historic-military-companies" kicker="Continuing institutions" heading="Historic Military Companies" %}
  </div>
</section>
