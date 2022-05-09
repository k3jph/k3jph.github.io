---
id: 2869
title: Metaphone in R
date: 2015-09-20T18:45:07-04:00
author: k3jph
layout: post
permalink: /2015/09/20/metaphone-in-r/
dsq_thread_id:
  - "4149017401"
ampforwp_custom_content_editor_checkbox:
  - ""
instant_articles_submission_id:
  - "1778211042498628"
image: /assets/images/unshaved-yaks.png
categories:
  - Blog
tags:
  - data science
  - free stuff
  - linguistics
  - mathematics
  - Metaphone
  - phonetics
  - phonics
  - R
  - scientific computing
  - software
  - source code
  - systems science
  - text analysis
---
I was working on a data merge this weekend with some county-level data.  This has to do with [the NFIP](/research).  But one of the datasets did not include FIPS codes; it was just county names.  Well, there are plenty of rational ways one could deal with this.  But I saw before me a [glorious yak who desperately needed a shave](http://sethgodin.typepad.com/seths_blog/2005/03/dont_shave_that.html).  So I did the obvious thing and decided to [Metaphone](https://en.wikipedia.org/wiki/Metaphone) the county names to ensure normalization.

This, of course, required writing an implementation of Metaphone in R.  And before that, I had decided on what Metaphone.  First, Metaphone is a family of three algorithms.  First is the original Metaphone, which is widely regarded as flawed and still one of the best options for phonetic spelling.  Second is Double Metaphone which produces two different encodings for the same sound.  Third, is Metaphone3, which is patented and therefore essentially unusable for a few more years.  

I went with the original Metaphone, but this got complicated quickly.  It turns out, nobody can agree on what the correct standard is for Metaphone.  There's a version provided [as part of Apache Commons](https://commons.apache.org/proper/commons-codec/apidocs/org/apache/commons/codec/language/Metaphone.html) and also one included with [base PHP](http://php.net/manual/en/function.metaphone.php).  Apparently, and I cannot stress enough I have not tested this, they produce different results in some edge cases.  This version is derived from a [Javascript version](http://phpjs.org/functions/metaphone/) that is itself based on the PHP version.

There's a test suite of 83 examples taken from the Javascript implementation I use for regression testing.

The package is available for download from [GitHub](https://github.com/howardjp/phonics) and I have set up a [dedicated page here](/software/phonics).

Over the next few weeks, I hope to add other phonetic algorithms.  Of course, contributions are welcome.

_Image by [Arian Zwegers / Flickr](https://www.flickr.com/photos/azwegers/15842044051)._
