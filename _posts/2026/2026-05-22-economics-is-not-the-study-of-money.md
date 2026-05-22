---
id: economics-is-not-the-study-of-money
title: "Economics Is Not the Study of Money"
date: 2026-05-22
author: k3jph
layout: post
permalink: /2026/05/22/economics-is-not-the-study-of-money/
featured_image: /assets/img/2026/economics-is-not-the-study-of-money.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - economics
  - public policy
  - decision theory
  - AI governance
---

Somewhere along the way, someone got the idea that economics is
about money. It is not, at least not in the way people usually
mean that. Economics is about choice: what people want, what
stands in their way, what they know, what they do not know, and
how they behave when the rules around them change.

That is also a large part of what now matters about AI. Not the
chips, not the demos, not the theatrical arguments about whether
a chatbot is secretly alive. The important part is what these
systems cause people and institutions to do. They rank, recommend,
allocate, optimize, deny, approve, summarize, prioritize, and act.
Those are decision functions. Economics has a great deal to say
about them.

This matters because AI governance is still too often treated as
a problem for computer scientists, lawyers, and ethicists, with
everyone else invited later. That is better than treating it as a
purely technical problem, but it still leaves out one of the
fields that has spent the most time thinking carefully about
uncertainty, incentives, and conflicting preferences. The result
is a lot of AI governance that rediscovers old economic problems,
often with worse vocabulary and less memory.

It also tends to miss the operational realities that operations
researchers have spent decades formalizing: capacity constraints,
throughput limits, queues, triage rules, and resource allocation.
A model that flags more fraud than your investigators can review,
or more packages than your inspectors can open, is not a working
fraud detector or a working customs system. It is a demo.

## What Economics Actually Is

