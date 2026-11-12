# Blog posts

One folder per post. The folder name is the URL: `blogs/taste-doesnt-compile/` becomes `/blog/taste-doesnt-compile`.

```
blogs/
  my-post/
    index.md      the post
    figure.jpg    images, videos, PDFs: link them as ./figure.jpg
```

## index.md

```markdown
---
title: The title
date: 2026-11-12
description: One or two sentences for the blog list and search results.
tldr: Optional. Shown in italics under the byline.
draft: true
---

## First chapter

### A part of it

Text…
```

- `draft: true` shows the post on localhost and Vercel previews only. Set it to `false` to publish.
- Structure like the reference: a few long chapters. Every `##` opens a chapter with a full-width rule and an underlined heading. Use `###` (and `####`) inside a chapter; they have no lines. Do not write `---` for rules; the chapters add them.
- An image alone on a line becomes a figure. Its title becomes the caption: `![Alt text](./figure.jpg "Figure 1: The caption.")`
