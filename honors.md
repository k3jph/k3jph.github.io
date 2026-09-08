---
id: 4047
title: Honors
date: 2024-04-02
author: James Howard
layout: page
guid: honors
featured_image: /assets/img/honors.webp
stylesheet: /assets/css/honors.css
---

<div class="honors-introduction">

Recognition comes in different forms. Professional and public recognition belongs first: the work of learned societies, professional bodies, public institutions, and state service.

The record then continues into a different part of life: heraldry, private and ceremonial orders, micronational honors, peerages, and a few distinctions that require more explanation than a conventional résumé normally permits. These things are not interchangeable, which is why they are organized here by what they are and who conferred them.

</div>

{% assign professional = site.data.honors | where: "category", "professional" %}
<section class="honors-section honors-professional" aria-labelledby="professional-recognition">
  <div class="honors-section-header">
    <h2 id="professional-recognition">Professional Recognition</h2>
    <p>Recognition from professional and learned societies.</p>
  </div>
  <div class="honors-card-grid">
  {% for honor in professional %}
    {% include honor-card.html honor=honor %}
  {% endfor %}
  </div>
</section>

{% assign civic = site.data.honors | where: "category", "civic" %}
<section class="honors-section" aria-labelledby="civic-service-recognition">
  <div class="honors-section-header">
    <h2 id="civic-service-recognition">Civic and Service Recognition</h2>
    <p>Recognition arising from public, volunteer, and state military service. The Maryland Defense Force page remains the full documentary record.</p>
  </div>
  <div class="honors-card-grid">
  {% for honor in civic %}
    {% include honor-card.html honor=honor %}
  {% endfor %}
  </div>
</section>

{% assign heraldic = site.data.honors | where: "category", "heraldic" %}
<section class="honors-section honors-heraldic" aria-labelledby="heraldic-recognition">
  <div class="honors-section-header">
    <h2 id="heraldic-recognition">Heraldic Recognition</h2>
    <p>A formal grant of personal arms, documented separately in the heraldic record.</p>
  </div>
  <div class="honors-card-grid">
  {% for honor in heraldic %}
    {% include honor-card.html honor=honor %}
  {% endfor %}
  </div>
</section>

{% assign ceremonial = site.data.honors | where: "category", "ceremonial" %}
<section class="honors-section honors-ceremonial" aria-labelledby="orders-ceremonial-honors">
  <div class="honors-section-header">
    <h2 id="orders-ceremonial-honors">Orders and Ceremonial Honors</h2>
    <p>Orders conferred by private, ceremonial, and micronational institutions, identified by issuer and type.</p>
  </div>
  <div class="honors-card-grid">
  {% for honor in ceremonial %}
    {% include honor-card.html honor=honor %}
  {% endfor %}
  </div>
</section>

{% assign peerage = site.data.honors | where: "category", "peerage" %}
<section class="honors-section" aria-labelledby="peerages-titles">
  <div class="honors-section-header">
    <h2 id="peerages-titles">Peerages and Titles</h2>
    <p>Titles created in the peerage of the Grand Duchy of Westarctica. The dedicated Westarctica page carries the underlying documents.</p>
  </div>
  <div class="honors-card-grid">
  {% for honor in peerage %}
    {% include honor-card.html honor=honor %}
  {% endfor %}
  </div>
</section>

{% assign other = site.data.honors | where: "category", "other" %}
<section class="honors-section honors-other" aria-labelledby="other-distinctions">
  <div class="honors-section-header">
    <h2 id="other-distinctions">Other Distinctions</h2>
    <p>Achievements that do not fit the categories above, but are too good to leave out.</p>
  </div>
  <div class="honors-card-grid">
  {% for honor in other %}
    {% include honor-card.html honor=honor %}
  {% endfor %}
  </div>
</section>
