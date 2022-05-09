---
id: 6552
title: A Challenge Problem for Extra Credit
date: 2018-11-17T10:31:45-05:00
author: k3jph
layout: post
permalink: /2018/11/17/a-challenge-problem-for-extra-credit/
image: /assets/images/a-challenge-problem-for-extra-credit.jpg
categories:
  - Blog
tags:
  - extra credit
  - finite mathematics
  - math education
  - mathematics
  - optimization
---
I just gave the following problem to my [MATH 106](/tags/finite-mathematics) students:

> Hello, everyone.  We're getting to that point in the semester
when students start asking the question every professor hates:  Can
I get extra credit?  Now, I will say something really important
here and that is I do not like extra credit at all.  Most of the
time, the question could be rephrased, "Can I do extra work and get
more credit for it?" like we're talking about a prison term.  And
the answer to that is no, not really.  Never.
>
> But.  I really like the idea of extra credit when the work is
something above and beyond the course material.  When it is something
that truly expands on what you are doing.  When it's something, you
know, extra.
> 
> And I think I have a good one.  I've never used this problem before,
so we're going to see together whether or not it works.  Right now,
you're working on a problem for Homer's Donuts.  This is a business
problem and an example of the class of problems we broadly call
optimization and you use a method called linear programming to solve
it.  That's awesome.  For extra credit, I want you to do the problem
again.
>
> It turns out these sorts of optimization problems can grow extremely
complex, with hundreds of constraints, discrete requirements (you
cannot use only half of some items), or even nonlinear aspects.
Homer's Donuts is limited to just a handful of potential options
you need to evaluate using the simplex method.  I have a problem
like this at my day job that has a theoretically infinite number
of potential solutions.  It's so complex, we'll be happy if we can
find a solution that's good enough...we know the "best" is forever
elusive.  I'm using a computer the size of a basketball court to
get that answer, too.  This is the real world of being a mathematician.
>
> There are a class of computer programs that work these kinds of
problems called optimizers.  Two of the most famous are
[GAMS](https://www.gams.com/) and [AMPL](https://ampl.com/), but
there are many others.  Both GAMS and AMPL are very expensive pieces
of software.  They are used for everything from routing UPS trucks
to setting stock bid prices to determining where to draw school
boundary lines.  In other words, they are good at what they do and
the people who can use them have a really important skill set you
can start to pick up right here.
>
> As I said, they are expensive, but there's good news.  There's a
website called the [NEOS Server](https://neos-server.org/neos/)
where you can upload your problem and use any of dozens of combinations
of programs and solvers to solve a problem.  For free.  I didn't
even know this until last week and it is the inspiration for this
problem.
>
> So, the challenge, should you choose to accept it, is can you write
a model file for any of the solvers that, with a description of
what settings to select, will solve Homer's donut problem?
>
> Here are the rules:
>
> * Your solution must be a complete model file.
> * Your solution must also list all of the required options to select.
> * Any questions must be posted to this conference.  Everyone should benefit from any insights.
> * Frankly, I don't mind you working together on a solution. But if you form a group, please limit the size to 3.
> * This will be worth 10 percent of the final grade: a full letter bump.
> * Additional rules will be posted as they become necessary and/or evident.
>
> Here are some hints:
>
> * You want to use one of the linear programming options.
> * I strongly recommend using the CPLEX solver.
> * If I were doing this, I would use GAMS because it displays a lot more information by default when it solves the problem.
> * Most people I know, however, swear by AMPL because its model file description reads like an algebra problem.
> * No, I have not solved this problem yet.
> * Additional hints will be posted as they become necessary and/or evident.
