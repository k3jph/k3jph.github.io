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

The active record comes first. The fuller history follows: public and civic duty, professional and scholarly stewardship, and the older local and institutional work from which much of it grew.

</div>

{% assign current_roles = site.data.service | where: "current", true %}
<section class="service-current">
  <div class="service-current-inner">
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
      </article>
      {% endfor %}
    </div>
  </div>
</section>

{% assign public_roles = site.data.service | where: "section", "public" %}
<section class="service-record" aria-labelledby="public-civic-service">
  <h2 id="public-civic-service">Public and Civic Service</h2>
  <p class="service-record-introduction">Service to Maryland institutions, public bodies, and civic organizations.</p>

  {% for role in public_roles %}
  <article class="service-entry">
    <h3>{% if role.detail_page %}<a href="{{ role.detail_page | relative_url }}">{% endif %}{{ role.organization }}{% if role.detail_page %}</a>{% endif %}</h3>
    <p class="service-role">{{ role.role }}</p>
    <p class="service-dates">{{ role.dates }}</p>
    <p class="service-summary">{{ role.summary }}</p>
  </article>
  {% endfor %}
</section>

{% assign professional_roles = site.data.service | where: "section", "professional" %}
<section class="service-record" aria-labelledby="professional-scholarly-service">
  <h2 id="professional-scholarly-service">Professional and Scholarly Service</h2>
  <p class="service-record-introduction">Editorial stewardship, learned-society governance, and specialist institutional work.</p>

  {% for role in professional_roles %}
  <article class="service-entry">
    <h3>{{ role.organization }}</h3>
    <p class="service-role">{{ role.role }}</p>
    <p class="service-dates">{{ role.dates }}</p>
    <p class="service-summary">{{ role.summary }}</p>
  </article>
  {% endfor %}
</section>

{% assign past_roles = site.data.service | where: "section", "past" %}
<section class="service-record" aria-labelledby="past-service">
  <h2 id="past-service">Past Service</h2>
  <p class="service-record-introduction">A compact record of completed public, civic, professional, and university service.</p>

  {% for role in past_roles %}
  <article class="service-entry service-entry--compact">
    <h3>{% if role.detail_page %}<a href="{{ role.detail_page | relative_url }}">{% endif %}{{ role.organization }}{% if role.detail_page %}</a>{% endif %}</h3>
    <p class="service-role">{{ role.role }}</p>
    <p class="service-dates">{{ role.dates }}</p>
    <p class="service-summary">{{ role.summary }}</p>
  </article>
  {% endfor %}
</section>
