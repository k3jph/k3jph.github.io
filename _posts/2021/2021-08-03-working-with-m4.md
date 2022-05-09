---
id: working-with-m4-macro-language
title: Working with the m4 Macro Language
date: 2021-08-03T12:54:00-04:00
author: k3jph
layout: post
permalink: /2021/08/03/working-with-m4-macro-language
image: /assets/images/working-with-m4.png
categories:
  - Blog
tags:
  - m4
  - macro programming
  - text processing
  - research 
---

I recently ran into a problem where I needed to generate a lot of
configuration files with slightly different parameters included.
This was all being fed into a simulation so we could test different
values of each parameter in the simulation.  The details are not
important.  I needed a way to generate 297 configuration files.

I ended up settling on [the m4 macro language](https://en.wikipedia.org/wiki/M4_(computer_language)) 
to generate these files.  It was about three lines of m4 in a base
file and looping over it in a shell script with the parameters
occupying environmental variables.  The details here are not what's
important.  What's important is m4.

The m4 macro language dates all the way back to 1977 first appearing
in Seventh Edition Unix.  The language is obscure, even by Unix
standards.  There is no m4 programming webpage.  There is no O'Reilly
book.  Most people who have any familiarity with it know it because
the [Sendmail system](https://www.proofpoint.com/us/products/email-protection/open-source-email-solution),
which has used m4 to manage its configuration files for decades.
It also underlies [Autoconf](https://www.gnu.org/software/autoconf/),
and your usage there is kind of indirect.  I cannot think of any
other mainstream use of m4.  So I went on a bit of a hunt.

I found a pair of videos on YouTube introducing m4.  The first looks
to be a talk given to a meetup in Portland:

{% include youtube.html id="ULZxHSPWn98" %}

And the second is from the Australian GovHack conference, showing
a variety of neat ways m4 was being used in the Australian government:

{% include youtube.html id="yrurIUEGo1c" %}

If you can find a copy of it, the m4 documentation is only like
five pages.  There's a copy in [this PDF, starting on page 85](https://plan9.io/7thEdMan/v7vol2b.pdf).

The last few resources of merit I found are:

* "[Using m4 Macros in Your Programs](https://www3.physnet.uni-hamburg.de/physnet/Tru64-Unix/HTML/APS32DTE/M4XXXXXX.HTM)", which seems to be part of the [Tru64](https://www.stromasys.com/tru64/) documentation
* "[Macro Magic: M4 Complete Guide](https://www.linuxtoday.com/blog/macro-m4-guide/)", by Jerry Peek in [LinuxToday](https://www.linuxtoday.com/)
* "[Notes on the m4 Macro Language](https://mbreen.com/m4.html)" by Michael Breen 

After this, sources start to get thin on the ground.  As rare as a
good use of m4 is, it was absolutely the best choice for what I was
doing.  It's always worth remembering what's already on your computer
since you never know when the right tool is already there.
