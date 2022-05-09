---
id: 4368
title: Statistical Likelihood of Extreme Events and the Ellicott City Floods
date: 2016-08-09T22:44:05-04:00
author: k3jph
layout: post
permalink: /2016/08/09/statistical-likelihood-extreme-events-ellicott-city-floods/
dsq_thread_id:
  - "5053896451"
image: /assets/images/statistical-likelihood-extreme-events-ellicott-city-floods.jpg
categories:
  - Blog
tags:
  - Earth science
  - environmental policy
  - environmental science
  - environmental studies
  - flood studies
  - Howard County
  - mathematics
  - risk management
  - statistics
---
This time, the flood hit close to home, literally.  Over the last
week, Ellicott City has responded after a very bad storm dropped
nearly six inches of rain in only two hours.  The recovery effort
will be long and difficult, but the [Ellicott City
Partnership](https://ecpartnership.org/) has done a remarkable job
coordinating resources for both immediate and long term needs.  The
storm and its effects were severe and Ellicott City will require
strong leadership, going forward.

However, there's been some accusations and finger pointing, about
who may be responsible for inflicting what damage.  The evidence
given is usually the gross severity of this storm and the remnants
of Tropical Storm Lee in 2011 are just too close together.  Something
must have happened to cause this:

> [You can’t have a thousand year storm every five years.](http://howcome.md/ellicott-city-flood-a-watershed-event/)

Well, yes, you can.  I am not defending the practices of those
accused, but as evidence goes, this means nothing.  As usual, people
have misunderstood risk, something I've written about so often here,
[it has it's own category](/tag/risk-management/).
Let's look at the numbers.

First, let's talk about what it means to be a one-hundred year event
or a one-thousand year event.  It does not mean it will only happen
once in a hundred years or once in a thousand years.  It means the
event has a 1/100 or 1/1000 probability of happening any given year.
And, and this is the interesting thing, it also only has a probability
of happening 1/100 or 1/1000 in back-to-back years.  It seems natural
to say "The probability is 1/100 this year and 1/100 next year,
therefore the probability is 1/10000 of getting back-to-back
one-hundred year events."  While the first part is true, the second
isn't.  The second assumes the year pair is predetermined.  Only
the second is; the first can be any year.  Therefore, we don't start
counting probability until the first one even happens.

Because of this, it is suddenly possible to see the probability of
observing two one-hundred year events in five years.  We don't count
the first again, then it is the probability of the event happening
in the next four years.  Again, it seems natural to say, "Well, it
would be [latex]1/100 * 4 = 4/100 = 0.04[/latex]."  And while close,
it is not correct.  It is, in fact, 1 minus the probability of it
not happening in the next four years.  That's not terribly intuitive,
but it is correct.  So that is,

<center>[latex]1 -.99^4 \approx 1 - 0.96059601 = 0.03940399\text{,}[/latex]</center> 

which is almost,
but not quite 0.04.  We'll make the math simpler and call it at 4%
anyway.  That's the probability of observing two one-hundred year
events within a five  year period.  One in 25.

But wait, there's more.

If we want to know, what is the probability of it happening in
downtown Ellicott City, it is 4%.  And, understandably, Ellicott
City residents feel like they are on the short end of a vicious
stick.  If the 2011 and 2016 storms had, instead, caused this kind
of devastation in Savage, Savage residents would be asking the same
questions.  But Savage wasn't destroyed and nobody there is asking.

So what if we wanted to know if it would happen in any community
in Howard County.  Well, community is very poorly defined, and there
are no cities or other formal boundaries (except HOA lines) in
Howard County, so let's find a good proxy.  We will use the
[Census-designated
place](https://www.census.gov/geo/maps-data/data/cbf/cbf_place.html) (CDP).
I kind of think CDP is too big, since we are talking about a
highly-localized phenomenon, but we will use CDP since it is a good
external standard.  All of the following CDPs are located at least
partially in Howard County:


* Columbia 
* Elkridge 
* Ellicott City 
* Fulton 
* Highland 
* Ilchester 
* Jessup 
* Mount Airy
* North Laurel 
* Savage 
* Scaggsville

The probability of two one-hundred year events in five years happening
in any of these 11 CDPs is, again, one minus the probability of it
not happening.  So that is

<center> [latex] 1 - .96^{11} \approx 1 - 0.63823933055 = 0.36176066944\text{,}[/latex]</center>

just about 36%.  There's some round-off error here, and the real number is
closer to 35%, but that's not a big deal right now.  What we learn
from this is the probability of any year being the start of two
one-hundred year events in five years, in any CDP in Howard County,
is more than one-third.

In simpler terms, yes, you can have a one-hundred year storm every
five years, and almost certainly some place will.  And this analysis
only covers Howard County.  Maryland or nationwide, the probability
skyrockets.  It's rather like playing the lottery.  Just because
you probably won't win doesn't mean nobody will.

While I am unconvinced that this was a thousand-year event (but
read [the NOAA
analysis](http://www.nws.noaa.gov/oh/hdsc/aep_storm_analysis/AEP_Ellicott_City_July2016.pdf)),
recalculating these probabilities for one-thousand year events is
a trivial exercise left to the reader.

Risk is difficult to measure and difficult to grasp.  Further, risk
needs to be assessed holistically by policymakers and planners.
There are certainly aspects of Main Street that could be redone to
better accommodate a massive storm. But to assume that these events
are so terrible as to be unnatural is really not grounded in the
numbers.

_Image by [Scott Saghirian / Wikimedia
Commons](https://commons.wikimedia.org/wiki/File:Main_Street_Bridge,_Ellicott_City,_MD.jpg)._
