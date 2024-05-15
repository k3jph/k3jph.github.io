---
id: 1450
title: Computational Methods for Numerical Analysis with R
date: 2015-02-25T21:08:38-05:00
author: James Howard
layout: page
guid: https://jameshoward.us/?page_id=1450
redirect_from:
  - /cmna/
  - /books/cmna/
---

{% include figure.html image="CMNA-cover-300.webp" placement="right" width="30%"
   alt="Computational Methods for Numerical Analysis with R book cover" %}

_Computational Methods for Numerical Analysis with R_ (_CMNA_) is
a treatment of the traditional numerical analysis course using R
as the underlying programming language. The traditional numerical
analysis outline begins with numerical error, then linear algebra,
interpolation, integration, optimization, and differential equations.
In this way, the outline covers the entire introductory mathematical
sequence. This text will be suitable for the advanced undergraduate
student or first-year graduate student. The book will require a
solid understanding of linear algebra, differential and integral
calculus, and differential equations. Students of mathematics,
computer science, physics, engineering, and other mathematically
intensive disciplines will have sufficient background to read and
understand the book.

My motivation for writing this book is the lack of similar materials
in the market. There are several commonly used textbooks that teach
numerical analysis using MATLAB. Others use C or Fortran. MATLAB
is a very expensive program and while available on college campuses,
is not cheap enough for most graduates to purchase. C and Fortran
are inexpensive or free, but require basic programming skills to
manage data input and output, memory, and other tasks that should
not be set upon someone trying to learn a specific set of skills.
R provides a rich environment that students are already familiar
with due to its rapidly growing user base. It is free for all users
and it does not require intensive "environmental management" when
programming, as is required in, for instance, Java.

## Links

*   [Chapman and Hall/CRC's Website](https://www.crcpress.com/9781498723633)
*   [Amazon](https://www.amazon.com/gp/product/1498723632)
*   [Google Books](https://books.google.com/books?id=Wu2CnQAACAAJ)
*   [Goodreads](https://www.goodreads.com/book/show/34454411)
*   [WorldCat](http://www.worldcat.org/oclc/1120511486)

## Errata

*   [April 3, 2019](/assets/files/CMNA-Errata-20190403.pdf)

## Software

The [`cmna`](https://cran.r-project.org/web/packages/cmna/index.html)
R package is available containing all of the algorithms from this
book, and a few extra implementations of interest. You can access
the source code for the `cmna` package at
[GitHub](https://github.com/k3jph/cmna-pkg). Install `cmna` via
[DevTools](https://github.com/hadley/devtools):

{% highlight r %}
devtools::install_github("k3jph/cmna-pkg")
{% endhighlight %}

The `cmna` package is developed using the
[Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
development workflow. To install the development branch, use:

{% highlight r %}
devtools::install_github("k3jph/cmna-pkg", ref = "develop")
{% endhighlight %}

## Bibliographic Information

1. James P. Howard, II, _Computational Methods for Numerical Analysis with R_, ser. Numerical Analysis and Scientific Computing. New York: Chapman and Hall/CRC, 2017.

{% include relatedposts.html tag="CMNA" %}

