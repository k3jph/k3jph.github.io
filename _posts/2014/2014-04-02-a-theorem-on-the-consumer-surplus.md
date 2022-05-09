---
id: 832
title: A Theorem on the Consumer Surplus
date: 2014-04-02T20:28:11-04:00
author: k3jph
layout: post
permalink: /2014/04/02/a-theorem-on-the-consumer-surplus/
categories:
  - Blog
tags:
  - demand
  - economic analysis
  - economics
  - environmental policy
  - environmental studies
  - flood studies
  - mathematics
  - statistics
---
_Theorem. Let \[latex\]m\[/latex\] be a scaling factor and \[latex\]y = \\beta\_0 + \\beta\_1 x\_1 + \\cdots\[/latex\]_ _be a generalized linear model such that \[latex\]y\[/latex\] is the amount of a good or_ _service purchased and \[latex\]x\[/latex\] is the price per unit of the good or service. If \[latex\]y^\\prime = \\beta\_0^\\prime + \\beta\_1^\\prime x\_1^\\prime + \\cdots\[/latex\] such that \[latex\]y^\\prime = my\[/latex\] and \[latex\]x\_1^\\prime = x\_1 / m\[/latex\], then,_
{% include eqn.html eqn="-\frac{\hat{y}^{\prime\,2}}{2\hat{\beta_1^\prime}} = -\frac{\hat{y}^2}{2\hat{\beta_1}} \label{eqn:thm} \text{.}" %}

If [latex]y^\prime = \beta_0^\ast + \beta_1^\ast x_1 + \cdots[/latex], then [latex]\beta_1^\ast = m\beta_1[/latex].[^wooldridge] Similarly, if [latex]y = \beta_0^\ast + \beta_1^\ast x_1^\prime + \cdots[/latex], then [latex]\beta_1^\ast = m\beta_1[/latex]. Therefore, if [latex]y^\prime = \beta_0^\prime + \beta_1^\prime x_1^\prime + \cdots[/latex], then [latex]\beta_1^\prime = m^2\beta_1[/latex]. Accordingly,
{% include eqn.html eqn="-\frac{\hat{y}^{\prime\,2}}{2\hat{\beta_1^\prime}} =
-\frac{(m\hat{y})^2}{2m^2\hat{\beta_1}} =
-\frac{m^2\hat{y}^2}{2m^2\hat{\beta_1}} =
-\frac{\hat{y}^2}{2\hat{\beta_1}} \text{.}" %}

[^wooldridge]: Jeffrey Wooldridge, _Introductory econometrics: A modern approach,_</i> _Cengage Learning, 2012, p. 40.
