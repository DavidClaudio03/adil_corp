"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import BenefitTile from "./BenefitTile";
import { BENEFITS, BENEFITS_COPY } from "@/config/benefits";

export default function Benefits() {
    const benefitsRef = useRef<HTMLElement>(null);
    useRevealOnScroll([benefitsRef]);

    return (
        <section ref={benefitsRef} id="beneficios" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
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
