---
id: 7266
title: Matrices in the Machine
date: 2020-02-08T08:01:00-05:00
author: k3jph
layout: post
permalink: /2020/02/08/matrices-in-the-machine/
image: /assets/images/pattern-metal-pipes-grid-35543.jpg
categories:
  - Blog
tags:
  - c
  - CMNA
  - numerical analysis
---
No matter what we consider the internal representation, the data
will be stored linearly in memory. If we are using a programming
language like
[C](https://www.amazon.com/Programming-Language-2nd-Brian-Kernighan/dp/0131103628),
we would use something like this to define a two-dimensional array
for a 2x2 matrix:

{% highlight c %}
float matrix[2][2];
{% endhighlight %}

Now, there's a lot of different ways to represent this, so let's
say this is without loss of generality. This would give us four
consecutive memory locations. Even if we think of it as a 2D array,
some sort of call like `matrix[2]` is equivalent to `matrix[1][0]`.
Same in any C-like language, such as C++ or Java.

I have no idea how it works in Fortran. But for a lot of interpreted
languages, R, Python, MATLAB, etc, memory organization is kind of
irrelevant. We are not going to access memory directly like we would
in C. I just hope those languages can keep better track of the
structures than I can.
