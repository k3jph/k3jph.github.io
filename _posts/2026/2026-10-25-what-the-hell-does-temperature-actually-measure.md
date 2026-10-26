---
id: what-the-hell-does-temperature-actually-measure
title: What the Hell Does Temperature Actually Measure?
date: 2026-10-25
author: k3jph
layout: post
permalink: /2026/10/25/what-the-hell-does-temperature-actually-measure/
featured_image: /assets/img/2026/what-the-hell-does-temperature-actually-measure.webp
excerpt: >-
  A thermometer tells us which object is hotter, but explaining what
  temperature actually measures takes us through molecular motion,
  thermal equilibrium, entropy, and the laws of thermodynamics.
credits: >-
  Cover illustration generated with OpenAI. A steaming cup of coffee beside
  a bathtub, illustrating two systems at different temperatures.
categories:
  - Blog
tags:
  - physics
  - thermodynamics
  - temperature
  - measurement
  - statistics
  - entropy
---

In [The Trouble with Zero](https://jameshoward.us/2026/10/13/the-trouble-with-zero/), I discussed how Celsius, Fahrenheit, and Kelvin represent the same physical quantity, even though the mathematical properties of the three scales differ. One of the issues I raised was that temperature is not the same thing as energy. A temperature of 400 K is twice a temperature of 200 K, but that does not necessarily mean the hotter object contains twice as much energy.

This raises a more fundamental problem. We measure temperature constantly, and most of us learned how to read a thermometer before we learned much of anything about science. Yet, explaining precisely what temperature measures turns out to be surprisingly difficult.

The simplest explanation is that temperature tells us how hot or cold something is. That's reasonable enough, but scientifically, it does not explain anything. We have simply exchanged one word for two others. A somewhat more sophisticated explanation is that temperature measures the amount of heat in a substance. Unfortunately, that's wrong, too. [Heat is energy transferred between systems](https://openstax.org/books/university-physics-volume-2/pages/1-4-heat-transfer-specific-heat-and-calorimetry) because of a temperature difference. A substance has internal energy, but it does not contain heat in the thermodynamic sense.

We can illustrate the difference using a bathtub and a cup of coffee.

Suppose I have a bathtub filled with water at 30°C and a cup of coffee at 80°C. The bathtub contains an enormous amount of water compared to the coffee. Accordingly, it has considerably more internal energy, assuming we measure that energy relative to the same reference state. But the coffee is hotter. If I pour the coffee into the bathtub, energy will move from the coffee into the bathwater, despite the bathtub already containing far more energy.

The amount of energy in a substance does not tell us whether energy will flow into or out of it when it encounters another substance. Temperature does.

We can demonstrate the distinction another way. Suppose I have two identical cups of water, both at 50°C. If I pour them into a larger container, the resulting water will still be at 50°C, assuming no energy is lost to the surroundings. I have doubled the amount of water and its internal energy relative to a fixed reference state, but I have not changed its temperature.

This distinction is why physicists describe temperature as an [*intensive property*, while internal energy is an *extensive property*](https://openstax.org/books/university-physics-volume-2/pages/3-1-thermodynamic-systems). An extensive property depends on the amount of material present, while an intensive property does not. Mass and volume are extensive properties. Temperature and pressure are intensive properties for systems in thermodynamic equilibrium.

So temperature is not a measure of how much energy we have. Whatever it measures must explain why objects exchange energy, and why two objects containing vastly different amounts of energy can have the same temperature.

## Molecular Motion

A better explanation, and one commonly taught in introductory science, is that temperature measures the average kinetic energy of molecules. This is considerably closer to correct, and under certain circumstances, it is exactly correct.

Consider a container of helium gas. Helium atoms are moving around inside the container, colliding with each other and the container walls. Some atoms move quickly, while others move slowly. Each has kinetic energy associated with its motion, and we can calculate their average kinetic energy.

For a [classical ideal gas](https://openstax.org/books/university-physics-volume-2/pages/2-1-molecular-model-of-an-ideal-gas), the relationship between average translational kinetic energy and temperature is

$$
\overline{E}_{\mathrm{kinetic}}=\frac{3}{2}k_{\mathrm B}T
$$

Here, \(T\) is the absolute temperature in kelvins, and \(k_{\mathrm B}\) is the [Boltzmann constant](https://www.nist.gov/si-redefinition/kelvin/kelvin-boltzmann-constant). This equation tells us that the average kinetic energy associated with an atom's movement through space is directly proportional to temperature. Double the Kelvin temperature, and we double that average kinetic energy.

This makes perfect sense for helium, provided we're treating it as an ideal gas. But most things are not ideal gases, and not all the energy in a substance is associated with molecules moving from one place to another.

In solids, atoms generally vibrate around positions in a structure. Molecules can rotate, vibrate, and interact with each other in ways that store energy without simply increasing their translational motion. These interactions can contribute substantial energy, and the relationship between energy and temperature becomes more complicated when we consider liquids, solids, and [quantum-mechanical effects](https://openstax.org/books/university-physics-volume-2/pages/2-3-heat-capacity-and-equipartition-of-energy).

We can demonstrate this complication with an ordinary block of ice.

At normal atmospheric pressure, pure ice melts at approximately 0°C. If we take a block of ice already at its melting point and begin adding energy, the ice melts. However, its temperature stays at approximately 0°C throughout the melting process. The energy is being used to change the structure of the material from solid ice into liquid water.

Once all the ice has melted, additional energy will raise the temperature of the water. Continue heating it to its boiling point, and we encounter the same problem again. Water at approximately 100°C can absorb substantial additional energy as it changes from liquid to vapor without its temperature increasing during the transition.

This involves [*latent heat*](https://openstax.org/books/university-physics-volume-2/pages/1-5-phase-changes), though the name is somewhat unfortunate given that heat is an energy transfer rather than a substance contained in the water. The important point is that energy enters the system, increasing its internal energy, while its temperature remains constant.

If temperature were simply a measure of the amount of energy present, this would make no sense. We need an explanation that accounts for both the movement of particles and the ways those particles interact.

## What a Thermometer Measures

Consider a traditional mercury thermometer. Mercury expands as its temperature increases, so we can observe that expansion and associate it with a numerical scale. A modern [resistance thermometer](https://www.nist.gov/pml/sensor-science/thermodynamic-metrology/mercury-thermometer-alternatives/mercury-thermometer-1) uses the relationship between temperature and electrical resistance. A [thermocouple](https://www.nist.gov/pml/sensor-science/thermodynamic-metrology/mercury-thermometer-alternatives/mercury-thermometer-5) uses an electrical voltage generated by a temperature difference. These are different physical processes, yet we can use all three to measure the same temperature.

Interestingly, none measures temperature directly. The mercury thermometer measures expansion, the resistance thermometer measures resistance, and the thermocouple measures voltage. We use known relationships between these properties and temperature to produce a reading. The [calibration of these instruments](https://www.nist.gov/pml/sensor-science/thermodynamic-metrology/industrial-thermometer-calibrations) is an important part of modern metrology.

More importantly, when we place a contact thermometer into a cup of water, it does not initially measure the water's temperature. It measures its own temperature. If the thermometer is colder than the water, energy moves from the water into the thermometer. If it is warmer, energy moves in the opposite direction.

Eventually, the thermometer and water reach the same temperature. At that point, there is no net transfer of heat between them, and we say they are in *thermal equilibrium*.

This is the basis of the [zeroth law of thermodynamics](https://openstax.org/books/university-physics-volume-2/pages/1-1-temperature-and-thermal-equilibrium). If two systems are independently in thermal equilibrium with a third system, they are also in thermal equilibrium with each other. The law allows us to establish that different objects have the same temperature, even when they are made of completely different materials.

So if a thermometer reads 20°C in a cup of water and subsequently reads 20°C in a container of oil, we can conclude that the water and oil have the same temperature. If we brought them into thermal contact, neither would experience a net transfer of heat because of a temperature difference.

Notice what we have accomplished. We have established a way to compare temperatures without knowing how the molecules of either substance behave. We do not need to calculate their kinetic energy or the potential energy associated with their interactions. We need only establish thermal equilibrium.

This gives us an [operational definition of temperature](https://openstax.org/books/university-physics-volume-2/pages/1-1-temperature-and-thermal-equilibrium). Temperature is the property that becomes equal when two systems reach thermal equilibrium.

It is a useful definition, but it does not explain why energy flows from the hotter system to the colder one in the first place. For that, we need to consider entropy.

## Enter Entropy

Entropy has a reputation for being difficult to understand, largely because it is commonly described as a measure of disorder. While that explanation can be useful in certain circumstances, it is also misleading. Disorder is an informal concept, and a messy bedroom is not a particularly helpful model for understanding the thermodynamics of a gas.

A more useful approach is to consider how many different microscopic arrangements can produce the same observable condition. This is the basis of the [statistical interpretation of entropy](https://openstax.org/books/college-physics-ap-courses-2e/pages/15-7-statistical-interpretation-of-entropy-and-the-second-law-of-thermodynamics-the-underlying-explanation).

Imagine a container filled with gas. We can measure its pressure, volume, and total energy. These quantities describe the overall condition of the gas, which physicists call a *macrostate*. However, there are an enormous number of ways the individual molecules could be positioned and moving while producing that same macrostate.

Each particular microscopic arrangement is called a *microstate*.

We can demonstrate the concept with a simplified example. Suppose we have three distinguishable oscillators, each capable of storing energy in discrete units. These might represent three vibrating atoms in a very simple model. We can distribute one unit of energy among the three oscillators in three ways, since any one of them can receive it.

Now suppose we have two units of energy. Both units can be placed in the first oscillator, the second oscillator, or the third oscillator. Alternatively, we can put one unit in each of two different oscillators. There are six possible arrangements. With three units of energy, there are ten arrangements. With four units, there are fifteen.

This is a simplified version of the [Einstein model of a solid](https://www.hyperphysics.phy-astr.gsu.edu/hbase/Therm/einsol.html), which treats a solid as a collection of quantum harmonic oscillators. The number of possible distributions can be calculated using combinatorics, and grows extremely rapidly as we increase the number of oscillators and energy units.

The total energy is increasing, but more importantly, the number of ways to distribute that energy is increasing. For equally probable accessible microstates, [Boltzmann's expression for entropy](https://openstax.org/books/chemistry-2e/pages/16-2-entropy) is

$$
S=k_{\mathrm B}\ln\Omega
$$

Here, \(S\) is entropy, \(k_{\mathrm B}\) is the Boltzmann constant, and \(\Omega\) is the number of accessible microstates.

The logarithm is important because the number of microstates becomes extraordinarily large for real physical systems. It also makes entropy additive for independent systems, allowing us to calculate the total entropy when we combine them.

In our simplified example, adding energy increases the number of accessible arrangements. But the rate at which entropy increases is not constant. Because entropy depends on the logarithm of the number of arrangements, adding more energy can produce progressively smaller increases in entropy.

This is where temperature finally enters the discussion.

For a simple thermodynamic system whose volume and particle number remain fixed, temperature is defined by

$$
\boxed{
\frac{1}{T}=
\left(\frac{\partial S}{\partial U}\right)_{V,N}
}
$$

Here, \(U\) represents internal energy, and \(S\) represents entropy. The expression on the right is a partial derivative, which tells us how entropy changes when we add a small amount of energy while keeping the volume and number of particles fixed.

This is the [thermodynamic definition of temperature](https://thermodynamics-lectures-5b767e.gitlab.io/lectures/lecture07.html). Temperature is the reciprocal of the rate at which entropy changes with energy.

For ordinary systems with positive temperatures, a system whose entropy increases rapidly when energy is added has a lower temperature than one whose entropy increases more slowly.

We can now understand why adding energy does not necessarily increase temperature. During a phase transition, such as melting ice at constant pressure, the amount of each phase changes while their common temperature remains fixed. Both energy and entropy increase, but their relationship remains consistent with the same temperature.

The additional energy changes the possible microscopic arrangements of the material without necessarily increasing its temperature.

This also explains why energy moves from hot objects to cold objects.

## Why Heat Flows from Hot to Cold

Return to the cup of coffee and the bathtub. The coffee has a temperature of 80°C, while the bathwater has a temperature of 30°C. We know that energy will move from the coffee into the bathtub, but now we can explain why.

The [second law of thermodynamics](https://openstax.org/books/university-physics-volume-2/pages/4-4-statements-of-the-second-law-of-thermodynamics) tells us that the total entropy of an isolated macroscopic system does not spontaneously decrease. Accordingly, when two objects exchange energy in an otherwise isolated system, the spontaneous direction of transfer must be consistent with an increase in total entropy.

Suppose a small amount of energy, \(Q\), moves from the hotter coffee into the cooler bathwater. The coffee loses energy, so its entropy decreases. The bathwater gains energy, so its entropy increases.

Using the relationship between entropy and temperature, we can approximate the total entropy change as

$$
\Delta S_{\mathrm{total}}
\approx
-\frac{Q}{T_{\mathrm{hot}}}
+
\frac{Q}{T_{\mathrm{cold}}}
$$

Rearranging,

$$
\Delta S_{\mathrm{total}}
\approx
Q\left(
\frac{1}{T_{\mathrm{cold}}}
-
\frac{1}{T_{\mathrm{hot}}}
\right)
$$

Since the hot object has a higher absolute temperature than the cold object, the reciprocal of the cold temperature is larger than the reciprocal of the hot temperature. Consequently, the expression inside the parentheses is positive.

We can make this concrete. The coffee is at approximately 353 K, and the bathwater is at approximately 303 K. Suppose 100 joules of energy move from the coffee into the bathwater while their temperatures change only negligibly. We get

$$
\Delta S_{\mathrm{total}}
\approx
100\left(
\frac{1}{303}
-
\frac{1}{353}
\right)
\approx 0.047\ \mathrm{J/K}
$$

The resulting entropy change is positive, consistent with the second law.

If we reversed the process, moving the same quantity of energy from the cold bathtub into the hot coffee without any other changes, the total entropy would decrease. That is not a spontaneous process under these conditions. We would need some external intervention, such as the work performed by a [refrigerator or heat pump](https://openstax.org/books/university-physics-volume-2/pages/4-3-refrigerators-and-heat-pumps), to make that transfer occur while satisfying the second law for the complete system.

Energy therefore flows spontaneously from hot to cold because that direction increases the total entropy of the combined system.

As the coffee cools and the bathwater warms, the temperature difference becomes smaller. Eventually, assuming we allow sufficient time and prevent energy from escaping to the surroundings, the two will reach the same temperature. At that point, transferring a small quantity of energy in either direction produces no first-order change in their combined entropy.

The system has reached thermal equilibrium, and the total entropy is at a maximum with respect to that exchange of energy.

We have now connected the zeroth law of thermodynamics, which describes thermal equilibrium, with the second law, which describes the behavior of entropy. The statistical definition of temperature explains why different materials can have the same temperature and why energy moves between them when their temperatures differ.

That's considerably more useful than simply saying temperature measures how fast molecules are moving.

## Absolute Zero

This explanation also provides another way to understand the Kelvin scale.

As discussed in *The Trouble with Zero*, Kelvin has a physically significant zero, unlike the convenient reference points used for Celsius and Fahrenheit. In classical physics, absolute zero is associated with the minimum possible thermal motion. However, in quantum mechanics, particles can retain [zero-point energy](https://openstax.org/books/university-physics-volume-3/pages/7-6-the-quantum-harmonic-oscillator) even at zero kelvins. Absolute zero therefore does not generally mean that every particle has stopped moving or that a system contains no energy.

Since 2019, the kelvin has been defined in the [International System of Units](https://www.bipm.org/en/publications/si-brochure) by fixing the numerical value of the Boltzmann constant to exactly

$$
k_{\mathrm B}
=
1.380649\times10^{-23}\ \mathrm{J/K}
$$

This definition connects the temperature scale to a [fundamental physical constant rather than to a particular substance](https://www.nist.gov/si-redefinition/kelvin/kelvin-present-realization), such as water. It reflects the central role of statistical mechanics in understanding temperature.

The Boltzmann constant appears in our equation for the kinetic energy of an ideal gas and in our equation for entropy. It provides the connection between microscopic energy and the temperature we observe at the macroscopic level.

## What Temperature Actually Measures

We can now return to the original problem.

Temperature is not the amount of heat contained in a substance, because heat is energy in transfer. Temperature is not the total internal energy of a substance, because two systems with different amounts of energy can have the same temperature. And although temperature is directly related to average translational kinetic energy in an ideal gas, that relationship is not sufficient to explain every physical system.

Instead, temperature is a thermodynamic property that describes how entropy changes with energy. It determines the conditions under which systems reach thermal equilibrium and, for ordinary positive-temperature systems, the direction in which heat spontaneously flows.

This is a surprisingly complicated explanation for something as familiar as a thermometer, but it also illustrates an important feature of scientific measurement.

We were measuring temperature long before we understood statistical mechanics. Thermometers were developed and improved well before Boltzmann established the mathematical relationship between entropy and microscopic arrangements. They worked because the expansion of mercury and other observable properties were reliably related to temperature, even though the underlying physical explanation was not yet understood.

In other words, we knew how to measure something before we understood precisely what it was.

That brings us back to the problem raised in *The Trouble with Zero*. Measurement involves more than assigning a number to an observation. The numerical representation is useful because it corresponds to some physical property, and understanding that property determines which mathematical operations produce meaningful results.

A thermometer tells us that the coffee is hotter than the bathtub. That observation is useful enough for ordinary purposes. But understanding why the coffee is hotter, why energy flows from the coffee into the bathwater, and why the two eventually reach the same temperature requires us to understand the relationship between energy, entropy, and the microscopic behavior of matter.

Temperature, it turns out, does not tell us how much energy something has. It tells us something about what happens when that energy changes.

And that's a rather remarkable amount of physics hiding inside a thermometer.
