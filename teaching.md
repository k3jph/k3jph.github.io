---
id: 25
title: Teaching
date: 2013-12-03T22:20:25-05:00
author: James Howard
layout: page
guid: http://localhost/wp-faculty/?page_id=25
featured_image: /assets/img/teaching.webp
menu-order:     30
menu-label:     Teaching
stylesheet: /assets/css/teaching.css
---

<div class="teaching-introduction">

I teach mathematics and statistics by starting with the problem and working backward to the machinery. Getting the answer matters. Understanding why it works matters more. That means making the calculation visible, being candid about what a model assumes, and giving students enough computation to inspect the answer rather than merely admire it.

The same habit carries into research methods, public finance, and program management. There the problems arrive with institutional constraints already attached: budgets, evidence, stakeholders, and decisions that have to survive contact with the real world. A formula or framework is useful only if a student can tell when it applies and what it leaves out.

Much of this teaching has been online. That is not a classroom copied into a browser; it is a different medium requiring deliberate course design, clear feedback, and work students can actually do and explain at a distance.

</div>

<section class="teaching-current" aria-labelledby="current-teaching">
  <div class="container teaching-current-inner">
    <div class="teaching-current-title-area">
      <h2 id="current-teaching">Current Teaching</h2>
      <p>Active appointments and the courses I have taught in each.</p>
    </div>

    {% assign current_institutions = site.data.teaching.institutions | where: "current", true %}
    <div class="teaching-current-grid">
  {% for institution in current_institutions %}
    <article class="teaching-current-card">
      <header>
        <h3>{{ institution.name }}</h3>
        <p class="teaching-meta">{{ institution.years }}</p>
        {% if institution.id == "umgc" %}<p>Adjunct Professor, Mathematics and Statistics. University of Maryland Global Campus was formerly University of Maryland University College; older documents retain the name under which they were issued.</p>{% endif %}
        {% if institution.id == "cmu" %}<p>Adjunct Professor, Administration. Courses have included instruction through Central Michigan Global Campus at Joint Base Andrews in Maryland.</p>{% endif %}
      </header>
      <ul class="teaching-current-courses">
      {% for course in institution.courses %}
        <li><a href="#{{ institution.id }}-{{ course.code | slugify }}">{{ course.code }} — {{ course.title }}</a>{% if course.syllabi.size > 0 %}<span>{{ course.syllabi.size }} syllabus {% if course.syllabi.size == 1 %}PDF{% else %}PDFs{% endif %}</span>{% endif %}</li>
      {% endfor %}
      </ul>
    </article>
  {% endfor %}
    </div>
  </div>
</section>

<section class="teaching-section teaching-practice" aria-labelledby="teaching-practice">
  <h2 id="teaching-practice">Teaching in Practice</h2>

  <div class="teaching-practice-copy">
    <p>In a graduate financial-management course, students created a nonprofit organization from scratch. That required more than discussing budgets and accounting: they had to make the choices that make an organization financially viable, explain them, and live with the consequences of the numbers.</p>

    <p>In mathematics and statistics courses, I use examples from more than one field rather than pretending that the point of a method is the method itself. Probability, inference, financial mathematics, modeling, graphing, and optimization are all more intelligible when students can see what question each one answers. In research-methods courses, the same principle becomes the design of an actual inquiry: what evidence would be enough, what would it not establish, and what can an institution responsibly conclude?</p>
  </div>
</section>

<section class="teaching-history teaching-record" aria-labelledby="courses-taught">
  <h2 id="courses-taught">Courses Taught</h2>
  <p class="teaching-history-introduction">The record is organized by institution. A current appointment does not mean that every listed course is currently assigned; it means the course belongs to the documented teaching record at that institution.</p>

  {% for institution in site.data.teaching.institutions %}
  <section class="teaching-history-group teaching-institution" aria-labelledby="{{ institution.id }}-courses">
    <header>
      <h3 id="{{ institution.id }}-courses">{{ institution.name }}</h3>
      <p class="teaching-meta">{{ institution.years }}</p>
    </header>
    <div class="teaching-course-grid">
    {% for course in institution.courses %}
      <article class="teaching-course">
        <h4>{{ course.code }}</h4>
        <p class="teaching-course-title">{{ course.title }}</p>
        <p>{{ course.description }}</p>
        {% if course.syllabi.size > 0 %}<a class="teaching-archive-link" href="#{{ institution.id }}-{{ course.code | slugify }}">View syllabus archive <span aria-hidden="true">→</span></a>{% endif %}
      </article>
    {% endfor %}
    </div>
  </section>
  {% endfor %}
</section>


<section class="teaching-section teaching-scholarship" aria-labelledby="teaching-scholarship">
  <h2 id="teaching-scholarship">Teaching Scholarship</h2>

  <div class="teaching-scholarship-list">
    <p><strong><a href="/tlmo">Teaching and Learning Mathematics Online</a></strong> <span class="teaching-meta">(2nd ed., 2025; co-edited with John F. Beyers)</span> brings together work on teaching mathematics and statistics online as a designed instructional environment rather than a stack of uploaded files.</p>

    <p><strong><a href="https://doi.org/10.1080/0020739X.2021.1954251">Teaching STEM Online at the Tertiary Level During the COVID-19 Pandemic</a></strong> <span class="teaching-meta">(2023, with Mina Sedaghatjou and colleagues)</span>, <em>International Journal of Mathematical Education in Science and Technology</em>, examines the sudden redesign of tertiary STEM teaching when the classroom disappeared.</p>

    <p><strong><a href="/cmna">Computational Methods for Numerical Analysis with R</a></strong> <span class="teaching-meta">(2017)</span> is also teaching work in the useful sense: it makes approximation, error, and algorithmic choices inspectable through computation. The <a href="/scholarship">Scholarship</a> page carries the complete publication record.</p>
  </div>
</section>

<section class="teaching-section teaching-archive" aria-labelledby="syllabus-archive">
  <div class="container">
  <h2 id="syllabus-archive">Syllabus Archive</h2>
  <p class="teaching-section-intro">These PDFs are the documentary layer of the teaching record. They preserve courses, terms, instructional modes, and course design over time. Historical UMUC documents retain their original institutional name and filenames.</p>

  {% for institution in site.data.teaching.institutions %}
  <section class="teaching-archive-institution" aria-labelledby="{{ institution.id }}-archive">
    <h3 id="{{ institution.id }}-archive">{{ institution.name }}</h3>
    <div class="teaching-archive-list">
    {% for course in institution.courses %}
      <details id="{{ institution.id }}-{{ course.code | slugify }}" class="teaching-archive-course">
        <summary><span>{{ course.code }} — {{ course.title }}</span>{% if course.syllabi.size > 0 %}<small>{{ course.syllabi.size }} PDF{% if course.syllabi.size != 1 %}s{% endif %}</small>{% else %}<small>No public syllabus currently archived</small>{% endif %}</summary>
      {% if course.syllabi.size > 0 %}
        <ul>
        {% for syllabus in course.syllabi %}
          <li>{% if syllabus.file %}<a href="{{ syllabus.file | relative_url }}">{{ syllabus.label }} <span class="sr-only">(PDF)</span><span aria-hidden="true">→</span></a>{% else %}{{ syllabus.label }}{% endif %}</li>
        {% endfor %}
        </ul>
      {% endif %}
      </details>
    {% endfor %}
    </div>
  </section>
  {% endfor %}
  </div>
</section>

<p class="teaching-image-credit"><em>Image by <a href="https://www.flickr.com/photos/befuddledsenses/9379803665">Luke Jones</a>.</em></p>
