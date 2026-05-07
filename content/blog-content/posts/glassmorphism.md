---
title: "Building with Glass: A Deep Dive into Glassmorphism"
date: "2026-04-22"
tag: "Code"
excerpt: "The technical decisions behind the glassmorphism aesthetic, from backdrop-blur to border gradients, and how to implement it without sacrificing performance."
---

Glassmorphism has been around since Microsoft popularized it in Windows 11's Fluent Design, and Apple brought it into the mainstream with macOS Big Sur and iOS. But despite its popularity, most implementations get it wrong. They either overdo the blur (creating a sluggish, unreadable mess) or underdo it (losing the glass effect entirely). Getting it right requires understanding not just the CSS, but the design principles behind it.

## The Core Properties

Glassmorphism rests on three pillars:

1. **Transparency** — The surface must be partially see-through
2. **Blur** — The background must be blurred *through* the surface
3. **Border** — A subtle edge defines the shape against the blurred backdrop

In CSS, this translates to:

```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(1.6);
  -webkit-backdrop-filter: blur(20px) saturate(1.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}
```

Let's break down each property.

## Background Opacity

The `rgba(255, 255, 255, 0.08)` background is critical. At 8% opacity, it's barely visible on its own — just enough to give the surface a faint luminosity without obscuring the blur effect underneath.

A common mistake is using higher opacity values (20-30%). This kills the glass effect because the surface becomes opaque enough that the blur behind it is no longer visible. The glass looks like a flat, semi-transparent panel instead of a translucent material.

```css
/* Too opaque — kills the glass effect */
.bad-glass {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
}

/* Just right — lets the blur shine through */
.good-glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(1.6);
}
```

## Backdrop Filter: The Star of the Show

`backdrop-filter: blur()` is what creates the actual glass effect. Unlike `filter: blur()`, which blurs the element itself, `backdrop-filter` blurs everything *behind* the element. This is the key distinction that makes glassmorphism work.

The `saturate(1.6)` addition is subtle but important. Blurring tends to desaturate colors, which can make the background look washed out. Boosting saturation compensates for this, keeping the colors vibrant even through the blur.

Performance note: `backdrop-filter` is GPU-accelerated in modern browsers, but it's still expensive. Use it sparingly. Don't apply it to large areas or elements that animate frequently. On this site, I only apply it to cards and the navbar — small, static surfaces.

## The Border Gradient

The border is where most implementations fall flat. A solid `rgba(255, 255, 255, 0.2)` border works, but it looks artificial. Real glass has a gradient edge — brighter at the top where light hits, darker at the bottom.

You can't directly apply a gradient to a `border` property in CSS, but you can fake it with a pseudo-element:

```css
.glass-card {
  position: relative;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(1.6);
  border-radius: 20px;
}

.glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.15) 100%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

This creates a 1px border that fades from bright (top-left) to dim (middle) to medium (bottom-right), simulating how light would catch the edge of a glass surface.

## The Glow Effect

On this site, each glass card has a radial glow that follows the cursor. This is implemented with a `mousemove` listener that updates CSS custom properties:

```tsx
function GlassCard({ children }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      style={{
        '--mouse-x': `${pos.x}%`,
        '--mouse-y': `${pos.y}%`,
      }}
    >
      <div
        className="glow"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(168, 132, 255, 0.06), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
```

The glow is extremely subtle — just 6% opacity purple. It's not meant to be noticed consciously. It's meant to create a sense of depth and responsiveness that makes the interface feel alive.

## Dark Mode Considerations

Glassmorphism behaves very differently in light and dark modes. In dark mode, the low-opacity white background creates a subtle lift effect. In light mode, you need to be more careful — the same values can look muddy or invisible.

For light mode, I recommend:

```css
.light .glass {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px) saturate(1.8);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}
```

Notice the higher background opacity (60% vs 8%) and the addition of a soft shadow. In light mode, the blur effect is less visible because there's less contrast between the surface and the background. The shadow compensates by providing depth through a different mechanism.

## Accessibility

Glassmorphism can create accessibility issues, primarily around text contrast. When text sits on a semi-transparent surface over a variable background, contrast ratios can drop below WCAG guidelines.

The fix is to add a subtle text shadow or increase the background opacity for text containers:

```css
.glass p, .glass h2, .glass h3 {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
```

Alternatively, you can use `@supports` to provide a fallback for users who prefer reduced transparency:

```css
@media (prefers-reduced-transparency: reduce) {
  .glass {
    background: var(--surface-solid);
    backdrop-filter: none;
  }
}
```

## Performance Checklist

- Use `will-change: transform` on animated glass elements
- Avoid `backdrop-filter` on elements that change size or position frequently
- Limit the number of blurred surfaces visible at once (3-5 max)
- Test on mobile — `backdrop-filter` is more expensive on mobile GPUs
- Consider `contain: paint` to limit the blur's repaint area

Glassmorphism, done well, is more than a visual style. It's a way of creating depth and hierarchy without adding visual weight. The glass panels float above the aurora background, creating a sense of layers — content, surface, atmosphere — that makes the interface feel three-dimensional.

That's the goal. Not to look like glass, but to *feel* like glass.
