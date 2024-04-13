---
id: 2880
title: The BSD Family Tree
date: 2015-09-23T21:51:36-04:00
author: James Howard
layout: page
guid: https://jameshoward.us/?page_id=2880
---

# Introduction

BSD users are often asked, "what are the differences between FreeBSD, NetBSD, and OpenBSD?" To Linux users and those familiar with Solaris or other Unix platforms, the differences may seem quite small. Despite sharing a common ancestry, the BSD family of operating systems provides a number of complete operating systems packages to meet every need.

# Ancient History

During a sabbatical in the mid-1970s, Ken Thompson introduced UNIX to the University of California at Berkeley. By 1978, the students at Berkeley had begun cutting custom Unix releases. Throughout the 1980s, Berkeley handled a Department of Defense contract to incorporate TCP/IP into BSD and produce a standard operating system for Defense Department computers. With the release of the 4.3BSD and Berkeley Networking Release 2 tapes (commonly called, "Net/2"), Berkeley had nearly created a complete operating system free of AT&T code.

William Jolitz began porting BSD to the 386, writing a series of articles in the process for Dr. Dobb's journal. Simply enough, he called his software "386BSD." By 1993, though, Jolitz had decided to halt work on an improved versions of 386BSD. This is the birth of modern BSDs.

# FreeBSD

In 1992 and 1993, Jordan K. Hubbard, Rod Grimes, and Nate Williams had been working on 386BSD and releasing a set of changes known as the "Unofficial 386BSD Patchkit." Maintaining the patchkit had grown cumbersome and a new mechanism was needed. The three authors began working on a new project called "386BSD 0.5" which would contain all of the fixes and function as a real operating system. However, Jolitz removed his official approval of the project in early 1993. David Greenman, then at Walnut Creek, proposed a new operating system based on the patchkit with a new name: "FreeBSD."

Before long, Hubbard had contacted Walnut Creek to prepare a CDROM distribution channel. Walnut Creek went a step further and offered high bandwidth servers and hardware for development. The first CDROM release of FreeBSD was 1.0 in December of 1993. Being forced into upgrading the FreeBSD base from Net/2 to 4.4BSD Lite by the Novell/Berkeley lawsuit, FreeBSD 2.0 was released in November of 1994 and continuous upgrades and enhancements have been made since leaving the latest stable release at FreeBSD 4.2 and an experimental FreeBSD 5.0 operating system. This system includes a 4.4BSD Lite base with additions from NetBSD, OpenBSD, the Free Software Foundation and hundreds of other people and organizations.

According to Hubbard, the goal of the FreeBSD Project is "to provide software that may be used for any purpose and without strings attached." Walnut Creek, the FreeBSD Project's principal distributor, claims that "17 years of development has made it the world's most mature and robust network operating system" (sic). Major clients seem to agree. Yahoo!, the world's most frequented web site, serves up half a billion pages a day using FreeBSD. Even Microsoft's own free email provider, Hotmail, used (until recently) a combination of Windows, Solaris, and FreeBSD to reliably deliver email to over 30 million customers.

Even Walnut Creek themselves got into the act. In May of 1999, they set a daily transfer record of 1.39 terabytes from a single server, running FreeBSD. This record was later surpassed in September of 2000. Then, TeraSolutions, Inc., who acquired Walnut Creek's massive FTP archive after Walnut Creek merged with BSDi, served two terabytes of data to Internet customers using FreeBSD. TeraSolutions's co-founder, David Greenman said of FreeBSD, "We're very pleased to have servers that we built, running the FreeBSD operating system, set new milestones like this. It really shows just how well our large servers can perform in real-world situations using freely available software."

Perhaps what sets FreeBSD apart most is its technical simplicity. The FreeBSD installation program is widely regarded as the simplest Unix installation tool in existence. Further, its third party software system, the Ports Collection, has been modeled by NetBSD and OpenBSD and remains the most powerful application installation tool available. Through simple one-line commands, entire applications are downloaded, integrity checked, built, and installed making system administration amazingly simple.

FreeBSD's development model is similar to both NetBSD and OpenBSD, but radically different from the Linux development manual. Linus Torvalds has been described as a benevolent dictator; the modifications he likes are added. FreeBSD's development model revolves around a group of more than 200 individual programmers called the ``Committers.'' The Committers have the ability to make any change needed to the official FreeBSD source base at any time. The selection of Committers and dispute resolution are handled by the FreeBSD Core Team. The Core Team acts like a board of directors. Starting in October of 2000, the Core Team became an elected body with candidates and voters coming from the Committers. Elections are held every two years.

