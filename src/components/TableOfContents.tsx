"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springTransition } from "@/lib/motion";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [items, setItems] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    const found: TOCItem[] = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      found.push({ id, text, level });
    }
    setItems(found);
  }, [content]);

  const handleScroll = useCallback(() => {
    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const scrollY = window.scrollY + 120;
    let current = headingElements[0].id;

    for (const el of headingElements) {
      if (el.offsetTop <= scrollY) {
        current = el.id;
      } else {
        break;
      }
    }
    setActiveId(current);
  }, [items]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
    }
    setIsOpen(false);
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={springTransition}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background shadow-lg lg:hidden"
        aria-label="Table of contents"
      >
        <List className="h-4 w-4" />
      </motion.button>

      {/* TOC Panel */}
      <nav
        className={cn(
          "fixed z-40 w-56 transition-all duration-300",
          "right-6 top-1/2 -translate-y-1/2",
          "hidden lg:block",
          isOpen && "block lg:block"
        )}
      >
        <div className="glass-subtle p-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-light">
            <List className="h-3 w-3" />
            Contents
          </div>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={cn(
                    "block w-full text-left text-xs transition-colors py-1",
                    item.level === 3 && "pl-3",
                    item.level === 4 && "pl-6",
                    activeId === item.id
                      ? "text-foreground font-medium"
                      : "text-muted-light hover:text-muted"
                  )}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
