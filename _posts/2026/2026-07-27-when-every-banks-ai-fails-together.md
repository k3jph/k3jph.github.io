---
layout: post
title: "When Every Bank's AI Fails Together"
date: 2026-07-27
author: k3jph
permalink: /2026/07/27/when-every-banks-ai-fails-together/
featured_image: /assets/img/2026/when-every-banks-ai-fails-together.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - Federal Reserve
  - financial stability
  - systemic risk
  - AI governance
  - banking
---

Financial regulation is built on a useful fiction: that banks make
mistakes independently of one another. This assumption underpins
diversification requirements, stress testing methodology, and most
of what the Federal Reserve does in its financial stability role.
When a large bank fails, the system absorbs it because other banks
are not failing for the same reason at the same moment. The
correlations that do exist, credit cycle exposure, sovereign debt
concentration, are tracked carefully because they threaten that
independence.

AI is creating a new version of this problem, and the Fed has not
yet said so clearly enough.

## The Monoculture Problem

When financial institutions independently develop their own credit
models, fraud detection systems, and trading algorithms, their errors
are at least partially uncorrelated. One bank's model overweights
employment stability; another's overweights debt-to-income ratios.
They make different mistakes at different times. The system is
resilient because no single error propagates everywhere at once.

That assumption erodes when institutions draw from the same
foundation models, the same training pipelines, or the same
handful of AI vendors. If the underlying model has a systematic
blind spot, every institution that uses it shares that blind spot.
If the model behaves unexpectedly under novel market conditions,
every institution exposed to it is exposed simultaneously. The
correlated failure scenario the Fed is supposed to prevent has
a new mechanism.

This is not a hypothetical. The Fed has watched this pattern
play out before in a different register. Before 2008, virtually
every major financial institution used similar Value-at-Risk
models built on similar assumptions about tail risk and
volatility correlations. The models were independently developed
but structurally homogeneous. When their shared assumptions
failed, they failed everywhere at once. The [Financial Crisis
Inquiry Commission report](https://fcic-static.law.stanford.edu/cdn_media/fcic-reports/fcic_final_report_full.pdf)
identified this correlated model risk as a contributing factor
to the severity of the collapse.

AI introduces the same structural homogeneity through a different
route: not shared assumptions independently arrived at, but shared
models and vendors directly. The risk is more concentrated, not
less.

## The Fed Already Has the Framework

The Federal Reserve monitors concentration risk across a range
of dimensions. Counterparty concentration. Geographic
concentration. Sector concentration. When too much of the
financial system depends on a single node, that node becomes
a systemic concern regardless of how sound it looks in isolation.

The Fed also already regulates technology service provider
concentration in banking. The interagency guidance in
[SR 23-4](https://www.federalreserve.gov/supervisionreg/srletters/sr2304.htm)
addresses third-party risk management, and examiners regularly
assess what happens when a critical technology vendor fails.
The logic extends directly to AI providers. If a significant
fraction of systemically important financial institutions depend
on the same AI platform for credit decisioning or risk
assessment, that platform is a systemic risk node by the same
reasoning that makes a dominant core banking vendor a systemic
risk node.

The framework is there. The Fed has not yet applied it
explicitly to AI.

## What the Fed Should Do

Three things, none of which require new statutory authority.

First, add AI provider concentration to the Financial Stability
Report's monitoring framework. The Fed's [semiannual Financial
Stability Report](https://www.federalreserve.gov/publications/financial-stability-report.htm)
tracks vulnerabilities across asset valuation, borrowing,
leverage, and funding risk. Algorithmic monoculture across
systemically important institutions is a vulnerability of the
same kind. It belongs in the report.

Second, incorporate AI model failure into stress test scenario
design. The Dodd-Frank stress tests ask what happens when
the economy deteriorates in specified ways. They do not yet
ask what happens when a widely-deployed AI model produces
systematically wrong outputs under novel conditions. Adding
that scenario is a natural extension of the existing stress
testing mandate.

Third, issue supervisory guidance requiring systemically
important financial institutions to disclose AI systems used
in core functions, the vendors and foundation models
underlying them, and the institution's assessment of
correlated failure exposure. The Fed does not need to prohibit
concentration. It needs to see it clearly enough to assess
whether it is dangerous. Disclosure is the first step.

None of this is conceptually radical. All of it follows from
existing Fed authority and existing Fed practice applied to a
new class of risk. The novelty is in the mechanism, not in the
mandate.

## The Mandate Has Not Changed

The Federal Reserve's financial stability role is to identify
and monitor vulnerabilities that could amplify economic stress.
AI concentration in financial services is that kind of
vulnerability. It does not require a new theory of the Fed's
purpose to see this. It requires applying the theory the Fed
has operated under for a century to a set of institutions
that are rapidly becoming dependent on a small number of AI
providers in ways that create correlated exposure nobody is
currently measuring.
