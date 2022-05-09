---
id: 1673
title: Radiolab loses at statistics
date: 2014-11-30T14:14:11-05:00
author: k3jph
layout: post
permalink: /2014/11/30/radiolab-loses-statistics/
image: /assets/images/coinflip.png
dsq_thread_id:
  - "3277316953"
categories:
  - Blog
tags:
  - bad math
  - fair coin
  - math education
  - mathematics
  - statistics
---

[Radiolab has a show on randomness](http://www.radiolab.org/story/91684-stochasticity/) (the embed feature doesn't work) where they discuss an experiment of flipping a coin 100 times.  A string of tails appeared 7 times, which seems to be relatively small.  Indeed, given 7 coin tosses, the probability of all 7 coming up tails is 

{% include eqn.html eqn="\frac{1}{2^7} = \frac{1}{128} \approx 0.007812 \text{.}" %}

As an aside, the probability of all coming up the same side is [latex]\frac{1}{2^6}[/latex] because the initial toss does not matter.  All that matters is that all subsequent tosses match.

The discussion sets up an experiment where one group flips a coin 100 times and a second group says they flip a coin 100 times and each reports the results.  A statistics professor can then tell the difference because the group that actually flipped the coin got a string of 7 tails which seems unlikely, but is more likely than you think.  The show notes that the probability of getting 7 tails is 1 in 6 because there are 14 groups of 7 in 100.  Which in one sense is true.  But with overlap, there are 94 groups of 7 any one of which can be all tails.  So the probability of getting a string of exactly 7 tails is really

{% include eqn.html eqn="1 - \big(\frac{127}{128}\big)^{94} \approx 0.521576 \text{.}"  %}

Or just more than half of all sets of 100 flips will contain a string of 7 tails.  And if we can allow that we don't care about whether the string of 7 is either heads or tails, the probability jumps to more than three-quarters:

{% include eqn.html eqn="1 - \big(\frac{63}{64}\big)^{94} \approx 0.772440 \text{.}" %}

These are all a lot more than the 1 in 6 Radiolab claims.
