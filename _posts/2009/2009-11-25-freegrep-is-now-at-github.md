---
id: 696
title: FreeGrep is now at GitHub
date: 2009-11-25T03:42:44-05:00
author: k3jph
layout: post
permalink: /2009/11/25/freegrep-is-now-at-github/
dsq_thread_id:
  - "2492969275"
tumblr_howardjp_permalink:
  - http://howardjp.tumblr.com/post/256440573/freegrep-is-now-at-github
tumblr_howardjp_id:
  - "256440573"
instant_articles_submission_id:
  - "1624704571165711"
categories:
  - Blog
tags:
  - bsd
  - c
  - computer science
  - FreeBSD
  - FreeGrep
  - grep
  - information technology
  - NetBSD
  - OpenBSD
  - software
  - software engineering
  - systems science
  - UMD
---
I have been learning to use [Git](http://git-scm.com/ "Git"), the distributed version control system.  I am more than a bit familiar with both [CVS](http://www.nongnu.org/cvs/ "CVS - Concurrent Versions System") and [Subversion](http://subversion.tigris.org/ "Subversion"), and finding Git to be interesting and capable of some incredible feats of source management.  But when working with new tools, it is often easier to find non-trivial examples upon which to experiment.  This brings us to FreeGrep.

Back in July of 1999, I was between freshman and sophomore years as a [computer science](http://www.cs.umd.edu "University of Maryland Department of Computer Science") major at the [University of Maryland](http://www.umd.edu "University of Maryland, College Park") (when returning a month later, I switched to the [Department of Mathematics](http://www.math.umd.edu "University of Maryland Department of Mathematics")). When you are a compsci major, you tend to get excited over things like the [Towers of Hanoi](http://en.wikipedia.org/wiki/Tower_of_Hanoi "Towers of Hanoi") problem, [self-balancing binary search trees](http://en.wikipedia.org/wiki/Self-balancing_binary_search_tree "self-balancing binary search trees"), or [NP-completeness](http://en.wikipedia.org/wiki/NP-complete "NP-complete").  Back then, what got me going were [finite state automata](http://en.wikipedia.org/wiki/Finite-state_machine "Finite-state machine"). One in particular, called the [Boyer-Moore search algorithm](http://en.wikipedia.org/wiki/Boyer-Moore_string_search_algorithm "Boyer-Moore string search algorithm") caught my attention.  (Also, see item 179 in [HAKMEM](ftp://publications.ai.mit.edu/ai-publications/pdf/AIM-239.pdf "HAKMEM via FTP").)

I had used [FreeBSD](http://www.freebsd.org "FreeBSD"), the 4.4BSD-derived operating system for several years, finding it to be a sane and sensible alternative to the madness that surrounded the Linux development process, especially ten years ago.  A number of the tools used in 4.4BSD-derived operating systems, especially toolchain components, are the GNU versions, leading to more [licensing holy wars](http://en.wikipedia.org/wiki/BSD_licences#UC_Berkeley_advertising_clause "University of California, Berkeley advertising clause") than necessary (and I can keep up with).  So with toys-a-plenty, and some fancy-pants education, I took to writing my own version of [grep(1)](http://www.opengroup.org/onlinepubs/9699919799/utilities/grep.html "grep"), a regular expression pattern matcher and cornerstone of any respectable Unix-like operating system.  I posted an [initial announcement](http://www.mail-archive.com/freebsd-hackers@freebsd.org/msg00572.html "Repalcement for grep(1)") to the FreeBSD Hackers mailing list (with a disturbingly misspelled subject line) where I expressed my hope it would someday be the version shipped with FreeBSD.  I had barely scratched the surface of the problem, but a few others were inspired and patches started flying across the world with incredible alacrity.  Source control was nowhere to be seen, but it was just for fun, anyway.  As the summer wound down, I worked less and less on the program.  It was almost completely correct but was terribly slow in [some pathological cases](http://monkey.org/freebsd/archive/freebsd-hackers/200306/msg00516.html "Replacing GNU grep revisited (Christopher Weimann)").

For reasons I can no longer recall, on September 14, 2002, created a new CVS repository and checked in FreeGrep v0.16.  And in early 2003, a man named [Sean Farley](http://www.farley.org/ "Sean Farley") contacted me with some patches.  I committed them to my repository, but never cut a new release.  But later that year, both the [NetBSD](http://www.netbsd.org "The NetBSD Project") and [OpenBSD](http://www.openbsd.org "The OpenBSD Project") projects dropped GNU grep from their source trees and added FreeGrep v0.16 and started doing a lot of heavy work, dramatically increasing the speed and solving many lingering bugs in the code.  I watched, but did not say much.

Because FreeGrep is a small program (2121 SLOC in the current release of OpenBSD, the largest implementation) with a complex development history, it was the perfect place to experiment with Git.  So this week, I used Git’s CVS import feature to import my CVS tree, the OpenBSD CVS tree, and the NetBSD CVS tree into one repository.  Now, the full history from these development strands are available and I did the obvious thing and merged work done by the OpenBSD project directly into the master branch and consider it the new base.  Because I have been occasionally remiss in keeping this code available to all, I have uploaded everything I have, including fifteen pre-CVS source releases to [GitHub](http://github.com/howardjp/freegrep "FreeGrep at GitHub") where it can remain available to any interested party.  Please enjoy.

And submit patches.
