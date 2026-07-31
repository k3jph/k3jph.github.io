---
id: effective-challenge-is-now-optional
title: "Effective Challenge Is Now Optional"
date: 2026-07-30
author: k3jph
layout: post
permalink: /2026/07/30/effective-challenge-is-now-optional/
featured_image: /assets/img/2026/effective-challenge-is-now-optional.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - AI governance
  - financial regulation
  - systemic risk
  - Federal Reserve
  - banking
---

On April 17, 2026, the Federal Reserve Board, the Office of the
Comptroller of the Currency, and the Federal Deposit Insurance
Corporation took the most battle-tested governance framework in
American finance and wrote generative and agentic AI out of it.

They did not do this by accident. They did not do this because
nobody had thought of it. They did it in writing, in a bulletin
with a date and a signature, at the exact moment every bank in the
country was deciding what to do with generative and agentic AI in
production. The framework had a name. It is called model risk
management, and it is the closest thing American finance has to a
constitution for how organizations are allowed to deploy systems
they do not fully understand.

They had it. They built it the hard way. And they put it down.

## What Got Built

The framework is known by its supervisory letter number, [SR 11-7](https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107.pdf),
issued jointly by the Fed and the OCC in April 2011, later adopted
by the FDIC in 2017, three years after a financial crisis caused in
large part by institutions that trusted models they had never
seriously challenged. It was not written in the abstract. It was
written by regulators who had just watched mortgage models, rating
models, and risk models fail in the same direction at the same
time, and who wanted a structural answer to the question of how
that happens.

The answer they wrote down has a name too: effective challenge. The
guidance is explicit that managing model risk requires critical
analysis by parties who are objective, informed, and independent
of the people who built the model. Not friendly review. Not a
second pair of eyes from the same team. Independent challenge,
with the authority to force changes. Around that core principle,
the guidance built three pillars: sound development and use,
including documented assumptions and limitations; ongoing
validation and monitoring, including outcomes analysis that checks
whether the model still does what it claimed to do; and governance,
with clear lines of accountability running to the board.

I spent nine years inside the institution that wrote this guidance,
watching it work from the inside. It is not glamorous. It is
paperwork, committees, and examiners asking pointed questions about
assumptions nobody wanted to revisit. It is one reason the
post-2008 banking system treated model governance as a standing
discipline rather than an optional best practice. The discipline
is unglamorous because discipline usually is. That is what
discipline is for.

For fifteen years, this guidance shaped how major regulated
banking organizations built, deployed, and monitored consequential
models. It covered credit scoring. It covered fraud detection. It
covered stress testing and capital adequacy. The definition of
"model" in the guidance was broad enough,
deliberately, to cover anything that used statistical, financial,
or economic theory to turn data into a decision. A neural network
deciding who gets a loan fits inside that definition as cleanly as
a regression model did in 2011. The framework was never about the
technology. It was about the discipline of not trusting a system
you have not independently challenged.

## What Got Walked Back

