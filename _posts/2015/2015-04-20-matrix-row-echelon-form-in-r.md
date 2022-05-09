---
id: 2036
title: Matrix Row Echelon Form in R
date: 2015-04-20T18:43:56-04:00
author: k3jph
layout: post
permalink: /2015/04/20/matrix-row-echelon-form-in-r/
dsq_thread_id:
  - "3698542940"
ampforwp_custom_content_editor_checkbox:
  - ""
image: /assets/images/matrices.jpg
categories:
  - Blog
tags:
  - CMNA
  - data science
  - linear algebra
  - linear equations
  - mathematics
  - matrix algebra
  - numerical analysis
  - R
  - scientific computing
---
For reasons unknown, I can't find a function to transform a matrix into row echelon form in R. There's a function on Rosetta Code for [reduced row echelon form](http://rosettacode.org/wiki/Reduced_row_echelon_form#R) in R. So I wrote this on Sunday. And if you look at this and the Rosetta Code solution, they work in mostly the same way. This will be released as part of a larger package later, with documentation and unit tests. But it's useful enough to stand on its own here.

{% highlight r %}
refmatrix <- function(m) {
    count.rows <- nrow(m)
    count.cols <- ncol(m)
    piv <- 1
    
    for(row.curr in 1:count.rows) {
        if(count.cols > piv) {
            i <- row.curr
            while(m[i, piv] == 0) {
                i <- i + 1
                if(count.rows == i) {
                    i <- row.curr
                    piv <- piv + 1
                    if(count.cols == piv)
                        return(m)
                }
            }
            m <- swaprows(m, row.curr, i)
            for(j in row.curr:count.rows)
                if(j != row.curr) {
                    k <- m[j, piv] / m[row.curr, piv]
                    m <- replacerow(m, row.curr, j, k)
                }
            piv <- piv + 1
        }
    }
    return(m)
}

swaprows <- function(m, row1, row2) {
    row.tmp <- m[row1,]
    m[row1,] <- m[row2,]
    m[row2,] <- row.tmp

    return(m)
}

replacerow <- function(m, row1, row2, k) {
    m[row2,] <- m[row2,] - m[row1,] * k
    return(m)
}
{% endhighlight %}

_Image by [Frédérique Voisin-Demery](https://www.flickr.com/photos/vialbost/16084697841)._
