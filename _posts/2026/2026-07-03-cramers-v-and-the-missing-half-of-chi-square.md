---
layout: post
title: "Cramér's V and the Missing Half of Chi-Square"
date: 2026-07-03
author: k3jph
permalink: /2026/07/03/cramers-v-and-the-missing-half-of-chi-square/
featured_image: /assets/img/2026/cramers-v-and-the-missing-half-of-chi-square.webp
categories:
  - Blog
tags:
  - statistics
  - data science
  - machine learning
  - effect size
  - hypothesis testing
  - AI governance
---

You are auditing a loan approval model for demographic fairness. You
build a cross-tabulation of predictions against a protected category
and run a chi-square test. The result comes back p < 0.001. Someone in
the room says the model is biased. Another person wants to halt the
deployment.

Before anyone does anything, ask what the effect size is.

The p-value answers a narrower question: assuming no real association
exists, how surprising would a table this extreme be? With 200,000
observations in your dataset, the chi-square test will flag almost any
nonzero association. A two-percentage-point difference in approval
rates between two groups can be statistically detectable without being
operationally, legally, or morally decisive. Chi-square cannot tell
you which situation you are in. Cramér's V can help.

## What Is Cramér's V?

Cramér's V is an effect size measure for categorical data. Developed
by Swedish mathematician Harald Cramér in the mid-twentieth century,
it takes the chi-square statistic and rescales it to produce a value
between 0 and 1, where 0 means no association and 1 means perfect
association. Unlike chi-square, it does not grow with sample size.
Unlike raw percentages, it accounts for the dimensions of the
contingency table, making it comparable across different study designs.

It belongs to the same family of tools discussed in an earlier post on
[statistical versus practical significance](/2026/06/02/proving-something-is-true-is-not-the-same-as-proving-it-matters/).
That post made the general case that a significant p-value is not
evidence of a meaningful result. Cramér's V is one of the specific
instruments for making that case rigorous when your variables are
categorical.

## The Problem with Chi-Square Alone

