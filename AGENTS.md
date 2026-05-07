# AGENTS.md

This file provides guidance to AI agents when working with the codebase.

## Project: Project Aura

A minimalist digital garden and blog system.

## Architecture

- **Frontend:** Next.js 16 + React 19 + Tailwind CSS 4
- **Content:** Markdown files with YAML frontmatter
- **Search:** Client-side fuzzy search
- **SEO:** Dynamic sitemap, RSS feed, Open Graph images

## Directory Structure

```
src/
  app/
    page.tsx              # Home page
    layout.tsx            # Root layout with fonts, theme, smooth scroll
    globals.css           # Global styles and design tokens
    blog/
      page.tsx            # Blog listing with tag filter
      [slug]/page.tsx     # Article detail page
      tag/[tag]/page.tsx  # Tag archive page
    about/page.tsx        # About page
    projects/page.tsx     # Projects page
    sitemap.ts            # Dynamic sitemap
    robots.ts             # Dynamic robots.txt
    feed.xml/route.ts     # RSS feed
    opengraph-image.tsx   # Site-level OG image
  components/
    Aurora.tsx            # Aurora background effect
    BentoGrid.tsx         # Bento grid layout
    CommandPalette.tsx    # ⌘K command palette with search
    Footer.tsx            # Footer
    GlassCard.tsx         # Glass morphism card
    Navbar.tsx            # Navigation bar
    SearchBox.tsx         # Search box component
    TagCloud.tsx          # Tag cloud component
    TableOfContents.tsx   # Article table of contents
    ReadingProgress.tsx   # Reading progress bar
    BackToTop.tsx         # Back to top button
    MDXContent.tsx        # MDX content renderer
    MDXComponents.tsx     # MDX component mappings
  lib/
    posts.ts              # Post data utilities
    search.ts             # Search utilities
    motion.ts             # Framer Motion animations
    utils.ts              # Utility functions (cn)
content/
  posts/                  # Blog articles (Markdown with frontmatter)
```

## Design Principles

1. **Minimalism** — Less is more. Every element must earn its place.
2. **Glassmorphism** — Frosted glass effects with backdrop-blur.
3. **Spring Physics** — Natural, spring-based animations.
4. **Accessibility** — WCAG 2.1 AA compliance.
5. **Performance** — Lighthouse 100/100/100/100 target.

## Code Style

- TypeScript strict mode
- Functional components with hooks
- Tailwind CSS for styling
- Framer Motion for animations
- No inline styles (except OG images)
