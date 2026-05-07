---
title: "Spring Animations: Making Interfaces Feel Alive"
date: "2026-05-05"
tags: ["Animation", "Framer Motion", "Tutorial"]
excerpt: "Why springs beat easing curves, and how to craft animations that feel natural and delightful."
author: "Aura"
---

# Spring Animations

The difference between a good interface and a great one often comes down to motion. And the secret ingredient? **Springs**.

## Why Not Easing Curves?

Traditional CSS animations use cubic-bezier easing curves. They're predictable but mechanical. Springs, on the other hand:

- Feel natural and physical
- Respond to user interaction organically
- Create a sense of weight and momentum

## The Physics

A spring animation is defined by two key parameters:

- **Stiffness**: How quickly the spring returns to rest
- **Damping**: How quickly the oscillation decays

```typescript
const springTransition = {
  type: "spring",
  stiffness: 260,  // Higher = snappier
  damping: 20,     // Lower = more bounce
};
```

## Staggered Animations

One of the most powerful patterns is the stagger — animating children sequentially:

```typescript
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: springTransition },
};
```

## Practical Tips

1. **Keep it subtle** — 10-20px movements max
2. **Use springs for enter/exit** — not for continuous motion
3. **Respect user preferences** — honor `prefers-reduced-motion`
4. **Test on real devices** — what feels good on a 144Hz monitor may feel slow on a phone

## The Emotional Impact

Good animation doesn't just look nice — it communicates. A spring bounce says "I'm alive and responsive." A gentle fade says "I'm here when you need me."

Choose your motion language intentionally.
