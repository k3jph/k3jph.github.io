---
id: 680
title: Waterfall Charts in R
date: 2010-05-23T16:07:00-04:00
author: k3jph
layout: post
permalink: /2010/05/23/waterfall-charts-in-r/
dsq_thread_id:
  - "2268152305"
tumblr_howardjp_permalink:
  - http://howardjp.tumblr.com/post/625295781/waterfall-charts-in-r
tumblr_howardjp_id:
  - "625295781"
ampforwp_custom_content_editor_checkbox:
  - ""
instant_articles_submission_id:
  - "780531378766006"
categories:
  - Blog
tags:
  - data science
  - finance
  - graphics
  - mathematics
  - R
  - scientific computing
  - statistics
  - waterfall
---
It is often hard to wrap your head around the finances of organizations and the unusual accounting rules of public organizations make that even more difficult. When I read [The McKinsey Way](http://books.google.com/books?id=UtNZZU6JLiQC&lpg=PP1&dq=mckinsey%20way&pg=PP1#v=onepage&q&f=false) several years ago, I saw the value in using waterfall charts to analyze and understand the finances of public organizations. So I created functions for plotting waterfall charts using both traditional and grid graphics in [R](http://www.r-project.org/). Here’s an example using the sample data from _The McKinsey Way_:

{% include figure.html image="tumblr_l2tyqg9LdU1qzy7qe.png"
   alt="Raisel's waterfall plot example"
   cap="Raisel's waterfall plot example" %}

More advanced examples are available in the package demo. I had intended to write the documentation and submit it as a code snippet to the [Journal of Statistical Software](http://www.jstatsoft.org/). However, I have yet to actually write the documentation and it is probably not appropriate for JSS, anyway. Otherwise, the package is complete and is [now available from CRAN](http://cran.r-project.org/web/packages/waterfall/index.html). The source code [is available from Bitbucket](http://bitbucket.org/howardjp/waterfall). The code repository contains the outline of an [Eclipse](http://www.eclipse.org/) project using [StatET](http://www.walware.de/goto/statet), which I recommend for working with this and all other R packages.
