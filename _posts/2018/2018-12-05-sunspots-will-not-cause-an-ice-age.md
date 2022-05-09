---
id: 6566
title: Sunspots Will Not Cause an Ice Age
date: 2018-12-05T12:43:36-05:00
author: k3jph
layout: post
permalink: /2018/12/05/sunspots-will-not-cause-an-ice-age/
image: /assets/images/sunspots-will-not-cause-an-ice-age.jpg
categories:
  - Blog
tags:
  - climate change
  - environmental studies
  - heliophysics
  - solar cycle
  - SciServer
---
I grew up in this small town in Ohio called Hamilton. [I've talked
about it here, before.](/2016/06/02/femas-flood-maps-not-scam/) I'll
let you draw your own conclusions. The _Journal-News_
is the local daily newspaper, something we don't see a lot of here
in Maryland. But it is pretty common when you head further west and
the kinds of comments on the newspapers' websites are from people
who couldn't cut it as [Yahoo!
commenters](http://affinitymagazine.us/2018/01/05/why-yahoos-comment-sections-are-filled-with-hatred-and-bigotry/).

Last week the paper ran a story on climate change:

<blockquote class="embedly-card" data-card-key="66f8489580e04fc4a88a724eb5058bb3" data-card-branding="0" data-card-type="article-full"><h4><a href="https://www.journal-news.com/news/national/trump-steadily-undoing-efforts-curbing-climate-change-amid-dire-warnings/EoVQhDCKcgJHff9tGRUY3H/">Trump steadily undoing US efforts at curbing climate change amid dire warnings</a></h4><p>Read more trending news In addition to gutting regulations on oil, coal and gas emissions over the past two years, Trump moved to pull the U.S. out of the Paris Climate Agreement and even said outright that he didn't believe the conclusions of a major report on the critical consequences of climate change issued Friday by 13 government agencies from his own administration.</p></blockquote>
<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>

Needless to say, the [comments on
Facebook](https://www.facebook.com/journalnews/posts/10160954275195408)
were a hotbed of intellectual achievement. One of the most amusing
comments went like this:

> Recent evidence based studies also suggest we are about to
experience a mini ice age due to sun spot activity.

So, that's the level of scientific ignorance out there. But let's
talk about it anyway! A few things to observe here. First of all,
let's take a look at the global temperature anomaly. As we can see
from the plot below ([data from
NOAA](https://www.ncdc.noaa.gov/cag/global/time-series/globe/land_ocean/ytd/12/1979-2018)),
the mean global temperature is increasing.

{% include figure.html image="global-temperature-anomaly-C.png" alt="The mean global temperature is increasing" width="100%" %}

And it is increasing due to the greenhouse effect. I used 1979 as
the starting year since that is the year I was born. Conveniently,
1979 was the peak of Solar Cycle 21 and we are expected to be
starting Solar Cycle 25 right now. So we've seen 3 complete solar
cycles since 1979 and we take an initial look at the mean daily
sunspot count per year, to see where they are going ([data from
SILSO](http://sidc.oma.be/silso/datafiles)).

{% include figure.html image="sunspots-mean.png" alt="Sunspot activity is highly cyclical " width="100%" %}

As we can see, sunspot activity is highly cyclical and there's no
similar cyclical pattern to the global temperature anomaly. And it
is not hard to see why. We can use the [Stefan-Boltzmann
law](https://www.sciencedirect.com/topics/earth-and-planetary-sciences/stefan-boltzmann-law)
to understand how much the Sun heats the Earth.

The Stefan-Boltzmann law states,

{% include eqn.html eqn="T_e = [\frac{S(1 - \alpha)}{4\sigma}]^{1/4}s" %}

giving the effective [blackbody
temperature](http://astronomy.swin.edu.au/cosmos/b/blackbody+radiation) of
the Earth where [latex] \sigma[/latex] is the Stefan-Boltzmann constant
([latex]5.67\times 10^{-8} W/m^2-K^4[/latex]), [latex]\alpha[/latex] is the Earth's
mean
[albedo](http://hyperphysics.phy-astr.gsu.edu/hbase/phyopt/albedo.html)
(0.31), and [latex]S[/latex] is the solar constant, how much energy is
received from the Sun ([latex]1370 W/m^2[/latex]). You do the math and
this turns out to be 254.087°K or about -19°C. That's a bit cold,
even for me. The earth is generally much warmer than this because
of the greenhouse effect. The baseline temperature of the Earth,
the zero of the first plot above, is 288°K. So there's an expected
greenhouse effect of 34°C. The anomaly is lifting us above that.

We know there's a peak-to-peak variance, during the solar cycle,
[of 0.1%](https://www.nature.com/articles/351042a0). That means
[latex]S[/latex] will vary from 1368.63 to 1371.37 [latex]W/m^2[/latex]. Now,
there's some variation in the estimate of total solar power, and
those are dependent on where you measure. It doesn't really matter
since [latex]1370 W/m^2[/latex] is the theoretical amount and we are trying
to find the theoretical change in global temperature due to the
solar cycle. Plugging these values into the Stefan-Boltzmann law,
we find that the blackbody temperature range of Earth is 254.023°K
at the low end and 254.150°K at the high end. That's a difference
of 0.127°C. That's really the total spread we can expect in global
temperature changes due to the solar cycle. And the difference
between the mean and the high is 0.063°C. This is the theoretical
maximum. Any real difference is going to be smaller.

In 2017, which was far from the solar maximum, but we will just
pretend it was the worst, the global temperature anomaly was 0.85°C
and there's 0.787°C of heating that solar cycles just don't account
for. And the idea that an ice age will be caused by a 0.063°C
difference is laughable when you realize the temperature during the
last ice age was [_at least_ 4°C below the global baseline temperature
above](https://earthobservatory.nasa.gov/features/GlobalWarming/page3.php).

So, no. The solar cycle will not change the overall trend and it
certainly will not cause an ice age.

_This work used SciServer, a collaborative research environment for
large-scale data-driven science. It is developed at, and administered
by, the [Institute for Data Intensive Engineering and
Science](http://idies.jhu.edu/) at the Johns Hopkins University.
SciServer is funded by the [National Science Foundation](https://nsf.gov/)
Award ACI-1261715\. For more information about SciServer, please
visit [http://www.sciserver.org](http://www.sciserver.org)._


<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
