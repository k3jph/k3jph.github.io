---
id: what-is-stochastic-calculus
title: What is Stochastic Calculus?
date: 2023-11-01T21:10:33-04:00
author: k3jph
layout: post
permalink: /2023/11/01/what-is-stochastic-calculus
featured_image: /assets/img/news/what-is-stochastic-calculus.webp
categories:
- Blog 
tags:
- mathematics
- statistics
- calculus
---

Calculus, a branch of mathematics developed independently by [Sir Isaac Newton
and Gottfried Wilhelm
Leibniz](https://www.stemfellowship.org/who-got-there-first-newton-leibniz-and-their-work-on-calculus/)
in the late 17th century, has been instrumental in our understanding of the
natural world. It provides the tools for analyzing and understanding change,
motion, and growth. From engineering and physics to economics and biology, the
impact of calculus is profound and pervasive.

{% include figure.html image="news/Newton.webp" placement="left" width="50%"
cap="This guy had beef with the guy on the other side"
alt="Painting of Isaac Newton" %}
{% include figure.html image="news/Leibniz.webp" placement="right" width="50%"
cap="This guy thought the other guy was off his rocker"
alt="Painting of Gottfried Leibniz" %}

However, classical calculus is primarily deterministic, offering exact solutions
and predictable outcomes. It excels when dealing with well-defined, smooth
functions, but what happens when we introduce randomness and uncertainty into
the equation? Many phenomena in the real world, such as the fluctuation of stock
prices or the motion of particles suspended in a fluid, are inherently
stochastic, or random.

Enter stochastic calculus, a mathematical field designed to extend the concepts
of calculus to random processes. Unlike its deterministic counterpart,
stochastic calculus deals with quantities that evolve over time in a
probabilistic manner. Traditional calculus equations fall short when modeling
these kinds of systems, often leading to inaccuracies or incomplete
representations. Stochastic calculus fills this gap by offering a robust
framework for describing systems influenced by randomness.

Stochastic calculus is a branch of mathematics that focuses on the analysis and
manipulation of stochastic processes--mathematical objects used to describe
systems that evolve over time under the influence of randomness. Whereas
classical calculus provides the machinery to handle deterministic systems (think
[latex]\frac{dy}{dt} = f(y, t)[/latex]), stochastic calculus extends these tools to
handle the randomness present in numerous natural phenomena. One of the
quintessential equations of stochastic calculus is the stochastic differential
equation (SDE) of the form:

$$
dX_t = a(X_t, t) dt + b(X_t, t) dW_t
$$

{% include figure.html image="news/Einstein_1921.webp" placement="right" width="40%"
cap="This guy had a lot to say about Brownian motion"
alt="Picture of Albert Einstein from 1921 in front of a chalkboard" %}

Here, [latex]dX_t[/latex] represents the infinitesimal change in the stochastic
process [latex]X_t[/latex], [latex]a[/latex] and [latex]b[/latex] are functions
defining the drift and diffusion terms, respectively, and [latex]dW_t[/latex] is
an infinitesimal increment of a [Wiener
process](https://www.youtube.com/watch?v=YZL2xdhh7qE), or [Brownian
motion](https://einsteinpapers.press.princeton.edu/vol2-trans/194).

Stochastic calculus was largely developed in the mid-20th century, with
significant contributions from Kiyosi Itô and Ruslan Stratonovich. Itô's
work laid the foundational axioms and results, such as the celebrated Itô's
Lemma, which serves as the chain rule for stochastic calculus:

$$
df(X_t, t) = \left( \frac{\partial f}{\partial x} a + \frac{\partial f}{\partial t} \right) dt + \frac{\partial f}{\partial x} b dW_t
$$

Stratonovich contributed a different interpretation of stochastic integrals,
often used in physics and engineering. [Both interpretations have their merits
and are employed depending on the specific
application](http://www.stat.ucla.edu/~ywu/research/documents/StochasticDifferentialEquations.pdf).

Stochastic calculus serves as the mathematical backbone for fields ranging from
financial mathematics to engineering, offering a coherent framework for
understanding systems that are inherently unpredictable.  Accordingly,
stochastic calculus finds extensive applications in various disciplines, each
harnessing the power of the field to model complex systems infused with
randomness.

In financial mathematics, stochastic calculus plays a pivotal role in option
pricing and risk assessment. The famous [Black-Scholes-Merton
model](https://corporatefinanceinstitute.com/resources/derivatives/black-scholes-merton-model/)
employs stochastic differential equations to determine the fair value of
options. The model incorporates a range of factors, such as volatility and
interest rate, to produce results that have become foundational in the financial
industry.  Furthermore, risk-neutral valuation often uses tools like the
[Girsanov Theorem](https://benjaminwhiteside.com/2022/09/04/girsanovs-theorem/)
to simplify complex pricing problems. These applications have far-reaching
implications for hedging strategies and risk management.

Engineering fields like signal processing and control theory also heavily rely
on stochastic calculus. In [signal
processing](https://ece.uwaterloo.ca/~ece603/outline.html), it helps in the
design of filters that can effectively separate a signal from background noise.
[Stochastic control
theory](https://www.sciencedirect.com/topics/computer-science/stochastic-control)
uses stochastic differential equations to optimize systems that are influenced
by random factors, leading to more robust and adaptable control mechanisms.

In biology, stochastic calculus is used for [modeling population
dynamics](/2020/05/31/the-lotka-volterra-equations) and the [spread of
diseases](/2020/03/14/why-social-distancing-works). The theory allows
researchers to make predictions and understand the random factors affecting
population sizes, like birth and death rates, or the spreading rate of a
contagious disease. These models are invaluable in conservation efforts and
public health planning.

Stochastic calculus serves as an indispensable tool for understanding systems
influenced by random factors. Its mathematical rigor and broad applicability
make it a cornerstone in the scientific community. While the introduction and
basic concepts offer a solid foundation, the field is rich with advanced topics
for further study, including stochastic partial differential equations, jump
processes, and applications in machine learning. As data-driven decision-making
becomes increasingly prevalent, the role of stochastic calculus is poised to
become even more vital across various disciplines.

