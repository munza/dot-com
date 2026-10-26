---
title: What a year of on-call taught me about alerts
description: Most of our pages were noise. Fewer, symptom-based alerts made nights quieter and incidents shorter.
pubDate: 2026-09-12
tags: [operations, teams]
heroImage: "@/assets/posts/on-call-alerts-cover.png"
heroImageAlt: Abstract grey landscape with a pale sun
---

Last year our team of six shared a single on-call rotation for eleven services. In the first month we got 214 pages. Fewer than 30 needed a human.

## Page on symptoms, not causes

Most of our alerts watched causes: CPU above 80%, a queue longer than 1,000 messages, a pod restarting. None of those mean a customer is affected. We replaced them with three questions per service:

1. Are requests failing?
2. Are requests slow?
3. Is work piling up faster than we finish it?

Everything else became a dashboard or a ticket, not a page.

## Every page needs a next step

If the person woken at 3 a.m. can't act on an alert, it shouldn't wake them. Each alert now links to a short runbook with the first three things to check. Writing those runbooks deleted another dozen alerts: when we couldn't write the first step, we didn't need the page.

## The result

By the end of the year we were down to about 20 pages a month, and the median time to resolve an incident dropped from 50 minutes to 18. The rotation stopped being something people traded away.
