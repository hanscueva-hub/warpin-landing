import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';

const benefits = [
  'Título Fundador Élite dentro de la app, de por vida',
  'Acceso anticipado prioritario al lanzamiento',
  'Reportes prioritarios dentro de la app',
  'Tu feedback influirá en las primeras funciones',
  'Comunidad beta exclusiva de fundadores',
];

export function EliteSection() {
  return (
    <section id="elite" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Pill label */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-sm text-white/70">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            Acceso Élite · Primera generación
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-center text-3xl font-extrabold text-white sm:text-4xl mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          ¿Quieres ayudar a construir WARPIN?
        </motion.h2>

        <motion.p
          className="text-center text-white/60 text-base sm:text-lg mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          El Fundador Élite no es solo un usuario. Es parte del equipo que da forma a la app desde cero.
        </motion.p>

        {/* Big card */}
        <motion.div
          className="mt-10 rounded-3xl glass-strong p-8 ring-1 ring-primary/40 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Background gradient blobs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #22d3ee, #8b5cf6)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full opacity-15 blur-3xl"
            style={{ background: 'radial-gradient(circle, #f472b6, #8b5cf6)' }}
          />

          {/* Recommended tag */}
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, var(--color-primary, #22d3ee), var(--color-accent, #8b5cf6))' }}>
            <Sparkles className="h-3.5 w-3.5" />
            Recomendado
          </div>

          {/* Title */}
          <h3 className="text-3xl font-extrabold text-white mb-6">Fundador Élite</h3>

          {/* Benefits */}
          <ul className="space-y-4 mb-8">
            {benefits.map((benefit, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-white/80 text-sm sm:text-base"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
              >
                <span className="mt-0.5 flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                  <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                </span>
                {benefit}
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href="https://tally.so/r/68PdWY"
            target="_blank"
            rel="noopener noreferrer"
            className="ios-button block w-full text-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📝 Reclamar Fundador Élite
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
