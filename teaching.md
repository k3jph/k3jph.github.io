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
---

I teach mathematics and statistics by starting with the problem and working backward to the machinery. Getting the answer matters. Understanding why it works matters more. That means making the calculation visible, being candid about what a model assumes, and giving students enough computation to inspect the answer rather than merely admire it.

The same habit carries into research methods, public finance, and program management. There the problems arrive with institutional constraints already attached: budgets, evidence, stakeholders, and decisions that have to survive contact with the real world. A formula or framework is useful only if a student can tell when it applies and what it leaves out.

Much of this teaching has been online. That is not a classroom copied into a browser; it is a different medium requiring deliberate course design, clear feedback, and work students can actually do and explain at a distance. The record below is the evidence: courses, assignments, scholarship, and the syllabi themselves.

## Current Teaching

{% assign current_institutions = site.data.teaching.institutions | where: "current", true %}
{% for institution in current_institutions %}
### {{ institution.name }}

**{{ institution.years }}**  
{% if institution.id == "umgc" %}Adjunct Professor, Mathematics and Statistics. University of Maryland Global Campus was formerly University of Maryland University College; older documents retain the name under which they were issued.{% endif %}
{% if institution.id == "cmu" %}Adjunct Professor, Administration. Courses have included instruction through Central Michigan Global Campus at Joint Base Andrews in Maryland.{% endif %}

{% for course in institution.courses %}
**{{ course.code }} — {{ course.title }}.** {{ course.description }}{% if course.syllabi.size > 0 %} [{{ course.syllabi.size }} syllabus{% if course.syllabi.size != 1 %} PDFs{% else %} PDF{% endif %}](#{{ institution.id }}-{{ course.code | slugify }}).{% endif %}

{% endfor %}
{% endfor %}

## Teaching in Practice

In a graduate financial-management course, students created a nonprofit organization from scratch. That required more than discussing budgets and accounting: they had to make the choices that make an organization financially viable, explain them, and live with the consequences of the numbers.

In mathematics and statistics courses, I use examples from more than one field rather than pretending that the point of a method is the method itself. Probability, inference, financial mathematics, modeling, graphing, and optimization are all more intelligible when students can see what question each one answers. In research-methods courses, the same principle becomes the design of an actual inquiry: what evidence would be enough, what would it not establish, and what can an institution responsibly conclude?

## Courses Taught

The course record is organized by institution. A current appointment does not mean that every listed course is currently assigned; it means the course belongs to the documented teaching record at that institution.

{% for institution in site.data.teaching.institutions %}
### {{ institution.name }}

_{{ institution.years }}_

{% for course in institution.courses %}
#### {{ course.code }} — {{ course.title }}

{{ course.description }}

{% endfor %}
{% endfor %}

## Past Academic Appointments

The following appointments are historical rather than current: University of New Mexico, where I taught public-administration research methods from 2022 to 2024; Baruch College's Marxe School of Public and International Affairs; Pennsylvania State University; and the University of Baltimore. Their courses and syllabi remain below because they are part of the record, not because the appointments continue.

## Teaching Scholarship

**[Teaching and Learning Mathematics Online](/tlmo)** (2nd ed., 2025; co-edited with John F. Beyers) brings together work on teaching mathematics and statistics online as a designed instructional environment rather than a stack of uploaded files.

**[Teaching STEM Online at the Tertiary Level During the COVID-19 Pandemic](https://doi.org/10.1080/0020739X.2021.1954251)** (2023, with Mina Sedaghatjou and colleagues), _International Journal of Mathematical Education in Science and Technology_, examines the sudden redesign of tertiary STEM teaching when the classroom disappeared.

**[Computational Methods for Numerical Analysis with R](/cmna)** (2017) is also teaching work in the useful sense: it makes approximation, error, and algorithmic choices inspectable through computation. The [Scholarship](/scholarship) page carries the complete publication record.

## Syllabus Archive

These PDFs are the documentary layer of the teaching record. They preserve courses, terms, instructional modes, and course design over time. Historical UMUC documents retain their original institutional name and filenames. New syllabi can be added by placing the PDF in `/assets/docs/` and adding one record to `_data/teaching.yml`.

{% for institution in site.data.teaching.institutions %}
### {{ institution.name }}

{% for course in institution.courses %}
<details id="{{ institution.id }}-{{ course.code | slugify }}">
  <summary><strong>{{ course.code }} — {{ course.title }}</strong>{% if course.syllabi.size > 0 %} · {{ course.syllabi.size }} PDF{% if course.syllabi.size != 1 %}s{% endif %}{% else %} · no public syllabus currently archived{% endif %}</summary>
{% if course.syllabi.size > 0 %}
  <ul>
{% for syllabus in course.syllabi %}
    <li>{% if syllabus.file %}<a href="{{ syllabus.file | relative_url }}">{{ syllabus.label }} (PDF)</a>{% else %}{{ syllabus.label }}{% endif %}</li>
{% endfor %}
  </ul>
{% endif %}
</details>

{% endfor %}
{% endfor %}

_Image by [Luke Jones](https://www.flickr.com/photos/befuddledsenses/9379803665)._
