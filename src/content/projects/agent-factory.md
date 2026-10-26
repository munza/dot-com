---
# The name is partly hidden: "▮" is a hidden letter. Keep the full name out of this repo.
title: "Mu▮▮▮▮▮"
summary: An AI agent factory for automated software development, from issue to reviewed pull request.
area: Agents
status: planned
order: 3
---

> **Early plans.** Everything on this page is subject to change while the design settles.

## What it is

An AI agent factory for automated software development. Instead of one coding agent you steer step by step, it runs work through a production line: a task goes in, specialised agents plan it, build it, test it and review it, and a pull request comes out for a person to approve.

## How it works

```text
Issue → Plan → Build → Test → Review → Pull request
```

- **Stations, not one agent:** each step has its own agent with its own instructions, tools and permissions, so a reviewer never edits code and a builder never merges.
- **Gates between stations:** work moves on only when it passes checks: the plan is approved, the build compiles, the tests pass, the review is clean.
- **Many lines at once:** each task runs in its own isolated workspace, so several can be built in parallel without stepping on each other.
- **People at the checkpoints:** a person approves the plan and the final pull request, and can stop or redirect a line at any station.

## Why I'm building it

Coding agents are good at single tasks but still need someone to plan, check and push every step along. A factory makes that the system's job: the steps, the checks and the hand-offs are defined once and run the same way every time.

## What you get

- **A repeatable pipeline** from issue to reviewed pull request.
- **Defined roles** for planning, building, testing and reviewing, each with only the access it needs.
- **Visible progress:** where every task is on the line, and why it stopped.
- **Quality gates** that use your existing tests and CI, not the agent's opinion of its own work.

## Status

Planned. Design first; the stations, gates and tooling above are expected to change.
