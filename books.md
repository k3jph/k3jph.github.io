---
id: 2930
title: Books
date: 2015-09-30T15:57:20-04:00
author: James Howard
layout: page
guid: https://jameshoward.us/?page_id=2930
menu-order: 90
menu-label: Books
stylesheet: /assets/css/books.css
flush_bottom: true
---

<div class="books-introduction">

I write books when a problem needs more room than an article, a talk, or a
repository can give it. The four titles below are the academic and policy
books: work on online mathematics education, defense operations research,
numerical analysis, and flood-insurance policy. They are separate subjects,
but each is an attempt to make a technical problem legible enough to use.

</div>

<section class="section section-gray books-section books-featured-band">
  <div class="container">
    <div class="title-area">
      <h2>Books</h2>
      <div class="separator separator-info"><img src="{{ '/assets/img/identity/kamon-info.svg' | relative_url }}" height="35" alt="" /></div>
    </div>
    <div class="book-grid">
      {% include book-cards.html %}
    </div>
  </div>
</section>

<section class="section books-section books-other-band">
  <div class="container">
    <div class="title-area">
      <h2 class="text-warning">Other Book-Length Work</h2>
      <div class="separator separator-warning"><img src="{{ '/assets/img/identity/kamon-warning.svg' | relative_url }}" height="35" alt="" /></div>
    </div>
    {% assign hurricane = site.data.books.other_book_length_work | first %}
    <article class="other-book books-other-work">
      <img src="{{ hurricane.cover | relative_url }}" alt="{{ hurricane.cover_alt }}" loading="lazy">
      <div>
        <p class="book-card-kicker">{{ hurricane.year }} · {{ hurricane.format }}</p>
        <h3>{{ hurricane.title }}</h3>
        <p class="book-card-role">{{ hurricane.role }} · {{ hurricane.publisher }}</p>
        <p>{{ hurricane.summary }}</p>
        <p class="book-links">
          <a href="{{ hurricane.games_url | relative_url }}">Games page <span aria-hidden="true">→</span></a>
          <a href="{{ hurricane.source_url }}" rel="noopener">Publisher <span aria-hidden="true">↗</span></a>
        </p>
      </div>
    </article>
  </div>
</section>
