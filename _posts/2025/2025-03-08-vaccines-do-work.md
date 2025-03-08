---
id: vaccines-do-work
layout: post
title: "Vaccines Do Work"
date: 2025-03-08
author: k3jph
permalink: /2025/03/08/vaccines-do-work
featured_image: /assets/img/2025/vaccines-do-work.webp
categories:
  - Blog
tags:
  - statistics
  - vaccines
  - public health
---

Recently, I encountered a comment that was just dead wrong:

> If 100% of people got a vaccine, people would still get whatever they were
> vaccinated for. If they were 100% effective the person who didn't get the
> vaccine would get sick and the one who had the vaccine would be fine. I have
> been around people vaccinated for both flu and covid while they had it and I
> myself, not vacc, didn't contract the sickness from them. Hence, a healthy
> immune system is more effective. I also play in the dirt and in contact with
> beneficial bacteria that aid in my immune defense. Mother nature provides what
> humans/plants/animals need.

Where to even begin? The problem with this argument is that it treats infection
as a deterministic process--either you get sick or you do not, as if there are no
probabilities involved. In reality, infection is a probabilistic event, and
vaccines work by shifting those probabilities. They reduce both the chance of an
individual getting sick and, crucially, the chance of spreading a disease
further.

Let's break this down using actual math.

## Infection Is a Probability Game, Not a Binary Outcome

Exposure to a pathogen does not guarantee infection. The probability that an
exposed person becomes infected depends on multiple factors:

-   The infectious dose--how much of the pathogen enters the body.
-   The host's immune system--its ability to recognize and neutralize the
    invader.
-   The pathogen's ability to evade immunity.
-   The effectiveness of prior immunity--whether from past infection or
    vaccination.

A common mistake people make is assuming that if they were exposed to a disease
and did not get sick, they must have innate immunity or a superior immune
system. This ignores the probabilistic nature of infection. Every interaction
with an infected person carries a certain chance of transmission, but that
probability is not 100%, nor is it 0%. The fact that one person avoids infection
in a specific instance does not mean they are impervious--just lucky. Over time,
repeated exposures increase the likelihood of eventual infection.

