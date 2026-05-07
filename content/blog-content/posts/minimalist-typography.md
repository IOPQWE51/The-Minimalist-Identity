---
title: "Minimalist Typography: Less Is More"
date: "2026-05-04"
tags: ["Design", "Typography"]
excerpt: "How to create beautiful, readable typography systems with just two fonts and a few well-chosen sizes."
author: "Aura"
---

# Minimalist Typography

Typography is the foundation of interface design. Get it right, and everything else falls into place.

## The Two-Font Rule

Every project needs at most two typefaces:

1. **A sans-serif** for UI elements and body text
2. **A serif** for headings and display text

That's it. No exceptions.

```css
--font-sans: "Geist", system-ui, sans-serif;
--font-serif: "Playfair Display", Georgia, serif;
```

## Size Scale

A minimalist type scale uses fewer sizes with more whitespace:

| Element | Size | Weight |
|---------|------|--------|
| H1 | 3rem | Bold |
| H2 | 2rem | Bold |
| H3 | 1.25rem | Semibold |
| Body | 15px | Regular |
| Caption | 0.75rem | Medium |

## Letter Spacing

Tighter tracking for headings, normal for body:

```css
h1, h2, h3 {
  letter-spacing: -0.02em;
}

body {
  letter-spacing: -0.01em;
}
```

## Line Height

Generous line height improves readability:

- **Headings**: 1.1-1.2
- **Body**: 1.6-1.8
- **Captions**: 1.4

## The Power of Restraint

The best typography is invisible. It doesn't draw attention to itself — it simply makes reading effortless.

> "Typography is what language looks like." — Ellen Lupton
