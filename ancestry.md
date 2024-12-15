---
id: ancestry
title: Ancestry
author: James Howard
layout: page
featured_image: /assets/img/ancestry.webp
guid: ancestry
redirect_from:
  - /hereditary-societies
  - /hs
  - /family
---

## Introduction

When the final history of the English language is written, the name Howard will
stand out as one of the most storied and legendary. This page is my attempt to
explore and understand how my family fits into that enduring legacy. Through
records of our ancestors, their contributions to history, and our ongoing
genealogical efforts, this page reflects our passion for connecting with our
roots and preserving the Howard family story for future generations.

As I have been learning more of the family history, it is not enough to
simply look at some website and see that some random king or countess
was an ancient progenitor.  Most of that information is incorrect.
However, there are standards for establishing genealogical truth and as
I connect another layer deeper, it often leads to eligibility for a new
hereditary society.  Joining, since verificaiton is required, provides a
great check.  Plus, I learn something and I get a prize.  The
gamification of historical research is now.

## Hereditary Societies

Many hereditary socities have associated medals.  This section provides a
[ribbon rack](https://en.wikipedia.org/wiki/Medal_ribbon) for those I am a
member of.

{% assign ribbons = site.data.hereditary_ribbons | where: "type","hereditary" | sort: "date" %}
{% assign remainder = ribbons.size | modulo: 3 %}
<div class="ribbonrack container mt-3 mb-4">
  {% if remainder != 0 %}
    <div class="row">
      <div class="col-md-12">
        <div class="row" style="display: flex; justify-content: center;">
          {% for ribbon in ribbons limit: remainder %}
          <div class="col-md-4 col-sm-4 col-xs-4 p-1px m-0 text-center" style="line-height: 0px;">
            <a href="{% if ribbon.url %}{{ ribbon.url | relative_url }}{% else %}#{{ ribbon.id }}{% endif %}" class="ribbon">
              <img src="{{ ribbon.img }}" alt="{{ ribbon.alt }}" title="{{ ribbon.alt }}" />
            </a>
          </div>
          {% endfor %}
        </div>
      </div>
    </div>
  {% endif %}

  <div class="row">
    {% assign counter = 0 %}
    {% for ribbon in ribbons offset: remainder %}
          <div class="col-md-4 col-sm-4 col-xs-4 p-1px m-0 text-center" style="line-height: 0px;">
            <a href="{% if ribbon.url %}{{ ribbon.url | relative_url }}{% else %}#{{ ribbon.id }}{% endif %}" class="ribbon">
              <img src="{{ ribbon.img }}" alt="{{ ribbon.alt }}" title="{{ ribbon.alt }}" />
            </a>
          </div>
      {% assign counter = counter | plus: 1 %}
      {% if counter == 3 %}
        </div><div class="row">
        {% assign counter = 0 %}
      {% endif %}
    {% endfor %}
  </div>
</div>

Some socities only provide miniature medals, comparable to the miniature
medals worn on the military's dinner dress uniforms.  I have included
those separately below.

{% assign ribbons = site.data.hereditary_ribbons | where: "type","hereditary-mini" | sort: "date" %}
{% assign remainder = ribbons.size | modulo: 6 %}
<div class="ribbonrack container mt-3 mb-4">
  {% if remainder != 0 %}
    <div class="row">
      <div class="col-md-12">
        <div class="row" style="display: flex; justify-content: center;">
          {% for ribbon in ribbons limit: remainder %}
          <div class="col-md-2 col-sm-2 col-xs-2 p-1px m-0 text-center" style="line-height: 0px;">
            <a href="{% if ribbon.url %}{{ ribbon.url | relative_url }}{% else %}#{{ ribbon.id }}{% endif %}" class="ribbon">
              <img src="{{ ribbon.img }}" alt="{{ ribbon.alt }}" title="{{ ribbon.alt }}" />
            </a>
          </div>
          {% endfor %}
        </div>
      </div>
    </div>
  {% endif %}

  <div class="row">
    {% assign counter = 0 %}
    {% for ribbon in ribbons offset: remainder %}
          <div class="col-md-2 col-sm-2 col-xs-2 p-1px m-0 text-center" style="line-height: 0px;">
            <a href="{% if ribbon.url %}{{ ribbon.url | relative_url }}{% else %}#{{ ribbon.id }}{% endif %}" class="ribbon">
              <img src="{{ ribbon.img }}" alt="{{ ribbon.alt }}" title="{{ ribbon.alt }}" />
            </a>
          </div>
      {% assign counter = counter | plus: 1 %}
      {% if counter == 6 %}
        </div><div class="row">
        {% assign counter = 0 %}
      {% endif %}
    {% endfor %}
  </div>
</div>

The propensity of hereditary societies to use solid red ribbons may make
this difficult.

### Precedence Among Hereditary Societies

Precedence among hereditary societies is traditionally based on the
order of their founding. Therefore, the memberships above are presented
according to this historical order, highlighting the legacy and heritage
of each organization.

## Complete Hereditary Society Memberships List

The table below lists lineage society memberships associated with the Howard
family.

<div id="societies-table" class="table-responsive">
  <div>
    <table class="table align-items-center">
      <thead class="thead-light">
        <tr>
          <th scope="col" width="45%">Society</th>
          <th scope="col" width="40%"><span style="font-style: italic;">Jure</span></th>
          <th scope="col" width="15%" class="text-center">Member Number</th>
        </tr>
      </thead>
      <tbody class="list">
        {% assign societies = site.ancestry | sort: 'title' %}
        {% for society in societies %}
        <tr>
          <th scope="row">
            <div class="align-items-center table-element">
                <span class="name mb-0 text-sm">
                  <a href="{{ society.permalink | relative_url }}">{{ society.title }}</a>
                </span>
            </div>
          </th>
          <th scope="row">
            <div class="align-items-center table-element">
                <span class="name mb-0 text-sm">
                  {% if society.qualifying_ancestors %}
                      {% for ancestor in society.qualifying_ancestors %}
                        {{ ancestor }}<br/>
                      {% endfor %}
                  {% else %}
                    N/A
                  {% endif %}
                </span>
            </div>
          </th>
          <th scope="row">
            <div class="align-items-center table-element text-center">
                <span class="date mb-0 text-sm">
                  {% if society.member_number %}
                    {{ society.member_number }}
                  {% endif %}
                </span>
            </div>
          </th>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
</div>

