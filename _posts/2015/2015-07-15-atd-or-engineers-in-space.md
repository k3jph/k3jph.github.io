---
id: 2279
title: +++ATD, or Engineers, in SPACE!
date: 2015-07-15T21:16:25-04:00
author: k3jph
layout: post
permalink: /2015/07/15/atd-or-engineers-in-space/
dsq_thread_id:
  - "3938461841"
image: /assets/images/20150715_210628.jpg
categories:
  - Blog
tags:
  - computer science
  - history
  - software engineering
  - space
  - space robots
  - systems science
  - telecommunications
  - Wavix
---
Like a boss, right as the [DSN](https://eyes.nasa.gov/dsn/dsn.html) showed a downlink from New Horizons, I tweeted,

<center><blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Signal from New Horizons reads, &quot;+++ATD&quot; <a href="https://twitter.com/hashtag/plutoflyby?src=hash">#plutoflyby</a></p>&mdash; James P. Howard, II (@howardjp) <a href="https://twitter.com/howardjp/status/621120656344748033">July 15, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></center>

In 2001, I worked for a company called Wavix and we were building ground terminals for uplink/downlink communications with a small satellite constellation we operated.[^small]  It connected to a local PC to provide email services over the spacelink.  This, it turns out, was the coolest job I ever had.

The terminal, the Stasia 906, was a StrongARM SBC running Linux.  There was a GPS receiver and an RF transmitter and receiver, all jammed inside a Pelican case.  

{% include figure.html image="20150715_202138.jpg" alt="In here? Doom." cap="In here? Doom." %}

The hack I was proudest of was a surreal patch to the Linux kernel.  The terminal had an [RS-232](https://en.wikipedia.org/wiki/RS-232) on the front and the user would connect a serial cable from the PC to connect.  The idea was that the terminal would provide IP services over the wire and run mini POP and SMTP servers for mail transfer.  But we couldn't figure out how to get the link up after booting.  

We could hotwire the [PPP](https://en.wikipedia.org/wiki/Point-to-Point_Protocol) driver straight to the serial line, but Windows (we presumed was the client was running Windows) couldn't just start PPP.  It wanted to call you first.  So one day, I tore open the Linux kernel code and added a minimally compliant [Hayes modem command set](https://en.wikipedia.org/wiki/Hayes_command_set) to the serial driver code.  It didn't do anything but pretend to be a modem.  It would happily dial whatever number you put in.  And by that, I mean it threw away the numbers, pretended to connect, then launched the PPP daemon.  It could also accept hangups, too, which was great, since we could then gracefully end the connection.  

The Hayes modem command set was an abomination since it was inline.  The "+++" above's sole purpose is to capture the attention of the modem and say, essentially, "Stop what you're doing and _maybe_ do something else."  During this time, data could not be sent or received.  The "ATD" command I gave put the modem into communications mode, by telling it to start the data connection.  It assumed the phone was dialed and the receiver had picked up, it would start with the crazy squealing, for those of you old enough to remember such things.

Another awesome thing I did there was write a driver for the GPS unit.  This was back in 2001, so there weren't GPS units everywhere.  The ones we had were terribly unreliable and couldn't get a signal on a cloudy day.  Also, they didn't know about leap seconds, so they were all about 12 seconds too fast.  But I wrote the code to synchronize the time on the terminal to it (accounting for leap seconds, since they didn't).  Also, I set the location so the terminal would know where it was, too, and could plan for an overhead satellite pass.

{% include figure.html image="20150715_202250.jpg" alt="At least the on/off button is labeled" cap="At least the on/off button is labeled" %}

Passes were infrequent.  Usually only four a day (two satellites, two passes each), but we were happy to have two usable passes per day.  During this time, we did uplink and downlink.  Mail was sent and received over [AX.25](http://www.ax25.net/) at 9600 bps.  Our own uplink and downlink happened in Landover, Maryland.  We operated at 56k bps, but still used AX.25.  The last really neat thing I did there was how we managed the mail flow from Internet through to the satellite.  We didn't write a line of code.  We turned on [UUCP](https://tools.ietf.org/html/rfc976) and gave each ground terminal both an Internet address and a [bang path](http://www.catb.org/jargon/html/B/bang-path.html).  We took in mail over SMTP and ran it through the UUCP gateway, which just queued it for upload on the next pass.  Had I been cleverer, I would have called it an enterprise service bus.

I was originally hired by Dr. Jeff Shaumeyer and John Borden, who had previously worked together at the University of Maryland on [Project Zeno](http://www.zeno.umd.edu/).  I was hired to be a systems administrator, and that was my job title.  But, really, it only took a couple of weeks to standardize PC deployments and recable the place.  And I knew C, so I started taking on development work.  I did a bunch of other neat things that are harder to explain, like abusing Linux semaphores and writing a custom encrypted backup system from scratch.  

These  were just things that needed to get done.  That's the best part of working for a small business.  On the day I started, the company doubled in size from four to eight people.

I was there for just about ten months before we ran out of money and everyone was laid off.  And that ended my career as an embedded systems engineer.

{% include figure.html image="20150715_202320.jpg" alt="Where does the fibre cable go in?" cap="Where does the fibre cable go in?" %}

The pictures are my old development system.  The hardware should be fully functional.  Believe it or not, I acquired it on Ebay years after we went defunct.  The same one from my desk.

[^small]: The only word in this sentence not an exaggeration is "small."
