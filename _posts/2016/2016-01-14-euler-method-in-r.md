---
id: 3704
title: Euler Method in R for the Initial Value Problem
date: 2016-01-14T21:52:33-05:00
author: k3jph
layout: post
permalink: /2016/01/14/euler-method-in-r/
dsq_thread_id:
  - "4493535013"
image: /assets/images/Euler_method.svg_.png
categories:
  - Blog
tags:
  - analysis
  - CMNA
  - initial value problems
  - mathematics
  - numerical analysis
  - ordinary differential equations
  - real analysis
  - scientific computing
---
During differentiation, the value of whatever vertical shift is present is lost as a result of the elimination of the constant term, which has a derivative of 0.  We normally acknowledge this when integrating a function by adding a [latex]+ C[/latex] constant, the constant of integration, to an indefinite integral.  This is sometimes a nonissue since, if finding the value of a definite integral, the constant terms cancel and the constant of integration is unnecessary.

For ordinary differential equations, them there is no convenient cancellation, leading to the initial value problem.  The initial value problem provides a value of [latex]f(x_0)[/latex], where [latex]x_0[/latex] is normally 0, but is not required to be.  This initial value provides sufficient information to complete the solution and find the actual value of [latex]f(x)[/latex] for some value of [latex]x[/latex].  Below is an implementation of the Euler method in R.

{% highlight r %}
euler <- function(f, x0, y0, h, n) {
    x <- x0
    y <- y0

    for(i in 1:n) {
        y0 <- y0 + h * f(x0, y0)
        x0 <- x0 + h
        x <- c(x, x0)
        y <- c(y, y0)
    }
    
    return(data.frame(x = x, y = y))
}
{% endhighlight %}

_Image by [Oleg Alexandrov via Wikipedia Commons](https://commons.wikimedia.org/wiki/File:Euler_method.svg)._
