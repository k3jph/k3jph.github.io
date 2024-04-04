---
id: 666
title: pbcopy and pbpaste
date: 2011-03-16T20:40:08-04:00
author: k3jph
layout: post
permalink: /2011/03/16/pbcopy-and-pbpaste/
dsq_thread_id:
  - "2271650804"
tumblr_howardjp_permalink:
  - http://howardjp.tumblr.com/post/3904519868/pbcopy-and-pbpaste
categories:
  - Blog
tags:
  - computer science
  - information technology
  - Mac OS
  - software engineering
  - systems science
  - tutorial
  - Unix
---
The Unix command line has historically interacted poorly with the
numerous graphical interfaces that have been stacked upon it.  One
key area lacking support is the clipboard.  MacOS X brings two
utilities to close that gap, `pbcopy` and
`pbpaste`.  These commands together provide complete
access to the MacOS X clipboard (which Apple calls the pasteboard,
explaining the names of these two commands).

The first of the two, `pbcopy`, takes its input from
the standard input and adds it to the system clipboard.  The command
only accepts one option, _-pboard_, which accepts one of
four suboptions, "general", "ruler", "find", and "font", all of
which are different system clipboards available on MacOS X.  The
general pasteboard is the main system clipboard and the others are
for special use.

The `pbpaste` pulls data from the clipboard and
prints it to the standard output.  Like `pbcopy`,
`pbpaste` accepts the option _-pboard_ to
determine which pastebaord to acquire data from.  The
`pbpaste` command adds a second option, _-Prefer_
which takes three possible options "txt", "rtf", and "ps".  These
options direct `pbpaste` looks for a certain type of formated
information on the pbasteboard.  The "txt" flag suggests standard
text data.  The "rtf" and "ps" suggest Rich Text Format and PostScript,
respectively.  Despite this option, it is not possible to direct
the exact output `pbpaste` prints.  This option only
tells `pbpaste` what type of information to return
first.

These two commands offer the MacOS X command line warrior a simple
and fairly complete set of tools for working with and manipulating
the MacOS X pasteboards.
