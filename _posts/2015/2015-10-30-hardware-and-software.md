---
id: 3119
title: Hardware and Software
date: 2015-10-30T10:27:52-04:00
author: k3jph
layout: post
permalink: /2015/10/30/hardware-and-software/
dsq_thread_id:
  - "4274521812"
instant_articles_submission_id:
  - "1123619471088196"
image: /assets/images/Turtle_draw.jpg
categories:
  - Blog
tags:
  - arduino
  - Atari
  - BASIC
  - computer science
  - DOS
  - embedded systems
  - programming
  - software engineering
  - systems science
---
[Slashdot](http://developers.slashdot.org/story/15/10/29/1234226/revisiting-why-johnny-cant-code-have-we-made-the-print-too-small) has a link to a story on how it has become substantially more difficult to write software and how this is discouraging children from taking on programming.  Even at the "Hello World!" phase, the multiline and multiclass code is necessary in many languages.

There's been a parallel development I don't see being discussed.  Software and programming is effectively disconnected from the hardware.  Java's write-once/run-anywhere is completely disconnected from hardware.  Unix-like systems pride themselves on abstracting the hardware away into files.  Even Windows must do this to keep errant software from crashing the system.

But I learned to program on an [Atari 1200XL](http://www.atarimuseum.com/computers/8BITS/1200xl/1200xl.html), [Atari 400](http://www.atarimuseum.com/computers/8BITS/400800/400/400.html), and in [real-mode on the 8086](http://wiki.osdev.org/Real_Mode) running DOS.  On these systems, the hardware is not abstracted away.  On all of these platforms, BASIC's PEEK and POKE touch real memory.  On DOS, [INT](http://www.ctyme.com/rbrown.htm) actually stops the processor and makes it do something else.

The ability to touch hardware allows a learner to see the connection between hardware and software.  Abstract data types are important.  And while ADTs can solve a lot of problems, the world is not made of abstract data.  Sometimes, especially in embedded systems engineering, seeing the connection between hardware and software is necessary to make them both function.  I have struggled for a few years about the right way to teach this to my kids.  So far, the [Arduino](https://www.arduino.cc/) has been best.  And that's still a hard system to hack.

_Image by [Valiant Technology Ltd. / Wikimedia](https://commons.wikimedia.org/wiki/File:Turtle_draw.jpg)...now those are turtle graphics._
