"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Code2,
  PenTool,
  Palette,
  Zap,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { Aurora } from "@/components/Aurora";
import { Navbar } from "@/components/Navbar";
import { GlassCard } from "@/components/GlassCard";
import { BentoGrid } from "@/components/BentoGrid";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
} from "@/lib/motion";

const bentoItems = [
  {
    title: "Writing",
    description: "Long-form thoughts on design, code, and the spaces between.",
    icon: PenTool,
    span: 2 as const,
    rowSpan: 1 as const,
    href: "/blog",
    gradient: "from-purple-500/10 to-blue-500/10",
  },
  {
    title: "Projects",
    description: "Things I've built, broken, and rebuilt.",
    icon: Code2,
    span: 1 as const,
    rowSpan: 1 as const,
    href: "/projects",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "Design System",
    description: "Glass, light, and the art of restraint.",
    icon: Palette,
    span: 1 as const,
    rowSpan: 1 as const,
    href: "/about",
    gradient: "from-orange-500/10 to-rose-500/10",
  },
  {
    title: "Now",
    description: "What I'm focused on right now. Updated monthly.",
    icon: Zap,
    span: 1 as const,
    rowSpan: 1 as const,
    href: "/about#now",
    gradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    title: "Library",
    description: "Bookmarks, references, and curated links worth keeping.",
    icon: BookOpen,
    span: 1 as const,
    rowSpan: 1 as const,
    href: "/blog",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    title: "Guestbook",
    description: "Leave your mark. Say hello, share a thought.",
    icon: MessageCircle,
    span: 1 as const,
    rowSpan: 1 as const,
    href: "/guestbook",
    gradient: "from-rose-500/10 to-pink-500/10",
  },
];

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <Aurora />
      <Navbar onCommandPaletteOpen={() => setCommandOpen(true)} />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />

      <main className="relative z-10 flex flex-col items-center">
        {/* Hero Section */}
        <section className="flex min-h-[85vh] w-full flex-col items-center justify-center px-6 pt-28">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center text-center"
          >
            {/* Badge */}
            <motion.div
              variants={staggerItem}
              className="glass-subtle mb-8 flex items-center gap-2 rounded-full px-4 py-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span className="text-xs font-medium text-muted">
                Digital Garden &mdash; Est. 2026
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={staggerItem}
              className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Ethereal
              <br />
              <span className="text-muted">Minimalism</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={staggerItem}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            >
              A digital garden where light meets glass. Exploring the intersection
              of design, code, and the quiet beauty of restraint.
            </motion.p>

            {/* CTA */}
            <motion.div variants={staggerItem} className="mt-10 flex items-center gap-4">
              <motion.a
                href="/blog"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
              >
                Start Reading
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="/about"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="glass flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-glass-hover"
              >
                About Me
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
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

        {/* Bento Grid Section */}
        <section className="w-full px-6 py-24">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Explore the Garden
            </h2>
            <p className="mt-3 text-muted">
              A curated collection of thoughts, projects, and creative experiments.
            </p>
          </motion.div>

          <BentoGrid>
            {bentoItems.map((item, i) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                className={item.span === 2 ? "md:col-span-2" : ""}
              >
                <GlassCard
                  span={item.span}
                  href={item.href}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    <div
                      className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient}`}
                    >
                      <item.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-light transition-colors group-hover:text-foreground">
                    Explore
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </BentoGrid>
        </section>

        {/* Featured Section */}
        <section className="w-full px-6 py-24">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto max-w-5xl"
          >
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Recent Writings
                </h2>
                <p className="mt-3 text-muted">
                  The latest from the garden.
                </p>
              </div>
              <a
                href="/blog"
                className="hidden items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground sm:flex"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  title: "The Art of Digital Restraint",
                  date: "Apr 28, 2026",
                  tag: "Design",
                  readTime: "5 min",
                  href: "/blog/digital-restraint",
                },
                {
                  title: "Building with Glass: A CSS Deep Dive",
                  date: "Apr 22, 2026",
                  tag: "Code",
                  readTime: "8 min",
                  href: "/blog/building-with-glass",
                },
                {
                  title: "Why Spring Physics Matter in UI",
                  date: "Apr 15, 2026",
                  tag: "UX",
                  readTime: "6 min",
                  href: "/blog/spring-physics-ui",
                },
              ].map((post, i) => (
                <motion.div
                  key={post.title}
                  variants={staggerItem}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <GlassCard href={post.href} disableGlow className="flex items-center justify-between gap-4">
                    <div className="flex flex-1 items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-glass text-xs font-bold text-muted-light">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground transition-colors group-hover:text-foreground/80">
                          {post.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-light">
                          <span>{post.date}</span>
                          <span className="h-0.5 w-0.5 rounded-full bg-muted-light" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-glass px-3 py-1 text-xs font-medium text-muted">
                        {post.tag}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-light transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Newsletter / CTA Section */}
        <section className="w-full px-6 py-24">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <GlassCard disableGlow className="p-10 sm:p-14">
              <Sparkles className="mx-auto mb-4 h-6 w-6 text-purple-400" />
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Stay in the Light
              </h2>
              <p className="mt-3 text-sm text-muted">
                Occasional dispatches on design, code, and creative process.
                No spam, ever.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-full border border-glass-border bg-glass px-5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-purple-400/30 focus:bg-glass-hover"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
                >
                  Subscribe
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
