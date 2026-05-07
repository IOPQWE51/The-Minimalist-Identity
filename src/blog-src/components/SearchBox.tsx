"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { springTransition } from "@/lib/motion";

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBox({
  className,
  placeholder = "Search articles...",
  autoFocus = false,
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-light" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsOpen(false);
                inputRef.current?.blur();
              }
            }}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={cn(
              "w-full rounded-xl border bg-glass py-2.5 pl-10 pr-10 text-sm text-foreground",
              "outline-none transition-all duration-200",
              "border-glass-border focus:border-foreground/20",
              "placeholder:text-muted-light"
            )}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-light transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isOpen && query.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={springTransition}
            className="glass absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden shadow-xl"
          >
            <button
              onClick={handleSubmit}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-glass-hover"
            >
              <Search className="h-4 w-4 shrink-0 text-muted-light" />
              <span className="flex-1 text-muted">
                Search for &ldquo;{query}&rdquo;
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-light" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
