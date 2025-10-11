"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail } from "lucide-react";

export default function QuickContact() {
    return (
        <Card className="glassmorphism border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                    Contacto Inmediato
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <a href="https://wa.me/593991234567" aria-label="Abrir WhatsApp de ADIL CORP">
                        <Phone className="mr-2 h-4 w-4" />
                        WhatsApp: +593 99 123 4567
                    </a>
                </Button>
                <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent">
                    <a href="mailto:info@adilservices.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Email: info@adilservices.com
                    </a>
                </Button>
                <div className="text-center pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Respuesta garantizada en:</p>
                    <div className="flex justify-center space-x-4">
                        <div className="text-center">
                            <div className="text-lg font-bold text-primary">Menos de 1 hora</div>
                            <div className="text-xs text-muted-foreground">WhatsApp</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
