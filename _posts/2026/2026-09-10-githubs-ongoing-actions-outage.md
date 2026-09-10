---
id: githubs-ongoing-actions-outage
title: "GitHub's Ongoing Actions Outage"
date: 2026-09-10
author: k3jph
layout: post
permalink: /2026/09/10/githubs-ongoing-actions-outage/
featured_image: /assets/img/2026/githubs-ongoing-actions-outage.webp
categories:
  - Blog
tags:
  - GitHub
  - GitHub Actions
  - automation
  - DevOps
  - software reliability
---

For the past couple of weeks, I have been conducting an unintended experiment in the reliability of GitHub Actions.

I have two small production systems that are almost offensively well suited to GitHub Actions. They are self-contained. They live in GitHub. Their state lives in GitHub. They do not need persistent servers. They wake up on a schedule, do some work, write their state back, and go away.

One runs once each morning. The other runs twice a day.

Or at least they are supposed to.

Beginning around August 26, GitHub Actions scheduled workflows started behaving as though the cron expressions were gentle suggestions. A job scheduled for 6:30 in the morning might appear before lunch. Or late in the afternoon. Or, sometimes, not at all.

I eventually gave up and moved the clock outside GitHub. ChatGPT Work now wakes up at the appointed times, logs into GitHub, and invokes the exact same workflows manually through `workflow_dispatch`.

That works.

Which is useful operationally, but architecturally ridiculous. GitHub Actions already has a scheduler. This should be self-contained.

And so there are three questions I would very much like GitHub to answer.

## What is going wrong?

There is now quite a lot of evidence that this is not ordinary runner congestion.

My own systems show the progression clearly.

Krigsbot is supposed to start at 6:30 AM Eastern. Before the trouble, its runs were imperfect but recognizable: 6:47, 6:54, 6:59. That is irritating, but it is within the world GitHub documents as best-effort scheduling.

Then things changed.

On August 27, the 6:30 AM workflow did not actually begin its work until about **4:37 PM**, more than ten hours late. On August 29 it arrived around **11:10 AM**. On August 30, around **10:54 AM**.

JHBot showed the same deterioration independently. It is scheduled for 10:30 AM and 3:30 PM. On August 26 those runs appeared at roughly noon and 6:25 PM. Subsequent scheduled executions wandered even further.

Nothing important had changed in either bot. Manual workflow dispatches still worked.

And other GitHub users began reporting almost precisely the same thing.

One particularly useful report documents a scheduled workflow going from **39 minutes late**, to **3 hours 27 minutes late**, to **10 hours 41 minutes late**, and then to scheduled events that simply never produced a workflow run at all. Manual `workflow_dispatch` continued to create runs immediately.

Another report covers multiple repositories using cron minutes 15, 23, 38, and 47. The scheduled runs disappeared while manual dispatch still worked. That matters because it substantially weakens the familiar explanation that everybody schedules jobs at the top of the hour and overloads the system.

A third report is especially revealing because the user compared GitHub's API timestamps. For the strangely timed scheduled runs, `created_at` and `run_started_at` were effectively identical.

In other words, once GitHub created the workflow run, it started immediately.

The hours of delay happened before the run object existed.

That points upstream of runner allocation, toward the machinery responsible for materializing scheduled events in the first place.

And the reports have not stopped.

On September 6, another user reported an active workflow on the default branch, Actions enabled, unused Actions minutes available, and scheduled events producing no workflow runs.

On September 8, a user reported an hourly workflow missing five consecutive scheduled executions at 1:17, 2:17, 3:17, 4:17, and 5:17 PM. Again, manual `workflow_dispatch` worked. Again, there were no failed or queued scheduled runs.

The run objects simply did not exist.

There is also a rather interesting historical clue.

GitHub had a serious Actions incident on August 26. In its own postmortem, GitHub said the incident was triggered by saturation of writes to **the database primary used by the service processing triggers for Actions workflows**, compounded by an upstream event-processing problem. Jobs initially failed to start and delayed queues persisted for hours afterward.

Later that same day, GitHub reported another Actions incident in which some workflows failed to trigger at all. That incident was described specifically in connection with pull-request-triggered workflows, so it would be irresponsible to claim it directly caused the cron problem.

But the timing and the affected layer are difficult to ignore.

That leaves us with a fairly strong working hypothesis:

**Something in GitHub's scheduled-event materialization or trigger-processing infrastructure appears to have become unreliable around the August 26 Actions incidents.**

That is an inference, not a confirmed GitHub root cause.

But "your runners are busy" does not explain workflow runs that do not exist.

## When will it be fixed?

Nobody outside GitHub appears to know.

As of September 10, GitHub Status says:

**All Systems Operational.**

Actions is specifically marked operational. September 9 shows no incident. September 10 shows no incident.

GitHub's September 3 Actions changelog discusses new runner deprecation APIs, a new `GITHUB_TOKEN` permission, and reusable-workflow context properties. There is no mention of a scheduled-workflow incident, cron regression, mitigation, or forthcoming scheduler repair.

The relevant Community threads remain largely unanswered. Several have received the automated GitHub bot response thanking users for their "invaluable" feedback, but there is no public diagnosis and no ETA.

So the answer today is simply:

**There is no public ETA because GitHub has not publicly acknowledged this as an ongoing incident.**

That is a problem in itself.

## Why are they telling us nothing is wrong?

This is the question that interests me most.

GitHub's documentation does warn that scheduled workflows can be delayed under high Actions load. It even says that, under sufficiently high load, some queued jobs may be dropped. GitHub recommends avoiding heavily contested times such as the beginning of the hour.

Fair enough.

But there is a meaningful difference between:

"Your 6:30 job may run at 6:42."

and:

"Your 6:30 job may run at 4:37 PM, or tomorrow, or never produce a workflow run at all."

The latter is not scheduler jitter in any useful engineering sense.

Nor can this particular case be dismissed as an obsolete timezone configuration. GitHub added official IANA timezone support to scheduled workflows in March 2026, explicitly documenting syntax such as `timezone: "America/New_York"`.

The charitable explanation is that GitHub Status measures broad service health and this failure mode affects too small a slice of Actions traffic to cross whatever threshold creates an incident. It may also be that the scheduled-event subsystem is not separately represented in GitHub's public status model.

That would explain the green light.

It would not make the green light particularly useful to someone whose scheduled workflows have stopped scheduling.

And that is really the issue.

A status page is not merely a historical accounting system for major outages. It is part of the operational interface between a service provider and people attempting to determine whether they should debug their own systems.

When GitHub tells me Actions is operational, I naturally start looking at my YAML, my branch configuration, my concurrency policy, my credentials, my account limits, and my code.

So did everyone else reporting this problem.

They changed cron minutes. They re-enabled workflows. They made trivial commits. They checked the default branch. They checked their remaining Actions minutes. They manually dispatched the same workflow.

And eventually they discovered the same strange fact:

**The workflow works. GitHub just isn't waking it up.**

That distinction matters.

We can work around a broken scheduler. We did. But before we build compensating infrastructure around a platform failure, it would be nice to know three things:

**What is broken?**

**When will it be fixed?**

**And why, while users continue reporting the same reproducible failure, does GitHub continue telling us that nothing is wrong?**

Until then, my scheduled workflows will continue running on an external clock.

GitHub Actions, apparently, is operating on Microsoft Standard Time.
