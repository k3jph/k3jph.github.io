---
id: 661
title: The MacOS X open(1) Command
date: 2011-03-23T01:23:12-04:00
author: k3jph
layout: post
permalink: /2011/03/23/the-macos-x-open-1-command/
dsq_thread_id:
  - "2268135103"
tumblr_howardjp_permalink:
  - http://howardjp.tumblr.com/post/4035306032/the-macos-x-open-1-command
tumblr_howardjp_id:
  - "4035306032"
instant_articles_submission_id:
  - "954340901365189"
categories:
  - Blog
tags:
  - computer science
  - information technology
  - Mac OS
  - shell
  - software engineering
  - systems science
---

MacOS X provides a commnad line tool to open applications and files. MacOS X applications are actually collections of files residing within one directory with a name ending in _.app_. I usually use `open` at the command line to start most applications, leaving the Dock clear of applications not running:

{% highlight shell %}
howardjp@thermopylae:~$ open /Applications/Safari.app
{% endhighlight %}

is enough to start Safari and if the browser is already running, it will open a new window.

The `open` command also works on individual files and will open the file in its associated application. For instance, running open on a PDF will open the file in Preview. And running `open` on a normal directory (as opposed to an application package) will open the directory in Finder.

The `open` command provides a number of useful options. The option _t_ treats the file, regardless of type, as a text file and opens it in the default text editor. A related option, _e_ simplifies the process and opens the file in TextEdit, the native text editor provided with MacOS X. Also related is _f_, which reads from the standard input and passes the input to the default text editor.

It is also possible to override the default application with other types of files using the option _a_. But it is important to remember the full path to the application must be given:

{% highlight shell %}
open -a /Applications/Adobe Reader 9/Adobe Reader.app/ foo.pdf
{% endhighlight %}

This form is quite cumbersome, but it may be appropriate in some circumstances. One last option worth mentioning is _R_ which find the references file in Finder, instead of opening the file itself. Of course, `open` supports other options as well and reveiwing the man page is advised.

Finally, the `open` supports URLs:

> open [http://www.jameshoward.us](http://www.jameshoward.us)

will open my website directly in the default browser.
