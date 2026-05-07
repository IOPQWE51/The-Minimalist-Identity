"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { springTransition } from "@/lib/motion";

interface TagCloudProps {
  tags: string[];
  limit?: number;
  className?: string;
  activeTag?: string | null;
}

interface TagInfo {
  tag: string;
  count: number;
  size: "xs" | "sm" | "md" | "lg" | "xl";
}

function computeSizes(tags: string[]): TagInfo[] {
  if (tags.length === 0) return [];

  const counts: Record<string, number> = {};
  tags.forEach(t => { counts[t] = (counts[t] || 0) + 1; });

  const uniqueTags = Object.keys(counts);
  const maxCount = Math.max(...Object.values(counts));
  const minCount = Math.min(...Object.values(counts));
  const range = maxCount - minCount || 1;

  return uniqueTags.map((tag) => {
    const normalized = (counts[tag] - minCount) / range;
    let size: TagInfo["size"];
    if (normalized >= 0.8) size = "xl";
    else if (normalized >= 0.6) size = "lg";
    else if (normalized >= 0.4) size = "md";
    else if (normalized >= 0.2) size = "sm";
    else size = "xs";
    return { tag, count: counts[tag], size };
  });
}

const sizeClasses: Record<TagInfo["size"], string> = {
  xs: "px-2.5 py-1 text-[10px]",
  sm: "px-3 py-1 text-xs",
  md: "px-3.5 py-1.5 text-xs",
  lg: "px-4 py-1.5 text-sm",
  xl: "px-5 py-2 text-base font-medium",
};

export function TagCloud({ tags, limit = 0, className, activeTag }: TagCloudProps) {
  const displayTags = useMemo(() => {
    const sliced = limit > 0 ? tags.slice(0, limit) : tags;
    return computeSizes(sliced);
  }, [tags, limit]);

  if (displayTags.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {displayTags.map((item, i) => {
        const isActive = activeTag === item.tag;
        return (
          <motion.div
            key={item.tag}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springTransition, delay: i * 0.03 }}
          >
            <Link
              href={`/blog/tag/${encodeURIComponent(item.tag)}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full transition-all duration-200",
                sizeClasses[item.size],
                isActive
                  ? "bg-foreground text-background shadow-lg"
                  : "bg-glass text-muted hover:bg-glass-hover hover:text-foreground hover:shadow-md"
              )}
            >
              <Tag className="h-3 w-3 shrink-0" />
              <span>{item.tag}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[9px] font-medium leading-none",
                  isActive
                    ? "bg-background/20 text-background"
                    : "bg-foreground/5 text-muted-light"
                )}
              >
                {item.count}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
