import type { Metadata } from "next";
import { Aurora } from "@/components/Aurora";
import { Navbar } from "@/components/Navbar";
import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built, broken, and rebuilt.",
};

const projects = [
  {
    title: "Project Aura",
    description: "A minimalist digital garden built with Next.js, glassmorphism, and spring physics.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/IOPQWE51/The-Minimalist-Identity",
  },
  {
    title: "Glass UI",
    description: "A component library for glassmorphism-inspired interfaces.",
    tags: ["React", "Storybook", "CSS"],
    github: "#",
  },
  {
    title: "Spring Motion",
    description: "A collection of spring-physics animations for web interfaces.",
    tags: ["Framer Motion", "TypeScript"],
    github: "#",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Aurora />
      <Navbar />

      <main className="relative z-10 px-6 pt-28 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Projects
            </h1>
            <p className="mt-2 text-sm text-muted">
              Things I've built, broken, and rebuilt.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <GlassCard key={project.title} disableGlow className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="font-serif text-base font-semibold text-foreground">
                      {project.title}
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-glass px-2.5 py-0.5 text-[10px] font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.github !== "#" && (
                      <Link
                        href={project.github}
                        className="text-muted transition-colors hover:text-foreground"
                      >
                        <GitBranch className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