We saw this play out in real time during the COVID-19 pandemic. Areas with lower
vaccine uptake experienced not only higher infection rates but also higher death
rates--including among the vaccinated. This is because vaccines reduce but do
not eliminate individual risk, and they work best when widespread uptake
suppresses community transmission. In regions with high vaccine coverage, cases
and deaths were far lower because the probability of exposure itself was
drastically reduced. [Conversely, in areas where vaccine refusal was high, the
virus circulated more freely, creating repeated exposure
opportunities](https://www.sciencedirect.com/science/article/pii/S2667193X22000084).
Even vaccinated individuals in these areas faced higher risks because they were
simply encountering the virus more often.

Epidemiologists quantify disease spread using the [basic reproduction
number](https://wwwnc.cdc.gov/eid/article/25/1/17-1901_article), $$R_0$$, which
represents the average number of new infections caused by a single infected
person in a fully susceptible population. Some examples:

-   Measles: $$R_0 \approx 12−18$$
-   COVID-19 (original strain): $$R_0 \approx2.5−3.5$$
-   Influenza: $$R_0 \approx1.3−1.8$$

When $$R_0 > 1$$, a disease spreads. When $$R_0 < 1$$, it dies out. The goal of
vaccination is not just to protect individuals, but to reduce
$$R_{\text{eff}}$$, the _effective_ reproduction number, below 1 so that the
disease fades away. The COVID-19 pandemic provided ample real-world evidence of
this principle: places with higher vaccination rates consistently saw fewer
infections and deaths, not because vaccines were 100% effective at blocking
disease, but because they dramatically lowered transmission rates, reducing
everyone's exposure risk.


## Vaccines Reduce Individual-Level Infection Probability

No vaccine is 100% effective, but they dramatically reduce the probability of
infection upon exposure. Vaccination does not create an impenetrable shield but
instead shifts the odds in favor of the immune system, making infection far less
likely.

### Mathematical Framework for Vaccine Protection

Suppose an unvaccinated individual has a baseline probability of infection per
exposure, denoted as $$ P_0 $$. A vaccine with efficacy $$e$$ reduces this
probability by $$e$$ percent. That means the probability of infection for a
vaccinated person, $$P_v$$, is:

\[
P_v = P_0 (1 - e)
\]

where:
- $$ P_0 $$ is the probability of infection without vaccination,
- $$ e $$ is the vaccine efficacy (expressed as a decimal, e.g., 90% efficacy
  $$\rightarrow e = 0.9 $$),
- $$ P_v $$ is the adjusted probability of infection for a vaccinated
  individual.

### Example Calculation

Consider an infection with a 50% probability of transmission per exposure ($$
P_0 = 0.5 $$), and a vaccine that is 90% effective ($$ e = 0.9 $$). The
probability of infection for a vaccinated person would be:

\[
P_v = 0.5 \times (1 - 0.9) = 0.5 \times 0.1 = 0.05
\]

That is a tenfold reduction in risk per exposure.

### Why This Matters in the Real World

Even though some vaccinated individuals may still get infected, the overall
probability of infection per encounter is drastically reduced. The benefits
compound across multiple interactions:

- Each individual exposure becomes less risky--lowering the chance that any
  single vaccinated person gets sick.
- Fewer infections mean fewer opportunities for spread--even a partially
  effective vaccine slows transmission.
- Herd effects emerge--as fewer people get infected, even unvaccinated
  individuals face lower exposure risks.

This is why widespread vaccination remains critical, even for diseases with
moderate vaccine efficacy. Reducing individual infection probability also
reduces *community-wide* transmission, helping to push $$ R_{\text{eff}} $$
below 1, ultimately suppressing outbreaks.

### The Misinterpretation of Breakthrough Infections

Critics of vaccination often point to "breakthrough infections" as evidence that
vaccines do not work. This misrepresents the statistics. Consider two
populations of 1,000 people, one vaccinated and one unvaccinated, each exposed
to the same virus:

- If the baseline infection probability is 50%, then 500 out of 1,000
  unvaccinated individuals will get sick.
- If the vaccine is 90% effective, then only 50 out of 1,000 vaccinated
  individuals will get sick.

Breakthrough infections happen, but they are far less frequent than infections
in the unvaccinated population. The fact that vaccinated individuals can still
get infected does not mean vaccines are ineffective--it means they are not
absolute barriers but powerful risk reducers.

### The Role of Mucosal Immunity and Viral Load Reduction

Even if a vaccinated person contracts an infection, their viral load--the amount
of virus in their system--is typically much lower than that of an unvaccinated
person. This occurs because vaccination primes the immune system, allowing it to
respond more quickly and efficiently before the virus can replicate to high
levels.

Lower viral loads have two major effects:

- Reduced Severity of Illness--The immune system suppresses viral replication
  faster, leading to milder symptoms or even asymptomatic cases.
- Decreased Transmission Risk--The amount of virus expelled through breathing,
  coughing, or sneezing is lower, making it less likely that an infected person
  will spread the virus to others.

This is particularly relevant for respiratory viruses like COVID-19 and
influenza, which spread through droplets and aerosols. Studies on COVID-19 found
that vaccinated individuals who had breakthrough infections shed significantly
less virus than unvaccinated individuals, reducing the probability of passing
the infection to close contacts.

Beyond systemic immunity, some vaccines also stimulate mucosal immunity--an
immune response in the nose, throat, and lungs, which are the primary entry
points for respiratory viruses. Mucosal antibodies, such as IgA, act as a first
line of defense, neutralizing viruses before they can take hold and begin
replication.

### Impact on $$R_{\text{eff}}$$

Since transmission requires exposure to a sufficient infectious dose, a lower
viral load means fewer viable viruses in circulation. This reduces the
probability of infection at both the individual and community level, further
lowering the effective reproduction number $$R_{\text{eff}}$$.

Thus, vaccines do not just protect the person receiving them--they also reduce
onward transmission, helping suppress outbreaks even when vaccines are not 100%
effective at preventing infection.

## Herd Immunity and Driving $$R_{\text{eff}}$$ Below 1

More importantly, vaccines help control disease at the population level. The
effective reproduction number $$R_{\text{eff}}$$ is given by:

\[
R_{\text{eff}} = R_0 \times (1 - v\cdot e) 
\]

where:

-   $$v$$ is the fraction of the population vaccinated, and
-   $$e$$ is the vaccine efficacy in reducing transmission.

If $$R_{\text{eff}} < 1$$, each infected person transmits the disease to fewer
than one other person on average, causing the outbreak to fizzle out.

For example, if measles has $$R_0 = 15$$, and a vaccine is 95% effective, then
we can easily solve for the required vaccination coverage $$v$$ to ensure
$$R_{\text{eff}} < 1$$:

\[
1 > 15 \times (1 - v \times 0.95)
\]

Rearranging,

\[
v > \frac{1 - (1/15)}{0.95} \approx 0.94
\]

Thus, at least 94% of the population must be vaccinated to prevent measles
outbreaks.

## What Happens When People Skip Vaccination?

Skipping vaccination creates gaps in immunity. Even if most people are
vaccinated, pockets of low immunity allow outbreaks to occur. This is exactly
why measles outbreaks have returned in the U.S., despite elimination in 2000.
But we also have direct, large-scale evidence that low vaccine uptake makes
things worse for everyone--including the vaccinated.

During the COVID-19 pandemic, areas with lower vaccination rates experienced
both [higher infection rates and higher death
rates](https://researchportal.ukhsa.gov.uk/en/publications/a-natural-experiment-during-lockdown-and-on-going-care-home-covid).
The difference was not only seen among the unvaccinated but also among
vaccinated individuals who lived in these areas. Why? Because vaccines do not
just protect individuals; they help suppress transmission. In communities where
few people were vaccinated, transmission remained high, increasing exposure
risks even for those who had received the vaccine. By contrast, regions with
high vaccine uptake saw markedly lower hospitalization and death rates, even
among those with breakthrough infections. This is a clear real-world validation
of the math behind herd immunity--fewer infections in a population lead to fewer
overall transmissions, reducing risk for everyone.

This is also why the commenter's anecdotal claim--"I was around vaccinated sick
people and didn't get sick"--is irrelevant. That is like saying, "I did not wear
a seatbelt and did not die in a car accident, so seatbelts must be useless." One
person's outcome does not override well-established epidemiology. Large-scale
data overwhelmingly demonstrate that vaccination reduces both personal and
community risk, and skipping vaccines is not just a personal choice--it actively
undermines public health.

## The Naturalistic Fallacy & "Playing in the Dirt"

The argument that exposure to "natural" microbes strengthens immunity does not
apply to novel pathogens. The human immune system can adapt to many
environmental exposures, but it is not magically prepared for every new virus or
bacterium that emerges.

- Polio, smallpox, and tuberculosis were entirely natural, yet they
  devastated human populations for centuries.
- Life expectancy before vaccines and modern medicine was under 40 years,
  largely due to infectious diseases.
- Modern sanitation and vaccines doubled human lifespan--not "playing in the
  dirt."

The claim that exposure to environmental microbes builds immunity misrepresents
how immune memory works. Yes, regular exposure to common bacteria and allergens
can train the immune system against *those specific agents*, but that training
offers no defense against a novel virus like SARS-CoV-2, Ebola, or measles. The
immune system does not gain general invulnerability; it learns through
*specific* exposure.

Additionally, some of the most deadly pathogens in history *originated* from
environmental exposure. Tetanus, anthrax, and plague are all caused by bacteria
found in soil. Rabies comes from animals. The idea that "natural" equals "safe"
is not just incorrect--it is actively dangerous.

Mother Nature is indifferent to human survival. Pathogens do not exist to make
us stronger; they exist to reproduce, often at our expense. Vaccines turn this
evolutionary arms race in our favor by safely introducing immunity without the
severe risks of infection. 

Simply put, "playing in the dirt" will not stop a pandemic. Science will.

