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

## Lineage Societies

<!-- Make img at http://www.ultimaterack.ajandj.com/index.php/ribbon-creator -->
<div class="ribbonrack">
<div class="ribbonbar">
<a href="/family/hcgs/sbhc" class="ribbon ribbon-left"><img src="/assets/img/ribbons/hereditary/HCGS-SBHC.svg"
    alt="Settlers and Builders of Hamilton County"
    title="Settlers and Builders of Hamilton County" /></a>
<a href="/family/ogs/cfo" class="ribbon ribbon-center"><img src="/assets/img/ribbons/hereditary/OGS-CFO.svg"
    alt="Century Families of Ohio"
    title="Century Families of Ohio" /></a>
<a href="/family/hcgs/cfhc" class="ribbon ribbon-right"><img src="/assets/img/ribbons/hereditary/HCGS-CFHC.svg"
    alt="Century Families of Hamilton County" 
    title="Century Families of Hamilton County" /></a></div>
</div>

### Precedence Among Hereditary Societies

Precedence among hereditary societies is traditionally based on the
order of their founding. Therefore, the memberships above are presented
according to this historical order, highlighting the legacy and heritage
of each organization.

## Lineage Society Memberships

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

