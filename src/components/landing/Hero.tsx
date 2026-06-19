import { motion } from "framer-motion";
import { BackgroundBlobs } from "./BackgroundBlobs";

const avatars = [
  "linear-gradient(135deg,#f472b6,#a855f7)",
  "linear-gradient(135deg,#22d3ee,#3b82f6)",
  "linear-gradient(135deg,#fb923c,#ef4444)",
  "linear-gradient(135deg,#4ade80,#22d3ee)",
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      <BackgroundBlobs />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 mt-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-white/85"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-neon-magenta opacity-75 animate-pulse-ring" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-magenta" />
          </span>
          Mapa en vivo · Arequipa
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Estás a{" "}
          <span className="text-gradient-vibrant">500 metros de </span>
          un plan,
          <span className="text-gradient-vibrant"> una ayuda </span>
          o una respuesta.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-2xl text-base text-gray-300 sm:text-lg md:text-xl"
        >
          Publica lo que necesitas o descubre lo que pasa cerca: planes, taxis compartidos, objetos perdidos y ayuda rápida. Warpin conecta estudiantes en tiempo real con opción de ubicación exacta o protegida.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          <motion.a
            href="#interaccion"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="ios-button group relative inline-flex items-center justify-center rounded-full px-9 py-4 text-base font-semibold text-white transition-shadow sm:px-11 sm:py-5 sm:text-lg"
          >
            🚀 Asegura tu Acceso Anticipado
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            {avatars.map((bg, i) => (
              <div
                key={i}
                className="h-7 w-7 rounded-full border-2 border-background"
                style={{ background: bg }}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400 sm:text-sm">
            Únete a los primeros miembros fundadores de Arequipa
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { icon: '🛡', text: 'Ubicación protegida' },
            { icon: '⏱', text: 'Contenido efímero' },
            { icon: '✓', text: 'Usuarios verificados' },
          ].map((b) => (
            <span
              key={b.text}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 backdrop-blur-sm"
            >
              <span>{b.icon}</span>
              {b.text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#interaccion"
        aria-label="Desplázate para descubrir más"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60 hover:text-white"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.18em]">Descubre más</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.a>
    </section>
  );
}
