---
id: the-lotka-volterra-equations
title: The Lotka–Volterra Equations
date: 2020-05-31T16:58:00-04:00
author: k3jph
layout: post
permalink: /2020/05/31/the-lotka-volterra-equations
image: /assets/images/the-lotka-volterra-equations.jpg
categories:
  - Blog
tags:
  - mathematics
  - differential equations
  - ecology
  - environmental science
  - CMNA
---

My favorite set of differential equations are the Lotka-Volterra
equations.  These equations describe predator-prey relationships.
What impresses me the most about them are their complete simplicity:

{% include eqn.html 
 eqn="\begin{align}
  \frac{dx}{dt} &= \alpha x - \beta x \text{, and} \\
  \frac{dy}{dt} &= \delta x y - \gamma y
  \end{align}"
 %}

In these equations, [latex]x[/latex] and [latex]y[/latex] are the
population counts of some prey species and some predator species.
[latex]\frac{dx}{dt}[/latex] and [latex]\frac{dy}{dt}[/latex] are
their respective growth rates.  The Greek describes the relationship
between the two.  Obviously, this is a bit simpler than we might
imagine the reality, but it is, after all, [only a
model](/2017/06/15/model-thinking-when-all-models-are-wrong).  But
I think it is a powerful demonstration of how differential equations
can model dynamic systems with elegance and beauty.

The Python [agent-based modelling platform,
Mesa](https://mesa.readthedocs.io/en/master/), includes a dynamic
system that models the Lotka-Volterra equations in a different way,
but show the relationship through a population of sheep and wolves.
Here's a video of a typical run:

{% include youtube.html id="FcbG8LM7Y-g" %}
