---
title: "McNemar's Test: The Hidden Gem for Paired Binary Data"
date: 2024-12-17
author: k3jph
layout: post
permalink: /2024/12/17/mcnemars-test-the-hidden-gem-for-paired-binary-data
featured_image: /assets/img/2024/mcnemars-test-the-hidden-gem-for-paired-binary-data.webp
categories:
  - Blog
tags:
  - statistics
  - A/B testing
  - data science
  - machine learning
  - model evaluation
---

Imagine you are comparing two versions of your churn prediction model.
The old version correctly predicts churn for 70% of customers, while the
new version nails it for 75%. Sounds like progress, right? But how do
you statistically confirm that the improvement is real and not just
luck?

When working with paired binary outcomes like this--success/failure,
yes/no, correct/incorrect--it is easy to fall into the trap of simple
accuracy comparisons. However, those aggregate metrics can be
misleading. Enter McNemar's Test: a simple but powerful statistical test
that evaluates whether changes in paired binary outcomes are
statistically significant.

Let us break it down.

## What Is McNemar's Test?

McNemar's test is a statistical method for determining whether there is
a significant difference in binary outcomes between two related samples.
It is specifically designed for paired nominal data where each subject
or observation is measured twice--such as before and after an
intervention, or by two different models applied to the same dataset. 

Unlike aggregate metrics (e.g., accuracy), McNemar's test focuses on the
cases where the two samples disagree. These disagreements reveal where
performance or outcomes differ, which helps you avoid misleading
conclusions.

### Why Paired Data Matters

Paired data occurs when the same subjects are measured under two
distinct conditions, providing a natural basis for comparison. For
instance, in a medical trial, researchers may assess patient recovery
both before and after administering a treatment. In machine learning,
paired data emerges when two models are evaluated on the same dataset,
allowing direct comparison of their predictions. Similarly, in A/B
testing, paired data reflects user responses to two versions of a
product feature, such as a webpage or application design.

By ensuring each observation in one condition has a direct counterpart
in the other, paired data eliminates variability introduced by
differences between subjects. This makes McNemar's test particularly
appropriate for evaluating binary outcomes where the focus is on changes
or disagreements between two scenarios.

## What McNemar's Test Actually Tests

To apply McNemar's test, you summarize the results in a 2x2 contingency table:

<div>
  <table class="table align-items-center">
    <thead class="thead-light">
      <tr>
        <th scope="col"></th>
        <th scope="col" class="text-center">New Model Correct</th>
        <th scope="col" class="text-center">New Model Incorrect</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="text-center">Old Correct</th>
        <td class="text-center">$$A$$</td>
        <td class="text-center">$$B$$</td>
      </tr>
      <tr>
        <th scope="row" class="text-center">Old Incorrect</th>
        <td class="text-center">$$C$$</td>
        <td class="text-center">$$D$$</td>
      </tr>
    </tbody>
  </table>
</div>

In this table:
- $$A$$: Cases where both models agree (correct).
- $$B$$: Cases where the old model is correct, but the new model is incorrect.
- $$C$$: Cases where the new model is correct, but the old model is incorrect.
- $$D$$: Cases where both models agree (incorrect).

McNemar's test focuses only on the off-diagonal cells ($$B$$ and $$C$$)
where the two conditions differ. The null hypothesis assumes that the
counts in $$B$$ and $$C$$ are equal, meaning there is no significant
difference between the two paired outcomes.

If the counts in $$B$$ and $$C$$ differ significantly, McNemar's test
rejects the null hypothesis and concludes that the difference in
performance (or outcomes) is statistically significant.

### Why Is This Important?

While overall accuracy can hide critical shifts in performance,
McNemar's test hones in on the disagreements that matter. For example,
if your new model outperforms the old one on predictions it previously
missed, McNemar's test will detect and validate this improvement.
Conversely, if the observed changes are due to randomness or noise,
McNemar's test will show that the improvement is not statistically
significant. By focusing on disagreements rather than overall metrics,
McNemar's test provides a rigorous framework for evaluating paired
outcomes, ensuring your conclusions are grounded in statistical evidence
rather than intuition.

