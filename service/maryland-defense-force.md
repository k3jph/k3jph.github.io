---
id: maryland-defense-force
title: Maryland Defense Force
author: James Howard
layout: page
permalink: /service/maryland-defense-force
redirect_from:
  - /mddf/
  - /service/mddf/
stylesheet: /assets/css/mddf.css
---

{% include figure.html image="ribbons/mddf/MDDF-DUI.svg" placement="right" width="30%"
cap="The Maryland Defense Force's distinctive unit insignia"
alt="The Maryland Defense Force's distinctive unit insignia" %}

The [Maryland Defense Force (MDDF)](https://military.maryland.gov/mddf/Pages/default.aspx) is Maryland's volunteer uniformed state military agency. It provides professional, technical, and military support to the Maryland Army National Guard, Maryland Air National Guard, and Maryland Department of Emergency Management.

I have served as a Captain in the MDDF since 2013. This page is the public documentary record of that service: operations, policy work, qualifications, and awards. The institutional history comes later, where it belongs.

<nav class="mddf-toc" aria-label="On this page">
  <a href="#my-service">My Service</a>
  <a href="#operations">Operations</a>
  <a href="#policy-work">Policy Work</a>
  <a href="#qualifications">Qualifications</a>
  <a href="#awards-and-decorations">Awards</a>
  <a href="#about-the-maryland-defense-force">About the MDDF</a>
</nav>

## My Service

**Captain, Maryland Defense Force · 2013–Present**

My MDDF work joins operations with institutional design. I have led operational teams during statewide COVID-19 vaccination activity; written policies governing promotion, hazardous materials, professional writing, training, and operational standards; and worked in the part of public service where a plan has to survive implementation.


### Dates of Rank {#DatesOfRank}

<table class="table">
  <thead>
    <tr>
      <th>Rank</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Captain</td>
      <td>September 16, 2013</td>
    </tr>
    <tr>
      <td>First Lieutenant</td>
      <td>June 20, 2011</td>
    </tr>
    <tr>
      <td>Second Lieutenant</td>
      <td>November 21, 2006</td>
    </tr>
  </tbody>
</table>

### My Commission {#MyCommission}

{% include figure.html width="12"
   image="/service/jhoward-mddf-commission.webp" 
   alt="Commission in the Maryland Defense Force"
   cap="Commission in the Maryland Defense Force" %}

Or you can [download the PDF here](/assets/img/service/jhoward-mddf-commission.pdf).



## Operations

### Statewide COVID-19 Vaccination Operations

During **Operation Steadfast Guardian**—March 15 through June 21, 2020—I served on State Active Duty supporting Maryland's COVID-19 response. The record includes a Maryland Defense Force Commendation Ribbon and Maryland Emergency Service Ribbon for that activation.

In **Operation Steadfast Guardian II**, I supported the Maryland National Guard Medical Detachment's statewide vaccination work, including Task Force Equity. From January through June 2021, MDDF support to those clinics resulted in **8,285 vaccinations**. That is the operation's documented result, not a claim that I personally administered 8,285 shots.

## Policy and Institutional Work {#policy-work}

Much of the durable work is less visible than an activation. I have authored publicly describable MDDF policy in five related areas:

- promotion;
- hazardous materials;
- professional writing;
- training; and
- operational standards.

The point was not to produce paperwork for its own sake. It was to make expectations, responsibilities, and operating practice intelligible enough to use when the organization needed them.

## Qualifications

<div class="badgerack">
<div class="ribbonbar">
<a href="#smems" class="ribbon ribbon-center">
<img src="/assets/img/ribbons/mddf/SMEMS-Flash.svg"
    alt="Senior Military Emergency Management Specialist flash" /></a>
</div>
</div>

### Senior Military Emergency Management Specialist {#smems}

I hold the **Senior Military Emergency Management Specialist** qualification from the [State Guard Association of the United States](https://sgaus.org/). It follows the Basic MEMS qualification and recognizes advanced emergency-management preparation for planning and leading increasingly complex incident-response work.

The blue MEMS flash records activation or mobilization for a disaster, declared emergency, or major event requiring use of the Incident Command System.

**Awarded September 10, 2023:** Senior Military Emergency Management Specialist with MEMS flash.

**Awarded March 3, 2021:** Basic Military Emergency Management Specialist.

## Awards and Decorations

The ribbons below are the documentary index to the record. They remain grouped by the kind of recognition rather than being treated as one undifferentiated rack.

### Personal Awards

{% assign ribbons = site.data.mddf_ribbons | where: "type","personal" %}
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

#### The Adjutant General's Special Recognition Ribbon {#TAGSRR}

The Adjutant General's Special Recognition Ribbon is awarded to
recognize an agency, organization, or entity that is not a numbered
or lettered unit for exceptional service or achievement to the
Maryland Military Department in support of its Service Members and 
the mission.

**Awarded: October 13, 2020**

> For outstanding unit performance in support of the COVID-19 response.

#### Maryland Emergency Service Ribbon {#MDESR}

The Maryland Emergency Service Ribbon is awarded for being mobilized
by the Governor of Maryland to support a declared state emergency,
or mobilized under Title 32 USC to support a domestic emergency or
crisis such as a natural disaster or civil unrest.

**Awarded: September 12, 2020**

>  Operation Steadfast Guardian--March 15, 2020 to June 21, 2020

#### State of Maryland State Service Medal {#MDSVCR}

The State of Maryland State Service Medal is awarded to Maryland
Military Department service members who have completed five good
continuous years of faithful, honorable, and efficient service to
the State of Maryland as a member of the Maryland Army National
Guard, Maryland Air National Guard, or Maryland Defense Force.

The addition of two bronze botonees is for fifteen years of service.

#### Maryland Defense Force Meritorious Service Ribbon {#MDDFMSR}

The Maryland Defense Force Meritorious Service Ribbon is the highest
MDDF award and is presented to any active member of the MDDF who
distinguished him/herself by extraordinary distinguished service
or through sustained and extraordinary service or achievement beyond
the normal call of duty to the Maryland Defense Force, Maryland
Military Department, or State of Maryland in a duty of great
responsibility.

**Awarded: November 4, 2021**

> For sustained meritorious service in support of the Maryland National
> Guard Medical Detachment's statewide COVID-19 vaccination efforts to
> include supporting Task Force Equity.  The MDDF's support of the
> vaccination clinics from January to June 2021 resulted in 8285 shots
> being given during Operation Steadfast Guardian II.

#### Maryland Defense Force Commendation Ribbon {#MDDFCR}

Recognition of outstanding acts of achievement or service that has
clearly placed the individual far above their peer or superior
service which results in achievement of a specific project, complex
tasks, or period of sustained service which clearly warrants
recognition of the individual's achievement.

**Awarded: September 9, 2020**

> For service, while on State Active Duty, in support of Operation Steadfast
> Guardian during the period of March 15, 2020, to June 21, 2020.

#### Maryland Defense Force Humanitarian Service Ribbon {#MDDFHSR}

The Maryland Defense Force Humanitarian Service Ribbon is presented to
any active member of the MDDF who, while under orders and in the opinion
of the MDDF Commanding General, greatly distinguishes themselves by
meritorious service in direct participation in any significant military
act or operation of a humanitarian nature as approved by the Maryland
Military Department.

**Awarded: November 28, 2021**

> For supporting the MDDF's participation in Operation Steadfast Guardian II.

#### Maryland Defense Force Aid to Civil Authority Ribbon {#MDDFACAR}

The Maryland Defense Force Aid to Civil Authority Ribbon is awarded to MDDF
members for being mobilized by the Commanding General, MDDF, to support a
domestic emergency, crisis, or other missions as deemed appropriate.

**Awarded: November 28, 2021**

> For supporting the MDDF's participation in Operation Steadfast Guardian II.

#### Maryland Defense Force Community Emergency Response Team Ribbon {#MDDFCERTR}

The Maryland Defense Force Community Emergency Response Team Ribbon
will be awarded upon a MDDF member's successful completion of an
accredited local, state, or federal government sponsored CERT
training program. The CERT course or program must also be certified
by the MDDF-D5/7.

#### Maryland Defense Force Professional Development Ribbon {#MDDFPDR}

The Maryland Defense Force Professional Development Ribbon is awarded
to encourage professional growth within the Maryland Defense Force.
Awarding of this ribbon will be based on five completed courses
within a member's MDDF specialty and/or the core mission of the
Maryland Defense Force.

I have received this award three times.

#### Maryland Defense Force Basic Training Ribbon {#MDDFBTR}

The Maryland Defense Force Basic Training Ribbon is awarded to
recognize the successful completion of the approved MDDF Basic
Training curriculum as set forth by the MDDF-G3.

To call the training curriculum "Basic Training" is not fair, as
it only involved some light reading and passing a few written tests.
You could do this in an afternoon, and I think I did.  In 2010, the
entire curriculum was revised into a more involved process called
"Initial Entry Training" (IET) and this ribbon was superseded with
one for the new IET process.

#### State Guard Association of United States Professional Development Award {#SGAUSPDA}

The State Guard Association of United States Professional Development
Award is awarded to active SGAUS members who complete certain
training through the organization.  The first award is for completing
the SGAUS Officer Basic Course and the second is for completing the
SGAUS Officer Advanced Course.

This medal is awarded by the State Guard Association of the
United States and is authorized for wear by MDDF members.

### Unit Awards

{% assign ribbons = site.data.mddf_ribbons | where: "type","unit" %}
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

#### State Guard Association of United States Superior Unit Citation {#SGAUSSUC}

The Superior Unit Citation may be awarded to SGAUS members in a
state guard/defense force unit that performed outstanding service
in response to a riot, natural or manmade disasters, and emergencies
to a degree beyond that normally expected, either for a sustained
period or in a specific set circumstance. The Superior Unit Citation
is given to foster unit esprit-de-corps by recognizing those units
that demonstrated outstanding performance in support of the mission
of SGAUS and the state guard/defense force.

The Superior Unit Citation is awarded by the State Guard Association of the
United States and is authorized for wear by MDDF members.

**Awarded: September 15, 2021**

> The soldiers of the Maryland Defense Force have distinguished
themselves as a force multiplier in support of the Maryland National
Guard's Operation Steadfast Guardian. While on state active duty
from March 2020 to June 2020, the soldiers of the Maryland Defense
Force provided critical support in the fight against the coronavirus
pandemic completing all assigned tasks with efficiency and
professionalism. Their selfless service and commitment to their
motto "Ready when called" is indeed keeping with the finest traditions
of the Maryland Defense Force and the Maryland Military Department.

## Other Awards

{% assign ribbons = site.data.mddf_ribbons | where: "type","unofficial" %}
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

#### President's Volunteer Service Award {#PVSA}

The President's Volunteer Service Award (PVSA) is a notable honor
that celebrates individuals who have made remarkable contributions
through volunteer service within their communities and beyond. Since
its establishment in 2003, the PVSA has recognized the exceptional
efforts of individuals who have dedicated their time and energy to
selflessly serve others. Through the PVSA, recipients are commended
for their significant commitment and the number of hours they have
devoted to various volunteer activities. The award is divided into
different levels - bronze, silver, gold, and the prestigious
President's Lifetime Achievement Award - reflecting the recipients'
outstanding contributions and their impact on improving lives and
communities.  The PVSA serves as a meaningful recognition of these
individuals' dedication to creating a positive difference in the
world.

The award is administered by the [Corporation for National and
Community Service (CNCS)](https://americorps.gov/) in collaboration
with [Points of Light](https://www.pointsoflight.org/), an organization
devoted to promoting and acknowledging volunteerism.  It is not
authorized for wear by MDDF members.

**Awarded: April 9, 2022**

>  For calendar year 2021, bronze

#### Schweizerischer Zweitagemarsch {#CHZTM1}

The [Schweizerischer Zweitagemarsch](https://2tama.ch/), 
also known as the Swiss Two Day
March, is a renowned non-competitive walking event held annually
in Switzerland. This event, taking place over two days, invites
participants of all ages and fitness levels to embark on an
invigorating journey through the picturesque Swiss countryside. The
walk is divided into several routes of different distances, allowing
walkers to choose a challenge that fits their abilities and endurance
levels. In essence, the event is not just about walking but is a
celebration of the stunning Swiss landscapes, fostering a spirit
of camaraderie, and promoting a healthy, active lifestyle. The
Schweizerischer Zweitagemarsch embodies the joy of movement and the
unity of diverse people under the shared love for nature and walking,
making it a much-anticipated event in the Swiss annual calendar.

The Schweizerischer Zweitagemarsch Medal is awarded for particpating,
with a silver helmet for the first award.  In 2023, Chase, Ducky, and
I joined up and walked with the event.

The medal is awarded by Der Verein Schweizerischer Zweitagemarsch 
and is not authorized for wear by MDDF members.


## About the Maryland Defense Force

The modern MDDF is part of Maryland's Military Department and one of its four pillars. Its stated role is to provide supplemental professional, technical, and military support to the Maryland Army National Guard, Maryland Air National Guard, and Maryland Department of Emergency Management.

Maryland law establishes the MDDF as a military force within the State's organized militia. It also provides for State Active Duty when the Governor calls the militia in response to a public crisis, disaster, or other legally specified circumstance. Those are the institutional facts relevant to my service record.

The earlier Maryland State Guard and state-defense-force history is real and worth documenting carefully, but the old page's broad chronology and claims about its organization were not sufficiently supported by the sources available for this revision. I have removed them rather than convert them into confident-looking folklore.


{% include relatedposts.html tag="Maryland Defense Force" %}
