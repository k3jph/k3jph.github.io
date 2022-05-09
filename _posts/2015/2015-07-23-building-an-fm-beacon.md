---
id: 2335
title: Building an FM Beacon
date: 2015-07-23T18:15:37-04:00
author: k3jph
layout: post
permalink: /2015/07/23/building-an-fm-beacon/
dsq_thread_id:
  - "3964416122"
image: /assets/images/20150723_165144.jpg
categories:
  - Blog
tags:
  - amateur radio
  - arduino
  - BeaABH
  - Carme
  - ChaseKBH
  - K3JPH
  - RF engineering
  - space robots
---
As some of you have heard, the House of Basu Howard continues research into building a [space robot](http://www.somethingawful.com/icq-pranks/icq-transcript-space/).  The House motto, as you may recall, is "If you're gonna build a robot, you should go the extra mile and put it into space."  Of course, more accurately, this would be 60 miles, but who's counting?

We started our research and development work by attempting to build an RF radio beacon.  The kids call this the "ground robot."  This is a project that, rather quickly, spun out of control.  As near as I can tell, we should be able to hook up an oscillator to a wire and I've got a really crappy but functional transmitter.  To that end, we got a handful of oscillators ([MAX2606 and MAX2608](http://www.maximintegrated.com/en/datasheet/index.mvp/id/2323), which will cover the 2m and 70cm bands, respectively) on their way.  But to set the center frequency, we need to set an inductor between two of the pins.  And for the MAX2606, it will need to be 190 nanohenries to set a center frequency around 145MHz.  It seems just buying inductors is not as simple as buying other electronic parts.

Eventually I gave up on this approach and purchased an [RFM22](https://www.sparkfun.com/products/11018) and slapped it onto an Arduino Uno.  It doesn't drop down to 2m, but it is has a good range from 240MHz through to 980MHz, and that covers 70cm.  And we could even turn it on.  All we had left to do was generate meaningful data.  The RFM22 is really meant to transfer digital data.  It can run [OOK](https://en.wikipedia.org/wiki/On-off_keying), [FSK](https://en.wikipedia.org/wiki/Frequency-shift_keying), and GFSK.  These are all digital modes.  

We wanted something a touch more tangible.  We wanted to hear Morse code coming out of the radio.  But the RFM22 doesn't support non-digital modes.  Morse is a type of OOK, but the OOK modes provided are all digital-only.  But the documentation supports one more mode, the unmodulated carrier.  This is a simple pure sine wave.  And a simple pure sine wave is the core of Morse code transmissions.  It's so core, Morse is often just called "CW," short of "carrier wave."

But a pure CW wave is silent.  The squelch on the receiving radio opens, but there's nothing there, like if you picked up a dead line on a phone.  Modern radio receivers, generally, support [monochannel](https://en.wikipedia.org/wiki/Monaural) [FM](https://en.wikipedia.org/wiki/Frequency_modulation), on 70cm.  And FM radio is really easy.  Let's assume you want to broadcast at [102.7](http://www.webn.com).  That's 102.7MHz or 102,700,000 hertz.  If you want to send the tone 440 Hz, [middle A](https://en.wikipedia.org/wiki/A440_(pitch_standard)), you encode the signal by broadcasting at 102,700,000 + 440 Hz.  It's an analog form of frequency-shift keying.

We can do that too, by changing the frequency of the transmitter.  We broadcast 100mW at 432.330Mhz with a shift of 300Hz (after trying several different options, we decided this sounded good).  The radio is controlled using the [RadioHead](http://www.airspayce.com/mikem/arduino/RadioHead/) library and Morse generated using the [Morse library for Arduino](https://github.com/markfickett/arduinomorse) (which, because it is C++, even though it is designed for running an LED, can be extended to controlling a radio).[^classes] I have made the code available [via GitHub](https://github.com/howardjp/bronze-olive).  You can hear it in this video.

{% include youtube.html id="gnsdQhnmpgw" %}

The Morse code string sent is "K3JPH/B Bronze Olive."  [K3JPH](http://wireless2.fcc.gov/UlsApp/UlsSearch/license.jsp?licKey=3503446) is my callsign issued by the FCC.  The /B is a traditional callsign appendix for beacons.  "Bronze Olive" was created by an Internet code name generator.  Version numbers suck and this is what came out.  It's no [Castle Bravo](https://en.wikipedia.org/wiki/Castle_Bravo), but it will do.  

Our next steps are to shrink the package.  Using standard Arduino components, we can scale down the weight. The lower we go, the higher we can go.  Also, we need to get more power into this.  Limiting ourselves to 100mW on 70cm means our signal does not carry very far.  By next spring, I'd like to have a balloon test ready with a smaller mass footprint, more power, and solar cells to feed the whole thing.

In the mean time, I'd like to remind you the space robots are here to protect you from the terrible secret of space:

{% include youtube.html id="3_t2HDFM4nQ" %}

[^classes]: Class-based inheritance: good programming practice, bad social policy.
