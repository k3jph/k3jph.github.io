---
id: using-median-polish
layout: post
title: "Using Median Polish"
date: 2025-05-08
author: k3jph
permalink: /2025/05/08/using-median-polish
featured_image: /assets/img/2025/using-median-polish.webp
categories:
  - Blog
tags:
  - statistics
  - data analysis
  - robust methods
  - additive models
  - resistant methods
---

Exploratory data analysis often faces challenges due to outliers and
skewed distributions, which can distort underlying patterns. Many
conventional statistical methods depend on means, making them highly
sensitive to extreme values and potentially leading to misleading
interpretations. To address this issue, median polish provides a robust
alternative by iteratively subtracting medians from rows and columns in
a two-way table. This process effectively isolates key trends while
minimizing the influence of anomalies.

One of the most valuable aspects of median polish is its ability to
handle structured data where variations exist across two categorical
dimensions, such as time and category. Because of its resilience to
outliers, it is particularly well-suited for applications in
spatial-temporal analysis, where trends must be identified amid noise.
Similarly, in environmental sciences, median polish helps reveal
patterns in climate data, pollution levels, or ecological measurements
that might otherwise be masked by irregular fluctuations. In economics,
this technique supports market trend analysis and financial forecasting
by filtering out aberrant values that could distort interpretations.

By emphasizing median-based adjustments rather than mean-based
transformations, median polish provides a reliable tool for identifying
meaningful patterns in complex datasets. Its iterative refinement
process ensures that both systematic row and column variations are
properly accounted for, offering insights that might be obscured using
conventional methods.

## What Is Median Polish?

Median polish, introduced by John Tukey, is a statistical technique
designed to decompose two-way tables into meaningful additive
components, making it particularly useful for identifying patterns in
structured data. Unlike traditional decomposition methods that rely on
averages, median polish iteratively removes medians, making it highly
resistant to outliers and skewed distributions.

At its core, median polish breaks a dataset into four components. The
grand effect represents the overall central tendency of the dataset,
serving as a baseline from which other variations are measured. The
row effects capture deviations specific to each row, indicating how
each category (or time period, in temporal datasets) deviates from the
overall trend. Similarly, the column effects measure systematic
variations across columns, highlighting discrepancies across categories
or time slices. Finally, the residuals account for any remaining
variability that is not explained by the row and column effects,
representing noise or localized deviations.

By iteratively refining these components through median subtraction, the
method systematically eliminates the influence of extreme values while
preserving the underlying structure of the data. This makes median
polish particularly well-suited for exploratory analysis in datasets
that are prone to irregularities, such as environmental measurements,
economic indicators, and time-series data with missing or unreliable
entries.

## How Median Polish Works

The median polish algorithm follows a structured sequence of steps to
iteratively extract meaningful trends from a two-way table. First, the
median of each row is computed, and this median is subtracted from all
the values in that row. This effectively centers each row around zero,
leaving behind only variations that deviate from the median. Next, the
same process is applied to each column: the column median is calculated
and subtracted from all column values, further refining the table by
eliminating systematic column effects. These two steps are then repeated
iteratively until the values stabilize, meaning that further iterations
yield no significant changes.

To better understand this process, consider the following toy example.
Suppose we have a simple 3×3 matrix representing sales data for three
different products across three different months:

|        | Month 1 | Month 2 | Month 3 |
|--------|:-------:|:-------:|:-------:|
| Prod A |  10     | 20      | 30      |
| Prod B |  15     | 25      | 35      |
| Prod C |  12     | 22      | 32      |
{:.table}


Following the median polish approach:

1.  Compute the median of each row: for Prod A, the median is 20; for
    Prod B, it is 25; for Prod C, it is 22.
    
2.  Subtract these medians from each row.

3.  Compute the median of each column (all now centered around zero) and
    subtract it, iterating until no significant changes occur.

