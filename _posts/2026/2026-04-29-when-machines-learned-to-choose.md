---
id: when-machines-learned-to-choose
layout: post
title: When Machines Learned to Choose
date: 2026-04-29
author: k3jph
permalink: /2026/04/29/when-machines-learned-to-choose
featured_image: /assets/img/2026/when-machines-learned-to-choose.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - history of computing
  - mathematics
  - information theory
  - logic
---

Every conversation about artificial intelligence eventually arrives at the wrong
starting point. People reach for 1956 and the Dartmouth Conference, or 1997 and
Deep Blue, or 2022 and ChatGPT. These are reasonable places to look if you want
to understand how the field named itself, or how it became a commercial
phenomenon, or how it broke into mass consciousness. They are not the right
place to start if you want to understand what artificial intelligence actually
is.

The right place to start is the `if` statement.

Not the transistor. Not the vacuum tube. The logical operation itself: if this
condition holds, do this thing; otherwise, do that thing. The moment any system,
mechanical or electrical or biological, takes an input and produces a
differentiated output based on a rule, it has made a decision. Everything else
in the history of artificial intelligence is a consequence of that basic act,
scaled up in complexity until the complexity becomes surprising enough that we
reach for a new name.

We have been reaching for new names for a long time.

## Silk and Punched Cards

Before Boole, before Shannon, before Turing, there was a weaver in Lyon named
Joseph Marie Jacquard. In 1804, he demonstrated a loom that could produce
arbitrarily complex patterns in silk without a skilled operator guiding each
pass of the shuttle. The secret was a chain of punched cards. Each card
controlled which warp threads were raised for a given pass of the weft. A hole
in the card meant raise this thread; no hole meant leave it down. The loom read
the card and acted accordingly.

This is an if statement in wood and wire. If the card has a hole here, raise
this thread. If it does not, do not. The decision is encoded in the card, not
in the hands of the weaver. The pattern is the program.

