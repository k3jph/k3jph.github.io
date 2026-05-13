---
title: "The First Winter"
date: 2026-05-13
author: k3jph
layout: post
permalink: /2026/05/13/the-first-winter/
featured_image: /assets/img/2026/the-first-winter.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - history of computing
  - Lighthill Report
  - symbolic AI
  - AI winter
---

Every technology that attracts serious money eventually attracts serious
scrutiny. Artificial intelligence attracted both faster than most, and the
scrutiny, when it came, was devastating. By the early 1970s, the promises
made at Dartmouth in 1956 had aged badly enough that governments on both
sides of the Atlantic were asking pointed questions about where the money
had gone and what, precisely, had been delivered in return.

The answer was not reassuring. What followed was the first AI winter: a
prolonged funding drought that reshaped the field, eliminated entire research
programs, and forced a reckoning with questions that the founding generation
had either not asked or had answered too optimistically. The winter was painful.
It was also, in retrospect, necessary. The field that emerged from it was more
honest about its limitations, and that honesty, however grudging, set the
conditions for what eventually came next.

## The Promises and the Gap

To understand the winter, you have to understand what had been promised and
what had been delivered by 1970.

The promises were considerable. Herbert Simon and Allen Newell, two of the
architects of the Logic Theorist and the General Problem Solver,
[predicted in 1957](https://conversableeconomist.com/2020/04/28/1957-when-machines-that-think-learn-and-create-arrived/)
that within ten years a computer would be world chess champion, would prove a
significant new mathematical theorem, would compose music of serious aesthetic
value, and would substantially displace psychological theories with
computational models. Simon is the name most often attached to these
predictions, but they were made jointly.
Marvin Minsky was quoted in *Life* magazine in 1970 saying that within three
to eight years we would have a machine with the general intelligence of an
average human being, though Minsky later disclaimed the
[quote as reported](https://quoteinvestigator.com/2017/06/21/robot-pet/).
Disputed or not, these were not fringe predictions from unknown figures. These were
leading researchers speaking to popular audiences, and the audiences took
them seriously because the early results had seemed to justify the confidence.

The early results had been genuine. The Logic Theorist proved theorems. The
General Problem Solver could work through formal puzzles. Early natural
language programs like ELIZA, developed by Joseph Weizenbaum at MIT from
1964 and described in a
[landmark 1966 paper](https://cse.buffalo.edu/~rapaport/572/S02/weizenbaum.eliza.1966.pdf),
could hold conversations plausible enough that users sometimes forgot they
were talking to a machine.[^eliza] The checkers-playing program written by
Arthur Samuel had [defeated a strong amateur player](https://webdocs.cs.ualberta.ca/~chinook/project/legacy.html)
in a publicized 1962 match, generating headlines that the program's actual
record against top competition did not quite justify. The trajectory looked steep and
clear.

What the trajectory concealed was a distinction that would take years to
name properly: the difference between performing well on carefully constructed
toy problems and performing at all on the complexity of the real world. The
early AI systems were not wrong. They were narrow in ways their creators had
not fully appreciated, and the gap between narrow competence and general
intelligence turned out to be almost incomprehensibly large.

## The Combinatorial Explosion

The deepest technical reason for the winter is a problem so fundamental that
it has a name: the combinatorial explosion. It appears whenever a system must
search through a space of possible solutions that grows exponentially with
the size of the problem.

Chess provides the clearest illustration. A chess program that searches all
possible sequences of moves would need to evaluate something in the range of
ten to the power of 120 positions, a number so large that if every atom in
the observable universe had been computing since the Big Bang, it would not
have scratched the surface. The early AI programs handled this by using
heuristics, rules of thumb that pruned the search space to something
manageable. The heuristics worked on small problems. As problems grew larger
and more complex, the search spaces grew faster than the heuristics could
contain them, and the programs ground to a halt.

The same explosion appeared everywhere symbolic AI reached. Translation
between languages is not just a lookup problem; the number of grammatically
valid and contextually appropriate sentences in any natural language is
effectively infinite, and the rules governing which interpretation is correct
in a given context are not rules at all in any formal sense. They are
accumulated intuitions that native speakers cannot articulate. A symbolic
system that tries to capture them runs out of rules long before it runs out
of ambiguity.

The combinatorial explosion was not a bug. It was a structural feature of
the symbolic AI approach, baked in from the beginning. The Dartmouth
researchers had assumed, reasonably given what they knew, that the hard part
of intelligence was having the right rules. The actual hard part turned out
to be something different: knowing which rules applied, in which order, under
which conditions, given incomplete and ambiguous information about the world.
That problem does not yield to more rules. It requires a fundamentally
different approach.

## The Frame Problem

The frame problem is less famous than the combinatorial explosion but in some
ways more troubling, because it strikes at something deeper than computational
efficiency. It was identified by John McCarthy and Patrick Hayes in a 1969
paper that deserves more general attention than it receives.

The problem arises from a simple question: when something changes in the
world, what else changes? When you move a block from one location to another,
its location changes. Everything else about it, its color, its weight, its
relationship to objects that were not moved, stays the same. A human being
knows this without thinking about it. A symbolic AI system has to be told,
explicitly, everything that did not change as a result of every action. In a
world of any complexity, the list of things that do not change as a result of
any given action is effectively infinite.

More precisely: how does a reasoning system decide which facts remain true
across time without checking every fact after every action? The naive solution
is to explicitly represent every non-change, which is computationally
catastrophic. The more sophisticated solutions that were proposed over the
following decades all turned out to have their own pathologies. The frame
problem does not have a clean solution within the symbolic paradigm. It
has workarounds of varying degrees of unsatisfactoriness.

What the frame problem revealed is that common sense, the vast background
of implicit knowledge that humans deploy effortlessly and unconsciously in
navigating the world, is not a small addition to intelligence. It is most
of intelligence. And common sense resists encoding in explicit rules precisely
because it was never learned as rules. It was absorbed through experience,
through the accumulated weight of a lifetime of interactions with the physical
and social world. A system that learns from examples, rather than from
explicit instruction, has a natural path to something like common sense. A
symbolic system does not.

## The Lighthill Report

The British government's response to the AI funding question came in the form
of a 1973 report commissioned from Sir James Lighthill, Lucasian Professor of
Applied Mathematics at Cambridge, one of the most distinguished applied mathematicians
of his generation. The
[Lighthill Report](https://www.chilton-computing.org.uk/inf/literature/reports/lighthill_report/p001.htm)
is a fascinating document to read today, because it is simultaneously acute
and myopic in ways that illuminate exactly what was lost in the winter and
what was not.

Lighthill's central argument was that AI research had failed to deliver on
its promises, that the combinatorial explosion made the ambitious goals
unachievable with available methods, and that the three main areas of AI
research (robotics, language processing, and what he called "central nervous
system" research) had each failed to produce results that justified continued
investment. He recommended sharply reduced funding, and the recommendation
was largely followed. Similar pressures produced similar outcomes in the
United States, where DARPA, which had been the primary funder of academic
AI research, drastically curtailed its support.

Lighthill was right about the promises having been broken. He was right about
the combinatorial explosion being a fundamental obstacle. He was wrong, in ways
that a fluid dynamicist could perhaps be forgiven for not seeing, about the
long-term prospects of the connectionist approach. His report focused its
critique on robotics and symbolic language processing. Neural network research,
the part of the field that would eventually prove most productive, received
relatively little attention, partly because Minsky and Papert's 1969 critique
of the perceptron had already done so much damage to its credibility that
there was not much left to cut.

The Lighthill Report is sometimes read as a bureaucratic document, a funding
decision dressed up in academic language. It is actually a reasonably careful
piece of technical analysis that happened to arrive at the wrong conclusion
about what mattered most, at the worst possible time for the people working
on the things that mattered most.[^lighthill]

## The Perceptron Winter

Minsky and Papert's *Perceptrons*, published in 1969, deserves separate
treatment here because its effects were distinct from, and compounded with,
the broader winter caused by the Lighthill Report and the DARPA funding cuts.

The book's core contribution was a mathematical proof that single-layer
perceptrons could not solve certain classes of problems, of which XOR is
the canonical example. XOR is a logical function that returns true when
exactly one of two inputs is true and false otherwise. A single-layer
perceptron cannot learn it because XOR is not linearly separable, meaning
you cannot draw a straight line through the input space that correctly divides
the true cases from the false cases. The proof was correct.

The problem was what the field took the proof to mean. The book's framing
implied, without quite stating, that the limitations of single-layer perceptrons
were limitations of neural networks in general. Researchers who might have
worked on multi-layer networks, which do not share the linear separability
constraint, were discouraged from pursuing the direction. Funding dried up.
Graduate students chose other topics. The connectionist tradition that
Rosenblatt had established went into a decade-long hibernation.

What the book did not prove, and what Minsky and Papert knew but the broader
community sometimes forgot, was that multi-layer networks were not subject to
the same limitations. The algorithm needed to train multi-layer networks
efficiently, backpropagation, had not been worked out yet, but its eventual
development was not precluded by anything in *Perceptrons*. The mathematical
critique was of a specific architecture. The practical consequence was the
near-abandonment of an entire research paradigm.

Rosenblatt did not live to see the vindication of his approach. He died 
in 1971. The researchers who eventually revived and extended his work, Hinton,
LeCun, Bengio, would not produce results that shifted the field's consensus
until the 1980s and would not produce results that ended the argument entirely
until 2012.

## What Survived

It would be a mistake to read the first AI winter purely as a story of
failure. The funding drought forced a discipline that the boom years had
not required. Researchers who remained in the field did so because they
believed in the work, not because the grants were easy. The problems that
had been swept under the rug during the optimistic 1960s, the combinatorial
explosion, the frame problem, the brittleness of symbolic systems, were
now at the center of the conversation rather than the periphery.

Several research programs survived the winter and proved foundational.
Logic programming, with Prolog created by Alain Colmerauer and his team in
Marseille and its theoretical foundations worked out in collaboration with
Robert Kowalski at Edinburgh, produced a language for expressing logical
relationships that became a significant tool in the next phase of
AI development. Constraint satisfaction research, which developed rigorous
methods for searching solution spaces efficiently, contributed mathematical
tools that remain relevant. And the theoretical work on computational
complexity that the winter stimulated helped clarify what kinds of problems
were tractable in principle and what kinds were not, which is genuinely
useful knowledge even if it delivered bad news.

Most importantly, the winter did not kill neural network research entirely.
A small number of researchers, working with minimal funding and against the
prevailing consensus, kept the connectionist tradition alive through the
1970s. John Hopfield's work on associative memory in the early 1980s brought
neural networks back into serious discussion. Geoffrey Hinton, working
across several institutions on both sides of the Atlantic, steadily developed
the mathematical foundations that would make deep learning possible. The
winter slowed the work. It did not stop it.

## The Pattern

The first AI winter established a pattern that would repeat. A period of
genuine progress generates optimistic predictions. The predictions attract
funding and attention that exceeds what the actual results justify. The gap
between promise and delivery becomes impossible to ignore. Funding contracts,
researchers leave the field, the press writes obituaries. A smaller group
continues working on the hard problems, informed by what the boom years
revealed about what did not work. Slowly, quietly, they accumulate the
understanding that makes the next boom possible.

This is not a story about dishonesty, though there was some of that. It is
a story about the difficulty of knowing, from inside a period of rapid
progress, whether the progress is approaching a fundamental limit or a
temporary obstacle. The researchers who made the optimistic predictions of
the 1960s were not fools. They were working at the frontier of a new field
with genuinely surprising early results, extrapolating from trajectories that
looked steep and clear, in an era when science had repeatedly delivered
things that had seemed impossible a generation before.

They were wrong. The problems were harder than they appeared. The winter
came. And the work continued, as it always does, in the hands of the people
who cared more about the problems than about the predictions.

---

[^eliza]: ELIZA's creator, Joseph Weizenbaum, was disturbed rather than
    delighted by how readily people anthropomorphized his program. His
    1976 book [*Computer Power and Human Reason*](https://www.penguinrandomhouse.com/books/preparation/computer-power-and-human-reason-from-judgment-to-calculation-by-joseph-weizenbaum/)
    is an early and still-relevant meditation on the dangers of mistaking
    a system's outputs for evidence of its inner life. Weizenbaum built
    the thing most likely to be mistaken for intelligence and spent the
    rest of his career warning people not to be fooled by it. There is
    something almost novelistically perfect about that.

[^lighthill]: The BBC broadcast a remarkable
    [debate about the Lighthill Report](https://www.aiai.ed.ac.uk/events/lighthill1973/)
    in 1973, in which Lighthill faced John McCarthy, Donald Michie, and
    Richard Gregory, a neuropsychologist who had worked with Michie at
    Edinburgh. Minsky was not present. The debate is available to watch
    and is worth an hour of anyone's time who wants to understand what
    the field looked like from the inside at the moment of crisis. McCarthy
    and Michie are not at their most persuasive. Lighthill is not at his
    most charitable. The whole thing has the energy of a faculty meeting
    where everyone knows the budget is being cut and nobody wants to say
    so directly.
