---
id: maryland-defense-force
title: Maryland Defense Force
author: James Howard
layout: page
permalink: /service/maryland-defense-force
redirect_from:
  - /mddf/
  - /service/mddf/
---

{% include figure.html image="ribbons/mddf/MDDF-DUI.svg" placement="right" width="30%"
cap="The Maryland Defense Force's distinctive unit insignia"
alt="The Maryland Defense Force's distinctive unit insignia" %}

As a captain in the [Maryland Defense Force
(MDDF)](https://military.maryland.gov/mddf/Pages/default.aspx), I
am proud to serve as a member of this highly trained and dedicated
agency. The MDDF is a volunteer military organization that serves
as a complement to the Maryland National Guard, providing critical
support to the state's emergency response efforts. With a focus on
disaster relief and other emergency services, the MDDF is a vital
part of Maryland's emergency response capabilities.

As a member of the MDDF, I have had the opportunity to work alongside
other highly skilled and motivated individuals from a wide range
of backgrounds. The MDDF is organized into several units, each with
its own unique mission and focus. These units include medical and
engineering, among others, each playing a critical role in supporting
Maryland's emergency response efforts.

I have had the opportunity to lead and manage teams of volunteers
in a variety of settings, from disaster response to training
exercises. I have gained invaluable experience in coordinating and
collaborating with other emergency response organizations and
agencies, including the Maryland National Guard and the Federal
Emergency Management Agency (FEMA).

Overall, my experience in the MDDF has been incredibly rewarding
and fulfilling. It has provided me with the opportunity to serve
my community and my state in a meaningful way, while also developing
important skills and knowledge that I can apply in both my personal
and professional life.

The following is a brief overview of my experience and
accomplishments with the MDDF, as well as the MDDF itself.

## History of the Maryland Defense Force

The traces its origins to the early
20th century, playing a pivotal role in state defense and emergency
response. Initially established on October 23, 1917, as the Maryland
State Guard, its creation was a direct response to World War I,
aimed at assuming the duties of the National Guard when federalized.
The primary mission of this early incarnation was to provide homeland
security, protect critical infrastructure, and maintain public order
during a tumultuous period.

{% include figure.html image="ribbons/mddf/MDDF-SSI.svg" placement="right" width="30%"
cap="The Maryland Defense Force's shoulder sleeve insignia"
alt="The Maryland Defense Force's shoulder sleeve insignia" %}

Following World War I, the Maryland State Guard was disbanded, but
the concept of a state defense force persisted. It wasn't until
World War II that the need for a state-level military force became
apparent again. Reactivated as the Maryland State Guard Reserve,
the MDDF's focus shifted to defending the state against potential
threats and assisting in civil defense efforts. This period saw the
MDDF involved in a range of activities, from patrolling vital
infrastructure to providing support during blackouts and other
wartime emergencies.

Post-World War II, the MDDF underwent several transformations. In
1983, the Maryland Defense Force was officially reestablished in
its modern form. This reactivation was part of a broader national
trend recognizing the importance of state defense forces in
supplementing the National Guard and providing critical support
during emergencies. The MDDF was tasked with a broader mandate,
including disaster response, search and rescue operations, and
support for public health emergencies.

The MDDF's structure reflects its diverse mission. Organized into
specialized units such as medical, engineering, and cyber defense,
the MDDF leverages the professional skills of its volunteer members
to address specific needs during emergencies. This modular structure
allows for rapid deployment and effective coordination with other
state and federal agencies. For example, the MDDF's Medical Unit
has been crucial in providing medical support during large-scale
public health crises, while the Engineering Unit has assisted in
infrastructure assessment and repair following natural disasters.

One significant milestone in the MDDF's history was its response
to the September 11, 2001, terrorist attacks. The MDDF was mobilized
to provide security at critical sites and assist in the overall
state response to the heightened security threats. This period
underscored the importance of the MDDF's role in homeland security
and emergency preparedness.

In recent years, the MDDF has been at the forefront of responding
to natural disasters and public health emergencies. Notably, during
the COVID-19 pandemic, the MDDF played a crucial role in supporting
vaccination efforts and other public health initiatives. The force's
ability to mobilize quickly and work in conjunction with the Maryland
National Guard and other agencies has been a testament to its
training, dedication, and organizational efficiency.

Today, the Maryland Defense Force remains an integral part of
Maryland's emergency response framework. Its members, driven by a
strong sense of duty and community service, continue to uphold the
MDDF's legacy of readiness and resilience. The force's history is
marked by a commitment to protecting and serving the citizens of
Maryland, adapting to new challenges, and maintaining a steadfast
presence in times of need.

## Skill Badges

<div class="badgerack">
<div class="ribbonbar">
<a href="#SMEMS" class="ribbon ribbon-center">
<img src="/assets/img/ribbons/mddf/SMEMS-Flash.svg"
    alt="Senior Military Emergency Management Specialist" /></a>
</div>
</div>

### <a id='SMEMS' />Senior Military Emergency Management Specialist

Members of the U.S. uniformed services and state guards increasingly
have been mobilized to respond to natural and man-made disasters
and other emergencies. Military and civilian authorities now see
an urgent need to provide additional and improved emergency management
training for personnel deployed during disasters. The MEMS Academy
continues to fill that need.

Individuals with Basic MEMS certificates will have an operational understanding
of the principles of emergency management, including mitigation, preparedness,
emergency response and recovery with the knowledge, skills, and abilities needed
to effectively work within a comprehensive emergency management operation. Those
with Senior and Master level certificates will be able to lead and plan incident
response efforts of increasing complexity.  The blue MEMS flash is awarded to
those who have been activated or mobilized for a disaster, declared emergency,
or major event requiring the activation of the  [Incident Command
System](https://training.fema.gov/emiweb/is/icsresource/).

The MEMS badges are awarded by the [State Guard Association of the United
States](https://sgaus.org/) and are authorized for wear by MDDF members.

<!-- Members with the LNO certificate will be able to work within any EOC. -->

#### September 10, 2023

> Awarded Senior Military Emergency Management Specialist with MEMS flash

#### March 3, 2021

> Awarded Basic Military Emergency Management Specialist

## Awards

{% assign ribbons = site.data.mddf_ribbons | where: "type","personal" %}
{% assign remainder = ribbons.size | modulo: 3 %}
<div class="ribbonrack container mt-3 mb-3">
  {% if remainder != 0 %}
    <div class="row g-1 justify-content-center">
      {% if remainder == 1 %}
        <div class="col-4 col-md-4 col-sm-4 col-xs-4 d-flex justify-content-center p-1px m-0"></div>
      {% else if %}
        <div class="col-2 col-md-2 col-sm-2 col-xs-2 d-flex justify-content-center p-1px m-0"></div>
      {% endif %}
      {% for ribbon in ribbons limit: remainder %}
        <div class="col-4 col-md-4 col-sm-4 col-xs-4 d-flex justify-content-center p-1px m-0">
          <a href="{% if ribbon.url %}{{ ribbon.url | relative_url}}{% else %}#{{ ribbon.id }}{% endif %}" class="ribbon p-0">
            <img src="{{ ribbon.img }}" alt="{{ ribbon.alt }}" />
          </a>
        </div>
      {% endfor %}
    </div>
  {% endif %}

  <div class="row g-1">
    {% for ribbon in ribbons offset: remainder %}
      <div class="col-4 col-md-4 col-sm-4 col-xs-4 d-flex justify-content-center p-1px m-0">
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

### <a id='TAGSRR' />The Adjutant General's Special Recognition Ribbon

The Adjutant General's Special Recognition Ribbon is awarded to
recognize an agency, organization, or entity that is not a numbered
or lettered unit for exceptional service or achievement to the
Maryland Military Department in support of its Service Members and 
the mission.

#### October 13, 2020

> For outstanding unit performance in support of the COVID-19 response.

### <a id='MDESR' />Maryland Emergency Service Ribbon

The Maryland Emergency Service Ribbon is awarded for being mobilized
by the Governor of Maryland to support a declared state emergency,
or mobilized under Title 32 USC to support a domestic emergency or
crisis such as a natural disaster or civil unrest.

#### September 12, 2020

>  Operation Steadfast Guardian--March 15, 2020 to June 21, 2020

### <a id='MDSVCR' />State of Maryland State Service Medal

The State of Maryland State Service Medal is awarded to Maryland
Military Department service members who have completed five good
continuous years of faithful, honorable, and efficient service to
the State of Maryland as a member of the Maryland Army National
Guard, Maryland Air National Guard, or Maryland Defense Force.

The addition of two bronze botonees is for fifteen years of service.

### <a id='MDDFMSR' />Maryland Defense Force Meritorious Service Ribbon

The Maryland Defense Force Meritorious Service Ribbon is the highest
MDDF award and is presented to any active member of the MDDF who
distinguished him/herself by extraordinary distinguished service
or through sustained and extraordinary service or achievement beyond
the normal call of duty to the Maryland Defense Force, Maryland
Military Department, or State of Maryland in a duty of great
responsibility.

#### November 4, 2021

> For sustained meritorious service in support of the Maryland National
> Guard Medical Detachment's statewide COVID-19 vaccination efforts to
> include supporting Task Force Equity.  The MDDF's support of the
> vaccination clinics from January to June 2021 resulted in 8285 shots
> being given during Operation Steadfast Guardian II.

### <a id='MDDFCR' />Maryland Defense Force Commendation Ribbon

Recognition of outstanding acts of achievement or service that has
clearly placed the individual far above their peer or superior
service which results in achievement of a specific project, complex
tasks, or period of sustained service which clearly warrants
recognition of the individual's achievement.

### <a id='MDDFHSR' />Maryland Defense Force Humanitarian Service Ribbon

The Maryland Defense Force Humanitarian Service Ribbon is presented to
any active member of the MDDF who, while under orders and in the opinion
of the MDDF Commanding General, greatly distinguishes themselves by
meritorious service in direct participation in any significant military
act or operation of a humanitarian nature as approved by the Maryland
Military Department.

#### November 28, 2021

> For supporting the MDDF's participation in Operation Steadfast Guardian II.

### <a id='MDDFACAR' />Maryland Defense Force Aid to Civil Authority Ribbon

The Maryland Defense Force Aid to Civil Authority Ribbon is awarded to MDDF
members for being mobilized by the Commanding General, MDDF, to support a
domestic emergency, crisis, or other missions as deemed appropriate.

#### November 28, 2021

> For supporting the MDDF's participation in Operation Steadfast Guardian II.

### <a id='MDDFCERTR' />Maryland Defense Force Community Emergency Response Team Ribbon

The Maryland Defense Force Community Emergency Response Team Ribbon
will be awarded upon a MDDF member's successful completion of an
accredited local, state, or federal government sponsored CERT
training program. The CERT course or program must also be certified
by the MDDF-D5/7.

### <a id='MDDFPDR' />Maryland Defense Force Professional Development Ribbon

The Maryland Defense Force Professional Development Ribbon is awarded
to encourage professional growth within the Maryland Defense Force.
Awarding of this ribbon will be based on five completed courses
within a member's MDDF specialty and/or the core mission of the
Maryland Defense Force.

I have received this award three times.

### <a id='MDDFBTR' />Maryland Defense Force Basic Training Ribbon

The Maryland Defense Force Basic Training Ribbon is awarded to
recognize the successful completion of the approved MDDF Basic
Training curriculum as set forth by the MDDF-G3.

To call the training curriculum "Basic Training" is not fair, as
it only involved some light reading and passing a few written tests.
You could do this in an afternoon, and I think I did.  In 2010, the
entire curriculum was revised into a more involved process called
"Initial Entry Training" (IET) and this ribbon was superseded with
one for the new IET process.

### <a id='SGAUSPDA' />State Guard Association of United States Professional Development Award

The State Guard Association of United States Professional Development
Award is awarded to active SGAUS members who complete certain
training through the organization.  The first award is for completing
the SGAUS Officer Basic Course and the second is for completing the
SGAUS Officer Advanced Course.

This medal is awarded by the State Guard Association of the
United States and is authorized for wear by MDDF members.

## Unit Awards

{% assign ribbons = site.data.mddf_ribbons | where: "type","unit" %}
{% assign remainder = ribbons.size | modulo: 3 %}
<div class="ribbonrack container mt-3 mb-3">
  {% if remainder != 0 %}
    <div class="row g-1 justify-content-center">
      {% if remainder == 1 %}
        <div class="col-4 col-md-4 col-sm-4 col-xs-4 d-flex justify-content-center p-1px m-0"></div>
      {% else if %}
        <div class="col-2 col-md-2 col-sm-2 col-xs-2 d-flex justify-content-center p-1px m-0"></div>
      {% endif %}
      {% for ribbon in ribbons limit: remainder %}
        <div class="col-4 col-md-4 col-sm-4 col-xs-4 d-flex justify-content-center p-1px m-0">
          <a href="{% if ribbon.url %}{{ ribbon.url | relative_url}}{% else %}#{{ ribbon.id }}{% endif %}" class="ribbon p-0">
            <img src="{{ ribbon.img }}" alt="{{ ribbon.alt }}" />
          </a>
        </div>
      {% endfor %}
    </div>
  {% endif %}

  <div class="row g-1">
    {% for ribbon in ribbons offset: remainder %}
      <div class="col-4 col-md-4 col-sm-4 col-xs-4 d-flex justify-content-center p-1px m-0">
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

### <a id='SGAUSSUC' />State Guard Association of United States Superior Unit Citation

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

#### September 15, 2021

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
<div class="ribbonrack container mt-3 mb-3">
  {% if remainder != 0 %}
    <div class="row g-1 justify-content-center">
      {% if remainder == 1 %}
        <div class="col-4 col-md-4 col-sm-4 col-xs-4 d-flex justify-content-center p-1px m-0"></div>
      {% else if %}
        <div class="col-2 col-md-2 col-sm-2 col-xs-2 d-flex justify-content-center p-1px m-0"></div>
      {% endif %}
      {% for ribbon in ribbons limit: remainder %}
        <div class="col-4 col-md-4 col-sm-4 col-xs-4 d-flex justify-content-center p-1px m-0">
          <a href="{% if ribbon.url %}{{ ribbon.url | relative_url}}{% else %}#{{ ribbon.id }}{% endif %}" class="ribbon p-0">
            <img src="{{ ribbon.img }}" alt="{{ ribbon.alt }}" />
          </a>
        </div>
      {% endfor %}
    </div>
  {% endif %}

  <div class="row g-1">
    {% for ribbon in ribbons offset: remainder %}
      <div class="col-4 col-md-4 col-sm-4 col-xs-4 d-flex justify-content-center p-1px m-0">
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

### <a id='PVSA' />President's Volunteer Service Award

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

#### April 9, 2022

>  For calendar year 2021, bronze

### <a id='CHZTM1' />Schweizerischer Zweitagemarsch

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

## <a id='DatesOfRank' />Dates of Rank

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

## <a id='MyCommission' />My Commission

{% include figure.html width="12"
   image="/service/jhoward-mddf-commission.webp" 
   alt="Commission in the Maryland Defense Force"
   cap="Commission in the Maryland Defense Force" %}

Or you can [download the PDF here](/assets/img/service/jhoward-mddf-commission.pdf).

{% include relatedposts.html tag="Maryland Defense Force" %}
