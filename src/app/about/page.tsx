import type { Metadata } from "next";
import { Aurora } from "@/components/Aurora";
import { Navbar } from "@/components/Navbar";
import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { Mail, GitBranch, LucideLink } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Designer, developer, and digital gardener.",
};

export default function AboutPage() {
  return (
    <>
      <Aurora />
      <Navbar />

      <main className="relative z-10 px-6 pt-28 pb-20">
        <div className="mx-auto max-w-2xl">
          {/* Hero */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 text-3xl">
              ✦
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              About Me
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Designer, developer, and digital gardener. Exploring the intersection of code, design, and the spaces between.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Link href="mailto:hello@aura.blog" className="text-muted transition-colors hover:text-foreground">
                <Mail className="h-4 w-4" />
              </Link>
              <Link href="https://github.com/IOPQWE51" className="text-muted transition-colors hover:text-foreground">
                <GitBranch className="h-4 w-4" />
              </Link>
              <Link href="https://twitter.com" className="text-muted transition-colors hover:text-foreground">
                <LucideLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <GlassCard disableGlow className="p-6">
              <h2 className="font-serif text-lg font-semibold text-foreground">Who I Am</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                I'm a designer and developer who believes in the power of restraint. 
                I build digital experiences that breathe — where every pixel has purpose 
                and every interaction feels natural.
              </p>
            </GlassCard>

            <GlassCard disableGlow className="p-6">
              <h2 className="font-serif text-lg font-semibold text-foreground">What I Do</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {["UI/UX Design", "Frontend Dev", "Design Systems", "Creative Coding"].map((skill) => (
                  <div key={skill} className="rounded-lg bg-glass px-3 py-2 text-center text-xs font-medium text-muted">
                    {skill}
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard disableGlow className="p-6">
              <h2 className="font-serif text-lg font-semibold text-foreground">Now</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Building this digital garden and exploring the intersection of glassmorphism, 
                spring physics, and ethereal aesthetics. Currently fascinated by the interplay 
                of light and glass in digital interfaces.
              </p>
            </GlassCard>

            <div className="text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
