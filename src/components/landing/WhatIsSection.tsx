import { motion } from "framer-motion";
import { MapPin, Users, Sparkles } from "lucide-react";

const features = [
  {
    icon: MapPin,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10",
    title: "Local y en tiempo real",
    description:
      "Mira lo que pasa a tu alrededor en un radio de 0.5 a 3 km. En tiempo real, no en stories de hace 3 días.",
  },
  {
    icon: Users,
    iconColor: "text-fuchsia-400",
    iconBg: "bg-fuchsia-400/10",
    title: "Pensada para tu campus",
    description:
      "Diseñada para conectar universitarios dentro del mismo ecosistema. Misma zona, mismas necesidades.",
  },
  {
    icon: Sparkles,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10",
    title: "Espontánea y efímera",
    description:
      "Las publicaciones desaparecen al expirar. Sin historial público, sin huellas. Solo el momento.",
  },
];

export function WhatIsSection() {
  return (
    <section
      id="que-es"
      className="px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        {/* Pill label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex justify-center"
        >
          <span className="glass rounded-full px-4 py-1.5 text-sm font-medium text-white/80">
            ¿Qué es WARPIN?
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-12 text-center text-3xl font-bold leading-tight text-white sm:text-4xl"
        >
          La red social local que sí entiende{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            tu mundo
          </span>
        </motion.h2>

        {/* Cards grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                {/* Icon badge */}
                <div
                  className={`mb-4 inline-flex items-center justify-center rounded-2xl p-3 ${feature.iconBg}`}
                >
                  <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>

                {/* Card content */}
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