|        | Month 1 | Month 2 | Month 3 |
|--------|:-------:|:-------:|:-------:|
| Prod A | -10     |  0      | 10      |
| Prod B | -10     |  0      | 10      |
| Prod C | -10     |  0      | 10      |
{:.table}
    
This simple example highlights how median polish systematically
eliminates row and column effects while retaining any underlying
patterns. The remaining residuals capture any unique variations that do
not fit neatly within the row or column structure.

This decomposition allows for clearer interpretation of underlying
patterns in the data, particularly in cases where mean-based methods
would be misleading due to the presence of extreme values or skewed
distributions.

## Implementing Median Polish in Python

Python's `statsmodels.robust` module provides a built-in
`median_polish()` function for applying the method.

### Example: Applying Median Polish in Python

```python
import numpy as np
import pandas as pd
from statsmodels.robust import median_polish

# Example dataset (time vs category)
data = np.array([
    [10, 15, 20, 25],
    [12, 17, 22, 27],
    [14, 19, 24, 29],
    [16, 21, 26, 31]
])

# Perform median polish
table, row_effects, col_effects = median_polish(data, eps=1e-6, maxiter=10)

# Display results
print("Grand Effect:", table)
print("Row Effects:", row_effects)
print("Column Effects:", col_effects)

```

This outputs the grand effect (overall trend), row-wise deviations, and
column-wise deviations, helping us detect patterns in structured data.

## Implementing Median Polish in R

R has a native `medpolish()` function, which operates similarly.

### Example: Applying Median Polish in R

```r
data <- matrix(c(10, 15, 20, 25,
                 12, 17, 22, 27,
                 14, 19, 24, 29,
                 16, 21, 26, 31), nrow=4, byrow=TRUE)

# Apply median polish
result <- medpolish(data)

# Print results
print(result)

```

This provides the same decomposition as in Python, with a breakdown into
grand mean, row effects, column effects, and residuals.

## When to Use Median Polish

Median polish proves especially useful in settings where traditional
statistical techniques falter, most notably when the data at hand are
riddled with outliers, structured along two dimensions, or exhibit
complex patterns that resist linear modeling. Its robustness and
simplicity make it a practical choice in the following scenarios:

* When the data contain outliers:  
Outliers can skew results dramatically when using mean-based methods,
pulling trend lines and average values toward extreme ends and masking
genuine patterns. Median polish, by contrast, relies on medians at every
step of the decomposition process, making it inherently resistant to the
distorting effects of anomalous data. This is particularly valuable in
fields like environmental science, where readings may spike due to
equipment glitches or rare events. Median polish allows analysts to
extract systematic trends without being derailed by a few extreme
points.
* When you need robust trend analysis across rows and columns:  
Structured datasets, those that naturally align into rows and columns,
like time by region or treatment by outcome, often have patterns that
span both dimensions. Traditional methods may fit a linear model or
conduct an ANOVA, but these approaches often assume normality and
homoscedasticity. Median polish makes no such assumptions. Instead, it
iteratively isolates the central tendency of rows and columns, stripping
away systematic effects and leaving residuals that highlight local
deviations. This helps identify whether observed variation is consistent
across time, across categories, or truly random.
* When analyzing spatial or temporal grids:  
In climatology, epidemiology, and other fields that deal with spatial or
time-series data laid out in grids, it is common to see patterns
embedded within noisy observations. Temperature readings by location
over several months, for instance, may reflect both seasonal shifts and
regional baselines. Median polish can extract these layered effects,
producing interpretable summaries that are not swamped by short-term
weather anomalies or single-site errors. Likewise, in economic trend
analysis, sales by quarter and product line may exhibit structural
effects that mask localized performance. Median polish clarifies these
by reducing data to a clean model of row and column effects plus
residuals.

### Conclusion

Median polish is a powerful exploratory tool that extracts patterns from
two-way tables while resisting the influence of outliers. By decomposing
data into meaningful components, it provides insights into underlying
structures that traditional mean-based methods might miss. Whether in
Python or R, applying median polish can help uncover trends hidden
within noisy data.
