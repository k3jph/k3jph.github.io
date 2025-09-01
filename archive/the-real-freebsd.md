---
id: the-real-freebsd
title: The Real FreeBSD
author: k3jph
layout: page
permalink: /archive/the-real-freebsd/
categories:
  - Blog
tags:
  - FreeBSD
  - BSD
  - open source
  - Linux
  - operating systems
---

## Abstract

There are a number of common misconceptions about FreeBSD in non-BSD circles.

Many of these misconceptions were voiced recently on the Linux-oriented news site, [Slashdot](http://www.slashdot.org/). These misconceptions are detrimental to the community and their long-term effect is to drive away users. The motivations for spreading these falsehoods range from simple ignorance to social, political, and economic agendas.

Here, I aim to clear up many of these misconceptions in the hope to attract new users and prevent the spread of misinformation about FreeBSD.

## "BSD is Too Fragmented"

This simply is not true, though it is easy to misunderstand the nature of BSD's development. There are four wholly separate BSD-derived operating systems in current development. These are BSD/OS, [FreeBSD](http://www.freebsd.org), [NetBSD](http://www.netbsd.org), and [OpenBSD](http://www.openbsd.org). These projects neither pretend to be the same operating system nor operate with the same goals.

BSD/OS is a commercial product developed at BSDI. BSDI offers support contracts as well as a truly advanced and robust operating system for the x86 platform. FreeBSD was developed to be the most stable and robust operating system on the x86 platform. Work has begun on Alpha and Sparc ports. NetBSD is designed to be a common operating system for multiplatform research. NetBSD may run on more architectures and processors than any other operating system. OpenBSD split from NetBSD to provide an industrial-strength secure operating system without the pressure of United States export authorities.

While there is a significant amount of code sharing among the various development groups, they still provide four different operating systems.

This is not fragmentation of the market. Each provides for its niche market. And while calls of fragmentation of the BSD community run rampant throughout the Linux world, Linux is a far more fragmented operating system. With over a hundred distributions, Linux is often unable to provide compatibility with itself even though "there is only one Linux kernel." I was bitten by this several years ago when I wrote a set of scripts to manage the startup *rc* files on a Slackware system. When the system was moved to Red Hat, the scripts broke. Thousands of others had problems when the move to glibc was rushed by Red Hat while other distributions remained cautious.

## "Unrepentant Hypocrisy"

During one licensing holy war, an anonymous coward claimed that FreeBSD is dying because of "unrepentant hypocrisy (hatred of the FSF while slurping up all the FSF GNU tools in sight)." Many others have mentioned that FreeBSD should quit complaining about the GPL while using GCC and other GNU tools. While it is true that a number of GNU utilities are used in FreeBSD, they comprise fewer than 8% of the utilities and 15% of the libraries. An effort to replace GNU code with freely re-distributable implementations is also underway.

## "FreeBSD is an Old Boy's Network and Too Closed"

This simply is not true. At the beginning of July I mysteriously appeared on the mailing lists offering a replacement for grep (which is the GNU version). The program I offered had several significant bugs and lacked many of the features required to make it the new standard.

Within just a few hours I had received dozens of email messages thanking me for the effort and dozens of patches to fix bugs and add features. This level of support and encouragement is decidedly open. Code and patches are accepted if they are considered appropriate. The Linux mindset can often be characterized as "code exists, throw it into the distribution." FreeBSD is far more conservative. Code and features are only included if they are deemed appropriate for inclusion of the base operating system. This leads to a software set that is complete yet not bloated.

Code is also only added if it is of high quality and after lengthy testing. If a program does not work it should not be in the base, no matter how useful it is. Several of my patches were completely rewritten by FreeBSD developers before committing them. This did not bother me; I was more interested in the features I gained from this. I also know that my workstation will not crash after my next upgrade.

Others have suggested that the FreeBSD developers are condescending toward and refuse to help new users. While this does happen, it is rare. And it is nothing more than responses from seasoned Linux, OS/360, Solaris, OpenVMS, and even Windows users. There will always be operating systems super zealots.

## "FreeBSD is a Linux Clone"

FreeBSD is not a Linux clone. In many ways, Linux is a FreeBSD clone. FreeBSD and Linux are indeed similar. They are based on Unix and given away for free. Linux was developed by an undergraduate student at the University of Helsinki to correct the flaws of Minix. However, FreeBSD is based on the 4.4BSD distribution of Unix from the University of California at Berkeley released in 1994. Prior to 1994, BSD development was funded by the United States Department of Defense for nearly 15 years.

The early BSD work involved adding virtual memory to Unix, the C Shell, and vi in the late 1970s. The first widely used TCP/IP stack was included in 4.2BSD and was reused in dozens of other operating systems.

FreeBSD continues in the tradition of the Berkeley by offering a simple, stable, powerful, advanced, yet free implementation of the Unix environment.

## "There are No Applications for FreeBSD"

This is not true either. FreeBSD has developed the most advanced third-party application system in the world, the [Ports System](http://www.freebsd.org/ports) with over 2,500 applications. The Ports System is organized by application type and permits any of these applications to be installed with just a few short command lines. The ports system also manages package dependencies as well. To install the latest version of bash is as simple as:

{% highlight shell %}
root@byzantine:~# cd /usr/ports/shells/bash2
root@byzantine:/usr/ports/shells/bash2# make install
{% endhighlight %}

And if this is not enough applications for you or an application you need does not exist in `/usr/ports`, Linux binaries run without modification. Many have commented that performance improved using Linux binaries under FreeBSD as opposed to under Linux.

## "FreeBSD is a Dead End"

FreeBSD is an ongoing development effort. Daily snapshots of both the CURRENT and STABLE branches of development are available. Full scale releases are made twice a year.

Some claim that FreeBSD's development is not modern enough. However, the past year has seen the full conversion to ELF, CAM, the brand new SCSI subsystem, and a brand new set of IDE drivers. Ports to the Alpha and Sparc architectures also show new work in FreeBSD. Two different research groups have created IPv6 stacks. Soft updates and Vinum have added both reliability and scalability to the file system. Significant security-related enhancements from OpenBSD have also been incorporated. PicoBSD has shown that FreeBSD can be used in embedded applications.

## "FreeBSD Should GPL Itself"

FreeBSD users are often quick to criticize a product which is licensed on the GPL. Licensing an application under the GPL will most likely prevent its inclusion in FreeBSD. Many proponents of Linux and the GPL are quick to state that "if FreeBSD wants to use GPL'd code, FreeBSD should GPL itself." However, this would be illegal. The majority of FreeBSD is owned by the Regents of the University of California, where it was originally developed. Removing the existing license without the permission of the Regents would be no different than releasing a version of GCC with a BSD copyright in place of the GPL.

Many, including Richard Stallman, have criticized the BSD license due to its demand for credit in advertising. Since this is the only restriction on further redistribution, the BSDs are the only freely re-distributable operating systems in common use. However, due to the advertising clause, FreeBSD cannot simply tack the GPL onto the existing license. The GPL prohibits this. Much new development removes the advertising clause of the copyright statement.

## "FreeBSD Users are Simply Jealous of the Success of Linux"

Some FreeBSD users may indeed be jealous. But many are simply curious about why a new user would choose Linux over FreeBSD, despite FreeBSD's technical superiority. In many ways, this is how Linux proponents view Windows users. Others do not care. Unlike Linux advocates, FreeBSD advocates do not believe FreeBSD should be running on every microchip.

Most FreeBSD advocates merely wish to see it perform best where it does best: Internet servers and high-end workstations.

## Conclusions

The myriad of misinformation surrounding FreeBSD leaves many users with a bad impression of FreeBSD development and users. Many of these users would be better served by FreeBSD. Many companies trust their most critical systems to FreeBSD. These companies often say that after trying Linux, NT, and other platforms, FreeBSD was the only one which could handle the application. FreeBSD might be perfect for your application.

Most negative talk about FreeBSD is baseless and intended to destroy, scare, or subvert potential users. Those in the Linux community who trash talk FreeBSD merely imitate the Microsoft they hate so much.

> Howard, James. "The Real FreeBSD." _DaemonNews_, September 1, 1999.  
> [http://www.daemonnews.org/199909/freebsd.html](http://www.daemonnews.org/199909/freebsd.html?utm_source=chatgpt.com)
