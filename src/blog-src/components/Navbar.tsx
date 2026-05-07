"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Command, Sun, Moon, Monitor, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { springTransition } from "@/lib/motion";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/guestbook", label: "Guestbook" },
];

export function Navbar({ onCommandPaletteOpen }: { onCommandPaletteOpen?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onCommandPaletteOpen?.();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCommandPaletteOpen]);

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const ThemeIcon = mounted
    ? theme === "light"
      ? Sun
      : theme === "dark"
        ? Moon
        : Monitor
    : Monitor;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={springTransition}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/70 py-3 shadow-sm backdrop-blur-xl"
          : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/5 text-sm font-bold text-foreground"
          >
            A
          </motion.div>
          <span className="font-serif text-lg font-medium tracking-tight text-foreground">
            Aura
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-3.5 py-2 text-sm font-medium text-muted transition-colors",
                "hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {/* Command Palette Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
            onClick={onCommandPaletteOpen}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm text-muted-light transition-colors",
              "border-glass-border bg-glass hover:bg-glass-hover hover:text-foreground"
            )}
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" />
            <kbd className="hidden font-mono text-[10px] tracking-wider sm:inline">⌘K</kbd>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
            onClick={cycleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-glass hover:text-foreground"
            aria-label="Toggle theme"
          >
            <ThemeIcon className="h-4 w-4" />
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-glass hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div className="mx-4 mt-2 flex flex-col gap-1 rounded-2xl border border-glass-border bg-glass p-2 backdrop-blur-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-glass-hover hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
