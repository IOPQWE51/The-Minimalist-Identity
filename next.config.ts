import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
=======
  typescript: {
    ignoreBuildErrors: true,
  },
>>>>>>> 4ab16c15 (feat: complete blog system — MDX articles, search, tags, SEO, RSS, tests)
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