## Why Is It Useful?

Imagine you are tasked with comparing two versions of a product landing
page in an A/B test. Page A is the old design, while Page B is the
updated version. Both look good on the surface, but you notice some
subtle changes: Page B seems to convert more users overall, yet a
handful of users who converted on Page A now do not on Page B. How do
you know whether the new design is actually better, or if those
improvements are just noise? This is where McNemar's test shines.
Instead of relying on broad metrics like total conversions, it zeroes in
on where the outcomes differ--cases where Page B succeeds where Page A
failed, and vice versa--and determines whether those differences are
statistically significant.

In machine learning, the story is similar. Imagine you have a baseline
churn prediction model that has served your team well, but you want to
see whether a tuned version actually improves performance. The new model
correctly predicts 40 cases that the old one missed--a promising
start--but it also makes 15 mistakes that the old model avoided.
Traditional metrics like accuracy might tell you that the new model is
better overall, but are you sure? McNemar's test helps answer this
question by isolating these disagreements and evaluating whether the
improvement is real or just statistical noise.

The test also plays a critical role in clinical trials. Picture a group
of patients participating in a drug study. Before treatment, a patient's
symptoms are recorded, and after treatment, they are recorded again.
Perhaps 20 patients improve under the new treatment, but 8 worsen. Is
the drug effective, or are those improvements just random fluctuations?
Here, McNemar's test provides a rigorous way to assess the efficacy of
the treatment, offering confidence where gut instinct might fall short.

One of the greatest strengths of McNemar's test is its ability to
uncover subtle improvements that traditional metrics like accuracy can
overlook. Imagine a dataset where 95% of customers do not churn. A model
that simply predicts "no churn" for every case achieves impressive
accuracy, but it completely misses the few customers who do churn--the
very cases you care about. When you build a better model, one that
captures those critical misclassifications, McNemar's test helps
validate the improvement by focusing on the disagreements between the
two models.

In a world where decisions are often driven by instinct or incomplete
metrics, McNemar's test brings clarity. It strips away the guesswork,
turning small, hard-to-spot improvements into measurable results backed
by statistical evidence. When you see a 5% gain, you can confidently
say, "Yes, this is real." Whether you are running A/B tests, fine-tuning
machine learning models, or evaluating treatments in clinical trials,
McNemar's test ensures that every improvement counts--and that you know
when it truly matters.

## How McNemar's Test Works

### Step 1: Build the Contingency Table

To begin, organize your paired data into a 2x2 contingency table as
follows:

<div>
  <table class="table align-items-center">
    <thead class="thead-light">
      <tr>
        <th scope="col"></th>
        <th scope="col" class="text-center">Sample 2 Correct</th>
        <th scope="col" class="text-center">Sample 2 Incorrect</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="text-center">Sample 1 Correct</th>
        <td class="text-center">$$A$$</td>
        <td class="text-center">$$B$$</td>
      </tr>
      <tr>
        <th scope="row" class="text-center">Old Incorrect</th>
        <td class="text-center">$$C$$</td>
        <td class="text-center">$$D$$</td>
      </tr>
    </tbody>
  </table>
</div>

- $$B$$: Count of disagreements where Sample 1 is correct, but Sample 2
  is incorrect.
- $$C$$: Count of disagreements where Sample 2 is correct, but Sample 1
  is incorrect.

The diagonal cells $$A$$ and $$D$$ (agreement cases) are ignored because
McNemar's test focuses solely on disagreements.

### Step 2: Calculate the Test Statistic
McNemar's test calculates the test statistic using the formula:

\[
\chi^2 = \frac{(B - C)^2}{B + C}
\]

For small sample sizes, you may apply a continuity correction:

\[
\chi^2 = \frac{(|B - C| - 1)^2}{B + C}
\]

- $$B$$ and $$C$$ are the disagreement counts.
- The result is a chi-squared statistic with 1 degree of freedom.

