'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const statCards = [
  {
    emoji: '🎓',
    stat: 'UCSM',
    label: 'Primer campus',
  },
  {
    emoji: '📍',
    stat: 'Arequipa, Perú',
    label: 'Ciudad de lanzamiento',
  },
  {
    emoji: '🔒',
    stat: '500 cupos',
    label: 'Primera generación',
  },
];

export function ZonaCeroSection() {
  return (
    <section
      id="zona-cero"
      className="px-6 py-16 sm:py-20 relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        className="mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Badge */}
        <motion.div
          variants={fadeUpVariants}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-500" />
          </span>
          ⚡ Beta activa — solo por invitación
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeUpVariants}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4"
        >
          El primer campus.
          <br />
          <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
            La primera ola.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeUpVariants}
          className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto"
        >
          WARPIN comienza en la UCSM — Arequipa, Perú. Los primeros 500
          fundadores escribirán la historia de la app.
        </motion.p>

        {/* Stat cards */}
        <motion.div
          variants={fadeUpVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10"
        >
          {statCards.map(({ emoji, stat, label }) => (
            <div
              key={label}
              className="rounded-3xl glass p-6 text-center"
            >
              <div className="text-3xl mb-2">{emoji}</div>
              <div className="text-lg font-bold text-white">{stat}</div>
              <div className="text-xs text-white/50 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Separator */}
        <motion.hr
          variants={fadeUpVariants}
          className="mt-10 border-t border-white/8"
        />

        {/* Below separator */}
        <motion.div
          variants={fadeUpVariants}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <p className="text-sm text-white/60">¿Eres de otra universidad?</p>
          <a
            href="https://tally.so/r/WOqWOk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Postular campus a lista de espera"
            className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Postular mi campus →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
