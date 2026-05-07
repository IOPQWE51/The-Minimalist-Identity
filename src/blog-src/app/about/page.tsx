"use client";

import type { Metadata } from "next";
import { motion } from "framer-motion";
import {
  MapPin,
  GitBranch,
  AtSign,
  Mail,
  BookOpen,
  Code2,
  Palette,
  Coffee,
  ArrowRight,
  ExternalLink,
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

export const metadata: Metadata = {
  title: "About",
  description:
    "Designer, developer, and digital gardener. Exploring the intersection of code, design, and the spaces between.",
  openGraph: {
    title: "About — Aura",
    description:
      "Designer, developer, and digital gardener. Exploring the intersection of code, design, and the spaces between.",
  },
};

const skills = [
  { category: "Languages", items: ["TypeScript", "Python", "Rust", "Go", "SQL"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"] },
  { category: "Backend", items: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "GraphQL"] },
  { category: "DevOps", items: ["Docker", "AWS", "Vercel", "GitHub Actions", "Terraform"] },
  { category: "Design", items: ["Figma", "Design Systems", "Typography", "Motion Design", "Accessibility"] },
  { category: "Other", items: ["Open Source", "Technical Writing", "Mentoring", "Systems Thinking"] },
];

const timeline = [
  {
    year: "2024 — Present",
    title: "Senior Design Engineer",
    company: "Aurora Studio",
    description:
      "Leading the design system and frontend architecture for a suite of creative tools. Building interfaces that feel as good as they look.",
  },
  {
    year: "2021 — 2024",
    title: "Full-Stack Developer",
    company: "Quantum Labs",
    description:
      "Architected and built real-time collaboration features used by 50k+ users. Pioneered the adoption of Rust for performance-critical services.",
  },
  {
    year: "2018 — 2021",
    title: "Frontend Developer",
    company: "Pixel & Co.",
    description:
      "Shipped responsive, accessible web applications for clients in healthcare, finance, and education. Introduced component-driven development.",
  },
  {
    year: "2016 — 2018",
    title: "B.S. Computer Science",
    company: "University of Washington",
    description:
      "Focused on human-computer interaction and computational design. Graduated with honors. Teaching assistant for the HCI program.",
  },
];

const socialLinks = [
  { icon: GitBranch, href: "https://github.com/aurastudio", label: "GitHub", handle: "@aurastudio" },
  { icon: AtSign, href: "https://twitter.com/aurastudio", label: "Twitter", handle: "@aurastudio" },
  { icon: Mail, href: "mailto:hello@aura.garden", label: "Email", handle: "hello@aura.garden" },
];

const nowItems = [
  {
    icon: Code2,
    title: "Building Aura",
    description:
      "Developing this digital garden and the design system that powers it. Every component is hand-crafted.",
  },
  {
    icon: BookOpen,
    title: "Reading",
    description:
      "Currently working through 'The Design of Everyday Things' (Don Norman) and 'Atomic Habits' (James Clear).",
  },
  {
    icon: Palette,
    title: "Exploring 3D",
    description:
      "Learning Three.js and React Three Fiber. The goal: add subtle 3D elements to the garden without sacrificing performance.",
  },
  {
    icon: Coffee,
    title: "Open Source",
    description:
      "Contributing to Framer Motion and Tailwind CSS. Building a small library for spring-based layout animations.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Aurora />
      <Navbar />

      <main className="relative z-10 pt-28 pb-24">
        {/* Hero */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mx-auto max-w-3xl px-6 mb-20"
        >
          <motion.div
            variants={staggerItem}
            className="mb-8 flex flex-col items-center"
          >
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-3xl font-bold text-foreground ring-1 ring-glass-border">
              A
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-light">
              <MapPin className="h-3.5 w-3.5" />
              <span>Seattle, WA</span>
            </div>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="font-serif text-4xl font-bold tracking-tight text-center text-foreground sm:text-5xl"
          >
            Designer, Developer,
            <br />
            <span className="text-muted">Digital Gardener</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-6 text-lg leading-relaxed text-muted text-center max-w-xl mx-auto"
          >
            I build interfaces that feel alive. With a background in computer science
            and a passion for design, I work at the intersection of code and creativity —
            crafting digital experiences that are both functional and beautiful.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-8 flex items-center justify-center gap-3"
          >
            {socialLinks.map(({ icon: Icon, href, label, handle }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
                className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{handle}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        {/* Skills */}
        <section className="mx-auto max-w-5xl px-6 mb-24">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-10 text-center"
          >
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
              Skills & Tools
            </h2>
            <p className="mt-3 text-muted">
              Technologies I work with daily.
            </p>
          </motion.div>

          <BentoGrid>
            {skills.map((group, i) => (
              <motion.div
                key={group.category}
                variants={staggerItem}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard disableGlow className="h-full">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-light">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-glass px-3 py-1 text-xs font-medium text-muted transition-colors hover:bg-glass-hover hover:text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </BentoGrid>
        </section>

        {/* Timeline */}
        <section className="mx-auto max-w-3xl px-6 mb-24">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-10 text-center"
          >
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
              Experience & Education
            </h2>
            <p className="mt-3 text-muted">
              The path that led here.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-glass-border via-glass-border to-transparent" />

            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  variants={staggerItem}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative pl-12"
                >
                  {/* Dot */}
                  <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-glass-border bg-background" />

                  <GlassCard disableGlow>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <span className="text-xs font-medium text-muted-light shrink-0">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-purple-400/80 mb-2">
                      {item.company}
                    </p>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Now */}
        <section id="now" className="mx-auto max-w-5xl px-6 mb-24">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-10 text-center"
          >
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
              What I'm Doing Now
            </h2>
            <p className="mt-3 text-muted">
              Last updated: May 2026.
            </p>
          </motion.div>

          <BentoGrid>
            {nowItems.map((item, i) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard disableGlow className="h-full">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                    <item.icon className="h-4 w-4 text-foreground" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </BentoGrid>
        </section>

        {/* Contact CTA */}
        <section className="mx-auto max-w-2xl px-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <GlassCard disableGlow className="p-10 text-center sm:p-14">
              <Mail className="mx-auto mb-4 h-6 w-6 text-purple-400" />
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Let's Connect
              </h2>
              <p className="mt-3 text-sm text-muted max-w-md mx-auto">
                Have a project in mind? Want to collaborate? Or just want to say hello?
                I'd love to hear from you.
              </p>
              <motion.a
                href="mailto:hello@aura.garden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
              >
                Say Hello
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </GlassCard>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
