---
id: who-makes-the-rules-for-the-machine
title: "Who Makes the Rules for the Machine"
date: 2026-05-11
author: k3jph
layout: post
permalink: /2026/05/11/who-makes-the-rules-for-the-machine/
featured_image: /assets/img/2026/who-makes-the-rules-for-the-machine.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - public policy
  - AI governance
  - GDPR
  - EU AI Act
  - algorithmic sovereignty
  - philosophy
---

In 1995, the European Union adopted the [Data Protection
Directive](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A31995L0046),
a framework for protecting personal data that was, at the time,
largely theoretical in its ambitions. The internet was new. Data
flows across borders were modest. The directive established
principles that seemed sensible without being immediately
urgent.

Twenty-three years later, the [General Data Protection
Regulation](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)
replaced it with something that had teeth. By then the landscape
had transformed utterly:  Google, Facebook, Amazon, and
scores of other American companies were processing European
citizens' data at scale, making consequential decisions about
their lives, and operating under the assumption that American
legal frameworks governed their behavior regardless of where
their users lived. GDPR asserted otherwise. Data about European
citizens is subject to European law. Full stop. The fines that
followed were real, the behavioral changes were real, and the
concept of data sovereignty, the idea that data is subject
to the laws of the jurisdiction where the data subject lives,
not the jurisdiction where the server sits, entered the
mainstream policy vocabulary.

We are at roughly the 1995 moment for AI governance. The
principles are becoming clear. The urgency is not yet fully
felt. And the question that nobody has quite answered is: when
an AI system makes a consequential decision about your life,
whose rules does it follow?

## The Problem the Car Post Left Unresolved

[Last week I argued](/2026/05/04/whose-values-drive-your-car/)
that AI systems embed the philosophical values of their creators,
and that this matters in ways the current AI safety discourse
largely ignores. A system built within a Daoist or Confucian
cultural context will make different decisions in no-win
situations than one built within a utilitarian Western
framework. The trolley problem has a nationality.

That argument is descriptive. It explains what is happening.
This post is about what to do about it.

The answer I want to propose is algorithmic sovereignty: the
principle that AI systems deployed within a jurisdiction and
making consequential decisions about people within that
jurisdiction should reflect the values, ethical commitments,
and governance expectations of that jurisdiction, not merely
the values of wherever the system was built, trained, or
hosted.

This is not a new idea. It is the data sovereignty principle
applied to decision-making rather than data storage. And like
data sovereignty, it will probably take twenty years to move
from principle to enforcement. That is not a reason to wait.
It is a reason to start now.

## What the EU AI Act Gets Right and Wrong

