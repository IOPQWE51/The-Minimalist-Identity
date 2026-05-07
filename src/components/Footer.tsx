"use client";

import { motion } from "framer-motion";
import { Rss, Globe, AtSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { springTransition } from "@/lib/motion";

const socialLinks = [
  { icon: Globe, href: "#", label: "GitHub" },
  { icon: AtSign, href: "#", label: "Twitter" },
  { icon: Rss, href: "#", label: "RSS" },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-glass-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-serif text-lg font-medium tracking-tight text-foreground">
            Aura
          </span>
          <p className="text-xs text-muted-light">
            Crafted with ethereal minimalism.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={springTransition}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors",
                "hover:bg-glass hover:text-foreground"
              )}
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </motion.a>
          ))}
        </div>

        <p className="text-xs text-muted-light">
          &copy; {new Date().getFullYear()} Aura. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
