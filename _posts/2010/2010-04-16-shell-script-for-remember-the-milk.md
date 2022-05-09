---
id: 682
title: Shell Script for Remember the Milk
date: 2010-04-16T23:00:00-04:00
author: k3jph
layout: post
permalink: /2010/04/16/shell-script-for-remember-the-milk/
dsq_thread_id:
  - "2268152395"
tumblr_howardjp_permalink:
  - http://howardjp.tumblr.com/post/526729497/shell-script-for-remember-the-milk
tumblr_howardjp_id:
  - "526729497"
categories:
  - Blog
tags:
  - geekery
  - GTD
  - Remember the Milk
---
A couple of weeks ago, the [Remember the Milk](http://www.rememberthemilk.com) blog posted about [adding tasks at the command line](http://blog.rememberthemilk.com/2010/03/tips-tricks-tuesday-two-quick-ways-to-add-tasks-to-remember-the-milk-unix-command-line-automator-service-in-snow-leopard/). A simple way to handle task generation, but a bit too complex for even your average Unix hacker. This script makes it easy and gives you an option to add a note! Just set RTMADDR and PROG to be your Remember the Milk email address and your local script name, _i.o._:

{% highlight shell %}
#!/bin/sh

RTMADDR='user+NNN@rmilk.com'
PROG='rtm'

TEMP=`getopt -o n --long note -n $PROG -- "$@"`
if [ $? != 0 ] ; then echo "Terminating..." >&2 ; exit 1 ; fi
eval set -- "$TEMP"
while true; do
        case "$1" in
                -n|--note) NOTE='true'; shift;;
                --) shift ; break ;;
                *) help;
        esac
done

if [ x$NOTE == 'x' ]; then
    mailx -s "$1" $RTMADDR < /dev/null > /dev/null
else
    mailx -s "$1" $RTMADDR
fi
{% endhighlight %}

From RTM's example,

{% highlight shell %}
rtm "Test code changes committed by Bart. ^tom @ 9a !1 #Testing #na @Work"
{% endhighlight %}

And use `-n` if you'd like it to ask for a note.
