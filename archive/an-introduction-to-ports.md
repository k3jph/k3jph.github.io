---
id: 955
title: An Introduction to Ports
date: 2014-03-16T00:55:25-04:00
author: James Howard
excerpt: 'This article provides a description of how to create a simple port for the FreeBSD operating system circa 2000.  It was originally published on June 1, 2000 in DaemonNews.'
layout: page
guid: http://www.jameshoward.us/?page_id=955
dsq_thread_id:
  - "2734470003"
---

## The FreeBSD Ports Tree

The FreeBSD Ports Collection offers a simple and convenient method to prepackage software applications for the FreeBSD operating environment. Using a standard format and installation paradigm, the Ports Collection is an easy way for system administrators to install and update over 3200 applications, utilities, and system tools.

These 3200 programs are listed using a special directory tree under ``/usr/ports`` where they are listed by category. Some categories include "databases", "java", "math", and "security". Other categories, such as "chinese", "german", "russian", and "vietnamese", include programs written or modified to handle international users. There are also a number of programming language specific categories for Tcl/Tk, Perl, and Python.

However, the most important feature of the Ports Collection is its ease of use. To install a port, you simply change to the directory the port lives in and type ``make install``. For an example, we will use a system utility called UWATCH. The following commands will install the port:

{% highlight shell %}
cd /usr/ports/sysutils/uwatch
make install
{% endhighlight %}

Since the programs in the Ports Collection are often very large, the program data is not a part of the port. This is where the magic happens. The Ports Collection knows to look on the CD for the source tarball if a CD is in the system. If it cannot find the source code on the CD, it also knows several locations on the Internet where it could be. Therefore, if your system is connected to the Internet, the port's source code will be automatically downloaded as part of the installation process.

The Ports Collection ease of use comes from another solved problem: port interdependency. If a port was written using the Tcl/Tk programming language and you do not have Tcl/Tk installed, the Ports Collection will also download and install the required version of it. This greatly simplifies the way applications are installed and makes even the most complicated software packages easy to work with.

## An Anatomy of a Port

A basic port has a very simple structure. For an example, we'll look at a port called UWATCH. This is considered a system utility, therefore the port information is located in ``/usr/ports/sysutils/uwatch``. The port itself has the following structure:

{% highlight text %}
Makefile
files
files/md5
pkg
pkg/COMMENT
pkg/DESCR
pkg/PLIST
patches
patches/patch-aa
{% endhighlight %}

Each of these files contains information essential to a port. The following is a breakdown of the information contained in each file.

### Makefile*

This is the file read in by the ``make install`` command. It contains the port's name, location, creator, and what other ports it depends on. The ``Makefile`` from UWATCH is very simple:

{% highlight makefile %}
# New ports collection makefile for: uwatch
# Date created: 3 November 1999
# Whom: James Howard <howardjp@wam.umd.edu>

#
# $FreeBSD: ports/sysutils/uwatch/Makefile,v 1.3 2000/04/22 10:13:31 mharo Exp $
{% endhighlight %}

This preamble lists the name of the port, the date it was created, and the creator.
This is meant to be human readable. The information contained between dollar
signs ("``$``") is version control information from CVS and tells the last
time the file was modified and who modified it.

{% highlight makefile %}
PORTNAME=    uwatch
PORTVERSION= 1.0
CATEGORIES=  sysutils
{% endhighlight %}

These two variables set the name of the port and the most recently available
version. The ``CATEGORIES`` variable lists all the possible categories this port
belongs in.

{% highlight makefile %}
MASTER_SITES= ftp://ftp.wam.umd.edu/pub/howardjp/software/uwatch/
              http://www.wam.umd.edu/howardjp/software/uwatch/
              ftp://dragon.ham.muohio.edu/pub/howardjp/software/uwatch/
{% endhighlight %}

