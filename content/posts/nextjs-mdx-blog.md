---
title: "Building a Blog with Next.js and MDX"
date: "2026-05-02"
tags: ["Next.js", "MDX", "Tutorial"]
excerpt: "How to set up a performant, SEO-friendly blog using Next.js 16, MDX, and modern tooling."
author: "Aura"
---

# Building a Blog with Next.js + MDX

MDX lets you write JSX inside markdown — the best of both worlds for technical blogging.

## Setup

First, install the required packages:

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install remark-gfm rehype-highlight rehype-slug
```

## Configuration

```typescript
// next.config.ts
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
});

export default withMDX(nextConfig);
```

## Content Layer

Use `gray-matter` to parse frontmatter from markdown files:

```typescript
import matter from "gray-matter";
import fs from "fs";

export function getPostBySlug(slug: string) {
  const file = fs.readFileSync(`content/posts/${slug}.md`, "utf-8");
  const { data, content } = matter(file);
  return { meta: data, content };
}
```

## MDX Components

Customize how markdown elements render:

```tsx
// mdx-components.tsx
export function useMDXComponents(components) {
  return {
    h2: (props) => (
      <h2 className="font-serif text-2xl mt-10 mb-3" {...props} />
    ),
    p: (props) => (
      <p className="text-muted leading-relaxed mb-4" {...props} />
    ),
    ...components,
  };
}
```

## Features to Add

- [x] Table of Contents
- [x] Reading Progress Bar
- [x] Code Syntax Highlighting
- [x] Tag-based Filtering
- [x] Pagination
- [ ] Search
- [ ] RSS Feed
- [ ] Comments

## Performance Tips

1. Use `generateStaticParams` for static generation
2. Lazy-load the Table of Contents component
3. Optimize images with `next/image`
4. Use `optimizePackageImports` for large libraries like `lucide-react`

The result is a blog that's fast, SEO-friendly, and a joy to write for.
