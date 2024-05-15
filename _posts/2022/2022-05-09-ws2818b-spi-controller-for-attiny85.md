---
id: ws2818b-spi-controller-for-attiny85
title: WS2818B SPI Controller for ATtiny85
date: 2022-05-09T15:45:07-04:00
author: k3jph
layout: post
permalink: /2022/05/09/ws2818b-spi-controller-for-attiny85
featured_image: /assets/img/news/ws2818b-spi-controller-for-attiny85.webp
categories:
- Blog 
tags:
- electrical engineering
- WS2818B
- SPI
- ATtiny85
---

Last year, I was working with a set of LEDs that are kind of dead
common WS2818B LED assemblies.  These are available on
[Amazon](https://www.amazon.com/s?k=ws2818b),
[Aliexpress](https://www.aliexpress.com/wholesale?catId=0&SearchText=ws2818b),
and pretty much any other electronics retailer.  If you are buying
programmable LEDs, odds on it is WS2818B.  And there's a good reason
for that.  They are dirt cheap and supposedly easy to work with.

It's that supposedly easy to work with part that is a bit difficult
to swallow.  They require a really absurd custom communications
protocol to deal to talk.  The LEDs are addressable in the sense
that you can control which LED you're talking to. Basically, it all
works like this:

1.  Assume you have some fixed number of LEDs.  We'll call that number $$n$$.
2.  For the first LED, you send 24 bits of data to it, representing an [RGB value](https://www.rapidtables.com/web/color/RGB_Color.html).
    1. To send a 1, first raise the WS2818B's data input high for 580 to 1600ns.  Then set the input low for 220 to 420ns.
    2. To send a 0, first raise the WS2818B's data input high for 220 to 380ns.  Then set the input low for 580 to 1600ns.
    3. Loop this step for each LED up to $$n$$.
3.  To reset and address the first LED again, set the input low for more than 2800ms, then go back to the first step.


The full protocol is described in the [WS2818B
datasheet](https://www.tme.eu/Document/ddc250a349c0084fadc3ded4c327f335/WS2818B.pdf).

The problem with this is, to control any substantial number of LEDs,
an [Arduino Uno](https://www.arduino.cc/en/main/arduinoBoardUno)
is stuck spending all of its time talking to the WS2818B cascade
and has no time left figuring out _what_ it should be sending.  It
would be nice if we could talk to the lights via a standard protocol,
like, oh,
[SPI](https://learn.sparkfun.com/tutorials/serial-peripheral-interface-spi/all).
There are libraries for talking SPI that run just fine on the Uno,
and consequently on the
[ATmega328](https://www.microchip.com/en-us/product/ATmega328P).

[Wayne Holder](https://sites.google.com/site/wayneholder/besting-ben-heck)
produced a solution that allows you to use an ATtiny10, but for a
variety of reasons, this was not working for me.  The biggest was,
even a "light" port to ATtiny85 would end up with the little chip
out of sync with everything else.  So, I broke the program down and
rebuilt it.

You can get it [off of
GitHub](https://github.com/k3jph/ws2818b-spi-controller).  The
implementation is built around PlatformIO, not the Arduino sketch
system.  It runs very well and I have let it run for long periods
without error.  It does double the chip count in my project, but I
had ATtiny85s on hand and it greatly simplified the coding on the
ATmega328P that is the primary controller.

If you want to learn more about SPI, Ben Eater has a fantastic video
on SPI here:

{% include youtube.html id="MCi7dCBhVpQ" %}

