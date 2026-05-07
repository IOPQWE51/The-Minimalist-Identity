# CLAUDE.md

This file provides guidance to Claude Code when working with the codebase.

## Project Overview

**Project Aura** — A minimalist digital garden and blog system built with Next.js 16, React 19, and Tailwind CSS 4.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Framer Motion
- **Content:** Markdown with frontmatter (gray-matter)
- **Search:** Fuzzy search with search history
- **SEO:** Dynamic sitemap, RSS, OG images

## Design System

- **Style:** Glassmorphism + Aurora effects + Spring physics
- **Fonts:** Geist Sans (UI), Playfair Display (headings)
- **Themes:** Light/Dark mode with system preference

## Key Files

- `src/app/page.tsx` — Home page
- `src/app/blog/page.tsx` — Blog listing
- `src/app/blog/[slug]/page.tsx` — Article detail
- `src/app/about/page.tsx` — About page
- `src/app/projects/page.tsx` — Projects page
- `src/lib/posts.ts` — Post data utilities
- `src/lib/search.ts` — Search utilities
- `content/posts/` — Blog articles (Markdown)

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
