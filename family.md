---
id: family
title: Family
author: James Howard
layout: page
featured_image: /assets/img/family.webp
guid: family
redirect_from:
  - /hereditary-societies
  - /hs
---

## Introduction

When the final history of the English language is written, the name Howard will
stand out as one of the most storied and legendary. This page is my attempt to
explore and understand how my family fits into that enduring legacy. Through
records of our ancestors, their contributions to history, and our ongoing
genealogical efforts, this page reflects our passion for connecting with our
roots and preserving the Howard family story for future generations.

As I have been learning more of the family history, it is not enough to simply
look at some website and see that some random king or countess was an ancient
progenitor.  Most of that information is incorrect.  However, there are
standards for establishing genealogical truth and as I connect another layer
deeper, it often leads to eligibility for a new hereditary society.  Joining,
since verificaiton is required, provides a great check.  Plus, I learn something
and I get a prize.  The gamification of historical research is now.

## Hereditary Societies

Many hereditary socities have associated medals.  This section provides a
[ribbon rack](https://en.wikipedia.org/wiki/Medal_ribbon) for those I am a
member of.

{% assign ribbons = site.data.hereditary_ribbons | where: "type","hereditary" %}
{% assign remainder = ribbons.size | modulo: 3 %}
<div class="ribbonrack container mt-3 mb-5">
  {% if remainder != 0 %}
    <div class="row g-1 justify-content-center">
      {% if remainder == 1 %}
        <div class="col-4 col-md-4 d-flex justify-content-center p-1px m-0"></div>
      {% else if %}
        <div class="col-2 col-md-2 d-flex justify-content-center p-1px m-0"></div>
      {% endif %}
      {% for ribbon in ribbons limit: remainder %}
        <div class="col-4 col-md-4 d-flex justify-content-center p-1px m-0">
          <a href="{% if ribbon.url %}{{ ribbon.url | relative_url}}{% else %}#{{ ribbon.id }}{% endif %}" class="ribbon p-0">
            <img src="{{ ribbon.img }}" alt="{{ ribbon.alt }}" />
          </a>
        </div>
      {% endfor %}
    </div>
  {% endif %}

  <div class="row g-1">
    {% for ribbon in ribbons offset: remainder %}
      <div class="col-4 col-md-4 d-flex justify-content-center p-1px m-0">
        <a href="{% if ribbon.url %}{{ ribbon.url | relative_url}}{% else %}#{{ ribbon.id }}{% endif %}" class="ribbon p-0">
          <img src="{{ ribbon.img }}" alt="{{ ribbon.alt }}" />
        </a>
      </div>
      {% assign indexmod = forloop.index | modulo: 3 %}
      {% if indexmod == 0 %}
        </div><div class="row g-1">
      {% endif %}
    {% endfor %}
  </div>
</div>

### Precedence Among Hereditary Societies

Precedence among hereditary societies is traditionally based on the
order of their founding. Therefore, the memberships above are presented
according to this historical order, highlighting the legacy and heritage
of each organization.

## Complete Hereditary Society Memberships List

The table below lists lineage society memberships associated with the Howard
family.

<div class="table-responsive">
  <div>
    <table class="table align-items-center">
      <thead class="thead-light">
        <tr>
          <th scope="col" width="45%">Society</th>
          <th scope="col">Principal Qualifying Ancestor</th>
          <th scope="col">Founding Date</th>
        </tr>
      </thead>
      <tbody class="list">
        {% assign societies = site.family | sort: 'title' %}
        {% for society in societies %}
        <tr>
          <th scope="row">
            <div class="align-items-center table-element">
              <div class="media-body">
                <span class="name mb-0 text-sm">
                  <a href="{{ society.permalink | relative_url }}">{{ society.title }}</a>
                </span>
              </div>
            </div>
          </th>
          <th scope="row">
            <div class="align-items-center table-element">
              <div class="media-body">
                <span class="name mb-0 text-sm">
                  {% if society.qualifying_ancestor %}
                    {{ society.qualifying_ancestor }}
                  {% else %}
                    N/A
                  {% endif %}
                </span>
              </div>
            </div>
          </th>
          <th scope="row">
            <div class="align-items-center table-element">
              <div class="media-body">
                <span class="date mb-0 text-sm">
                  {% if society.founding_date %}
                    {{ society.founding_date | date: '%b %d, %Y' }}
                  {% endif %}
                </span>
              </div>
            </div>
          </th>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
</div>

Above, if I am unable to locate an exact day for founding, but a year or even
year and month are available, the founding date is selected to be the last day
of that year or month.  If anyone has corrections, you [should contact
me](/contact-me) with more information.
