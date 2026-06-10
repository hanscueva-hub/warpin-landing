import { motion } from "framer-motion";

const chatMessages = [
  { name: "Carla", text: "Perdí mis llaves 😩", time: "10:42" },
  { name: "Diego", text: "¿Que haran hoy?", time: "10:45" },
  { name: "Ana", text: "Alguien sabe...", time: "10:47" },
  { name: "+128", text: "@todos lean arriba", time: "10:49" },
  { name: "Luis", text: "no leí nada jaja", time: "10:51" },
];

const pins = [
  { from: { top: "18%", left: "22%" }, to: { top: "28%", left: "38%" }, color: "oklch(0.75 0.2 50)", label: "🍻 Previa 9PM", duration: 6 },
  { from: { top: "52%", left: "68%" }, to: { top: "62%", left: "55%" }, color: "oklch(0.82 0.18 200)", label: "🚕 Taxi a Cayma", duration: 7 },
  { from: { top: "72%", left: "24%" }, to: { top: "65%", left: "35%" }, color: "oklch(0.78 0.22 145)", label: "📚 Cargador C", duration: 8 },
  { from: { top: "30%", left: "72%" }, to: { top: "42%", left: "60%" }, color: "oklch(0.68 0.25 320)", label: "🎱 Falta 1 billar", duration: 6.5 },
];

export function ProblemSection() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Pasan mil cosas a tu alrededor, pero te las estás perdiendo.
          </h2>
          <p className="mt-5 text-gray-300 sm:text-lg">
            ¿Perdiste algo en la cafetería? ¿Buscas con quién compartir taxi? ¿Falta uno para el billar?
            ¿Grupo para socializar en la noche? Los grupos de WhatsApp están saturados y las redes tradicionales no son en tiempo real.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Chaos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[oklch(0.18_0.02_150)] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-white/80">Grupo: Universidad 2026</span>
              <span className="text-xs text-white/40">238 miembros</span>
            </div>
            <div className="space-y-2">
              {chatMessages.map((m, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="h-7 w-7 shrink-0 rounded-full bg-white/10" />
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-[oklch(0.25_0.03_150)] px-3 py-2">
                    <div className="text-xs font-semibold text-emerald-300">{m.name}</div>
                    <div className="text-sm text-white/70">{m.text}</div>
                    <div className="mt-1 text-[10px] text-white/30">{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[oklch(0.18_0.02_150)] to-transparent" />
            <div className="absolute right-4 top-4 rounded-full bg-red-500/90 px-2 py-0.5 text-xs font-bold text-white">
              99+
            </div>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl glass p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">📍 WARPIN · Radar local</span>
              <span className="text-xs text-neon-cyan">en vivo</span>
            </div>
            <div className="relative h-[320px] overflow-hidden rounded-2xl bg-[oklch(0.14_0.04_270)]">
              <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full opacity-60">
                <defs>
                  <pattern id="grid2" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="oklch(0.3 0.05 270)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="400" height="320" fill="url(#grid2)"/>
                <circle cx="200" cy="160" r="60" fill="none" stroke="oklch(0.68 0.31 340 / 0.3)" strokeWidth="1"/>
                <circle cx="200" cy="160" r="110" fill="none" stroke="oklch(0.68 0.31 340 / 0.2)" strokeWidth="1"/>
              </svg>
              {pins.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, top: p.from.top, left: p.from.left }}
                  whileInView={{
                    scale: 1,
                    top: [p.from.top, p.to.top, p.from.top],
                    left: [p.from.left, p.to.left, p.from.left],
                  }}
                  viewport={{ once: true }}
                  transition={{
                    scale: { delay: 0.3 + i * 0.15, type: "spring" },
                    top: { duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
                    left: { duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full opacity-60 blur-md" style={{ background: p.color }} />
                    <div className="relative rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-lg" style={{ background: p.color, color: "oklch(0.1 0.05 270)" }}>
                      {p.label}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_white]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