FreeBSD governance and development model lead to a very stable and easy to use system. As one of the most reliable operating systems for the x86 platform, FreeBSD's mark lies in sustaining an air of simplicity and stability.

# NetBSD

While Jolitz and others were focusing on 386BSD, others were frustrated at the pace of work and began a parallel development effort. Additionally, others at Virginia Tech took the introductory work on 386BSD and the just released Net/2 and started porting BSD to the Macintosh. The development effort soon expanded to the Atari ST, Amiga, and PC platforms. As NetBSD grew, it soon became obvious that FreeBSD's niche would be the i386 and up Intel systems and NetBSD would provide BSD for any other platform desired.

Today, NetBSD's focus lies in providing a stable, multiplatform, research oriented operating system. NetBSD's portability leads it to run on 33 platforms as of January 2001. Even more impressive is the list of hardware including traditional modern server equipment like standard Intel-based PCs, Compaq's Alpha, or Sun Microsystem's SPARC architectures. Older server and workstation class hardware like the Digital Equipment Corporation's VAX hardware, Apple's Macintosh computers based on Motorola's 68000 processor series are also support. But what really sets NetBSD apart is its support for more exotic hardware including Sega's Dreamcast, Cobalt Network's server appliances, and George Scolaro's and Dave Rand's PC532 hobbyist computer.

NetBSD's dedication to portability has led the way for other operating systems. When the FreeBSD group began porting to the Alpha platform, the initial work from the NetBSD project provided the foundation. With new FreeBSD ports to both the PowerPC and SPARC platforms under way, work from NetBSD is being used again. Linux has benefited from NetBSD's experience as well. The special booter used by NetBSD on the 68000-series Macintosh computers was modified and became the Penguin booter used to launch Linux on these systems. Finally, NetBSD's largest contribution to other systems lies in acting as a springboard for the OpenBSD operating system.

The NetBSD Project also wants to present a platform for world-class operating systems research. Because of NetBSD's availability on vintage hardware, schools and research institutions can perform real world research on donated or surplus equipment. Chuck Cranor's UVM memory system was developed to replace NetBSD's Mach-based virtual memory system. The UVM system offers several performance enhancements over the traditional virtual memory system and is now used on almost all platforms supported by NetBSD. Another major project developed on NetBSD is KAME. KAME aims to introduce IPv6, IPsec for both IPv4 and IPv6, and other TCP/IP enhancements to the Unix world. Other projects have chosen NetBSD for usage in aerospace applications and clustered environments.

The NetBSD developers have provided a stable and simple environment which makes it convenient for research and development. But NetBSD is an excellent system in its own right. Coming with a full complement of Unix tools, many sites use NetBSD as DNS or other network servers, especially due to its wide-open hardware requirements. NetBSD is in such wide use, Wasabi Systems was founded simply to provide support for NetBSD users. Wasabi also sells NetBSD CDs and related advocacy tools.

NetBSD's omnipresence on computer equipment is a testament to a well-designed and well-organized operating system. By leading the industry in portability, NetBSD has paved the way for Darwin, MacOS X, Linux, as well as FreeBSD and OpenBSD. It has also given birth to new technology through systems research.

# OpenBSD

In the early 1990s, Theo de Raadt had been responsible for the SPARC port of NetBSD as well as sundry other pieces of the NetBSD system. However, after a disagreement between Theo and the NetBSD core team concerning the direction of NetBSD's development, Theo struck out on his own and founded OpenBSD.

OpenBSD diverged from NetBSD around the release of NetBSD 1.1 in November of 1995. OpenBSD's first release came a year later when OpenBSD 2.0 was released in October of 1996. OpenBSD quickly began focusing on producing the most secure operating system available. Taking advantage of his Canadian residency, de Raadt realized he was not hampered by United States munitions export laws, allowing inclusion of strong cryptography including RSA, Blowfish, and other advanced algorithms. A modified version of the Blowfish algorithm is now in use for encrypting user passwords by default. OpenBSD developers also spear-headed the development of OpenSSH, a multiplatform clone of the wildly popular protocol for secure communications.

