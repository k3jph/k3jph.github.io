---
id: bradley-terry-model-and-data-driven-ranking
layout: post
title: "Bradley-Terry Model and Data-Driven Ranking"
date: 2025-01-31
author: k3jph
permalink: /2025/01/31/bradley-terry-model-and-data-driven-ranking
featured_image: /assets/img/2025/bradley-terry-model-and-data-driven-ranking.webp
categories:
  - Blog
tags:
  - statistics
---

Imagine you are ranking a set of teams, chess players, or even flavors
of ice cream. You do not have an objective rating scale--only a series of
head-to-head matchups. If chocolate beats vanilla more often than not,
it should rank higher.  But how do you formalize this intuition in a
mathematically rigorous way? Enter the Bradley-Terry model, a
well-established statistical approach that converts [pairwise
comparisons](https://www.1000minds.com/decision-making/pairwise-comparison)
into a structured ranking system. This method allows us to estimate
relative strengths and predict future outcomes based purely on past
matchups, without requiring an underlying absolute scoring metric.

The Bradley-Terry model is a statistical method for estimating
probabilities of binary outcomes in paired comparisons. Developed by
[R.A. Bradley and M.E. Terry in the
1950s](https://www.jstor.org/stable/2334029?seq=1), it provides a robust
framework for determining relative rankings when only pairwise results
are available. Unlike traditional rating systems that assign fixed
numerical values to competitors, the Bradley-Terry model derives
rankings dynamically based on observed interactions. Instead of
requiring absolute scores, it computes the probability of one entity
winning against another by inferring a latent skill parameter from past
results. This makes it an incredibly versatile tool, applicable in
scenarios ranging from sports analytics to machine learning ranking
systems and even decision-making processes in business and public
policy.

## What Makes the Bradley-Terry Model Useful?

The beauty of the Bradley-Terry model lies in its flexibility. It is
used in various domains where ranking is necessary but objective scores
are unavailable.  Some notable applications include:

- **Sports Analytics**: Estimating team rankings based on game outcomes.
  Unlike Elo ratings, which update dynamically with each match,
  Bradley-Terry provides a statistical foundation for analyzing entire
  seasons at once. It allows analysts to estimate the relative strengths
  of teams based purely on head-to-head results, adjusting for
  differences in scheduling strength and frequency of matchups.
- **Customer Preference Ranking**: Businesses frequently rely on A/B
  testing to gauge customer preferences. The Bradley-Terry model can be
  used to rank different product variations by comparing direct user
  choices. This helps optimize product design, pricing strategies, and
  marketing efforts by understanding which features consistently lead to
  customer preference.
- **Algorithm Selection**: In machine learning competitions and model
  selection tasks, researchers often compare models using head-to-head
  performance evaluations. The Bradley-Terry model can rank algorithms
  based on their relative success rates, allowing practitioners to make
  informed decisions about which models to deploy in real-world
  applications.
- **Recommender Systems**: Online platforms frequently use ranking
  algorithms to suggest content, from movies and books to music and
  e-commerce products.  The Bradley-Terry model provides a way to rank
  items based on implicit and explicit pairwise comparisons, helping
  refine recommendation lists to better match user preferences.

## The Model's Mechanics

At its core, the Bradley-Terry model assigns each competitor (or entity)
a latent skill parameter. The probability that entity A defeats entity B
is given by:

\[ P(A > B) = \frac{e^{w_A}}{e^{w_A} + e^{w_B}} \]

where $$w_A$$ and $$w_B$$ are the skill parameters for $$A$$ and $$B$$.
These parameters represent an entity's underlying strength, inferred
through previous competitions. The greater the difference in skill
levels, the higher the probability that the stronger entity wins.  These
parameters are typically estimated using [maximum likelihood estimation
(MLE)](https://towardsdatascience.com/probability-concepts-explained-maximum-likelihood-estimation-c7b4342fdbb1),
a statistical approach that finds the parameter values maximizing the
likelihood of the observed pairwise comparisons. 

To enhance interpretability, the model can also be extended to include
additional covariates, such as home-field advantage, player fatigue, or
evolving skill levels over time. This allows researchers and analysts to
refine their rankings and adjust for external factors that might
influence match outcomes.

### Implementing the Bradley-Terry Model in Python and R

To illustrate the Bradley-Terry model in practice, let us implement it
in both Python and R using a small dataset of match results.  The
[BradleyTerry](https://www.jstatsoft.org/article/view/v012i01/31)
package is available  to make these calculations easy in R, while a
reimplementation in Python is pretty trivial:

#### **Python Implementation**
```python
import pandas as pd
import numpy as np
import statsmodels.api as sm
from scipy.optimize import minimize

# Sample match results
matches = pd.DataFrame({
    'winner': ['A', 'A', 'B', 'C', 'C', 'B', 'A', 'C', 'B', 'A'],
    'loser':  ['B', 'C', 'C', 'A', 'B', 'A', 'C', 'B', 'A', 'C']
})

# Unique players
players = np.unique(matches[['winner', 'loser']].values)
player_index = {player: i for i, player in enumerate(players)}

# Construct design matrix
def likelihood(params):
    ratings = {player: params[i] for i, player in enumerate(players)}
    log_likelihood = 0
    for _, row in matches.iterrows():
        w, l = row['winner'], row['loser']
        prob = np.exp(ratings[w]) / (np.exp(ratings[w]) + np.exp(ratings[l]))
        log_likelihood += np.log(prob)
    return -log_likelihood

# Initialize and optimize parameters
init_params = np.zeros(len(players))
result = minimize(likelihood, init_params)
ratings = {player: result.x[i] for i, player in enumerate(players)}

# Display estimated skill levels
print("Estimated Skill Levels:")
print(ratings)
```

#### **R Implementation**
```r
library(BradleyTerry2)

# Sample match results
data <- data.frame(winner = c('A', 'A', 'B', 'C', 'C', 'B', 'A', 'C', 'B', 'A'),
                   loser  = c('B', 'C', 'C', 'A', 'B', 'A', 'C', 'B', 'A', 'C'))

data$winner <- factor(data$winner)
data$loser <- factor(data$loser)

# Fit the Bradley-Terry model
bt_model <- BTm(cbind(winner, loser), data = data)

# Display estimated skill levels
summary(bt_model)
```

These implementations demonstrate how to fit the Bradley-Terry model
using common statistical tools available in Python and R. The model
extracts latent skill parameters from the observed win/loss data and
provides a ranking based on pairwise comparisons. This approach can be
extended to larger datasets and enhanced with additional covariates for
more precise ranking predictions.

## Revitalizing the Bradley-Terry Model

With the rise of recommender systems, AI-driven ranking tasks, and
complex

decision-making frameworks, the Bradley-Terry model remains highly
relevant.  Several enhancements and adaptations have emerged to address
its limitations and extend its applicability across diverse domains.

- **Bayesian Bradley-Terry Models**: These introduce prior distributions
  to handle uncertainty in rankings, allowing for more robust inferences
  in cases where limited data is available. By incorporating prior
  knowledge or domain expertise, Bayesian extensions help stabilize
  parameter estimates and provide credible intervals for rankings.
- **Time-Aware Adjustments**: Many ranking systems evolve over time,
  making it necessary to adapt dynamically as new comparisons emerge.
  Time-sensitive extensions modify skill parameters to account for
  performance shifts and evolving skill levels, ensuring that rankings
  reflect more recent and relevant information rather than being overly
  influenced by outdated data.
- **Hybrid Models**: Combining the Bradley-Terry framework with deep
  learning techniques enables adaptive ranking solutions. Hybrid models
  can incorporate additional contextual information, such as player
  statistics, user behavior, or metadata, allowing for a more nuanced
  and personalized ranking system.  These models have found applications
  in recommender systems, matchmaking in online gaming, and AI-powered
  decision-making.
- **Multivariate and Hierarchical Extensions**: Traditional
  Bradley-Terry models assume a single latent skill parameter per
  entity. However, multivariate and hierarchical extensions allow
  entities to be ranked along multiple dimensions simultaneously. This
  is particularly useful in settings where entities can compete in
  various subcategories, such as multi-sport athletes, multi-criteria
  recommendation systems, or multi-tiered business rankings.

Ranking problems are pervasive--from determining the best teams in a
league to prioritizing job candidates, ranking search results, and
tailoring recommendations on streaming platforms. The next time you
compare two choices, whether it is two books, two algorithms, or two
investment options, you are engaging in a Bradley-Terry-like process.
Its power lies in its simplicity, scalability, and adaptability, making
it a model worth revisiting in an era of data-driven decision-making.
