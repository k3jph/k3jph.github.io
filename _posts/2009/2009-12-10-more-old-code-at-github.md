---
id: 694
title: More Old Code at GitHub
date: 2009-12-10T01:09:53-05:00
author: k3jph
layout: post
permalink: /2009/12/10/more-old-code-at-github/
tumblr_howardjp_permalink:
  - http://howardjp.tumblr.com/post/276811812/more-old-code-at-github
tumblr_howardjp_id:
  - "276811812"
dsq_thread_id:
  - "2888124652"
instant_articles_submission_id:
  - "1187607478022218"
categories:
  - Blog
tags:
  - bsd
  - computer science
  - information technology
  - M-Net
  - software
  - software engineering
  - systems science
  - Unix
  - utilities
  - uwatch
  - write
---

I have recovered from an old [Iomega Zip disk](http://Iomega%20Zip%20drive) a few more programs I wrote in the 1997-1998 time frame which may be of some interest:

## [daemon](http://github.com/howardjp/daemon)

Daemon was originally written for FreeBSD to use the 4.4BSD library function, [daemon(3)](http://www.freebsd.org/cgi/man.cgi?query=daemon&apropos=0&sektion=0&manpath=4.4BSD+Lite2&format=html "Daemon manual page") to launch a command after disassociating itself from the controlling TTY.  I originally saw such an application on [M-Net](http://Arbornet%20/%20M-Net "http://www.arbornet.org") which ran BSD/OS 3.1 at the time.  The source was unavailable, but it was easy to reimplement.  Modern Linux implementations now include daemon(3), so it should be usable on Linux today.

## [rpt](http://github.com/howardjp/rpt)

Rpt was based upon the source from daemon, above but instead of disassociating from the controlling terminal, rpt reruns the command at a specified interval.  This allows the user to monitor the output of a program over time.  

## [uwatch](http://github.com/howardjp/uwatch)

Uwatch was also born of M-Net.  M-Net is an interactive BBS system dating back to 1983, which has always allowed users to communicate directly in real time.  As a result, someone once developed a program to notify users when their friends logged in or out.  However, it was always spotty at best, especially during a long session.  I worked extensively on it back in 1997 to solve some memory management issues.  This is what remains of that effort.  

## [write](http://github.com/howardjp/write)

When I was a student at Miami University, we had several Linux systems spread across three (of four) campuses and we occasionally used [write(1)](http://www.freebsd.org/cgi/man.cgi?query=write&apropos=0&sektion=0&manpath=Unix+Seventh+Edition&format=html "write manual page") to talk to each other.  This implementation of write honors MIT’s [Project Athena](http://en.wikipedia.org/wiki/Project_Athena "Project Athena at Wikipedia")'s network-aware write protocol and allows users to send message to users on other systems.
