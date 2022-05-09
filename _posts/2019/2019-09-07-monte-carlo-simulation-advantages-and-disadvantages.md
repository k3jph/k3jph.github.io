---
id: 7085
title: Monte Carlo Simulation Advantages and Disadvantages
date: 2019-09-07T14:35:51-04:00
author: k3jph
layout: post
permalink: /2019/09/07/monte-carlo-simulation-advantages-and-disadvantages/
image: /assets/images/ahh-monte-carlo.jpg
categories:
  - Blog
tags:
  - Monte Carlo simulation
  - probability
  - simulation
  - statistics
  - SciServer
---
There are a number of advantages and disadvantages to Monte Carlo
simulation (MCS). First of all, though, we need to understand what
MCS is. MCS is best described as a way of estimating uncertainty
in a model, and it works really well in nonlinear and [chaotic
models](https://en.wikipedia.org/wiki/Dynamical_systems_theory).
The idea is that if we know there are a number of components going
into a model and those components each have some sort of random
aspect to them, we can find the full range of potential outcomes
by simulating each component outcome and understanding how it changes
the overall model. In addition, looking at all the final outcomes
allows us to see the distribution of results.

The reasons for using MCS are numerous. First of all, it can address
questions that are [analytically
intractable](https://www.researchgate.net/publication/331160732_Transforming_analytically_intractable_dynamical_systems_with_a_control_parameter_into_a_tractable_Ginzburg-Landau_equation_few_illustration).
Another advantage is that MCS can, given the correct parameters,
completely survey the parameter space of a problem. Finally, the
results of an MCS are relatively easy to understand, provided an
individual point estimate of the result is also easy to understand.

The biggest argument against MCS is probably the computational
requirements involved. Even for a small simulation, I ran for a
[forthcoming
paper](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3381700), it
took 3 hours on a [2400-core
supercomputer](https://ucsdnews.ucsd.edu/pressrelease/sdscs_comet_supercomputer_extended_into_2021).
In another case, without results ready yet, I used 8 hours on a
[24-core node](http://www.sciserver.org/) just to run a series of
bootstraps. Analytically, the results may be, at best, only a
distribution. MCS may not accurately reflect [fat tails in the
outcome
space](https://www.forbes.com/sites/wadepfau/2016/06/13/the-advantages-of-monte-carlo-simulations/#3347f49d40c6).
It should go without saying that if bad distributions and parameters
are given as input, the output will be garbage.

While MCS can help, and increases in computational power have made
them more feasible for everyday use, like any statistical tool,
they have to be interpreted correctly. That means, more than anything,
understanding exactly what went into the model and what is coming
out. But that's true of every regression, analysis, and summary
statistic we do, too.

_This work used SciServer, a collaborative research environment for
large-scale data-driven science. It is developed at, and administered
by, the [Institute for Data Intensive Engineering and
Science](http://idies.jhu.edu/) at the Johns Hopkins University.
SciServer is funded by the [National Science Foundation](https://nsf.gov/))
Award ACI-1261715. For more information about SciServer, please
visit [http://www.sciserver.org](http://www.sciserver.org)._

_This work used the Extreme Science and Engineering Discovery
Environment (XSEDE), which is supported by National Science Foundation
grant number ACI-1548562. In particular, it used the Comet system
at the San Diego Supercomputing Center (SDSC) through allocations
TG-DBS170012 and TG-ASC150024._
