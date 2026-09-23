---
id: the-bottleneck-moved
title: "The Bottleneck Moved"
date: 2026-09-23
author: k3jph
layout: post
permalink: /2026/09/23/the-bottleneck-moved/
featured_image: /assets/img/2026/the-bottleneck-moved.jpg
excerpt: >-
  AI does not eliminate bottlenecks. Once a model becomes capable enough,
  the constraint moves downstream to verification, permissions, workflow,
  and human attention.
credits: >-
  Cover image: [*Conveyor system in a
  factory*](https://commons.wikimedia.org/wiki/File:Conveyor_system_in_a_factory.jpg),
  photo by falco, via Wikimedia Commons.
  [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
  Cropped from the original.
categories:
  - Blog
tags:
  - artificial intelligence
  - AI agents
  - systems engineering
  - operations research
  - AI governance
  - productivity
---

Today, Alibaba announced that it is [developing an artificial intelligence
model with somewhere between five and ten trillion parameters while expanding
its data-center capacity beyond 20 gigawatts by
2032](https://www.reuters.com/business/retail-consumer/alibaba-plans-ai-model-with-5-trillion-10-trillion-parameters-unveils-new-chip-2026-09-22/).
The company also announced a new AI accelerator. The numbers are intentionally
enormous. Five trillion parameters are difficult to picture, 20 gigawatts is
roughly the output of a respectable collection of nuclear reactors, and the
obvious message is that artificial intelligence is still a race to build more
machinery. There is nothing wrong with that. Bigger and better models have
produced extraordinary improvements over the last several years, and more
computation, better training methods, better data, and larger context windows
have made machines capable of things that would have seemed implausible even a
few years ago.

But for a growing number of organizations, model capability is no longer the
important bottleneck. That does not mean models have stopped improving or that
the remaining technical problems are unimportant. It means something rather
more interesting has happened. In a growing number of useful applications, the
model has become capable enough that improving the model further does not
necessarily improve the performance of the larger system around it. The
limiting factor has migrated somewhere else. Artificial intelligence has not
eliminated the bottleneck. It has moved it.

## The Adequacy Threshold

Imagine that you want an artificial intelligence system to read a pile of
documents and produce a summary. A model that succeeds half the time is not
useful. Improving it to 70 percent might make for an interesting demonstration,
but probably not a useful production system. At 90 percent, things become more
interesting. Depending on the consequences of an error, we might be able to
build a workflow around it. If the next generation reaches 92 percent and the
generation after that reaches 94 percent, those improvements are real and, in
some applications, extremely important. But somewhere along the way the nature
of the problem changes. At 50 percent, the model is obviously the problem. At
94 percent, the model may not be the problem at all.

Once the model is reasonably capable, we start asking different questions.
Where did the documents come from? Can the system find all of them? Does it
know which version is authoritative? Does it have permission to read them?
What happens when two documents disagree? Who checks the summary, and how long
does that take? What happens when the model accurately summarizes a draft that
somebody forgot to delete three years ago? These are not model-performance
questions, but they determine whether the resulting system is useful. At some
point we cross what I think of as the **adequacy threshold**, where the model
does not have to be perfect because it has become good enough that something
else limits the performance of the system.

This is a familiar problem outside artificial intelligence. Every production
system has constraints, and improving one component does not necessarily
improve the system as a whole. Make one stage of a factory twice as fast and
you have not necessarily doubled factory output. If the next machine can only
accept material at the old rate, all you have accomplished is creating a
larger pile of unfinished work in front of it. This is the basic idea behind
the [Theory of Constraints, which focuses process improvement on the weakest
link and then repeats the exercise when strengthening that link exposes the
next
constraint](https://asq.org/quality-resources/articles/continuous-improvement-using-theory-of-constraints?id=c1a7b24cf212423ca10c67402cebb11f).

The same thing happens in software and organizational processes. If a process
consists of stages with capacities \(C_1,C_2,\ldots,C_n\), its overall
throughput cannot meaningfully exceed the capacity of its slowest required
stage,

\[
C_{\text{system}} \leq \min(C_1,C_2,\ldots,C_n).
\]

If artificial intelligence increases \(C_2\) tenfold while \(C_3\) remains
unchanged, the system does not become ten times faster. Stage three becomes the
bottleneck. Queueing theory gives us a related result in [Little's Law, which
connects the amount of work sitting in a system with its throughput and the
time each item spends
there](https://ocw.mit.edu/courses/6-02-introduction-to-eecs-ii-digital-communication-systems-fall-2012/40abf69fd6895d82e1e249f68e3eedbd_xa38Q2_pnlQ.pdf).
This sounds obvious when we are talking about a factory conveyor belt, but it
becomes much less obvious when the thing accumulating in front of the next
workstation is intellectual work.

## AI Makes Work

Generative artificial intelligence is usually described as a labor-saving
technology, and it certainly can be, but that description hides an important
feature of what is happening. AI does not merely eliminate work. It also
produces work for other parts of a system. Make computer programming faster
and you produce more code, but that code still has to be reviewed, tested,
integrated, secured, documented, and deployed. The relationship is
sufficiently complicated that [one randomized study of experienced
open-source developers working in their own repositories actually found that
early-2025 AI tools increased completion times by 19
percent](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/),
despite the developers believing the tools had made them faster. That result
applies to a particular group, task distribution, and generation of tools,
rather than software development generally, but it is a useful warning that
faster production by one component does not automatically mean faster
completion of the whole job.

Make research faster and you similarly produce more claims, more references,
more possible answers, and more things that somebody ought to verify. Make
legal drafting faster and the expensive part of producing a contract may cease
to be the initial drafting and become having qualified people determine
whether the resulting document is actually suitable for its intended purpose.
Make intelligence analysis faster and analysts can examine vastly more
material, but somebody still has to decide which findings matter and what
should be done about them. Make it trivial to produce ten plausible
engineering designs and somebody now has to choose among ten plausible
engineering designs. The scarce activity has changed, but scarcity has not
disappeared.

There is a tendency to imagine productivity improvements as though work were
simply disappearing. Sometimes it does. More often, the structure of the work
changes. One activity becomes cheap enough that another activity, previously
buried inside the total cost of the process, suddenly becomes visible. Before
spreadsheets, performing a complicated financial calculation could consume
most of the effort involved in an analysis. Once the arithmetic became
essentially free, constructing the model correctly, choosing assumptions,
interpreting the output, and explaining the result became a larger share of
the work. Artificial intelligence appears to be doing something similar across
a much wider range of intellectual activities. None of this is an argument
against artificial intelligence. Quite the opposite. A useless machine does
not create downstream bottlenecks. A useful one does.

## Enter the Agent

This becomes considerably more important as artificial intelligence moves from
answering questions to performing tasks. OpenAI's enterprise data provides one
indication of this change. As of June 2026, [Codex accounted for 64 percent of
the combined output tokens generated by Codex and ChatGPT among enterprise
customers, while the most intensive organizations generated 8.3 times as many
output tokens per active user as typical
firms](https://openai.com/signals/enterprise-data/). OpenAI interprets this as
part of a shift from asking AI for assistance toward delegating substantive
work to AI systems. These are vendor data, output tokens are an imperfect
proxy for useful work, and OpenAI says as much, but the direction is
interesting.

A chatbot has a convenient boundary. You ask it a question and it gives you an
answer. Whether you believe the answer, ignore it, verify it, or do something
spectacularly ill-advised with it remains largely your problem. An agent
crosses that boundary because it can act. Give an agent access to a filesystem
and it can edit the files. Give it access to email and it can send the
message. Give it access to a database and it can change the database. Give it
credentials to a cloud system and suddenly the distinction between "the AI
said something wrong" and "the AI did something wrong" becomes enormously
important.

At that point, model intelligence is only one component in a much larger
system. The model has to determine what should be done, but the surrounding
machinery has to determine what it is allowed to do, what requires approval,
what must be logged, what can be reversed, and what happens when something
goes wrong. These are not merely hypothetical security concerns. The OWASP
guidance for large language models identifies [excessive functionality,
excessive permissions, and excessive autonomy as distinct ways an otherwise
capable agent can acquire dangerous amounts of
agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/). A
sufficiently capable model may formulate an excellent plan and still operate
inside a terribly designed system. Conversely, a somewhat less capable model
embedded in a constrained, observable, well-designed process may produce much
better organizational results. Benchmark performance tells us something about
the machinery. It does not tell us whether we have built a good system around
it.

## The Governance Gap

Organizations seem to be discovering this somewhat faster than their
governance processes can adapt. Ernst & Young recently surveyed 202 senior AI
executives at organizations with at least $1 billion in annual revenue. Nearly
all reported having formal governance policies, but [47 percent acknowledged
that their organizations had bypassed the AI governance process for an urgent
deployment, while 36 percent reported an AI incident or failure that caused
materially negative
consequences](https://www.ey.com/en_us/newsroom/2026/09/ey-survey-finds-that-autonomous-ai-implementation-outpaces-oversight-yielding-an-ai-governance-gap).
The existence of a policy, in other words, does not necessarily tell us very
much about the behavior of the system when somebody needs something done by
Friday.

There is a temptation to read numbers like these and conclude that
organizations need more AI policy. Perhaps they do, and frameworks such as
NIST's are explicitly intended to [turn broad ideas about trustworthy AI into
risk-management practices that can be operationalized by
organizations](https://www.nist.gov/itl/ai-risk-management-framework). But
"governance" is one of those words that can convert very concrete engineering
problems into PowerPoint slides. If an AI agent can spend money, there should
be a technical limit on how much money it can spend. If it can delete records,
there should probably be records it cannot delete. If it can send an email to
50,000 customers, perhaps somebody should approve that before the SMTP server
begins doing its thing. If the system is performing a reversible action, we
should know how to reverse it. If it is performing an irreversible action,
the threshold for human review should be considerably higher.

These are governance questions, but they are also ordinary systems-engineering
questions. A policy saying that "AI systems shall operate responsibly" does
not constrain a database transaction. Permissions do. Authentication, logging,
approval workflows, rate limits, backups, testing, and access controls do.
Current security guidance increasingly recommends [giving agents dedicated
identities, narrowly scoped permissions, explicit tool access, audit trails,
and approval gates for destructive or high-impact
actions](https://learn.microsoft.com/en-us/security/zero-trust/sfi/least-privilege-for-ai-agents).
The interesting part of AI governance is not writing down that we prefer good
things to bad things. Organizations have been writing that sort of sentence
for a very long time. The interesting part is translating institutional intent
into machinery that behaves accordingly, including when people are hurried,
confused, overconfident, or actively trying to get around the rules.

## Verification Becomes Expensive

There is another bottleneck hiding in this system: verification. For a long
time, generating many kinds of intellectual work was more expensive than
checking it. If I spent two days performing an analysis and handed it to a
colleague, the colleague could probably determine whether I had done something
ridiculous in substantially less than two days. Generative AI changes that
ratio. A machine can now generate pages of plausible analysis in seconds. It
can produce hundreds of lines of code, dozens of references, a legal
memorandum, a market analysis, a mathematical derivation, or a pile of
candidate strategies far faster than a human being can seriously evaluate
them.

This creates an important asymmetry. The time required to generate another
plausible answer has become very small in many applications, while the time
required to establish that the answer is actually correct stubbornly refuses
to do the same. Worse, verification is not one task. We can check that a
source exists, then check that the source says what the model claims it says,
then determine whether the source is authoritative, then search for
contradictory evidence. We can verify a calculation, execute software tests,
reproduce an analysis, or ask whether the answer addresses the problem anybody
actually had in the first place. NIST now treats [testing, evaluation,
verification, and validation as a distinct set of activities needed to assess
AI systems in their actual application and
context](https://www.nist.gov/artificial-intelligence/ai-research/tevv-athlon-framework-evaluating-ai-systems).
A fluent response can be produced almost instantly. Establishing that it
deserves to be trusted may still require expertise and time.

The faster generation becomes, the more verification capacity matters.
Suppose an analyst can personally produce and check two reports per day. Give
that analyst a tool capable of drafting 50 reports and there has certainly
been a productivity improvement in drafting, but the organization has not
acquired the capacity to responsibly issue 50 reports. It has acquired a
queue. If each draft requires even fifteen minutes of competent review, the
verification load alone exceeds a normal working day. We can automate part of
that review, of course, but then the design of the reviewing system matters
too. GitHub recently found this with its own code-review agent: [swapping in
apparently better code-exploration tools initially made reviews more expensive
and less effective, while redesigning the workflow around those tools
eventually reduced average review cost by roughly 20 percent without an
observed loss in
quality](https://github.blog/ai-and-ml/github-copilot/better-tools-made-copilot-code-review-worse-heres-how-we-actually-improved-it/).

That is the same bottleneck problem in miniature. Better machinery does not
automatically produce a better system. It can simply expose a previously
unimportant constraint. Eventually the problem stops being "how quickly can
we create an answer?" and becomes "how cheaply can we establish confidence in
one?" Specialized processes help because they provide constraints. Constraints
reduce the range of possible actions, make evaluation easier, and allow an
organization to decide in advance what the machine should and should not be
permitted to do.

## The Model Is Not the System

We nevertheless have a habit of talking about artificial intelligence as
though the model were the product. Usually it is not. A model receives some
information and produces some other information, but almost everything
consequential happens around that transformation. Where did the input come
from? Who selected it? What information was unavailable? Which tools can the
model use? What happens to the output? Does a person see it, does another
machine see it, or does the system immediately act on it? Can somebody stop
that action? Can somebody reconstruct what happened afterward? These questions
describe the actual system in which the model operates.

This distinction is already embedded in serious approaches to AI evaluation.
The Government Accountability Office's accountability framework calls on
organizations to [catalog and assess both the model and the non-model
components that make up an AI system, and then separately evaluate the
performance of the system as a
whole](https://www.gao.gov/assets/gao-21-519sp.pdf). That is an important
distinction because two organizations can use exactly the same model and build
radically different AI systems. One might allow an employee to ask the model
for advice, read the answer, independently verify it, and then make a
decision. Another might allow the same underlying model to consume incoming
data and automatically deny somebody a loan. Those systems are not equivalent
because they happen to contain the same neural network. The difference is
authority: what information the machine receives, what role its output plays,
what actions follow from it, and how much opportunity remains for human
judgment before consequences occur.

Nor can we reliably evaluate those parts in complete isolation. NIST describes
the AI lifecycle as [a collection of interdependent activities in which
decisions made in one part of the system can change the behavior, risks, and
consequences found somewhere
else](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/). An excellent
model can be fed terrible data. A reliable prediction can be inserted into a
bad decision rule. A sensible recommendation can become dangerous if it is
automatically executed in a context for which it was never intended.
Conversely, a model with known limitations can still be useful when those
limitations are understood and the surrounding process is designed
accordingly. The model matters enormously, but the model is not the system.

This is where the current AI discussion connects to a much older history of
automation. Humans have been handing decisions to machinery for a very long
time. Even an \`if\` statement is a tiny act of delegation. We establish a
condition and specify what should happen when the condition occurs so that no
human being needs to be present when it does. Expert systems allowed those
rules to become more complicated. Statistical machine learning let examples
determine some of the rules. Modern neural networks learn representations that
nobody explicitly specified, while large language models can interpret
instructions and increasingly determine which tools to use in pursuit of a
larger objective.

Modern artificial intelligence enormously expands the range of decisions that
can be delegated because we no longer have to anticipate and explicitly encode
every condition ourselves. That changes the capability of the machinery, but
it does not eliminate the underlying problem of deciding how much authority to
give the machine. In fact, greater capability makes that decision more
important. A calculator with no access to anything cannot do much damage. A
capable agent with credentials, tools, institutional data, and authority can
do exactly what we asked it to do, including when what we asked it to do was a
terrible idea.

## The Next Five Percent

This is why I suspect some of the most important work in artificial
intelligence over the next several years will look strangely boring compared
with building a ten-trillion-parameter model. Identity management, data
provenance, evaluation, observability, permissions, workflow design,
human-machine interfaces, audit trails, error recovery, and organizational
process are not the things that usually produce impressive demonstrations.
Nobody is going to crowd around a stage to watch an extraordinarily
well-designed rollback procedure. Yet these may be precisely the technologies
and practices that determine whether increasingly capable models become
genuinely useful institutional systems rather than extremely impressive
machines surrounded by fragile processes.

Some of the people deploying agents are already arriving at exactly this
conclusion. Microsoft recently described its experience operating an AI
site-reliability agent by arguing that [important controls increasingly belong
in the environment around the model: short-lived credentials, human approval
for state-changing actions, and runtime restrictions that limit what the agent
can actually
do](https://commandline.microsoft.com/azure-sre-agent-restricting-environment-ai-safety/).
This is not as exciting as another model announcement, but it is a sign of a
maturing technology. Once we expect the machine to work, we stop designing
only for the demonstration and start designing for the Tuesday afternoon when
somebody makes a mistake.

There are still plenty of problems that existing models cannot solve reliably,
and continuing research will undoubtedly produce genuinely new capabilities.
The point is not that model development has ceased to matter. It is that model
capability is becoming only one term in a larger equation. Once the model
crosses the adequacy threshold for a particular task, another constraint begins
to dominate. Sometimes that constraint will be data. Sometimes it will be
permissions, verification, human attention, regulation, workflow, trust, or
simply the capacity of the next person in line to deal with all the work the
machine just produced.

For years, the artificial intelligence industry has quite reasonably asked how
to make the model more capable. We are now reaching the point where many
organizations need to ask a different question: what happens after the model
becomes capable enough? That is not primarily a problem in machine
intelligence. It is a problem in systems engineering, economics, governance,
and organizational design. The next important advance in artificial
intelligence may not be another five points on a benchmark or another trillion
parameters. It may be figuring out what to do with the intelligence we already
have.
