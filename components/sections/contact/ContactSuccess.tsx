"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ContactSuccess({
    onReset,
    title,
    lead,
}: { onReset: () => void; title: string; lead: string }) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <Card className="max-w-md w-full text-center gradient-border">
                <div className="gradient-border-content">
                    <CardContent className="p-8">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-white" aria-hidden="true" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gradient">{title}</h2>
                        <p className="text-muted-foreground mb-6">{lead}</p>
                        <div className="space-y-3">
                            <Button onClick={onReset} className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                                Enviar Otro Mensaje
                            </Button>
                            <Link href="/">
                                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent">
                                    Volver al Inicio
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}
