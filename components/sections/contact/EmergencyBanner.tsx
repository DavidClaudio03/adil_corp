"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function EmergencyBanner() {
    return (
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <CardContent className="p-6 text-center">
                <h3 className="font-bold text-red-800 mb-2">Emergencias Automotrices</h3>
                <p className="text-red-600 text-sm mb-4">¿Tu vehículo se averió? Contáctanos las 24 horas</p>
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                    <a href="tel:+593999999999" aria-label="Llamar a emergencias automotrices ADIL CORP">
                        <Phone className="mr-2 h-4 w-4" />
                        Emergencia: +593 99 999 9999
                    </a>
                </Button>
            </CardContent>
        </Card>
    );
}
