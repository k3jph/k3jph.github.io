---
id: 4311
title: NaN versus NA in R
date: 2016-07-18T06:51:53-04:00
author: k3jph
layout: post
permalink: /2016/07/18/nan-versus-na-r/
dsq_thread_id:
  - "4991418646"
ampforwp_custom_content_editor_checkbox:
  - ""
instant_articles_submission_id:
  - "204056390074161"
image: /assets/images/divid-by-zero.jpg
categories:
  - Blog
tags:
  - CMNA
  - data science
  - mathematics
  - missing data
  - R
  - scientific computing
  - statistics
---
R has two different ways of representing missing data and understanding
each is important for the user.  `NaN` means "not a number" and it
means there is a result, but it cannot be represented in the computer.
The second, `NA`, explains that the data is just missing for unknown
reasons.  These appear at different times when working with R and
each has different implications.

`NaN` is distinct from `NA`.  `NaN` implies a result that cannot
be calculated for whatever reason, or is not a floating point number.
Some calculations that lead to `NaN`, other than [latex]0 / 0[/latex],
are attempting to take a square root of a negative number, or perform
calculations with infinities that lead to undefined results:

{% highlight r %}
> sqrt(-1)
[1] NaN
Warning message:
In sqrt(-1) : NaNs produced
> Inf - Inf
[1] NaN
{% endhighlight %}

However, adding two infinities produces infinity:

{% highlight r %}
> Inf + Inf
[1] Inf
{% endhighlight %}

`NA` is different from `NaN` in that `NA` is not a part of the IEEE
standard for floating point numbers. `NA` is a construction of R
used to represent a value that is not known, as a placeholder.  `NA`
says no result was available or the result is missing.  It can be
used in a matrix to fill in a value of a vector:

{% highlight r %}
> c(1, 2, 3, 4, NA, 5, 6)
[1]  1  2  3  4 NA  5  6
> matrix(c(1, 2, NA, 4, NA, 6, NA, 8, 9), 3)
[,1] [,2] [,3]
[1,]    1    4   NA
[2,]    2   NA    8
[3,]   NA    6    9
{% endhighlight %}

Any operation with `NA` results in `NA`:

{% highlight r %}
> 1 + NA
[1] NA
> sqrt(NA)
[1] NA
> NA + NaN
[1] NA
{% endhighlight %}

**Update:** David Smith at Microsoft covered NAs [in a blog post today, too](http://blog.revolutionanalytics.com/2016/07/understanding-na-in-r.html).

_Image by [Torindkflt / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:TI86_Calculator_DivByZero.jpg)._
