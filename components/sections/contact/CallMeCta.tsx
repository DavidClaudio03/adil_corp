"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CallMeCta({
    title,
    lead,
}: { title: string; lead: string }) {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
                    <h2 className="text-3xl font-bold mb-4 text-gradient">{title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{lead}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <Input placeholder="+593 99 123 4567" className="flex-1" inputMode="tel" autoComplete="tel" />
                        <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                            Llamarme Ahora
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
