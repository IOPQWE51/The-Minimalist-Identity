import type { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import BlogListing from "@/app/blog/BlogListing";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((t) => ({ tag: encodeURIComponent(t.tag) }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
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

  const allTags = getAllTags();

  return <BlogListing posts={posts} allTags={allTags} activeTag={decodedTag} />;
}
