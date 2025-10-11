"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Send } from "lucide-react";
import { sanitizeInput } from "@/lib/sanitize";

type LocalForm = {
    nombre: string; email: string; telefono: string; empresa: string;
    servicio: string[]; mensaje: string; acepta_terminos: boolean; website?: string;
};

export default function ContactForm({
    onSuccess,
}: { onSuccess: () => void }) {
    const [form, setForm] = useState<LocalForm>({
        nombre: "", email: "", telefono: "", empresa: "",
        servicio: [], mensaje: "", acepta_terminos: false, website: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const isValid = useMemo(() => {
        return (
            form.nombre.trim().length > 1 &&
            /\S+@\S+\.\S+/.test(form.email) &&
            form.telefono.trim().length > 6 &&
            form.servicio.length > 0 &&
            form.acepta_terminos === true
        );
    }, [form]);

    function setField<K extends keyof LocalForm>(key: K, val: LocalForm[K]) {
        setForm(f => ({ ...f, [key]: typeof val === "string" ? sanitizeInput(val) : val }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg(null);

        // anti-bot: si el honeypot viene con valor, aborta
        if (form.website && form.website.length > 0) return;

        if (!isValid) {
            setErrorMsg("Por favor, completa los campos obligatorios correctamente.");
            return;
        }

        setIsSubmitting(true);

        // Simulación envío — reemplazar con tu endpoint NESTJS
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const result = await res.json();
            if (!result.success) {
                setErrorMsg(result.message || "No se pudo enviar el mensaje.");
            } else {
                onSuccess();
            }
        } catch (err) {
            setErrorMsg("Ocurrió un error al enviar el mensaje.");
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <Card className="gradient-border">
            <div className="gradient-border-content">
                <CardContent className="p-6">
                    <div role="status" aria-live="polite" className="sr-only">
                        {isSubmitting ? "Enviando..." : ""}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        {/* honeypot */}
                        <input
                            type="text" name="website" value={form.website}
                            onChange={(e) => setField("website", e.target.value)}
                            className="hidden" autoComplete="off" tabIndex={-1}
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="nombre" className="text-sm font-medium mb-2 block">Nombre Completo *</label>
                                <Input
                                    id="nombre" required autoComplete="name"
                                    value={form.nombre} onChange={(e) => setField("nombre", e.target.value)}
                                    placeholder="Tu nombre completo"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium mb-2 block">Email *</label>
                                <Input
                                    id="email" type="email" required autoComplete="email"
                                    value={form.email} onChange={(e) => setField("email", e.target.value)}
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="telefono" className="text-sm font-medium mb-2 block">Teléfono *</label>
                                <Input
                                    id="telefono" inputMode="tel" autoComplete="tel" required
                                    value={form.telefono} onChange={(e) => setField("telefono", e.target.value)}
                                    placeholder="+593 99 123 4567"
                                />
                            </div>
                            <div>
                                <label htmlFor="empresa" className="text-sm font-medium mb-2 block">Empresa</label>
                                <Input
                                    id="empresa" autoComplete="organization"
                                    value={form.empresa} onChange={(e) => setField("empresa", e.target.value)}
                                    placeholder="Nombre de tu empresa"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Tipo de Servicio *
                            </label>
                            <div className="grid md:grid-cols-2 gap-2">
                                {[
                                    "Revisión Técnica Vehicular",
                                    "Asesoría Compra de Auto Usado",
                                    "Mantenimiento Puerta a Puerta",
                                    "Diseño de Página Web",
                                    "Gestión de Redes Sociales",
                                    "Campañas Publicitarias",
                                    "Marketing Digital Integral",
                                    "Consultoría Personalizada",
                                ].map((serv) => (
                                    <div key={serv} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={serv}
                                            checked={form.servicio.includes(serv)}
                                            onCheckedChange={(c) => {
                                                if (c) setField("servicio", [...(form.servicio as any), serv]);
                                                else
                                                    setField(
                                                        "servicio",
                                                        (form.servicio as any).filter((s: string) => s !== serv)
                                                    );
                                            }}
                                        />
                                        <label
                                            htmlFor={serv}
                                            className="text-sm text-muted-foreground cursor-pointer"
                                        >
                                            {serv}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="mensaje" className="text-sm font-medium mb-2 block">Mensaje</label>
                            <Textarea
                                id="mensaje" rows={4}
                                value={form.mensaje} onChange={(e) => setField("mensaje", e.target.value)}
                                placeholder="Cuéntanos más detalles sobre lo que necesitas..."
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terminos" checked={form.acepta_terminos}
                                onCheckedChange={(c) => setField("acepta_terminos", Boolean(c))}
                            />
                            <label htmlFor="terminos" className="text-sm text-muted-foreground">
                                Acepto los términos y condiciones y autorizo el tratamiento de mis datos personales
                            </label>
                        </div>

                        {errorMsg && (
                            <p className="text-sm text-red-600" role="alert">{errorMsg}</p>
                        )}

                        <Button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    Enviar Solicitud
                                    <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </div>
        </Card>
    );
}
