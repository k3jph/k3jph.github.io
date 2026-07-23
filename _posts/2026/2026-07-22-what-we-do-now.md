---
id: what-we-do-now
title: "What We Do Now"
date: 2026-07-22
author: k3jph
layout: post
permalink: /2026/07/22/what-we-do-now/
featured_image: /assets/img/2026/what-we-do-now.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - AI history
  - AI governance
  - machine learning
  - technology policy
---

The history of artificial intelligence is a history of a moving
target. The [first machine decision](https://jameshoward.us/2026/04/29/when-machines-learned-to-choose/)
was a thermostat closing a circuit. The field got its name at
Dartmouth in 1956 and immediately wrote promissory notes it could
not honor. Two winters followed, each one a correction of
expectations rather than a verdict on the underlying ideas. Expert
systems worked until the knowledge ran out. Statistics quietly won
the middle decades. Deep learning won the last one. The transformer
turned language into the interface, and suddenly everyone was
having the same argument the field has had since 1956, using the
same words, with the same confidence that this time the words
finally mean what they say.

And through all of it, one pattern held. [AI is whatever computers
cannot reliably do yet](https://jameshoward.us/2026/07/16/the-naming-problem/).
Once it works, we rename it software and stop being afraid of it.

That pattern is not trivia. It is the single most useful fact
available to anyone trying to decide what to do about AI right now,
because it tells us which parts of the current moment are permanent
and which parts are an artifact of the label. The history does not
answer every question. It answers four of them, and the four it
answers are the ones policymakers, executives, and engineers keep
getting wrong.

## Govern the Decision, Not the Technology

Regulation aimed at a technology inherits that technology's shelf
life. Regulation aimed at a decision does not.

Every previous attempt to draw a legal boundary around "artificial
intelligence" as a category has run into the naming problem within
a few years. The systems the drafters had in mind stop being called
AI. The systems that arrive next were not imagined when the
definitions were written. A statute or framework that spends its
first ten pages defining artificial intelligence has already
conceded that its scope will be litigated forever, because the
field itself has never sustained a stable definition for longer
than a funding cycle. The [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
runs headlong into this, sorting systems into risk tiers by
technological category and then discovering, before the ink dried,
that general-purpose models required a bolted-on regime of their
own because the original taxonomy had no place for them.

The alternative has been sitting in American law for decades. The
Equal Credit Opportunity Act does not care whether a loan denial
came from a human officer, a scorecard, a random forest, or a
language model. It regulates the decision: if you deny someone
credit, you owe them specific and accurate reasons, full stop. The
requirement was written before anyone involved had heard of
backpropagation, and it applies to systems its drafters could not
have imagined, precisely because it never tried to name the
technology. The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
leans the same direction, organizing itself around functions and
consequences rather than around any particular architecture.

The lesson generalizes. Decide which decisions matter: credit,
hiring, medical triage, sentencing, targeting. Attach obligations
of explanation, contest, and accountability to those decisions
wherever they are made and whatever makes them. The thermostat and
the language model sit on the same continuum, and the law should
treat the continuum, not the fashionable segment of it.[^thermostat]

## Winters Are Corrections, Not Verdicts

Both AI winters followed the same script. Capability was real but
narrower than advertised. Money arrived faster than understanding.
The gap between demonstration and deployment went unexamined until
it could not be, and then funding collapsed all at once. What died
in each winter was the overpromise. What survived was whatever had
quietly solved an actual problem: search techniques after the
first winter, statistical methods and the neural network research
program after the second.

The current boom will follow the same script, because the script
is not about technology. It is about the economics of expectation.
Somewhere between the capability that exists and the capability
that has been sold, there is a gap, and the gap always closes from
the sales side.

The practical discipline this history recommends is simple to
state and rare in practice: fund and deploy against the problem,
not against the technology. The deployments that survived previous
corrections shared one trait. Someone could name the specific task
being performed, the cost of performing it before, and the
measured difference after. The deployments that evaporated shared
the opposite trait: the technology was the point, and the problem
was recruited afterward to justify it. A great deal of what is
currently sold as AI transformation is the second kind, old
solved problems wearing a new interface, and when the correction
comes, the renaming machinery will run in reverse. Nobody will
say the AI failed. They will say the product was bad, and the
word AI will quietly detach itself from the wreckage and move on,
as it always has.

Organizations that want to be standing after the correction should
run the test now rather than waiting for the market to run it for
them. If nobody can articulate what the system does that was not
being done before, or the articulation collapses into the
technology having been impressive, that is the tell.

## Every Model Is a Position on How to Live

A system trained on text learns more than grammar. It learns the
priors of the civilization that wrote the text: what counts as a
good reason, what counts as harm, when deference is a virtue and
when it is a failure, whether the individual or the relationship
is the unit that matters. These are not parameters anyone set.
They are the sediment of the training data, and they surface in
exactly the places where the system is being trusted to exercise
judgment.

I made a version of this argument [about driving](https://jameshoward.us/2026/05/04/whose-values-drive-your-car/)
earlier this year: an autonomous vehicle's split-second choices
encode somebody's ethics, chosen upstream, invisible at the point
of use. The argument scales. A model built primarily from one
philosophical tradition will weigh social harmony against
individual assertion differently than a model built from another.
It will draw the line between guidance and intrusion in a
different place. Two systems can be equally capable, equally
aligned by their builders' standards, and give systematically
different answers to the same question, because the question was
never technical.

This is why the phrase algorithmic sovereignty is going to matter
more every year. When a country, a company, or a person adopts a
model, they are importing a value system along with the
capability, usually without an inventory of what is in the
container. The history of AI offers no precedent for this,
because previous generations of the technology did not speak. A
decision tree has biases; it does not have a worldview. Language
models have worldviews, plural, and choosing among providers is
now partly a choice among philosophical traditions embedded at a
depth no procurement checklist currently reaches. The question to
ask of any consequential deployment is no longer only whether the
model is accurate. It is whose values are running, and whether
anyone checked.

## Three Professions, Each Half Right

The AI argument is really three professions talking past each
other, and the history shows each of them holding one correct
insight and one correctable error.

The engineers are right that the capability is real. Anyone who
lived through the pattern-recognition plateau of the 1990s and
then watched ImageNet fall knows the difference between hype and a
phase change, and this is a phase change. The engineering error is
believing that because the capability is real, deployment is an
engineering problem. It is not. Deployment is a systems problem,
an incentives problem, and a values problem, and the model is the
component of that system easiest to build and hardest to blame.

The economists are right that AI decomposes work into tasks
rather than consuming jobs whole, and that substitution and
complementarity will do what they have done through every previous
technology transition, unevenly and with real casualties whose
pain is not refuted by the aggregate statistics. The economic
error is treating intelligence as a homogeneous input, a quantity
of which machines now supply more at lower cost. The history
argues otherwise: every era of AI automated a different narrow
slice of cognition and left the rest untouched, and there is no
reason to believe the current slice, wide as it is, is the whole
loaf.

The philosophers are right that the value questions are load
bearing and cannot be delegated to the loss function. Alignment,
fairness, and accountability are not engineering constraints to
be satisfied; they are contested moral terrain that the systems
now occupy whether anyone resolved the contests or not. The
philosophical error is the tempo. Deployment is not waiting for
the seminar to conclude. The values questions are being settled
right now, by default, in the training data and the product
decisions, and a discipline that prefers its answers rigorous
and late is ceding the field to answers that are sloppy and
early.

The useful posture takes the correct half from each: the
capability is real, the economics are task-level, and the values
are load bearing, and any analysis missing one of the three legs
falls over.

## The Pattern Is the Instruction

I have spent a career deploying these systems in domains where
being wrong has consequences: forecasting political instability,
modeling epidemics, assessing whether cryptographic
implementations complied with federal standards. The consistent
lesson from that work is not that the models were weak. It is
that the model was never the deliverable. The deliverable was a
decision someone could defend afterward, and everything that
made the decision defensible, the validation, the documented
limits, the human who could explain the reasoning to a skeptic,
lived outside the model.

That is what the seventy-year history keeps teaching, winter
after winter, renaming after renaming. The technology changes.
The discipline required to use it responsibly does not. Govern
decisions, because the technology label will not hold still long
enough to govern. Fund problems, because the correction always
comes for the deployments that were only ever demonstrations.
Inventory the values, because the systems now carry them whether
inventoried or not. And keep all three professions in the room,
because each one can see exactly the failure mode the other two
are walking into.

The question this series set out to answer was what artificial
intelligence is. The answer turned out to be a mirror: AI is the
name we give to the frontier of our own uncertainty, and it
retreats exactly as fast as our understanding advances. Fifty
years from now, most of what alarms us today will be plumbing,
unremarked and load bearing, and the people of that time will be
alarmed about something else wearing the same name. They will be
convinced, as every generation before them, that this time the
machines have finally crossed the line. The most valuable thing
the history can give them is the same thing it gives us: the
knowledge that the feeling of unprecedentedness is itself the
most precedented thing about the whole story.[^plumbing]

[^thermostat]: The thermostat has been making decisions on your
  behalf, without explanation or appeal, for a century. Nobody
  has demanded an impact assessment. This is either evidence that
  we regulate by novelty rather than by consequence, or evidence
  that the thermostat has excellent lobbyists.

[^plumbing]: Plumbing is meant as a compliment. Civilization is
  mostly plumbing: infrastructure that works so reliably it has
  forfeited the right to be interesting. The highest honor a
  technology can earn is to bore us. AI has been collecting that
  honor in installments since 1956, one renamed capability at a
  time.