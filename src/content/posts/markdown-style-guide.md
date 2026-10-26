---
title: Markdown style guide
description: Every Markdown element the theme styles, in one place.
pubDate: 2026-05-02
tags: [meta, guide]
---

Use this post to check the typography in light and dark mode.

## Headings

### Third level

#### Fourth level

## Text

Paragraphs can contain **bold**, _italic_, `inline code` and [links](https://astro.build).

> A blockquote. Keep quotes short.

## Lists

- An unordered item
- Another item
  - A nested item

1. An ordered item
2. Another item

## Code

```ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

## Table

| Element | Styled by                 |
| ------- | ------------------------- |
| Text    | browser defaults          |
| Tables  | `@layer base` rules       |
| Colors  | `--theme-*` CSS variables |

---

That's everything.
