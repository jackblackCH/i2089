---
title: How a post looks on this blog
date: 2026-11-12
description: A draft that shows every element a post can use, to check type, spacing and proportions.
tldr: This is a layout test, not a real post. It shows headings, paragraphs, lists, a quote, code and a figure with a caption, so each element can be checked against the reference proportions.
draft: true
---

## Introduction

Like the reference, the post starts with a chapter right after the tl;dr. Every chapter opens with a rule across the full page, then its heading with a thin line under it, as wide as the text. A post has a few long chapters, not many short ones.

A second paragraph shows the space between two paragraphs: one empty line of the body size, so the text reads as one calm column.

### A smaller heading

Smaller headings group a few paragraphs inside a section. They have more space above than below, so they belong to the text that follows.

1. An ordered list keeps steps in sequence.
2. Each item can run over more than one line, and the second line aligns with the text of the first, not with the number.
3. The last item closes the list.

- An unordered list works the same way.
- Items have a little space between them.

> A quote sets an outside voice apart from the text around it.

Inline `code` looks like this, and a code block like this:

```ts
export function hello(name: string) {
  return `Hello, ${name}`;
}
```

## A second chapter

Images sit in the post's own folder and are linked relative to it, like ./calculator.jpg.

![The SME calculator on axa.ch.](./calculator.jpg "Figure 1: A figure spans the text column. Its caption sits right below it, smaller and lighter than the body text.")

The text continues after the figure with the normal paragraph spacing.
