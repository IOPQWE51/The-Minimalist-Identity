import type { Metadata } from "next";
import { Aurora } from "@/components/Aurora";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getAllPosts, getAllTags } from "@/lib/posts";
import BlogListing from "@/app/blog/BlogListing";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on design, code, and the quiet beauty of restraint.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <Aurora />
      <Navbar />

      <main className="relative z-10 px-6 pt-28 pb-20">
        <div className="mx-auto max-w-5xl">
          <BlogListing posts={posts} tags={tags} />
        </div>
      </main>

      <Footer />
    </>
  );
}
