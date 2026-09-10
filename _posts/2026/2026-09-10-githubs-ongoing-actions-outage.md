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

I have two little production systems running in GitHub Actions. One, Krigsbot, wakes up every morning, looks for environmental and polar news, makes some editorial decisions, and queues a day's worth of posts. The other, JHBot, does roughly the same thing with AI and technology news twice a day. They are exactly the sort of applications for which GitHub Actions ought to be ideal: the code is already in GitHub, the state is in GitHub, they need no persistent server, and once the job finishes they disappear until the next scheduled run.

At least, that was the theory.

Beginning in late August, the schedules started drifting. Not by a few minutes, which I would not have thought much about. GitHub has always been quite clear that scheduled Actions are best-effort, and its documentation specifically warns that they can be delayed when the service is busy. My jobs were already scheduled away from the top of the hour, which is GitHub's principal recommendation for avoiding that problem. A 6:30 job turning up at 6:47 is annoying but unsurprising. A 6:30 job turning up at 4:37 in the afternoon is something else.

That happened to Krigsbot on August 27. It was supposed to run at 6:30 AM Eastern. Instead, the actual newsroom process started at about 4:37 PM, roughly ten hours late. By that point most of the deterministic publication schedule it had calculated for the day was already in the past. The bot did the right thing and refused to silently move those posts into the evening, but it was a useful demonstration that something rather more interesting than ordinary queue congestion was happening.

JHBot began doing the same thing. Its jobs are scheduled for 10:30 AM and 3:30 PM Eastern. They had previously been arriving within tens of minutes of those times. Then the morning and afternoon jobs started appearing hours late. Eventually some scheduled runs did not appear at all. The workflows themselves remained healthy; firing the same workflows through `workflow_dispatch` worked promptly.