[Economics](https://www.aeaweb.org/resources/students/what-is-economics)
is the study of how agents make choices under conditions of
scarcity. The money part comes later. Money is a coordination
mechanism, a way of aggregating preferences and making exchange
possible. The more basic questions are about decisions: what
agents want, what constraints they face, what information they
have, and what they will actually do when you put them inside a
system with incentives.

That is not a small domain. [Decision
theory](https://plato.stanford.edu/entries/decision-theory/),
which sits at the intersection of economics, mathematics, and
philosophy, gives us formal ways to reason about choices under
uncertainty. [Mechanism
design](https://www.nobelprize.org/prizes/economic-sciences/2007/press-release/),
sometimes called reverse game theory, asks how to build systems
that produce desired outcomes even when the agents inside those
systems pursue their own interests. [Welfare
economics](https://www.econlib.org/library/Enc/WelfareEconomics.html)
asks whose preferences count and how we should think about them
when they conflict. [Information
economics](https://www.nobelprize.org/prizes/economic-sciences/2001/press-release/)
asks what happens when different agents know different things.

Those are not side issues for AI. A recommendation system is a
mechanism. A reinforcement learning agent is an optimizer pursuing
objectives under constraints. A large language model trained on
human feedback is, among other things, an attempt to compress many
human judgments into one system. The vocabulary is different, but
a lot of the structure is familiar.

## What Economists Know That AI Practitioners Keep Rediscovering

[Goodhart's
Law](https://www.semanticscholar.org/paper/Problems-of-Monetary-Management:-The-UK-Experience-Goodhart/0ae623749b30de53a39cf05813f5f3842e422c01),
usually summarized as the idea that when a measure becomes a
target, it stops being a good measure, comes from Charles
Goodhart's 1975 work on monetary policy. The AI community has
been rediscovering it ever since under names like reward hacking,
specification gaming, and teaching to the test. Optimize a system
for a measurable proxy of what you actually want, and the system
will usually find ways to score well on the proxy while damaging
the underlying goal. That is not a weird edge case. It is one of
the basic lessons of incentive design.

[The principal-agent
problem](https://www.econlib.org/library/Enc/PrincipalAgentProblem.html)
is the classic framework for understanding what happens when you
delegate a task to someone whose interests are not perfectly
aligned with yours, especially when they know things you do not. A
large class of AI alignment problems has this shape. The principal
may be the person, organization, or public body trying to get a
system to behave in some intended way. The agent may be the AI
system, the developer, the deploying organization, or some
combination of them. The information asymmetry is that modern AI
systems can act on patterns in data that humans cannot fully
inspect, verify, or even notice. Economists have been studying
that basic structure for a long time. AI alignment is not the same
problem in new clothes, but it is close enough that ignoring the
older literature is wasteful.

[Externalities](https://www.econlib.org/library/Enc/Externalities.html)
are costs or benefits that fall on people who were not party to
the original transaction. Carbon emissions are the standard
example. The cost of burning fuel is borne partly by people who
had no role in the decision to burn it. AI systems generate
externalities all the time. A content recommendation algorithm
that maximizes engagement can impose costs on mental health,
social cohesion, and information quality that do not appear in the
objective function. An autonomous vehicle decision system that
optimizes passenger safety can impose costs on pedestrians and
other road users. Economists have a well-developed toolkit for
analyzing and internalizing externalities. AI governance does not
use that toolkit nearly as seriously as it should.

[Preference
aggregation](https://plato.stanford.edu/entries/arrows-theorem/),
the problem of combining different and sometimes conflicting
preferences into a collective choice, is one of the oldest and
hardest problems in social choice theory. Arrow's impossibility
theorem, proved in 1951, shows that no social welfare function can
satisfy a small set of apparently reasonable conditions at the
same time. That matters for AI because systems that claim to
reflect "human values" or "human preferences" are making an
aggregation choice whether they admit it or not. Whose
preferences count? How much? What happens when they conflict?
These questions have formal treatments, and sometimes formal
impossibility results. They should not be treated as vibes.

## What Computer Scientists Know That Economists Miss

The critique runs both ways.

Economic models often abstract away implementation details. That
is sometimes necessary, but it is also dangerous, because
implementation details are often where the real behavior appears.
A mechanism that is incentive-compatible in theory can fail in
practice because the agents gaming it have computational
advantages the theory did not account for. A policy that is
optimal in a model can fail badly when deployed in a system with
data quality problems the model assumed away.

The pace of capability change in AI is also faster than many
economic models are built to handle. Much economic analysis treats
technology as a slowly evolving background condition. But [the
capability gains in large language models and agentic systems
since 2020](https://hai.stanford.edu/ai-index/2025-ai-index-report)
are abrupt enough to strain that assumption. Economists who are
not paying close attention to what the systems can actually do may
end up modeling a technology that has already moved on.

Data-generating processes are messier than economic models often
assume. Economists are trained to be careful about endogeneity,
selection bias, and measurement error. They are less often trained
to think about the specific failure modes of large-scale machine
learning: distribution shift, spurious correlations that survive
in-sample validation, and training data that preserves patterns we
should not want to reproduce. The machine-learning literature has
developed tools and instincts here that many economists do not yet
use routinely.

## The Governance Gap

AI governance frameworks designed by computer scientists alone
tend to focus on technical properties of systems: accuracy,
robustness, fairness as defined by statistical metrics, and
explainability. Those properties matter, but they are not enough.

AI governance frameworks designed by economists alone would have
the opposite weakness. They would focus on incentives, market
design, externalities, and preference aggregation, all of which
matter, but none of which substitutes for understanding the system
as built.

The point is not that economists should take over AI governance.
They should not. The point is that a field that has spent decades
asking what agents will actually do inside a system should be
present when we design AI systems and the governance frameworks
around them. Not at the end, after the objective functions have
been chosen and the deployment context has already been fixed. At
the beginning, while those choices are still being made.

AI is not just a computer science problem with economic side
effects. It is a decision-making problem built out of software,
data, institutions, incentives, and constraints. That requires
computer science and economics, along with law, ethics, domain
expertise, and operations research, from the start.

Somewhere along the way, someone got the idea that AI is the study
of computers. That is not quite right either. AI is increasingly
the study of decisions made through computers. Economics has been
there the whole time.
