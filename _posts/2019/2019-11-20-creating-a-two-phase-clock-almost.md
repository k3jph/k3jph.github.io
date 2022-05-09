---
id: 7186
title: "Creating a Two-Phase Clock...Almost"
date: 2019-11-20T11:19:24-05:00
author: k3jph
layout: post
permalink: /2019/11/20/creating-a-two-phase-clock-almost/
image: /assets/images/creating-a-two-phase-clock-almost.jpg
categories:
  - Blog
tags:
  - electrical engineering
  - MC6800
  - signal processing
---
A [quick update on this](/2019/11/15/6502-based-computer-in-2019/). I
built the clock described in this video over the weekend:

<blockquote class="embedly-card" data-card-key="66f8489580e04fc4a88a724eb5058bb3" data-card-branding="0"><h4><a href="https://www.youtube.com/watch?v=kRlSFm519Bo">Astable 555 timer - 8-bit computer clock - part 1</a></h4><p>Our computer's clock is built using several 555 timers. The first is configured as an astable oscillator. See https://eater.net/bbcpu8-clock-module for more....</p></blockquote>
<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>

This went quite well, and since I have the 6502 kit, I could start
on it. But [Ben Eater](https://eater.net/) has not completed the
instructional series. Being able to replicate the procedure is
important, but the best way to make sure you've really learned
something is to change feature to something analogous and see if
you can create the analogous situation.

I went on eBay and found 5 [Motorola
6800](https://en.wikipedia.org/wiki/Motorola_6800) microprocessors for
like $15\. These are not the Motorola 68000 processors that turned
up in stuff all through the 1980s, like the first generation of
Mac, NeXT, and Sun boxes. These are 8-bit processors that were used
in industrial applications and, interestingly, [pinball
machines](http://www.smokingcircuit.com/mc6800.html). They came in
the mail on Monday and I pulled up the datasheet. The question is,
could I get it to start up and do a thing. So I snagged
the [datasheet](https://www.datasheets360.com/part/detail/mc6800p/8665401262952904350/) and
got a less than pleasant surprise. It needs _two_ clocks.

Two clocks, alternating. It's called a two-phase non-overlapping
clock. That is, both clocks can _never_ be on at the same time.
They can both be off at the same time, though, without it being a
problem. Okay, so I think for a minute and splitting the signal out
and inverting it is not difficult. I have spare I/O pairs on the
hex inverter. But something doesn't feel right, and I am worried
it does not guarantee that there is no overlap. After all, this
stuff does not work instantaneously. So I Googled for "two-phase
clock generator" and got this PDF:

<blockquote class="embedly-card" data-card-key="66f8489580e04fc4a88a724eb5058bb3" data-card-controls="0"><h4><a href="http://www.doe.carleton.ca/~ngt/4609/2phase.pdf">(null)</a></h4><p>(null)</p></blockquote>
<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>

Okay, so, yeah, look at the bottom one. It needs 2 ANDs and 5 NOTs.
I have two gates on the AND free. And I have exactly 5 NOTs on the
inverter free! So, I wired it up and lo-and-behold:

<blockquote class="embedly-card" data-card-key="66f8489580e04fc4a88a724eb5058bb3" data-card-branding="0"><h4><a href="https://www.youtube.com/watch?v=Xe5qO0UOtk0">Astable 555 timer - 8-bit computer clock - part 1</a></h4><p>Our computer's clock is built using several 555 timers. The first is configured as an astable oscillator. See https://eater.net/bbcpu8-clock-module for more....</p></blockquote>
<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>

Well, if you watch through to end, you might have seen the thing
skipped a phase at one point. I played with it a lot last night and
I know this is crazy, but it seems to skip a phase more frequently
the closer I am. In fact, if I can put my hand right next to the
left-side blue LED and it will skip more than one phase! But I am
probably imagining the correlation there.

Anyway, I am close, but there's still some work to do.
