---
id: 6471
title: Rainfall Stationarity
date: 2018-10-03T09:42:13-04:00
author: k3jph
layout: post
permalink: /2018/10/03/rainfall-stationarity/
image: /assets/images/rainfall-stationarity.jpg
categories:
  - Blog
tags:
  - environmental studies
  - meteorology
  - rainfall
  - statistics
---
There's a really neat (and short) paper by Joseph P. Wilson that
was presented at [Stormcon in Atlanta](https://www.stormcon.com/)
this year focusing on the stationarity of rainfall.   If you catch
the weather forecast every day, you usually see something about how
much rainfall was recorded the day before, or maybe during the month
to date.  Stationarity refers to how data can change over time...or
rather, doesn't.

If a process is stationary, it means that the mean does not change
over time and the variance does not change over time.  In practical
terms, we should expect about the same results year over year along
with the same level of deviation year over year.  This has important
implications, such as
[autocorrelation](https://www.itl.nist.gov/div898/handbook/eda/section3/eda35c.htm)
is also constant, making forward predictions reasonable.

Understanding the time distribution of rainfall is important for
hydrogeological analysis.  If the patterns of rainfall are changing,
that changes how soil can infiltrate rainfall and how it will flow
as surface water.  Here's a [link to the pdf of the
paper](https://www.stormcon.com/wp-content/uploads/2018/08/Wilson_R22.pdf).

The critical result is that using 60 years of data, across 80
individual collection points, rainfall measurements appear to be
stationary processes.  This includes when the data is aggregated
at several key intervals (24, 48, 72, and 96 hours).  This runs
counter to the conventional wisdom that rainfall patterns are
shifting due to climate change.

I see a major flaw in the analysis stemming from the fact data was
divided at December 31, 1979/January 1, 1980 and the comparisons
made between the two periods.   I would be much happier to see the
the data analyzed at finer intervals, that way we could better
understand the time dynamic.  However, at first blush, this analysis
is powerful as it relates to flood modelling.