This variable lists a number of URLs where the port can be downloaded from if
it is not already on the system.
{% highlight makefile %}
MAINTAINER= howardjp@wam.umd.edu
{% endhighlight %}
This lists the email address of the creator of the port. In this case, my email address is listed.
{% highlight makefile %}
MAN1=          uwatch.1
MANCOMPRESSED= yes
{% endhighlight %}
This is information for the online documentation set, usually called the manpages.
{% highlight makefile %}
.include <bsd.port.mk>
{% endhighlight %}
This is the last line of every port's ``Makefile`` and it instructs make
to call the system-wide Ports ``Makefile`` which does the heavy lifting.

### *files*

This is a directory which contains files needed to build the port. Usually, this directory contains a single file, ``md5``.

### *files/md5*

This file contains an MD5 electronic signature of the port. This is used to verify the integrity of a port before it is built. If the signatures do not match, the build will be stopped.

###  *patches*

This directory holds information on patching the program to run on FreeBSD. Some ports were not developed natively on FreeBSD and those may require some changes before the build. There can be a number of patch files listed all named ``patch-??`` where "``??``" are two letters. The patches are applied in alphabetical order.

### *patches/patch-aa*

This port only has one patch instructing the UWATCH ``Makefile`` where to install the finished program.

### *pkg*

The Ports Collection has a twin known as the Packages Collection. The Packages Collection is a set of pre-made ports which only need to be installed. Almost all packages are built from ports and some data is needed for the packages to be created. This data lives in the ``pkg`` directory.

### *pkg/COMMENT*

This is a one sentence description of the package. In this example, the description is:
{% highlight text %}
Monitor user logins and logouts
{% endhighlight %}

### *pkg/DESCR*

This is a longer description of the package and may be several paragraphs long. Since UWATCH is a simple program, this description is still relatively short.
{% highlight text %}
Uwatch gives notifications when all, or selected users login and logout of
the system. It can also give the time, port, and calling host of the
login.
{% endhighlight %}

### *pkg/PLIST*

This final file lists all the other files installed. In this case, only one
other file is installed, the actual program. This list is used when deleting a package from the system.
{% highlight text %}
bin/uwatch
{% endhighlight %}

Later, if you want to uninstall this port, those files listed in ``pkg/PLIST`` will be removed.

## Using a Port

Now, installing this program is a simple process as shown "above":

The steps listed above will yield this output:
{% highlight shell %}
root@byzantine:# cd /usr/ports/sysutils/uwatch/
root@byzantine:/usr/ports/sysutils/uwatch# make install
>> uwatch-1.0.tar.gz doesn't seem to exist on this system.
>>Attempting to fetch from ftp://ftp.wam.umd.edu/pub/howardjp/software/uwatch/.
Receiving uwatch-1.0.tar.gz (4373 bytes): 100%
4373 bytes transferred in 0.2 seconds (22.73 Kbytes/s)
===> Extracting for uwatch-1.0

>> Checksum OK for uwatch-1.0.tar.gz.
===> Patching for uwatch-1.0
===> Applying FreeBSD patches for uwatch-1.0
===> Configuring for uwatch-1.0
===> Building for uwatch-1.0
Warning: Object directory not changed from original usr/ports/sysutils/uwatch/work/uwatch-1.0
cc -Wall -I/usr/local/usr/include -c uwatch.c
cc -Wall -I/usr/local/usr/include -o uwatch uwatch.o
gzip -cn uwatch.1 > uwatch.1.gz
===> Installing for uwatch-1.0
install -c -s -o root -g wheel -m 555 uwatch /usr/local/bin
install -c -o root -g wheel -m 444 uwatch.1.gz /usr/local/man/man1
===> Generating temporary packing list
===> Registering installation for uwatch-1.0
root@byzantine:/usr/ports/sysutils/uwatch#
{% endhighlight %}

At this point, the application is ready to be run. If we wish to remove the application, we simply run ``make deinstall``.
{% highlight shell %}
root@byzantine:/usr/ports/sysutils/uwatch# make deinstall
===> Deinstalling for uwatch-1.0
root@byzantine:/usr/ports/sysutils/uwatch#
{% endhighlight %}
And the application has been removed.

Using the Ports Collection simplifies the work required to install and maintain third-party applications and greatly reduces the time required by the system administrator to install and configure software. This makes the Ports Collection one of the most attractive reasons to use FreeBSD.
