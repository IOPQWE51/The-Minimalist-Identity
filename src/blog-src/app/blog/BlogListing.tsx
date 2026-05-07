"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ArrowLeft, Tag, Search } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/posts";

interface TagInfo {
  tag: string;
  count: number;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface BlogListingProps {
  posts: BlogPost[];
  allTags: TagInfo[];
  activeTag?: string | null;
  currentPage?: number;
  totalPages?: number;
  baseUrl?: string;
}

export default function BlogListing({
  posts,
  allTags,
  activeTag,
  currentPage = 1,
  totalPages = 1,
  baseUrl = "/blog",
}: BlogListingProps) {

  return (
    <>
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-full px-6 mb-12"
      >
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {activeTag ? `#${activeTag}` : "Blog"}
          </h1>
          <p className="mt-3 text-muted text-lg max-w-xl mx-auto">
            {activeTag
              ? `Articles tagged with "${activeTag}".`
              : "Thoughts on design, code, and the spaces between."}
          </p>

          {/* Tag Filter */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/blog"
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                !activeTag
                  ? "bg-foreground text-background"
                  : "bg-glass text-muted hover:bg-glass-hover hover:text-foreground"
              )}
            >
              <Search className="h-3 w-3" />
              All
            </Link>
            {allTags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                  activeTag === tag
                    ? "bg-foreground text-background"
                    : "bg-glass text-muted hover:bg-glass-hover hover:text-foreground"
                )}
              >
                <Tag className="h-3 w-3" />
                {tag}
                <span className="opacity-60">({count})</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Posts */}
      <section className="w-full px-6">
        <div className="mx-auto max-w-5xl">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-light text-lg">No posts found.</p>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
              >
                View all posts <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                {posts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    variants={staggerItem}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <GlassCard
                      href={`/blog/${post.slug}`}
                      disableGlow
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 text-xs text-muted-light mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.date)}
                          </span>
                          <span className="h-0.5 w-0.5 rounded-full bg-muted-light" />
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <h2 className="font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-foreground/80 truncate">
                          {post.title}
                        </h2>
                        <p className="mt-1 text-sm text-muted line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog/tag/${encodeURIComponent(tag)}`}
                              onClick={(e) => e.stopPropagation()}
                              className="rounded-full bg-glass px-2.5 py-0.5 text-[10px] font-medium text-muted-light transition-colors hover:bg-glass-hover hover:text-foreground"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <ArrowRight className="hidden sm:block h-4 w-4 text-muted-light shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 flex items-center justify-center gap-2"
                >
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      const href = activeTag
                        ? `/blog/tag/${encodeURIComponent(activeTag)}?page=${page}`
                        : `/blog?page=${page}`;
                      return (
                        <Link
                          key={page}
                          href={href}
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                            page === currentPage
                              ? "bg-foreground text-background"
                              : "text-muted hover:bg-glass hover:text-foreground"
                          )}
                        >
                          {page}
                        </Link>
                      );
                    }
                  )}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
