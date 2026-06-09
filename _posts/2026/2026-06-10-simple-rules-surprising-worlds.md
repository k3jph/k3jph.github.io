---
title: Simple Rules, Surprising Worlds
date: 2026-06-10
author: k3jph
layout: post
permalink: /2026/06/10/simple-rules-surprising-worlds/
featured_image: /assets/img/2026/simple-rules-surprising-worlds.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - artificial life
  - emergence
  - genetic algorithms
  - cellular automata
  - AI history
---

In 1970, the mathematician John Horton Conway devised a game. You
start with a grid. Each cell is either alive or dead. A handful of
rules govern what happens next: a live cell with two or three live
neighbors survives; one with fewer or more dies; a dead cell with
exactly three live neighbors comes to life. That is the complete
specification. No other instructions.

From these rules, [the Game of
Life](https://conwaylife.com/) produces gliders that cross the
grid indefinitely. It produces still-life patterns that never
change. It produces oscillators that repeat on fixed cycles. Given
enough space, Life can support structures of arbitrary computational
complexity. Conway later showed that carefully constructed patterns
of gliders, guns, and logic gates could simulate universal
computation.[^1] Nobody programmed the glider or the oscillator
into the rules. They appeared as consequences of the rules and the
initial conditions.

This is the central discovery of artificial life: that intelligence,
and complexity, and behavior, need not be engineered. They can be
grown.

## The Other Tradition

The 1980s in AI belonged to expert systems on the commercial side
and to the early neural network renaissance on the research side.
Both traditions shared a foundational assumption: you were trying
to build something. Expert systems were built by encoding rules.
Neural networks were built by adjusting weights. Either way, the
intelligence was in the artifact, and the artifact was assembled
by human hands.

A smaller, less-funded, less-fashionable community of researchers
was pursuing a different intuition. They worked at the intersection
of computer science, theoretical biology, and complexity theory.
Their central claim was that the other traditions had the problem
backwards. Intelligence was not something you built. It was
something that happened under the right conditions.

Christopher Langton was the organizing figure. In September 1987,
he convened the [first international workshop on artificial
life](https://mitpress.mit.edu/9780262620468/artificial-life/)
at Los Alamos, New Mexico, drawing researchers from fields that
had not previously talked to each other.[^2] Langton gave the new
field its definition: artificial life studies "life as it could
be, rather than life as it is." The phrase is expansive by design.
It licenses simulations of evolution, self-replication, and
collective behavior. It also makes a quiet philosophical claim:
that life, and by extension intelligence, is a kind of process
rather than a kind of thing. The process can be instantiated in
biology. It can also, in principle, be instantiated in silicon.

## Three Rules and a Flock

The year of Langton's Los Alamos workshop was also the year Craig
Reynolds presented [Boids](https://www.red3d.com/cwr/boids/) at
SIGGRAPH.[^3] The paper concerned computer-animated flocking
behavior: how to make artificial birds move like real ones. The
application was film and game animation. The implications were
considerably larger.

Reynolds built his flock from three local rules. Each simulated
bird, or "boid," would avoid crowding its immediate neighbors,
align its direction with the average heading of nearby boids, and
steer toward the average position of the flock. No boid knew about
the flock as a whole. The flocking behavior did not require any
boid to understand it. The flock emerged from local interactions
governed by simple rules.

The immediate result was convincing animation that previously
required handcrafting each bird's trajectory. The deeper result
was a demonstration that collective intelligence requires no
central coordination and no omniscient planner. The order in the
flock is not stored anywhere. It is produced, continuously, by
each element responding to its local environment.

## Adaptation and Evolution

John Holland's contribution to artificial life came from a
different direction. Holland was a computer scientist at the
University of Michigan who had spent the 1960s and 1970s thinking
about how biological evolution could serve as a model for machine
learning. His 1975 book [*Adaptation in Natural and Artificial
Systems*](https://mitpress.mit.edu/9780262581110/) laid out the
theory of genetic algorithms: populations of candidate solutions,
selection proportional to fitness, crossover between solutions,
random mutation.[^4]

The insight was that evolution is a search algorithm. It explores
the space of possible solutions by maintaining a population of
candidates and iteratively selecting, recombining, and varying
them. The algorithm has no gradient to follow. It requires no
differentiable objective function. It needs only a fitness function: a way to evaluate how good
a candidate is. The rest follows.

Stuart Kauffman at the Santa Fe Institute provided the theoretical
complement. His NK model analyzed fitness landscapes: the surfaces
over which evolutionary search navigates.[^5] The ruggedness of
the landscape, how many local peaks it contains and how deep the
valleys between them are, determines how hard a problem is for
evolutionary search. The relationship between problem structure
and algorithmic performance was not accidental. It was a property
of the fitness landscape itself.

## Hillis and the Parallel Machine

The computational demands of artificial life were substantial.
Running a population of hundreds of candidate solutions, evaluating
each one, selecting and recombining across generations: these
operations are embarrassingly parallel. Each candidate can be
evaluated independently. The genetic algorithm wants many
processors running simultaneously, not one processor running fast.

W. Daniel Hillis had been thinking about parallel computation since
his graduate work at MIT under Marvin Minsky.[^6] His [1985 doctoral dissertation](https://archive.org/details/connectionmachin00hill)
proposed a massively parallel architecture:
not dozens of processors but tens of thousands, connected in a
network designed to route information efficiently among them.
Hillis and his colleagues at Thinking Machines Corporation built
the architecture into hardware. The Connection Machine CM-2,
released in 1987, contained up to 65,536 processors running
simultaneously.

The Connection Machine was a general-purpose parallel computer,
used for weather modeling, computational physics, and various AI
applications. But Hillis was personally interested in evolutionary
computation, and the architecture made evolutionary simulation
tractable at scales that were otherwise impossible.

In 1990, Hillis published a result that remains striking:
[co-evolving parasites improved the performance of simulated
evolution](https://doi.org/10.1016/0167-2789(90)90185-5) as an
optimization procedure.[^7] He evolved sorting networks using a
genetic algorithm. Simultaneously, he evolved a population of
test cases designed to defeat the sorting networks. The test
cases and the sorting networks co-evolved, each improving in
response to the other. The sorting networks that emerged from
co-evolution were substantially better than those evolved against
a fixed test suite.

This is co-evolution in the Darwinian sense: fitness defined not
absolutely, but relative to an adversary that is also changing.
You do not need a fixed objective. You need a worthy opponent.
The insight anticipates, by twenty-five years, the self-play
training that would later produce
[AlphaGo](https://doi.org/10.1038/nature16961).

## A Digital Ecology

The most direct demonstration of artificial life's central claim
came in 1991, when the biologist Thomas Ray released Tierra. Ray
had spent years studying tropical forests before concluding that
evolution itself could be studied in digital substrates. He built
a virtual world in which self-replicating programs competed for
memory and CPU time.[^8]

The programs evolved. More than that: parasites emerged without
being programmed. Routines appeared that could not replicate
themselves but could hijack other programs' replication machinery.
Hyperparasites emerged to exploit the parasites. Ray had not
designed any of this. He had set up the conditions: limited
resources, self-replication, heritable variation, selection.
The ecology assembled itself.

Tierra did not solve a business problem or produce a deployable
system. What it demonstrated was that open-ended evolution, the
kind that produces genuine novelty rather than optimization
toward a fixed goal, was possible in a digital medium. The
conditions, not the programmer, had produced the behavior.

## The Book and the Bumblebees

In 1992 or 1993, I was twelve years old and checking books out of
the Lane Public Library in Ohio. One of them was [Steven Levy's *Artificial
Life*](https://www.amazon.com/Artificial-Life-Frontier-Computers-Biology/dp/0679743898),
which had just been published. Levy had followed the AL
researchers for years and written a narrative history of the
field accessible to a motivated twelve-year-old. It remains
a good book.

Langton's ant captured my attention: a cellular automaton in
which a simulated creature turns and advances according to the
color of the cell it occupies, flipping the color as it exits.
Levy described a variant, and I spent a summer implementing it
in BASIC on whatever computer I had access to at the time. I
never finished the science fair project I had in mind. The
BASIC code is lost.

The ant eventually resurfaced. In 2015, I [rebuilt
it](https://jameshoward.us/2015/03/14/introducing-my-bumblebees/)
from a JavaScript baseline, called it a bumblebee, and put it
online. The eusocial behavior that emerges from the simulation
is still strange and still delightful. The mechanism has not
changed. You set up the conditions, and the behavior arrives
uninvited.

## What Artificial Life Got Right

The symbolic AI tradition claimed that intelligence was the
manipulation of explicit representations. The connectionist
tradition claimed that intelligence was learned patterns in
weighted connections. Artificial life made a third, quieter
claim: that intelligence might be an emergent property of
systems interacting with environments under simple rules. You
do not design the behavior. You design the conditions.

This claim was right, and right in ways that took decades to
fully cash out.

Genetic algorithms found their way into practical machine
learning. Evolutionary computation remains an important companion to
gradient-based methods, especially where gradients are unavailable,
unreliable, or beside the point. The GA's core philosophy,
that you can search a fitness landscape by maintaining a
diverse population and selecting across generations, is alive
in hyperparameter optimization, neural architecture search,
and combinatorial optimization at scale.

The deeper influence is philosophical. Reinforcement learning
later made a closely related intuition operational: define an
environment and a reward structure, and let behavior emerge through
interaction. You do not program the behavior. You design the
conditions, and the behavior discovers itself. The agent, like the
boid, knows only its local situation. Intelligent behavior emerges
from the interaction over time.

Hillis's co-evolution experiments of 1990 anticipated the
adversarial and self-play ideas that became central to systems
such as [AlphaGo](https://doi.org/10.1038/nature16961) and, even
more directly, [AlphaGo
Zero](https://doi.org/10.1038/nature24270): fitness defined
relative to an adversary, co-evolution producing capability that
neither party could achieve alone. The Connection Machine results were not a
footnote to the history of AI. They were a preview of its
most important later developments, published while the field's
attention was elsewhere.

Artificial life did not win the funding contests of the late
1980s and 1990s. It did not produce the deployable systems
that neural networks eventually would. But it was right about
something the other traditions had not yet grasped. The field
eventually paid its debt.

Some ideas arrive early and wait.

[^1]: The proof uses a construction of gliders and logic gates built from Life patterns to simulate a universal Turing machine.  The construction is elegant and alarming in roughly equal measure.

[^2]: The proceedings were published as *Artificial Life*, edited  by Langton (Addison-Wesley, 1989), and remain the field's foundational document. The list of contributors reads like a who's who of complexity science circa 1987.

[^3]: Reynolds, C.W. (1987). [Flocks, herds, and schools: A  distributed behavioral model](https://www.red3d.com/cwr/papers/1987/boids.html).  *ACM SIGGRAPH Computer Graphics*, 21(4), 25-34. Reynolds extended the Boids framework over the following decades into a general theory of autonomous character behavior. The original paper remains the canonical statement of the idea.

[^4]: Holland, J.H. (1975). *Adaptation in Natural and Artificial Systems*. University of Michigan Press. The book was decades ahead of its practical impact. Genetic algorithms remained a research curiosity through the 1980s and became practically important only after computing power caught up with their demands. Holland died in 2015, just as the practical impact was becoming clear to everyone.

[^5]: Kauffman, S.A. (1993). [*The Origins of Order: Self-Organization and Selection in Evolution*](https://global.oup.com/academic/product/the-origins-of-order-9780195079517). Oxford University Press. The NK model appears in Chapter 2.  Kauffman's broader argument, that complex order is a natural consequence of certain kinds of systems under selection, is still contested and still interesting.

[^6]: The Minsky connection is worth noting. Minsky's 1969 critique of perceptrons contributed to the first AI winter, helping to freeze the connectionist tradition for a decade. His student built the parallel machine that enabled artificial life simulations at scale. The field Minsky helped to frost, his student helped to thaw by a completely different path.

[^7]: Hillis, W.D. (1990). Co-evolving parasites improve simulated evolution as an optimization procedure. *Physica D: Nonlinear Phenomena*, 42(1-3), 228-234. The paper appeared in a special issue on "Emergent Computation" that stands as a snapshot of the complexity science movement at its most confident.

[^8]: Ray, T.S. (1992). [An approach to the synthesis of life](http://tomray.me/pubs/). In Langton, C., Taylor, C., Farmer, J.D., and Rasmussen, S. (eds.), *Artificial Life II*. Addison-Wesley, pp. 371-408. Tierra is still available and still runs. It remains one of the most unsettling demonstrations in computational biology, in the best sense of unsettling.
