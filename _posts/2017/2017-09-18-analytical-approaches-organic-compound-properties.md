---
id: 5554
title: Analytical Approaches for Organic Compound Properties
date: 2017-09-18T20:38:32-04:00
author: k3jph
layout: post
permalink: /2017/09/18/analytical-approaches-organic-compound-properties/
image: /assets/images/analytical-approaches-estimating-organic-compound-properties.jpg
categories:
  - Blog
tags:
  - analytical chemistry
  - data science
  - environmental science
  - machine learning
  - mathematics
  - organic chemistry
  - scientific computing
---
The [report of Leistra](http://library.wur.nl/WebQuery/wurpubs/412692)
on reported versus estimated boiling points and vapor pressures for
pesticides provides an interesting case study in mathematical
underpinnings for the phenomena investigated.  Reports of chemical
properties are available from many online databases such as
[ChemSpider](http://www.chemspider.com/),
[PubChem](https://pubchem.ncbi.nlm.nih.gov/), and others.  But these
aggregate other sources of data to get chemical properties.  In
some cases, they are from a manufacturer.  Of course, manufacturers
often report values without a method or explanation of how it was
determined.

The article makes a number of assumptions, the most important of
which is that reported values are based on experimental observations.
That's a reasonable assumption here.  But Leistra uses several
estimation techniques to determine if numerical models for the
boiling point or vapor pressure come close.  Overall, he finds that
they are at least of the correct order of magnitude.  Coming from
a numerical background, I find that order of magnitude to insufficient
for many results.  But, like everything, the quality of the result
depends on the application.

Reported and estimated values can each have a place in the modeling
of chemical properties.  If a value correct within an order of
magnitude is sufficient for the application of the data, then it
does not matter which value is used.  Applications requiring greater
precision can use experimentation to find the practical values.
Further, estimated values can be used to provide ballpark estimates
which can then be verified through experimentation.  When experimentation
is not possible, the estimate needs to be sufficient.  But these
can cross-check each other.

What catches my attention the most is that Leistra includes several
linear or log-linear models for estimating the vapor pressure.
While linear models can be quite effective, some semi-statistical
models such as [artificial neural
networks](http://www.psych.utoronto.ca/users/reingold/courses/ai/cache/neural2.html)
or [random
forests](https://www.stat.berkeley.edu/~breiman/RandomForests/cc_home.htm)
may be able to provide superior results for estimating chemical
properties.  The unfortunate downside is that chemists may not like
the inability to [understand what the model is
doing](https://www.ncbi.nlm.nih.gov/pubmed/18255717).  It seems I
am not the first to think of this as the use of [neural networks
to estimate the boiling point of
alkanes](http://pubs.rsc.org/en/content/articlepdf/1994/FT/FT9949000097)
was investigated as far back as 1994.  Though there are a great
many alternative approaches that could be used.
