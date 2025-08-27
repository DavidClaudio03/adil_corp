import Header from "@/components/header"
import Hero from "@/components/hero"
import Automotriz from "@/components/automotriz"
import Marketing from "@/components/marketing"
import MiniPortafolio from "@/components/mini-portafolio"
import BeneficiosAdil from "@/components/beneficios"
import Testimonios from "@/components/testimonios"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Automotriz />
      <Marketing />
      <MiniPortafolio />
      <BeneficiosAdil />
      <Testimonios />
      <Footer />
    </main>
  )
}
