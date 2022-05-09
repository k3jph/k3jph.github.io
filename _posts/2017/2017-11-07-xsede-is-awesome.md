---
id: 5642
title: XSEDE is Awesome
date: 2017-11-07T21:39:37-05:00
author: k3jph
layout: post
permalink: /2017/11/07/xsede-is-awesome/
image: /assets/images/xsede-is-awesome.jpg
categories:
  - Blog
tags:
  - demography
  - mathematics
  - phonics
  - scientific computing
  - supercomputing
  - text analysis
  - XSEDE
---
I'll be writing about [my trip to Goddard](/2017/10/24/going-nasa-social/)
in the next week or so.  But first, I feel like I should write about
this Comet I have been playing a bit with.  When I was a kid,
[supercomputers](https://www.youtube.com/watch?v=wn03wn3k47Y) were
these giant mythical beasts.  We didn't know what they were good
for, but we knew NASA and [Lawrence Livermore](https://www.llnl.gov/)
had them.  They must be cool.  Of course, there was one in
[Wargames](http://www.imdb.com/title/tt0086567/):

{% include youtube.html id="NHWjlCaIrQo" %}

Around the mid 1990, some guys at Goddard figured out a way to link
a network of workstations into a [high throughput
computer](http://research.cs.wisc.edu/htcondor/htc.html) and called
it a [Beowulf
cluster](http://webhome.phy.duke.edu/~rgb/brahma/Resources/beowulf/papers/ICPP95/icpp95.html).
Then a group at [Oak Ridge](https://www.ornl.gov/) built a Beowulf
cluster from surplus desktops, calling it the [Stone
Soupercomputer](https://en.wikipedia.org/wiki/Stone_Soupercomputer) after
an old children's story.    Early supercomputers were just faster
and faster than what else was available.  But the basics of Beowulf
now underlie how most advanced computing operates.  It didn't matter
because I never had any problems that interesting, anyway.

Suffice it to say I do today and the problem stems from demographic
modelling.  More details will come from that later, but the neat
thing is, access to that kind of equipment is just dead simple in
2017.  The [The Extreme Science and Engineering Discovery
Environment](https://www.xsede.org/) (XSEDE) project is funded by
the [National Science Foundation](https://www.nsf.gov/) to link
supercomputers around the United States and make those resources
available to researchers around the country.  The only [eligibility
requirement](https://portal.xsede.org/allocations/research) is that
allocations are only available to researchers, including faculty,
at a U.S.-based institution.

Even better, they will give you a 1000-hour trial account just for
the asking.  This trial account is on
[Comet](http://www.sdsc.edu/support/user_guides/comet.html) at the
[San Diego Supercomputer Center](http://www.sdsc.edu/) (SDSC).
Comet is a 1,944-node system with 24 cores/node for 46,656 total
computing cores.  There are additional large memory and GPU cores
available, too.  But I left those off.  I used the trial account
to build a test implementation of my demographic simulation in R.
Once I was happy it worked, I submitted an application for a startup
allocation.  All this takes a
[biosketch](https://grants.nih.gov/grants/forms/biosketch.htm) (a
kind of specially formatted CV) and a project abstract (mine was
less than 200 words).  I requested 35,000 compute hours and 50
gigabytes of storage space on Comet.  There are other resources
available, but my code was already tested and working on Comet.

My simulation consists of two independent components.  One ran
overnight starting on Monday and is complete.  It took approximately
210 total compute hours to run, but was done by 2 A.M.  It required
11 cores on each of 10 subjobs for 110 total cores.  The second
kicked off tonight and will take quite a bit longer...but probably
less than 48 hours, total, across all jobs.

The only real requirement, other than being of some scientific
validity, as the abstract verified, is that I acknowledge my use
of XSEDE's resources when I talk about my project.  That's kind of
awesome.  I can even monitor the whole thing from my phone.

{% include figure.html image="Screenshot_20171107-214118.png"
  alt="XSEDE Android Application"
  cap="The textmetrics job running on Comet" %}

Just for reference, there are currently 644 jobs running on Comet
and I am 100 of them, taking up 2400 cores.

_Image by the [San Diego Supercomputer
Center](http://www.sdsc.edu/News%20Items/PR20170502_Comet_GPU.html).  This
work used the Extreme Science and Engineering Discovery Environment
(XSEDE), which is supported by National Science Foundation grant
number ACI-1548562. In particular, it used the Comet system at the
San Diego Supercomputing Center (SDSC) through allocations TG-DBS170012
and TG-ASC150024._
