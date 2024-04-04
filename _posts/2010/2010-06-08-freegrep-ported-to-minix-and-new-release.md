---
id: 678
title: FreeGrep Ported to Minix and New Release
date: 2010-06-08T00:55:22-04:00
author: k3jph
layout: post
permalink: /2010/06/08/freegrep-ported-to-minix-and-new-release/
dsq_thread_id:
  - "2271793618"
tumblr_howardjp_permalink:
  - http://howardjp.tumblr.com/post/674821572/freegrep-ported-to-minix-and-new-release
tumblr_howardjp_id:
  - "674821572"
categories:
  - Blog
tags:
  - FreeBSD
  - FreeGrep
  - Github
  - Minix
---
This morning, [GitHub user gautambt](http://github.com/gautambt) ported [FreeGrep](http://github.com/howardjp/freegrep) to [Minix 3](http://www.minix3.org). While the build system leaves something to be desired, I remain resolute in my desire to never learn Autoconf. I have pulled **gautambt**'s changes into the master branch on GitHub.

In related news, I figured that after 12 years, it was time to let this thing graduate. So I cut a new release and have blessed it as version 1.0. The release should build cleanly on FreeBSD, NetBSD, OpenBSD, and Minix 3. Compiling by hand, it will also build on OS X. You can download FreeGrep 1.0 from [GitHub](http://github.com/howardjp/freegrep/downloads) and [ftp://ftp.jameshoward.us/pub/howardjp/grep/](ftp://ftp.jameshoward.us/pub/howardjp/grep/).
