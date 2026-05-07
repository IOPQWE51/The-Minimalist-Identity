"use client";

import { useMemo } from "react";
import { useMDXComponents } from "./MDXComponents";

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  const components = useMDXComponents();

  const Content = useMemo(() => {
    // For server-rendered MDX, we process the markdown here
    // Since we're using @next/mdx, the actual compilation happens at build time
    // This component is a fallback for dynamically rendered content
    return source;
  }, [source]);

  return (
    <div className="mdx-content">
      <div dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(source) }} />
    </div>
  );
}

// Simple markdown-to-HTML renderer for dynamic content
function renderMarkdownToHtml(md: string): string {
  let html = md;

  // Code blocks (must be before inline code)
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    '<pre class="overflow-x-auto rounded-xl bg-glass p-4 my-6 text-sm leading-relaxed border border-glass-border"><code class="font-mono text-sm">$2</code></pre>'
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="rounded bg-glass px-1.5 py-0.5 text-sm font-mono text-foreground/90">$1</code>'
  );

  // Images
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="rounded-xl my-6 max-w-full h-auto" />'
  );

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-foreground underline decoration-muted-light/40 underline-offset-2 transition-colors hover:decoration-foreground">$1</a>'
  );

  // Headings with IDs
  html = html.replace(
    /^####\s+(.+?)(?:\s*\{#(.+?)\})?$/gm,
    '<h4 id="$2" class="text-lg font-semibold text-foreground mt-6 mb-2">$1</h4>'
  );
  html = html.replace(
    /^###\s+(.+?)(?:\s*\{#(.+?)\})?$/gm,
    '<h3 id="$2" class="font-serif text-xl font-semibold text-foreground mt-8 mb-2">$1</h3>'
  );
  html = html.replace(
    /^##\s+(.+?)(?:\s*\{#(.+?)\})?$/gm,
    '<h2 id="$2" class="font-serif text-2xl font-bold tracking-tight text-foreground mt-10 mb-3 pb-2 border-b border-glass-border">$1</h2>'
  );
  html = html.replace(
    /^#\s+(.+?)(?:\s*\{#(.+?)\})?$/gm,
    '<h1 id="$2" class="font-serif text-3xl font-bold tracking-tight text-foreground mt-8 mb-4">$1</h1>'
  );

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em class="italic text-muted-light">$1</em>');

  // Blockquotes
  html = html.replace(
    /^&gt;\s+(.+)$/gm,
    '<blockquote class="border-l-2 border-purple-400/40 pl-4 my-6 italic text-muted-light">$1</blockquote>'
  );

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="my-8 border-glass-border" />');

  // Unordered lists
  html = html.replace(
    /^[-*]\s+(.+)$/gm,
    '<li class="text-muted text-[15px] leading-relaxed">$1</li>'
  );
  html = html.replace(
    /((?:<li[^>]*>.*<\/li>\n?)+)/g,
    '<ul class="list-disc pl-6 mb-4 space-y-1.5 text-muted text-[15px]">$1</ul>'
  );

  // Ordered lists
  html = html.replace(
    /^\d+\.\s+(.+)$/gm,
    '<li class="text-muted text-[15px] leading-relaxed">$1</li>'
  );

  // Paragraphs (lines that aren't already wrapped)
  html = html.replace(
    /^(?!<[a-z])((?!^\s*$).+)$/gm,
    (match) => {
      if (match.startsWith('<')) return match;
      return `<p class="text-muted leading-relaxed mb-4 text-[15px]">${match}</p>`;
    }
  );

  // Clean up empty lines
  html = html.replace(/\n{3,}/g, '\n\n');

  return html;
}