[The Jacquard loom](https://www.sciencemuseum.org.uk/objects-and-stories/jacquard-loom)
was not understood as a computing device at the time because computing devices
did not yet exist as a concept. But Charles Babbage saw one and immediately
grasped its significance. He adapted the punched card idea for his
[Analytical Engine](https://www.computerhistory.org/babbage/), the
19th-century mechanical computer that was never fully built but was fully
conceived. His collaborator Ada Lovelace, working from Babbage's notes,
wrote what is now recognized as the first algorithm intended for machine
execution.[^lovelace] The loom made fabric. The engine, had it been completed,
would have made calculations. The underlying logic was the same.

The Jacquard loom matters to this history for a reason beyond its direct
influence on Babbage. It demonstrates that the decision — the if statement,
the conditional branch — is not an artifact of electronics or even of
mathematics. It is a structure that can be embodied in any sufficiently
flexible physical medium. Silk, gears, relays, transistors, light. The
medium changes. The logic does not.

## The Algebra of Thought

George Boole did not set out to build a machine. He was a self-taught
mathematician in Victorian England who wanted to do something that had
never quite been done: reduce logical reasoning to algebra. His 1854
book [*An Investigation of the Laws of Thought*](https://www.gutenberg.org/ebooks/15114)
is not about computers. It is about the structure of the mind. The title says
so directly.

The extraordinary thing Boole discovered is that the connectives of classical
logic, and, or, not, obey algebraic laws. You can manipulate them symbolically
the way you manipulate numbers. A proposition is either true or false, one or
zero, and the relationships between propositions can be written as equations.
This was a genuinely strange idea at the time. Logic was the province of
philosophy; algebra was the province of mathematics. Boole dragged them into the
same room and showed they were the same subject.

He could not have known what he had done. The practical consequence of reducing
logic to algebra would not become clear for another eighty years, and it would
take someone who was not primarily a logician to see it.

## Shannon Closes the Loop

Claude Shannon was a graduate student at MIT in 1937 when he wrote what is
plausibly the most consequential master's thesis in the history of engineering.
[*A Symbolic Analysis of Relay and Switching
Circuits*](https://dspace.mit.edu/handle/1721.1/11173) demonstrated that Boolean
algebra and electrical switching circuits were formally identical. The rules
Boole had written down for reasoning about propositions turned out to be the
same rules that governed whether a relay was open or closed, whether a circuit
carried current or did not.

This is not an obvious observation. It required looking at two fields
simultaneously and recognizing a structural identity that no one had noticed
because no one had looked at both fields at once. Shannon's thesis supervisor
was [Vannevar Bush](https://mit.edu/vannevar-bush/), who would go on to write
the 1945 essay ["As We May
Think"](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/)
in *The Atlantic*, imagining something very much like the modern computer and
the internet. The connective tissue of this period is remarkable; the people who
built the foundations of information technology were often in the same rooms,
reading the same papers, teaching each other's students.[^shannon]

Shannon's insight meant that you could implement Boole's logic in hardware. AND
becomes a series circuit. OR becomes a parallel circuit. NOT becomes an
inverter. A decision — if this condition holds, take this path — becomes a
physical thing you can build out of copper and insulation and eventually silicon.
The abstraction lands in the world.

## Turing Asks the Hard Question

By the time Shannon published his thesis, Alan Turing had already done something
even stranger. His 1936 paper ["On Computable Numbers, with an Application to
the Entscheidungsproblem"](https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf)
introduced what we now call the Turing machine: a theoretical device capable of
computing anything that can be computed. It is not a machine you build. It is a
machine you reason about, a precise mathematical definition of what computation
means.

The Turing machine's power comes from its simplicity. It reads symbols from a
tape, transitions between states according to a fixed table of rules, and writes
new symbols in response. That is all. And yet that is enough. Any computation
that can be performed by any device can be performed by a Turing machine. This
is [Church's thesis](https://plato.stanford.edu/entries/church-turing/), and
while it cannot be proven in the traditional sense, no one has ever found a
counterexample.

What Turing saw, which took the world longer to absorb, is that computation and
decision-making are the same thing at the appropriate level of abstraction. His
machine moves through states based on rules applied to inputs. That is a
decision. A sequence of decisions, chained together, constitutes a computation.
A sufficiently complex computation begins to look like reasoning.

Turing spent the last years of his life pursuing that implication directly. His
1950 paper ["Computing Machinery and Intelligence"](https://redirect.cs.umbc.edu/courses/471/papers/turing.pdf),
published in the philosophy journal *Mind*, opens with a question that has been
misunderstood ever since: "Can machines think?" Turing's actual move is to
dissolve the question rather than answer it. Thinking, he argues, is too
philosophically loaded a term to be useful. Replace it with an operational test:
can a machine behave, in conversation, indistinguishably from a human? This is
the imitation game, what became known as the Turing test, and its point is not
that passing the test would prove machines think. Its point is that the question
of whether machines think is probably not the right question.[^turing]

## The Thermostat in the Room

There is a device that implements everything described above and lives in
virtually every climate-controlled building in the world: the thermostat. It
reads an input (the current temperature), compares it against a rule (the target
temperature), and makes a decision (turn the heating on or turn it off). It is
a feedback system, a closed loop in which the output of the system is fed back
as input to regulate the next decision.

The thermostat does not think. No one argues that it does. But it decides. And
a sufficiently sophisticated thermostat — one that learns your schedule, adjusts
for weather forecasts, distributes heat differentially across rooms — starts to
attract the word "intelligent" before we catch ourselves and pull it back.

## What None of Them Were Trying to Do

Boole, Shannon, and Turing share something important beyond their
intellectual accomplishments: none of them set out to create artificial
intelligence. Boole wanted to formalize the laws of thought, not to
implement them mechanically. Shannon wanted to understand the relationship
between logic and circuits, not to build a thinking machine. Turing wanted
to answer a question in mathematical logic about which problems are
computable, and separately wanted to understand what it would mean for a
machine to exhibit intelligent behavior.

Artificial intelligence, as a named field with conferences and funding and
career paths, did not exist yet. It would be named in 1956, and the naming
would come bundled with promises that the field would spend decades failing to
keep.

But the seed is already planted by the time those promises get made. Boole gave
us the algebra. Shannon showed the algebra could be wired. Turing showed that
sufficiently complex wiring could, in principle, compute anything. The if
statement is already in the world. Everything that follows is a consequence of
how far you are willing to follow the implications.

We are still following them.

---

[^lovelace]: Lovelace's notes on the Analytical Engine, published in 1843 as
    a translation and annotation of Luigi Menabrea's account of Babbage's
    lectures, include a detailed algorithm for computing Bernoulli numbers.
    Whether this constitutes "the first program" is a debate that generates
    more heat than light. That she understood the machine's generality more
    clearly than almost anyone else at the time is not seriously contested.
    Her [original notes](https://www.fourmilab.ch/babbage/sketch.html) are
    worth reading directly.

[^shannon]: Shannon would later publish [*A Mathematical Theory of
    Communication*](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf)
    in 1948, founding information theory essentially single-handedly. It is one
    of the few papers that genuinely did what its title claimed.

[^turing]: The Turing test is almost universally cited as a definition of
    machine intelligence. It is not. Turing was explicit that he was replacing
    a philosophically confused question with an operationally tractable one.
    Whether a machine can pass the test tells you something about the machine's
    conversational capabilities. It tells you considerably less about whether
    the machine is doing anything that deserves the word "thinking."