The [EU AI Act](https://artificialintelligenceact.eu/), which
entered into force in August 2024 and is being phased in
through 2026 and 2027, is the first comprehensive AI regulatory
framework anywhere in the world. It deserves credit for
existing and for establishing that AI systems can be regulated
by jurisdiction of deployment rather than jurisdiction of
origin. A Chinese AI system deployed in Germany is subject to
the AI Act. That is the algorithmic sovereignty principle
applied, at least partially, in practice.

Where the AI Act falls short is in its framing of risk. The
Act categorizes AI systems by their potential for harm, 
unacceptable risk, high risk, limited risk, minimal risk,
and applies regulatory requirements accordingly. This is a
sensible starting point. But the risk categories are defined
primarily in terms of what the system does, not in terms of
the values framework underlying how it makes decisions.

A facial recognition system is high risk because of what it
can do to civil liberties. An autonomous vehicle decision
system is high risk because of what it can do to human safety.
But the Act does not require disclosure of the ethical
framework underlying the decision rules, and it does not
require that the framework be consistent with the values of
the jurisdiction in which the system is deployed. A Confucian
autonomous vehicle that weights social hierarchy in its
collision avoidance decisions can comply with the AI Act's
technical requirements while making decisions that a European
regulatory body, if it understood what was happening, might
find deeply inconsistent with European values around individual
rights and equal treatment.

The [GDPR required transparency about what data is collected
and how it is
used](https://gdpr.eu/what-is-gdpr/). An equivalent
requirement for AI systems would mandate transparency about
what values are encoded and how they govern decisions. The AI
Act gestures toward this with its explainability requirements,
but explainability and value transparency are not the same
thing. Knowing that a system weighted factor X over factor Y
in a particular decision is not the same as knowing that the
weighting reflects a philosophical tradition that may be
inconsistent with the rights and expectations of the person
affected.

## The China Problem and the China Lesson

The standard framing of AI governance treats China as the
adversary whose systems need to be kept out of critical
infrastructure. That framing is not wrong, but it is
incomplete, and it obscures something important.

China has been more aggressive than the United States about
certain forms of AI governance. The [Provisions on the
Management of Algorithmic
Recommendations](https://digichina.stanford.edu/work/translation-internet-information-service-algorithmic-recommendation-management-provisions-effective-march-1-2022/),
which took effect in March 2022, require that algorithmic
recommendation systems be transparent about their operation,
allow users to opt out, and not use algorithms to engage in
what the regulations call "unreasonable differential
treatment." The [Measures for the Management of Generative
Artificial
Intelligence](https://www.chinalawtranslate.com/en/generative-ai-interim/),
which took effect in August 2023, require that generative AI
systems reflect "socialist core values" and do not subvert
state power.

That last requirement is the tell. China's AI governance
framework is explicitly about ensuring that AI systems reflect
the values of the Chinese state and Chinese society as defined
by the Chinese Communist Party. It is, in other words, a form
of algorithmic sovereignty, the principle that AI systems
deployed in China should reflect Chinese values, applied
with the specific values of a particular political system.

The lesson is not that we should copy China's approach. The
lesson is that the question of whose values govern AI systems
is not hypothetical. It is being answered right now, by
different jurisdictions, in different ways, with different
values. The United States and Europe are largely not answering
it, which means the answer is defaulting to the values of
whoever built the system. For most systems deployed in the
West, that means Silicon Valley. For systems built elsewhere
and deployed globally, it means something else.

## The Procurement Lever

Full algorithmic sovereignty regulation, the AI equivalent
of GDPR, is probably fifteen to twenty years away in the
United States, if it comes at all. The political conditions
for it do not currently exist, and the technical standards
for defining and auditing value frameworks in AI systems are
not yet mature enough to support enforcement.

But there is a lever that can be pulled right now without
waiting for comprehensive legislation: government procurement.

The federal government and state governments are actively
procuring AI systems for use in consequential public functions
--- benefits determination, criminal justice, healthcare
allocation, infrastructure management, national security. When
a government deploys an AI system to make decisions about its
citizens, the argument for value alignment is at its strongest.
These are not commercial transactions between willing
participants. They are exercises of public authority, and
public authority carries obligations that private commercial
transactions do not.

[Executive Order 13960](https://www.federalregister.gov/documents/2020/12/08/2020-27065/promoting-the-use-of-trustworthy-artificial-intelligence-in-the-federal-government),
signed in 2020 and still operative in its core principles,
established that federal AI systems should be lawful, purposeful,
accurate, safe, understandable, responsible, regular, traceable,
and accountable. These are good principles. They do not include
a requirement that the system's value framework be consistent
with American constitutional values or the expectations of the
people the system will govern.

A procurement standard that required AI systems used in public
functions to disclose their decision frameworks, demonstrate
consistency with applicable constitutional and statutory values,
and submit to independent auditing of value alignment would be
enforceable today, under existing procurement authority, without
new legislation. The [Federal Acquisition Regulation](https://www.acquisition.gov/far/)
already allows agencies to impose requirements on contractors
that go beyond the statutory minimum. This is a gap that could
be closed administratively.

## What Algorithmic Sovereignty Actually Requires

Algorithmic sovereignty is not a ban on foreign AI systems. It
is not protectionism dressed up in philosophical language. It
is a recognition that consequential decisions are not
philosophically neutral and that people have a legitimate
interest in the framework governing decisions that affect their
lives.

In practice, it requires three things.

Transparency first. AI systems making consequential decisions
should be required to disclose the ethical framework underlying
their decision rules in terms that are auditable, not just
legible. Not a marketing document describing values in the
abstract. A technical specification of how the system resolves
conflicts between competing values, with enough detail that
an independent auditor can evaluate whether the framework is
consistent with applicable law and the reasonable expectations
of affected parties.

Consistency second. Regulatory bodies should develop explicit
positions on which value frameworks are acceptable for which
applications in their jurisdictions. A system that weights
social hierarchy in ways inconsistent with equal protection
principles should not be deployed in contexts where equal
protection applies. A system that defaults to non-action in
ways inconsistent with a duty of care should not be deployed
in contexts where that duty exists. The consistency requirement
does not demand that all AI systems share identical values.
It demands that deployed values be examined and found
acceptable.

Accountability third. When an AI system makes a decision that
harms someone, the question of whose values governed that
decision should be answerable. Currently it often is not.
The path from "the system made this decision" to "these are
the values that produced this decision and here is who is
responsible for them" is opaque in most deployed systems.
Making that path transparent is a precondition for meaningful
accountability.

## The 1995 Moment

The EU's 1995 Data Protection Directive was not immediately
transformative. It took two decades of internet growth, a
series of scandals, and the accumulation of enough political
will to produce GDPR. The directive mattered not because it
solved the problem but because it named the principle. Data
about people is subject to the law of the jurisdiction where
those people live. That principle, once named, became
impossible to fully ignore.

Algorithmic sovereignty needs its 1995 moment. The principle
needs to be named clearly enough that it becomes impossible
to ignore. AI systems making consequential decisions about
people are subject to the values of the jurisdiction where
those people live, not just the values of wherever the system
was built.

The trolley problem has a nationality. The rules for the
machine should too.
