---
title: The Naming Problem
date: 2026-07-08
author: k3jph
layout: post
permalink: /2026/07/16/the-naming-problem/
featured_image: /assets/img/2026/the-naming-problem.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - AI history
  - philosophy of mind
  - technology
---

In 1997, IBM's Deep Blue defeated Garry Kasparov, the world chess
champion, in a six-game match. It was treated as a milestone in
artificial intelligence. Researchers debated what the victory meant
about machine cognition. The cover of Newsweek declared it
"The Brain's Last Stand."

Today, every smartphone contains a chess engine that plays at a
level that would have seemed impossible to the researchers of that
era. Nobody calls it artificial intelligence. It is called a chess
app.

This is the naming problem.

## The Pattern

The chess example is not unusual. It repeats across the history
of the field with enough regularity to deserve a name. Larry Tesler,
the computer scientist who gave us cut, copy, and paste, put it
directly: "AI is whatever hasn't been done yet."[^1] Once a system
reliably performs a task, the task stops being AI and becomes
software. The label migrates to the next frontier.

The examples accumulate quickly.

Optical character recognition was a central problem in pattern
recognition, computer vision, and artificial intelligence for
decades. The ability to read printed text and convert it to
editable characters required techniques that once looked
recognizably intelligent. It is now a background feature in
scanner apps, document workflows, and many PDF tools. Most users
do not think of that as an AI system, though in a technical sense
it is doing work that earlier researchers would have recognized
as part of the AI project.

Spam filtering was exciting machine learning research in the early
2000s. Paul Graham's [2002 essay "A Plan for
Spam"](http://www.paulgraham.com/spam.html) introduced a generation
of programmers to Bayesian classification, framing it as a technique
for building systems that could learn to distinguish messages.[^2]
The technique worked. It was deployed at massive scale. Today, a
spam filter processes most email before it arrives without anyone
remarking that artificial intelligence is involved.

Face detection in digital cameras was a research problem through
much of the 1990s. By the mid-2000s it was a consumer product
feature. By the early 2010s it was a chip. The camera systems on
modern phones perform real-time object recognition at a level that
far exceeds what the leading AI research systems of 2000 could do.
This capability is marketed as "smart camera" or "computational
photography," not as artificial intelligence.

Recommendation engines at streaming services and online retailers
were, a decade ago, described regularly as AI systems. The
algorithms that learned your viewing patterns and suggested the
next show were sufficiently novel to warrant that framing. They are
now called "the algorithm," a word that has somehow become more
ominous than the phrase it replaced, and that nobody would describe
as a form of intelligence.

Route-finding and navigation were flagship AI problems from the
earliest days of the field. Heuristic search, path planning, real-time traffic modeling,
automatic rerouting: these draw from bodies of work that overlap
heavily with artificial intelligence, graph theory, and operations
research. To the user, none of that matters. They are called Maps.

## Why the Label Moves

The pattern is not arbitrary. It reflects something real about how
we understand intelligence.

We tend to define intelligence as the thing we do not yet understand
mechanically. When a process is opaque, we call it thinking. When
it becomes transparent, we call it computation. The moment we can
explain exactly how a system achieves a result, the result stops
seeming intelligent. Chess is a perfect example: once researchers
understood that sufficiently deep search with good evaluation
functions could defeat human grandmasters, the mystery evaporated.
Deep Blue was no longer mysterious. It was a very fast search.

This pattern is often called the AI effect: the tendency to
redefine intelligence upward whenever a machine achieves a target
capability. Drew McDermott's 1976 essay "Artificial Intelligence
Meets Natural Stupidity" is one early expression of the same
concern, particularly its critique of the field's habit of naming
programs as if they were already doing what we hoped they might
do.[^3] Each achievement is reclassified. The goalposts move.

This has an important implication for reading the history of AI.
Every winter in the field was partly a failure of delivery and
partly a failure of definition. Expert systems did not fail to be
AI systems. They succeeded at being the AI systems their architects
had designed, and then those systems became routine enough that
they were reclassified as software. The first AI winter followed
initial claims that were too broad. The second followed a period
of genuine commercial deployment that was eventually absorbed into
ordinary practice. In both cases, the label retreated faster than
the capability did.

## Tracing the Thread

The history traced here runs from the 1956 Dartmouth Conference,
through symbolic AI and expert systems, through the statistical
turn, through deep learning, to the transformer and large language
models. Each chapter involved a cluster of capabilities that earned
the AI label in their moment and then partially lost it as the
capabilities were absorbed into the infrastructure of computing.

