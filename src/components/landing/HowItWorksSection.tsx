import { motion } from "framer-motion";
import { Eye, Zap, MessageSquare, Sparkles, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CardData {
  num: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

const cards: CardData[] = [
  {
    num: "01",
    icon: Eye,
    title: "Descubre",
    desc: "Abre el mapa y mira publicaciones de estudiantes cerca de ti. En tiempo real.",
  },
  {
    num: "02",
    icon: Zap,
    title: "Publica",
    desc: "Lanza un PIN en segundos: un plan, una duda, una solicitud. Desaparece al expirar.",
  },
  {
    num: "03",
    icon: MessageSquare,
    title: "Comenta",
    desc: "Los comentarios son públicos y visibles para todos cerca. Sin necesidad de chat privado.",
  },
  {
    num: "04",
    icon: Sparkles,
    title: "Conecta",
    desc: "Acepta o envía solicitudes cercanas. El chat solo se abre si ambos aceptan.",
  },
  {
    num: "05",
    icon: Shield,
    title: "Controla",
    desc: "Tú eliges: ubicación exacta o ubicación protegida (40m a la redonda). Bloquea, reporta, protege.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="pasos" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-4 inline-block border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 rounded-full">
            Cómo funciona
          </span>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Cinco pasos.{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              Cero fricción.
            </span>
          </h2>
          <p className="mt-4 max-w-md text-sm text-white/55">
            De abrir el mapa a conectar con alguien cerca, en menos de un minuto.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.num}
                className="group rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-4xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                    {card.num}
                  </span>
                  <Icon className="h-6 w-6 text-white/30 transition-colors group-hover:text-white/70" />
                </div>
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-1.5 text-sm text-white/55">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
