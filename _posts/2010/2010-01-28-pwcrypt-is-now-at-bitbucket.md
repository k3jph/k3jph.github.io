---
id: 687
title: PWCrypt is Now at Bitbucket
date: 2010-01-28T14:52:00-05:00
author: k3jph
layout: post
permalink: /2010/01/28/pwcrypt-is-now-at-bitbucket/
dsq_thread_id:
  - "2309664517"
tumblr_howardjp_permalink:
  - http://howardjp.tumblr.com/post/357967476/pwcrypt-is-now-at-bitbucket
tumblr_howardjp_id:
  - "357967476"
categories:
  - Blog
tags:
  - bitbucket
  - hash
  - Mercurial
  - Netscape
  - password
  - pwcrypt
  - source code
---
As part of my plan to rescue data from old [CVS](http://www.nongnu.org/cvs/) repositories, [PWCrypt is now available at Bitbucket](http://bitbucket.org/howardjp/pwcrypt/). PWCrypt provides command line access to the Unix [crypt library function](http://en.wikipedia.org/wiki/Crypt_%28Unix%29#Library_Function).

This program and an accompanying article were written in response to a problem I had in 1999 with Netscape Enterprise Server. After taking over administration of a Windows NT-based Netscape server, I discovered I did not know the administrator password for NES. I hunted down the password file and saw it hashed passwords using the same format at the password file for Unix-like systems.

So I needed a hashed value for a known password to drop into NES's password database and used this program to create that value. It's seen no substantive changes since the original publication eleven years ago.

_Nota bene_: This is a [Mercurial](http://mercurial.selenic.com/) repository stored on [Bitbucket](http://www.bitbucket.org), not Git/GitHub like I've made available the past few weeks. I chose Mercurial for this project so I could get a better feeling for it vis-à-vis Git.
