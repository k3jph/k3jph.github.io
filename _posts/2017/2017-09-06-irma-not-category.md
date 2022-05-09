---
id: 5467
title: Irma is Not Category 6, but Could be
date: 2017-09-06T13:02:26-04:00
author: k3jph
layout: post
image: /assets/images/irma-not-category-6.jpg
permalink: /2017/09/06/irma-not-category-6/
categories:
  - Blog
tags:
  - environmental science
  - Hurricane Irma
  - meteorology
---
As Hurricane Irma continues to [gain strength](https://climate.nasa.gov/),
some have started calling it a [category 6
hurricane](http://www.digitaljournal.com/tech-and-science/technology/hurricane-irma-is-now-one-of-the-most-powerful-storms-in-history/article/501707).
The problem with this is the scale only goes up to 5.  There are 5
hurricane strength categories and two sub-hurricane strength levels.
We can see those plotted below.

{% include figure.html image="sshwc.png"
   alt="Saffir-Simpson Hurricane Wind Scale"
   cap="Saffir-Simpson Hurricane Wind Scale" %}
   
It is worth asking, if there were a category 6, 7 or even 8, what
would that intensity be?  What the demarcation point?  The plot
shows the scale is not strictly linear.  There's a smallish curve
that tightens the bands at the top of the scale.  In contrast, the
[Richter scale](https://earthquake.usgs.gov/learn/topics/measure.php)
works the other way, broadening the bands as the scale increases.
But let's estimate this curve and figure out where categories 6,
7, and 8 would begin.

We're going to be lazy and use R's `glm` function to find a linear
model and estimate the minimum endpoint of the next three levels:

{% highlight r %}
saffsimp.glm <- glm(minspeed ~ index, data = saffsimp)
summary(saffsimp.glm)
## 
## Call:
## glm(formula = minspeed ~ index, data = saffsimp)
## 
## Deviance Residuals: 
##       1        2        3        4        5        6        7  
## -5.9643   1.0714   5.1071   4.1429   0.1786  -2.7857  -1.7500  
## 
## Coefficients:
##             Estimate Std. Error t value Pr(&gt;|t|)    
## (Intercept)  16.9286     2.2781   7.431 0.000696 ***
## index        10.9643     0.8054  13.613 3.83e-05 ***
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## (Dispersion parameter for gaussian family taken to be 18.16429)
## 
##     Null deviance: 3456.857  on 6  degrees of freedom
## Residual deviance:   90.821  on 5  degrees of freedom
## AIC: 43.806
## 
## Number of Fisher Scoring iterations: 2
{% endhighlight %}

A simple enough model.  Now let's predict for our new categories.
We also truncate the number to an integer just to make the output
a little bit cleaner.

{% highlight r %}
newLevels = c(6, 7, 8)
saffsimp68 <- predict(saffsimp.glm, data.frame(index = newLevels, 
                  row.names = newLevels))
saffsimp68 <- floor(saffsimp68)
print(saffsimp68)

##   6   7   8 
##  82  93 104
{% endhighlight %}

Like the original windspeeds given, these are measured in meters
per second.  That's normal, but not helpful, since the news usually
reports hurricane windspeeds in miles per hour.  So let's do the
conversion.  We know that 1 meter / second equals 2.23694 miles per
hour, so:

{% highlight r %}
saffsimp68 <- floor(saffsimp68 * 2.23694)
print(saffsimp68)

##   6   7   8 
## 183 208 232
{% endhighlight %}

We truncated the conversion, again, to clean the output up just a
bit.  At the time I am writing this, the [National Hurricane
Center](http://www.nhc.noaa.gov/) reports that Hurricane Irma has
maximum sustained winds of 185 miles per hour.  The hypothetical
threshold for a category 6 hurricane is 183 miles per hour.  So
while there is no category 6, if there were, Irma would likely
qualify.
