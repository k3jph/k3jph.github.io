---
id: recovering-a-lost-admin-password
title: Recovering a Lost Admin Password on NES and FastTrack Server
author: k3jph
layout: page
permalink: /archive/recovering-a-lost-admin-password/
categories:
  - Blog
tags:
  - Information technology
  - password recovery
  - Netscape Enterprise Server
  - cryptography
  - system administration
---

I recently inherited a Windows NT server running Netscape Enterprise Server — but there was a problem: the long list of passwords I was given did not include the `admin` password for Enterprise Server. (The user who logs in to the administration server for Enterprise Server with the user name `admin` is given full control over all of Enterprise Server's settings.) After trying several of the other passwords on the list with no success, I became determined to find a way in. In this article I will describe the solution I found (which also works for recovering an admin password on Netscape FastTrack Server) and then explain why it worked, in case you ever find yourself in a similar predicament.

Note that the technique I describe here will not allow just anyone to figure out what the `admin` password is: since you need to change the `admin` password as part of this process, it will work only if you already have administrative permissions on the Windows NT system. In my case, I logged in to the local Windows NT system as `Administrator`.

## The Solution

With the help of a friend who knew something about such things, I found the file named:

{% highlight text %}
C:\Netscape\Suite Spot\admin-serv\config\admpw
{% endhighlight %}

which pairs user names with encrypted passwords. I opened this file in Notepad and saw the following line in it:

{% highlight text %}
admin:JpTkjP7IX2ZWA
{% endhighlight %}

Next, I went to `http://localhost:3054` and was able to log in as `admin` with the password `netscape`.

## Why It Worked

By default on Windows NT systems, Netscape Enterprise Server and Netscape FastTrack Server both store administration information in the directory `server-root/admin-serv/config`. On my system (and again, by default) `server-root` is:

{% highlight text %}
C:\Netscape\Suite Spot\
{% endhighlight %}

User name and password information is stored in the file `admpw` in that directory. The format of each entry in this file is basically `u:p`, where `u` is the user name and `p` is the encrypted password.

For example, on a new installation of Netscape Enterprise Server 3.6, where the `admin` password is set to `netscape`, `admpw` consists of this line:

{% highlight text %}
admin:{SHA}aluWfd0LYY9ImsJb3h2afrI4Xk=
{% endhighlight %}

This password entry varies slightly from the basic `u:p` format; here, the password is prefaced with `{SHA}`, which signals that the password has been encrypted with the Secure Hash Algorithm. A hash algorithm is a one-way function that produces a digital "fingerprint" for the data being hashed (one-way in that it should be impossible to find the data that matches a specific hash value except by exhaustive search). RSA's MD5 is another such algorithm.

When it became obvious that this was the way passwords were stored, it seemed logical that using a standard Unix password (which is DES-encrypted) would be the answer to my problem. Replacing the unknown encrypted password with a known encrypted password enabled me to log in to the administration server for Enterprise Server.

**Note:** This technique can also be used with Netscape Enterprise Server 4.0. A beta release handled administration information exactly like Netscape Enterprise Server 3.6 except for one detail: the default location of the password information is:

{% highlight text %}
C:\Netscape Server4\https-admserv\config\admpw
{% endhighlight %}

## Generating Encrypted Passwords

I wrote a simple program called `pwcrypt` to generate encrypted passwords, to make it unnecessary to log in to a Unix system to track down a lost `admin` password. This program uses the DES hash algorithm to encrypt a given password, as described above. The output of this program can be dropped directly into `admpw`.

Listing 1 shows `pwcrypt`. You can also [download it directly](/service/columbia-association/pwcrypt.c).

### Listing 1

{% highlight c %}
#include <pwd.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

/* Prompt displayed if no password given */
#define PWPROMPT   "Password: "

/* Default encryption salt */
#define SALT       "xx"

void help();

char *__progname;

int main(int argc, char **argv) {
   char *salt = SALT;
   int ch, i;

   while ((ch = getopt(argc, argv, "s:")) != EOF)
      switch (ch) {
         case 's':
            salt = optarg;
            break;
         default:
            help();
      }
   argc -= optind;
   argv += optind;

   if (argc == 0)
      printf("%s", crypt(getpass(PWPROMPT), salt));
   else
      for (i = 0; i < argc; i++)
         printf("%s", crypt(argv[i], salt));
   return 0;
}

void help() {
   fprintf(stderr, "%s: %s [-s salt] [password ...]", __progname, __progname);
   exit(1);
}
{% endhighlight %}

`pwcrypt` supports an option (`-s xx`) to set the "salt" used by the C function `crypt()`. The salt consists of two characters appended to the plain-text password. These two characters combine to form a 12-bit number whose purpose is to perturb the output of `crypt()`, making it more difficult for someone trying to break into a system to do dictionary searches against encrypted passwords. The salt appears again as the first two characters of the encrypted password. The default salt provided by `pwcrypt` is `xx`.

You can compile `pwcrypt` under Solaris 2.6 and Digital Unix 4.0 with the following command:

{% highlight sh %}
cc -o pwcrypt pwcrypt.c
{% endhighlight %}

Under FreeBSD 3.2, `pwcrypt` must be compiled with this command:

{% highlight sh %}
cc -o pwcrypt pwcrypt.c -lcrypt
{% endhighlight %}

After compiling the program, you can simply pass it the password you want to encrypt:

{% highlight sh %}
./pwcrypt password
{% endhighlight %}

Or, if someone might be looking over your shoulder, invoke `pwcrypt` without a password and it will prompt for one.

Below is a sample session (with typed input shown in bold) to generate an encrypted netscape password. We know the salt used is `Yi` because earlier it appeared as the first two letters of the encrypted password, so we set the salt to `Yi`.

{% highlight sh %}
$ ./pwcrypt -s Yi netscape
YigNs8zY3WzuY
$ ./pwcrypt -s Yi
Password:
YigNs8zY3WzuY
{% endhighlight %}

In the second invocation, `pwcrypt` prompts for the password because we did not supply one on the command line.

## Final Words of Wisdom

You should change your password again after this procedure, to enable the server to generate a new encrypted password in its preferred format.

Armed with this knowledge and with `pwcrypt`, you should not feel a need to press the Panic button if your admin password ever gets lost.

## Further Resources

- [Managing Netscape Servers](http://developer.iplanet.com/docs/manuals/enterprise/mngserv/index.htm)
- *UNIX Programmer's Manual (Seventh Edition, Volume 2B)*, pp. 243–249, "Password Security: A Case History." You can download this manual from Lucent's web site in [PDF](http://plan9.bell-labs.com/7thEdMan/v7vol2b.pdf) or [PostScript](http://plan9.bell-labs.com/7thEdMan/v7vol2b.ps.gz).
- [Data Encryption Standard (DES)](http://www.itl.nist.gov/fipspubs/fip46-2.htm), FIPS 46-2
- [Secure Hash Standard](http://www.itl.nist.gov/fipspubs/fip180-1.htm), FIPS 180-1

_Many thanks to Michelle Wyner and Caroline Rose for their assistance in writing this article._

> Howard, James. “Recovering a Lost Admin Password on NES and FastTrack Server.” *View Source*, August 15, 1999.  
> [http://developer.netscape.com/viewsource/index_frame.html?content=howard_lostpwd/howard_lostpwd.html](http://developer.netscape.com/viewsource/index_frame.html?content=howard_lostpwd/howard_lostpwd.html)
