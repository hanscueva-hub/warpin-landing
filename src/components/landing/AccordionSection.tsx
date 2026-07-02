import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const categories = [
  {
    title: "👥 Social",
    accent: "oklch(0.75 0.2 50)",
    posts: [
      { user: "Lucia M.", text: "¿Alguien para almorzar por la U?", dist: "0.4 km" },
      { user: "Andrés T.", text: "Estoy libre una hora, ¿quién para conversar?", dist: "0.6 km" },
      { user: "Camila R.", text: "¿Grupo para jugar fútbol/vóley más tarde?", dist: "0.9 km" },
    ],
  },
  {
    title: "🚨 Ayuda",
    accent: "oklch(0.62 0.22 15)",
    posts: [
      { user: "Tomás V.", text: "¿Alguien tiene cargador tipo C que me preste?", dist: "0.1 km" },
      { user: "Ana R.", text: "¿Dónde queda el pabellón de medicina?", dist: "0.05 km" },
      { user: "Pablo M.", text: "¿Alguien tiene el apunte de cálculo?", dist: "0.3 km" },
    ],
  },
  {
    title: "🚕 Transporte",
    accent: "oklch(0.82 0.18 200)",
    posts: [
      { user: "Joaquín P.", text: "Voy para Cayma, ¿alguien comparte taxi?", dist: "0.2 km" },
      { user: "Renata G.", text: "¿Quién baja al centro en 10 min?", dist: "0.9 km" },
      { user: "Mateo S.", text: "Busco gente para dividir taxi saliendo de la U", dist: "0.1 km" },
    ],
  },
  {
    title: "🎲 Random",
    accent: "oklch(0.65 0.25 290)",
    posts: [
      { user: "Gael O.", text: "¿Alguien para charlar un rato sobre cualquier cosa?", dist: "0.5 km" },
      { user: "Luciana F.", text: "Recomendaciones de música indie para estudiar", dist: "0.8 km" },
      { user: "Matías K.", text: "¿Algún dato random de la UCSM que debería saber?", dist: "0.3 km" },
    ],
  },
];

export function AccordionSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="categorias" className="relative px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 backdrop-blur-md">
            Categorías
          </div>
          <h2 className="text-balance text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Un radar para cada necesidad espontánea.
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {categories.map((cat, i) => {
            const isOpen = open === i;
            return (
              <div
                key={cat.title}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-colors"
                style={isOpen ? { borderColor: `${cat.accent}`, boxShadow: `0 0 30px -10px ${cat.accent}` } : undefined}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-base font-semibold text-white sm:text-lg">{cat.title}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="h-5 w-5 text-white/70" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <div className="space-y-2 px-5 pb-5">
                        {cat.posts.map((p, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: j * 0.08 }}
                            className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md"
                          >
                            <div
                              className="h-8 w-8 shrink-0 rounded-full"
                              style={{ background: `linear-gradient(135deg, ${cat.accent}, oklch(0.55 0.28 300))` }}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-semibold text-white">{p.user}</span>
                                <span className="text-[10px] text-white/40">📍 {p.dist}</span>
                              </div>
                              <p className="text-sm text-white/80">{p.text}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
