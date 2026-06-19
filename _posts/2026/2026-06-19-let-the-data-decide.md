---
title: Let the Data Decide
date: 2026-06-19
author: k3jph
layout: post
permalink: /2026/06/25/let-the-data-decide/
featured_image: /assets/img/2026/let-the-data-decide.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - machine learning
  - decision trees
  - random forests
  - AI history
---

The knowledge engineer's problem was getting the knowledge out of
the expert. A human specialist could diagnose a disease or configure
a computer system, but articulating exactly why, step by step, in
a form a machine could follow, was slow and expensive and never
quite complete. The rules accumulated. They contradicted each other.
They grew brittle at the edges. And always there were cases the
expert had seen but never written down, knowledge stored in pattern
recognition the expert couldn't fully access.

The solution, it turned out, was to stop asking the expert.

A decision tree is an expert system where the data writes the rules.
You give it a set of examples with known answers, and it learns
which questions to ask and in which order, recursively partitioning
the data into increasingly homogeneous groups. No domain expert had to enumerate the rules in advance.

J. Ross Quinlan had been working on this problem since the late
1970s. His [ID3 algorithm](https://doi.org/10.1007/BF00116251),
described comprehensively in 1986, became one of the first widely
used methods for inducing decision trees from labeled data.[^1] The key innovation was a principled
way to choose which question to ask at each node: information gain,
a measure derived from Shannon's entropy that quantifies how much a
given split reduces uncertainty about the class label. Ask the
question that most reduces your uncertainty, then recurse.

[C4.5](https://dl.acm.org/doi/book/10.5555/152181), Quinlan's 1993
successor to ID3, handled continuous-valued attributes, missing data,
and pruning. It became one of the most-used machine learning
algorithms of its era and was later selected by the IEEE
International Conference on Data Mining community as one of the
field's ten most influential algorithms.[^2]

The appeal was obvious. Decision trees produced models you could
read: if the patient's sodium level is below this threshold and
their temperature is above that one, diagnose accordingly. The
expert could look at the result and recognize it. The model was
not a black box. It was, in a meaningful sense, an expert system
the data had written.

## The Tradeoff

A single decision tree has a characteristic failure mode. Given
enough depth, it can memorize the training data perfectly: every
example correctly classified, every quirk and noise artifact
accommodated. But a model that memorizes is a model that cannot
generalize. Present it with a slightly different example and the
memorization fails.

This failure has a name: overfitting. The theoretical framework
for understanding it is the bias-variance tradeoff, and it is the
conceptual engine of everything that follows.[^3]

Bias is the error a model makes because its structure is too simple
for the problem. A model that assumes a linear relationship in
nonlinear data has high bias. It will be consistently wrong in a
predictable direction. This is underfitting.

Variance is the error a model makes because its structure is too
sensitive to the particular training data it saw. A model that fits
one dataset perfectly and fails on a slightly different one has high
variance. It has fit the noise along with the signal.

The tradeoff arises because reducing one often increases the other.
A simpler model has lower variance but higher bias. A more complex
model has lower bias but higher variance. You cannot minimize both
simultaneously by adjusting complexity alone. You need a different
strategy.

Decision trees illustrate this perfectly. A shallow tree has high
bias: it asks too few questions to capture the true structure. A
deep tree has high variance: it memorizes the training set. Neither
is satisfactory alone.

Combining models opened another route through the tradeoff.
Instead of simplifying a high-variance learner, researchers could
average away part of its instability.

## Bagging

Leo Breiman's [1996 paper](https://doi.org/10.1007/BF00058655)
introduced bootstrap aggregating, which the field immediately
shortened to bagging.[^4] The idea is simple enough to state in a
sentence: train many versions of the same model on bootstrap samples
of the training data, then aggregate their predictions.

A bootstrap sample is a sample of the same size as the original
training set, drawn with replacement. Some examples appear multiple
times. Some do not appear at all. You train a full decision tree on
each bootstrap sample, getting a slightly different tree each time
because each sample emphasizes different examples. For a new
prediction, you ask all the trees and take the majority vote.

Why does this work? A single deep tree has low bias but high
variance: small changes in the training data produce large changes
in the tree structure. When you average many trees trained on
different samples, the low-bias property is preserved because each
individual tree can still capture complex structure. The high-variance property partly averages out: provided the
trees are not perfectly correlated, quirks in one sample are
offset by quirks in another. The ensemble is more stable than any of its members.

Bagging turned an unstable, high-variance model into a reliable
classifier. It established the logic that ensemble methods would
follow.

## The Weak Learner Question

In 1988, the computer scientist Michael Kearns posed a question
that had no obvious answer: could a learning algorithm that does
only slightly better than random chance be systematically improved
into an arbitrarily accurate one? A learner that barely beats chance
is called weak. Kearns wanted to know whether weak learners could
be boosted into strong ones.[^5]

[Robert Schapire answered in
1990](https://doi.org/10.1007/BF00116037). His paper "The Strength
of Weak Learnability" proved that the answer was yes: by training
a weak learner repeatedly on carefully constructed distributions of
examples, you could produce a strong learner.[^6] The proof was
theoretical. The algorithm was too slow to be practical. But the
question was answered.

Yoav Freund improved the construction over the following years, and
in 1995 Freund and Schapire presented AdaBoost at the Conference on
Learning Theory. The full paper appeared in the [Journal of Computer
and System Sciences in
1997](https://doi.org/10.1006/jcss.1997.1504).[^7] AdaBoost was
the first boosting algorithm practical enough to use.

AdaBoost's mechanism is simple enough to describe, though its
behavior proved surprising.

You start with a uniform distribution over the training examples:
every example counts equally. You train a weak learner on this
distribution. The weak learner will misclassify some examples. You
reweight: examples that were misclassified get higher weight,
correctly classified examples get lower weight. You train another
weak learner on the new distribution. This learner, facing a harder
version of the problem, focuses on the previously hard cases. You
reweight again. Repeat.

The final classifier is a weighted vote of all the weak learners,
where each learner's vote is weighted by how accurate it was.

Why does this produce a strong learner? Each weak learner only has
to do slightly better than chance, which is a very low bar. But
each successive learner is forced to focus on the examples the
previous ensemble was getting wrong. Over many rounds, the learners
become complementary: each has learned something the others had not.
The ensemble covers the problem from many directions simultaneously.

The more theoretically interesting question was why AdaBoost
often resisted overfitting, even as additional learners increased
the ensemble's apparent complexity. Schapire, Freund, Bartlett,
and Lee offered an influential explanation based on margins:
boosting could continue improving the distribution of classification
margins even after training error reached zero. That did not make
AdaBoost immune to overfitting, noisy labels remained a particular
weakness, but it explained why the usual training-error story was
incomplete.[^8]

Jerome Friedman provided a different and more productive
interpretation in 2001: [boosting is gradient descent in function
space](https://doi.org/10.1214/aos/1013203451).[^9] Rather than
adjusting the weights of a single model, boosting adjusts a
composite function by adding a weak learner that points in the
direction of steepest descent for whatever loss function you
specify. This reframing generalized boosting beyond AdaBoost into
a family of gradient boosting machines: specify a different loss
function, get a different algorithm for a different problem. It also placed boosting within the broader world of
gradient-based optimization, the same mathematical territory in
which neural network training operated.

## MNIST

In the late 1990s, Yann LeCun and his colleagues assembled and
popularized the Modified National Institute of Standards and
Technology database of handwritten digits, better known as
[MNIST](https://yann.lecun.org/exdb/mnist/). LeCun, Léon Bottou,
Yoshua Bengio, and Patrick Haffner used it prominently in their
[1998 paper on document
recognition](https://ieeexplore.ieee.org/document/726791).[^10]
The dataset contained 70,000 normalized grayscale images, each 28
by 28 pixels: 60,000 for training, 10,000 for testing.

MNIST became machine learning's fruit fly. Nearly every new
classification method was tried on it, and the test-set error rate
gave researchers a common language for comparison. Handwritten-digit
recognition was already commercially useful, LeCun's earlier work
at Bell Labs had deployed it at scale, but MNIST's broader value
came from its design. It was difficult enough to distinguish serious
methods, standardized enough to make comparisons meaningful, and
small enough to run on the hardware of the late 1990s.

The comparison table in LeCun's paper is worth reading as a
historical document.[^11] A nearest-neighbor classifier with no
preprocessing produced an error rate of about 5 percent. A
two-layer neural network reached about 4.7 percent. A support
vector machine with a polynomial kernel reached about 1.1 percent.
LeNet-5, LeCun's convolutional network, reached about 0.7 percent.

The point was not that neural networks had decisively defeated every
alternative. Statistical classifiers, kernel methods, and
convolutional networks were all competitive, and their relative
performance depended on preprocessing choices and experimental
design. What changed was that their claims could be tested on the
same examples with the same held-out answers.

AI had acquired a scoreboard. This is the point at which it began
to look like engineering.

## Support Vector Machines

Vladimir Vapnik and Corinna Cortes published the [support vector
machine](https://doi.org/10.1007/BF00994018) in 1995, arriving at
the same practical capability from a different theoretical
direction.[^12]

The geometric intuition is clean. Given two classes of training
examples, an SVM finds the linear boundary between them that
maximizes the margin: the gap between the boundary and the nearest
examples of each class. A larger margin generally supports better generalization by
making the fitted boundary less sensitive to small perturbations
in the training examples. The examples that sit on the margin
are the support vectors.

The limitation of a linear boundary is obvious. Many problems are
not linearly separable. The kernel trick resolves this. Rather than
explicitly transforming the data into a higher-dimensional space
where a linear boundary might exist, the kernel computes the inner
products in that space directly. The result is a classifier that
draws nonlinear boundaries in the original space while remaining
theoretically a linear classifier in the transformed space.

Those theoretical guarantees were Vapnik's preoccupation. His theory
of VC dimension and structural risk minimization gave SVMs a
principled foundation for generalization.[^13] Where boosting's
theoretical foundation rested on the margin properties of the
ensemble, SVMs offered a geometric theory of generalization derived
from statistical learning theory that Vapnik and his
collaborators had been developing since the 1960s, first in the
Soviet Union and later in the United States. Neither method
required a human expert to write the classification rules
explicitly.

## What This Era Was

The period between ID3 and MNIST was one of the most practically
productive, and least popularly remembered, eras in the history
of the field. The check-reading systems built from these methods reached a
scale and routine commercial importance that few celebrated AI
demonstrations had achieved.

Breiman extended bagging into [random
forests](https://doi.org/10.1023/A:1010933404324) in 2001, adding
random selection of features at each split to further decorrelate
the trees.[^14] Random forests became a standard early baseline for
classification problems: robust, usable with relatively little
tuning, and equipped with diagnostics such as variable-importance
measures. The flock metaphor is not merely rhetorical; it has a
[literal biological
counterpart](https://jameshoward.us/2015/12/04/pigeon-flocks-for-decision-science/).

The methods of this era shared a property the expert systems era
had lacked. They were measurable. You could state an error rate on
a held-out test set. You could compare two methods on the same
benchmark and know which had won. The Kaggle competitions that
emerged in the following decade made this competitive framework
explicit and public, but the infrastructure was already in place:
a common language of benchmarks, held-out test sets, and reported
error rates. At least in this corner of the field, AI was replacing
promises with receipts.

The statistical and neural traditions were converging without fully
acknowledging it. Gradient boosting was gradient descent. The kernel
trick was an implicit feature transformation. The bias-variance
tradeoff applied equally to deep networks and decision trees. The
gap between the communities was narrowing even as their practitioners
maintained separate literatures and separate conferences.

Most of the era's dominant statistical methods could not handle
raw pixels, audio, or text at scale without substantial feature
engineering. Convolutional networks were an important exception,
but they had not yet become the field's general solution.

Those limits defined the agenda for what came next.

[^1]: Quinlan, J.R. (1986). Induction of decision trees. *Machine Learning*, 1(1), 81-106. ID3 was extended and corrected in Quinlan's 1993 book *C4.5: Programs for Machine Learning* (Morgan Kaufmann), which remains the canonical reference for practical decision tree induction.

[^2]: Wu, X. et al. (2008). Top 10 algorithms in data mining. *Knowledge and Information Systems*, 14(1), 1-37. The list was produced by a poll of the ICDM conference community in 2006.

[^3]: The bias-variance decomposition was given its clearest statement in Geman, S., Bienenstock, E., and Doursat, R. (1992). Neural networks and the bias/variance dilemma. *Neural Computation*, 4(1), 1-58. The tradeoff applies to all learning algorithms, not just neural networks, and remains one of the most useful conceptual tools in the field.

[^4]: Breiman, L. (1996). Bagging predictors. *Machine Learning*, 24(2), 123-140. Breiman demonstrates that bagging works best precisely where individual trees are most unstable, a result that was not obvious in advance and that focused the field's attention on variance reduction as a central design goal.

[^5]: Kearns, M. (1988). Thoughts on hypothesis boosting. Unpublished manuscript, Department of Computer Science, Carnegie Mellon University. The question arose within the PAC (Probably Approximately Correct) learning framework developed by Leslie Valiant, which formalized what it means for a machine to learn from examples.

[^6]: Schapire, R.E. (1990). The strength of weak learnability. *Machine Learning*, 5(2), 197-227. The paper posed a clean theoretical question, found an unexpected answer, and changed the direction of a field. It is one of the better examples of theoretical computer science being directly useful.

[^7]: Freund, Y. and Schapire, R.E. (1997). A decision-theoretic generalization of on-line learning and an application to boosting. *Journal of Computer and System Sciences*, 55(1), 119-139. The Conference on Learning Theory presentation in 1995 preceded the journal version by two years; the algorithm was already in use before the definitive paper appeared.

[^8]: Schapire, R.E., Freund, Y., Bartlett, P., and Lee, W.S. (1998). Boosting the margin: A new explanation for the effectiveness of voting methods. *Annals of Statistics*, 26(5), 1651-1686. The margin explanation addressed a puzzle that had bothered practitioners: why AdaBoost often continued to improve generalization performance even after training error reached zero. The explanation is influential but not universally accepted; subsequent work refined and in some cases disputed the simple minimum-margin account.

[^9]: Friedman, J.H. (2001). Greedy function approximation: A gradient boosting machine. *Annals of Statistics*, 29(5), 1189-1232. This reframing of boosting as functional gradient descent enabled the development of XGBoost, LightGBM, and the other gradient boosting systems that dominate modern tabular data competition. It also made the connection to neural network training explicit.

[^10]: LeCun, Y., Bottou, L., Bengio, Y., and Haffner, P. (1998). Gradient-based learning applied to document recognition. *Proceedings of the IEEE*, 86(11), 2278-2324. The MNIST dataset is credited to LeCun, Corinna Cortes, and Christopher Burges on the dataset's own page; the 1998 paper is where MNIST was most prominently introduced to the research community. The dataset outlived nearly everything else in the paper.

[^11]: The comparison table appears on p. 2282. It should be read with care: the systems did not all use identical preprocessing, and several results incorporated engineered features. Its historical importance lies less in establishing a single winner than in showing that very different learning traditions could be evaluated against a common test set.

[^12]: Cortes, C. and Vapnik, V. (1995). Support-vector networks. *Machine Learning*, 20(3), 273-297. Vapnik had been developing the underlying statistical learning theory since the 1960s; the SVM is the practical product of three decades of theoretical work that was largely invisible to Western researchers until after the Cold War.

[^13]: Vapnik, V. (1998). *Statistical Learning Theory*. Wiley. The book is the comprehensive statement of the VC dimension framework and structural risk minimization. It is dense and indispensable.

[^14]: Breiman, L. (2001). Random forests. *Machine Learning*, 45(1), 5-32. Breiman credited the random subspace idea in part to Tin Kam Ho's 1995 work. The combination of bagging and random feature selection produced an algorithm more powerful than either idea alone, and one that proved remarkably robust across problem domains.
