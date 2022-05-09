---
id: reinforcement-learning-agent-based-models-and-radiation-doses-for-cancer-treatment
title: Reinforcement Learning, Agent-Based Models, and Radiation Doses for Cancer Treatment
date: 2020-11-29T11:11:00-04:00
author: k3jph
layout: post
permalink: /2020/11/29/reinforcement-learning-agent-based-models-and-radiation-doses-for-cancer-treatment
image: /assets/images/reinforcement-learning-agent-based-models-and-radiation-doses-for-cancer-treatment.jpg
categories:
  - Blog
tags:
  - agent-based models
  - reinforcement learning
  - cancer treatment
  - optmization
  - artificial intelligence
---

I have a lot of interest in agent-based models (ABMs), so I searched
up in Google Scholar "reinforcement learning agent based model" and
[got this interesting paper](https://www.sciencedirect.com/science/article/pii/S0378475416300878):

> Jalalimanesh, A., Haghighi, H.S., Ahmadi, A. and Soltani, M., 2017.
Simulation-based optimization of radiotherapy: Agent-based
modeling and reinforcement learning. _Mathematics and Computers in
Simulation_, 133, pp.235-248.

The problem the authors are addressing is how to optimize the dose
of radiation in cancer treatments.  Radiation works by destroying
the DNA of cancer cells, effectively killing them.  Those cells no
longer reproduce, and cancer is destroyed in the patient.  However,
the radiation also destroys the DNA of healthy cells with the same
effect.  The goal of optimizing the dose is to determine how much
radiation to deliver where to maximize the cancer treatment while
minimizing collateral damage to healthy cells.  In this model, the
agent-based model was subject to simulated radiation and the behavior
of the dynamic system observed.  Reinforcement learning was used
then use for optimization.

Here, the authors used agent-based models to simulate the intercellular
dynamics within the area to be targeted.  If you have you are not
familiar with agent-based models, they typically use a very small
number of simple rules to simulate a complex dynamic system.  One
of the most well-known agent-based models is called "[Conway's Game
of Life](https://playgameoflife.com/)," but many more serious
examples exist.  By simulating the individual cells, with a simple
rule set, the complex dynamics of intercellular systems can emerge
naturally in the simulation.  This simplifies the the development
of the intercellular model.

The downside to this approach is that agent-based models can be
quite computationally intensive.  The cost of simulation is often
quite high and because reinforcement learning requires rerunning
the system many, many times, the cost is quite high.  Further, there
are impediments to parallelization from the fact each subsequent
simulation requires updating the overhead model based on the learning
algorithm.  Because of this, the entire system is moderately-coupled.

An alternative approach may be to use Monte Carlo simulation to
decouple the system.  That is, multiple start points can be used
as the starting point and tested for convergence.  Monte Carlo
methods have previously been used with simulated annealing to address
this problem, as the authors note, so this is not entirely unheard of.
I think another way to address this may be to use genetic algorithms
to try to optimize the finding across parallel runs.
