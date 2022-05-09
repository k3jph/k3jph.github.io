---
id: 5310
title: I Thought the Generals Were Due!
date: 2017-08-05T06:37:39-04:00
author: k3jph
layout: post
permalink: /2017/08/05/i-thought-the-generals-were-due/
dsq_thread_id:
  - "6043034447"
image: /assets/images/i-thought-the-generals-were-due.jpg
categories:
  - Blog
tags:
  - lottery
  - math education
  - mathematics
  - megamillions
  - probability
  - risk
  - statistics
  - The Simpsons
---
My friend follows up on [yesterday's
post](/2017/08/04/halloween-changes-mega-millions-scare) with this
question:

> I have had a subscription to the MegaMillions game since it
started. I always play the same six numbers. Almost every six months
I get a check for a few dollars. Why haven't those six numbers ever
come close to a decent payoff? Wouldn't, over time, the odds increase
that those six numbers will show up together?

That's a really complicated question.  Most statisticians think the
question is stupid, and will happily tell you so, then laugh, and
say no.  But that's not entirely fair.

To take the question literally, the answer is no, the odds do not
increase over time.  We assume a game like a lottery as a stream
of [independent and identically
distributed](https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables)
draws.  This assumption is so pervasive in statistics, not only
does it have its own Wikipedia page, but we also just abbreviate
it to iid, without periods.  That means that whatever happened in
the last draw has no effect on what happens in this draw.  The idea
that because your numbers have not hit yet that they are "due to
come around sometime" is incorrect, but also so common it's called
the [gambler's fallacy](https://en.wikipedia.org/wiki/Gambler%27s_fallacy).
That is, if you've lost a lot of times in a row, it does not increase
your likelihood of winning next.

Having answered the literal question, I strongly suspect the question
really means, "Won't the odds increase that my numbers will match,
over time?"  And the answer to that is yes.  Let's explain and let's
also simplify the game we are looking at.  We will use a traditional
pick 3.  The rules of a pick 3 are there are three numbers from 0
to 9 inclusive, and you pick 3 digits.  Let's further state the
numbers must be in the correct order.  There are [latex]10^3 =
1000[/latex] possible tickets.  If you play "123" once, your
probability of winning is the 1 minus the probability of not winning
[latex]1 - 999/1000 = 0.001[/latex].[^clumsy]  If you play the combination
a second time, your probability for the next draw is still 0.001
but your probability of winning overall is [latex]1 - (999/1000)^2
= 0.001999[/latex].  That's not quite 0.002, but close.  As you
increase your number of plays, the probability of ever winning gets
better with each draw.  Asymptotically, it approaches 1.

But, and this is the interesting bit, those probabilities do not
change, even if you change the numbers you are playing.  You are
just as likely to win with a random draw as you are picking "your"
numbers.  There used to be a page on the Powerball page noting that
some percentage (I want to say 40ish) of tickets purchased were
picked, with the balance random.  Also, roughly the same percentage
of winning tickets were picked with the balance random.  That fact
also suggests the draws of both random tickets and winning numbers
are very close to truly random, but that's a bit of a sideshow.

So should you play random or "your" numbers?  I argue random tickets
are "better."  When you play, you have a risk of sharing the jackpot
with another winner.  That reduces your winnings.  [This article
on
CNBC](https://www.cnbc.com/2016/01/13/its-not-a-good-idea-to-buy-quick-pick.html)
says this:

> For one thing, don't be lazy and take a bunch of Quick Pick
tickets. Quick Pick works by giving you combinations of numbers
automatically so you don't have to fill in the little bubbles.
Powerball works as a drawing of five balls from a bin of 69 white
balls and one red ball from a separate bin of 26.  > > The problem
is it's impossible to avoid getting duplicate sets of numbers, which
don't help at all.

This is true, but the analysis misses the point that "your" numbers
aren't random at all.  They are your kids' birthdays or the digits
of [latex]\pi[/latex] or the numbers you got in a fortune cookie
in 1988 or whatever.  The problem is, everyone else is getting
"their" numbers from the same limited pool.  I would argue that
collisions are more common in the limited pool.  On the other side,
someone else's random ticket is just as likely to collide with yours
as it is to be a winner.  That is, it is quite rare, but still
visible at scale.

Therefore, you are just as likely to win with either a random ticket
or your picked numbers, but I think the best option is always a
machine-generated random ticket.  Whatever you do, never bet against
the Harlem Globetrotters:

{% include youtube.html id="s4GAj2v4BIE" %}

[^clumsy]:  Yes, I know that's clumsy, but it keeps it simple for the next step.
