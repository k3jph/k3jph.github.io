---
title: Software
date: 2015-09-20T18:03:41-04:00
author: James Howard
layout: page
permalink: /software
featured_image: /assets/img/software-banner.webp
menu-order:     41
menu-label:     Software
stylesheet: /assets/css/software.css
---
<div class="software-introduction">

I have been writing software since Unix boxes were considerably more annoying.
Some of it solves real problems; some of it exists because I wanted to know
whether the idea would work. The distinction is often less tidy than it sounds.

</div>

<section class="section section-gray software-section software-current-section">
  <div class="container">
    <div class="title-area">
      <h2>Current Projects</h2>
      <div class="separator separator-info"><img src="{{ '/assets/img/identity/kamon-info.svg' | relative_url }}" height="35" alt="" /></div>
      <p class="description">Public work that is still being actively made and can be visited, used, or read now.</p>
    </div>
    <div class="row software-feature-grid">
      {% include software-projects.html projects=site.data.software.current presentation="featured" %}
    </div>
  </div>
</section>

<section class="section software-section software-research-section">
  <div class="container">
    <div class="title-area">
      <h2>Research Software</h2>
      <div class="separator separator-info"><img src="{{ '/assets/img/identity/kamon-info.svg' | relative_url }}" height="35" alt="" /></div>
      <p class="description">Published packages, book companions, and durable tools built to make technical work inspectable and reusable.</p>
    </div>
    <div class="software-project-list">
      {% include software-projects.html projects=site.data.software.maintained presentation="research" %}
    </div>
    <p class="software-scholarship-note">The scholarly citations for <code>phonics</code> live in <a href="{{ '/scholarship/' | relative_url }}">Selected Work</a>. This page is where the packages themselves live: what they do, where to find them, and why they were built.</p>
  </div>
</section>

<section class="section section-gray software-section software-archive-section">
  <div class="container">
    <div class="title-area">
      <h2>From the Archive</h2>
      <div class="separator separator-info"><img src="{{ '/assets/img/identity/kamon-info.svg' | relative_url }}" height="35" alt="" /></div>
      <p class="description">Older projects kept because finished work, failed experiments, and useful little programs have a history too.</p>
    </div>
    <div class="software-project-list">
      {% include software-projects.html projects=site.data.software.archive presentation="archive" %}
    </div>
    <p class="software-archive-note">I studied mathematics rather than computer science after arriving at Maryland, but I never stopped writing programs. The older work reflects a durable preference for small tools with clear jobs, a great deal of BSD and Unix influence, and the useful habit of keeping the code around after the immediate reason for it has passed.</p>
  </div>
</section>
