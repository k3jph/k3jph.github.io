---
id: 7257
title: Zeroes Are Hard to Find
date: 2020-02-05T12:16:00-05:00
author: k3jph
layout: post
permalink: /2020/02/05/zeroes-are-hard-to-find/
image: /assets/images/zeroes-are-hard-to-find.jpg
categories:
  - Blog
tags:
  - CMNA
  - optimization
  - root finding
---
When we are looking at two-dimensional optimization algorithms,
there are a variety of options. The first is the [bisection
method](http://www.mathcs.emory.edu/~cheung/Courses/170/Syllabus/07/bisection.html).
I like the bisection method, because it makes a delightful use of
the [intermediate value
theorem](https://www.mathsisfun.com/algebra/intermediate-value-theorem.html).
We can use the fact that continuous functions take on all of the
values between two points. They may take on a value more than once,
but that is someone else's problem. Formally stated, the intermediate
value theorem says:

> If [latex]f[/latex] is continuous on a closed interval
[latex][a,b][/latex], and [latex]c[/latex] is any number between
[latex]f(a)[/latex] and [latex]f(b)[/latex] inclusive, then there
is at least one number [latex]x[/latex] in the closed interval such
that [latex]f(x)=c[/latex].

As a root-finding algorithm, bisection takes advantage of the fact
we _know_ the value crosses 0\. Take, for example, [latex]f(x) =
x^2 - 1[/latex]:

<center>
<figure><iframe src="https://www.desmos.com/calculator/cqxqmqbeml?embed"
width="500px" height="500px"></iframe></figure>
</center>

We can _see_ that the function crosses zero. Of course, what we see
is irrelevant, what is important is the image tells us a story.
Going back to our theorem, we can say let [latex]a = 0[/latex] and
[latex]b = 2[/latex]. Then we know [latex]f(a) = -1[/latex] and
[latex]f(b) = 3[/latex]. It is a continuous function, so we know
there has to be some value of [latex]x[/latex] such that [latex]f(x)
= 0[/latex]. We short cut this process by just narrowing the space
between [latex]a[/latex] and [latex]b[/latex] until we are satisfied
our solution is close enough.

But there's a problem here. What if there are no negative values
of the function? Take, for example, [latex]f(x) = (x - 1)^2[/latex]:

<center>
<figure><iframe src="https://www.desmos.com/calculator/ayhmgxigem?embed"
width="500px" height="500px"></iframe></figure>
</center>

We can solve this problem with [Newton's
method](https://www.math.ubc.ca/~anstee/math104/newtonmethod.pdf). Of
course, the problem with Newton's method is that you need to know
the derivative of [latex]f(x)[/latex], _a priori_. Finding the derivative of
[latex]f(x) = (x - 1)^2[/latex] is easy. Finding the derivative of
[latex]f(x) = x^x[/latex] is hard. I mean, I know the answer, but
don't ask me how to figure it out. That's what undergrads are for.
So we can solve this problem, with the [secant
method](https://www.sciencedirect.com/topics/engineering/secant-method). It
just estimates the derivative along the way. What we learn here is
that no method works perfectly in every scenario. That's the hardest
part of numerical analysis: understanding the computer can do all
the work.
