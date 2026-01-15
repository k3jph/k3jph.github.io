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
stand out as one of the most storied and enduring. It appears not only in
politics, literature, and law, but repeatedly in the documentary record of
Britain and early English America alike, attached to families whose lives were
recorded in court rolls, parish registers, town books, church records, and land
patents on both sides of the Atlantic.

This section documents my work in historical genealogy, with a particular focus
on lineages that can be demonstrated through primary and well-established
secondary sources. The pages collected here are not intended as a comprehensive
family tree, but as case studies in documented descent, each centered on a
specific ancestor, place, or historical context.

The material spans several major colonial regions and settlement systems.
Britain, New England towns, the Chesapeake colonies, Pennsylvania and the
Delaware Valley, and the Carolinas all appear repeatedly, often connected
through migration rather than treated as isolated origins. Massachusetts,
Maryland, Pennsylvania, and North Carolina surface here for the same reason:
each produced unusually strong documentary records that allow individual lives
to be traced across generations and across regions.

Most entries are organized around membership in hereditary or lineage societies,
not as an end in themselves, but because those applications require a
disciplined evidentiary standard. As a result, each page brings together land
records, probate materials, church or meeting records, migration patterns, and
family relationships in a way that reflects how these individuals actually
appear in the historical record, including ambiguity and uncertainty where it
exists.

Taken together, these profiles trace a multi-generational movement within the
English-speaking world, from British origins through colonial settlements and
into interior frontiers and later states. They highlight ordinary lives lived in
extraordinary circumstances, settlement, craft, landholding, migration, military
service, and, at times, moral contradiction. Where possible, original documents
are reproduced or cited directly, allowing the reader to see the same evidence
on which the conclusions rest.

This is an ongoing project. New material is added as research is completed and
memberships are approved, and existing pages may be revised as better sources
come to light. The aim throughout is clarity, transparency, and fidelity to the
historical record, rather than genealogical mythmaking or ornamental narrative.

## Hereditary Society Memberships

This section lists my memberships in lineage and hereditary societies that
recognize documented descent from individuals who meet defined historical
criteria. These organizations are structured as continuing membership bodies,
with formal governance and an ongoing institutional life. Admission requires
substantial genealogical proof, typically reviewed against established
standards, and situates each lineage within a broader historical and regional
context.

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
        {% assign societies = site.ancestry | where: "class", "lineage" | sort: 'title' %}
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

## Heritage Certificate Programs

This section includes place-based programs that acknowledge proven descent from
early residents of a particular town, county, or region. These recognitions are
typically certificate-based and focus on documenting long-term presence or early
settlement within a defined locality. While they often require rigorous
genealogical documentation, their purpose is to record and commemorate
rootedness in a place rather than to constitute a continuing membership society.

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
        {% assign societies = site.ancestry | where: "class", "certificate" | sort: 'title' %}
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

## Family Association Memberships

This section documents participation in family associations organized around a
shared progenitor or surname. Unlike lineage societies, these groups are
centered on collective research, preservation, and collaboration among
descendants rather than adjudicating historical qualification. Their value lies
in the accumulation and sharing of family-specific knowledge, sources, and
narrative across generations.

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
        {% assign societies = site.ancestry | where: "class", "family" | sort: 'title' %}
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
