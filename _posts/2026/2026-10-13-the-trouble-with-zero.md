---
id: the-trouble-with-zero
title: The Trouble with Zero
date: 2026-10-13
author: k3jph
layout: post
permalink: /2026/10/13/the-trouble-with-zero/
featured_image: /assets/img/2026/the-trouble-with-zero.webp
excerpt: >-
  The four levels of measurement are useful, but their familiar classroom
  explanations obscure the difference between what numbers represent and
  what we can meaningfully do with them.
credits: >-
  Cover photograph by [RiaanMarais on Pixabay](https://pixabay.com/photos/thermometer-temperature-measure-5026546/),
  used under the [Pixabay Content License](https://pixabay.com/service/license-summary/).
  Resized and converted to WebP.
categories:
  - Blog
tags:
  - statistics
  - mathematics
  - measurement
  - teaching
  - philosophy of science
---

At ordinary atmospheric pressure, water freezes at about 0°C. This is a useful fact to know if you own a house with plumbing. Yet in introductory statistics, Celsius is a standard example of a measurement scale whose zero is not meaningful. This is correct in the particular mathematical sense intended, but it is easily taught in a way that suggests zero Celsius has no meaning at all. That would be a rather strange conclusion for anyone who has ever had a water pipe freeze.

The problem is not that the distinction between meaningful and arbitrary zeros is wrong. Rather, it is that we teach the distinction without adequately explaining what makes a zero meaningful in the first place. In doing so, we obscure something much more interesting about measurement. The same physical quantity can be represented by different numerical scales, and those scales can have different mathematical properties without containing different information about the thing being measured.

This becomes particularly interesting when we consider temperature, because the distinction between Celsius and Kelvin is one of the standard examples used to teach the four levels of measurement.

## Four Levels of Measurement

The familiar classification of measurement scales comes from psychologist S. S. Stevens, whose influential 1946 article, "[On the Theory of Scales of Measurement](https://doi.org/10.1126/science.103.2684.677)," described four types of scales. These are nominal, ordinal, interval, and ratio.

Nominal measurements classify observations into categories. Eye color, for instance, is a nominal variable because brown eyes are not mathematically greater than blue eyes. Ordinal measurements introduce an ordering, but the intervals between successive values are not necessarily meaningful. Someone finishing a race in second place has performed better than someone finishing third, but that does not tell us how much better. Interval measurements permit meaningful differences between values. The difference between 10 and 20 is the same as the difference between 20 and 30. Finally, ratio measurements permit meaningful comparisons between the magnitudes themselves. An object with a mass of 20 kilograms has twice the mass of an object with a mass of 10 kilograms.

This is a useful classification. We cannot perform every mathematical operation on every kind of measurement, and the levels provide a convenient way to explain why. However, they are commonly presented as a hierarchy in which higher levels contain more information than lower levels. This is where things begin to get complicated.

Consider [OpenStax's *Introductory Statistics*](https://openstax.org/books/introductory-statistics-2e/pages/1-3-frequency-frequency-tables-and-levels-of-measurement), which introduces the four levels from lowest to highest and explicitly describes ratio-level data as providing the most information. To illustrate the ratio scale, the textbook considers four examination scores, including scores of 80 and 20 points. Since 80 is four times 20, the textbook concludes that the student scoring 80 performed four times better than the student scoring 20.

There is a rather substantial assumption hidden in that conclusion.

The student earning 80 points certainly earned four times as many points as the student earning 20. If the examination awards one point for each correct answer, the first student answered four times as many questions correctly. But that does not establish that the first student knows four times as much statistics, has four times the mathematical ability, or is four times as good a student. We have counted examination points and then interpreted the result as though we had measured academic competence directly.

That distinction matters because the level of measurement cannot establish that the variable measures what we think it measures. A ratio can be mathematically valid while the conclusion drawn from it remains unjustified. In this case, the problem is not the division. It is the interpretation.

Temperature exposes a related problem, but from the opposite direction.

## Two Thermometers

Celsius and Fahrenheit are familiar examples of interval scales. We can meaningfully compare differences between temperatures, but ratios of the numerical readings are not meaningful as ratios of thermodynamic temperature. A temperature of 20°C is not twice the absolute temperature of 10°C. Similarly, 60°F is not twice the absolute temperature of 30°F.

The Kelvin scale is different. Its zero corresponds to absolute zero, a physically distinguished reference point rather than a conveniently selected temperature. In ordinary thermodynamics, a temperature of 400 K really is twice the absolute temperature of 200 K. This has physical consequences. For a classical ideal gas, the average translational kinetic energy of its molecules is proportional to their thermodynamic temperature. Doubling the Kelvin temperature doubles that average kinetic energy.

Kelvin is therefore considered a ratio scale, while Celsius and Fahrenheit are considered interval scales. The distinction is well established and appears in both introductory textbooks and more sophisticated treatments of measurement theory.

But Celsius and Kelvin measure exactly the same physical quantity. We can convert between them using a remarkably simple equation.

$$
K = {}^\circ C + 273.15
$$

A temperature of 10°C corresponds to 283.15 K, while 20°C corresponds to 293.15 K. The conversion is exact and reversible. We do not need to make another observation, recalibrate the thermometer, or collect additional data. Every measurement in Celsius corresponds to precisely one measurement in Kelvin, and every Kelvin measurement can be converted back into Celsius without losing information.

Suppose I collect a hundred temperature observations in Celsius and enter them into a spreadsheet. I then add 273.15 to every observation. According to the conventional classification, the original Celsius values are expressed on an interval scale while the new Kelvin values are expressed on a ratio scale. Yet I have not learned anything new about the hundred temperatures. I have simply changed how they are represented numerically.

This does not mean the distinction between interval and ratio scales is imaginary. In Celsius, the ratio of the readings 20 and 10 is two. In Kelvin, the ratio of the corresponding readings is approximately 1.035. The Kelvin ratio expresses a relationship between absolute thermodynamic temperatures that the raw Celsius ratio does not.

What has changed is the mathematical relationship expressed directly by the numerical values. We have not gained information about the observations. We have expressed information already available to us in a different way.

This distinction is easily lost when we tell students that ratio-level measurements contain more information than interval-level measurements. The Kelvin numbers permit meaningful ratios of thermodynamic temperature, but those same ratios can be recovered from the original Celsius numbers. All we need to know is where absolute zero falls on the Celsius scale.

## A Meaningful Zero

This brings us back to the freezing point of water. Zero Celsius is not the absence of thermodynamic temperature, but it does correspond approximately to a significant physical threshold. At ordinary atmospheric pressure, pure water freezes near 0°C. The freezing point varies somewhat with pressure and impurities, but under specified conditions it provides a perfectly meaningful reference.

Now consider two containers of water, one at 10°C and the other at 20°C. The second is not at twice the absolute temperature of the first. However, it is at twice the temperature *above the freezing point* of the first. One is ten Celsius degrees above the reference, while the other is twenty degrees above it.

We can express exactly the same relationship using Fahrenheit. The two containers have temperatures of 50°F and 68°F, respectively, and the freezing point of water is approximately 32°F under the same conditions.

The two calculations give the same result.

$$
\frac{20-0}{10-0}=\frac{68-32}{50-32}=2
$$

This is not a coincidence. The conversion between Celsius and Fahrenheit changes the size of the numerical intervals and shifts the zero, but it preserves the ratio between two temperature differences. Twenty Celsius degrees above freezing is twice ten Celsius degrees above freezing, just as thirty-six Fahrenheit degrees above freezing is twice eighteen Fahrenheit degrees above freezing.

We have obtained a meaningful ratio using measurements expressed on an interval scale.

There is, however, an important qualification. The ratio does not compare the absolute temperatures of the containers. Instead, it compares their temperature differences from a specified reference point. We have changed the quantity under consideration from thermodynamic temperature to *temperature excess above the freezing point of water*.

We can make this explicit by defining a new variable, D, representing the difference between an observed temperature and the freezing point.

$$
D=T-T_{\mathrm{freezing}}
$$

For temperatures at or above that reference, D has a meaningful zero representing no excess above freezing. A value of twenty represents twice the temperature excess of a value of ten, and the ratio is independent of whether we express the original temperatures in Celsius or Fahrenheit. Once the reference is fixed, the derived quantity has the mathematical properties of a ratio measure.

This does not transform Celsius itself into a ratio scale for thermodynamic temperature. Rather, we have constructed a different quantity from the same observations. The difference is subtle, but it is central to understanding measurement.

Something similar happens with geographic elevation. A location 200 meters above sea level has twice the elevation *above sea level* of a location 100 meters above sea level. That does not mean the first location is twice as far from the center of the Earth. It does not even mean that a mountain reaching 200 meters above sea level is twice as tall as another reaching 100 meters, since the mountains may rise from different surrounding terrain.

The ratio is meaningful only because we have specified the quantity and its reference point. Sea level is a physically and geographically useful reference, but it is not the absolute absence of distance or height. As with freezing water, a zero can be meaningful for one particular quantity without being an absolute zero for another.

## What Measurement Theory Actually Says

None of this is particularly troublesome for measurement theory itself. Stevens's original formulation concerned the mathematical transformations that preserve meaningful relationships among observations. The more sophisticated treatment in the [*Stanford Encyclopedia of Philosophy*](https://plato.stanford.edu/entries/measurement-science/) explicitly recognizes this distinction.

For interval scales, the permissible transformations include multiplication by a positive constant and the addition of a constant. This is called an *affine transformation*, and converting Celsius to Fahrenheit provides a familiar example.

$$
{}^\circ F = \frac{9}{5}\,{}^\circ C + 32
$$

The numerical differences change when we perform this conversion, but their relative sizes are preserved. A difference of twenty Celsius degrees is twice a difference of ten Celsius degrees. In Fahrenheit, the same intervals are thirty-six and eighteen degrees, respectively. The ratio of the intervals is unchanged.

For ratio scales, the permitted transformations are more restrictive. We can multiply every value by the same positive constant, as when converting meters to centimeters or kilograms to grams, but we cannot arbitrarily shift the zero while retaining the interpretation of raw numerical ratios. The zero is part of the empirical structure we intend the scale to represent.

This is the real mathematical distinction. An interval scale preserves relationships among differences. A ratio scale additionally represents ratios of the measured quantity directly through ratios of its numerical values. The permitted transformations tell us which relationships remain meaningful when the numerical representation changes.

The problem arises when these ideas are taught as though they were simply properties of the numbers themselves. Celsius and Kelvin contain the same information about a temperature when the conversion between them is known. But the numbers alone do not express the same relationships. The difference is not a matter of possessing better data. It is a matter of understanding what the numbers represent and which calculations preserve that meaning.

This also explains why our temperature-excess example works. Once we specify the freezing point as a reference, we can meaningfully compare distances from that reference regardless of which numerical temperature scale we use. We are preserving a ratio of differences rather than taking a ratio of arbitrary thermometer readings.

In other words, the mathematical operation becomes meaningful because we have defined what is being compared.

## Temperature Is Not Energy

There is one additional complication worth considering. A one-kelvin difference represents the same difference in thermodynamic temperature regardless of where it occurs on the scale. Increasing a temperature from 1 K to 2 K is the same temperature increment as increasing it from 300 K to 301 K.

However, that does not mean the two changes have the same thermodynamic consequences.

For a fixed quantity of classical monatomic ideal gas, changes in internal energy are directly proportional to changes in temperature. But real substances have heat capacities that depend on temperature. Raising the temperature of a substance by one kelvin can require different amounts of energy depending on its initial temperature and physical state. Near phase transitions, the relationship between energy and temperature becomes especially important.

Even the physical significance of absolute zero must be interpreted carefully. Zero kelvins does not necessarily mean that a physical system contains no internal energy. Quantum-mechanical zero-point energy can remain at absolute zero. The Kelvin scale is not a measure of the total energy stored in an object, and doubling a Kelvin temperature does not generally double its total internal energy.

We can therefore distinguish the measured temperature, the numerical scale used to represent it, and the physical consequences of a change in that temperature. These are related, but they are not interchangeable.

This is precisely the difficulty with statements such as the OpenStax claim about examination performance. Eighty points really is four times twenty points, just as 400 K really is twice 200 K in thermodynamic temperature. But in neither case does the mathematical ratio automatically justify every interpretation we might attach to it. The quantity being measured determines what the ratio means.

## Teaching Measurement

The four levels of measurement remain useful. They help explain why we can average temperatures but not postal codes, why rankings do not necessarily provide meaningful differences, and why some mathematical operations require more structure than others. There is no compelling reason to discard them.

But treating the levels as a simple hierarchy of increasingly informative data misses much of what makes measurement interesting. The same observations can support different numerical representations, and a transformation can change which relationships are expressed directly without adding or removing information about those observations. A reference point can be physically significant without being an absolute zero. A meaningful ratio can also be constructed from differences measured on an interval scale.

More importantly, identifying a scale as nominal, ordinal, interval, or ratio does not settle the interpretation of the resulting statistics. That requires understanding the quantity being measured and the empirical relationships that justify assigning numbers to it. A ratio of test scores is not necessarily a ratio of knowledge, just as a ratio of thermodynamic temperatures is not necessarily a ratio of total internal energies.

Statistics is not merely the manipulation of numbers. It is the analysis of quantities represented by numbers, and our mathematical conclusions are only as meaningful as the relationships those representations preserve.

OpenStax is not wrong to classify Celsius as an interval scale, nor is Stevens's framework fundamentally mistaken. The problem is pedagogical. We have reduced a sophisticated theory about the relationship between mathematics and the world to four definitions, a handful of stock examples, and a rule about zero. Students learn which label to apply without necessarily learning why the label matters.

Zero Celsius remains a meaningful reference for someone trying to keep water from freezing. It simply is not zero thermodynamic temperature. When we measure temperature excess above freezing, the same reference takes on a different mathematical role because we have defined a different quantity.

A meaningful zero is not merely a number on a scale. Its meaning comes from the quantity being measured and the relationships we intend the numbers to express. **That is what students need to understand before we ask them to memorize the four levels of measurement.**
