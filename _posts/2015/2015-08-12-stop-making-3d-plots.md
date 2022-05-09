---
id: 2407
title: Stop Making 3D Plots
date: 2015-08-12T08:49:25-04:00
author: k3jph
layout: post
permalink: /2015/08/12/stop-making-3d-plots/
dsq_thread_id:
  - "4025721114"
image: /assets/images/XKCD-Self-Description.png
categories:
  - Blog
tags:
  - data science
  - math education
  - mathematics
  - scientific computing
  - statistics
  - visualization
---
[FlowingData](http://flowingdata.com/2015/08/11/real-chart-rules-to-follow/) gave a list of charting rules to follow.  I disagree with one, in that pie charts are never acceptable because it is difficult to perceive the differences in size between one pie chart and another.  This is especially true in 3D plots.  Take this plot, for instance:

{% include figure.html image="samplepiechart.png" alt="An example pie chart" cap="An example pie chart" %}

In this plot, despite the fact there are an equal number of oranges and kiwi (25), the oranges section of the plot is about twice as large as the kiwi section.  Think of it in these terms:  When a plot is printed, a good plot will use twice as much ink to represent a value twice as large and use the same amount of ink to represent the same value.

This is often a problem I see when teaching the statistical portion of [Finite Mathematics](/teaching) or statistics.  During the plotting portion, students will try to make fancier and fancier graphics, and that just doesn't help the case.  So turn off the 3D and avoid the pie chart.  There's nothing a pie chart can do a bar chart doesn't do better:

{% include figure.html image="samplebarchart.png" alt="An example bar chart" cap="An example bar chart" %}

_Image by [Randall Munroe / xkcd](https://xkcd.com/688/)...now that's an effective use of ink._
