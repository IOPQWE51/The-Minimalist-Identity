"use client";

import { cn } from "@/lib/utils";
import type { MDXComponents as MDXComponentsType } from "mdx/types";

export function useMDXComponents(): MDXComponentsType {
  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          "font-serif text-3xl font-bold tracking-tight text-foreground mt-8 mb-4",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "font-serif text-2xl font-bold tracking-tight text-foreground mt-10 mb-3 pb-2 border-b border-glass-border",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "font-serif text-xl font-semibold text-foreground mt-8 mb-2",
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn("text-lg font-semibold text-foreground mt-6 mb-2", className)}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn("text-muted leading-relaxed mb-4 text-[15px]", className)}
        {...props}
      />
    ),
    a: ({ className, ...props }) => (
      <a
        className={cn(
          "text-foreground underline decoration-muted-light/40 underline-offset-2 transition-colors hover:decoration-foreground",
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          "list-disc pl-6 mb-4 space-y-1.5 text-muted text-[15px]",
          className
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          "list-decimal pl-6 mb-4 space-y-1.5 text-muted text-[15px]",
          className
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("leading-relaxed", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "border-l-2 border-purple-400/40 pl-4 my-6 italic text-muted-light",
          className
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => {
      const isInline = !className?.includes("language-");
      if (isInline) {
        return (
          <code
            className={cn(
              "rounded bg-glass px-1.5 py-0.5 text-sm font-mono text-foreground/90",
              className
            )}
            {...props}
          />
        );
      }
      return <code className={cn("font-mono text-sm", className)} {...props} />;
    },
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "overflow-x-auto rounded-xl bg-glass p-4 my-6 text-sm leading-relaxed border border-glass-border",
          className
        )}
        {...props}
      />
    ),
    hr: () => <hr className="my-8 border-glass-border" />,
    img: ({ className, ...props }) => (
      <img
        className={cn("rounded-xl my-6 max-w-full h-auto", className)}
        {...props}
      />
    ),
    table: ({ className, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table className={cn("w-full text-sm text-muted", className)} {...props} />
      </div>
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          "border-b border-glass-border px-4 py-2 text-left font-medium text-foreground",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn("border-b border-glass-border/50 px-4 py-2", className)}
        {...props}
      />
    ),
    strong: ({ className, ...props }) => (
      <strong className={cn("font-semibold text-foreground", className)} {...props} />
    ),
    em: ({ className, ...props }) => (
      <em className={cn("italic text-muted-light", className)} {...props} />
    ),
  };
}
