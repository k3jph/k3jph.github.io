---
title: "When the Theory Ran Ahead of the World"
date: 2026-05-06
author: k3jph
layout: post
permalink: /2026/05/06/when-the-theory-ran-ahead-of-the-world/
featured_image: /assets/img/2026/when-the-theory-ran-ahead-of-the-world.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - history of computing
  - Dartmouth
  - John McCarthy
  - Marvin Minsky
  - perceptron
  - neural networks
---

In the summer of 1956, ten researchers gathered at Dartmouth College with a
proposal that reads, in retrospect, with the particular poignancy of someone
who is right about the destination and wrong about the distance. They believed
that if enough talented people worked on the problem with sufficient focus, the
core problems of artificial intelligence could be substantially solved in a
single summer.

They did not solve them. But the question of whether they were wrong is
considerably more interesting than the usual telling suggests. The summer of
1956 did not fail. It named a field, established its first research program,
and set in motion a train of consequences that, seventy years later, has arrived
exactly where the proposal said it would. The road was longer than anyone
expected. The destination was correct.

## The Proposal and the Name

The [Dartmouth Summer Research Project on Artificial Intelligence](https://raysolomonoff.com/dartmouth/boxa/dart564props.pdf)
was written in 1955 by John McCarthy, Marvin Minsky, Nathaniel Rochester, and
Claude Shannon as a funding request to the Rockefeller Foundation. It is worth
reading in full, because the list of problems the authors proposed to solve
reads today less like a research agenda from 1955 and more like a table of
contents for the past decade of AI progress.

They proposed to work on automatic computers, programming languages capable of
handling abstraction, neural networks, the theory of computation, machine
self-improvement, and natural language processing. They estimated that
significant progress could be made on all of these in a single summer by a
group of carefully selected researchers. On the question of whether the summer
would be sufficient: they were wrong by approximately sixty years. On the
question of whether the problems were solvable: they were right about all of
them.

The proposal was also the moment the field got its name. McCarthy chose the
phrase "artificial intelligence" deliberately, in the face of reservations from
colleagues who found the framing imprecise or provocative.[^shannon-name] He
wanted something memorable enough to attract funding and talent, distinct enough
from cybernetics and automata theory to carve out its own institutional space,
and ambitious enough to signal that the researchers were after something more
than incremental engineering.

He succeeded on all three counts. He could not have known that the name would
prove so durable that it would survive every hype cycle, every winter, every
redefinition for the next seventy years, accumulating expectations it had not
earned and fears that had very little to do with the actual work. "Artificial"
implies imitation, something made to resemble the real thing without being it.
"Intelligence" implies the kind of general reasoning capacity that humans deploy
flexibly across domains. Together they set a standard that no system of 1956
could meet, and the gap between the name and the reality became a recurring
source of both disappointment and misunderstanding.

## The Room Where It Happened

The people who gathered at Dartmouth that summer were not a random sample of
mid-century American science. They were an extraordinary concentration of
talent, and their distinct intellectual temperaments shaped the field's fault
lines for decades.

McCarthy himself was a mathematician and logician, precise and combative,
interested in formal systems and what could be proven about them. He would go
on to invent LISP, the programming language that dominated AI research for
thirty years, and to found the Stanford AI Laboratory. His vision of
intelligence was fundamentally symbolic: thought as the manipulation of formal
structures according to explicit rules.

Minsky was more expansive and more willing to speculate. Where McCarthy wanted
proofs, Minsky wanted models. He was interested in how the mind worked and
willing to build theories before the data fully supported them. His later work
on frames and the society of mind anticipated ideas that would not become
mainstream for decades, though his confident predictions about near-term machine
intelligence would contribute to the eventual backlash. He was one of those
figures whose vision outran his timeline by just enough to damage his reputation
among people who confused the timeline for the vision.

Shannon, already famous for founding information theory with his 1948
[*A Mathematical Theory of Communication*](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf),
was the elder statesman of the group. He was already somewhat skeptical that
the summer's ambitions were achievable on the proposed timeline. His presence
lent the project credibility. His skepticism, largely private at the time, was
prescient. Shannon spent his later years building mechanical mice that could
navigate mazes and unicycles that could balance themselves, apparently more
interested in elegant demonstrations of specific capabilities than in grand
claims about general intelligence.

Newell and Simon arrived with something most of the other attendees did not
have: working software. Their presence, and what they brought with them, changed
the terms of the conversation.

## The Logic Theorist and the Symbolic Path

Allen Newell and Herbert Simon had been working at the RAND Corporation and
Carnegie Mellon on a question that seemed almost presumptuous: could a computer
prove mathematical theorems? Not by exhaustive search, not by brute force, but
by something resembling the heuristic reasoning a mathematician actually uses,
working backwards from a goal, recognizing useful intermediate steps, pursuing
promising paths and abandoning unproductive ones.

The Logic Theorist, demonstrated in 1956, proved 38 of the first 52 theorems
in Whitehead and Russell's [*Principia Mathematica*](https://www.cambridge.org/core/books/principia-mathematica/),
the foundational text of symbolic logic.[^russell] This was not a parlor trick.
It was a working system that took formal symbolic inputs, applied transformation
rules, and produced valid proofs, a machine reasoning about mathematics in a
way that at least superficially resembled how a human mathematician reasons.

The Logic Theorist established the symbolic AI paradigm that would dominate the
field for the next three decades. The core idea is both powerful and, in
retrospect, limited: represent knowledge as symbols, represent reasoning as
rules for manipulating those symbols, and build systems that apply rules to
symbols to solve problems. Expert systems, natural language parsers, game-playing
programs, automated planners, the entire first generation of practical AI
applications was built on this foundation.

The power of the symbolic approach is that it is interpretable. You can examine
a symbolic system and understand exactly why it reached a conclusion. The rules
are explicit. The reasoning is traceable. For applications where explainability
matters, medical diagnosis, legal reasoning, safety-critical systems, this is
not a trivial advantage, and it remains relevant today.

The limit of the symbolic approach is that someone has to write the rules. The
world is vastly more complex than any set of explicit rules can capture, and the
brittleness of symbolic systems, their tendency to fail when they encounter
situations their rules do not cover, became increasingly apparent as the field's
ambitions grew. But in 1956, the limit was not yet visible. The symbolic path
looked like the path.

## The Other Path

Almost simultaneously, and largely unnoticed by the symbolic camp, a
twenty-nine-year-old psychologist at the Cornell Aeronautical Laboratory named
Frank Rosenblatt was building something entirely different.

Rosenblatt was not primarily a mathematician or a computer scientist. He was
interested in how biological brains learn, and he thought the answer had
something to do with the physical organization of neurons and the way
connections between them are strengthened or weakened by experience. In 1957,
he introduced the [perceptron](https://www.ling.upenn.edu/courses/cogs501/Rosenblatt1958.pdf):
a mathematical model of a neuron that could learn to classify inputs by
adjusting the weights assigned to each input based on whether its previous
classifications had been correct.

The mechanism is simple enough to state in a sentence. The perceptron receives
a set of inputs, multiplies each by a learned weight, sums the results, and
produces an output based on whether the sum exceeds a threshold. If the output
is wrong, the weights are adjusted, up for inputs that should have contributed
more, down for inputs that contributed too much. Do this enough times with
enough examples, and the perceptron learns to classify correctly, without anyone
telling it the rules.

This is learning from experience rather than learning from explicit instruction.
Nobody tells the perceptron how to classify. It figures it out from examples,
by adjusting its internal parameters until its outputs match the desired results.
The difference from the symbolic approach is not merely technical. It is
philosophical. The symbolic approach assumes that intelligence can be encoded.
The perceptron approach assumes that intelligence must be learned.

Rosenblatt's claims for the perceptron were, characteristically for the era,
somewhat exuberant. He suggested it might eventually perceive, recognize, and
remember, and that further development might lead to systems capable of walking,
talking, and being aware of their own existence.[^rosenblatt] This attracted
press coverage that made his more cautious colleagues uncomfortable, and it set
up the backlash that was coming.

The backlash came from Minsky and Papert, who published
[*Perceptrons*](https://mitpress.mit.edu/9780262631112/perceptrons/) in 1969
and demonstrated mathematically that a single-layer perceptron could not solve
certain classes of problems, most famously the XOR function. This was true and
important and also, in a critical way, incomplete: it applied specifically to
single-layer perceptrons, not to multi-layer networks. The mathematical tools
needed to train multi-layer networks efficiently, backpropagation, the
algorithm for computing how each weight in a deep network should be adjusted,
existed in embryonic form but had not been developed into a practical method.
That algorithm was worked out rigorously by Rumelhart, Hinton, and Williams in
1986, nearly thirty years later.

The publication of *Perceptrons* contributed substantially to the first AI
winter, cutting off funding for connectionist research for over a decade. Whether
Minsky and Papert fully anticipated this consequence is debated. What is not
debated is that the most important idea in the history of artificial intelligence
was sidelined for a generation by a mathematical critique that was technically
correct and strategically premature.

## Why the Perceptron Was Right

Here is what the winter obscured: the perceptron was right. Not about everything
Rosenblatt claimed for it. About the fundamental approach.

A modern deep neural network is, at its mathematical core, a very large stack
of perceptron-like operations. Each layer takes inputs, multiplies them by
learned weights, applies a nonlinear function, and passes the result to the next
layer. The training process adjusts the weights across all layers simultaneously
using backpropagation. Add enough layers, enough parameters, enough training
data, and enough compute, and you get systems that recognize faces, translate
languages, generate text, diagnose diseases from medical images, and predict the
three-dimensional structure of proteins from their amino acid sequences. The
last of these, accomplished by DeepMind's AlphaFold in 2020, solved a problem
that had resisted structural biology for fifty years.

The transformer architecture that underlies modern large language models,
introduced in the 2017 paper
["Attention Is All You Need"](https://arxiv.org/abs/1706.03762), is a
sophisticated elaboration of the same foundational insight Rosenblatt had in
1957: that intelligence can emerge from learned numerical weights rather than
from explicit symbolic rules, and that the way to build an intelligent system
is to show it examples and let it adjust its internal parameters until it gets
them right. The specific mechanisms are different. The philosophy is the same.

Rosenblatt died in a boating accident in 1971, on his 43rd birthday, before the
vindication of his approach. He did not live to see backpropagation made
practical, or the second AI summer, or the deep learning revolution of the 2010s,
or the language models of the 2020s. The symbolic researchers won the argument
in 1969. The connectionist researchers won the field, definitively, about sixty
years after Rosenblatt pointed down the path.

## The Hardware Had to Catch Up

The reason the perceptron approach was set aside was not mathematical. It was
computational. Training a multi-layer neural network requires performing
enormous numbers of arithmetic operations, adjusting enormous numbers of
parameters, iterating over enormous numbers of training examples. The computers
of 1957 could not do this. The computers of 1987 could barely do it for small
networks on simple problems. The computers of 2007, equipped with graphics
processing units originally designed to render video game environments, could
begin to do it at useful scale. By 2012, a neural network trained on GPUs
won the ImageNet visual recognition competition by a margin large enough to
end the debate about whether deep learning worked. Everything since has been
a consequence of that result.

The Dartmouth researchers could not have foreseen Moore's Law compounding for
sixty years, or the internet generating the training data that large models
require, or the specific accident that hardware optimized for matrix arithmetic
in video games would turn out to be exactly what neural network training needs.
These developments were not predictable in 1956. But they were, in some sense,
consequences of the road the Dartmouth summer helped to pave.

The theory was right in 1956. The hardware caught up in 2012. The intervening
fifty-six years were not wasted, they produced the symbolic AI tradition, the
expert systems industry, decades of research into search and planning and
natural language that informed the systems that came after. But the bus, to use
a metaphor, had a destination marked on the front from the beginning. The
destination was the perceptron, scaled up until it could do everything Rosenblatt
said it might, and then some.

We are living in the moment of arrival. Understanding where the journey started,
and who was right, and when, and why it took so long, is not merely historical
curiosity. It is the context that makes the present moment legible.

---

[^shannon-name]: Shannon himself was skeptical of the name, finding it
    imprecise. This is worth savoring: the man who had literally demonstrated
    that logical reasoning could be implemented in electrical circuits, and who
    had founded the mathematical theory of information, thought the phrase
    "artificial intelligence" raised more questions than it answered. He was
    not wrong. The field has been arguing about the definition ever since.

[^russell]: One of the Logic Theorist's proofs was, by some measures, more
    elegant than the original proof in *Principia Mathematica*. When Simon
    sent the result to Bertrand Russell, then in his eighties, Russell wrote
    back that he was delighted. It is one of the more charming moments in the
    history of the field, and a reminder that the people who built the
    foundations were often generous enough to enjoy being surpassed.

[^rosenblatt]: The New York Times covered the perceptron's unveiling in 1958
    under the headline "New Navy Device Learns By Doing." The Navy was funding
    Rosenblatt's research, which adds a layer of irony to the subsequent
    history: the foundational technology of modern AI was developed on a
    military contract, sidelined after an academic critique, and vindicated
    decades later by researchers with hardware originally designed for rendering
    video game graphics. The perceptron's biography is almost novelistically
    improbable.
