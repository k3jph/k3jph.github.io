---
id: proving-something-is-true-is-not-the-same-as-proving-it-matters
title: "Proving Something Is True Is Not the Same as Proving It Matters"
date: 2026-06-02
author: k3jph
layout: post
permalink: /2026/06/02/proving-something-is-true-is-not-the-same-as-proving-it-matters/
featured_image: /assets/img/2026/proving-something-is-true-is-not-the-same-as-proving-it-matters.webp
categories:
  - Blog
tags:
  - statistics
  - statistical significance
  - practical significance
  - effect size
  - research methods
  - public health
---

Hantavirus is in the news this week. The MV Hondius outbreak, the
Andes strain, American passengers in quarantine at the University
of Nebraska Medical Center as of this writing. People are paying
attention to statistics they do not normally look at, including
case fatality rates, incubation periods, and what the numbers
actually mean for an individual who has been exposed.

This is a reasonable moment to talk about something that comes up
constantly in applied statistics, in clinical research, in policy
analysis, and in essentially any field where numbers are used to
make decisions: the difference between statistical significance and
practical significance. They are not the same thing. Treating them
as equivalent is one of the most persistent and consequential errors
in quantitative reasoning, and it runs through the scientific
literature, the regulatory process, and the public discourse in
ways that cause real harm.

## What Statistical Significance Actually Says

A statistically significant result is one that is unlikely to have
occurred by chance, given the data. That is all it says. It does not
say the result is large. It does not say the result is important. It
does not say the result should change anything anyone does. It says
the signal is probably real.

The standard threshold is p < 0.05, meaning there is less than a 5
percent probability of observing a result at least this extreme if
the null hypothesis were true. This threshold was more or less
arbitrarily set by Ronald Fisher in the 1920s and has been
entrenched in scientific practice ever since, not because 5 percent
is the right number but because everyone agrees to use the same
number and coordination has value.[^1]

The p-value is a well-defined and useful quantity. The problem is
not the p-value itself. The problem is that reporting a p-value and
stopping there omits the question that actually drives decisions:
how big is the effect, and does a difference of that size matter in
this context?

## The Hypothetical That Makes This Concrete

Consider the following scenario, constructed for illustration. These
are not real study results; the numbers are chosen to make the logic
as clear as possible.

A research team conducts a large long-term prospective study
examining whether daily milk consumption is associated with
longevity. They enroll tens of thousands of participants, follow
them for decades, and find a statistically significant association:
regular milk drinkers live, on average, approximately one week
longer than non-milk drinkers. The p-value is well below 0.001.
The result is real. The signal is not noise.

Now the team publishes. The abstract says "statistically significant
association between milk consumption and longevity (p < 0.001)."
A public health agency notices. Someone writes a brief. A policy
conversation begins about whether to promote milk consumption for
its longevity benefits.

One week. Across a seventy-year life. In a large population study
with all the confounding that entails, with an average difference
measured in days, over a lifetime of dietary choices that interact
with genetics, environment, and hundreds of other variables.

The statistical result is not wrong. The inference from that result
to a meaningful public health intervention is wrong. The difference
is real and the difference does not matter. Those two statements are
not in contradiction.

## The Same Number, Completely Different Meaning

