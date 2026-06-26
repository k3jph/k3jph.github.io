---
title: Neurons All the Way Down
date: 2026-06-25
author: k3jph
layout: post
permalink: /2026/06/25/neurons-all-the-way-down/
featured_image: /assets/img/2026/neurons-all-the-way-down.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - machine learning
  - deep learning
  - neural networks
  - AI history
---

In October 2012, the full results of the ImageNet Large Scale Visual
Recognition Challenge were released. The competition required systems
to classify photographs into 1,000 object categories and measured
performance as top-five error: a system was counted as wrong only
when the correct label did not appear among its five most probable
answers.

The winning top-five error rate had fallen from 28.2 percent in 2010
to 25.8 percent in 2011. In 2012, the runner-up scored 26.2 percent.
The submission from Alex Krizhevsky, Ilya Sutskever, and Geoffrey
Hinton [scored 15.3 percent](https://proceedings.neurips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html).[^1]

That result came from an ensemble of seven related convolutional
neural networks. A single network from the same family achieved 18.2
percent on the validation set. Either number put the submission far
beyond anything the competition had seen. The gap between first and
second place was larger than the entire improvement over the
challenge's first two years combined.

It did not settle every question about neural networks. It made it
difficult to continue treating deep convolutional networks as a minor
branch of computer vision.

The underlying ideas were not new. Multilayer networks had been
trained with backpropagation since the 1980s, and convolutional
networks had already succeeded in commercial applications. What
changed was that several requirements arrived at once: enough labeled
data, enough computing power, better activation functions, workable
regularization, and engineering practices that made large networks
train reliably. AlexNet was a breakthrough. It was also a
convergence.

## The Long Pause

During much of the 1990s and early 2000s, neural networks were not
the default choice for difficult machine learning problems. Support
vector machines and kernel methods often outperformed them on
standard benchmarks, and the accompanying statistical theory was
better understood. Large multilayer networks were harder to train,
sensitive to initial conditions, and expensive to run.

Geoffrey Hinton, Yann LeCun, and Yoshua Bengio continued working
on deep learned representations through this period. LeCun had
demonstrated convolutional networks for handwritten-digit recognition
at Bell Labs by the late 1980s, and systems from that work were
later deployed commercially to read checks.[^2] Bengio worked on
representation learning and neural language models. Hinton pursued
several approaches to learning multilayer representations, including
the generative models and pretraining methods that helped revive
interest in deep networks during the 2000s.

The Canadian Institute for Advanced Research supported these
researchers through a sustained program focused on neural computation
and adaptive perception, at a time when deep networks were outside
the mainstream of machine learning. That kind of institutional bet
on an unfashionable research direction is rarer than it should be.

Bengio, Hinton, and LeCun shared the 2018 ACM Turing Award for
"conceptual and engineering breakthroughs that have made deep neural
networks a critical component of computing."[^3] The distance between
the foundational work and the award is a reasonable measure of how
long ideas can wait.

## The Vanishing Gradient

Backpropagation trains a network by computing the derivative of the
error with respect to each weight, starting at the output and working
backward through the network via the chain rule. At every layer, the
backward signal is multiplied by terms involving the layer's weights
and the derivative of its activation function. In a deep network,
many such terms are multiplied together. If their magnitudes are
consistently less than one, the gradient can shrink to near zero
before it reaches the early layers. If they are consistently greater
than one, it can instead explode.

The sigmoid and tanh activations commonly used in early networks made
the first problem especially severe. Both functions saturate: for
inputs far from zero, their derivatives approach zero. Multiply
several such small derivatives together, and the error signal
reaching the early layers carries almost no useful information.

Sepp Hochreiter analyzed this problem in his 1991 diploma thesis.[^4]
Yoshua Bengio, Patrice Simard, and Paolo Frasconi gave it a widely
read mathematical treatment in 1994 while studying long-term
dependencies in recurrent networks.[^5] A recurrent network unrolled
over many time steps forms a deep computational graph, and the same
repeated multiplications that cause trouble across time also arise
across the layers of a deep feedforward network.

The practical consequence was not that deep networks were incapable
of learning. It was that their early layers often received a much
weaker training signal than their final ones, making large networks
difficult to optimize reliably in practice.

## Making Depth Trainable

No single development solved this.

One important step was layer-wise pretraining. In 2006, Hinton,
Simon Osindero, and Yee-Whye Teh showed how to train a deep belief
network one layer at a time before fine-tuning the whole model with
backpropagation.[^6] This sidestepped the vanishing gradient problem
by giving each layer a reasonable starting point. Related work used
stacked autoencoders for a similar purpose. These methods renewed
confidence that deep representations were learnable. They were a
bridge, not the final recipe: AlexNet did not use unsupervised
pretraining.

The more direct contribution to AlexNet was the replacement of
sigmoid activations with rectified linear units, or ReLUs. A ReLU
passes positive inputs through unchanged and maps negative inputs
to zero. Its derivative is one for positive inputs, which means it
does not saturate on the positive side and does not attenuate
gradients flowing through active units. Vinod Nair and Geoffrey
Hinton demonstrated rectified units in generative models in
2010.[^7] Xavier Glorot, Antoine Bordes, and Yoshua Bengio showed
the following year that deep rectifier networks could be trained
successfully without unsupervised pretraining. AlexNet used ReLUs
throughout.

Careful weight initialization also mattered. Glorot and Bengio
showed in 2010 that the choice of initial weight scale could cause
activations and gradients to shrink or grow systematically as they
passed through a network, before any training had occurred.[^8]
AlexNet used its own initialization scheme: weights drawn from a
zero-mean Gaussian with a small standard deviation, with positive
biases assigned to certain ReLU layers. The general lesson held:
initialization was not a trivial detail.

Dropout addressed overfitting in large networks. During training,
it randomly sets some activations to zero, preventing the network
from depending too heavily on particular combinations of units. It
can also be interpreted as training many different thinned versions
of the network and approximating their combined predictions at test
time. AlexNet used dropout in its fully connected layers. The method
was later documented formally by Nitish Srivastava, Hinton,
Krizhevsky, Sutskever, and Ruslan Salakhutdinov.[^9]

Data augmentation completed the recipe. AlexNet generated additional
training examples by reflecting images horizontally, cropping random
patches, and altering color intensities. With roughly sixty million
parameters to train, every additional effective example helped.

## The GPU

Neural network training consists largely of dense linear algebra:
multiplying matrices, summing products, applying nonlinearities.
Graphics processors were built for a different but mathematically
similar workload: the parallel floating-point operations involved
in rendering three-dimensional scenes.

NVIDIA introduced CUDA in 2006 and released version 1.0 of the
toolkit in 2007.[^10] CUDA allowed programmers to write
general-purpose code for GPU hardware. Machine learning researchers
began using GPUs to accelerate neural network training, and the
results were substantial enough to change what was practical to
attempt.

AlexNet was split across two NVIDIA GTX 580 GPUs, each with three
gigabytes of memory. Training required roughly ninety passes through
the dataset and took five to six days. That is already a long
experimental cycle. Without the GPU implementation, the researchers
could have tested fewer architectures and made fewer corrections
when things went wrong. Faster hardware did not supply the
scientific ideas, but it changed which ideas could be tested and
refined in a reasonable amount of time.

There is a useful accident here. The consumer graphics market
financed the development of increasingly powerful parallel processors.
Researchers then repurposed that hardware for a kind of computation
its original customers had not been paying to perform.

## ImageNet

ImageNet began as a project led by Fei-Fei Li at Princeton. Its
organizers used the WordNet hierarchy to define object categories,
collected candidate images from internet search engines, and used
crowd workers to verify the labels. The version presented at CVPR
in 2009 contained 3.2 million images across 5,247 categories.[^11]
The collection continued to grow. By 2011 it had expanded to roughly
fourteen million images across more than twenty thousand categories.

The Large Scale Visual Recognition Challenge began in 2010. The
classification task standardized in 2012 used 1,281,167 training
images, 50,000 validation images, and 100,000 test images across
1,000 categories.[^12] The challenge ran annually through 2017.

This scale was itself a contribution. A network with sixty million
parameters needs a great many examples if it is to find useful
regularities rather than memorize its training set. Before ImageNet,
computer vision researchers rarely had a labeled dataset large and
diverse enough to test the full capacity of a deep convolutional
network.

The leading 2010 and 2011 entries relied on pipelines built from
carefully engineered visual descriptors. Such systems could be
sophisticated, but the intermediate representation of the image was
largely chosen by the researchers. The 2012 result showed that a
deep convolutional network could learn much of that representation
from the training data. The ILSVRC image-classification competition
was won by a deep convolutional network every year through its
conclusion in 2017.

## What Changed and What Didn't

Before deep convolutional networks became dominant, a computer
vision pipeline commonly separated feature extraction from
classification. Researchers designed descriptors for edges, corners,
textures, or local image patches and then supplied those descriptors
to a classifier. The classifier learned; the representation was
largely fixed.

A convolutional network learns the filters and the classifier
jointly. Early layers develop responses to edges and orientations.
Later layers combine these into increasingly abstract patterns. The
familiar description is an approximation, not a law governing every
unit, but it captures something real: the representation itself
became part of what was optimized.

This did not eliminate human design. Researchers still chose the
architecture, the training objective, the data, the augmentation
strategy, and many other things. What changed was the requirement
to specify the entire intermediate feature pipeline by hand.

Neural networks are statistical learning models; this was not a
merger between separate traditions. The more useful distinction is
between pipelines whose representations are largely fixed before
training and systems that learn the representation jointly with the
classifier. Statistical methods from the previous era were powerful
within the first paradigm. Convolutional networks showed what
was possible in the second.

Rumelhart, Hinton, and Williams published their landmark paper on
learning internal representations by backpropagating errors in
1986.[^13] Twenty-six years later, the core procedure was
recognizable. What had changed was everything around it: the amount
of labeled data, the available computation, the activation functions,
the regularization, the initialization, and the accumulated
engineering experience required to make a large model behave.

AlexNet did not emerge because one new idea suddenly made deep
networks possible. It showed what happened when a collection of
older ideas finally had the conditions they needed.

[^1]: Krizhevsky, A., Sutskever, I., and Hinton, G.E. (2012). ImageNet classification with deep convolutional neural networks. *Advances in Neural Information Processing Systems*, 25. Published in revised form as Krizhevsky, A., Sutskever, I., and Hinton, G.E. (2017). *Communications of the ACM*, 60(6), 84-90. The 15.3 percent top-five error rate came from an ensemble submission; the single-model top-five validation error was 18.2 percent.

[^2]: LeCun, Y., Bottou, L., Bengio, Y., and Haffner, P. (1998). [Gradient-based learning applied to document recognition](https://doi.org/10.1109/5.726791). *Proceedings of the IEEE*, 86(11), 2278-2324.

[^3]: Association for Computing Machinery. [2018 ACM A.M. Turing Award](https://amturing.acm.org/2018-turing-award.cfm). The award citation uses "conceptual and engineering breakthroughs that have made deep neural networks a critical component of computing" as the formal statement.

[^4]: Hochreiter, S. (1991). Untersuchungen zu dynamischen neuronalen Netzen. Diploma thesis, Technische Universität München. Hochreiter and Jürgen Schmidhuber's 1997 LSTM paper offered an architectural response to the problem in recurrent networks.

[^5]: Bengio, Y., Simard, P., and Frasconi, P. (1994). [Learning long-term dependencies with gradient descent is difficult](https://doi.org/10.1109/72.279181). *IEEE Transactions on Neural Networks*, 5(2), 157-166.

[^6]: Hinton, G.E., Osindero, S., and Teh, Y.W. (2006). [A fast learning algorithm for deep belief nets](https://doi.org/10.1162/neco.2006.18.7.1527). *Neural Computation*, 18(7), 1527-1554. Related work on stacked autoencoders appeared around the same time from Bengio's group.

[^7]: Nair, V. and Hinton, G.E. (2010). [Rectified linear units improve restricted Boltzmann machines](http://www.cs.toronto.edu/~hinton/absps/reluICML.pdf). *Proceedings of the 27th International Conference on Machine Learning*, 807-814. Glorot, X., Bordes, A., and Bengio, Y. (2011). [Deep sparse rectifier neural networks](https://proceedings.mlr.press/v15/glorot11a.html). *Proceedings of the 14th International Conference on Artificial Intelligence and Statistics*, 315-323.

[^8]: Glorot, X. and Bengio, Y. (2010). [Understanding the difficulty of training deep feedforward neural networks](https://proceedings.mlr.press/v9/glorot10a.html). *Proceedings of the 13th International Conference on Artificial Intelligence and Statistics*, 249-256.

[^9]: Hinton, G.E., Srivastava, N., Krizhevsky, A., Sutskever, I., and Salakhutdinov, R. (2012). [Improving neural networks by preventing co-adaptation of feature detectors](https://arxiv.org/abs/1207.0580). arXiv:1207.0580. Srivastava, N., Hinton, G., Krizhevsky, A., Sutskever, I., and Salakhutdinov, R. (2014). [Dropout: A simple way to prevent neural networks from overfitting](https://jmlr.org/papers/v15/srivastava14a.html). *Journal of Machine Learning Research*, 15, 1929-1958.

[^10]: NVIDIA. [CUDA toolkit](https://developer.nvidia.com/cuda-toolkit). CUDA was announced in 2006; version 1.0 of the toolkit was released in 2007.

[^11]: Deng, J., Dong, W., Socher, R., Li, L.J., Li, K., and Fei-Fei, L. (2009). [ImageNet: A large-scale hierarchical image database](https://doi.org/10.1109/CVPR.2009.5206848). *CVPR 2009*, 248-255.

[^12]: Russakovsky, O. et al. (2015). [ImageNet large scale visual recognition challenge](https://doi.org/10.1007/s11263-015-0816-y). *International Journal of Computer Vision*, 115(3), 211-252.

[^13]: Rumelhart, D.E., Hinton, G.E., and Williams, R.J. (1986). [Learning representations by back-propagating errors](https://doi.org/10.1038/323533a0). *Nature*, 323, 533-536.
