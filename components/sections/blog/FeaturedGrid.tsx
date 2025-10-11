"use client";
import type { BlogPost } from "@/types/blog";
import FeaturedCard from "./FeaturedCard";

export default function FeaturedGrid({ posts }: { posts: ReadonlyArray<BlogPost> }) {
    if (!posts.length) return null;
    return (
        <section className="py-2 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Artículos Destacados</h2>
                    <p className="text-lg text-muted-foreground">Los contenidos más valiosos para tu negocio</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {posts.map(p => <FeaturedCard key={p.id} post={p} />)}
                </div>
            </div>
        </section>
    );
}