The April 2026 revision keeps the architecture. It still talks
about development, validation, and governance. It still uses the
language of effective challenge, and it says outright that its
principles continue to apply to traditional statistical models and
to AI models that are not generative or agentic. But it adds
language that guts the thing for the one category of system
arriving fastest. The [full revised guidance](https://www.federalreserve.gov/supervisionreg/srletters/SR2602.pdf)
is public record, issued jointly by the Fed, the OCC, and the FDIC
and summarized by the OCC in [Bulletin 2026-13](https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html).

The first states plainly that generative AI and agentic AI models
are novel and rapidly evolving, and are therefore not within the
scope of the guidance.[^scope] Read that again. The single most
important class of AI deployment now entering financial
institutions, the systems that draft credit memos, run agentic
trading strategies, and increasingly sit inside the underwriting
pipeline itself, was explicitly excluded from the one framework
built to catch exactly this kind of risk. Not because the framework
does not apply. Because the regulators decided, in writing, that it
would not.

The second sentence is worse, because it is quieter. The revised
guidance states outright that it does not set enforceable standards,
and that non-compliance will not result in supervisory criticism.
For fifteen years, SR 11-7 functioned as a de facto requirement,
because examiners cited it, because institutions built whole
divisions around satisfying it, because the practical cost of
ignoring it was real even though the document itself was always
technically advisory. That practical enforceability is now gone by
explicit statement. The guidance that survives is a framework banks
may consult if they feel like it.

A regulatory agency does not need to repeal a rule to neuter it. It
only needs to announce, clearly, that the rule no longer carries
consequences. That is what happened here, on the record, dated
April 17, 2026.

There is a third narrowing worth noting alongside the other two.
The revised guidance states that it is expected to be most relevant
to institutions with more than $30 billion in total assets, with
smaller institutions presumed to be adequately governed by their
own internal practices unless they show unusual model exposure.
That threshold was not part of the 2011 guidance, which applied
based on model risk, not balance sheet size. Scope has narrowed on
every available axis at once: by technology, by enforceability, and
now by institutional size.

## The Kind of Systemic Risk Nobody Is Watching For

The standard story about systemic risk is concentration. One
institution gets large enough, interconnected enough, that its
failure cascades through every counterparty attached to it. Too
big to fail. It is a real risk, and it is the one everyone is
trained to watch for, because it produces a single dramatic
headline and a single dramatic bailout.

It was never the whole story, even in 2008. The 2008 crisis was not
primarily one giant institution failing and dragging the system down
with it. It was thousands of individually unremarkable decisions,
made by different institutions, using different models, that turned
out to be the same bad bet, made everywhere, at once. No single
mortgage originator was systemically important on its own. The
correlation was the risk. Everyone was independently making the
same mistake because everyone was looking at the same flawed
inputs, using methodologically similar models, validated by the
same handful of rating agencies, none of whom had the independence
or the incentive to challenge the shared assumption underneath all
of it.[^monoculture]

That is the second kind of systemic risk, and it does not require
concentration at all. It requires synchronized recklessness across
actors who each believe they are the only one cutting corners,
combined with the absence of anything positioned to see the pattern
across the whole system rather than inside any single firm. Under
SR 11-7, effective challenge is defined as a firm-level discipline,
critical analysis by objective, independent experts inside a given
institution. No single bank's internal validation team is built to
notice that every other bank made the same modeling choice. That
gap is exactly where firm-level effective challenge and
supervisory visibility are supposed to meet. Internal validation
challenges a bank's own assumptions. Supervisors, examining
institution after institution, are positioned to notice when the
same assumption is quietly showing up everywhere at once. Take the
guidance off the table for an entire category of model, and that
second layer of visibility goes dark for exactly the systems most
likely to share a common blind spot.

Now look at what is actually happening in AI deployment across
finance right now. A small number of foundation model providers
supply the underlying systems that an enormous number of
institutions are building agentic and generative tools on top of.
The diversity of institutions is not matched by diversity of
underlying models. If there is a shared blind spot baked into how
one of these foundation models reasons, weighs evidence, or fails
under particular kinds of pressure, that blind spot does not stay
contained inside one bank. It propagates to every institution that
built on the same foundation. This is the rating-agency monoculture
problem of 2008, wearing a new technology, deployed at greater
speed and lower visibility than anything that came before it. And
the guidance whose firm-level discipline gives supervisors their
clearest window into correlated model risk across institutions was
just told, in writing, that this exact category of system falls
outside its job.

Systemic risk is not only the institution too big to fail. It is
also the system cut loose from the constraint specifically designed
to stop everyone from independently making the same catastrophic
assumption at the same time. The Fed, the OCC, and the FDIC did not
fail to anticipate this. They had already built and field-tested the
mechanism that catches it. They looked directly at the moment it
mattered most and stepped back from using it.

## Proof It Did Not Have to Happen This Way

The frustrating part is that another federal regulator, working the
same problem, made the opposite choice. The Consumer Financial
Protection Bureau has been explicit, in
[Circular 2022-03](https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/)
and again in
[Circular 2023-03](https://www.federalregister.gov/documents/2024/04/17/2024-08003/consumer-financial-protection-circular-2023-03-adverse-action-notification-requirements-and-proper),
that the Equal Credit Opportunity Act's
requirement for specific, accurate reasons behind a credit denial
applies fully to AI-driven underwriting. A creditor cannot point to
algorithmic complexity as an excuse for failing to explain why
someone was denied credit. Black-box reasoning is not a defense.
The CFPB held the line that opacity does not exempt an institution
from accountability, at the exact moment the prudential bank
regulators were drawing the opposite conclusion about the framework
built to manage that same opacity at the model level.

One agency said the technology does not get an exemption from
explaining itself. Another said, about the framework built to
challenge that technology before it ever reaches a customer, that
the technology is too new to be covered. Those two positions may be
legally distinguishable, since they govern different obligations.
But as governance instincts, applied to the same underlying
technology at the same moment, they point in opposite directions.

## What This Actually Means

This is not a prediction with a date attached. Nobody can tell you
when the next correlated failure surfaces, and anyone who tells you
they can is selling something. What can be said with confidence is
narrower and more damning: the structural precondition for the next
correlated financial crisis, model risk concentrated across
institutions with no independent mechanism positioned to catch it,
has just been rebuilt, on purpose, in writing, by the agencies whose
entire job is preventing exactly that.

They did not fail to build the guardrail. They built it once,
proved it worked for fifteen years across a generation of financial
technology, and then, at the one moment a new and faster-moving
technology made that guardrail more necessary than ever, took it
down with their own hands and called the removal an update.

[^scope]: The exact language, from OCC Bulletin 2026-13, issued
  jointly with the Federal Reserve Board and the FDIC: generative
  AI and agentic AI models are "novel and rapidly evolving" and
  therefore outside the scope of the guidance. Four words doing a
  great deal of regulatory work. Every technology covered by SR
  11-7 was, at some point, novel and rapidly evolving. That is
  what model risk management exists to manage. Citing novelty as a
  reason to exempt a technology from oversight is citing the
  symptom as the cure.

[^monoculture]: The ratings agency comparison is not loose. The
  [Financial Crisis Inquiry Report](https://www.govinfo.gov/content/pkg/GPO-FCIC/pdf/GPO-FCIC.pdf)
  found that Moody's, S&P, and Fitch were central to the 2008
  crisis, and that their ratings could not have been relied on as
  heavily as they were without serious failures in how those
  ratings accounted for correlated risk across mortgage categories.
  The point is not that the agencies coordinated the mistake. It is
  that similar incentives, similar inputs, and similar correlation
  assumptions produced similar failures across firms that never
  needed to talk to each other to all be wrong in the same way. A
  handful of foundation model providers sitting underneath an
  enormous share of deployed financial AI is the same structural
  setup with a different vintage of mathematics.