The term itself was a choice. John McCarthy and his colleagues at
Dartmouth selected "artificial intelligence" deliberately. Other
phrases were available: "machine intelligence," "complex information
processing," "automata studies." The choice of "artificial
intelligence" was partly strategic, a term provocative and broad
enough to attract interest and funding, and partly genuine
conviction that the problems being attacked were the right problems
for understanding mind.[^4]

That original provocation has never fully settled. The question of
whether the systems that now carry the label are doing something
that deserves to be called intelligence is contested in ways that
go beyond marketing. Large language models trained on massive text
corpora do things that no one fully predicted and that no one fully
understands. Whether that constitutes intelligence depends on a
definition that the field has not converged on in seventy years of
trying.

## What We Will Stop Calling AI

The pattern suggests a question worth asking: which of the things
we currently call AI will, in ten years, simply be called software?

Code generation is a plausible candidate. Systems that translate
natural language descriptions into working code are currently
treated as AI tools. If they become sufficiently reliable, they
will be absorbed into development environments and called something
like "assisted editing." The AI framing will fade as the capability
becomes routine.

Writing assistance is another candidate. The systems currently
marketed as AI writing tools are, in many contexts, becoming
defaults in word processors and communication platforms. As the
assistance becomes seamless, the label may follow the spam filter
into the background: present but unremarked.

Medical image analysis, legal document review, financial fraud
detection: each is currently in the phase where the AI label
is prominent. Each is in the process of becoming infrastructure.
The trajectory is familiar.

What remains AI, in the sense of attracting the label and the
debate, will be whatever proves genuinely resistant to mechanization.
The history suggests this is harder to predict than it seems.
Chess was supposed to require intelligence. It turned out to require
search. Natural language understanding was supposed to require
intelligence. Current systems perform at levels that were once
considered definitively human, and the debate about whether they
understand anything has not been resolved.

## The Governance Problem

If the label "AI" is a moving target, then governance that addresses
AI as a category faces a structural difficulty. The specific system
that needs regulation today may be reclassified as ordinary software
by the time regulatory frameworks are established. The capabilities
that pose the actual risks may be distributed across systems that
don't individually trigger AI-specific review.

This is not an argument against AI governance. It is an argument
for governance that targets specific capabilities, specific risks,
and specific deployment contexts rather than a category label that
the field itself has never been able to stabilize. The EU's AI
Act takes an explicitly [risk-based
approach](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai),
categorizing systems by intended use and potential harm rather
than by whether they qualify as "artificial intelligence." That
instinct is correct, even if the implementation is contested.

The naming problem is not going to be solved. The label will keep
moving because the underlying phenomenon, the boundary between
what machines can and cannot reliably do, is itself moving. What
can be done is to notice the pattern, resist the temptation to
treat the label as a stable category, and govern the capabilities
rather than the name.

The chess app on your phone is genuinely impressive. It is also
not what anyone means when they talk about artificial intelligence
today. In twenty years, some of what we are discussing today will
probably be in the same position. The question is which parts, and
what will have replaced them at the frontier.

We will not know until the label moves again.

[^1]: Tesler's formulation is widely cited but difficult to trace to a single original source. The version most commonly attributed to him is "AI is whatever hasn't been done yet." A related formulation, "As soon as it works, no one calls it AI anymore," is attributed to various sources including John McCarthy. The phenomenon itself is well documented regardless of the precise provenance of either phrase.

[^2]: Graham, P. (2002). [A plan for spam](http://www.paulgraham.com/spam.html). The essay introduced Bayesian spam filtering to a broad programmer audience and demonstrated that a statistical classifier trained on examples could outperform hand-crafted rule systems for this problem. It is an early example of the pattern in which ML research becomes invisible infrastructure.

[^3]: McDermott, D. (1976). [Artificial intelligence meets natural stupidity](https://dl.acm.org/doi/10.1145/1045339.1045340). *SIGART Newsletter*, 57, 4-9. McDermott's essay did not coin the phrase "AI effect"; it criticized the rhetorical habits and overclaiming that later discussions of the AI effect point back to. The term was popularized later; the underlying observation is older.

[^4]: McCorduck, P. (2004). *Machines Who Think*, 2nd ed. A.K. Peters. McCorduck's history of AI includes detailed accounts of the Dartmouth Conference and the deliberate choice of the term "artificial intelligence." The [original 1955 proposal](https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html) by McCarthy, Minsky, Rochester, and Shannon is available online.
