"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { CommandPalette } from "@/components/CommandPalette";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/motion";
import Link from "next/link";
import type { BlogPost } from "@/lib/posts";

const GRADIENT_PAIRS = [
  { from: "from-purple-500/8", to: "to-blue-500/8" },
  { from: "from-blue-500/8", to: "to-cyan-500/8" },
  { from: "from-emerald-500/8", to: "to-teal-500/8" },
  { from: "from-orange-500/8", to: "to-rose-500/8" },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface HomeClientProps {
  recentPosts: BlogPost[];
}

export default function HomeClient({ recentPosts }: HomeClientProps) {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <main className="relative z-10">
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Hero */}
      <section className="flex min-h-[80vh] w-full flex-col items-center justify-center px-6 pt-24 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex max-w-2xl flex-col items-center text-center"
        >
          <motion.div
            variants={staggerItem}
            className="glass-subtle mb-8 flex items-center gap-2 rounded-full px-4 py-2"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-xs font-medium text-muted">
              Digital Garden — Est. 2026
            </span>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl"
          >
            Ethereal
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Minimalism
            </span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            A digital garden where light meets glass. Exploring the
            intersection of design, code, and the quiet beauty of restraint.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-10 flex items-center gap-3">
            <Link
              href="/blog"
              className="group flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/85 hover:shadow-lg"
            >
              Start Reading
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/about"
              className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-glass-hover"
            >
              About Me
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-light">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-gradient-to-b from-muted-light to-transparent"
          />
        </motion.div>
      </section>

      {/* Recent Posts */}
      <section className="w-full px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Recent Writings
              </h2>
              <p className="mt-2 text-sm text-muted">
                The latest from the garden.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground sm:flex"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                variants={staggerItem}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <GlassCard className="flex h-full flex-col justify-between p-5">
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <span
                          className={`inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r ${GRADIENT_PAIRS[i % 4].from} ${GRADIENT_PAIRS[i % 4].to}`}
                        />
                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-light">
                          {post.tags[0] || "General"}
                        </span>
                        <span className="text-[10px] text-muted-light">
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-foreground/80">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-muted-light transition-colors group-hover:text-foreground">
                      {post.readTime}
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full px-6 py-20">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-lg text-center"
        >
          <GlassCard disableGlow className="p-8 sm:p-10">
            <Sparkles className="mx-auto mb-3 h-5 w-5 text-purple-400" />
            <h2 className="font-serif text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Stay in the Light
            </h2>
            <p className="mt-2 text-xs text-muted">
              Occasional dispatches on design, code, and creative process. No spam.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex flex-col gap-2.5 sm:flex-row"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-full border border-glass-border bg-glass px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-purple-400/30"
              />
              <button
                type="submit"
                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
              >
                Subscribe
              </button>
            </form>
          </GlassCard>
        </motion.div>
      </section>
    </main>
  );
}
