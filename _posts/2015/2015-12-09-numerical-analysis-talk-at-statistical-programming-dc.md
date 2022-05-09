---
id: 3325
title: Numerical Analysis talk at Statistical Programming DC
date: 2015-12-09T00:01:55-05:00
author: k3jph
layout: post
permalink: /2015/12/09/numerical-analysis-talk-at-statistical-programming-dc/
dsq_thread_id:
  - "4388044602"
ampforwp_custom_content_editor_checkbox:
  - ""
image: /assets/images/nair-840x500.png
categories:
  - Blog
tags:
  - CMNA
  - data science
  - mathematics
  - matlab
  - numerical analysis
  - R
  - scientific computing
  - talks
  - videos
---
I gave my talk tonight on numerical analysis in R and the talk is already up on YouTube.  

{% include youtube.html id="BmH9iZ-w4PQ" %}

There's an interesting set of questions at the end about resources for introducing new users to R.  The slides are not terribly visible, so you can see them here:

<iframe src="//www.slideshare.net/slideshow/embed_code/key/3LbvZGBzptYZJm" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/jameshoward/numerical-analysis-in-r-55960098" title="Numerical Analysis in R" target="_blank">Numerical Analysis in R</a> </strong> from <strong><a href="https://www.slideshare.net/jameshoward" target="_blank">James Howard</a></strong> </div>
And this is the R script used for demonstrations:

{% highlight r %}
## Example of vector arithmetic
u <- c(1, 2, 3); v <- c(8, 4, 2); x <- 7
u + x
u + v

## Element recycling
u + c(1, 9)

## Matrix arithmetic
A <- matrix(1:9, 3)
A + 1
A + u
A + c(1, 2)

## Diagonalization
(B <- matrix(1:6, 3))
diag(A)
diag(B)

## Matrix multiplication
A %*% B

## Cross product 
crossprod(A, B)

## Outer product
outer(u, v)

## dot product
u %*% u 

## Matrix solution / RREF
(A <- matrix(c(2, 3, 1, 1, 2, -5, -1, -2, 4), 3))
(b <- c(1, 1, 3))
solve(A, b)

## LU Decomposition
library(Matrix)
lu(A)

## Linear interpolation
x <- 1:10
y <- log(x)
plot(x, y, main = &quot;approxfun demo&quot;)
par(new = TRUE)
flog <- approxfun(x, y)
plot(flog, 1, 10, col = &quot;blue&quot;)

## Spline
x <- seq(-10, 10, 4)
y <- x^2 + 5 * x - 3
plot(x, y, main = &quot;splinefun demo&quot;)
par(new = TRUE)
linfun <- approxfun(x, y)
plot(linfun, -10, 10, col = &quot;blue&quot;)
par(new = TRUE)
linfun <- splinefun(x, y)
plot(linfun, -10, 10, col = &quot;green&quot;)

## Polynomial interpolation
polyinterp <- function(x, y) {
  if(length(x) != length(y))
    stop(&quot;Length of x and y vectors must be the same&quot;)
  
  n <- length(x) - 1
  vandermonde <- rep(1, length(x))
  for(i in 1:n) {
    xi <- x^i
    vandermonde <- cbind(xi, vandermonde)
  }
  beta <- solve(vandermonde, y)
  
  names(beta) <- NULL
  return(rev(beta))
}

x <- c(1, 2, 3)
y <- x^2 + 5 * x - 3
z <- polyinterp(x, y)

rhorner(1, z)

## Integration
integrate(log, 2, 6)
integrate(flog, 2, 6)

## Root Finding
## x^2 + x - 6
f <- function(x) { (x + 3) * (x - 2) }             
plot(f, -5, 5, col = &quot;blue&quot;)
abline(h = 0, v = 0, col = &quot;black&quot;, lty = &quot;dotted&quot;) 
uniroot(f, c(-5, 0))

z <- c(-6, 1, 1)
polyroot(z)

## x^2 + x + 6
z <- c(6, 1, 1)
polyroot(z)

## Horner's method
rhorner <- function(x, betas) {
  n <- length(betas)
  
  if(n == 1)
    return(betas)
  
  return(betas[1] + x * rhorner(x, betas[2:n]))
}

rhorner(z, 5)
{% endhighlight %}

Many thanks to [Marck Vaisman](https://about.me/marckvaisman) for putting this together and [Casey Patrick Driscoll](https://caseypatrickdriscoll.com/) for putting it on YouTube!
