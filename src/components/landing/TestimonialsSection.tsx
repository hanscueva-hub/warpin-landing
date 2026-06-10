import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Lucía M.',
    role: '3er año · Ing. Sistemas · UCSM',
    quote:
      'Encontré alguien para compartir taxi a Cayma en 2 minutos. Algo que en WhatsApp me hubiera tomado 20 mensajes.',
    avatar: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
  },
  {
    name: 'Andrés T.',
    role: '2do año · Derecho · UCSM',
    quote:
      'Por fin algo que conecta sin el ruido de los grupos de WhatsApp. Publiqué que buscaba grupo de estudio y en 10 minutos tenía respuestas reales.',
    avatar: 'linear-gradient(135deg, #f472b6, #fb923c)',
  },
  {
    name: 'Camila R.',
    role: '4to año · Administración · UCSM',
    quote:
      'Pedí un cargador tipo C y en 3 minutos alguien del salón de al lado me lo prestó. Esto es lo que faltaba.',
    avatar: 'linear-gradient(135deg, #4ade80, #22d3ee)',
  },
  {
    name: 'Diego H.',
    role: '1er año · Medicina · UCSM',
    quote:
      'Perdí mi carnet y lo publicé en WARPIN. A los 15 minutos alguien lo encontró cerca de la cafetería. Impresionante.',
    avatar: 'linear-gradient(135deg, #a78bfa, #ec4899)',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        {/* Pill */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-sm text-white/70">
            Lo que dicen
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-center text-3xl font-extrabold text-white sm:text-4xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Ya hay gente que lo vivió.{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
            }}
          >
            Tú serás el siguiente.
          </span>
        </motion.h2>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="glass rounded-3xl p-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Quote mark */}
              <div className="text-5xl text-white/15 font-serif leading-none select-none">&ldquo;</div>

              {/* Quote text */}
              <p className="text-sm leading-relaxed text-white/75 italic flex-1">{t.quote}</p>

              {/* Bottom row */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="h-10 w-10 rounded-full flex-shrink-0"
                  style={{ background: t.avatar }}
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-white text-sm truncate">{t.name}</span>
                  <span className="text-xs text-white/50 truncate">{t.role}</span>
                </div>
                <div className="ml-auto text-yellow-400 text-xs tracking-tight">★★★★★</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
