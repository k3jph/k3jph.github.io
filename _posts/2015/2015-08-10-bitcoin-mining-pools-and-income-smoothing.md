---
id: 2394
title: Bitcoin Mining Pools and Income Smoothing
date: 2015-08-10T07:37:24-04:00
author: k3jph
layout: post
permalink: /2015/08/10/bitcoin-mining-pools-and-income-smoothing/
image: /assets/images/9484489496_b6a28de91d_z.jpg
categories:
  - Blog
tags:
  - behavioral economics
  - bitcoin
  - insurance
  - microeconomics
---
Bitcoin's public awareness has dropped off, but there are interesting questions still to be resolved.  Bitcoin consists of a single network-wide database, called the blockchain, that contains verified transactions.  Transactions are recorded in blocks by "miners" who are incentivized to create record transactions by the payment of fees and awarding newly created bitcoin to the miner.[^nakamoto]  However, all miners work simultaneously on the same blocks.  Through a randomization process and a varying difficulty level, the bitcoin network targets creating a new block, along with a 50 bitcoin reward, to once every ten minutes.

As new participants join the bitcoin network, and industrial strength miners build out operations, the statistical likelihood of an individual bitcoin miner "winning" the block creation race goes down, effectively eliminating the value of the reward system.  Bitcoin mining pools were sooner organized wherein pool participants share resources and attempt to ensure that the winning block is a pool member.[^houy]  Regardless of who wins, the profits from the win are distributed amongst all pool participants, using some sharing scheme.[^rosenfeld] 

In the case of bitcoin, the mining pool participant is betting their expected gains are greater than the amount they would pay in independent mining during the mining lifetime. An independent miner is betting expected gains more than the gains from joining the pool. In both situations, neither party knows the outcome a priori but both have the opportunity to evaluate the relative risk. The betting analogy lends itself to understanding risk tolerance.[^nicholson]

Bitcoin mining pools are income smoothing tools.  When a participant starts bitcoin mining, the participant incurs expenses of both capital (equipment) and operating costs (energy and communications).  These costs are [latex]C_m[/latex], which is the sum of the operating expense and amortized capital cost to check a potential winning block.  Further, we will assume that the current difficult level is set so that there are [latex]p[/latex] winning blocks per potential block.  Finally, we will assume a reward of [latex]R[/latex] for every every winning block found.  Therefore, the profit, [latex]P_m[/latex], from each block checked is
<center>[latex]P_m = Rp - C_m \text{.}[/latex]</center>
Because of this relationship, the exchange rate of a bitcoin with, for instance, the dollar, should converge to the dollar cost of capital and operating expenses.

However, when [latex]p[/latex] is sufficiently small, a miner may have no realistic expectation of ever striking a winning block, even over many years of mining.  A miner may choose to increase the number of blocks mined simultaneously, by adding equipment.  However, on a per block-mined basis, there is a constant loss with the very rare profitable block.

When joining a pool, the situation is different.  Assuming, there are [latex]M[/latex] miners in pool, and costs are spread equally among all miners in the pool, then the pool's collective profit is,
<center>[latex]MP_m = MRp - MC_m \text{.}[/latex]</center>
And the individual miner's profit is,
<center>[latex]P_m = Rp - C_m - f\text{,}[/latex]</center>
where [latex]f[/latex] is the mining pool operator's fee.  This is less than the expected profit outside of the pool by the operator's fee.  However, the income comes more frequently and with even more increasing frequency as the size of the pool increases.  

This is essentially the inverse of why consumers purchase insurance.  If the insurance policy is actuarially fair, the annual expected losses with and without insurance are identical, but because the premium effectively extends the potential loss over the lifetime of the policy, the largest possible loss is minimized.  When an individual is risk-averse, they will purchase the insurance policy. Insurance is the smoothing of income for the policyholder, because it creates a regular and predictable expected loss in the premium, reducing its variance.  

Suppose a potential policyholder may purchase actuarially fair insurance, meaning the expected net pay-off is zero. If the policy is actuarially fair, a policyholder can pay a smaller amount in premiums regularly and will have a large loss compensated by the insurance policy. A non-policyholder would make no smaller payments, but no recourse for sudden or large losses, either. However, both have an expected value of $0.

With a bitcoin mining pool, a risk-averse participant will join the pool, to smooth income and provide current income against current expenses.  Others who are risk-seeking will choose to mine independently.  Further, it should be possible to establish a willingness-to-pay for the steady income stream by evaluating different pools, establishing their payment parameters, and modeling the demand curve.

[^nakamoto]: S. Nakamoto. Bitcoin: A Peer-to-Peer Electronic Cash System. http://bitcoin.org/bitcoin.pdf, 2009.
[^houy]: Houy, Nicolas, The Bitcoin Mining Game (March 11, 2014) [Available at SSRN](http://ssrn.com/abstract=2407834).
[^rosenfeld]: Meni Rosenfeld, Analysis of Bitcoin Pooled Mining Reward Systems, [Available at arXiV](http://arxiv.org/abs/1112.4980).]
[^nicholson]: Walter Nicholson, _Microeconomic Theory: Basic Principles and Extensions_, Ninth Ed., Thomson South-Western College Pub, 2004, p. 539-541.

_Image by [Jonathan Waller / Flickr](https://www.flickr.com/photos/whitez/9484489496)._
