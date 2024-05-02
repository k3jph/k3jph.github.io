---
id: the-energy-cost-of-ai-ml-iceland-to-the-rescue
title: The Energy Cost of AI/ML, Iceland to the Rescue
date: 2024-05-01
author: k3jph
layout: post
permalink: /2024/05/01/the-energy-cost-of-ai-ml-iceland-to-the-rescue
featured_image: /assets/img/2024/the-energy-cost-of-ai-ml-iceland-to-the-rescue.jpg
categories:
- Blog 
tags:
- artificial intelligence
- machine learning
- Iceland
- energy economics
- environmental science
---

In the rapidly evolving landscape of artificial intelligence (AI)
and machine learning (ML), the computational demands for training
sophisticated models have surged, paralleling the exponential growth
in model complexity. This escalation signifies advancement in AI
capabilities and highlights the burgeoning challenge of substantial
energy consumption and its ensuing environmental impact. Amidst
growing concerns over climate change and sustainability, the industry
must reconcile technological innovation with ecological stewardship.

This paper explores the energy demands of AI and ML models, emphasizing
the significant variance in energy requirements across different
model types. This paper delineates the scale of energy use and its
implications from modest models that run efficiently on standard
laptops to the colossal energy appetite of the GPT family and other
large language models (LLMs). Further, it investigates the paradigm
of training versus operation energy costs, underscoring the
environmental challenges posed by the one-time, intensive energy
use of model training.

Highlighting the intersection of technology and sustainability, the
paper presents a case study around Iceland. With its abundant
renewable energy resources, Iceland is a beacon of sustainability,
offering a pragmatic solution to the industry's energy dilemma. By
tapping into Iceland's utilization of geothermal and hydroelectric
power for AI/ML data centers, this discussion not only showcases
the potential for renewable energy in mitigating the carbon footprint
of AI development but also sets the stage for a broader conversation
on global sustainability practices.

## Energy Demand of AI and ML Models

AI and ML models demand considerable computational power for training,
a requirement that has grown exponentially with the introduction
of LLMs. The energy needs vary significantly across different types
of AI/ML models. For instance, training a modest model with fewer
than 1,000 parameters on a standard laptop within a single charge
cycle is feasible, reflecting an energy consumption at most typical
high-load computer use. However, the energy requirements escalate
dramatically for larger models.

