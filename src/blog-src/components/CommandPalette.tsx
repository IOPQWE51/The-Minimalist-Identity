"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Search,
  Home,
  FileText,
  FolderOpen,
  User,
  MessageSquare,
  Sun,
  Moon,
  Monitor,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { springTransition } from "@/lib/motion";
import { useRouter } from "next/navigation";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  section: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const navigate = useCallback(
    (path: string) => {
      router.push(path);
      onClose();
    },
    [router, onClose]
  );

  const items: CommandItem[] = [
    {
      id: "home",
      label: "Home",
      description: "Go to homepage",
      icon: Home,
      action: () => navigate("/"),
      section: "Navigation",
    },
    {
      id: "blog",
      label: "Blog",
      description: "Read articles",
      icon: FileText,
      action: () => navigate("/blog"),
      section: "Navigation",
    },
    {
      id: "projects",
      label: "Projects",
      description: "View projects",
      icon: FolderOpen,
      action: () => navigate("/projects"),
      section: "Navigation",
    },
    {
      id: "about",
      label: "About",
      description: "Learn more about me",
      icon: User,
      action: () => navigate("/about"),
      section: "Navigation",
    },
    {
      id: "guestbook",
      label: "Guestbook",
      description: "Leave a message",
      icon: MessageSquare,
      action: () => navigate("/guestbook"),
      section: "Navigation",
    },
    {
      id: "theme-light",
      label: "Light Mode",
      description: "Switch to light theme",
      icon: Sun,
      action: () => {
        setTheme("light");
        onClose();
      },
      section: "Theme",
    },
    {
      id: "theme-dark",
      label: "Dark Mode",
      description: "Switch to dark theme",
      icon: Moon,
      action: () => {
        setTheme("dark");
        onClose();
      },
      section: "Theme",
    },
    {
      id: "theme-system",
      label: "System Theme",
      description: "Follow system preference",
      icon: Monitor,
      action: () => {
        setTheme("system");
        onClose();
      },
      section: "Theme",
    },
  ];

  const filtered = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase()) ||
      item.section.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  const flatItems = filtered;

  /** Build a stable flat index for keyboard navigation */
  const itemIdToIndex = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((item, i) => map.set(item.id, i));
    return map;
  }, [filtered]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const executeItem = (item: CommandItem) => {
    item.action();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, flatItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flatItems[selectedIndex]) {
        executeItem(flatItems[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    const selected = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    selected?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={springTransition}
            className="fixed left-1/2 top-[20%] z-[101] w-full max-w-lg -translate-x-1/2"
          >
            <div
              className="glass overflow-hidden shadow-2xl"
              onKeyDown={handleKeyDown}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-glass-border px-4 py-3">
                <Search className="h-4 w-4 text-muted-light" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-light"
                />
                <kbd className="rounded border border-glass-border px-1.5 py-0.5 font-mono text-[10px] text-muted-light">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-72 overflow-y-auto p-2">
                {Object.keys(grouped).length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-light">
                    No results found.
                  </div>
                ) : (
                  Object.entries(grouped).map(([section, sectionItems]) => (
                    <div key={section}>
                      <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-light">
                        {section}
                      </div>
                      {sectionItems.map((item) => {
                        const idx = itemIdToIndex.get(item.id) ?? 0;
                        const Icon = item.icon;
                        const isSelected = idx === selectedIndex;
                        return (
                          <button
                            key={item.id}
                            data-index={idx}
                            onClick={() => executeItem(item)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                              isSelected
                                ? "bg-glass-hover text-foreground"
                                : "text-muted hover:text-foreground"
                            )}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <div className="flex-1">
                              <div className="font-medium">{item.label}</div>
                              {item.description && (
                                <div className="text-xs text-muted-light">
                                  {item.description}
                                </div>
                              )}
                            </div>
                            {isSelected && (
                              <ArrowRight className="h-3.5 w-3.5 text-muted-light" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-glass-border px-4 py-2.5">
                <div className="flex items-center gap-3 text-[10px] text-muted-light">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-glass-border px-1 py-0.5 font-mono">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-glass-border px-1 py-0.5 font-mono">↵</kbd>
                    select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-glass-border px-1 py-0.5 font-mono">esc</kbd>
                    close
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
