---
title: Software
date: 2015-09-20T18:03:41-04:00
author: James Howard
layout: page
permalink: /software
featured_image: /assets/img/software-banner.webp
menu-order:     41
menu-label:     Software
stylesheet: /assets/css/software.css
---
<div class="software-introduction">

I have been writing software since Unix boxes were considerably more annoying.
Some of it solves real problems; some of it exists because I wanted to know
whether the idea would work. The distinction is often less tidy than it sounds.

The projects below include applications, research software, developer tools,
interactive experiments, and a long trail of Unix and BSD work. They are not a
repository feed. They are the pieces that have earned an explanation: because
they are current, still useful, published, historically consequential, or just
too interesting to leave on an old Zip disk.

</div>

## Current Projects

{% include software-projects.html projects=site.data.software.current %}

## Maintained and Stable Research Software

{% include software-projects.html projects=site.data.software.maintained %}

The scholarly citations for `phonics` live in [Selected Work](/scholarship/).
This page is where the packages themselves live: what they do, where to find
them, and why they were built.

## From the Archive

{% include software-projects.html projects=site.data.software.archive %}

<p class="software-archive-note">I studied mathematics rather than computer
science after arriving at Maryland, but I never stopped writing programs. The
older work reflects a durable preference for small tools with clear jobs, a
great deal of BSD and Unix influence, and the useful habit of keeping the code
around after the immediate reason for it has passed.</p>
