---
id: 4242
title: Thoughts on Monty Hall
date: 2016-07-02T07:03:37-04:00
author: k3jph
layout: post
permalink: /2016/07/02/thoughts-monty-hall/
dsq_thread_id:
  - "4955381871"
image: /assets/images/800px-Monty_open_door.svg_.png
categories:
  - Blog
tags:
  - Bayes theorem
  - game shows
  - mathematics
  - Monty Hall problem
  - popular mathematics
  - risk
  - risk analysis
  - statistics
---
Perhaps the less said about the Monty Hall Problem, the better, as
many barrels of ink have been spilt in debate over the correct
solution.  The Monty Hall Problem is a standard problem from
statistics to show the different results between statistical reasoning
and intuitive responses.  Due to the different results, the problem
is occasionally called the [Monty Hall
dilemma](https://www.researchgate.net/publication/8359211_The_Collider_Principle_in_Causal_Reasoning_Why_the_Monty_Hall_Dilemma_Is_So_Hard)
or the [Monty Hall
paradox](http://heinonline.org/HOL/LandingPage?handle=hein.journals/mercer62&div=50&id=&page=),
though it is neither a dilemma nor a paradox.  The problem comes
from an old game show called _Let's Make a Deal_ and the standard
form of the problem was given by [Craig Whitaker in a question to
Marylin vos Savant's _Ask Marylin_
column](http://marilynvossavant.com/game-show-problem/):

> Suppose you're on a game show, and you're given the choice of
three doors: Behind one door is a car; behind the others, goats.
You pick a door, say No. 1, and the host, who knows what's behind
the doors, opens another door, say No. 3, which has a goat. He then
says to you, "Do you want to pick door No. 2?" Is it to your advantage
to switch your choice?

Supposedly, the intuitive approach is that when presented with two
doors, there is an equal probability that either door conceals the
prize.  When analyzed statistically, the results are startlingly
different.  Before any door is opened, each door has a one-third
probability of concealing the prize.  Regardless of which door the
contestant selects, the contestant has a one-third probability of
winning the price.  The probability that the prize is behind one
of the two remaining doors is, obviously, two-thirds.

Then one of the two remaining doors is opened and after opening,
the probability that the prize is behind an unselected door is still
two-thirds.  The unselected and unopened door has, in a sense,
absorbed the initial probability of the opened door and the probability
that it conceals the prize is now two-thirds.  The probability that
the door initially selected conceals the prize is one-third, just
as it was at the start.  As [described by Keith
Devlin](http://www.maa.org/external_archive/devlin/devlin_07_03.html),
Monty Hall effectively says,

> There are two doors you did not choose, and the probability that
the prize is behind one of them is 2/3. I'll help you by using my
knowledge of where the prize is to open one of those two doors to
show you that it does not hide the prize. You can now take advantage
of this additional information. Your choice of door A has a chance
of 1 in 3 of being the winner. I have not changed that. But by
eliminating door C, I have shown you that the probability that door
B hides the prize is 2 in 3.

The contestant would be wise to take advantage of this information.
Therefore, it is always advantageous to switch and the switching
player will win two out of every three tries.  In practice, a player
only gets one shot at the game, but that is [beyond the scope of
the problem](http://www.jstor.org/stable/40664911).

Vos Savant published the question and result in her column in
_Parade_ magazine, a weekly newspaper magazine published in newspapers
around the country.  The result caused an uproar as mathematicians,
statisticians, and everyone else wrote in to claim there is no
advantage is switching results.  However, vos Savant was correct
in her original analysis, a result that can be [verified trivially
with Monte Carlo
simulation](http://www.r-bloggers.com/a-monty-hall-monte-carlo-part-1-oh-god/)
or proof by exhaustion, as vos Savant did it, as there are only 18
cases.

However, the problem, rightly, challenges our ability to think
critically, illustrates our inability to assess risk and conditional
probabilities using intuitive thinking.  The problem has been studied
extensively in experimental psychology in an attempt to understand
why.  The results suggest that [better statistical training and
less focus on
Bayesian](http://usd-apps.usd.edu/xtwanglab/Papers/MontyHallPaper.pdf)
results in better play among novice players.  However, when variants
of the problem present more door options to the contestant, they
[have a tendency to amortize the probability of a prize across all
remaining
doors](http://www.auburn.edu/~amf0001/Reprints/franco-watkins,derks%20&%20dougherty%202003.pdf),
rather than correctly assessing the probability for the door selected
and alternatives.

Accordingly, the difficulty in assessing the problem and the training
required to come to the correct conclusion stress the difficulty
in both causal reasoning and risk assessment.  In addition, the
impact assessment for each option is also rarely taken into account.

_Image by [Cepheus /
Wikimedia](https://commons.wikimedia.org/wiki/File:Monty_open_door.svg)._