At first I assumed I had screwed something up. That is generally the correct first assumption when one's software begins behaving strangely. I checked the cron expressions. I checked the default branches. I checked concurrency. I checked whether the workflows had been disabled. I checked the timezone declarations. GitHub added official IANA timezone support for scheduled workflows in March 2026, and the syntax I was using, `timezone: "America/New_York"`, is the syntax GitHub itself documents. [GitHub's March 2026 timezone announcement](https://github.blog/changelog/2026-03-19-github-actions-late-march-2026-updates/?utm_source=chatgpt.com)

The code was fine.  Then I went looking to see whether anyone else was seeing it.  They were.

## What is going wrong?

The most useful report I found was filed on August 27. The user had two daily cron schedules that had been working normally, with the usual 15-to-40-minute GitHub lateness. Then, on August 26, one run appeared 39 minutes late. The next appeared 3 hours and 27 minutes late. The following one appeared 10 hours and 41 minutes late. After that, scheduled runs simply stopped being created. Manual `workflow_dispatch` runs of the same workflow continued to start within seconds. [Scheduled cron workflows stopped firing since August 26, GitHub Community discussion #206019](https://github.com/orgs/community/discussions/206019?utm_source=chatgpt.com)

That progression got my attention because it is almost comically close to what I had just watched happen to my own two repositories.

More reports followed. Another user reported multiple repositories affected at once, with schedules at minutes 15, 23, 38, and 47. That is useful because it makes the usual "everybody runs jobs at the top of the hour" explanation considerably less persuasive. These were already scattered across the hour, and yet the scheduled runs stopped materializing while manual dispatch continued to work. [Multiple repositories affected by missing scheduled runs, discussion #206134](https://github.com/orgs/community/discussions/206134?utm_source=chatgpt.com)

A particularly interesting report appeared on August 31 because the user looked at the GitHub API timestamps instead of just the Actions page. For affected runs, `created_at` and `run_started_at` were effectively identical. Once GitHub created the workflow run, the runner began executing it immediately. The missing time was before the run existed. In other words, this did not look like a job sitting in a runner queue for several hours. It looked like the scheduler had failed to create the scheduled event at the scheduled time. [Scheduler timing drift after August 26–27, discussion #206287](https://github.com/orgs/community/discussions/206287?utm_source=chatgpt.com)

That distinction is fairly important. If a run exists at 6:30 and sits queued until noon, I know where to look. There is a run. There is a queue. There is potentially a runner-capacity problem. If nothing exists at 6:30, and then at 4:37 GitHub suddenly creates the run and starts it immediately, the problem is somewhere earlier in the control plane. The runner cannot be responsible for a workflow run that GitHub has not yet created.

The reports have also continued well after the August incidents were supposedly resolved. On September 6, another user reported an enabled scheduled workflow on the default branch, with Actions enabled and unused Actions minutes available, for which no scheduled workflow runs were being created. [Scheduled workflow enabled but no runs created, discussion #206984](https://github.com/orgs/community/discussions/206984?utm_source=chatgpt.com)

On September 8, somebody reported an hourly job scheduled at minute 17 that missed five consecutive runs at 1:17, 2:17, 3:17, 4:17, and 5:17 PM. There were no failed runs, no queued runs, no cancelled runs and no skipped runs. There were simply no runs. The user manually invoked the same workflow at 12:33 PM and it completed successfully. [Hourly scheduled workflow skipping consecutive triggers, discussion #207247](https://github.com/orgs/community/discussions/207247?utm_source=chatgpt.com)

So whatever this is, it is not just me, it is not just one repository, it is not just one cron expression, and it did not end on August 27.

There is another piece of evidence that may or may not be related, but it is difficult to ignore. GitHub had a significant Actions incident on August 26. In its own postmortem, GitHub said that Actions jobs failed to start between 15:02 and 15:45 UTC and that delayed load continued to affect the service until 17:40 UTC. More interestingly, GitHub identified the trigger as saturation of writes to "the database primary used by the service processing triggers for Actions workflows," together with an upstream problem in GitHub's event-processing infrastructure. [GitHub Status incident report for August 26](https://www.githubstatus.com/?utm_source=chatgpt.com)

Later that day GitHub had a second Actions incident. That one involved pull-request-triggered workflows, and GitHub reported that some runs were delayed and up to four percent failed to trigger. I am not claiming that either incident caused the continuing cron problem; I have no access to GitHub's internal architecture, and correlation is not a root-cause analysis. What I am saying is that a cluster of users began reporting delayed and missing scheduled triggers at almost exactly the same time GitHub acknowledged serious problems in the machinery that processes Actions workflow triggers.

That seems worth asking about.

My working hypothesis, based on the evidence we can actually see, is that there is or was a failure somewhere in scheduled-event registration or materialization. I would be quite happy to be told that hypothesis is wrong. In fact, that is the first question I would like GitHub to answer: what the hell is actually going wrong?

## When will it be fixed?

This question is much easier to answer.  I have no idea.  Neither, apparently, does anyone in the GitHub Community threads.

The reports are mostly still marked unanswered. The response users receive is generally the GitHub Actions bot thanking them for their "invaluable" product feedback and explaining that GitHub may or may not get back to them. That is pleasant enough, but it is not an incident acknowledgement, a diagnosis, a workaround or an estimated repair date.

Meanwhile, GitHub's own status page currently says "All Systems Operational." Actions is specifically shown as operational. As of September 10, GitHub reports no Actions incident on September 5, 6, 7, 8, 9 or 10. [GitHub Status](https://www.githubstatus.com/?utm_source=chatgpt.com)

That leaves users in a slightly absurd position. There is a current September 8 bug report showing five consecutive scheduled events failing to produce workflow runs. There are several earlier reports with the same symptoms across multiple repositories. There is no public indication that GitHub regards this as an active problem, and therefore no public indication of when it expects the problem to be fixed.

I can build around that. I already have. But "we have no ETA because officially there is no incident" is not especially satisfying.

##  Why are they telling us nothing is wrong?

This is actually the more interesting question.

GitHub's documentation gives itself quite a lot of room on scheduled workflows. It says that scheduled events can be delayed during periods of high Actions load, particularly at the start of the hour, and that under sufficiently high load some queued jobs may be dropped. It recommends choosing a different minute of the hour to reduce the chance of delay. [GitHub's documentation on scheduled-workflow delays](https://docs.github.com/en/actions/how-tos/troubleshoot-workflows?utm_source=chatgpt.com)

I have no objection to that contract. GitHub Actions is not a hard-real-time operating system, and nobody sensible expects a hosted CI scheduler to offer atomic-clock precision. If I schedule something for 6:30 and GitHub starts it at 6:42, life will continue.  But that does not adequately describe what users are reporting.

A run that begins ten hours late is not meaningfully "delayed" for many scheduled applications. A scheduled event that never results in a workflow run is not a runner waiting in a busy queue. And when users can invoke the exact same workflow manually and have it start immediately, telling them to move their cron expression away from the top of the hour is not much of an explanation.  This is where the status page becomes part of the problem.

Status pages are not merely scoreboards. They are diagnostic tools. When a service I depend upon behaves strangely, one of the first things I do is check the provider's status page. If GitHub tells me Actions is healthy, I quite reasonably assume that the problem is probably mine. I then spend my time checking configuration, permissions, branches, account limits, cron expressions, concurrency rules and whatever else I may have managed to break.

That is exactly what a number of people in these Community threads did. The result of their troubleshooting is remarkably consistent: the workflow is enabled, the workflow is on the default branch, the cron expression is valid, Actions is available, and `workflow_dispatch` works. What does not work reliably is the scheduled trigger.

The charitable explanation is that the affected population is small enough that it does not cross GitHub's threshold for declaring an incident. It is also possible that GitHub's public Actions status aggregates several internal services and does not separately measure the health of scheduled-event processing. Either of those could produce a green status page while a subset of scheduled workflows are failing.  If that is the explanation, GitHub should say so.

At the moment, though, users have a collection of reproducible reports, a very suspicious start date, evidence that the delay occurs before workflow-run creation, continued failures into September, and an official status page that says Actions is operational.

Those facts do not fit together particularly well.

I ultimately worked around the problem by doing something I should not have needed to do. I disabled the production effect of GitHub's native cron triggers and moved the clock outside GitHub. At 6:30 in the morning, and again at the two times required by the second bot, an external scheduler invokes the existing GitHub workflows through `workflow_dispatch`. Nothing else changed. Same repositories, same workflows, same GitHub-hosted runners, same Actions infrastructure.  Those runs start when they are told to.

So, yes, I have a workaround. I would still prefer to remove it. These applications belong entirely inside GitHub Actions, and there is no architectural reason for them to depend on another service merely to tell GitHub that 6:30 AM has occurred.

For now I have three fairly simple questions.  What is going wrong with scheduled GitHub Actions?  When will it be fixed?  And why, while users continue to document delayed and completely missing scheduled runs, does GitHub's status page continue to tell us that Actions is operational?

Until somebody answers those, I suppose we are all on Microsoft Standard Time.
