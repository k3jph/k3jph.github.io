---
id: hypothesis-testing-for-inter-rater-reliability
layout: post
title: Hypothesis Testing for Inter-Rater Reliability
date: 2025-09-03
author: k3jph
permalink: /2025/09/03/hypothesis-testing-for-inter-rater-reliability
featured_image: /assets/img/2025/hypothesis-testing-for-inter-rater-reliability.webp
categories:
  - Blog
tags:
  - statistics
  - hypothesis testing
  - inter-rater reliability
  - Cohen's kappa
  - research design
---


Hypothesis testing for inter-rater agreement sounds like something you might find buried in the appendix of a methods textbook, but it shows up in more of our lives than we realize. Any time two or more people are asked to make judgments about the same thing—diagnosing a disease, scoring an essay, or reviewing the same body camera footage—there is the lurking question: are these raters actually consistent, or do they just look consistent because they tend to use the same labels?

### What kappa is doing

The workhorse here is Cohen’s kappa, introduced in 1960. The basic idea is simple. Suppose two physicians are reviewing chest X-rays, deciding whether each one shows pneumonia. They agree 80% of the time. At first blush, that sounds good, but what if both doctors just tend to call most X-rays “normal”? They would still agree most of the time by chance, even if they were not very careful. Kappa corrects for that baseline chance agreement.

Formally, kappa is:

[latex]\kappa = \frac{P_o - P_e}{1 - P_e}[/latex]

where [latex]P_o[/latex] is the observed proportion of agreement, and [latex]P_e[/latex] is the proportion expected by chance, given each rater’s overall distribution of responses. If the raters are agreeing exactly at chance, κ = 0. If they are perfectly consistent, κ = 1. Negative values can even occur if the raters disagree systematically.

### Why hypothesis testing matters

An estimate of kappa is just that—an estimate. In practice, we want to know whether our observed κ is large enough to clear some benchmark. In public health, for example, the FDA might require “substantial” reliability before a diagnostic test can be used in practice. In education, an accreditation body may expect essay scores to achieve κ ≥ 0.60 to be considered credible. In the courts, forensic evidence may be rejected if inter-rater agreement is not demonstrably higher than chance.

The hypothesis test is usually framed as:

[latex]H_0: \kappa \le \kappa_0 \quad \text{vs.} \quad H_1: \kappa > \kappa_0[/latex]

where κ₀ is some minimum threshold (e.g., 0.40 for “fair” agreement). If the test statistic exceeds the critical value, we reject the null and conclude the raters are genuinely consistent beyond the baseline.

### Power and sample size

The crucial step is design. Too many reliability studies are underpowered. With a small number of items—say, twenty patient charts—the variance of κ is high, and even if the “true” κ is 0.60, the study might fail to reject a null of 0.40.

In one of my worked examples, if two raters are classifying items into three categories with expected proportions 0.5, 0.3, and 0.2, then about one hundred items are needed to have 80% power to reject κ = 0.40 in favor of κ = 0.60 at the 5% significance level. At fifty items, power is closer to 50%. This is the same lesson we draw in drug trials: if you do not plan for adequate sample size, you cannot expect your results to be conclusive.

### Applications across domains

-   **Public health.** Epidemiologists validating whether field surveyors agree on case definitions need strong inter-rater reliability before reporting prevalence estimates. If κ is only 0.30, we cannot trust the numbers, no matter how large the survey.
-   **Education.** Standardized essay scoring often requires two independent graders. Testing whether κ exceeds 0.70 is a staple part of reliability reporting, because a high-stakes exam should not depend on whether you drew a lenient or strict grader.
-   **Law enforcement.** When two officers independently code use-of-force incidents from body camera footage, κ is the line between defensible consistency and potentially arbitrary judgments that can be challenged in court.
    

In each of these cases, the hypothesis test is not academic nitpicking. It is the difference between evidence that can be used and evidence that cannot.

### Example code in Python

Here is a minimal example in Python using `scikit-learn` and simulation:

{% highlight python %}  
import numpy as np  
from sklearn.metrics import cohen_kappa_score  
from statsmodels.stats.power import NormalIndPower

# Simulate two raters on 100 items, 3 categories

np.random.seed(123)  
rater1 = np.random.choice([0,1,2], size=100, p=[0.5,0.3,0.2])

# Rater2 agrees 70% of time, otherwise random

rater2 = [r if np.random.rand() < 0.7 else np.random.choice([0,1,2]) for r in rater1]

kappa = cohen_kappa_score(rater1, rater2)  
print("Estimated kappa:", kappa)

# Approximate hypothesis test: H0 kappa=0.4 vs H1>0.4

# Here we'd need variance estimates or bootstrap

# Simple bootstrap:

boots = []  
for _ in range(1000):  
idx = np.random.choice(range(100), size=100, replace=True)  
boots.append(cohen_kappa_score(np.array(rater1)[idx], np.array(rater2)[idx]))  
pval = np.mean([b <= 0.4 for b in boots])  
print("Bootstrap p-value for H0: kappa <= 0.4:", pval)  
{% endhighlight %}

### Example code in R

R has the `irr` and `kappaSize` packages that make this easier. Here is a sketch:

{% highlight r %}  
library(irr)  
library(kappaSize)

# Example: two raters, 100 subjects, 3 categories

set.seed(123)  
rater1 <- sample(c(1,2,3), size=100, replace=TRUE, prob=c(0.5,0.3,0.2))  
rater2 <- ifelse(runif(100) < 0.7, rater1, sample(c(1,2,3), 100, replace=TRUE))

kappa2(cbind(rater1, rater2))

# Power calculation: detect kappa = 0.6 vs null 0.4, 3 categories

power.kappa(nsubjects=100, nraters=2, prop=c(0.5,0.3,0.2),  
kappa0=0.4, kappa1=0.6, alpha=0.05)  
{% endhighlight %}

These tools take care of much of the variance computation, so you do not need to derive the test statistic by hand.

### Closing thought

Hypothesis testing for inter-rater agreement reminds us that agreement is not a given. It is something we measure, something we test, and something we can fail to demonstrate if we do not design our studies carefully. Whether it is public health data, classroom grading, or legal evidence, the integrity of the conclusions depends on showing that two people looking at the same thing are not just flipping coins in parallel.
