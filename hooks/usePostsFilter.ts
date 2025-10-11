import { useMemo, useState } from "react";
import type { BlogPost } from "@/types/blog";
import { clean } from "@/lib/sanitize";

export function usePostsFilter(posts: ReadonlyArray<BlogPost>) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | BlogPost["category"]>("all");

  const filtered = useMemo(() => {
    const k = clean(search).toLowerCase();
    return posts.filter((p) => {
      const matchesSearch =
        !k ||
        p.title.toLowerCase().includes(k) ||
        p.excerpt.toLowerCase().includes(k);
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [posts, search, category]);

  const featured = useMemo(() => posts.filter((p) => p.featured), [posts]);

  return { search, setSearch, category, setCategory, filtered, featured };
}
