---
id: 3003
title: Service
date: 2015-10-13T18:22:06-04:00
author: James Howard
layout: page
guid: service-philosophy
featured_image: /assets/img/service.webp
credits: _Image by [Creative Sustainability / Flickr](https://www.flickr.com/photos/aalto-cs/9669249877)._
stylesheet: /assets/css/service.css
---

<div class="service-introduction">

Service is where an institutional idea has to survive contact with procedures, budgets, people, and consequences. My work outside ordinary employment has included formal public adjudication, state emergency operations, nonprofit fiduciary stewardship, board governance, and editorial responsibility. It is not a hobby adjacent to the rest of my work; it is part of how I learn whether a policy, a system, or a scholarly claim can function in the world.

The active record comes first. The historical record follows: public and civic duty, professional and scholarly stewardship, and the older local and institutional work from which much of it grew.

</div>

{% assign current_roles = site.data.service | where: "current", true %}
<section class="service-current">
  <div class="container service-current-inner">
    <div class="title-area">
      <h2>Current Service</h2>
      <p class="description">Active appointments in public service, nonprofit governance, and professional stewardship.</p>
    </div>

    <div class="service-current-grid">
      {% for role in current_roles %}
      <article class="service-current-card">
        <h3>{% if role.detail_page %}<a href="{{ role.detail_page | relative_url }}">{% endif %}{{ role.organization }}{% if role.detail_page %}</a>{% endif %}</h3>
        <p class="service-role">{{ role.role }}</p>
        <p class="service-dates">{{ role.dates }}</p>
        <p class="service-summary">{{ role.summary }}</p>
        {% if role.ancestry %}<p class="service-context-link"><a href="{{ role.ancestry.page | relative_url }}">Genealogical background <span aria-hidden="true">→</span></a></p>{% endif %}
      </article>
      {% endfor %}
    </div>
  </div>
</section>

{% assign historical_roles = site.data.service | where: "current", false %}
{% assign public_roles = historical_roles | where: "section", "public" %}
{% assign professional_roles = historical_roles | where: "section", "professional" %}
<section class="service-history" aria-labelledby="past-service">
  <h2 id="past-service">Past Service</h2>
  <p class="service-history-introduction">A compact record of completed public, civic, professional, and university service.</p>

  <section class="service-history-group" aria-labelledby="public-civic-service">
    <h3 id="public-civic-service">Public and Civic Service</h3>
    <p class="service-history-group-introduction">County adjudication, local-government design, and community stewardship.</p>

    {% for role in public_roles %}
    <article class="service-entry">
      <h4>{% if role.detail_page %}<a href="{{ role.detail_page | relative_url }}">{% endif %}{{ role.organization }}{% if role.detail_page %}</a>{% endif %}</h4>
      <p class="service-entry-meta"><span class="service-entry-role">{{ role.role }}</span><span aria-hidden="true"> · </span><span>{{ role.dates }}</span></p>
      <p class="service-summary">{{ role.summary }}</p>
      {% if role.ancestry %}<p class="service-context-link"><a href="{{ role.ancestry.page | relative_url }}">Genealogical background <span aria-hidden="true">→</span></a></p>{% endif %}
    </article>
    {% endfor %}
  </section>

  <section class="service-history-group" aria-labelledby="professional-scholarly-service">
    <h3 id="professional-scholarly-service">Professional and Scholarly Service</h3>
    <p class="service-history-group-introduction">Professional-association, academic, and alumni governance work.</p>

    {% for role in professional_roles %}
    <article class="service-entry">
      <h4>{{ role.organization }}</h4>
      <p class="service-entry-meta"><span class="service-entry-role">{{ role.role }}</span><span aria-hidden="true"> · </span><span>{{ role.dates }}</span></p>
      <p class="service-summary">{{ role.summary }}</p>
      {% if role.ancestry %}<p class="service-context-link"><a href="{{ role.ancestry.page | relative_url }}">Genealogical background <span aria-hidden="true">→</span></a></p>{% endif %}
    </article>
    {% endfor %}
  </section>
</section>
