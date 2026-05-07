import { Sparkles, ArrowRight } from "lucide-react";
import { Aurora } from "@/components/Aurora";
import { Navbar } from "@/components/Navbar";
import { GlassCard } from "@/components/GlassCard";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { getRecentPosts } from "@/lib/posts";
import Link from "next/link";
import HomeClient from "./HomeClient";

export default function Home() {
  const recentPosts = getRecentPosts(6);

  return (
    <>
      <Aurora />
      <Navbar />
      <HomeClient recentPosts={recentPosts} />
      <Footer />
    </>
  );
}
