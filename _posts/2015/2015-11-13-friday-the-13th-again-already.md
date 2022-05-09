---
id: 3212
title: Friday the 13th, Again Already
date: 2015-11-13T00:01:09-05:00
author: k3jph
layout: post
permalink: /2015/11/13/friday-the-13th-again-already/
dsq_thread_id:
  - "4313698931"
image: /assets/images/270007412_37c6fabf50_z.jpg
categories:
  - Blog
tags:
  - calendars
  - math education
  - mathematics
  - superstition
---
Last week, I was in a convenience store and the owner was watching a gameshow.  I think it was [Who Wants to be a Millionaire](http://millionairetv.dadt.com/), but I am not sure.  I am also not sure I heard the question right, but I think it was,

> This day of the month is more likely to land on a Friday than any other day of the week.

Of course, you're supposed to think of [the 13th](https://en.wikipedia.org/wiki/Friday_the_13th).  But I think, that can't be right.  Why would that happen?  The calendar is not so unusual.  If I had read the Wikipedia page before, it would have told me that for any given 400-year cycle (covering all of the Gregorian leap day rules), it's true.  

But I scienced it, instead.

First, I tried working over a perpetual calendar, but the one I had had small print and it was too difficult to read.  I kept getting lost.  Then I decided a statistical argument was sufficient to meet my need, so I was about to Monte Carlo it.  I really wanted a lot of points, and I figured I'd have to check about a million months.  Then I realized just how many months that is.  

Realizing the 400 year-cycle limited the possible options anyway, and that is only 4800 months, checking a million or more random months seemed excessive.  So I wrote this program:

{% highlight r %}
library(lubridate)

year.start <- 2000
year.end <- 2399
day13 <- rep(0, 7)

for(i in year.start:year.end) {
  for(j in 1:12) {
    thedate <- paste(j, "13", i, sep = "/")
    thedate.dt <- as.Date(thedate, "%m/%d/%Y")
    dow <- wday(thedate.dt)
    day13[dow] <- day13[dow] + 1
  }
}

print(day13)
{% endhighlight %}

And I get the output,

{% highlight r %}
[1] 687 685 685 687 684 688 684
{% endhighlight %}

And that agrees with Wikipedia, which tells me I should have looked there, first.  But if you're feeling a bit unlucky on the 13th, and it's a Friday, and you feel like it comes around more often than it should...you'd be right.

_Image by [Katherine / Flickr](https://www.flickr.com/photos/chatiryworld/270007412/)._
