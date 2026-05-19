---
title: "The Rule-Based Interregnum"
date: 2026-05-20
author: k3jph
layout: post
permalink: /2026/05/20/the-rule-based-interregnum/
featured_image: /assets/img/2026/the-rule-based-interregnum.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - history of computing
  - expert systems
  - MYCIN
  - knowledge engineering
---

The first AI winter did not kill artificial intelligence. It redirected it.
The researchers who survived the funding cuts of the early 1970s did not
abandon the project of building intelligent machines. They narrowed it.
Instead of asking how to build a system with general intelligence, they asked
a more tractable question: could a machine be built that knew everything a
human expert knew about a specific domain, and could apply that knowledge
reliably to solve problems in that domain?

The answer, it turned out, was yes. With conditions.

The expert systems era, running roughly from the mid-1970s through the late
1980s, was the most commercially successful period in the history of artificial
intelligence up to that point. It produced systems that genuinely worked,
deployed in factories and corporate data centers, tested seriously in medical
settings, solving real problems and saving real money. It also produced a set
of failures so instructive that they reshaped the field's understanding of what
intelligence actually requires. The lesson of the expert systems era is not
that the approach was wrong. It is that the approach revealed something about
the nature of knowledge that no one had quite articulated before: much of what
experts know, they cannot tell you.

## The Architecture of Expertise

The theoretical foundation of expert systems came from Edward Feigenbaum at
Stanford, who had been thinking since the early 1960s about how to represent
human knowledge in computational form. His central insight was that the
knowledge a domain expert brings to a problem could be decomposed into two
components: facts about the domain, and rules for reasoning about those facts.

This decomposition suggested an architecture. A knowledge base would contain
the facts and rules. An inference engine would apply the rules to the facts to
reach conclusions. The knowledge engineer, a new profession that the expert
systems era called into existence, would interview domain experts, extract
their knowledge, and encode it into the knowledge base. The system would then
be able to replicate the expert's reasoning on new problems, consistently and
without fatigue, at whatever scale was required.

