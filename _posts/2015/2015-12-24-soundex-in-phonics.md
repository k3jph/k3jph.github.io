---
id: 3482
title: Soundex in Phonics
date: 2015-12-24T12:25:49-05:00
author: k3jph
layout: post
permalink: /2015/12/24/soundex-in-phonics/
dsq_thread_id:
  - "4431232134"
ampforwp_custom_content_editor_checkbox:
  - ""
instant_articles_submission_id:
  - "397397467289696"
image: /assets/images/yakblanket.png
categories:
  - Blog
tags:
  - data science
  - linguistics
  - mathematics
  - Metaphone
  - phonetics
  - phonics
  - R
  - scientific computing
  - software
  - source code
  - systems science
  - text analysis
---
It's Christmas Eve, I have about eleventy things I need to get done, so I checked out how the yak was doing.  I just pushed a new v0.5.1 of [Phonics in R](/software/phonics) that includes LEIN (implemented months ago) and both Soundex and the Apache refined Soundex algorithms, which I wrote this morning.  

LEIN, like NYSIIS and others, are implemented as regular expression replacement series.  Soundex and refined Soundex, however, are implemented in C++, which makes them quite fast.  I am not terrible impressed with the implementation, but it is correct.  The Soundex implementation is very loosely based on the Apache Commons implementation.

_Image by [Dennis Jarvis / Wikimedia](https://commons.wikimedia.org/wiki/File:Yak_in_Tibet-1.jpg)._
