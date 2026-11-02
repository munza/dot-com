---
title: herdr-mods
summary: Standalone mods for Herdr Desktop that add native Git tools, workspace navigation and customisable tabs.
area: JavaScript
status: in-progress
repo: https://github.com/munza/herdr-mods
order: 2
---

## What it is

Independent mods for [Herdr Desktop](https://herdr.dev/). Each one is a standalone package: pick a mod and install only that, not a bundled workflow or a replacement layout.

## Why I built it

Herdr is where I run my coding agents, but working on the pull requests they produce meant leaving it for a terminal or the browser. These mods bring the Git and GitHub parts of that loop inside the app.

## What you get

- **Better Changes:** a Git changes sidebar with tree or flat lists, stage and unstage controls, and an inline or side-by-side diff tab.
- **Better Spaces:** spaces and nested worktrees with their Git branches and colour-coded pull-request status from the GitHub CLI.
- **Better Tabs:** a native tab bar with configurable action buttons, hooks, panel memory and responsive overflow.
- **GitHub PR:** a pull-request sidebar and browser tab with conversations, reviews, checks, worktrees and explicit agent actions.

## Get started

Paste this into your Herdr agent, with the folder of the mod you want:

```text
Read ~/.config/herdr-app/AGENTS.md, then add this mod: https://github.com/munza/herdr-mods/tree/main/<mod-folder>
```

The mods run on Herdr's native JavaScript runtime, so there is no Node.js at runtime. Each mod's README lists what it needs: Git, the GitHub CLI and Herdr's `hc` depending on the mod.

## Status

In progress. All four mods work and I use them daily; they track Herdr as it changes.
