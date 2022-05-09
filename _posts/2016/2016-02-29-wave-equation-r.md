---
id: 3746
title: The Wave Equation in R
date: 2016-02-29T10:54:50-05:00
author: k3jph
layout: post
permalink: /2016/02/29/wave-equation-r/
dsq_thread_id:
  - "4622175208"
image: /assets/images/violin.png
categories:
  - Blog
tags:
  - analysis
  - CMNA
  - differential equations
  - mathematics
  - numerical analysis
  - partial differential equations
  - scientific computing
---
The wave equation is a classic example of a partial differential equation. It comes in several variants and has applications beyond the name. In principle, the wave equation describes the path of a wave traveling through a medium. For a one-dimensional wave equation, this describes a wave traveling on a string, like a violin's string. In two-dimensions, the wave equation describes a wave on a membrane, like a drumhead. And for three dimensions, it describes the propagation of sound through the air. The equation can also describe light waves.

For our purposes, we will look at a one-dimensional light wave using a second-order differential equation. And to further simplify the problem, we will assume the string being modeled is fixed at both ends. This is the same circumstance as a string on a musical instrument, or a jumprope with the ends held in place.

This process is implemented in `wave`, shown in a moment. We take an approach here that instead of generating a first second step using the simpler method, we actually take a step backwards and create a ``zeroth'' step, as shown in the function. This helps with bookkeeping, rather than forcing a recording of both the first and second steps, before entering the loop, we record the first and continue into the loop for [latex]n[/latex] steps. Inside the loop, the step is broken down into three distinct parts and the next [latex]u[/latex] iteration is assembled from those parts. Then it is recorded in the output array and both the previous and current iterations are incremented.

{% highlight r %}
wave <- function(u, alpha, xdelta, tdelta, n) {
    m <- length(u)
    uarray <- matrix(u, nrow = 1)
    newu <- u

    h <- ((alpha * tdelta) / (xdelta))^2

    ## Initial the zeroth timestep
    oldu <- rep(0, m)
    oldu[2:(m - 1)] <- u[2:(m - 1)] + h *
        (u[1:(m - 2)] - 2 * u[2:(m - 1)] + u[3:m]) / 2

    ## Now iterate
    for(i in 1:n) {
        ustep1 <- (2 * u - oldu)
        ustep2 <- u[1:(m - 2)] - 2 * u[2:(m - 1)] + u[3:m]
        newu <- ustep1 + h * c(0, ustep2, 0)
        oldu <- u
        u <- newu
        uarray <- rbind(uarray, u)
    }

    return(uarray)
}
{% endhighlight %}

We can see this at work in the following example. Of interest, we set the initial state in $u$ to be a partial sine wave. The left side, the lower half of the array, is the positive half of a sine wave. The right half is zeroed out, leading to a wave that travels down the string. The process fixes the ends of the string at zero, making them unmoving. The wave will reach the end of the line and bounce back to the start.

{% highlight r %}
speed <- 2
x0 <- 0
xdelta <- .05
x <- seq(x0, 1, xdelta)
m <- length(x)
u <- sin(x * pi * 2)
u[11:21] <- 0
tdelta <- .02
n <- 40
z <- wave(u, speed, xdelta, tdelta, n)</pre>
{% endhighlight %}

The image below comes from animating the output.

{% include figure.html image="output_pwVyzg.gif" alt="Wave on a String" cap="Wave on a String" %}

_Cover image by [Wills16 / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Ruthin_School_Uploads_19.jpg)._
