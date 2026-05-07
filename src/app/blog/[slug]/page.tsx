import { getPostBySlug, getAllPosts, getAdjacentPosts } from "@/lib/posts";
import { Aurora } from "@/components/Aurora";
import { Navbar } from "@/components/Navbar";
import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { TableOfContents } from "@/components/TableOfContents";
import { ReadingProgress } from "@/components/ReadingProgress";
import { BackToTop } from "@/components/BackToTop";
import { MDXContent } from "@/components/MDXContent";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Tag,
} from "lucide-react";
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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
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

      <main className="relative z-10 flex flex-col items-center">
        {/* Hero */}
        <section className="flex min-h-[60vh] w-full flex-col items-center justify-center px-6 pt-32 pb-16">
          <div className="flex max-w-3xl flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-2">
              <span className="rounded-full bg-glass px-4 py-1.5 text-xs font-medium text-muted">
                {post.tags[0] || "General"}
              </span>
              <span className="text-xs text-muted-light">{post.readTime}</span>
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {post.title}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {post.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-4 text-sm text-muted-light">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="w-full max-w-3xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_240px]">
            <div className="prose-custom">
              <MDXContent source={post.content} />
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents content={post.content} />
              </div>
            </aside>
          </div>
        </article>

        {/* Navigation */}
        <section className="w-full max-w-3xl px-6 pb-24">
          <div className="flex items-center justify-between gap-4">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="group flex-1">
                <GlassCard disableGlow className="flex items-center gap-3">
                  <ArrowLeft className="h-4 w-4 text-muted-light" />
                  <div className="flex-1 text-left">
                    <p className="text-xs text-muted-light">Previous</p>
                    <p className="text-sm font-medium text-foreground">{prev.title}</p>
                  </div>
                </GlassCard>
              </Link>
            ) : <div className="flex-1" />}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="group flex-1">
                <GlassCard disableGlow className="flex items-center gap-3 justify-end">
                  <div className="flex-1 text-right">
                    <p className="text-xs text-muted-light">Next</p>
                    <p className="text-sm font-medium text-foreground">{next.title}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-light" />
                </GlassCard>
              </Link>
            ) : <div className="flex-1" />}
          </div>
        </section>
      </main>

      <BackToTop />
      <Footer />
    </>
  );
}
