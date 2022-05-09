---
id: 3829
title: waterfall 1.0.0 released
date: 2016-02-15T21:31:52-05:00
author: k3jph
layout: post
permalink: /2016/02/15/waterfall-1-0-0-released/
dsq_thread_id:
  - "4582916803"
ampforwp_custom_content_editor_checkbox:
  - ""
instant_articles_submission_id:
  - "418958268451909"
image: /assets/images/barchart-rasiel.png
categories:
  - Blog
tags:
  - data science
  - data visualization
  - graphics
  - mathematics
  - R
  - scientific computing
  - statistics
  - waterfall
---
Sometime, [approximately forever ago](/2010/05/23/waterfall-charts-in-r/), I put together a small package to produce [waterfall charts](https://en.wikipedia.org/wiki/Waterfall_chart) in R.  It provided two functions, one using base graphics and one using `lattice` graphics.  I planned to document this and also create a version in `ggplot`.  I never got around to either and through [bit rot](http://www.catb.org/jargon/html/B/bit-rot.html), and an ever evolving packaging system within R, the project fell out of compliance and was kicked off CRAN. 

About a year ago, I converted the [Mercurial repository](https://bitbucket.org/howardjp/waterfall) to git and [posted it to GitHub](https://github.com/howardjp/waterfall).  As a part of this, I also introduced [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/) into the tree.  But I didn't move forward.  I took the time today to get the project in line with current CRAN standards, moved most of the documentation to [Roxygen](http://roxygen.org/), and cut an initial 1.0.0 release.

Not bad for a holiday.
