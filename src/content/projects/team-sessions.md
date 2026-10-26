---
# The name is partly hidden: "▮" is a hidden letter. Keep the full name out of this repo.
title: "Ku▮▮▮▮▮▮"
summary: Facilitated team sessions, starting with retrospectives, where every observation can end as an action someone owns.
area: Elixir
status: in-progress
order: 2
---

## What it is

A tool for facilitated team sessions, starting with retrospectives. A session is an ordered agenda of blocks, and the facilitator moves the room through fixed phases, so every observation can end as a decision and an action someone owns:

```text
Observation → Discussion → Decision → Action → Follow-up
```

Open actions from one session open the team's next one, so follow-up is built in.

## Why I built it

[Two or three sentences on the problem it solves for you]

## What you get

- **No account needed:** open the site, start a retro and share one link. Signing in is optional and keeps your session history.
- **Rating and cards rounds:** rate how things went, write cards in private, reveal them together, group them by dragging and name the groups.
- **Votes and actions:** a vote budget per person, then actions with an optional owner from the room.
- **A timer that runs the round:** end early or extend; when it runs out, the round moves on.
- **A report to take away:** a read-only session and a Markdown report to copy or download.

## Built with

Elixir and Phoenix LiveView on Postgres. All live state is in the database, so a crash or a deploy loses nothing, and it runs across several machines unchanged.

## Status

In progress. The first version works end to end, including sign-in and phones; deploying it is next.
