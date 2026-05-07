import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  readTime: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author?: string;
  draft?: boolean;
}

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function parseFile(file: string): BlogPost | null {
  const slug = file.replace(/\.(md|mdx)$/, "");
  const filePath = path.join(POSTS_DIR, file);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const rt = readingTime(content);

  const tags = data.tags
    ? data.tags.map((t: string) => t.trim())
    : data.tag
      ? [data.tag.trim()]
      : ["General"];

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString().split("T")[0],
    tags,
    readTime: data.readTime || rt.text,
    excerpt: data.excerpt || content.slice(0, 150).trim() + "...",
    content,
    coverImage: data.coverImage,
    author: data.author || "Aura",
    draft: data.draft || false,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files
    .map(parseFile)
    .filter((p): p is BlogPost => p !== null && !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (fs.existsSync(filePath)) return parseFile(`${slug}.md`);
  if (fs.existsSync(mdxPath)) return parseFile(`${slug}.mdx`);
  return null;
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  posts.forEach((p) => {
    p.tags.forEach((t) => {
      map.set(t, (map.get(t) || 0) + 1);
    });
  });
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count);
}

export function getPaginatedPosts(
  page: number = 1,
  perPage: number = 6
): {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
} {
  const all = getAllPosts();
  const totalPages = Math.ceil(all.length / perPage);
  const start = (page - 1) * perPage;
  const posts = all.slice(start, start + perPage);

  return {
    posts,
    totalPages,
    currentPage: page,
    totalPosts: all.length,
  };
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}
