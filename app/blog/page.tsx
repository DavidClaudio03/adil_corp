"use client";

import BlogHero from "@/components/sections/blog/BlogHero";
import FeaturedGrid from "@/components/sections/blog/FeaturedGrid";
// import SearchFilterBar from "@/components/sections/blog/SearchFilterBar";
// import PostsGrid from "@/components/sections/blog/PostsGrid";
// import EmptyState from "@/components/sections/blog/EmptyState";
import BlogCta from "@/components/sections/blog/BlogCta";

import { BLOG_POSTS } from "@/config/blog";
import { usePostsFilter } from "@/hooks/usePostsFilter";

export default function BlogPage() {
    const { search, setSearch, category, setCategory, filtered, featured } = usePostsFilter(BLOG_POSTS);

    return (
        <div className="min-h-screen bg-background">
            <BlogHero />
            <FeaturedGrid posts={featured} />
            {/* Estos el el Blog por busqueda y filtro */}
            {/* <SearchFilterBar
                value={search}
                onChange={setSearch}
                category={category}
                onCategory={setCategory as (c: string) => void}
            />
            {filtered.length ? (
                <PostsGrid posts={filtered} />
            ) : (
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <EmptyState onReset={() => { setSearch(""); setCategory("all"); }} />
                    </div>
                </section>
            )} */}
            <BlogCta />
        </div>
    );
}
