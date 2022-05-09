---
id: 3979
title: Notes on the Variscite DART-MX6 GPIO Interface
date: 2016-04-22T07:02:06-04:00
author: k3jph
layout: post
permalink: /2016/04/22/notes-variscite-dart-mx6-gpio-interface/
dsq_thread_id:
  - "4762052093"
image: /assets/images/VAR-DVK-DT6_Evaluation_Kit.jpg
categories:
  - Blog
tags:
  - ARM
  - computer science
  - embedded development
  - embedded systems
  - GPIO
  - linux
  - software engineering
  - systems science
  - Variscite DART-MX6
  - Yocto
---
[Because of reasons](http://threewordphrase.com/pardonme.htm), I have a [Variscite VAR-DTK-MX6](http://www.variscite.com/products/evaluation-kits/dart-mx6-kits) evaluation kit for the DART-MX6 system on module (SOM) sitting on my desk at home.  It's a neat little board.  The DART-MX6 is small, measuring 20mm by 50mm and runs a dual-core ARM Cortex-9 processor.  This makes it a bit more powerful than, for instance, a Raspberry Pi, but it is only $27.  The SOM is meant to be used as a component in an embedded application when some device or another that needs a 32-bit microprocessor.

The evaluation kit is about the size of two Raspberry Pi boards and mounts the SOM.  It provides HDMI, several USB ports, Ethernet, PCI Express, and more pins than I can count.  It also comes with a touchscreen that connects to the board.

Variscite provides images running both [Yocto](https://www.yoctoproject.org/) and [Android](https://www.android.com/).  It would be nice if it ran NetBSD, but that's only because I like such things.  For this project, my primary concern is Yocto.

The DART-MX6 provides a crazy number of GPIO pins.  The kernel reports 224:

{% highlight shell %}
root@var-som-mx6:~# cat /sys/kernel/debug/gpio 
GPIOs 0-31, platform/209c000.gpio, 209c000.gpio:
  gpio-6   (2194000.usdhc cd    ) in  lo    
  gpio-25  (phy-reset           ) out lo    
  gpio-28  (usb_h1_vbus         ) out lo    

GPIOs 32-63, platform/20a0000.gpio, 20a0000.gpio:

GPIOs 64-95, platform/20a4000.gpio, 20a4000.gpio:

GPIOs 96-127, platform/20a8000.gpio, 20a8000.gpio:
  gpio-101 (tlv320aic3x reset   ) out lo    
  gpio-111 (usb_otg_vbus        ) out lo    

GPIOs 128-159, platform/20ac000.gpio, 20ac000.gpio:

GPIOs 160-191, platform/20b0000.gpio, 20b0000.gpio:
  gpio-178 (sysfs               ) out lo    

GPIOs 192-223, platform/20b4000.gpio, 20b4000.gpio:
  gpio-200 (wlan-en-regulator   ) out lo    
root@var-som-mx6:~#
{% endhighlight %}

In particular, the documentation states there are two LEDs (D1 and D2) and three physical buttons on the evaluation board that can be read and set via GPIO.  However, figuring out which button is which GPIO pin is kind of opaque.  The [schematics provided by Variscite](http://www.variscite.com/images/stories/DataSheets/DART-MX6/VAR-DT6CUSTOMBOARD_SCH_V1_1_Doc_V1_3.pdf) provide some insight, but not enough.

The schematics state that the following are labels equivalent:

* D1 = GP\_LED1 = DISP0_DAT6 = GPIO4[27]
* D2 = GP\_LED2 = DISP0_DAT7 = GPIO4[28]
* SW1 = USR\_BTN1 = DISP0_DAT5 = GPIO4[26]
* SW2 = USR\_BTN2 = DISP0_DAT17 = GPIO5[11]
* SW3 = USR\_BTN3 = DISP0_DAT4 = GPIO4[25]

The other buttons are hardwired to reset and on/off so the don't matter much from this perspective.  Of course, those GPIO identifiers are still insufficient to determine what pin number Linux uses to identify the port.  Given an label of the form GPIOm[n], the pin will be internally identified as number (m - 1) * 32 + n.  So, for instance, D1 is GPIO pin (4 - 1) * 32 + 27 = 123.

So, the final mapping is:

* D1 = gpio123
* D2 = gpio124
* SW1 = gpio122
* SW2 = gpio139
* SW3 = gpio121

Despite this complexity, you can access and manipulate the GPIO using a simple shell script.  [This one, written for the Raspberry Pi,](https://github.com/lasandell/RaspberryPi/blob/master/gpio) will work just fine on any Linux system that exports the GPIO pins via [sysfs](https://en.wikipedia.org/wiki/Sysfs), which Yocto does on the DART-MX6.
