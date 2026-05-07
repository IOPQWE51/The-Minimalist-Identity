import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Aurora } from "@/components/Aurora";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getAllPosts, getPaginatedPosts, getPostsByTag, getAllTags } from "@/lib/posts";
import BlogListing from "./BlogListing";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on design, code, and the quiet beauty of restraint.",
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const activeTag = params.tag || null;

  let posts;
  let totalPages = 1;

  if (activeTag) {
    const allFiltered = getPostsByTag(activeTag);
    const perPage = 6;
    totalPages = Math.ceil(allFiltered.length / perPage);
    const start = (currentPage - 1) * perPage;
    posts = allFiltered.slice(start, start + perPage);
  } else {
    const result = getPaginatedPosts(currentPage);
    posts = result.posts;
    totalPages = result.totalPages;
  }

  if (currentPage > totalPages && totalPages > 0) {
    notFound();
  }

  return (
    <>
      <Aurora />
      <Navbar />
      <main className="relative z-10 flex flex-col items-center pt-28 pb-24">
        <BlogListing
          posts={posts}
          allTags={getAllTags()}
          activeTag={activeTag}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </main>
      <Footer />
    </>
  );
}
