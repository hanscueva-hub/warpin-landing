import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { TickerSection } from "@/components/landing/TickerSection";
import { WhatIsSection } from "@/components/landing/WhatIsSection";
import { InteractionSection } from "@/components/warpin/InteractionSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { AccordionSection } from "@/components/landing/AccordionSection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { ZonaCeroSection } from "@/components/landing/ZonaCeroSection";
import { DropsSection } from "@/components/landing/DropsSection";
import { FounderSection } from "@/components/landing/FounderSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA, Footer } from "@/components/landing/FinalCTA";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WARPIN — Tu radar social en tiempo real" },
      { name: "description", content: "App de socialización local en tiempo real para universitarios menores de 30. Beta cerrada en UCSM." },
      { property: "og:title", content: "WARPIN — Tu radar social en tiempo real" },
      { property: "og:description", content: "Conecta al instante con personas cerca de ti. Únete a la beta cerrada." },
    ],
  }),
  component: Landing,
});

const WHATSAPP_URL = "https://chat.whatsapp.com/IK4zPo8yN4gIc9Y5RY1ecq";

function Landing() {
  useReveal();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <Header />
      <main className="relative z-10">
        <Hero />
        <TickerSection />
        <WhatIsSection />
        <InteractionSection />
        <HowItWorksSection />
        <AccordionSection />
        <PrivacySection />
        <ZonaCeroSection />
        <DropsSection />
        <FounderSection />
        <TestimonialsSection />
        <FinalCTA />
        <FAQSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

/* ---------------- Floating WhatsApp ---------------- */
function FloatingWhatsApp() {
  return (
    <a 
      href={WHATSAPP_URL} 
      target="_blank" 
      rel="noreferrer" 
      aria-label="Entrar a la Comunidad de WhatsApp"
      className="btn-glass-whatsapp group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full py-3 pl-3 pr-4 text-white animate-glow-pulse hover:scale-105"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
        <WhatsAppIcon className="h-5 w-5" />
      </span>
      <span className="hidden text-sm font-bold sm:inline">Comunidad WhatsApp</span>
    </a>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.05 4.91A10 10 0 0 0 4.05 18.7L3 22l3.43-1A10 10 0 1 0 19.05 4.91Zm-7.05 16a8 8 0 0 1-4.07-1.11l-.29-.17-2.04.6.61-2-.19-.3A8 8 0 1 1 12 20.91Zm4.55-5.85c-.25-.13-1.47-.73-1.7-.82s-.39-.13-.56.13-.64.82-.79.99-.29.19-.54.06a6.55 6.55 0 0 1-1.93-1.19 7.25 7.25 0 0 1-1.34-1.67c-.14-.24 0-.37.11-.49s.25-.29.37-.43a1.68 1.68 0 0 0 .25-.41.45.45 0 0 0 0-.43c-.06-.13-.56-1.35-.77-1.84s-.41-.42-.56-.43h-.48a.92.92 0 0 0-.67.31 2.81 2.81 0 0 0-.88 2.09 4.88 4.88 0 0 0 1 2.59 11.18 11.18 0 0 0 4.27 3.77 14.4 14.4 0 0 0 1.43.53 3.42 3.42 0 0 0 1.58.1 2.58 2.58 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .15-1.2c-.06-.11-.23-.18-.49-.31Z" />
    </svg>
  );
}
