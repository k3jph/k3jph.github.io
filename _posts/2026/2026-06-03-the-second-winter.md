---
title: The Second Winter
date: 2026-06-04
author: k3jph
layout: post
permalink: /2026/06/04/the-second-winter/
featured_image: /assets/img/2026/the-second-winter.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - AI history
  - machine learning
  - neural networks
  - expert systems
  - brief history of AI
---

The year is 1987. Symbolics, Inc. is the leading manufacturer of
Lisp machines, single-user workstations purpose-built to run Lisp,
the language most closely associated with artificial intelligence.
Their hardware is beautiful, powerful, and expensive: a fully
configured workstation runs about $110,000. Symbolics even holds a
modest distinction in internet history. On March 15, 1985,
[symbolics.com became the first .com domain ever
registered](https://www.edn.com/1st-com-domain-name-is-registered-march-15-1985/).[^1]

By 1988, Symbolics is in freefall. The Lisp machine market, which
looked like the future of computing in 1984, is evaporating. The
venture capital has gone cold. The research labs that once lined up
for specialized AI hardware are discovering that ordinary workstations
have gotten fast enough to do most of what they need.

This is the second AI winter, compressed into one company's
trajectory: not a failure of intelligence but a failure of timing,
economics, and the oldest mistake in technology forecasting, which
is assuming that what the field needs today will always require
specialized infrastructure.

## The Debt Comes Due

The first winter began to thaw in the late 1970s not because the
field had solved its fundamental problems but because it found a
narrower problem it could actually solve. Expert systems, covered in the
previous episode, demonstrated that you could extract genuine value
from AI by limiting the domain aggressively. MYCIN diagnosed
bacterial infections. DENDRAL identified organic compounds. XCON
configured VAX computer orders. These were not general intelligence.
They were very good rule books, and the field sold them as something
considerably closer to the former.

That gap between what expert systems were and what they were
marketed as created the conditions for the second winter. Through
the early 1980s, the AI industry attracted serious investment and
serious attention. Dedicated AI hardware manufacturers sold
specialized machines at prices only research labs and large
enterprises could afford. Consulting firms built AI divisions. Lisp
got its own chips. Defense dollars flowed. Japan announced a national
initiative.

The promises, as usual, outran the delivery.

## The Fifth Generation

The Fifth Generation Computer Project shows what happens when
bureaucratic ambition meets technical optimism.

In 1982, Japan's Ministry of International Trade and Industry
announced a ten-year national program, funded at several hundred
million dollars and often reported at approximately $500 million,
to build computers capable of reasoning in natural language,
drawing inferences, and processing knowledge the way human experts
do. The Institute for New Generation Computer
Technology, known as ICOT, directed by Kazuhiro Fuchi, would lead
the effort. The goal was not faster computation of the ordinary
kind. The goal was qualitatively different computation: machines
that understood.[^2]

The technical foundation was logic programming, specifically Prolog.
Prolog is a declarative language: you state facts and rules, and
the system derives conclusions. It has genuine elegance, and for
certain classes of problems involving structured reasoning over
explicit knowledge, it works well. The ICOT researchers were not
wrong to find it attractive.

They were wrong in a deeper assumption: that intelligence is
primarily a matter of logical inference over explicit facts. That
assumption, which was also the assumption underlying expert systems,
turned out to be one of the most consequential wrong turns in the
history of the field. Much of human knowledge is not explicit.
It is contextual, embodied, and heavily statistical. You cannot
write down what makes a face recognizable or a sentence grammatical
in a way that a Prolog interpreter can usefully process. The
knowledge acquisition bottleneck that killed expert systems was not
a problem the Fifth Generation project was going to solve with
better hardware. It was a structural critique of the whole approach.

The project ran to its scheduled conclusion in 1992. By technical
measures, it accomplished many stated goals: ICOT researchers
produced novel parallel logic programming systems, published
extensively, and demonstrated inference machines running at speeds
that would have seemed impossible in 1982. By practical measures,
it produced nothing the world outside Japan chose to use. The
parallel Prolog machines sat in laboratories. No mass-market
product emerged from Fifth Generation technology. The reasoning
computers that eventually arrived took a completely different path.

The American response to the announcement was the kind of reaction
that produces bad decisions at speed. [DARPA launched the Strategic
Computing Initiative in 1983](https://warontherocks.com/cautionary-tale-on-ambitious-feats-of-ai-the-strategic-computing-program/),
spending roughly $1 billion over a decade on AI and high-performance
computing research. Some of that funding did useful work. Some of
it funded the same overconfident systems integration that the market
was about to reject. Both programs, American and Japanese and for
all their differences, were organized around the same underlying
assumption: that the hard part of intelligence was symbolic
reasoning, and that with enough engineering talent and national
will, symbolic reasoning could be made to work at scale.

The market's verdict on that assumption is the second winter.

## The Hardware Bet

The Lisp machine market is worth examining on its own terms because
it illustrates a principle about specialized infrastructure that
recurs throughout computing history.

By 1980, the consensus in the AI research community was that
standard hardware was inadequate for serious AI work. Lisp, the
field's primary language, was interpreted rather than compiled,
garbage-collected, dynamically typed, and interactive in ways
that the von Neumann architectures of the era handled badly.
Researchers spent substantial time waiting. The obvious solution
was to build hardware designed specifically for Lisp.

MIT's AI Lab incubated two companies that came to define the
market. Symbolics, spun out in 1980, produced the most
sophisticated Lisp machines available. Lisp Machines Inc. competed
at slightly lower price points. Texas Instruments offered the
Explorer. Xerox had its own Interlisp workstations. At their peak,
these machines represented the state of the art: fast, capable,
running development environments that remain impressive by any
measure.

Then Sun Microsystems started selling workstations.

In 1982, a Symbolics 3600 cost roughly $70,000 to $110,000
depending on configuration. A Sun-1 cost about $10,000. The Sun
was slower for Lisp work. By the mid-1980s, the gap was narrowing.
By 1987, commodity hardware running Franz Lisp or Common Lisp was
competitive with dedicated Lisp machines for many tasks, at a
fraction of the price.[^3]

When the price-performance gap closed, the rationale for
specialized AI hardware evaporated. A research lab could buy ten
Sun workstations for the price of one Symbolics machine. The
Symbolics ran a better development environment. The ten Suns ran
more experiments. The choice was not difficult.

Symbolics never recovered. The company contracted sharply, filed
for Chapter 11 bankruptcy protection in 1993, and its assets and
name were purchased by a new private group in 1995.
LMI collapsed earlier. The Texas Instruments Explorer was
discontinued. The Lisp machine as a product category was gone
by the early 1990s, having briefly flourished at exactly the
wrong moment to sustain itself.

## The Pattern Repeats

There is a pattern this series has been tracking since the episode
on the Dartmouth Conference. A new capability generates excitement.
The excitement attracts promises. The promises attract investment.
The investment funds work that demonstrates real but limited
progress. The gap between demonstrated progress and promised
breakthrough becomes impossible to ignore. Funding contracts. The
field goes into winter.

The second winter followed this pattern faithfully. What made it
different was the scale of what collapsed and the degree to which
the promises had been made in commercial rather than merely
academic terms. The first winter embarrassed researchers and
disappointed government program managers. The second winter
destroyed companies, burned venture capital, and left a generation
of practitioners with reputational damage that took years to
repair.[^4]

The second winter also discredited a specific approach rather than
the field as a whole. The first winter had cast doubt on AI in
general. The second cast doubt on symbolic AI in particular.
Expert systems failed not because they did nothing useful but
because the claims made on their behalf exceeded what they could
deliver, and because their fundamental architecture had hit a
ceiling that more engineering could not raise. Rule-based reasoning over structured knowledge is powerful within
its domain. Its domain turned out to be narrower than advertised.

This is the important distinction. The second winter was not the
field discovering that intelligence was hard. The field already
knew that. The second winter was the field discovering that one
particular approach to intelligence had reached its limit, and
that the limit was not going to move by adding more rules or more
hardware.

Meanwhile, the future was being built somewhere else.

## The Quiet Work

In November 1982, while the expert systems boom was approaching
its peak, John Hopfield published a paper in the Proceedings of
the National Academy of Sciences titled ["Neural networks and
physical systems with emergent collective computational
abilities."](https://www.pnas.org/doi/10.1073/pnas.79.8.2554)[^5]
It is not a paper about AI in any of the usual senses. It is a
paper about physics. Hopfield, trained as a physicist, showed that
networks of simple binary units, connected in specific ways, would
settle into stable states corresponding to stored patterns. The
network had memory. The memory was distributed across the
connections rather than residing in any particular location.

Hopfield networks were not directly useful for most practical AI
tasks of the early 1980s. What they did was reinvigorate a
research tradition that had been largely dormant since Minsky and
Papert's critique of perceptrons in 1969. Connectionist computing
was worth taking seriously again.

Four years later, in October 1986, David Rumelhart, Geoffrey
Hinton, and Ronald Williams published ["Learning representations
by back-propagating errors"](https://www.nature.com/articles/323533a0)
in Nature.[^6] This is one of the most consequential machine
learning papers ever written. Backpropagation is an algorithm for
training multi-layer neural networks by propagating error signals
backward through the network to adjust connection weights. The
mathematics had predecessors: Paul Werbos had described the
technique in his [1974 doctoral dissertation at Harvard](https://www.wiley.com/en-us/The+Roots+of+Backpropagation%3A+From+Ordered+Derivatives+to+Neural+Networks+and+Political+Forecasting-p-9780471598978),
and David Parker had rediscovered it in 1985. But Rumelhart,
Hinton, and Williams put it in front of the cognitive science
community in a form that was clear, principled, and reproducible.
They also demonstrated that it worked.

The timing is worth pausing over. Rumelhart, Hinton, and Williams
published as the expert systems market was still near its peak.
Backpropagation did not immediately displace anything. The neural
network research community was small and unfashionable. Venture
capital was not interested. Nobody at MITI was pivoting the Fifth
Generation project in response to a paper in a science journal.

But the work was being done.

At Bell Labs, Yann LeCun was extending backpropagation-trained
networks to spatial data, eventually building convolutional
networks that could read handwritten digits with high accuracy.
By the 1990s, systems descended from this work were being used
commercially to read handwritten digits on bank checks.[^7] This deployment
does not appear in the AI press because it does not look like AI.
It looks like a bank's infrastructure. But it was neural network
research, applied to a real problem, producing measurable value at
scale. The distinction between "AI" and "software that works" was
already asserting itself, quietly, in the back offices of financial
institutions.

Hinton, meanwhile, continued developing the theoretical
foundations of what would eventually become deep learning. The
Boltzmann machine, developed with Terry Sejnowski in the
mid-1980s, was an early generative model based on stochastic
neural networks. The work was mathematically sophisticated and
computationally demanding in ways that the hardware of the era
could barely support. It did not produce useful applications
during the winter. It produced trained researchers and theoretical
frameworks that would prove essential twenty years later.

## The Sorting Mechanism

One way to understand an AI winter is as a failure. The funding
stopped, the companies collapsed, the researchers dispersed. That
reading is accurate as far as it goes.

Another way to understand it is as a selection event. When money
is available, everything gets funded: the good ideas, the mediocre
ideas, and the ideas that sound plausible in a pitch deck but
cannot survive contact with real data. When money dries up,
researchers have to choose more carefully. The problems they pursue
have to be tractable. The methods they use have to produce results.
The claims they make have to be defensible to skeptical colleagues
rather than credulous investors.

The second winter was hard on the people who lived through it.
Researchers with "artificial intelligence" on their curriculum
vitae rebranded as "machine learning," "statistical inference,"
or "computational statistics," anything that did not carry the
baggage of two failed boom-and-bust cycles. The name had become
toxic. The work continued under other names.[^8]

What survived was substantially different from what had entered the
cold. Symbolic AI did not disappear, but it was no longer the
dominant paradigm. Statistical methods were gaining ground:
decision trees, Bayesian networks, early support vector machine
research. The neural network tradition, marginalized for most of
the 1970s and all of the early 1980s, had a small and serious
research community making real progress on solid mathematical
foundations.

The field that emerged from the second winter would look quite
different from the field that had gone in. The next chapter belongs
to the researchers who stayed, the methods that survived, and the
gradual convergence of statistical learning and connectionist
computing into something powerful enough to transform how the world
processes information. The survivors of the second winter are the
protagonists of that story. The winter sorted them out.

This time, they would not disappear.

[^1]: The second .com registration, on April 24, 1985, went to bbn.com, registered by BBN Technologies, the firm whose engineers had built the original ARPANET routers and whose [Ray Tomlinson](https://time.com/4249407/tomlinson-history-at-symbol/) had given the world the @ symbol in email. Neither organization's core work is as well-remembered as the naming convention they helped populate.

[^2]: The project documents described machines that would perform "inference," "knowledge base management," and "intelligent man-machine interface" as first-class computing primitives. These were not aspirations. They were specifications. The ambition was real, and the engineering talent assembled to pursue it was real. The wrong bet was on the underlying approach.

[^3]: This pattern is not unique to AI. Specialized database machines, graphics workstations, and vector supercomputers all faced the same fate: commodity hardware eventually catches up, and when it does, the economics of scale make the specialized machine impossible to justify. The Lisp machine companies were not unlucky. They were in a race they were always going to lose once commodity hardware crossed a certain threshold.

[^4]: The term "AI winter" reportedly entered circulation around 1984 at a private meeting of researchers who were beginning to see the funding climate tighten. The coinage captures the field's own awareness that a familiar cycle was repeating. The self-awareness did not slow it down.

[^5]: Hopfield, J.J. (1982). Neural networks and physical systems with emergent collective computational abilities. *Proceedings of the National Academy of Sciences*, 79(8), 2554-2558. The paper brought serious physicists into a field that had been dominated by computer scientists and cognitive psychologists. Hopfield networks are now understood as early models of associative memory, and later work has drawn connections between modern Hopfield-style formulations and the attention mechanisms in contemporary neural networks. Hopfield shared the 2024 Nobel Prize in Physics with Geoffrey Hinton for this work and its consequences.

[^6]: Rumelhart, D.E., Hinton, G.E., and Williams, R.J. (1986). Learning representations by back-propagating errors. *Nature*, 323, 533-536. The paper appeared the same year as the two-volume *Parallel Distributed Processing*, edited by Rumelhart and McClelland, which made the full case for connectionist models of cognition. Together, the publications constituted something close to a manifesto for a new research program, arriving at the worst possible moment commercially and the best possible moment intellectually.

[^7]: LeCun, Y., Bottou, L., Bengio, Y., and Haffner, P. (1998). [Gradient-based learning applied to document recognition](https://ieeexplore.ieee.org/document/726791). *Proceedings of the IEEE*, 86(11), 2278-2324. The commercial check-reading application predated this paper, making it one of the earliest large-scale deployments of a deep neural network, even if it was not described in those terms at the time. The field had not yet developed the vocabulary to recognize what it had built.

[^8]: This rebranding was not cynical. It was accurate. "Machine learning" describes what the surviving methods were actually doing more precisely than "artificial intelligence" ever did. The name change was the field acknowledging, in public, what it had learned about itself in private.