The [chi-square test of independence](https://www.itl.nist.gov/div898/handbook/eda/section3/eda35f.htm)
answers a yes-or-no question: is there a statistically significant
association between two categorical variables? It does this well. The
problem is what happens next.

With a small dataset, chi-square is conservative. A real association
may fail to reach significance simply because there is not enough data
to detect it reliably. With a large dataset, the opposite problem
emerges. Chi-square gains power with every observation added, which
means that with enough data, trivially small associations will register
as statistically significant. The test was not designed to tell you
whether an association is worth caring about. It was designed to tell
you whether it exists.

This is not a flaw in the test. It is a misunderstanding of what the
test does. The flaw enters when practitioners treat statistical
significance as a proxy for substantive importance, a confusion that
[carries real costs](https://www.tandfonline.com/doi/full/10.1080/00031305.2019.1583913).

## How Cramér's V Works

The formula builds directly on chi-square:

$$
V = \sqrt{\frac{\chi^2}{n \cdot \min(r - 1,\ c - 1)}}
$$

where $$\chi^2$$ is the chi-square statistic from the test of
independence, $$n$$ is the total sample size, $$r$$ is the number of
rows, and $$c$$ is the number of columns. The term $$\min(r - 1, c - 1)$$
adjusts for the dimensions of the table so that results are comparable
across different contingency table sizes.

The resulting value is always between 0 and 1. For a 2x2 table, Cohen's
conventions provide a useful starting rubric:

<div>
  <table class="table align-items-center">
    <thead class="thead-light">
      <tr>
        <th scope="col">Effect Size</th>
        <th scope="col" class="text-center">V (2x2 table)</th>
        <th scope="col" class="text-center">V (3x3 table)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Small</td>
        <td class="text-center">0.10</td>
        <td class="text-center">0.07</td>
      </tr>
      <tr>
        <td>Medium</td>
        <td class="text-center">0.30</td>
        <td class="text-center">0.21</td>
      </tr>
      <tr>
        <td>Large</td>
        <td class="text-center">0.50</td>
        <td class="text-center">0.35</td>
      </tr>
    </tbody>
  </table>
</div>

These thresholds are not laws of nature. The second column applies
whenever the table's smaller dimension has three levels, a 3x3 table or
a 2x4 table both qualify, since the formula scales by min(r - 1, c - 1)
rather than by the variable's level count alone. A V of 0.08 in one
domain might represent a practically important effect while in another
it is background noise. The rubric gives you a starting point, not a
verdict.

## Example Walkthrough

Return to the loan model audit. The dataset contains 200,000
predictions: 100,000 from Group A and 100,000 from Group B.

<div>
  <table class="table align-items-center">
    <thead class="thead-light">
      <tr>
        <th scope="col"></th>
        <th scope="col" class="text-center">Approved</th>
        <th scope="col" class="text-center">Denied</th>
        <th scope="col" class="text-center">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Group A</th>
        <td class="text-center">71,000</td>
        <td class="text-center">29,000</td>
        <td class="text-center">100,000</td>
      </tr>
      <tr>
        <th scope="row">Group B</th>
        <td class="text-center">69,000</td>
        <td class="text-center">31,000</td>
        <td class="text-center">100,000</td>
      </tr>
      <tr>
        <th scope="row"><strong>Total</strong></th>
        <td class="text-center">140,000</td>
        <td class="text-center">60,000</td>
        <td class="text-center">200,000</td>
      </tr>
    </tbody>
  </table>
</div>

Group A is approved at a 71% rate; Group B at 69%. The chi-square test
produces a statistic of approximately 95.2, which with one degree of
freedom yields a p-value of approximately $$1.7 \times 10^{-22}$$,
statistically significant beyond any conventional threshold.

Now apply the Cramér's V formula:

$$
V = \sqrt{\frac{95.2}{200{,}000 \times \min(2 - 1,\ 2 - 1)}} =
\sqrt{\frac{95.2}{200{,}000}} \approx 0.022
$$

A V of 0.022 falls far below the conventional small-effect threshold
of 0.10 for a 2x2 table. The association is real in a statistical
sense and negligible in a practical one. The 2-percentage-point
difference in approval rates is detectable because you have 200,000
observations, not because it represents meaningful disparity.

This does not automatically mean the model is fair. It means the
decision about whether a 2-point differential constitutes unfair
treatment is a policy question, not a statistical one, and chi-square
alone cannot make it for you.

## In Code

Both Python and R make Cramér's V straightforward to compute once you
have the chi-square result.

### Python Example

```python
import numpy as np
from scipy.stats import chi2_contingency

# Observed contingency table
table = np.array([[71000, 29000],
                  [69000, 31000]])

# Run chi-square test (disable Yates's correction to match the
# uncorrected Pearson statistic used in the walkthrough above)
chi2, p, dof, expected = chi2_contingency(table, correction=False)

# Compute Cramér's V
n = table.sum()
min_dim = min(table.shape) - 1
cramers_v = np.sqrt(chi2 / (n * min_dim))

print(f"Chi-square: {chi2:.2f}")
print(f"p-value: {p:.4e}")
print(f"Cramér's V: {cramers_v:.4f}")
```

This will output a chi-square of approximately 95.24, a p-value of
approximately $$1.7 \times 10^{-22}$$, and a Cramér's V of 0.0218.

### R Example

```R
# Observed contingency table
table <- matrix(c(71000, 29000, 69000, 31000), nrow = 2, byrow = TRUE)

# Run chi-square test (disable Yates's correction to match the
# uncorrected Pearson statistic used in the walkthrough above)
result <- chisq.test(table, correct = FALSE)

# Compute Cramér's V
chi2 <- result$statistic
n <- sum(table)
min_dim <- min(dim(table)) - 1
cramers_v <- sqrt(chi2 / (n * min_dim))

cat("Chi-square:", chi2, "\n")
cat("p-value:", result$p.value, "\n")
cat("Cramér's V:", cramers_v, "\n")
```

The `rcompanion` package also provides a `cramerV()` function that
computes this directly from a contingency table if you prefer a
one-step solution.

## Why Is It Overlooked?

For much the same reason as [McNemar's test](/2024/12/17/mcnemars-test-the-hidden-gem-for-paired-binary-data/)
and [Cochran's Q](/2025/01/27/cochrans-q-test-a-simple-tool-for-complex-decisions/):
most applied workflows end at the p-value. Chi-square is built into
every statistical software package and its output is a test statistic
and a p-value. Effect size requires an additional computation step that
most tutorials and textbooks omit, which means most practitioners omit
it too.

There is also a subtler reason. When a chi-square result is
significant, it tends to feel complete. The test answered the question.
What more is there? The answer is that significance tells you the data
are hard to reconcile with independence. It does not tell you how
large the association is or whether it matters. Those are different
questions, and answering the first one does not make the second one go
away.

## Conclusion

Chi-square is a reliable and well-understood tool for detecting
associations between categorical variables. Cramér's V is what you
reach for after chi-square returns significant: a normalized,
interpretable measure of how strong that association actually is.
Adding it to your workflow costs one line of code and can prevent a
result that is statistically significant but practically trivial from
being treated as one that matters.

The next time a p-value comes back below 0.001, run Cramér's V before
you write the conclusion.