The first major demonstration of this architecture was
[DENDRAL](https://exhibits.stanford.edu/feigenbaum/catalog/dendral), begun
at Stanford in 1965 by Feigenbaum and Joshua Lederberg. DENDRAL's task was to
identify the molecular structure of unknown organic compounds from mass
spectrometry data, a problem that required the kind of specialized chemical
knowledge that took years to acquire. DENDRAL performed at the level of an
expert chemist. It was not simulating expertise. It was, within its narrow
domain, exhibiting it.

DENDRAL proved the concept. What followed proved the concept could scale.

## MYCIN and the Question of Lives

The most consequential expert system of the era, and the one that demonstrated
most clearly both the power and the limits of the approach, was
[MYCIN](https://exhibits.stanford.edu/feigenbaum/catalog/mycin), developed at
Stanford between 1972 and 1980 by Edward Shortliffe as part of his doctoral
work. MYCIN diagnosed bacterial infections of the blood and recommended
antibiotic treatments. Its domain was narrow, its knowledge base contained
several hundred production rules, and its performance was, by any reasonable
measure, remarkable.

In a 1979 evaluation study, MYCIN's treatment recommendations were judged by
a panel of infectious disease specialists to be acceptable in 65 percent of
cases. The corresponding acceptability ratings for the regimens prescribed by
the five faculty specialists on the same panel ranged from 42.5 percent to
62.5 percent.[^mycin-eval] That does not mean MYCIN had solved medical
judgment. It does mean that, in a narrow blinded evaluation, a rule-based
system performed at a level comparable to expert clinicians on the problem it
had been designed to address.

MYCIN was never deployed clinically, for reasons that had nothing to do with
its technical performance and everything to do with the legal and ethical
frameworks surrounding medical decision-making, which were not prepared for
the question of liability when a machine's recommendation led to a bad outcome.
That question remains unresolved today and has become considerably more
complicated since MYCIN first raised it.[^mycin-liability]

But MYCIN's influence on the field was enormous regardless of its clinical
deployment. It demonstrated that expert systems could perform at expert level
on genuinely difficult problems. It popularized certainty factors, an
influential early method for representing uncertainty in rule-based reasoning.
And it established the template that the commercial expert systems industry
would follow for the next decade.

## The Commercial Era

The commercial potential of expert systems became undeniable in the early 1980s,
when Digital Equipment Corporation deployed
[XCON](https://www.sciencedirect.com/science/article/pii/0004370282900249)
(also known as R1) to configure orders for its VAX computer systems. VAX
configurations were genuinely complex: a single order might involve hundreds
of components that had to be matched correctly to work together, and errors
in configuration were expensive to fix after the fact. XCON contained
approximately 2,500 rules and could configure a VAX system in a fraction of
the time a human engineer required, with a lower error rate.

By the mid-1980s, DEC was claiming tens of millions of dollars in annual
savings from XCON and related configuration systems. It was the clearest
possible demonstration that expert systems were not laboratory curiosities.
They were industrial tools with measurable economic value, and the corporate
world noticed.

The expert systems industry that emerged in the 1980s was substantial.
Dedicated hardware, the LISP machines built by companies like Symbolics and
Lisp Machines Inc., was developed to run expert systems efficiently. Dedicated
software environments, shells that provided the inference engine and knowledge
base infrastructure so that knowledge engineers could focus on encoding domain
knowledge, proliferated. Companies built internal expert systems for everything
from credit approval to equipment diagnosis to tax preparation. By the
mid-1980s, corporate spending on AI, driven heavily by expert systems and their
supporting tools, was commonly estimated at more than $1 billion annually.

It was, by any measure, a boom. And like most booms in the history of artificial
intelligence, it contained within it the seeds of its own correction.

## The Knowledge Acquisition Bottleneck

The central problem of the expert systems era had a name that captured it
precisely: the knowledge acquisition bottleneck. Building an expert system
required extracting knowledge from human experts and encoding it as explicit
rules. This turned out to be considerably harder than it sounded.

The first difficulty was that experts often could not articulate their
reasoning. A master diagnostician could look at a set of symptoms and reach
a conclusion faster than they could explain how they reached it. The knowledge
was real. It was also, in a significant portion of its most valuable parts,
tacit: embodied in pattern recognition and intuition that had been built up
through years of practice and that resisted translation into explicit if-then
statements. When a knowledge engineer asked an expert to explain their
reasoning, the explanation was often a post-hoc rationalization of a
conclusion reached through processes the expert could not directly observe
in themselves.

The second difficulty was that knowledge was not static. Domains evolved.
New research produced new facts. Best practices changed. Every change to the
knowledge base required a knowledge engineer to go back to the experts, extract
the updated knowledge, and encode it again. The maintenance cost of a large
expert system was substantial and ongoing, and it scaled with the complexity
of the domain rather than with the size of the system's user base.

The third difficulty was brittleness. Expert systems performed well within
the boundaries of their knowledge bases and failed badly outside them. A system
that diagnosed bacterial infections could not recognize that a patient's
presenting symptoms fell outside its domain of competence. It would apply its
rules to whatever inputs it received and produce an output, with no mechanism
for signaling that it was operating beyond its reliable range. A human expert
in the same situation would recognize unfamiliar territory and say so. The
system could not.

These three difficulties combined to produce a characteristic failure mode:
expert systems worked well in controlled evaluations and stable deployment
settings, degraded as their knowledge bases became outdated, and failed
unpredictably when they encountered situations their designers had not
anticipated. The failures were not random. They were structurally predictable
from the architecture. But they were not predicted, because the early successes
had generated the same pattern of optimism that the Dartmouth summer had
generated thirty years before.

## What Knowledge Actually Is

The knowledge acquisition bottleneck was not an engineering problem. It was a
philosophical one, and recognizing it as such was one of the most important
things the expert systems era contributed to the field's self-understanding.

The philosopher Michael Polanyi had argued in his 1958 book
[*Personal Knowledge*](https://press.uchicago.edu/ucp/books/book/chicago/P/bo5944816.html)
that human knowledge has two components: explicit knowledge, which can be
articulated and transmitted, and tacit knowledge, which is embedded in practice
and cannot be fully expressed in words. In his later *The Tacit Dimension*
(1966), he gave this the formulation that has followed the idea ever since: we
know more than we can tell. The expert systems era demonstrated this at scale
and in concrete engineering terms. The knowledge that made experts valuable
was, in large part, precisely the knowledge that resisted encoding.

This was not a problem that could be solved by interviewing experts more
carefully or developing better knowledge engineering methodologies. It was
a problem with the fundamental assumption that intelligence could be
decomposed into explicit facts and rules. Human expertise is not a knowledge
base with an inference engine. It is something considerably more complex,
contextual, and embodied than that architecture can represent.

The field would eventually find a different approach: instead of encoding
what experts know, build systems that learn from what experts do. The
statistical learning tradition and the neural network revival that gained
force after the expert systems boom were both, in different ways, answers to
the knowledge acquisition bottleneck. You cannot extract tacit knowledge by
asking for it. You can, it turns out, extract it by watching enough examples
of it being applied.

## Cyc and the Limits of Brute Force

No account of the expert systems era would be complete without at least
acknowledging the most ambitious response to the knowledge acquisition
bottleneck ever attempted. In 1984, Douglas Lenat began a project at MCC
(Microelectronics and Computer Technology Corporation) called
[Cyc](https://cyc.com), with the explicit goal of solving the common sense
knowledge problem by encoding all of it.

The reasoning was straightforward: if expert systems failed because they lacked
the background common sense knowledge that human experts bring to every
problem, then build a system that has that background knowledge. All of it.
Every fact a person knows about the world. Every rule of thumb, every
commonsense inference, every piece of the vast implicit background that humans
use to navigate daily life. Encode it explicitly. Millions of assertions,
rules, and commonsense relationships, eventually perhaps tens of millions
of them.

Cyc is still running. It has been running for over forty years. It has never
become the general commonsense reasoning substrate Lenat hoped it would
become, for the precise reason the expert systems era had already revealed:
common sense is not a finite list of facts. It is a dynamic, contextual,
embodied capacity that was never learned as propositions and cannot be
recovered as propositions. Cyc is the reductio ad absurdum of the symbolic
approach, pursued with extraordinary commitment and intellectual seriousness
by people who were not wrong about the problem and not wrong about its
importance. They were wrong about whether explicit encoding could solve it.[^cyc]

## What the Interregnum Produced

It would be a mistake to read the expert systems era as simply a failed
detour. The systems that were built worked, within their limits, and the limits
were instructive in ways that shaped everything that followed.

The knowledge acquisition bottleneck redirected research toward learning rather
than encoding. The brittleness of rule-based systems made the robustness of
statistical approaches look more attractive. The commercial success of the
1980s, however brief, demonstrated that AI could produce economically valuable
results, which kept institutional interest alive through the second winter that
followed.

And the expert systems tradition did not disappear. It evolved. Modern
clinical decision support systems are descendants of MYCIN. Business rules
engines that power credit decisions, fraud detection, and regulatory compliance
are descendants of XCON. The symbolic AI tradition that the expert systems era
represented did not win the argument about the best path to general
intelligence. It won a great many arguments about the best path to specific,
deployable, auditable decision-making in high-stakes domains, and it is still
winning those arguments today.

The interregnum was not a pause in the history of artificial intelligence.
It was a period of practical engagement with the hard problem of knowledge
that produced tools still in use, failures still worth studying, and an
understanding of what intelligence requires that the field had not possessed
before. The road continued. It just turned out to be longer, and more
interesting, than anyone had expected.

---

[^mycin-eval]: Victor L. Yu et al., "Antimicrobial Selection by a Computer:
    A Blinded Evaluation by Infectious Diseases Experts," *JAMA* 242, no. 12
    (1979): 1279-1282.

[^mycin-liability]: The liability question that prevented MYCIN's clinical
    deployment has never been satisfactorily resolved and has become the
    central regulatory challenge of AI in medicine. When an algorithm
    recommends a treatment that harms a patient, who is responsible: the
    developer, the hospital, the physician who followed the recommendation,
    or the physician who didn't? The FDA has been working on this question
    for decades. The answers remain unsatisfying. MYCIN raised it first.

[^cyc]: Lenat died in 2023, still working on Cyc. His obituaries were
    respectful, and rightly so. He spent his life on a real problem, even
    if the approach he championed never delivered the general solution he
    hoped for. The problem remains. These two things can both be true.
