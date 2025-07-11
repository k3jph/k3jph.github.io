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
        {% if society.chapters %}
          {% assign sorted_chapters = society.chapters | sort: 'name' %}
          {% for chapter in sorted_chapters %}
          <tr>
            <th scope="row" colspan="2" class="pl-5">
              <div class="align-items-center table-element">
                <span class="name mb-0 text-sm">
                  {{ chapter.name }}
                </span>
              </div>
            </th>
            <th scope="row">
              <div class="align-items-center table-element text-center">
                <span class="date mb-0 text-sm">
                  {{ chapter.member_number }}
                </span>
              </div>
            </th>
          </tr>
          {% endfor %}
        {% endif %}
        {% endfor %}
      </tbody>
    </table>
  </div>
</div>

