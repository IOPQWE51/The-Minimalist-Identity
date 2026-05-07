"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  ExternalLink,
  Code2,
  Layers,
  Zap,
  Globe,
  Database,
  Palette,
  Terminal,
  Box,
  Sparkles,
} from "lucide-react";
import { Aurora } from "@/components/Aurora";
import { Navbar } from "@/components/Navbar";
import { GlassCard } from "@/components/GlassCard";
import { BentoGrid } from "@/components/BentoGrid";
import { Footer } from "@/components/Footer";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  springTransition,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github?: string;
  demo?: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  span?: 1 | 2;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Aura Design System",
    description:
      "A comprehensive design system built with glassmorphism, spring physics, and ethereal aesthetics.",
    longDescription:
      "The design system powering this site. Includes 20+ components, a full token system, dark/light mode support, and Framer Motion spring animations. Built for Next.js 16 and React 19.",
    tags: ["TypeScript", "React", "Tailwind CSS", "Framer Motion", "Design System"],
    github: "https://github.com/aurastudio/aura-design",
    demo: "https://aura.garden",
    icon: Sparkles,
    gradient: "from-purple-500/10 to-blue-500/10",
    span: 2,
    featured: true,
  },
  {
    title: "Lenis Scroll",
    description:
      "Smooth scroll library with spring physics for buttery scrolling experiences.",
    longDescription:
      "A lightweight smooth scroll library that uses spring physics instead of linear interpolation. Supports nested scroll, horizontal scroll, and integrates seamlessly with GSAP and Framer Motion.",
    tags: ["TypeScript", "Scroll", "Animation", "Performance"],
    github: "https://github.com/aurastudio/lenis-scroll",
    icon: Layers,
    gradient: "from-blue-500/10 to-cyan-500/10",
    featured: true,
  },
  {
    title: "Glass UI",
    description:
      "CSS-only glassmorphism framework with gradient borders and glow effects.",
    longDescription:
      "A pure CSS framework for building glassmorphism interfaces. No JavaScript required. Includes gradient border techniques, backdrop-blur utilities, and responsive glass panels.",
    tags: ["CSS", "Glassmorphism", "Framework", "UI"],
    github: "https://github.com/aurastudio/glass-ui",
    demo: "https://glass-ui.dev",
    icon: Palette,
    gradient: "from-orange-500/10 to-rose-500/10",
  },
  {
    title: "Spring Motion",
    description:
      "Physics-based animation primitives for React with configurable spring parameters.",
    longDescription:
      "A React animation library focused exclusively on spring physics. Provides hooks for spring-animated values, layout animations, and gesture-based interactions. API designed for composability.",
    tags: ["React", "Animation", "Physics", "TypeScript"],
    github: "https://github.com/aurastudio/spring-motion",
    icon: Zap,
    gradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    title: "Data Garden",
    description:
      "Visual data exploration tool with interactive graphs and real-time collaboration.",
    longDescription:
      "A web-based data exploration tool that lets you visualize, query, and share datasets. Features real-time collaboration, SQL support, and export to multiple formats. Built with WebGL for rendering.",
    tags: ["Next.js", "PostgreSQL", "WebGL", "D3.js", "Collaboration"],
    github: "https://github.com/aurastudio/data-garden",
    demo: "https://datagarden.dev",
    icon: Database,
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    title: "CLI Forge",
    description:
      "Modern CLI framework for building developer tools with beautiful terminal interfaces.",
    longDescription:
      "A framework for building command-line tools with rich terminal output. Supports syntax highlighting, progress bars, interactive prompts, and automatic help generation. Written in Rust with Node.js bindings.",
    tags: ["Rust", "CLI", "Terminal", "Developer Tools"],
    github: "https://github.com/aurastudio/cli-forge",
    icon: Terminal,
    gradient: "from-rose-500/10 to-pink-500/10",
  },
  {
    title: "Mesh API",
    description:
      "Edge-first API framework with automatic caching, rate limiting, and type safety.",
    longDescription:
      "A framework for building APIs that run at the edge. Automatic request caching, built-in rate limiting, end-to-end type safety with TypeScript, and zero-config deployment to 200+ locations worldwide.",
    tags: ["TypeScript", "Edge", "API", "Performance"],
    github: "https://github.com/aurastudio/mesh-api",
    demo: "https://meshapi.dev",
    icon: Globe,
    gradient: "from-indigo-500/10 to-purple-500/10",
  },
  {
    title: "Voxel Engine",
    description:
      "WebGPU-powered voxel engine for browser-based 3D world building.",
    longDescription:
      "A high-performance voxel engine running entirely in the browser via WebGPU. Features real-time terrain generation, dynamic lighting, and multiplayer support. Inspired by Minecraft, built for the modern web.",
    tags: ["WebGPU", "TypeScript", "3D", "WebGL", "Rust/WASM"],
    github: "https://github.com/aurastudio/voxel-engine",
    demo: "https://voxel.aura.garden",
    icon: Box,
    gradient: "from-cyan-500/10 to-blue-500/10",
    span: 2,
  },
  {
    title: "Open Design Tokens",
    description:
      "Community-driven design token specification with tools for multi-platform export.",
    longDescription:
      "An open specification for design tokens with export tools for CSS, Tailwind, iOS, Android, and Figma. Includes a VS Code extension for token previews and a CLI for automated token pipelines.",
    tags: ["Design Tokens", "Open Source", "Tooling", "Multi-platform"],
    github: "https://github.com/aurastudio/open-design-tokens",
    icon: Code2,
    gradient: "from-violet-500/10 to-indigo-500/10",
  },
];

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (!activeFilter) return projects;
    return projects.filter((p) => p.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <>
      <Aurora />
      <Navbar />

      <main className="relative z-10 pt-28 pb-24">
        {/* Header */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mx-auto max-w-5xl px-6 mb-12"
        >
          <div className="text-center">
            <motion.h1
              variants={staggerItem}
              className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Projects
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="mt-3 text-muted text-lg max-w-xl mx-auto"
            >
              Things I've built, broken, and rebuilt. Each one taught me something new.
            </motion.p>

            {/* Filter Tags */}
            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
            >
              <button
                onClick={() => setActiveFilter(null)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                  !activeFilter
                    ? "bg-foreground text-background"
                    : "bg-glass text-muted hover:bg-glass-hover hover:text-foreground"
                )}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                    activeFilter === tag
                      ? "bg-foreground text-background"
                      : "bg-glass text-muted hover:bg-glass-hover hover:text-foreground"
                  )}
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Grid */}
        <section className="mx-auto max-w-5xl px-6">
          <AnimatePresence mode="popLayout">
            <BentoGrid>
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ ...springTransition, delay: i * 0.04 }}
                  className={project.span === 2 ? "md:col-span-2" : ""}
                >
                  <GlassCard
                    disableGlow
                    className="flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${project.gradient}`}
                        >
                          <project.icon className="h-5 w-5 text-foreground" />
                        </div>
                        {project.featured && (
                          <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-medium text-purple-400">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted">
                        {project.longDescription}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() =>
                              setActiveFilter(activeFilter === tag ? null : tag)
                            }
                            className="rounded-full bg-glass px-2.5 py-0.5 text-[10px] font-medium text-muted-light transition-colors hover:bg-glass-hover hover:text-foreground"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-muted-light transition-colors hover:text-foreground"
                        >
                          <GitBranch className="h-3.5 w-3.5" />
                          Source
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-muted-light transition-colors hover:text-foreground"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Demo
                        </a>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </BentoGrid>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-light text-lg">
                No projects match this filter.
              </p>
              <button
                onClick={() => setActiveFilter(null)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
              >
                Clear filter
              </button>
            </motion.div>
          )}
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-2xl px-6 mt-24">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <GlassCard disableGlow className="p-10 text-center sm:p-14">
              <Sparkles className="mx-auto mb-4 h-6 w-6 text-purple-400" />
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Have a Project in Mind?
              </h2>
              <p className="mt-3 text-sm text-muted max-w-md mx-auto">
                I'm always interested in hearing about new projects and collaborations.
                If you're building something exciting, let's talk.
              </p>
              <motion.a
                href="mailto:hello@aura.garden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
              >
                Get in Touch
                <ExternalLink className="h-4 w-4" />
              </motion.a>
            </GlassCard>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
