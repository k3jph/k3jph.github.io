---
id: 7339
title: A Brief Discourse on the Jackknife Method
date: 2020-03-30T20:44:30-04:00
author: k3jph
layout: post
permalink: /2020/03/30/a-brief-discourse-on-the-jackknife-method/
image: /assets/images/a-brief-discourse-on-the-jackknife-method.jpg
categories:
  - Blog
tags:
  - computational statistics
  - computer science
  - numerical analysis
  - statistics
---
I often use bootstrapping when I need to get an estimate of some
parameter, but that is because I have access to sufficient computational
resources to to just do run my analysis as much as I want. But that
has not always been the case and the usual method before boot strap
was jackknife. The jackknife approach is a simple leave-one-out
approach, so that given [latex]n[/latex] observations, then for
[latex]i = 1, 2, \ldots, n[/latex], calculate the statistics with
the [latex]i[/latex]th element omitted.

There are some natural advantages to this. The most important of
them is that it is relatively easy to code. An [implementation in
R](http://www.math.ntu.edu.tw/~hchen/teaching/LargeSample/references/R-bootstrap.pdf)
would be only 5-6 lines of code. Another advantage is that it is
easy to show the outcome's validity. For instance, if used to
calculate the mean of a dataset, it is trivial to prove that the
result is the same as the mean calculated the straightforward way.
Other statistics, while not necessarily resulting in the same answer,
can be shown to be valid estimators, as well.

There is a downside to this, of course. For larger datasets, it can
be time prohibitive to use jackknife. After all, it must find
[latex]n[/latex] estimates for[latex]n[/latex] observations. If
[latex]n = 1000[/latex], this is not a big deal. But if [latex]n[/latex]
is in the hundreds of thousands and the statistic being calculated
in relatively intense, like ordinary least squares, that is a lot
of computing to do. But even then, this is not all bad. The task
is [embarrassingly
parallel](https://www.cs.iusb.edu/~danav/teach/b424/b424_23_embpar.html)
since individual calculations of the statistic are uncoupled with
each other.

But I am lazy, and I will probably stick to bootstrap.
