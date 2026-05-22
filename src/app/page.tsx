import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { GrainOverlay } from "@/components/fx/Backgrounds";
import { SpotlightCursor } from "@/components/fx/SpotlightCursor";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <GrainOverlay />
      <SpotlightCursor />
      <Navbar />
      <main className="relative flex flex-1 flex-col">
        <Hero />
        <Trust />
        <Portfolio />
        <Process />
        <Testimonials />
        <WhyChoose />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
