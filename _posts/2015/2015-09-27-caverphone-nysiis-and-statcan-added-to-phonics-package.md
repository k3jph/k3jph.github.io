---
id: 2893
title: Caverphone, NYSIIS, and StatCan Added to Phonics Package
date: 2015-09-27T23:56:03-04:00
author: k3jph
layout: post
permalink: /2015/09/27/caverphone-nysiis-and-statcan-added-to-phonics-package/
dsq_thread_id:
  - "4172320416"
instant_articles_submission_id:
  - "1013267765470310"
image: /assets/images/unshaved-yaks.png
categories:
  - Blog
tags:
  - data science
  - free stuff
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
Over the last week, I have added Caverphone, Caverphone 2, the New York State Identification and Intelligence System, the modified New York State Identification and Intelligence System, and the Census Modified Statistics Canada phonetic algorithms to the [phonics in R](/software/phonics) software package.  

While Metaphone is written in C++, all of these algorithms could be implemented using [regular expressions](https://en.wikipedia.org/wiki/Regular_expression).  And we all known [how much I love a good regex](https://github.com/howardjp/freegrep).  Each of these are written in pure R using regexes.  So they are a bit slow, but they are almost certainly fast enough to get the job done.  

_Image by [Arian Zwegers / Flickr](https://www.flickr.com/photos/azwegers/15842044051)._