OpenBSD also advanced the state of code auditing. Beginning in 1996, the OpenBSD team began a line-by-line analysis of the entire operating system searching for security holes and potential bugs. Unix systems have been plagued for decades by the use of fixed-sized buffers. Besides being inconvenient for the programmer, they have lead to numerous security holes like the fingerd exploit in 4.2BSD. Other security holes relating to mishandling temporary files are easily caught. OpenBSD's ground breaking audit has also discovered security-related bugs in related operating systems including FreeBSD, NetBSD, and mainstream System V derivatives. However, the nature of this process allows general coding mistakes not relating to security to be caught and corrected, as well. Additionally, a number of bugs in Ports, or third party applications have been discovered through this process.

OpenBSD's mantra of "secure-by-default" has produced one of the most robust operating systems available. OpenBSD claims three years without a remote root-exploit allowing many system administrators to sleep better at night. Most of this security came from the ongoing code-audit, but a number of smarter defaults have also helped. For instance, OpenBSD does not leave open network ports in the default installation. If, and only if, a site needs access to finger, lpd, or other protocols should they be turned on. As a rule, they should be left off and the OpenBSD installation reflects that mind set. If a new remote exploit were discovered in the NFS software, the site would not be vulnerable unless NFS were actually needed and used.

OpenBSD is also a highly portable operating system. This is mainly the influence of its NetBSD lineage. While it runs stably and well on only a small fraction of the systems supported by NetBSD, it is still usable on over half a dozen architectures, including the ubiquitous Intel-based PC platform, Motorola 68k-based Macintoshes, and some VME boards.

# Apple's MacOS X and Darwin

After leaving Apple Computer in the 1980s, Steve Jobs founded a new computer company, with a new mind set: NeXT.[^spelling]NeXT's operating system, NeXTStep, was an object-oriented operating system based on Carnegie-Mellon's Mach microkernel architecture, which was in turn based on the 4.2BSD release from the University of California. On top of Mach, NeXT implemented a Unix-like operating system called NeXTStep and replaced MIT's X Windows System with a new graphical interface called Display Postscript. Display Postscript allowed for very fine control of the desktop and graphical environment, however it never caught on outside of NeXT systems.

NeXT eventually quit making hardware and implemented NeXTStep for other operating systems, changing the name to OpenStep. In 1997, after nearly ten years of separation, Apple and NeXT merged giving birth to the new Apple. Apple promised the new operating system would incorporate features and design aspects from NeXTStep. Throughout MacOS versions 8 and 9, minor changes reflecting the new NeXT-based heritage started appearing on the desktop. Apple promised the real goods would lie in MacOS X.

MacOS X is a new operating system which has used code from many sources. The base is an updated version of Mach from CMU. On top of it is a microkernel-based BSD system similar to the one used in NeXTStep. All around, features from previous versions of MacOS have been incorporated to maintain compatibility with legacy applications. The Unix-land user utilities were derived from FreeBSD and NetBSD. Additionally, new interfaces, such as Aqua allow a new generation of programs to be created on this operating system.

Apple also gave back to the community. By open sourcing the base operating system, nicknamed Darwin, Apple has given developers a chance to learn the new system long before its scheduled release date. Apple has also allowed developers to make changes as they saw fit. Accordingly, it is possible to build and run Darwin on Intel-based computers instead of only on Apple's proprietary Macintosh hardware.

MacOS X's greatest triumph will be in bringing BSD and Unix to the mass market. Apple computer has long held a niche among the least computer-literate in the marketplace. Presenting the user with an overwhelming and complicated system would seem like the worst possible solution. Apple's care and time spent ensuring compatibility with existing applications promises no current users will be left behind. The effort spent developing a friendly Apple interface for BSD ensures existing users will understand and follow the new system paradigm with minimal effort.

# A BSD for Everyone

Indeed, there are a wide range of BSD versions. As we have seen, each implementation focuses on a specific market but still borrows concepts and idea from their brethren. The results have lead to a family of operating systems designed for every need imaginable.

There is a high-powered version targeting the most demanding Internet applications. There is a version which through portability and simplicity has offered researchers an inexpensive solution to many problems and salvaged thousands of older system which were otherwise unusable. There is a version to protect and defend even the most important data in today's hostile world. And the newest member of the family will provide access to Unix and BSD to the mass market.

Often decried, BSD's fragmentation has only helped it and its users in the quest for the most stable, portable, secure, or usable operating system available.

[^spelling]: There are many different capitalizations used for NeXT and their operating system NeXTStep, even in NeXT's documentation. The forms here seem to be the most common.
