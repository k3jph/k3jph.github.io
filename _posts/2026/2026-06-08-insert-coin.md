---
id: insert-coin
title: "INSERT COIN"
date: 2026-06-08
author: k3jph
layout: post
permalink: /2026/06/08/insert-coin/
featured_image: /assets/img/2026/insert-coin.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - economics
  - AI governance
  - physics
  - infrastructure
---

Organizations are discovering that AI token pricing produces exactly the
kind of behavioral distortions that metered communications produced a
generation ago. Uber Technologies [burned through its entire 2026 AI
budget by April](https://www.theinformation.com/newsletters/applied-ai/uber-cto-shows-claude-code-can-blow-ai-budgets),
driven by Claude Code adoption that jumped from 32 to 84 percent of
its engineering organization, with heavy users running up monthly API
costs between $500 and $2,000 per engineer; the company's CTO told
The Information they were "back to the drawing board" on budgeting.
[Microsoft's Experiences and Devices division](https://www.theverge.com/tech/930447/microsoft-claude-code-discontinued-notepad)
is winding down most of its Claude Code usage before the end of June,
with financial considerations cited as a primary driver alongside
toolchain strategy. One company reportedly accumulated a
[$500 million AI bill in a single month](https://techcrunch.com/2026/06/05/the-token-bill-comes-due-inside-the-industry-scramble-to-manage-ais-runaway-costs/)
after failing to set usage limits. The Linux Foundation has announced its intent to launch the
[Tokenomics Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-intent-to-launch-the-tokenomics-foundation-to-establish-open-standards-for-ai-cost-management),
a new standards effort aimed at establishing open standards for AI cost
management.

The paradox is simple: per-token
prices have actually fallen. Token prices dropped roughly 80 to 90
percent over the past two years. Total bills rose anyway, because
agentic workflows consume far more tokens per task than earlier uses
did. A single moderately complex agent loop can consume hundreds of
thousands of tokens before returning a result. [Gartner predicts](https://www.gartner.com/en/newsroom/press-releases/2026-03-25-gartner-predicts-that-by-2030-performing-inference-on-an-llm-with-1-trillion-parameters-will-cost-genai-providers-over-90-percent-less-than-in-2025)
that by 2030, inference on a one-trillion-parameter model will cost
providers more than 90 percent less than in 2025. Gartner also notes
that falling token costs will not fully pass through to enterprise
customers, because agentic workflows demand significantly more tokens
per task than earlier uses did.

Teams are responding the way [AOL](https://www.goodreads.com/notes/39731977-how-the-internet-happened/15560373-elliot-chalom) subscribers responded in 1993.
They are watching the counter. They are batching interactions to reduce
token consumption. They are making discrete cost calculations about
whether a given prompt is worth running. The behavioral signature of
metered technology is unmistakable, and it is shaping how AI gets used
in ways that have nothing to do with the underlying value of the
technology.[^metered]

This is not a stable state. The question is where the transition leads,
and the answer depends on physics as much as economics.

## We Have Been Here Before

We have been here before. Long-distance telephone calls were metered
by the minute, then cellular airtime, then text messages, then internet
bandwidth itself. Each arrived expensive and tightly measured; each
eventually became effectively unlimited or flat-rate. The pattern feels
inevitable in retrospect.

But that communications story leaves out an older and more directly
relevant history. Before online services metered your connect time,
mainframe operators metered your compute time. Businesses in the 1960s
and 1970s paid for CPU cycles, memory, and I/O through time-sharing
services like [Tymshare](https://www.computerhistory.org/revolution/mainframe-computers/7/181) and [GE Information Services](https://www.computinghistory.org.uk/det/6553/GE-Time-Sharing-Service/). They bought access
to computation by the unit, not by the month. The business model looked
a great deal like today's AI token pricing.

Mainframe time-sharing did not commoditize to flat-rate. It was
disrupted. The personal computer made centralized time-sharing obsolete
before it could follow the communications path. The meter did not come
off; the metered product ceased to exist. That is the less comfortable
historical analogy for AI token pricing, and it belongs in the analysis
alongside the cheerful communications story.

## The Thermodynamic Floor

Every physical process has a [thermodynamic floor](https://www.feynmanlectures.caltech.edu/I_44.html): a lower bound on
energy consumption that engineering can approach but never eliminate.
In computation, [Landauer's principle](https://doi.org/10.1147/rd.53.0183) captures this precisely: it
establishes the minimum heat dissipation required to erase a bit of
information, a limit [experimentally verified](https://arxiv.org/abs/1411.6730) and now well established.
The floor varies by many orders of magnitude across different processes,
and where it sits determines everything about how a technology prices
its output over time.

For transmitting a bit of information through a fiber optic cable, the
thermodynamic floor is nearly negligible. The energy cost per bit is
tiny relative to the fixed cost of infrastructure. Once the cable is in
place, the marginal cost of one more byte becomes economically
invisible. At the consumer layer, metering became less attractive not
because anyone got generous but because the marginal cost of
transmission fell well below the administrative cost of measuring it.

Electricity is the counterexample. [We still meter electricity](https://www.eia.gov/energyexplained/electricity/measuring-electricity.php) because
the thermodynamic floor is the product itself. When you run the
dishwasher, you are not transmitting information about energy; you are
consuming energy. The floor cannot be engineered away, because you are
selling the floor. Metering persists because the underlying physics
requires it.

Cloud compute has been sitting between these two cases for nearly two
decades without resolving. [Amazon Web Services](https://aws.amazon.com/about-aws/) has been in the market
since 2006, has faced intense competition for over a decade, and still
bills by the compute unit. The thermodynamic floor for running a server
is real and non-trivial, as anyone who has [attempted to mine Bitcoin on
AWS](https://michael-ludvig.medium.com/mining-bitcoin-and-other-crypto-on-aws-eb172940059f) will confirm: the electricity cost exceeds the mining revenue, which
means the marginal cost of cloud compute is not negligible. General cloud computing has not broadly followed the consumer
communications path toward flat-rate pricing.

AI inference runs on that infrastructure. It inherits the cloud compute
floor before adding its own inference costs on top.

Current inference runs many orders of magnitude above Landauer's
limit.[^landauer] The headroom is vast in principle. Whether hardware
and architectural improvements can close that distance is what the
pricing question ultimately depends on. Transformer-based architectures
have known efficiency constraints, and the appetite for longer context
windows and deeper reasoning keeps pushing per-task costs upward even
as per-token costs fall. The physics permits a much more efficient
future; it does not guarantee one.

## The Netflix Model

There is another escape hatch: hide the meter from the user.

Netflix runs its backend almost entirely on AWS, paying per compute unit
for storage, databases, and application logic. It charges consumers a
flat monthly subscription. The metering does not disappear; it gets
absorbed into the product margin and becomes invisible to the end user.
Netflix also built [Open Connect](https://about.netflix.com/en/news/announcing-the-netflix-open-connect-network), its own
global content delivery network, specifically to reduce dependence on
metered third-party infrastructure. Vertical integration as cost
containment.

This two-layer structure, metered infrastructure underneath and
subscription product on top, is already appearing in AI. Consumer-facing
products from the major AI providers charge flat monthly rates. The
per-token anxiety that shapes API usage is largely invisible to
subscribers who use those products every day. The decoupling has already
begun at the consumer layer. What has not decoupled is the developer and
enterprise tier, where organizations are still making discrete cost
calculations about individual interactions.

## Three Scenarios

Three scenarios follow from this analysis, each with different
governance implications.

In the first scenario, inference costs follow the communications
trajectory. Marginal cost falls far enough that it becomes economically
invisible against fixed infrastructure, and flat-rate pricing takes over
at all layers. Token anxiety disappears even at the API level. At that point, the
policy problem is access: who reaches AI services, the same way
broadband equity became the central internet policy question.
Known policy tools apply.

In the second scenario, inference costs stabilize at the cloud compute
level: real and non-trivial, but low and predictable. The consumer layer
stays on subscription pricing; the developer tier migrates from
per-token to aggregate billing. The friction of thinking about
individual inferences disappears, but the meter does not. Governance
looks like a hybrid of utility regulation and access policy.

In the third scenario, the current generation of AI infrastructure gets
disrupted before it commoditizes, the way mainframe time-sharing was
disrupted. Local inference, models small enough to run on consumer
hardware without cloud dependency, renders the per-token cloud model
obsolete rather than affordable. The governance questions shift
entirely: hardware access, local compute policy, and a much more
decentralized AI landscape.

All three scenarios are improvements over the current model, in which
individuals and organizations make discrete cost calculations about
individual interactions. That kind of transactional friction shapes
behavior in ways that have nothing to do with the value of the
interaction. It favors short prompts over thorough ones, discourages
iteration, and creates artificial scarcity in a technology whose value
proposition depends on fluency and depth of use.

The Prodigy subscribers who batched their messages to save minutes were
not behaving irrationally. They were rational actors under early-stage
cost constraints. The constraint shaped their behavior; removing it
changed their behavior. The same dynamic is already visible at the
consumer layer of AI, where flat-rate subscribers use the technology
differently than developers watching a token counter.

The physics will settle which scenario arrives at the infrastructure
layer. We do not know the answer yet. What we can say with confidence is
that the current per-token model is a way station, not a destination,
and governance frameworks built on the assumption that it is permanent
are going to need revision.

[^metered]: AOL charged $9.95 per month for five hours of access in
    the early 1990s, with additional hours at $2.95 each. Prodigy's
    pricing history was more complicated: its core service launched
    largely flat-rate at $12.95 per month, but premium "Plus" sections
    were metered by time. BBS services were often constrained by time
    limits or usage charges. The specific mechanism varied, but the
    behavioral response was the same across all of them: users learned
    to treat online time as a scarce resource to be managed carefully.
    Pricing creates habits; removing the pricing does not immediately
    remove the habits.

[^landauer]: The gap between Landauer's limit and current practice is
    not small. We are running inference many orders of magnitude above
    the theoretical minimum energy per operation. This is both an
    argument for optimism about future efficiency gains and a reminder
    that "theoretical headroom exists" and "we will reach it" are two
    very different claims.
