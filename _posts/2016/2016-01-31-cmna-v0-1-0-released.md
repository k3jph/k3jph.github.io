---
id: 3774
title: CMNA v0.1.0 Released
date: 2016-01-31T23:24:46-05:00
author: k3jph
layout: post
permalink: /2016/01/31/cmna-v0-1-0-released/
dsq_thread_id:
  - "4540662881"
instant_articles_submission_id:
  - "232632643869573"
image: /assets/images/1000px-Integration_trapezoid.svg_.png
categories:
  - Blog
tags:
  - books
  - CMNA
  - data science
  - mathematics
  - numerical analysis
  - scientific computing
---
Some of you know this, but just about a year now, I have been working on a book called _Computational Methods for Numerical Analysis with R_.  This project, completed in my [copious free time](http://www.catb.org/jargon/html/C/copious-free-time.html), was something of a dream project.  Since I was an undergraduate mathematics major, where I found the standard texts on numerical analysis frustrating, I have planned to do this.  After completing my dissertation, it was time.  

The biggest challenge to most introductory numerical analysis texts is the focus on theorems and rigorous proofs.  Proofs and theorems are critical in mathematics, but numerical analysis is a little bit different as mathematical subjects go.  This book is different in that it focuses on the value of working code, like the [Agile mantra](http://www.agilemanifesto.org/iso/en/principles.html).   My goal is to reach an intuitive understanding of the process each algorithm uses through explanation, code, and examples.  With that understanding, readers can modify, support, and improve these codes.  More importantly, readers can understand what R, or some other language, is doing when it executes its internal functions to solve numerical problems.

Tonight marks a milestone in the development.  I have a complete draft that has been sent off to the publisher.  And, because the code is in 100 percent pure R code, it is now posted to [GitHub](https://github.com/howardjp/cmna) and submitted to [CRAN](https://cran.r-project.org).  It will probably take a few days to make it to CRAN, but it's on the way.  

The primary audience for this book are individuals interested in a deeper understanding of the methodological approaches used in numerical analysis, especially as they apply to computational statistics and data science.  The audience should have a solid grounding in mathematics through calculus and differential equations.  Data scientists can also use this text as the starting point for implementing new analytical techniques in R.

Each section of this text present a type of problem and a numerical solution.  The problem is described briefly and the numerical solution is explained.  Then the R code implementing that solution is described, along with any specific implementation details.  From there examples are given.  Where appropriate, examples showing where the algorithm can fail are provided along with suggestions for where robust implementations are available as part of the standard R distributions, or one of the many packages available from CRAN.

As we complete the review and editorial process, I will be posting more.

_Image by [Emergie / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Integration_trapezoid.svg).  The image shows the trapezoid rule, which I think is one of the most elegant algorithms and got me hooked on scientific computing._
