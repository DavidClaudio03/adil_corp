import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Automotriz from "@/components/sections/automotriz/Automotriz";
import Marketing from "@/components/sections/marketing/Marketing";
import MiniPorfolio from "@/components/sections/portafolio/MiniPortafolio";
import Benefits from "@/components/sections/benefits/Benefits";
import Testimonials from "@/components/sections/testimonials/Testimonials";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Automotriz />
        <Marketing />
        <MiniPorfolio />
        <Benefits />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
