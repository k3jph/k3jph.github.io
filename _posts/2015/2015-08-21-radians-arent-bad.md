---
id: 2351
title: "Radians Aren't So Bad"
date: 2015-08-21T17:39:41-04:00
author: k3jph
layout: post
permalink: /2015/08/21/radians-arent-bad/
dsq_thread_id:
  - "4054915038"
image: /assets/images/rings.png
categories:
  - Blog
tags:
  - circles
  - math education
  - mathematics
  - precalculus
  - trigonometry
---
Radians are confusing.  There are [latex] 2\pi[/latex] in a circle, and that's a lot harder to deal with than the 360 degrees.  In fact, it's not even a whole number, and that means half a circle is [latex] \pi[/latex] radians, which is okay, but the familiar 30-60-90 triangle has angles of [latex] \frac{1}{6}[/latex] and [latex] \frac{1}{3}[/latex] radians.  And things get harder and harder from there.  But if you've ever had a fancier calculator, you remember it either worked in radians or had a mode switch somewhere, and this was a problem in high school, right?  So what are radians and why do mathematicians like them?

First, degrees are messy.  There are 360 of them in a circle, but there's no good reason why.  It has to do with how some ancient calendars measured the year.  Of course, there are some nicieties like the easy division of 360 by a lot of numbers.  And we use degrees for lots of stuff, most notably, latitude and longitude.  But that 360 rubs measurement nerds the wrong way...it's just so arbitrary.

The radian is the [SI unit](https://en.wikipedia.org/wiki/International_System_of_Units) for measuring angles, like the meter is for distance.  But it is a derived unit.  It's not based on a fundamental constant of the universe, like how long it takes [light to travel a certain distance](https://en.wikipedia.org/wiki/Metre), but is instead derived from a different fundamental constant of the universe, the ratio ratio of the diameter of a circle to its circumference.  First, imagine a circle of radius [latex] r[/latex].  The radian is how big of an angle we need to cut an arc that is has a length of [latex]r[/latex].  In other words, how do we get a wedge of cake that is the same length, straight or curved doesn't matter, on all sides?  That's a radian.  Check out this excellent animation from Wikipedia:

{% include figure.html image="Circle_radians.gif" cap="By Lucas V. Barbosa, via Wikimedia Commons" %}

So how do we end up with [latex] 2\pi[/latex] radians in a circle?  Well, there are two famous formulae for circles.  First is the area, which is [latex] A = \pi r^2[/latex].  That one isn't important right now.  The second is for the circumference, which is [latex] C = d\pi[/latex] where [latex]d[/latex] is the diameter of the circle, something we can measure.  But the diameter is just twice the radius, so the [latex] C = d\pi = 2r\pi[/latex].  So how many times the radius go into the diameter?  Right, [latex] \frac{C}{r} = 2\pi[/latex] and that's why there are [latex] 2\pi[/latex] radians in a circle.

Because the radian is the ratio of two distances, the unit itself is dimensionless, just like the [decibel](https://jameshoward.us/decibels).  So an angle is simply [latex] \frac{\pi}{2}[/latex] (a right angle), but frequently radians or "rad" are added for clarity.  

_Image by [Creativity103 / Flickr](https://www.flickr.com/photos/creative_stock/5158135192/)._
