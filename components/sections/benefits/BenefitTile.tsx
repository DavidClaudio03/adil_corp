"use client";

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { BenefitItem } from "@/types/benefits";

type Props = Readonly<{
    benefit: BenefitItem;
    index: number; // para escalonar animación
}>;

export default memo(function BenefitTile({ benefit, index }: Props) {
    return (
        <Card
            className="glassmorphism border-primary/20 hover:border-primary/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40 group animate-fade-in-up"
            style={{ animationDelay: `${index * 0.15}s` }}
        >
            <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                </div>
                <h3 className="font-semibold mb-2 text-balance">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{benefit.description}</p>
            </CardContent>
        </Card>
    );
});
