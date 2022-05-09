---
id: 7277
title: Shotgun Pi
date: 2020-02-18T09:59:08-05:00
author: k3jph
layout: post
permalink: /2020/02/18/shotgun-pi/
image: /assets/images/shotgun-pi.jpg
categories:
  - Blog
tags:
  - mathematics
  - Open Science Grid
  - statistics
---
Monte Carlo is a beautiful process that can be used to address many,
many problems. One of my favorites is that it can be used to estimate
the value of [latex]\pi[/latex]. First of all, we know that
[latex]\pi[/latex] is the ratio between the radius of a circle,
squared, and its area. We can use that to Monte Carlo to estimate
this ratio.

If you are not familiar with the [Open Science
Grid](https://opensciencegrid.org/) (OSG), it is a large high-throughput
computer available as a national user facility. Unlike some other
supercomputer facilities, the OSG is not intended for tightly-coupled
jobs. And calculating [latex]\pi[/latex] via Monte Carlo is a very
loosely-coupled job. In fact, one of the [samples for using the OSG
in
R](https://support.opensciencegrid.org/support/solutions/articles/5000674219-calcuating-pi-using-r)
is exactly this.

About a year ago, I redid the sample using the newish programming
language [Rust](https://www.rust-lang.org/). Rust is getting a lot
of press as a new systems programming language and a lot of its
[memory
safety](https://doc.rust-lang.org/nomicon/meet-safe-and-unsafe.html)
features. I think this makes it a good candidate for numerical
programming. So I ported the R example over to Rust, which required
a bit of work, but was doable. You can see the result here:

<blockquote class="embedly-card" data-card-key="66f8489580e04fc4a88a724eb5058bb3" data-card-branding="0" data-card-type="article-full"><h4><a href="https://jameshoward.us/2019/01/03/using-rust-on-the-open-science-grid/">Using Rust on the Open Science Grid</a></h4><p>I will admit that the Rust programming language fascinates me. It's got all the things I want in a programming language, that I normally get from C, and also gives me some measure of protection against really screwing up. Not that I do that much...or even have a use for, anymore.</p></blockquote>
<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>

Of course, there's nothing quite like a physical analog, and this
physicist decided to use a shotgun to replicate the Monte Carlo
approach!

<blockquote class="embedly-card" data-card-key="66f8489580e04fc4a88a724eb5058bb3"><h4><a href="https://www.youtube.com/watch?v=6bq6GKA7vcU">Calculate Pi with a Shotgun</a></h4><p>Support on Patreon: https://www.patreon.com/profkeester?ty=h Subscribe: https://www.youtube.com/user/ProfKeester Inspired by the Physicsgirl and Veritasium, ...</p></blockquote>
<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>

Do not try this at home.
