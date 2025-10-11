"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import BenefitTile from "./BenefitTile";
import { BENEFITS, BENEFITS_COPY } from "@/config/benefits";
import { Badge } from "@/components/ui/badge";

const badgeText = BENEFITS_COPY.BadgeText || "Beneficios";

export default function Benefits() {
    const benefitsRef = useRef<HTMLElement>(null);
    useRevealOnScroll([benefitsRef]);

    return (
        <section ref={benefitsRef} id="beneficios" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-secondary/5">
            <div className="text-center mb-6">
                <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm bg-secondary-foreground text-primary-foreground border-primary/30 animate-bounce">
                    {badgeText}
                </Badge>
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient animate-gradient-x">
                        {BENEFITS_COPY.heading}
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {BENEFITS.map((b, i) => (
                        <BenefitTile key={b.id} benefit={b} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
