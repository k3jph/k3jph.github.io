---
id: 3651
title: Phonics 0.6.1 Released
date: 2016-01-09T07:43:01-05:00
author: k3jph
layout: post
permalink: /2016/01/09/phonics-0-6-1-released/
dsq_thread_id:
  - "4476078277"
ampforwp_custom_content_editor_checkbox:
  - ""
instant_articles_submission_id:
  - "419973988349578"
image: /assets/images/mongolian-yak.png
categories:
  - Blog
tags:
  - data science
  - linguistics
  - mathematics
  - phonetics
  - phonics
  - R
  - scientific computing
---
I just posted a new version of [Phonics](/software/phonics) to GitHub and submitted v0.6.1 to CRAN, where it should appear shortly.  This new release includes two new phonetic algorithms.

First, this release includes the Western Airlines match rating approach (MRA).  The MRA is different from most systems by working in two stages.  In the first stage, a name is reduced to a phonetic version.  In the second, the phonetic versions are compared, with minimum and variable thresholds to exceed for a match to be considered.

Second, this new release includes the Roger Root name coding algorithm.  The Roger Root system is very poorly documented.  I only know of its existence due to [this document on the NYSIIS](http://naldc.nal.usda.gov/download/27833/PDF) name coding system I found.  But it is reliable enough to implement, perhaps.

**Update:** Also, v0.6.2 was released and sent to CRAN this morning.  Something about a missing import.

_Image by [hbieser / Pixabay](https://pixabay.com/en/mongolia-yak-wild-animal-739809/)._
