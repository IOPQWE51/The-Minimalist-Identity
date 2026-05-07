import { getPostBySlug, getAllPosts, getAdjacentPosts } from "@/lib/posts";
import { Aurora } from "@/components/Aurora";
import { Navbar } from "@/components/Navbar";
import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { TableOfContents } from "@/components/TableOfContents";
import { ReadingProgress } from "@/components/ReadingProgress";
import { BackToTop } from "@/components/BackToTop";
import { MDXContent } from "@/components/MDXContent";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <>
      <Aurora />
      <Navbar />
      <ReadingProgress />

      <main className="relative z-10 px-6 pt-28 pb-20">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-10 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="rounded-full bg-glass px-3 py-1 text-[11px] font-medium text-muted">
                {post.tags[0] || "General"}
              </span>
              <span className="text-[11px] text-muted-light">{post.readTime}</span>
            </div>

            <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
              {post.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-muted">
              {post.excerpt}
            </p>

            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-muted-light">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Content + TOC */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_220px]">
            <article>
              <MDXContent source={post.content} />
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents content={post.content} />
              </div>
            </aside>
          </div>

          {/* Navigation */}
          <nav className="mt-16 flex items-center justify-between gap-4">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="group flex-1">
                <GlassCard disableGlow className="flex items-center gap-2 p-3">
                  <ArrowLeft className="h-3.5 w-3.5 shrink-0 text-muted-light" />
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] text-muted-light">Previous</p>
                    <p className="truncate text-xs font-medium text-foreground">
                      {prev.title}
                    </p>
                  </div>
                </GlassCard>
              </Link>
            ) : <div className="flex-1" />}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="group flex-1">
                <GlassCard disableGlow className="flex items-center justify-end gap-2 p-3">
                  <div className="min-w-0 text-right">
                    <p className="text-[10px] text-muted-light">Next</p>
                    <p className="truncate text-xs font-medium text-foreground">
                      {next.title}
                    </p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-light" />
                </GlassCard>
              </Link>
            ) : <div className="flex-1" />}
          </nav>
        </div>
      </main>

      <BackToTop />
      <Footer />
    </>
  );
}
