---
id: 7171
title: "[latex]p[/latex]-hacking and Data Science"
date: 2019-11-11T10:06:54-05:00
author: k3jph
layout: post
permalink: /2019/11/11/p-hacking-and-data-science/
image: /assets/images/p-hacking-and-data-science.jpg
categories:
  - Blog
tags:
  - business
  - data science
  - statistics
---
For those of you not familiar with the practice, there's an idea
called
"[[latex]p[/latex]-hacking](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1002106)."
If you remember from your science fair days, you first have a
hypothesis, you then design an experiment and collect data that
either supports or refutes the data. In p-hacking, you just collect
a large breadth of data (that is, many different data points from
each observation) and see if any of the relationships turn our
statistically significant. It's become a larger and larger problem,
but that's not even the half of it.

Back in my home field of data science, it is not unusual to produce
a model that has no statistical validity in any of the relationships,
but model tends to predict well, therefore, it must be a "good"
model. The most extreme example I've ever seen was a [contest run
on Kaggle](https://www.kaggle.com/c/loan-default-prediction/data)
where the data consisted of more than 700 columns for each observation,
and they were just labeled "f1," "f2," and so on to whatever the
max was. Lazy column naming is one thing, but we were given no guide
to what the data meant. The purpose of the contest was to find
relationships, regardless of what the data meant.

I've spent my entire career fighting this, pointing out that unless
you have a causal theory, your model does not hold up, no matter
how well it predicts over the test dataset. This problem has totally
blown up now that we build models we don't even understand, such
as the more advanced neural networks. If we cannot explain it, it
is not a valid model.

Back to [latex]p[/latex]-hacking,the [latex]p[/latex]-value may be
widely misunderstood, but setting aside people gaming the system,
it's just not communicated well, either. It's never made clear that
[latex]p = 0.05[/latex] means we have a [latex]1/20[/latex] shot
of having gotten it wrong. I also think a lot of the blame for that
falls on the [insistent media reporting of scientific
"results"](https://www.nature.com/news/science-journalism-can-be-evidence-based-compelling-and-wrong-1.21591)
without the ability to contextualize the findings for viewers or
readers.
