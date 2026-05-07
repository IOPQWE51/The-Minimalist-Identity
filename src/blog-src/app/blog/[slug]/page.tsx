"use client";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, getAdjacentPosts } from "@/lib/posts";
import { Aurora } from "@/components/Aurora";
import { Navbar } from "@/components/Navbar";
import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { TableOfContents } from "@/components/TableOfContents";
import { ReadingProgress } from "@/components/ReadingProgress";
import { BackToTop } from "@/components/BackToTop";
import { MDXContent } from "@/components/MDXContent";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  ArrowRightIcon,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "Aura"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  // Pre-process content to add IDs to headings
  const processedContent = post.content.replace(
    /^(#{2,4})\s+(.+)$/gm,
    (_match, hashes: string, text: string) => {
      const level = hashes.length;
      const id = text
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      return `${hashes} ${text} {#${id}}`;
    }
  );

  return (
    <>
      <ReadingProgress />
      <Aurora />
      <Navbar />
      <BackToTop />

      <main className="relative z-10 pt-24 pb-24">
        {/* Back link */}
        <div className="mx-auto max-w-3xl px-6 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <motion.header
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mx-auto max-w-3xl px-6 mb-10"
        >
          <motion.div variants={staggerItem}>
            <Link
              href="/blog"
              className="glass-subtle mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
            >
              <Calendar className="h-3.5 w-3.5 text-purple-400" />
              <span className="text-xs font-medium text-muted">
                {formatDate(post.date)}
              </span>
              <span className="h-0.5 w-0.5 rounded-full bg-muted-light" />
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-medium text-muted">
                {post.readTime}
              </span>
            </Link>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="font-serif text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {post.title}
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-4 text-lg leading-relaxed text-muted"
          >
            {post.excerpt}
          </motion.p>

          <motion.div variants={staggerItem} className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="flex items-center gap-1.5 rounded-full bg-glass px-3 py-1 text-xs font-medium text-muted transition-colors hover:bg-glass-hover hover:text-foreground"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </Link>
            ))}
          </motion.div>

          {post.author && (
            <motion.div
              variants={staggerItem}
              className="mt-6 flex items-center gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-glass text-xs font-bold text-muted">
                {post.author.charAt(0)}
              </div>
              <span className="text-sm font-medium text-foreground">
                {post.author}
              </span>
            </motion.div>
          )}
        </motion.header>

        {/* Divider */}
        <div className="mx-auto max-w-3xl px-6 mb-10">
          <div className="h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
        </div>

        {/* Article Content */}
        <div className="mx-auto max-w-3xl px-6">
          <motion.article
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="prose-custom"
          >
            <MDXContent source={processedContent} />
          </motion.article>
        </div>

        {/* Adjacent Posts */}
        {(prev || next) && (
          <div className="mx-auto max-w-3xl px-6 mt-16">
            <div className="h-px bg-gradient-to-r from-transparent via-glass-border to-transparent mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev && (
                <GlassCard
                  href={`/blog/${prev.slug}`}
                  disableGlow
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-1.5 text-xs text-muted-light mb-2">
                    <ArrowLeft className="h-3 w-3" />
                    Previous
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-foreground line-clamp-2">
                    {prev.title}
                  </h3>
                  <span className="mt-2 text-xs text-muted-light">
                    {formatDate(prev.date)}
                  </span>
                </GlassCard>
              )}
              {next && (
                <GlassCard
                  href={`/blog/${next.slug}`}
                  disableGlow
                  className="flex flex-col items-end text-right sm:col-start-2"
                >
                  <div className="flex items-center gap-1.5 text-xs text-muted-light mb-2">
                    Next
                    <ArrowRight className="h-3 w-3" />
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-foreground line-clamp-2">
                    {next.title}
                  </h3>
                  <span className="mt-2 text-xs text-muted-light">
                    {formatDate(next.date)}
                  </span>
                </GlassCard>
              )}
            </div>
          </div>
        )}
      </main>

      <TableOfContents content={post.content} />
      <Footer />
    </>
  );
}
