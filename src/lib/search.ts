"use client";

export interface SearchResult {
  type: "post" | "tag" | "page";
  id: string;
  title: string;
  description?: string;
  href: string;
  tags?: string[];
  date?: string;
  score: number;
}

const STATIC_PAGES: SearchResult[] = [
  {
    type: "page",
    id: "page-home",
    title: "Home",
    description: "Go to homepage",
    href: "/",
    score: 0,
  },
  {
    type: "page",
    id: "page-blog",
    title: "Blog",
    description: "Read articles",
    href: "/blog",
    score: 0,
  },
  {
    type: "page",
    id: "page-projects",
    title: "Projects",
    description: "View projects",
    href: "/projects",
    score: 0,
  },
  {
    type: "page",
    id: "page-about",
    title: "About",
    description: "Learn more about me",
    href: "/about",
    score: 0,
  },
  {
    type: "page",
    id: "page-guestbook",
    title: "Guestbook",
    description: "Leave a message",
    href: "/guestbook",
    score: 0,
  },
];

function scoreResult(item: SearchResult, query: string): number {
  const q = query.toLowerCase();
  let score = 0;

  if (item.type === "post") {
    if (item.title.toLowerCase() === q) score += 100;
    else if (item.title.toLowerCase().startsWith(q)) score += 80;
    else if (item.title.toLowerCase().includes(q)) score += 60;

    if (item.tags) {
      for (const tag of item.tags) {
        if (tag.toLowerCase() === q) score += 50;
        else if (tag.toLowerCase().includes(q)) score += 30;
      }
    }

    if (item.description?.toLowerCase().includes(q)) score += 20;
  } else if (item.type === "tag") {
    if (item.title.toLowerCase() === q) score += 70;
    else if (item.title.toLowerCase().includes(q)) score += 40;
  } else {
    if (item.title.toLowerCase() === q) score += 90;
    else if (item.title.toLowerCase().startsWith(q)) score += 70;
    else if (item.title.toLowerCase().includes(q)) score += 50;
    if (item.description?.toLowerCase().includes(q)) score += 15;
  }

  return score;
}

export function searchResults(
  query: string,
  posts: SearchResult[],
  tags: SearchResult[]
): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const results: SearchResult[] = [];

  for (const post of posts) {
    const result = { ...post, score: 0 };
    result.score = scoreResult(result, trimmed);
    if (result.score > 0) results.push(result);
  }

  for (const tag of tags) {
    const result = { ...tag, score: 0 };
    result.score = scoreResult(result, trimmed);
    if (result.score > 0) results.push(result);
  }

  for (const page of STATIC_PAGES) {
    const result = { ...page, score: 0 };
    result.score = scoreResult(result, trimmed);
    if (result.score > 0) results.push(result);
  }

  return results.sort((a, b) => b.score - a.score);
}

export function getSearchHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("search-history");
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) return parsed as string[];
    return [];
  } catch {
    return [];
  }
}

export function addSearchHistory(query: string): void {
  if (typeof window === "undefined") return;
  const trimmed = query.trim();
  if (!trimmed) return;

  const history = getSearchHistory();
  const filtered = history.filter((q) => q !== trimmed);
  const updated = [trimmed, ...filtered].slice(0, 5);
  localStorage.setItem("search-history", JSON.stringify(updated));
}

export function clearSearchHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("search-history");
}
