---
id: dimensionality-reduction-through-svd
title: Dimensionality Reduction Through SVD
date: 2020-04-12T20:11:00-04:00
author: k3jph
layout: post
permalink: /2020/04/11/dimensionality-reduction-through-svd/
image: /assets/images/dimensionality-reduction-through-svd.png
categories:
  - Blog
tags:
  - linear algebra
  - machine learning
  - data science
  - matrix theory
---

[Singular value decomposition
(SVD)](https://mathworld.wolfram.com/SingularValueDecomposition.html) is
something I found challenging when I took linear algebra as an
undergraduate, decades ago.  It's complicated.  It's hard to
calculate.  And there's no reason for it, as introduced at the
undergraduate level.

It was not until some years later that I realized it had an interesting
application in my work: dimensionality reduction.  Doing a lot of
machine learning, this is relevant to my interests.  To a point.
When doing machine learning, we like to push harder and harder on
adding more and more data to the analysis.  Can we find something
that influences our predictions to give us just another point of
accuracy.  There's a downside to this, and that is the models, as
they get wider, get harder to compute.

SVD spreads the values of the matrix all across the matrix, so
eliminating some columns still gives some of the data coming through.
This allows for dimensionality reduction.  Think of it like applying
a projection from [latex]n[/latex] dimensions to [latex]n-k[/latex],
except the mathematics is different.  It makes for faster computations
without much loss of information.

All of this comes with the downside of [losing
explainability](https://medium.com/@Zelros/a-brief-history-of-machine-learning-models-explainability-f1c3301be9dc).
Coming from a social science background, I like to make sure my
models make sense.  That is, if people have more money, they spend
more money.  That makes sense.  If carbon in the atmosphere goes
up, the temperature goes up.  That, again, makes sense.  Causal
theory is a thing.

But most of the dimensionality reductions run the data through a
meat grinder.  We cannot figure out what contributes to the solution.
That kills explainability and makes these models difficult to justify
in practice.
