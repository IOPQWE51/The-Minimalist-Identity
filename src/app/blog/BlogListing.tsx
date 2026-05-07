"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { TagCloud } from "@/components/TagCloud";
import { SearchBox } from "@/components/SearchBox";
import { fadeInUp, staggerItem } from "@/lib/motion";
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
    month: "short",
    day: "numeric",
  });
}

interface BlogListingProps {
  posts: BlogPost[];
  tags: { tag: string; count: number }[];
  activeTag?: string | null;
}

export default function BlogListing({ posts, tags, activeTag }: BlogListingProps) {
  return (
    <>
      {/* Header */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="mb-10 text-center"
      >
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Blog
        </h1>
        <p className="mt-2 text-sm text-muted">
          Thoughts on design, code, and the spaces between.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
        {/* Posts */}
        <div className="flex flex-col gap-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              variants={staggerItem}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <GlassCard className="flex items-start gap-4 p-4">
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 flex items-center gap-2 flex-wrap">
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r ${GRADIENT_PAIRS[i % 4].from} ${GRADIENT_PAIRS[i % 4].to}`}
                      />
                      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-light">
                        {post.tags[0] || "General"}
                      </span>
                      <span className="text-[10px] text-muted-light">·</span>
                      <span className="text-[10px] text-muted-light">
                        {formatDate(post.date)}
                      </span>
                      <span className="text-[10px] text-muted-light">·</span>
                      <span className="text-[10px] text-muted-light">
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-serif text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-foreground/80 sm:text-lg">
                      {post.title}
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-light transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <SearchBox />

          <GlassCard disableGlow className="p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-light">
              Tags
            </h3>
            <TagCloud tags={tags.map((t) => t.tag)} activeTag={activeTag} />
          </GlassCard>

          <Link href="/about" className="group block">
            <GlassCard disableGlow className="p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-light">
                About
              </h3>
              <p className="text-xs leading-relaxed text-muted">
                Designer, developer, and digital gardener. Exploring the intersection of code and design.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-muted-light transition-colors group-hover:text-foreground">
                Learn more <ArrowRight className="h-3 w-3" />
              </span>
            </GlassCard>
          </Link>
        </aside>
      </div>
    </>
  );
}
