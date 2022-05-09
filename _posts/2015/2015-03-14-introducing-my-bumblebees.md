---
id: 1929
title: Introducing My Bumblebees
date: 2015-03-14T13:59:49-04:00
author: k3jph
layout: post
permalink: /2015/03/14/introducing-my-bumblebees/
dsq_thread_id:
  - "3595225297"
image: /assets/images/Bumblebees.png
categories:
  - Blog
tags:
  - artificial intelligence
  - artificial life
  - cellular automata
  - chaos theory
  - emergent behavior
  - mathematics
  - research
  - scientific computing
  - systems science
  - virtual bumblebees
---
During the 1980s, [some researchers abandoned top-down artificial intelligence](http://en.wikipedia.org/wiki/AI_winter) in favor of a bottom-up approach.  One of these bottom up approaches became the field of [artificial life](http://en.wikipedia.org/wiki/Artificial_life).  In 1992 or 1993, I checked out [Artificial Life by Steven Levy](http://www.amazon.com/Artificial-Life-Frontier-Computers-Biology/dp/0679743898) from the [Lane Public Library](http://www.lanepl.org).  In his book, Levy describes much of the research on artificial life to date, including the works of [Stephen Wolfram](http://www.stephenwolfram.com/) and [Christopher Langton](http://en.wikipedia.org/wiki/Christopher_Langton), in a pleasant and accessible way (for a twelve-year old).  

One of Langton's creations captured my attention.  It is called the [virtual ant](http://en.wikipedia.org/wiki/Langton%27s_ant) or sometimes "vant."  The virtual ant is a [cellular automaton](http://en.wikipedia.org/wiki/Cellular_automaton) such that a cell is occupied by the "ant."  If the cell is black, the ant turns 90 degrees to the right and advances a single cell.  If the cell is green, the ant turns 90 degrees to the left and advances a single cell.  After exiting the cell, the ant flips the color of the cell.  This leads to a variety of amazing interactions among multiple ants that effectively replicates eusocial behavior in a number of organisms.  There's an excellent [JavaScript implementation available by Ross Scrivener](http://rossscrivener.co.uk/blog/langtons-ants-in-javascript).  The problem is that Levy accidently described something subtly, and, by and by, completely different:[^levy]

> The vant itself was a V-shapped construct that moved in the direction of its point.  If the lead cell moved into a blank square on the imaginary grid, the vant continued moving in that direction.  If the square was blue, the vant turned right and changed the color of that cell to yellow.  If the square was yellow, the vant turned left and changed the color of the square to blue.

I was like twelve or so, so what did I know about getting the proceedings of an artificial life symposium.  I thought this was cool and it is also [trivial](http://en.wikipedia.org/wiki/Triviality_%28mathematics%29)[^advanced] to show that the virtual ants can do arithmetic by modelling an [adder](http://en.wikipedia.org/wiki/Adder_%28electronics%29) amongst the cells.  I implemented the ants as described by Levy in BASIC with an intent to eventually implement an 8-bit adder as a science fair project.  Things being what they are, I never got around to the science fair project.  The BASIC code is, most likely, lost to history.

When I saw Scrivener's implementation of the Langton ant, I realized I could use it as a baseline for implementing my ant from 20 years ago.  So I did.  [I turned it yellow and call it a bumblebee now](http://bumblebees.jameshoward.us) and I invite everyone to experiment with it.  You can place bees and dots anywhere on the map and watch the eusociality emerge.  There are some features left to add, but here you go!

The source code is [available on GitHub](https://github.com/howardjp/bumblebees/).  Many thanks to [Ross Scrivener](http://rossscrivener.co.uk) and [Steven Levy](http://www.stevenlevy.com/) for making this happen.  

[^levy]: Steven Levy, _Artificial Life: A Report from the Frontier Where Computers Meet Biology_ (New York: Pantheon Books, 1992), 104.
[^advanced]: An advanced graduate student should be able to prove it over the course of several hours...
