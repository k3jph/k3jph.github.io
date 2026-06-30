---
title: Attention Is All You Need
date: 2026-07-01
author: k3jph
layout: post
permalink: /2026/07/01/attention-is-all-you-need/
featured_image: /assets/img/2026/attention-is-all-you-need.webp
categories:
  - Blog
tags:
  - artificial intelligence
  - machine learning
  - deep learning
  - transformers
  - large language models
  - AI history
---

In June 2017, eight researchers associated with Google posted a
paper on machine translation. Its title, ["Attention Is All You
Need,"](https://arxiv.org/abs/1706.03762) was a provocation
directed at the field's dominant architectures for sequence
processing.[^1] The paper proposed dispensing with recurrence
entirely and building a model from attention mechanisms alone.
On the WMT 2014 English-German and English-French translation
benchmarks, the results were state of the art, and the models
required less training time than the strongest systems they were
compared against.

No one announced that the architecture for the next era of
artificial intelligence had arrived. It had, but the announcement
came later, from elsewhere, and in a form nobody was quite
expecting.

## The Problem with Sequences

To understand what the transformer solved, it helps to understand
what it replaced.

Recurrent neural networks process sequences one element at a time.
At each step, the network takes the current input and its own
previous state, produces an output, and passes the updated state
forward. After processing a long sequence, the final state is
supposed to encode everything the network needs to remember about
what came before. In practice, information from early in the
sequence tends to be diluted or lost by the time the network
finishes.

Long short-term memory networks, introduced by Hochreiter and
Schmidhuber in 1997, used gating mechanisms to give the network
more control over what to retain and what to discard.[^2] LSTMs
substantially improved performance on tasks requiring longer
dependencies and became the standard architecture for language
modeling, speech recognition, and machine translation through
the mid-2010s. They were also inherently sequential: you could
not process token ten until you had processed tokens one through
nine. This made training slow on modern parallel hardware.

Dzmitry Bahdanau, Kyunghyun Cho, and Yoshua Bengio had shown in
2014 that you could improve translation quality by letting the
network look back at the source sentence while generating each
token of the translation, weighting source tokens by their
relevance to the current output position.[^3] This attention
mechanism improved results significantly, especially for long
sentences. Vaswani and colleagues asked what would happen if you
made attention the entire architecture.

## The Attention Mechanism

The transformer's core operation is scaled dot-product attention.
Given a set of queries, keys, and values, the mechanism computes
a weighted sum of the values, where the weight on each value is
determined by how well the corresponding key matches the query.

In encoder self-attention, every position in a sequence can
communicate directly with every other position, weighted by
learned relevance. A token can attend to a pronoun ten positions
earlier, a verb thirty positions later, or a parallel construction
anywhere in the input, without information passing through every
intermediate token. In the decoder, future positions are masked
during generation to prevent attending to tokens not yet produced,
but the core advantage remains: long-range dependencies become
much easier to model than they were in recurrent architectures.

The transformer uses multi-head attention: it runs several
attention operations in parallel, each potentially capturing
different kinds of relationships, and concatenates the results.
Self-attention applies the mechanism to a sequence attending to
itself, letting each position incorporate context from the rest
of the sequence before any task-specific processing occurs.

Since the transformer has no recurrence, it has no built-in
sense of order. Positional encodings, added to the input
representations, provide that information. The encoder and
decoder in the original architecture each stack multiple
self-attention and feedforward layers, producing a model that
could be trained in parallel across the full sequence rather
than step by step.

The translation quality was better. The training was faster.
The architecture was adopted quickly.

## Pre-training and the Language Modeling Insight

What transformed the transformer from a better translation
system into the foundation of a new era was a series of
decisions about how to train it.

The key insight was that predicting text is a remarkably
general pretraining task. A model trained to predict the
next token in a large corpus of text has to develop
representations of syntax, semantics, factual knowledge,
and reasoning patterns, not because anyone specified these
as objectives, but because they are useful for predicting
text. The richer the model's internal representation, the
better it predicts.

OpenAI's GPT-1, described in a 2018 technical report,
combined the transformer architecture with pretraining on
a large text corpus followed by fine-tuning on specific
tasks.[^4] The results on several natural language benchmarks
were competitive with task-specific models, and the approach
required less labeled data for each task. The general
pretraining was doing substantial work.

Google's BERT, posted to arXiv in late 2018 and published in 2019, used a bidirectional
variant: rather than predicting the next token, it trained
by predicting masked tokens anywhere in the sequence, using
context from both directions.[^5] BERT set new records on
a wide range of language understanding benchmarks and became
the dominant approach for applied natural language processing
for several years.

The two approaches, generative left-to-right modeling in the
GPT family and masked bidirectional modeling in BERT, explored
different parts of the design space. Both demonstrated that
scale mattered in a way the field had not fully anticipated.

## Scaling

In 2020, researchers at OpenAI published an empirical study
of how language model performance changes with scale.[^6] The
finding was clean and surprising: test loss improved as a smooth power law with model size,
dataset size, and training compute. Across the range they
studied, spanning several orders of magnitude, the curves did
not show an obvious break from smooth improvement. Bigger models
trained with more compute produced better results, predictably.

This scaling hypothesis became the organizing principle of the
subsequent years. If performance follows a power law, then the
path to better models is more compute, more data, and more
parameters, with architectural innovation as a secondary concern.
GPT-3, also from OpenAI in 2020, pushed the model to 175 billion
parameters and demonstrated something new: few-shot learning.[^7]
Given a handful of examples of a task within the prompt itself,
GPT-3 could perform the task without any fine-tuning. The model
appeared to learn from context at inference time, not only during
training.

Later analysis complicated the scaling story. Hoffmann and
colleagues at DeepMind found in 2022 that existing large models
were undertrained relative to their parameter counts: given a
fixed computational budget, you get better results by training
a smaller model on more data than by training a larger model
on less.[^8] Their Chinchilla model, with 70 billion parameters roughly 40
percent the size of GPT-3, outperformed it by training on
substantially more text. The simple scaling story had an important correction: the
right ratio of data to parameters matters, not just the total.

## ChatGPT

On November 30, 2022, OpenAI released ChatGPT as a research
preview. It was an instruction-tuned version of GPT-3.5,
trained further with reinforcement learning from human feedback
to follow instructions, give helpful responses, and decline
certain requests.[^9] The technical advances were real but not
dramatic relative to GPT-3. What changed was the interface.

ChatGPT was the first large language model that general audiences
could use in a sustained way without technical expertise. Within two months it was estimated to have reached one hundred
million monthly active users, the fastest consumer application
growth ever recorded at that point. The public conversation
about artificial intelligence, which had been primarily among
researchers and technologists, became general.

The responses on difficult topics were inconsistent in ways that
matched neither the "this is just autocomplete" dismissal nor
the "this understands everything" enthusiasm. The system could
write legal briefs, generate functional code, explain quantum
mechanics, and then confidently state false facts. It could
maintain a consistent persona across a long conversation and
then lose track of a simple constraint stated earlier. It was,
by any measure, something new, and characterizing it precisely
turned out to be difficult.

## What These Models Are

A large language model is a function that takes a sequence of
tokens and assigns probabilities to possible next tokens. During
training, it adjusts its parameters to make the probability of
the actual next token as high as possible, across billions of
examples. After training, it generates text by sampling from
those probabilities, one token at a time.

This description is accurate and does not fully characterize
what the models do. The same description applies to a much
simpler system that would fail catastrophically on the tasks
these models perform. The question of what enables the
capability is genuinely contested.

One position holds that sufficiently large models trained on
sufficiently diverse text develop compressed representations
of the structure of language, reasoning patterns, and factual
content that are qualitatively different from simple pattern
matching. The representations are implicit, distributed across
billions of parameters, and not accessible to inspection in
any straightforward way.

Another position holds that the models are doing something more
like sophisticated interpolation over their training data, that
apparent reasoning is the retrieval and recombination of
memorized patterns, and that genuine generalization to truly
novel situations is more limited than the impressive surface
performance suggests.

The disagreement is not settled. Both positions have supportive
evidence and acknowledged weaknesses. What is clear is that
these systems do things no previous software could do at scale,
and that understanding exactly how they do those things is an
open problem.

The question of whether capabilities that emerge at scale
represent genuine novelty or artifacts of measurement has also
proved contested. A 2022 paper documented what appeared to be
abrupt capability gains at particular scale thresholds.[^10]
Subsequent analysis argued that the apparent discontinuities
depended on the choice of metric: using different but equally
reasonable measures of performance, the gains appeared
gradual.[^11] The empirical question of how capability scales
with model size remains active.

## The Architecture Is Not the Answer

The transformer architecture is now ubiquitous in a way that
is easy to forget arrived very recently. Transformer-based or attention-heavy architectures now appear
across text, images, audio, video, protein structure prediction,
weather modeling, and code. The combination of large-scale pretraining and task-specific
adaptation that GPT-1 demonstrated has become one of the central
recipes of modern foundation-model work.

What the transformer does not do is resolve the questions
that have run through this entire history. It does not tell
us whether performance on benchmarks translates to genuine
understanding. It does not tell us where the scaling curve
ends or what capability ceilings look like. It does not tell
us which behaviors are reliable enough to trust and which
will fail in ways that surface only in deployment.

Those are the questions the next set of researchers is
working on. The architecture gave them a tool powerful enough
to make the questions urgent.

[^1]: Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, L., and Polosukhin, I. (2017). Attention is all you need. *Advances in Neural Information Processing Systems*, 30. arXiv:1706.03762. The paper appeared at NeurIPS 2017. The work was primarily done at Google Brain and Google Research.

[^2]: Hochreiter, S. and Schmidhuber, J. (1997). [Long short-term memory](https://doi.org/10.1162/neco.1997.9.8.1735). *Neural Computation*, 9(8), 1735-1780. LSTMs addressed the vanishing gradient problem in recurrent networks by introducing gating mechanisms that allowed the network to learn what to remember and what to forget over time. They remained the standard architecture for sequential data until transformers displaced them.

[^3]: Bahdanau, D., Cho, K., and Bengio, Y. (2014). [Neural machine translation by jointly learning to align and translate](https://arxiv.org/abs/1409.0473). arXiv:1409.0473. The attention mechanism described in this paper was not the same as transformer self-attention, but it established the key idea that a model could selectively weight different parts of its input at each step of output generation.

[^4]: Radford, A., Narasimhan, K., Salimans, T., and Sutskever, I. (2018). [Improving language understanding by generative pre-training](https://openai.com/research/language-unsupervised). OpenAI technical report. GPT-1 had 117 million parameters, trained on the BooksCorpus dataset. Its performance on several benchmarks after fine-tuning exceeded task-specific models trained from scratch.

[^5]: Devlin, J., Chang, M.W., Lee, K., and Toutanova, K. (2019). [BERT: Pre-training of deep bidirectional transformers for language understanding](https://arxiv.org/abs/1810.04805). arXiv:1810.04805. BERT's bidirectional pretraining required masking tokens at random positions rather than predicting left-to-right, which gave it access to context from both directions when filling in each masked position.

[^6]: Kaplan, J. et al. (2020). [Scaling laws for neural language models](https://arxiv.org/abs/2001.08361). arXiv:2001.08361. The paper studied models ranging from 768 parameters to 1.5 billion parameters and found that test loss followed a power law in compute, dataset size, and parameter count, with no observed deviation from smooth improvement across that range.

[^7]: Brown, T. et al. (2020). [Language models are few-shot learners](https://arxiv.org/abs/2005.14165). *Advances in Neural Information Processing Systems*, 33. GPT-3's few-shot performance, competitive with fine-tuned task-specific models on many benchmarks, raised questions about what large-scale pretraining was learning and how.

[^8]: Hoffmann, J. et al. (2022). [Training compute-optimal large language models](https://arxiv.org/abs/2203.15556). arXiv:2203.15556. The Chinchilla finding that most large models of the era were undertrained relative to their parameter count led to a recalibration of training recipes. Subsequent models across the industry trained on substantially more data relative to model size.

[^9]: Ouyang, L. et al. (2022). [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155). arXiv:2203.02155. Reuters reported ChatGPT was estimated to reach 100 million monthly active users in January 2023 based on a UBS analyst note, making it the fastest-growing consumer application ever at that point. The reinforcement learning from human feedback technique used in ChatGPT trains a reward model from human preferences, then uses that reward model to fine-tune the language model to produce preferred outputs.

[^10]: Wei, J. et al. (2022). [Emergent abilities of large language models](https://arxiv.org/abs/2206.07682). *Transactions on Machine Learning Research*. The paper documented tasks on which model performance remained near chance until a certain scale threshold, then improved substantially.

[^11]: Schaeffer, R., Miranda, B., and Koyejo, S. (2023). [Are emergent abilities of large language models a mirage?](https://arxiv.org/abs/2304.15004). arXiv:2304.15004. The paper showed that apparent emergence depended on the choice of metric: nonlinear metrics that change discontinuously near the performance threshold produce apparent emergence even from smoothly scaling capabilities.
