import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { CTA } from "@/components/sections/CTA";
import { GrainOverlay } from "@/components/fx/Backgrounds";
import { SpotlightCursor } from "@/components/fx/SpotlightCursor";
import { SlideDeck, type Slide } from "@/components/ui/SlideDeck";

export default function Home() {
  const slides: Slide[] = [
    { id: "top", label: "Студия", element: <Hero /> },
    { id: "trust", label: "Доверие", element: <Trust /> },
    { id: "services", label: "Услуги", element: <Services /> },
    { id: "portfolio", label: "Работы", element: <Portfolio /> },
    { id: "process", label: "Процесс", element: <Process /> },
    { id: "testimonials", label: "Отзывы", element: <Testimonials /> },
    { id: "why", label: "Почему я", element: <WhyChoose /> },
    { id: "contact", label: "Заказ", element: <CTA /> },
  ];

  return (
    <>
      <GrainOverlay />
      <SpotlightCursor />
      <Navbar />
      <SlideDeck slides={slides} />
    </>
  );
}
