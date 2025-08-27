"use client";

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types/testimonial";

type Props = Readonly<{
    item: Testimonial;
    index: number; // para delay de animación
}>;

export default memo(function TestimonialCard({ item, index }: Props) {
    return (
        <Card
            className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 group animate-fade-in-up"
            style={{ animationDelay: `${index * 0.2}s` }}
            aria-label={`Testimonio de ${item.name}, ${item.role} en ${item.company}`}
        >
            <CardContent className="p-6">
                <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-secondary mr-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    <div className="flex" aria-label={`Calificación ${item.rating} de 5`}>
                        {Array.from({ length: item.rating }).map((_, i) => (
                            <Star
                                key={i}
                                className="h-4 w-4 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300"
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                </div>

                {/* Semántica: blockquote + cite */}
                <blockquote className="text-muted-foreground mb-6 text-pretty italic">
                    “{item.quote}”
                </blockquote>

                <div className="border-t border-border pt-4">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                    <p className="text-sm text-primary font-medium">
                        <cite>{item.company}</cite>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
});
