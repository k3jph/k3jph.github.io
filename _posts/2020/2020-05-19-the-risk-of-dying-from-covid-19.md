---
id: the-risk-of-dying-from-covid-19
title: The Risk of Dying From COVID-19
date: 2020-05-18T20:30:00-04:00
author: k3jph
layout: post
permalink: /2020/05/19/the-risk-of-dying-from-covid-19
image: /assets/images/the-risk-of-dying-from-covid-19.jpg
categories:
  - Blog
tags:
  - public health
  - statistics
  - mortality
  - COVID-19
  - SARS
  - MERS
  - influenza
---

One of the biggest problems facing the world right now is managing
compliance with stay-at-home orders.  In brief, we know there are
people who [are opening
businesses](https://www.cnn.com/2020/05/18/us/texas-governor-reopens-phase-two-covid-19/index.html),
[terrorizing government
officials](https://www.npr.org/2020/05/14/855918852/heavily-armed-protesters-gather-again-at-michigans-capitol-denouncing-home-order),
and [just saying stupid
things](https://twitter.com/realDonaldTrump/status/1262155040107704328).
All of these are actively killing people.  But they don't understand
it.  To help, we need to get our head around the fatality rate.

Let's start by talking about what people think the fatality rate
is.  Nonsense [like
this](https://www.livescience.com/is-coronavirus-deadly.html)
claiming:

> [T]he overall mortality rate decreased to around 0.66%

has been repeated _ad nauseum_.  I've taken this quote out of
context, but that's okay.  This is the only part anyone paid attention
to.  Many more are saying it is no worse than the flu, and that's
dumb on two fronts; most of them having never seen the flu, before.
Either way, it is hard to explain to people that a 99.34 percent chance
of survival just isn't very good...and that grossly overestimates
the survival rate.

The problem is, we are underestimating the expected death toll, by
estimating the fatality rate as a percentage of the total cases.
For instance, using the data from yesterday, May 18, 2020, for the
United States, provided by
[Worldometer](https://www.worldometers.info/coronavirus/) this gets
us [latex]91981 / 1550294 \approx 5.93[/latex] percent.  But
that's not telling us much, because there were 1101930 unresolved
cases, yesterday.  Some portion of them will fully recover and some
other portion will not.  We don't know what that is, but that 5.93
percent isn't going to tell us anything about it, either.  What we
really need to know is how many of those 1101930 are going to
recover and how many will not.

## Enter the Frequentist

The naïve approach here is to simply exclude the unknowns from the
calculation.  That gets us [latex]91981 / (91981 + 356383) \approx
20.51[/latex] percent.  The problem with this calculation
is that we don't know if the time to recovery and time to death are
(roughly) the same. Also we don't know if the United States is
unusual in any way.  Not all countries are reporting recovery data,
notably the United Kingdom nor the Netherlands.  However, we do
have complete data for 175 countries in the Worldometer dataset.
So we can find the comparable number, we'll call the `deathrate`
for these countries.  This gives us this histogram:

{% include figure.html image="likelihood-of-death-from-covid-19-following-positive-diagnosis.png"
   alt="Density Plot of Likelihood of Death from COVID-19 After Diagnosis per Country"
   cap="Density Plot of Likelihood of Death from COVID-19 After Diagnosis per Country" %}

Working with that, we can see there's quite a long tail on this
distribution.  We can, somewhat naïvely still, find the mean of the
`deathrate`, and that is 10.96 percent.

I think the best way to approach this is to find a weighted mean
where the weights are the percentage of resolved cases for
each country.  Mathematically, this is [latex]\text{weight} =
(\text{deaths} + \text{recoveries}) / \text{cases}[/latex].  This
should give us a proxy for how close to the "end" a given country
is to its battle with COVID-19.  Obviously, the closer to the end,
the closer to the true number of fatalities a country is.  Therefore,
it should count for more.

Applying this metric, we get approximately 7.94 percent fatality
rate (95% CI +/- 0.007 percent).  That number makes a lot more sense
than some of the other estimates out there.  From November, 2002,
to July, 2003, [there were 8096 cases of SARS, globally, resulting
in 774 deaths](https://www.who.int/csr/sars/country/table2004_04_21/en/).
This is a fatality rate of 9.6 percent.  Since 2012, there have
been [2519 cases of MERS resulting in 866
deaths](https://applications.emro.who.int/docs/EMCSR254E.pdf?ua=1), with
a net fatality rate of 34.4 percent.  Both SARS and MERS are closely
related to the virus causing COVID-19,
[SARS-CoV-2](https://www.who.int/emergencies/diseases/novel-coronavirus-2019/technical-guidance/naming-the-coronavirus-disease-(covid-2019)-and-the-virus-that-causes-it),
so these are natural comparison points.  On the other hand, COVID-19
is substantially more widespread, with nearly 5 million cases,
globally.  For another comparison point, CDC's [estimate for influenza
during the 2017-2018
season](https://www.cdc.gov/flu/about/burden/2017-2018.htm), the
worst in the last 10 years, is 44802629 symptomatic cases leading
to 61099 deaths. There were probably several million more [asymptomatic
cases](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4586318/), but
setting those aside, the fatality rate for influenza is, at worst,
about 0.1 percent.  Most years are significantly lower.

Back to COVID-19, of the 1101930 outstanding cases, that results
in an additional 87480 (95% CI +/- 70) deaths, and that is before
taking into account any additional cases.  Given that there is
[no](https://www.bmj.com/content/369/bmj.m1432/)
[known](https://www.medrxiv.org/content/medrxiv/early/2020/04/23/2020.04.16.20065920.full.pdf)
[treatment](https://www.sciencedirect.com/science/article/pii/S0883944120303907)
for COVID-19, aside from ventilation, as of today, those 87480
deaths are essentially inevitable.  The infection is still spreading
and that will result in more cases and more fatalities, overall.

This is why it is important to follow the recommendations for social distancing.  In short, stay home unless you _have_ to go out.  If you _have_ to go out, wear a mask.  These two factors, combined, [will significantly slow](/2020/03/14/why-social-distancing-works/) the spread.  The likelihood of getting COVID-19 is higher than your likelihood of getting influenza and your likelihood of dying from COVID-19 is substantially higher than you realize if you get COVID-19.  The raw case counts, right now, are artificially deflated, globally, _because_ of social distancing measures.  Those numbers, lower than the apocalyptic sounding millions of deaths, are evidence social distancing is working, not that it is unnecessary.  The smart people right now are upset the numbers are as high as they are, because not enough people held back.

Finally, as a back of the envelope, this has a lot of flaws.  The
most important of these flaws is applying the global rates to the
United States.  To put it bluntly, the United States is now a
developing nation.  We are well below the developed world's levels
of access to health care, education, clean water, and other preventative
measures, all of which are important in this crisis.  This means
that 7.94 percent is a lowball estimate for the United States.
While it represents the world figures, the United States, given its
resources, cannot be expected to perform at that level.  Accordingly,
one must expect a higher death rate in the United States, overall.
