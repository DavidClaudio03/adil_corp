"use client";
import { Badge } from "@/components/ui/badge";
import { BLOG_COPY } from "@/config/blog";

export default function BlogHero() {
    const badgeText = BLOG_COPY.badgeText || "Blog & Recursos";
    return (
        <section className="pt-16 pb-4 px-4 sm:px-6 lg:px-8" id="blog">
            <div className="text-center mb-6">
                <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm bg-primary text-primary-foreground border-primary/30 animate-bounce">
                    {badgeText}
                </Badge>
            </div>
        </section>
    );
}
