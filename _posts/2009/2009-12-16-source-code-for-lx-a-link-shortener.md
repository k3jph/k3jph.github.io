---
id: 693
title: Source Code for LX, a Link Shortener
date: 2009-12-16T22:54:43-05:00
author: k3jph
layout: post
permalink: /2009/12/16/source-code-for-lx-a-link-shortener/
tumblr_howardjp_permalink:
  - http://howardjp.tumblr.com/post/286614416/source-code-for-lx-a-link-shortener
tumblr_howardjp_id:
  - "286614416"
dsq_thread_id:
  - "2734392082"
instant_articles_submission_id:
  - "1741801862808471"
categories:
  - Blog
tags:
  - cakephp
  - computer science
  - Facebook
  - Google
  - information technology
  - links
  - PHP
  - software
  - software engineering
  - source
  - systems science
  - web
---
Last August, I began work on a link shortening service as a me-too kind of project.  In my case, I wanted to provide custom domains, so that, for instance, _The Washington Post_ could be wp.ly.  However, I had been displeased in the user interface I had created and had not taken it live.

On Monday, the jig was up when both [Google](http://googleblog.blogspot.com/2009/12/making-urls-shorter-for-google-toolbar.html "Making URLs shorter for Google Toolbar and FeedBurner") and [Facebook](http://www.insidefacebook.com/2009/12/14/facebook-testing-new-url-shortener-fb-me/ "Facebook Testing New URL Shortener, fb.me") pushed their own link shorteners into the arena.  Additionally, bit.ly announced [bit.ly Pro](http://blog.bit.ly/post/284009728/announcing-bit-ly-pro "Announcing bit.ly Pro") which will provide the custom domain I had been interested in.  Rather than being steamrolled by these behemoths, I will instead open source my code under a [BSD License](http://en.wikipedia.org/wiki/BSD_licenses).  It is now available at [GitHub](http://github.com/howardjp/lx "lx at GitHub").

From the readme:

lx is a URL-shortening application created in CakePHP. The Git repository is a top-skimming of the `/app` directory from CakePHP v1.2.4. Also included in `/sql` is a database template for PostgreSQL. _It is important to note, this code does not work and will need significant revision before being functional._ However, here is a partial list of partially implemented features:

*   URL addition
*   URL deletion
*   URL redirection
*   URL favoriting (through the “stars” concept)
*   User accounts
*   User verification
*   URL renaming (title, not target)
*   Some jQuery-based AJAX

Please use this as the basis for your own work.  If you wish to contribute changes back, please do.
