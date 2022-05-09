---
id: 3290
title: Pigeon Flocks for Decision Science
date: 2015-12-04T07:21:52-05:00
author: k3jph
layout: post
permalink: /2015/12/04/pigeon-flocks-for-decision-science/
dsq_thread_id:
  - "4375005790"
ampforwp_custom_content_editor_checkbox:
  - ""
image: /assets/images/Flock_of_pigeons_Regents_Park_-_geograph.org_.uk_-_1370466.jpg
categories:
  - Blog
tags:
  - animal behavior
  - data science
  - machine learning
  - mathematics
  - neural networks
  - oncology
  - pigeons
  - radiology
  - scientific computing
  - statistics
---
There's a [great article on PLOS ONE](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0141357) about using pigeons for cancer detection.  

The short version is that scientist successfully trained pigeons to detect cancer through visual inspection of medical imagery.  But the kicker for them was not pigeon detection, but rather the pooled results of a flock of pigeons are extremely accurate.  This shouldn't be surprising.  It's the wisdom of crowds applied to pigeons.  

It's also how [random forest](https://en.wikipedia.org/wiki/Random_forest) works.  Random trees take a random subset of parameters and creates a decision tree to classify an outcome.  A random forest is a "forest" of these random trees.  The outcome if whatever receives the most votes.  And it's a huge step forward in data science and classification.  

Having a pigeon do it is neat, and it suggests flocks of small neural networks could fill the void.

_Image by [Andy F / Wikimedia](https://commons.wikimedia.org/wiki/File:Flock_of_pigeons,_Regents_Park_-_geograph.org.uk_-_1370466.jpg)._
