---
id: 5192
title: Comments on RPN
date: 2017-07-12T19:12:47-04:00
author: k3jph
layout: post
permalink: /2017/07/12/comments-on-rpn/
dsq_thread_id:
  - "5984890517"
image: /assets/images/comments-on-rpn.jpg
categories:
  - Blog
tags:
  - calculators
  - computer science
  - lex
  - math education
  - mathematics
  - RPN
  - scientific computing
  - software engineering
  - systems science
  - Texas Instruments
  - Unix
  - yacc
  - Z-80
---
I've started falling in love with reverse Polish notation (RPN)
again. This mostly comes from using [PCalc](http://www.pcalc.com/)
on my iPhone for a lot of calculations, lately. Like so many other
kids, I grew up using the [Texas Instruments](https://education.ti.com/),
starting with the TI-82 and TI-85. In college, I "upgraded" to a
TI-86, which I recently found in my basement, and it still works.
It's a testament to both the ruggedness of the Texas Instruments
builds and the long-lasting durability of the [Zilog
Z-80](http://www.z80.info/), the silicon inside the case.

This post won't teach you how to use RPN, since there are [plenty
of websites for
that](https://www.google.com/search?q=how+to+use+reverse+polish+notation).
So we don't want to go into that here. But I do want to point out
that if you have a Mac, you have an RPN calculator built right in,
called
[dc](https://www.freebsd.org/cgi/man.cgi?query=dc&amp;apropos=0&amp;sektion=0&amp;manpath=Darwin+8.0.1%2Fppc&amp;arch=default&amp;format=html),
the desktop calculator.

The dc program holds a bit of a special place in my heart. After I
wrote [FreeGrep](/software), I started a version of dc to
replace the GNU version with a non-GPL version of the application.
Now, one of the neat things about RPN is that you do not need a to
write a parser, just a lexer, to interpret it. So I learned to use
[lex, but never learned to use yacc](http://dinosaur.compilertools.net/).

Anyway, I wrote a lexer and had most of the interpreter written,
but used [libgmp](https://gmplib.org/), the GNU multiple precision
library as the underlying math engine. I planned to replace it, but
never got around to it. Interestingly, since I started playing with
RPN again, I went on a scavenger hunt, but, alas, I am unable to
find the source code. It's probably for the best.

_Image by [Marcin Wichary /
Flickr](https://www.flickr.com/photos/mwichary/2225327298/)._
