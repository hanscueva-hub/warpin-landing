import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import campusPhoto from '@/assets/warpin-campus.jpg';

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

const infoCards = [
  {
    title: 'El campus como punto de partida',
    body: 'El lanzamiento será exclusivo en la UCSM y sus zonas comerciales cercanas. Queremos construir una comunidad real, no un mar de extraños.',
  },
  {
    title: 'Pensado para tu día a día',
    body: 'WARPIN nace para resolver lo que pasa entre clases, en el patio, al salir de la U: planes, taxis, apuntes y conexiones reales.',
  },
];

export function ZonaCeroSection() {
  return (
    <section id="zona-cero" className="px-6 py-16 sm:py-20 relative overflow-hidden">
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
        className="mx-auto max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Badge */}
        <motion.div variants={fadeUpVariants} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80">
            Zona Cero
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeUpVariants}
          className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-12"
        >
          Empezamos donde tú estás:
          <br />
          <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            UCSM
          </span>
        </motion.h2>

        {/* Photo + info grid */}
        <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
          {/* Campus photo */}
          <motion.div
            variants={fadeUpVariants}
            className="relative overflow-hidden rounded-3xl border border-white/10 min-h-[260px]"
          >
            <img
              src={campusPhoto}
              alt="Vista aérea nocturna del campus de la UCSM en Arequipa"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                <GraduationCap className="h-4.5 w-4.5 text-cyan-400" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Universidad Católica de Santa María</p>
                <p className="text-xs text-white/60">Arequipa · Punto de partida oficial</p>
              </div>
            </div>
          </motion.div>

          {/* Info cards */}
          <div className="flex flex-col gap-4">
            {infoCards.map(({ title, body }) => (
              <motion.div
                key={title}
                variants={fadeUpVariants}
                className="rounded-2xl glass p-6"
              >
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
              </motion.div>
            ))}

            <motion.div
              variants={fadeUpVariants}
              className="flex flex-1 flex-col justify-between rounded-2xl glass p-6"
            >
              <div>
                <h3 className="text-base font-bold text-white">Próximas zonas</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Después de UCSM, expandimos campus por campus. ¿Quieres traer WARPIN al tuyo?
                </p>
              </div>
              <a
                href="https://tally.so/r/WOqWOk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Postular campus a lista de espera"
                className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Postular mi campus →
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
