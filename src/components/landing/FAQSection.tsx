import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: '¿Qué es WARPIN?',
    a: 'WARPIN es una aplicación que estará disponible muy pronto en Google Play Store y App Store. Sirve para publicar cualquier tipo de PIN en el mapa en tiempo real, permitiendo que todas las personas a tu alrededor puedan verlo e interactuar al instante.',
  },
  {
    q: '¿WARPIN revela mi ubicación exacta?',
    a: 'No obligatoriamente. Al publicar un PIN, puedes elegir entre compartir tu ubicación exacta o usar la ubicación protegida, la cual coloca tu PIN de forma aleatoria en un radio de 40 metros a la redonda para proteger tu privacidad.',
  },
  {
    q: '¿Quién puede ver mis publicaciones?',
    a: 'Solo los usuarios verificados dentro del radio de tu publicación (0.5 a 3 km). Las publicaciones son temporales y desaparecen automáticamente.',
  },
  {
    q: '¿Cómo funciona la verificación?',
    a: 'WARPIN requiere verificación para publicar o chatear. Esto elimina trolls y perfiles falsos, garantizando un entorno seguro y confiable.',
  },
  {
    q: '¿Qué pasa cuando expira una publicación?',
    a: 'Desaparece del mapa completamente. Sin historial público, sin rastro. Es parte del diseño efímero de WARPIN.',
  },
  {
    q: '¿Puedo recibir mensajes de cualquier persona?',
    a: 'Sí, cualquier persona puede enviarte un mensaje, pero solo una vez. A no ser que responda a uno de tus pines en el mapa, en cuyo caso puede enviarte un mensaje adicional. Por supuesto, tú siempre decides si aceptas o ignoras el chat.',
  },
  {
    q: '¿Qué significan las "Vibras" y la "Reputación" en mi perfil?',
    a: 'Las Vibras son las reacciones (como "Me Gusta") que otros estudiantes le dan a tus pines en el mapa si les parece útil o genial tu publicación. La Reputación es tu puntuación de confiabilidad en el campus: sube a medida que creas pines útiles, ayudas a otros y recibes vibras de la comunidad.',
  },
  {
    q: '¿Cuándo sale la app al público?',
    a: 'Estamos en beta cerrada y el lanzamiento oficial será el 31 de agosto. Los primeros 500 fundadores tienen acceso anticipado. Los demás entrarán en los próximos drops. Únete a la Comunidad de WhatsApp para no perderte los anuncios.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.05 * i },
  }),
};

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Pill */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-sm text-white/70">
            Preguntas frecuentes
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-center text-3xl font-extrabold text-white sm:text-4xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Todo lo que necesitas saber.
        </motion.h2>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                className="overflow-hidden rounded-2xl border backdrop-blur-md"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                animate={{
                  borderColor: isOpen ? 'rgba(34,211,238,0.4)' : 'rgba(255,255,255,0.10)',
                  boxShadow: isOpen
                    ? '0 0 0 1px rgba(34,211,238,0.15), 0 4px 24px rgba(34,211,238,0.08)'
                    : 'none',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
                transition={{ duration: 0.25 }}
              >
                {/* Question button */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-white/90 font-medium text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 text-white/40"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-white/60">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
