import Header from "@/components/layout/Header";
import { CASE_STUDIES } from "@/config/portafolio";
import PortfolioCard from "@/components/sections/portafolio/PortafolioCard";

export const metadata = {
    title: "Portafolio | ADIL CORP",
    description: "Casos de éxito y proyectos destacados de ADIL CORP",
};

export default function PortfolioPage() {
    return (
        <>
            <Header />
            <main className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Portafolio</h1>
                    <p className="text-muted-foreground mb-10">
                        Casos de éxito y resultados impulsados por estrategias digitales y asesoría automotriz.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {CASE_STUDIES.map(cs => (
                            <PortfolioCard key={cs.id} item={cs} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
