---
title: dotfiles
summary: My Nix configuration for macOS, set up so anyone can fork it and make it their own.
area: Nix
status: in-progress
repo: https://github.com/munza/dotfiles
site: https://munza.github.io/dotfiles/
order: 1
---

## What it is

My Nix configuration for macOS: nix-darwin and home-manager from a single flake, set up so anyone can fork it and make it their own.

## Why I built it

Setting up a new machine or onboarding a new teammate still takes days of copying dotfiles and chasing versions. With Nix flakes the whole environment is declared once and reproduced anywhere. I wrote about the basics in [Nix on macOS: A Pragmatic Setup Guide](https://medium.com/@munza/nix-on-macos-a-pragmatic-setup-guide-374b7982a77d); this is the ready-to-fork version.

## What you get

- **A shell that's ready on day one:** zsh, git with delta, the GitHub CLI, starship, fzf, zoxide, eza and direnv, all on by default.
- **Modules you switch on or off:** each tool is a module, enabled with `dotfiles.<name>.enable`, including Ghostty, Zed, Neovim, AeroSpace, herdr, Colima, lazygit and more.
- **Coding agents included:** the Pi agent, and agent skills for Pi and Claude Code, refreshed on every switch.
- **A safer Mac:** Touch ID for `sudo`, firewall on, no guest login, and secrets kept in a local env file or with sops.
- **Easy rebuilds:** nh shows a package diff before every switch, and rollback is one command.

## Get started

Fork the repo, clone it into `~/.dotfiles`, copy the example host and switch. The full steps, with every command ready to copy, are at [munza.github.io/dotfiles](https://munza.github.io/dotfiles/).

```sh
git clone https://github.com/<you>/dotfiles.git ~/.dotfiles
cd ~/.dotfiles
cp -r hosts/example "hosts/$(scutil --get LocalHostName)"
```

## Status

In progress. It runs my own Mac every day; macOS on Apple silicon only for now.
