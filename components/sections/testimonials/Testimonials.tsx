"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import TestimonialCard from "./TestimonialCard";
import { TESTIMONIALS, TESTIMONIALS_COPY } from "@/config/testimonials";
import { Badge } from "@/components/ui/badge";



export default function Testimonials() {
    const testimonialsRef = useRef<HTMLElement>(null);
    useRevealOnScroll([testimonialsRef]);
    const badgeText = TESTIMONIALS_COPY.badgeText || "Testimonios";

    return (
        <section ref={testimonialsRef} id="testimonios" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 to-primary/5">
            <div className="text-center mb-6">
                <Badge className="mb-6 bg-secondary text-secondary-foreground border-primary/30 animate-bounce">
                    {badgeText}
                </Badge>
            </div>
            <div className="max-w-7xl mx-auto">
                {/* Título */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient animate-gradient-x">
                        {TESTIMONIALS_COPY.heading}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {TESTIMONIALS_COPY.subheading}
                    </p>
                </div>

                {/* Grid de testimonios */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {TESTIMONIALS.map((t, i) => (
                        <TestimonialCard key={t.id} item={t} index={i} />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-4xl mx-auto hover:shadow-xl transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-4 text-gradient animate-gradient-x">
                            {TESTIMONIALS_COPY.bannerHeading}
                        </h3>
                        <p className="text-lg text-muted-foreground mb-6">
                            {TESTIMONIALS_COPY.bannerLead}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-primary/90 to-secondary/60 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25 group"
                            >
                                {TESTIMONIALS_COPY.primaryCta}
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-secondary text-primary hover:bg-secondary/10 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/10 group"
                            >
                                {TESTIMONIALS_COPY.secondaryCta}
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
