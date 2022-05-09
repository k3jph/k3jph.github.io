---
id: 6526
title: Parallelized Implementation of bootCI for DCchoice
date: 2018-11-11T09:10:34-05:00
author: k3jph
layout: post
permalink: /2018/11/11/parallelized-implementation-of-bootci-for-dcchoice/
image: /assets/images/parallelized-implementation-of-bootci-for-dcchoice.jpg
categories:
  - Blog
tags:
  - economics
  - environmental studies
  - HPC
  - parallel computing
  - R
  - rstats
  - willingness to pay
  - SciServer
---
I've been helping a small team work on some willingness-to-pay
analysis using double-bounded choice survey data. I'll post more
about that soon, but I am writing now to talk about the double-bounded
choice models in R. The
[DCchoice](https://cran.r-project.org/web/packages/DCchoice/index.html)
library is really nice and makes the analysis about as simple as
possible. Further, the text _[Stated Preference Methods Using
R](http://lab.agr.hokudai.ac.jp/spmur/)_ is fantastic.

But...the confidence interval bootstrap routine is really slow with
double-bounded choice models. Single-bounded not so much. But it
was taking hours to run, even for only 1000 samples. I was using
[SciServer](http://www.sciserver.org) for running the model and it
gives me 16 cores, so I rewrote bootCI to use them all. The script
is below and you have to have both `doMC` and `foreach` loaded.
There's a new option `threads` that allows you to set the number
of threads to use.

<script src="https://gist.github.com/howardjp/4e3ebf467f5bce5d944561315f022a90.js"></script>

_This work used SciServer, a collaborative research environment for
large-scale data-driven science. It is developed at, and administered
by, the [Institute for Data Intensive Engineering and
Science](http://idies.jhu.edu/) at the Johns Hopkins University.
SciServer is funded by the [National Science Foundation](https://nsf.gov/)
Award ACI-1261715\. For more information about SciServer, please
visit [http://www.sciserver.org](http://www.sciserver.org)._
