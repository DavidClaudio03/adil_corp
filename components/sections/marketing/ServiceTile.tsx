"use client";

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { MkService } from "@/types/marketing";

type Props = Readonly<{
    service: MkService;
    index: number; // para delay en animación
}>;

export default memo(function ServiceTile({ service, index }: Props) {
    return (
        <Card
            className="gradient-border hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-tertiary/60 group animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="gradient-border-content">
                <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 gradient-adilcorp rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                            <service.icon className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <h3 className="font-semibold mb-2 text-balance">{service.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty">{service.description}</p>
                </CardContent>
            </div>
        </Card>
    );
});
