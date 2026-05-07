import type { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { Aurora } from "@/components/Aurora";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import BlogListing from "@/app/blog/BlogListing";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((t) => ({ tag: encodeURIComponent(t.tag) }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `#${decodedTag}`,
    description: `Articles tagged with "${decodedTag}".`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);
  const tags = getAllTags();

  return (
    <>
      <Aurora />
      <Navbar />

      <main className="relative z-10 px-6 pt-28 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
              #{decodedTag}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {posts.length} article{posts.length !== 1 ? "s" : ""} tagged with "{decodedTag}"
            </p>
          </div>

          <BlogListing posts={posts} tags={tags} activeTag={decodedTag} />
        </div>
      </main>

      <Footer />
    </>
  );
}
