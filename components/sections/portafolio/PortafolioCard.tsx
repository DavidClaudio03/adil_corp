"use client";

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { CaseStudy } from "@/types/portafolio";
import { TrendingUp, BarChart3 } from "lucide-react";

type Props = Readonly<{ item: CaseStudy }>;

export default memo(function PortfolioCard({ item }: Props) {
    const isPrimary = item.accent === "primary";

    // estilos derivados sin cambiar tu look & feel
    const borderClass = isPrimary
        ? "glassmorphism border-primary/20 hover:border-primary/40"
        : "glassmorphism border-secondary/20 hover:border-secondary/40";
    const metricColor = isPrimary ? "text-secondary" : "text-primary";
    const gradientBox = isPrimary
        ? "bg-gradient-to-r from-primary to-secondary"
        : "bg-gradient-to-r from-secondary to-primary";

    return (
        <Card className={`${borderClass} transition-all duration-300 hover:scale-105 hover:shadow-xl group`}>
            <CardContent className="p-6">
                <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${gradientBox} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                        <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

                <div className={`flex items-center text-sm ${metricColor} group-hover:scale-105 transition-transform duration-300`}>
                    {isPrimary ? (
                        <TrendingUp className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    ) : (
                        <BarChart3 className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    )}
                    {item.metricText}
                </div>
            </CardContent>
        </Card>
    );
});