For example, models belonging to the GPT family are more demanding.
GPT-2 alone incorporates [1.7 billion
parameters](https://www.wired.com/story/openai-ceo-sam-altman-the-age-of-giant-ai-models-is-already-over/),
necessitating far greater computational power and energy consumption.
The scale of model complexity and energy demand has continued to
expand exponentially.

GPT-4, [purported to contain over 1 trillion
parameters](https://www.semafor.com/article/03/24/2023/the-secret-history-of-elon-musk-sam-altman-and-openai),
exemplifies this trend with its [training costs surpassing 100,000,000
USD](https://www.wired.com/story/openai-ceo-sam-altman-the-age-of-giant-ai-models-is-already-over/).
Though specifics are sparse, such training was likely conducted in
a cloud computing environment. This approach minimizes maintenance
costs and, theoretically, reduces the compute time cost to nearly
that of the energy price. Under this assumption, the energy required
to train GPT-4 approximates the monthly energy consumption of a
major city like Houston, illustrating the profound energy implications
of training cutting-edge AI/ML models.

However, we must understand the difference between training and
operations. Training should be a one-time event, and while operations
take advantage of that result over a long period, operations do not
require the same kind of computing resources. Many models can operate
in size, weight, and power (SWaP)-constrained environments, and
even an LLM like GPT-2 can be run on a consumer-grade laptop. From
an accounting perspective, we consider the training effort capitalizable
and amortizable over the model's life. This does not work from an
environmental perspective as the one-time cost of training leads
to a sizeable past release of carbon through energy consumption.
That is not amortizable in the same way.

Furthermore, the comparative energy consumption between AI/ML models
and other computational tasks reveals a staggering disparity. For
example, the training of a single large-scale AI model can consume
as much energy as several thousand homes do in a year. This discrepancy
highlights the need for more energy-efficient computing techniques
in the field of AI.

The energy sources powering these computational feats also play a
critical role in the overall carbon footprint. Data centers relying
on non-renewable energy sources significantly exacerbate the
environmental impact of training large AI models. Conversely, the
shift towards renewable energy sources in powering these data centers
presents a viable path towards reducing the carbon footprint
associated with AI development.

Over time, notable efforts have been made to improve the energy
efficiency of AI/ML training processes. Innovations in algorithm
design, hardware optimization, and software frameworks have contributed
to reductions in energy consumption per model parameter. However,
the pace of model size expansion often needs to improve on these
efficiency gains, posing ongoing challenges to sustainability
efforts.

The global impact of AI's energy demand calls for concerted policy
action. Different regions may face unique challenges regarding their
energy infrastructure's capacity to support sustainable AI development.
Policies that incentivize the use of renewable energy sources in
data centers, alongside regulations that encourage energy-efficient
model design, could play pivotal roles in mitigating the environmental
impact of AI.

Lastly, the advent of cloud computing has introduced challenges and
opportunities in the context of AI's energy consumption. While cloud
environments offer the potential for more efficient resource
utilization and access to renewable energy sources, they also
centralize the energy demand of AI/ML training, necessitating careful
consideration of their environmental impact. Cloud providers are
increasingly aware of this responsibility, with many committing to
sustainability goals to reduce their operations' carbon footprint.

While the energy demand of AI/ML models presents significant
environmental challenges, a combination of technological innovation,
policy intervention, and the responsible use of cloud computing
resources can contribute to more sustainable practices in AI
development.

## In From the Cold, a Solution in Iceland

Thanks to its robust geothermal and hydroelectric power infrastructure,
Iceland is an exemplary model for powering data centers with renewable
energy. This island nation harnesses its volcanic activity to produce
geothermal energy. It capitalizes on its river systems for hydroelectric
power, providing a stable and sustainable energy supply that is [85
percent
renewable](https://www.econjournals.com/index.php/ijeep/article/view/9047).
These attributes make Iceland an attractive location for data
centers, particularly for operations requiring intensive computational
resources, like the training of AI/ML models.

Integrating renewable energy into high-demand computing environments,
such as those needed for AI/ML training, involves several technical
and infrastructural considerations. In Iceland, the challenge of
round-trip time (RTT) to other global networks is mitigated because
AI/ML model training is localized. Training nodes need to communicate
with each other efficiently, a requirement that can be satisfied
within Iceland's data centers. The deployment of trained models,
which requires less intensive computational resources, can be
strategically located closer to end-users worldwide, optimizing
performance without compromising sustainability.

Although less numerous than in larger countries, Iceland's data
centers, such as those operated by [Verne Global](https://verneglobal.com/)
and [Advania](https://www.advania.com/), are prime examples of
leveraging renewable energy for computing operations. These facilities
specialize in high-performance computing tasks, including AI/ML
model training, and are powered entirely by Iceland's renewable
energy resources.

Verne Global, for instance, operates a data center campus in Iceland
that is [powered by geothermal and hydroelectric
power](https://digital-library.theiet.org/content/journals/10.1049/et.2023.0116).
This setup provides a sustainable and cost-effective solution for
energy-intensive computations. The company has attracted clients
from various sectors, including AI/ML research institutions, looking
to reduce their carbon footprint while accessing the computational
power necessary for advanced model training.

A secondary advantage to locating in Iceland is the generally cooler
climate, which requires less active cooling of heat-generating data
centers. Advania Data Centers offer another example, with facilities
that utilize Iceland's renewable energy and take advantage of the
country's cool climate for natural cooling, [further reducing the
energy needed for temperature
management](https://culturemachine.net/vol-18-the-nature-of-data-centers/resurrection-from-bunkers/).
Advania is taking this further with locating new data centers coming
to cold-weather climates in Finland.

Beyond the direct benefits of utilizing renewable energy, Iceland's
approach offers broader lessons for the industry. In addition to
providing cheap renewable energy, [Iceland also provides a well-educated
populace](https://www.tandfonline.com/doi/full/10.1080/00313831.2017.1357144)
that is [well-versed in
English](https://www.jstor.org/stable/j.ctv18pgjb2.19). Further,
Iceland has a well-developed economy with a highly computer-literate
population. Therefore, while there may be some physical barriers
to making Iceland an AI/ML training hub, [the social barriers to
entry are
lowered](https://www.idunn.no/doi/10.18261/issn.1891-943x-2017-01-02-01).

## Conclusion

The energy landscape of AI and ML models reveals a critical crossroads
for the industry. As models grow in complexity and capability, so
does their energy consumption, posing new environmental challenges.
However, exploring renewable energy-powered data centers in Iceland
offers a glimpse into a sustainable path forward. Iceland's success
story, characterized by its innovative use of geothermal and
hydroelectric power, provides a blueprint for harnessing renewable
energy sources in the computationally intensive AI/ML model training
realm.

This case study highlights the feasibility of reducing the carbon
footprint associated with AI development and underscores the
importance of location and infrastructure in achieving sustainability
goals. The Icelandic model demonstrates that with thoughtful
integration of renewable energy sources and efficient data center
design, the industry can mitigate its environmental impact without
compromising on the computational power necessary for AI/ML
advancements.

As the world grapples with the dual challenges of technological
progress and environmental sustainability, the lessons from Iceland
serve as a beacon. They remind us that innovation and ecological
responsibility can coalesce, guiding the tech industry toward a
more sustainable future. This paper's insights into the energy
demands of AI/ML models and the potential of renewable energy
solutions underscore a pivotal message that sustainable AI development
is not just a possibility but a necessity, urging the industry to
embrace renewable energy as the cornerstone of future AI/ML efforts.