Now consider a different scenario. A patient has been diagnosed with
hantavirus pulmonary syndrome. The Andes strain, which is the virus
behind the current MV Hondius outbreak, has a [case fatality rate
estimated at approximately
38%](https://www.cdc.gov/han/php/notices/han00528.html) among
patients with severe respiratory symptoms. The
[CDC's clinical brief on
HPS](https://www.cdc.gov/hantavirus/hcp/clinical-overview/hps.html)
notes that without adequate treatment, most deaths in HPS patients
occur within 24 to 48 hours of the cardiopulmonary phase onset.
The disease, once it turns, moves fast.

Suppose a clinical trial evaluates a new supportive care protocol
and finds that patients receiving the intervention survive, on
average, approximately one week longer than those receiving standard
care. The result is statistically significant at p < 0.001.

One week.

The same number as the milk study. An identical effect size,
measured in the same units.

In the HPS context, one additional week of survival is not a small
effect. It may be the margin between reaching extracorporeal membrane
oxygenation in time and not reaching it. It may be the margin between
a treatment window opening and closing. One week in a disease that
kills within 24 to 48 hours of acute phase onset is an enormous
amount of time. A clinician presented with this result should pay
very close attention to it.

The statistical machinery produced the same p-value and the same
effect size. The practical significance of that effect is not the
same. It is not close to the same. The difference between the two
scenarios is not in the numbers. It is entirely in the decision
context: what are the stakes, what is the baseline, what does a
difference of this magnitude mean for the people affected?

## Why This Matters Beyond Hypotheticals

This is not a theoretical puzzle. The conflation of statistical
significance with practical significance runs through the scientific
literature in ways that shape funding, publication, regulatory
approval, and clinical practice.

Journals have historically been more likely to publish significant
results than null results, which creates publication bias: the
literature systematically overrepresents findings that crossed the
p < 0.05 threshold, regardless of whether the underlying effect
sizes were meaningful. A large enough sample will make almost any
difference statistically significant. A study with a hundred
thousand participants can detect an effect so small that it has no
plausible bearing on any decision anyone would make, and that
result will pass peer review and appear in print as a "significant
finding."

Regulatory agencies have begun to grapple with this. The FDA's
guidance on clinical significance, the EMA's frameworks for
meaningful benefit thresholds in drug approval, and the ongoing
debate in oncology over what constitutes a clinically meaningful
improvement in progression-free survival all reflect the
recognition that the p-value is not the answer to the question that
matters. But the practice of leading with statistical significance
and treating practical significance as secondary, when it appears
at all, remains widespread.

## Effect Sizes and Their Limits

The standard toolkit for addressing this problem is effect sizes:
statistics that quantify the magnitude of an effect independent of
sample size. Cohen's d for differences between means, odds ratios
and relative risk in clinical research, number needed to treat for
therapeutic interventions. These are all attempts to give practical
significance a number.

Jacob Cohen, whose 1988 book [*Statistical Power Analysis for the
Behavioral
Sciences*](https://www.taylorfrancis.com/books/mono/10.4324/9780203771587/statistical-power-analysis-behavioral-sciences-jacob-cohen)
remains the standard reference, proposed conventional thresholds
for interpreting effect sizes: small, medium, and large. He proposed
them reluctantly, using them only "when no better basis was
available," and later told colleagues he regretted having suggested
them at all. His concern, which [Funder and Ozer articulated clearly
in a 2019 paper in *Advances in Methods and Practices in
Psychological
Science*](https://journals.sagepub.com/doi/10.1177/2515245919847202),
is that the terms small, medium, and large are meaningless in the
absence of a frame of reference.

The milk study and the HPS study might produce identical Cohen's d
values. The label "medium effect" tells you nothing about whether
that effect should change behavior in either context. Cohen's
benchmarks are a last resort, not a substitute for thinking about
what the effect means in the specific context where the decision
is being made.

The solution is not to abandon effect sizes. The solution is to
pair them with contextual reasoning that the p-value and the effect
size index, taken alone, cannot supply. What is the baseline? What
is the cost and risk of the intervention? Who bears the effect and
who bears the cost? What is the decision that this result is
supposed to inform?

## The Practical Upshot

When you read a study that reports a statistically significant
result, two questions should follow immediately. First: how large
is the effect? Second: given the context, does an effect of that
size matter?

In the milk scenario, the answer to the second question is almost
certainly no, and no public health intervention should follow from
the finding without a much more serious accounting of the effect
size against the costs and complexities of dietary intervention at
scale.

In the HPS scenario, the answer to the second question depends on
the specifics of the protocol, the patient population, and the
mechanism of the effect. But a week of additional survival in a
disease that can kill within days is a result that warrants serious
attention. The same number, completely different significance.

Statistical significance is a gate, not a destination. It tells you
the effect is probably real. It does not tell you the effect is
worth caring about. That judgment requires context, domain
knowledge, and a clear account of the decision at hand. None of
those things appear in a p-value, and none of them can be read off
a table of effect size benchmarks.

Practical significance is always, without exception, a contextual
judgment. Any framework that pretends otherwise is giving you the
wrong answer to the wrong question.

---

*The examples in this post are hypothetical constructions for
illustrative purposes; they are not derived from real study results.
The clinical information about hantavirus pulmonary syndrome
reflects current CDC guidance and is accurate as of the date of
this post. For current information on the MV Hondius outbreak, the
[CDC situation summary](https://www.cdc.gov/hantavirus/situation-summary/index.html)
is the authoritative source.*

[^1]: Fisher's 0.05 threshold appears in his 1925 *Statistical
Methods for Research Workers*, where he described it as a convenient
convention rather than a principled cutoff. The threshold's
persistence owes more to coordination than to its being correct.
