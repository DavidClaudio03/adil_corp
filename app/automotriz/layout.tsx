import type { ReactNode } from "react";
// Ajusta las rutas de estos componentes según tu estructura real:
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export default function AutomotrizLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="min-h-[60vh]">{children}</main>
            <Footer />
        </div>
    );
}
