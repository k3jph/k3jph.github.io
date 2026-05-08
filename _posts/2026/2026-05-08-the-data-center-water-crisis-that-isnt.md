---
id: the-data-center-water-crisis-that-isnt
title: "The Data Center Water Crisis That Isn't"
date: 2026-05-08
author: k3jph
layout: post
permalink: /2026/05/08/the-data-center-water-crisis-that-isnt/
featured_image: /assets/img/2026/the-data-center-water-crisis-that-isnt.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - environment
  - data centers
  - water
  - public policy
  - energy
  - hydrology
---

Someone on the internet is wrong, and it is apparently my job to
fix it.

In this case, the someone is nearly everyone who has written about
AI and water consumption over the past two years. The claim, which
has achieved the status of received wisdom, is that AI data centers
are drinking us dry. A [widely-cited study from UC
Riverside](https://news.ucr.edu/articles/2023/04/28/ai-programs-consume-large-volumes-scarce-water)
produced the headline figure that generating a 100-word email with
ChatGPT consumes roughly 519 milliliters of water, about one
standard water bottle. The Washington Post ran with it. Fortune
[ran with it](https://fortune.com/article/how-much-water-does-ai-use/).
Dozens of breathless articles followed, describing data centers as
"vampires" with a "voracious, inhuman appetite" for freshwater.
The [Lincoln Institute of Land
Policy](https://www.lincolninst.edu/publications/land-lines-magazine/articles/land-water-impacts-data-centers/)
compared them to Dracula, which is a choice.

The [Bloomberg
analysis](https://www.bloomberg.com/graphics/2025-ai-impacts-data-centers-water-data/)
that followed was more careful, noting that data centers using
evaporative cooling evaporate roughly 80 percent of the water they
draw and discharge the remaining 20 percent back to wastewater
treatment. This framing was intended to be alarming. It is
alarming, if you do not think carefully about what evaporation
actually means in a hydrological system. If you do think carefully
about it, the picture becomes considerably more complicated,
and the policy implications change substantially.

The concern is not entirely wrong. There are real and specific
places where data center water use is a genuine problem, and those
situations deserve serious attention. But the framing that has
dominated the coverage, AI is consuming our water supply,
gets the underlying physics wrong in a way that leads to the wrong
policy conclusions. Let me explain what is actually happening.

## What Data Centers Do With Water

Data centers generate enormous amounts of heat. Servers running
at full capacity produce heat that, left unchecked, would destroy
the equipment. Cooling is not optional. The question is how you
do it.

The dominant method for large-scale data center cooling is
evaporative cooling, sometimes called swamp cooling. Warm air is
drawn through wet pads or cooling towers. Water evaporates,
carrying heat away from the facility. The cooled air goes back
over the servers. This is the same basic physics as sweating. It
works, it is cheap, and it has been the standard approach for
industrial heat management for over a century. Steam-generating
power plants, steel mills, and petrochemical refineries have used
evaporative cooling at scale for decades. We did not describe any
of them as "drinking" water.

Here is the critical point that almost every alarming headline
gets wrong: most of the water does not disappear. It undergoes a
phase change.

Evaporation converts liquid water to water vapor. That vapor
enters the local atmosphere, participates in the regional water
cycle, and eventually returns as precipitation somewhere in the
watershed. Globally, the water cycle is a closed system,
water is neither created nor destroyed. At the local and regional
scale, however, the story is considerably more complicated, and
that is where the genuine environmental questions live.

## The UC Riverside Number Is Being Misread

Before getting into the hydrology, it is worth correcting the
viral number itself, because it is wrong by a considerable margin.

The UC Riverside study that produced the 519-milliliter-per-email
figure is legitimate research. Shaolei Ren and his colleagues
were doing serious work on a real question. But the number that
went viral is not what the paper actually says. The study
estimated 500 milliliters per 20 to 50 queries, not per query,
and not per 100-word email. That works out to somewhere between
10 and 25 milliliters per query. Not a water bottle. About a
tablespoon or two. And that figure was for GPT-3, running on
Microsoft Azure data centers in 2022, using evaporative cooling
systems that have since been significantly upgraded.

[Sam Altman stated in February
2026](https://fortune.com/2026/02/24/sam-altman-open-ai-electricity-usage-water-usage-data-centers-ceo-tech/)
that a typical ChatGPT query uses approximately 0.3 milliliters
of water. Independent analysts working through the same
methodology with current hardware have landed around 5 milliliters
as a realistic figure. Even at the high end, we are talking about
a teaspoon, not a water bottle. The viral claim is off by
somewhere between 100 and 1,700 times, depending on which version
you encountered.

None of that means data centers have a negligible water footprint
in aggregate. They do not. But the individual-level framing,
your email is costing the planet a bottle of water, is wrong
on the numbers and wrong on the framing simultaneously.

## Consumptive Use and Why It Actually Matters

Here is where the hydrology gets important, and where most of the
coverage goes wrong in a more fundamental way than just the
numbers.

Water resource management distinguishes between water withdrawal
and consumptive use. Withdrawal is the total volume of water
removed from a source. Consumptive use is the portion of that
withdrawal that does not return to the local watershed. The
difference matters enormously for understanding actual
environmental impact.

Irrigation agriculture is highly consumptive. Water applied to
crops is taken up by plants, transpired through leaves, and
exported as agricultural products or lost to evapotranspiration.
Relatively little returns to the local aquifer or stream. That
is why irrigated agriculture accounts for roughly [70 percent of
global freshwater
withdrawals](https://www.fao.org/3/CA7148EN/CA7148EN.pdf) and
an even higher share of consumptive use.

Thermoelectric power plants withdraw enormous quantities of water
for cooling, the [US Energy Information Administration
estimates](https://www.eia.gov/todayinenergy/detail.php?id=50358)
that thermoelectric generation accounted for roughly 40 percent
of all US freshwater withdrawals before the shift to air-cooled
facilities, but most of that water is returned to the source,
warmer than it left. The consumptive use fraction is much smaller
than the withdrawal figure suggests.

Data centers using evaporative cooling sit somewhere between these
cases. The 80 percent that evaporates is, at the local scale,
consumptive, it leaves the immediate watershed as water vapor
rather than returning to the stream or aquifer from which it came.
The 20 percent discharged to wastewater treatment stays local and
re-enters the regional system after treatment. So evaporative
cooling data centers have a real consumptive use fraction, higher
than a once-through cooled power plant, lower than irrigated
agriculture.

Whether that consumptive use is a problem depends entirely on
where the data center is.

## The Watershed Question

No water system is perfectly closed, but some are effectively
closed in ways that matter enormously for resource management.

The [Great Lakes basin](https://www.glc.org/work/great-lakes-compact)
is the clearest example in North America. The basin contains
roughly 21 percent of the world's surface freshwater. Water
withdrawn from Lake Michigan for industrial cooling, evaporated,
and carried by prevailing winds still largely falls as
precipitation within the basin. The Great Lakes Compact of 2008
manages diversions and consumptive use precisely because the
basin functions as an effectively closed system, water that
stays within it cycles back through the lakes, rivers, and
groundwater. A data center in Chicago or Milwaukee drawing from
Lake Michigan for cooling is operating within a water budget that
is, for practical purposes, self-replenishing at regional scale.

Contrast this with a data center in the Phoenix metropolitan
area drawing from the [Salt River Project](https://www.srpnet.com/)
or from [Central Arizona Project
deliveries](https://www.cap-az.com/) of Colorado River water.
The Colorado River basin is not an effectively closed system for
practical purposes, it is a system under severe structural
deficit, where more water is allocated than flows. [Lake Mead and
Lake Powell have fallen from roughly 90 percent capacity in 2000
to around 30 percent
today](https://www.consumerreports.org/data-centers/ai-data-centers-impact-on-electric-bills-water-and-more-a1040338678/).
Water evaporated from a Phoenix data center does not return to
the Colorado system in any meaningful timeframe. It joins
atmospheric circulation patterns that carry it east and north,
eventually falling as precipitation over the Great Plains or the
Gulf Coast. For the Colorado basin, that water is gone.

[Bloomberg's
analysis](https://www.bloomberg.com/graphics/2025-ai-impacts-data-centers-water-data/)
found that roughly two-thirds of data centers built since 2022
are located in areas already experiencing water stress. That is
not a coincidence. Data centers follow cheap land, cheap power,
and favorable regulatory environments. Water stress has
historically been a secondary consideration because water, unlike
electricity, has been priced far below its actual scarcity value
in most American markets. That pricing failure is the root cause
of the problem, not AI per se.

## The Thermal Problem Nobody Is Talking About

There is a water-related environmental concern with data centers
that deserves more attention than it receives, and it is not the
one dominating the coverage. It is not about consumption at all.
It is about thermodynamics.

When evaporative cooling handles 80 percent of a data center's
heat rejection, the remaining 20 percent has to go somewhere.
In facilities that discharge to municipal wastewater systems,
the thermal load is largely attenuated through the treatment
process, residence time in tanks and lagoons, biological
treatment, and volume dilution all work to moderate temperature
before the treated effluent reaches a surface water body. That
pathway, while worth monitoring, is not where the acute
ecological concern lives.

The concern lives in direct discharge situations. Large data
centers, like large power plants, sometimes have sufficient
scale and appropriate siting to hold their own National
Pollutant Discharge Elimination System permits and discharge
cooling water directly to a river, bay, or estuary. When that
happens, the thermal load goes straight to the receiving
ecosystem without attenuation. Elevated water temperatures
reduce dissolved oxygen, alter the metabolic rates of
cold-blooded aquatic organisms, disrupt spawning cycles, and
in extreme cases can cause direct thermal mortality in fish
populations. This is not a theoretical concern. It is a
documented phenomenon with a half-century of regulatory history
behind it.

We have been managing exactly this problem at nuclear and
thermoelectric power plants since the 1970s, and the regulatory
framework for doing so is well developed, well tested, and
sitting right there waiting to be applied to data centers.

[Calvert Cliffs Nuclear Power
Plant](https://www.nrc.gov/info-finder/reactors/calc.html),
operating on the western shore of the Chesapeake Bay in Lusby,
Maryland, draws cooling water directly from the Bay and
discharges it directly back to the Bay. The water is clean,
it is not radioactive, it has not contacted the reactor core,
it has simply passed through heat exchangers that transfer
thermal energy from the reactor cooling system to the Bay
water. But it comes out warmer than it went in, and the
Chesapeake Bay is one of the most ecologically sensitive and
publicly monitored estuaries in North America. This has been
managed successfully for fifty years through a combination of
NRC licensing conditions and EPA permits under [Clean Water Act
Section
316](https://www.epa.gov/npdes/thermal-discharges-and-section-316-clean-water-act).
Anyone who wants to understand what successful thermal discharge
regulation looks like can drive to Lusby and look at it.

[Peach Bottom Atomic Power
Station](https://www.nrc.gov/info-finder/reactors/pb.html) on
the Susquehanna River in York County, Pennsylvania operates
under the same framework. The Susquehanna is the largest
tributary to the Chesapeake Bay by volume, and its thermal
regime matters to the Bay's ecology downstream. Peach Bottom
has been drawing from and discharging to the Susquehanna since
1974 under permits that specify allowable thermal increments,
monitoring requirements, and conditions under which discharge
must be curtailed to protect aquatic life. The framework works.
The science supports it. The river and the Bay continue to
function.

Section 316 of the Clean Water Act provides two distinct
regulatory tools. Section 316(a) governs thermal discharge
standards, allowing site-specific alternatives to
technology-based effluent limits where the discharger can
demonstrate through biological studies that the proposed
discharge will not impair the designated uses of the receiving
water body. Section 316(b) governs intake structures,
requiring that the location, design, construction, and capacity
of cooling water intake structures reflect the best technology
available for minimizing adverse environmental impact,
specifically protecting aquatic organisms from impingement on
intake screens and entrainment through the cooling system.

Both provisions are directly applicable to large data centers
with direct surface water discharge. Neither is being
consistently applied to them. This is not because the law
does not reach data centers, it does, through the general
NPDES permit framework, but because the regulatory
attention and the permit conditions that power plants have
operated under for decades have not followed data centers into
their new role as major industrial water users.

The irony of the current coverage is almost elegant. Millions
of words have been written about whether AI is consuming our
water supply through evaporation, which is the portion of
data center water use that participates in the water cycle and
returns to the watershed, however redistributed. Almost
nothing has been written about the thermal load in the
discharge fraction, which is the portion that actually poses
a documented ecological risk in direct discharge situations
and which already has a mature regulatory framework that is
simply not being applied. We are arguing about the wrong
number and ignoring the right one.

This is not an argument for halting data center construction.
It is an argument for applying the same environmental analysis
to data centers that we have applied for fifty years to
nuclear and thermoelectric power plants. The science is
settled. The regulatory tools exist. The Chesapeake Bay and
the Susquehanna River have been successfully managed under
exactly this framework within living memory. There is no
reason data centers should be exempt from it.

## The Right Policy Questions

The coverage of AI and water has been asking the wrong question.
"How much water does AI use?" is less important than "where is
that water coming from, and what happens to it?"

A data center in a water-stressed basin using evaporative cooling
and drawing from public water supplies is a genuine environmental
problem. It is competing with municipal and agricultural users
for a shrinking resource, and the consumptive fraction of its
withdrawal is leaving the local system permanently at the scale
of decades.

A data center in a water-abundant, effectively closed watershed
using appropriate cooling technologies is a much more manageable
situation. The water it uses cycles back through the regional
system. The thermal load on its discharge can be managed through
existing regulatory frameworks.

A data center anywhere that is using direct liquid cooling,
circulating coolant through chips rather than evaporating water
into the atmosphere, has a dramatically smaller water footprint
than evaporative cooling regardless of location. [Microsoft has
committed to zero water cooling for its next-generation data
centers](https://news.microsoft.com/source/features/sustainability/how-microsoft-aims-to-be-carbon-negative-by-2030/).
This technology exists and is being deployed. The question is
whether market forces and regulatory requirements will accelerate
its adoption or allow cheap evaporative cooling to continue
dominating in places where it should not.

Three policy tools would actually help.  Water impact assessments should be
required as part of data center siting approval in water-stressed basins, with
the same rigor applied to consumptive use analysis that irrigated agriculture
projects face. Thermal discharge permits under Clean Water Act Section 316
should apply to data center discharge streams, not just power plant cooling
water. Water pricing that reflects actual scarcity value, rather than the
subsidized rates that currently prevail in many western markets, would change
siting economics without requiring prescriptive technology mandates.

None of these require treating AI as uniquely dangerous. They
require treating data centers as the industrial water users they
are, subject to the same frameworks that govern other large-scale
industrial water use. The regulatory tools already exist. The
question is whether we apply them.

## The Actual State of Affairs

AI data centers are not drinking us dry. The viral framing is
wrong on the numbers, wrong on the physics, and leads to policy
conclusions that are too broad to be useful.

The genuine concern is narrower and more actionable: evaporative
cooling is the wrong technology in water-stressed basins, siting
decisions are being made without adequate attention to local
hydrological budgets, thermal discharge from data center cooling
water is underregulated, and water pricing fails to signal
scarcity in the markets where scarcity is most acute.

These are solvable problems with known solutions. They do not
require stopping the buildout of AI infrastructure. They require
applying the same environmental analysis to data centers that we
apply to power plants, steel mills, and irrigated agriculture,
industries that withdrew and returned far more water than AI data
centers do today, and learned, over decades, to do it better.

The water cycle is not broken. In some places, we are asking it
to do more than local conditions support. That is a real problem.
It is also a much more tractable one than "AI is thirsty" suggests.

