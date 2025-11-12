import { notFound } from "next/navigation";
import Link from "next/link";
import { AUTO_SERVICES } from "@/config/automotive";

type Props = { params: { serviceId: string } };

export function generateStaticParams() {
    return AUTO_SERVICES.map(s => ({ serviceId: s.id }));
}

export function generateMetadata({ params }: Props) {
    const svc = AUTO_SERVICES.find(s => s.id === params.serviceId);
    if (!svc) return {};
    return {
        title: `${svc.title} | Servicios`,
        description: svc.description,
    };
}

export default function ServicioPage({ params }: Props) {
    const service = AUTO_SERVICES.find(s => s.id === params.serviceId);
    if (!service) notFound();

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-18 max-w-7xl mx-auto bg-red-50">
            {/* Aquí va tu contenido real de la subpágina */}
            <section className="space-y-8 mt-8">
                <div className="rounded-2xl border p-6">
                    <p className="text-sm text-muted-foreground">
                        Inserta aquí los bloques específicos de <span className="font-medium">{service.title}</span>.
                    </p>
                </div>
            </section>
        </div>
    );
}
