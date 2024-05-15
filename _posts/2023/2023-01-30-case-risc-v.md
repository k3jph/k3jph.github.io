---
id: case-risc-v
title: The Case for RISC-V
date: 2023-01-30T7:37:07-04:00
author: k3jph
layout: post
permalink: /2023/01/30/case-risc-v
featured_image: /assets/img/news/case-risc-v.webp
categories:
- Blog 
tags:
- RISC-V
- electrical engineering
- standards
- technology policy
---


Computer users have long suffered from a diversity of hardware.
While many different types of computers have been available since
the start of the industry, this has posed a problem for consumers
and businesses buying computer equipment, as software may not
necessarily run on a new system.  This increases the cost of
transitioning and leads to "vendor lock-in," [the phenomenon where
customers are committed to a particular
supplier](https://research.tudelft.nl/en/publications/an-implementation-perspective-on-sources-of-incompatibility-and-s).

Recently, an open systems architecture has emerged in the form of
[RISC-V](https://riscv.org/).  RISC-V is a modern RISC architecture
available in both 32-bit and 64-bit varieties, meeting modern
computer users' needs, as well as the needs of the embedded market.
RISC-V also has a strong pedigree, having been developed in the
same milieu that developed the SPARC architecture.  The architecture
itself is controlled by the RISC-V International organization, with
more than 3100 members across 70 countries.  The architecture is
available for free for anyone to implement and has been fixed by
RISC-V International, along with numerous specialized computing
extensions.  Accordingly, RISC-V presents a unique opportunity for
global standardization on a single, vendor-neutral hardware
architecture, benefiting consumers and businesses.

Following this introduction, this paper will present a very brief
history of different computing architectures demonstrating the
long-standing problem of diversity.  Then this paper will explore
the value of open standards.  This paper will then show how RISC-V,
as an open standard, meets the value proposition.  Then this paper
will provide a conclusion and offer some suggestions for how public
policy can be used to advance the objective of open standards in
the case of processor architecture.

## A Brief History of Computing

Ever since the second computer was built, users have had to contend
with different and incompatible architectures.  Early computers,
like the [Harvard Mark I](https://www.jstor.org/stable/2002294),
the [Zuse
Z3](http://www.ittig.cnr.it/EditoriaServizi/AttivitaEditoriale/InformaticaEDiritto/1979_02_001-033_Zuse.pdf),
[ENIAC](https://www.nature.com/articles/158500a0.pdf), and many
others, were custom-built, often to solve custom problems.  These
systems were often "programmed" by reconfiguring the physical
infrastructure of the system.  Under these early conditions, every
system was just as much an experiment as it was a tool.  Each of
these early machines was also unique.  Software was barely an idea
at the time, so the concept of moving software between independent
systems was not even considered.

It was only a decade later that computer companies were selling
identical copies of systems that could run the same software, at
the same time software was becoming an independent idea.  Companies
like [IBM](https://dl.acm.org/doi/pdf/10.1145/320764.320768),
[RCA](https://dl.acm.org/doi/pdf/10.1145/1457769.1457790), and
[Royal McBee](https://www.youtube.com/watch?v=sB1lRnZVv30) were
selling computers that could share software with other installations,
albeit not with each other.  By 1970, Digital Equipment Corporation
(DEC) were selling computers from its PDP line, including the wildly
popular [PDP-8](https://www.pdp8online.com/) and
[PDP-11](https://history-computer.com/dec-pdp-11-computer/) systems.
Despite the naming, the PDP-8 and PDP-11 systems were not compatible
with each other, though the PDP-8 was binary compatible with the
[PDP-12](https://www.cca.org/tech/rcs/pdp12.html).  As computers
moved to the desktop, DEC continued producing new systems using a
[variety of
architectures](https://dl.acm.org/doi/pdf/10.1145/285930.285934)
and were soon joined by different architectures from [Sun
Microsystems](https://thenewstack.io/sun-microsystems-a-look-back-at-a-tech-company-ahead-of-its-time/),
[Silicon Graphics Inc.
(SGI)](https://www.techspot.com/article/2142-silicon-graphics/),
[Hewlett-Packard](https://techmonitor.ai/technology/a_one_thousand_mips_multi_processor_by_1995_promises_hewlett_packard),
and many other vendors.

As computers entered the consumer market, things were only marginally
better.  In the earliest days of home computing, two architectures
dominated the market, [Intel Corporation's
8080](https://americanhistory.si.edu/collections/search/object/nmah_713498)
and [MOS Technology, Inc.'s
6502](https://spectrum.ieee.org/chip-hall-of-fame-mos-technology-6502-microprocessor).
Derivatives and semi-compatible systems were available for each,
especially [Zilog, Inc.'s
Z80](https://landley.net/history/mirror/cpm/z80.html), which was
an extension of the 8080 platform.  In 1981, IBM released the [IBM
Personal
Computer](https://www.ibm.com/ibm/history/exhibits/pc25/pc25_intro.html),
based on [Intel's 8086 processor
architecture](https://www.geeksforgeeks.org/architecture-of-8086/).  The
8086 is the direct ancestor of modern computers from most vendors
and is the basis for the modern [x86-64
architecture](https://www.seeedstudio.com/blog/2020/02/24/what-is-x86-architecture-and-its-difference-between-x64/),
which maintains a substantial degree of backward compatibility.
Apple, having built their earliest systems on the 6502 architecture,
introduced the Macintosh based on [Motorola, Inc.'s
68000](https://spectrum.ieee.org/chip-hall-of-fame-motorola-mc68000-microprocessor)
architecture in 1984, but switched to the [PowerPC
architecture](https://arstechnica.com/features/2004/08/ppc-1/),
jointly developed by Apple, IBM, and Motorola ten years later.
Apple would switch twice more in 2006 to Intel's x86-64 architecture
and again in 2020 to the ARM architecture, which itself has been
around since the 1980s, and has long dominated the embedded market.

While the history presented here has been simplified out of necessity,
at least a dozen different process architectures have been referred
to either directly or indirectly.  Many others existed in over this
period.  This is important because while architecture can drive
factors like processor speed, capabilities, and memory access
patterns, it often means that different architectures lead to
different instruction sets.  That means software written for one
architecture will not run on another, absent emulation or some sort
of hardware specialization.  This matters for consumers and businesses
alike as it means applications cannot be run and must be replaced
when switching systems.  With only two dominant architectures today,
x86-64 and ARM, this risk is _de minimis_.  However, the steady
advancement of technology is likely to lead to new architectures
or incompatible extensions developing for those native architectures
as time goes on.

## The Value of Open Standards

We start the discussion by first discussing what an open-source
standard is.  [Tiemann addresses this and attempts to
provide](https://www.sciencedirect.com/science/article/pii/S0920548904001515)
a definition and create a four-level standard.  Of most interest
here is the base-level standard:

> The standard is documented and can be completely implemented,
used, and distributed royalty free...Implementations of the standard
may be extended, or offered in subset form. However, certification
organizations may decline to certify subset implementations, and
may require that extensions also satisfy the criteria of an Open
Standard. Anything less than this is not an Open Standard, period.

Higher levels of the standard refer to software interoperability
and may not necessarily apply to RISC-V.  Accepting this as the
base definition, understanding the benefits is critical.  We identify
three key benefits.

The first key benefit is that an open standard is [less likely to
become
obsolete](https://onlinelibrary.wiley.com/doi/pdf/10.1111/j.1467-8659.2004.00003.x).
Many closed systems are replaced for reasons that are less technical
and may be based on business decisions, leading to accusations of
"[planned
obsolescence](https://academic.oup.com/qje/article-abstract/101/4/729/1840176)."
An open standard, without ownership by a single business entity to
benefit from the obsolescence, should only be changed for technical
reasons.  Further, if the standard were developed openly by many
independent contributors, possible needs would be identified earlier,
reducing the need for technological advancement.

The second key benefit is the [lower barrier to entry for market
participants](https://watermark.silverchair.com/itgg.2006.1.3.119.pdf).
Defining interfaces, capabilities, and system mechanics is a
substantial portion of the cost of research and development.  By
leveraging the work of open standards, that portion of the research
and development cost is effectively eliminated.  This gives market
participants the ability to enter with lower capital requirements.
It also lowers the cost of innovation as the open standard can be
embedded as part of a larger new innovation without the expense of
relying on proprietary technology.

The third key benefit is the [assurance of
interoperability](https://d1wqtxts1xzle7.cloudfront.net/94302328/817c113241a341f45d01ea1e5919526a5b00-libre.pdf),
the _raison d'etre_ of this analysis.  This is seen most prominently
in the definition of [TCP/IP, the standards for Internet
communication](/2016/04/14/tcp-and-ip/).  With open standards and
[open implementations of TCP/IP
available](https://klarasystems.com/articles/history-of-freebsd-part-4-bsd-and-tcp-ip/),
TCP/IP has left behind many alternatives used for communication for
the decades.  One of the benefits that occur here is the self-reinforcing
monopoly that [grows from network
benefits](https://ideas.repec.org/a/eee/ecolet/v98y2008i1p9-15.html).  That
is, as more participants use the standard, others rely on the
standard, increasing the number of participants even further.  While
often viewed negatively, this can be seen as an advantage when the
putative monopolist is an independent consortium, and no single
supplier is the monopolist.

## RISC-V as an Open Standard}

With those benefits understood, we now want to understand how they
apply to RISC-V.  First, we must understand that RISC-V meets our
requirements as an open standard.  The definition of RISC-V is
itself documented, including the instruction set architecture,
binary interfaces, and assembly mnemonics.  The documentation is
available freely from the RISC-V International organization.  The
definition does not require any purchase and can be downloaded
without registering.  RISC-V also requires no royalty payments to
implement the standard.  The only restrictions are that implementors
must be a member of the RISC-V International organization if they
wish to use any of the RISC-V International trademarks in their
marketing materials.

The first benefit to consider is the lack of obsolescence.  The
RISC-V standard is provided in two key forms today, a standard for
32-bit computing and a standard for 64-bit computing.  While the
market for alternatives to 32-bit and 64-bit computing exists,
32-bit and 64-bit computing make up essentially all computers in
both business and the home, as well as many embedded applications.
RISC-V meets the primary need here and provides all of the functionality
necessary in both forms.  Further, in a future push toward 96-bit
or 128-bit computing, RISC-V can be extended, and initial work
toward the development of a 128-bit RISC-V standard has begun.
Regardless, even as consumers move toward more powerful computing,
existing 32-bit and 64-bit computing systems will still be used,
and RISC-V meets that requirement.

The second benefit is the lower barrier to entry for market
participants.  This is aptly demonstrated by SiFive, Inc. which has
become a prominent supplier of RISC-V products in the embedded and
[System-on-Chip (SOC)
market](https://www.databridgemarketresearch.com/reports/global-system-on-chip-soc-market).
SiFive has grown into a 2.5 billion dollar corporation in just seven
years, being founded in 2015.  By building on the existing standard,
SiFive has created intellectual property (IP) for implementations
of RISC-V.  In another instance, it is breathing new life into older
businesses. MIPS Technologies, Inc. designed and licensed the MIPS
architecture to numerous companies, including SGI and DEC.  However,
the company has begun designing new processor core IP around the
RISC-V architecture.  This would not have been possible for MIPS
Technologies absent an open standard.

The final benefit we want to consider is interoperability.  Because
the architecture is uniform across vendors, consumers and businesses
purchasing RISC-V equipment can be assured that software that works
on one hardware component will work on another.  In many ways, this
echoes what consumers and businesses encountered in the late 1980s
on with what has been called PC-compatible systems.  Computers from
companies like Dell, Compaq, and others could run the same software.
However, different implementations of the 8086-based architecture
occasionally led to interoperability difficulties.  The RISC-V
standard will limit this by ensuring the core of implementations
meeting the standard are interoperable.

## Conclusion

Together, we can see that adoption of RISC-V provides numerous
benefits to users.  It will also provide benefits to companies
supplying RISC-V-based products.  Due to the benefits and their
relatively rapid accrual, there has already been a substantial move
toward adoption for many use cases.  However, governmental action
can further adoption without favoring any specific technology.
Public policy can be extended to support this development through
governmental activity in the market.

Without requiring any specific action in the private market,
governments can mandate the adoption of products that use open
standards in government projects.  In this regard, it is unnecessary
to name RISC-V as the required standard.  While RISC-V is the only
substantial standard meeting the requirement today, developing other
standards may equally well support the objective of a universal
computing platform.  This is essentially how TCP/IP became a universal
communications protocol, through support from
[DARPA](https://www.darpa.mil/).  We have also seen this pattern
in software adoption as [German governments have mandated specific
requirements](https://ieeexplore.ieee.org/abstract/document/5370467)
and promoted them against closed alternatives.  In addition, like
the TCP/IP example, governments can fund further development of
projects that enable open hardware standards.

RISC-V provides a unique opportunity in the history of computing
to achieve an essentially universal standard for products in business
and the home.  Consumers and businesses will benefit from this as
their equipment becomes interchangeable at the hardware level.  That
said, there are still issues with interoperability as software,
especially operating systems, will not necessarily be uniform.
Regardless, this is a substantial step toward a universal computing
platform.

