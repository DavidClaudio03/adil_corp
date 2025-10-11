"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ContactForm from "./ContactForm";
import ContactSidebar from "./ContactSidebar";
import { CONTACT_COPY } from "@/config/contact";

export default function ContactMainGrid({ onSuccess }: { onSuccess: () => void }) {
    return (
        <section className="py-2 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Formulario */}
                    <div>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-4 text-gradient">{CONTACT_COPY.formTitle}</h2>
                            <p className="text-muted-foreground">{CONTACT_COPY.formLead}</p>
                        </div>

                        <Card className="gradient-border">
                            <div className="gradient-border-content">
                                <CardContent className="p-6">
                                    <ContactForm onSuccess={onSuccess} />
                                </CardContent>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar (Cobertura + Contacto rápido + Emergencias) */}
                    <ContactSidebar />
                </div>
            </div>
        </section>
    );
}
