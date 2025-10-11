"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, CheckCircle } from "lucide-react";

export default function CoverageCard({ areas, title, lead }: {
    areas: ReadonlyArray<string>;
    title: string;
    lead: string;
}) {
    return (
        <Card className="glassmorphism border-secondary/20">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-secondary" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">{lead}</p>
                <div className="grid grid-cols-2 gap-2">
                    {areas.map((area) => (
                        <div key={area} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm">{area}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
