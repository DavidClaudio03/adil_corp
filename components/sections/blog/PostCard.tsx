"use client";

import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateES } from "@/lib/format";
import type { BlogPost } from "@/types/blog";

export default function PostCard({ post }: { post: BlogPost }) {
    return (
        <Card className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
            <div className="relative">
                <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-t-lg" loading="lazy" />
                <Badge
                    className={`absolute top-3 right-3 ${post.category === "Marketing Digital"
                            ? "bg-tertiary text-tertiary-foreground"
                            : "bg-primary/90 text-white"
                        }`}
                >
                    {post.category}
                </Badge>

            </div>
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center"><Calendar className="h-3 w-3 mr-1" />{formatDateES(post.date)}</div>
                    <div className="flex items-center"><Clock className="h-3 w-3 mr-1" />{post.readTime}</div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-balance line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 text-pretty line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center"><User className="h-3 w-3 mr-1 text-primary" /><span className="text-xs font-medium">{post.author}</span></div>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center border border-primary text-primary hover:bg-primary/10 bg-transparent px-2 py-1 rounded-md text-xs">
                        Leer <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
