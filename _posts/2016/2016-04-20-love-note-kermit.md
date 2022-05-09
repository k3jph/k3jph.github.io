---
id: 3993
title: A Love Note to Kermit
date: 2016-04-20T07:31:18-04:00
author: k3jph
layout: post
permalink: /2016/04/20/love-note-kermit/
dsq_thread_id:
  - "4760673208"
instant_articles_submission_id:
  - "980958132048323"
image: /assets/images/kermit.jpeg
categories:
  - Blog
tags:
  - 4.2BSD
  - arduino
  - computer science
  - embedded development
  - history
  - Intel Galileo
  - Raspberry Pi
  - software engineering
  - systems science
  - telecommunications
  - VAX
  - Wavix
---
Occasionally, I post some pictures and notes on hardware projects we have going on in the Cybernetics Laboratory, which is to say, my desk.  One thing that always comes up a program called Kermit, originally built by Columbia University, now maintained by the [Kermit Project](http://www.kermitproject.org/).  Kermit has been around since the early 1980s, but I learned of it in the early 1990s from [BBSes](http://textfiles.com/).  I would download stuff using [XMODEM](http://textfiles.com/programming/ymodem.txt), but some BBS systems would offer Kermit as a file transfer protocol.

I would learn a lot more about Kermit in the mid 1990s.  My mother started a postgraduate program at [Miami University](https://www.miamioh.edu/) in the fall of 1995 and the University's technology office would give you a disk with Kermit for DOS on it.  Kermit is super configurable and scriptable.  So they set it up with a menu that would connect to different systems at Miami.  I would use it to dial in to the library's catalog.  The catalog didn't require a password and provided [Lynx](http://lynx.browser.org/).  It wasn't locked down, so I could hopscotch around the Internet from there.

Later, when I went to in [Wavix in 2002](https://jameshoward.us/2015/07/15/atd-or-engineers-in-space/), I installed Kermit on my desktop to talk to the router we were building.  I also installed it on the router itself.  It just made life easier to have Kermit on it.

Now, playing with hardware like the [Raspberry Pi](https://www.raspberrypi.org/), [Intel Galileo](http://www.intel.com/content/www/us/en/embedded/products/galileo/galileo-overview.html), and even [Arduino](https://www.arduino.cc/), my primary interface is Kermit.  And I install Kermit on the board if it supports it.  It's easier than getting [scp](https://en.wikipedia.org/wiki/Secure_copy) up and running.

I am not the only one who thinks so.  Apparently, Kermit is still the communications tool of choice for certain classes of medical records and inside ATMs.  Those are two worlds where things don't move fast.  But the fact Kermit is still a go-to tool for embedded development tells me it will be there for a while longer.

Apparently, the Kermit Project [found a copy of the first portable Kermit version](http://www.kermitproject.org/ckermit42.html) from 1985.  They also got it working under Solaris 9.   Given this supported systems list:

1. Berkeley Unix 4.1 and 4.2 on the DEC VAX.
2. Microsoft Xenix/286 on the IBM PC/AT.
3. IBM PC/IX AT&T System III on the IBM PC/XT.
4. Interactive Systems AT&T System III on PC architecture.
5. Vanilla AT&T Bell Labs System III, e.g. on 3B2, 3B20.
6. The DEC Pro/350 (Micro PDP-11) with the Venix operating system.
7. NCR Tower 1632 OS 1.02.

I am half tempted to install 4.2BSD on a VAX just to watch it go.