### Step 3: Evaluate the $$p$$-Value

Compare the test statistic to the chi-squared distribution:
- If p-value < 0.05: Reject the null hypothesis and conclude that the
  change is statistically significant.
- If p-value >= 0.05: Fail to reject the null hypothesis; the observed
  changes could be due to chance.

### Example Walkthrough
Imagine two models are evaluated on a dataset, and the results are:

<div>
  <table class="table align-items-center">
    <thead class="thead-light">
      <tr>
        <th scope="col"></th>
        <th scope="col" class="text-center">New Model Correct</th>
        <th scope="col" class="text-center">New Model Incorrect</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="text-center">Old Correct</th>
        <td class="text-center">$$700$$</td>
        <td class="text-center">$$40$$</td>
      </tr>
      <tr>
        <th scope="row" class="text-center">Old Incorrect</th>
        <td class="text-center">$$100$$</td>
        <td class="text-center">$$160$$</td>
      </tr>
    </tbody>
  </table>
</div>

Here:
- $$B = 40$$ and $$C = 100$$

Plugging into the formula:

\[
\chi^2 = \frac{(40 - 100)^2}{40 + 100} = \frac{3600}{140} \approx 25.71
\]

Using a chi-squared table or statistical software, the p-value is $$<
0.001$$, indicating a statistically  significant difference.

## In Code

You can easily run McNemar's test in Python or R using standard
libraries. Below are simple code examples for both.

### Python Example

To perform McNemar's test in Python, use the [`statsmodels`
library](https://www.statsmodels.org/). The `mcnemar` function takes a
2x2 contingency table as input and returns the test statistic and
p-value.

```python
# Import necessary library
from statsmodels.stats.contingency_tables import mcnemar

# Define the 2x2 contingency table
# Format: [[Agree Correct, Disagree (Old Correct)], [Disagree (New Correct), Agree Incorrect]]
table = [[700, 40], [100, 160]]

# Perform McNemar's test
result = mcnemar(table, exact=False, correction=True)

# Print results
print(f"Test Statistic: {result.statistic:.2f}")
print(f"p-value: {result.pvalue:.5f}")
```

This code runs McNemar's test using a chi-squared approximation
(`exact=False`) with a continuity correction (`correction=True`). For
small sample sizes, you can set `exact=True` for an exact binomial test.

### R Example

In R, McNemar's test is built into the `mcnemar.test` function in the
base `stats` library. Simply input a 2x2 contingency table to obtain the
results.

```R
# Define the contingency table
# Rows: Old Model | Columns: New Model
contingency_table <- matrix(c(700, 40, 100, 160), nrow = 2, byrow = TRUE)

# Perform McNemar's test
result <- mcnemar.test(contingency_table)

# Print results
print(result)
```

This R code computes the McNemar test statistic and $$p$$-value, giving
you a straightforward interpretation of the results.

Whether you use Python or R, these snippets ensure you can integrate
McNemar's test into your workflow with minimal effort, adding
statistical rigor to your evaluations.


## Why Is It Overlooked in Data Science?

Despite its usefulness, McNemar's test is rarely seen in modern data
science workflows. Many practitioners default to metrics like accuracy
or $$F_1$$-score, overlooking the power of statistical tests for paired
data.  This is particularly true in A/B testing and model comparison
tasks, where binary outcomes are common.

McNemar's test is a rigorous yet straightforward tool for validating
results. It deserves a revival, especially as more businesses rely on
A/B testing and machine learning.

## Conclusion: A Tool Worth Using

McNemar's test might not be flashy, but it is a powerful tool for
evaluating paired binary outcomes. By focusing on where the results
differ--the crucial disagreements--it cuts through the noise of
aggregate metrics and offers a clear answer to whether changes are
meaningful or random. Whether you are in A/B testing, clinical trials,
or machine learning, this test deserves a spot in your toolkit.

The next time you need to confirm an improvement in binary predictions,
do not settle for intuition. Run a McNemar's test and get the stats to
back it up.
