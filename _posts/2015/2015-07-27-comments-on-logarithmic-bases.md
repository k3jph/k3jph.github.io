---
id: 2339
title: Comments on Logarithmic Bases
date: 2015-07-27T20:36:08-04:00
author: k3jph
layout: post
permalink: /2015/07/27/comments-on-logarithmic-bases/
dsq_thread_id:
  - "3977728221"
ampforwp_custom_content_editor_checkbox:
  - ""
instant_articles_submission_id:
  - "1311278065577126"
image: /assets/images/9610474266_d5c556de34_k.jpg
categories:
  - Blog
tags:
  - algebra
  - data science
  - logarithms
  - math education
  - mathematics
  - scientific computing
  - trigonometry
---
Logarithms are one of the more remarkable transformations of mathematics.  Remembering that for a given numerical base, [latex]b[/latex], the value of [latex]\log_b x = x^b[/latex] and the special relationship of logarithms, [latex]\log_b x = \log x / \log b[/latex].  Using these forms, given one logarithm function, we can find the logarithm of any number [latex]x[/latex] in any numerical base.

Generally, though, there are only three bases we would worry about.  First is base 10, yielding the "common logarithm."  A logarithm in base ten essentially tells us how many digits there are in the number.  This is useful for mental mathematics and is the basis for how slide rules work.  Second, is base [latex]e[/latex], normally called the "natural logarithm."  The natural logarithm's base gives us a tool for analyzing growth rates and some statistical models.  The final logarithm base 2, sometimes called the "binary logarithm."  The interest in binary logarithms stems from our modern data processing machines and [latex]\log_2 x[/latex] tells us how many bits are necessary to store [latex]x[/latex].

These different logarithm types are represented by various symbols.  Different fields refer to the natural logarithm as [latex]\log x[/latex], though some fields call it [latex]\ln x[/latex].  For our purpose here, we will always specify the base when important and if the base is omitted, the statement is true regardless of base.  Of course, some applications are base-independent.  The base conversion formula, given above, works regardless of the underlying implementation base.  Other applications, such as taking the logarithm of a data column before a regression analysis is also base-independent, provided you are aware of the implications of the logarithmic transformation.

_Image by [Joe Haupt / Flickr](https://www.flickr.com/photos/51764518@N02/9610474266)._
