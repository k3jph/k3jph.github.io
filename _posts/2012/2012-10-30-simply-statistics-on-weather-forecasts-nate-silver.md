---
id: 440
title: "Simply Statistics: On weather forecasts, Nate Silver, and the politicization of statistical illiteracy"
date: 2012-10-30T20:59:27-04:00
author: k3jph
layout: post
permalink: /2012/10/30/simply-statistics-on-weather-forecasts-nate-silver/
tumblr_jhresearchlog_permalink:
  - http://jhresearchlog.tumblr.com/post/34654756677/simply-statistics-on-weather-forecasts-nate-silver
tumblr_jhresearchlog_id:
  - "34654756677"
dsq_thread_id:
  - "2262929569"
ampforwp_custom_content_editor_checkbox:
  - ""
categories:
  - Blog
tags:
  - data science
  - innumeracy
  - mathematics
  - R
  - scientific computing
  - statistics
---
[Simply Statistics: On weather forecasts, Nate Silver, and the politicization of statistical illiteracy](http://simplystatistics.org/post/34635539704/on-weather-forecasts-nate-silver-and-the)

[simplystatistics](http://simplystatistics.org/post/34635539704/on-weather-forecasts-nate-silver-and-the):

> As you know, [we](http://simplystatistics.org/post/34483703514/sunday-data-statistics-link-roundup-10-28-12) [have](http://simplystatistics.org/post/33564003058/sunday-data-statistics-link-roundup-10-14-12) a [thing](http://simplystatistics.org/post/29407938554/statistics-statisticians-need-better-marketing) for [statistical literacy](http://simplystatistics.org/post/13684264380/citizen-science-makes-statistical-literacy-critical) here at Simply Stats. So of course this [column over at Politico](http://www.politico.com/blogs/media/2012/10/nate-silver-romney-clearly-could-still-win-147618.html) got our attention (via Chris V. and others). The column is an attack on Nate Silver, [who has a blog](http://fivethirtyeight.blogs.nytimes.com/) where he tries to predict the outcome of elections in the...

I've revised your code for efficiency:

{% highlight r %}
# Set initial parameters
percentObama = 0.505
sdObama = 0.01
n = 1000

# Simulate n elections
simulatedPercentObama = rnorm(n,mean=percentObama,sd=sdObama)

# Calculate the percent of times Obama wins
percentObamaWin = mean(simulatedPercentObama > 0.5)
percentObamaWin
{% endhighlight %}
