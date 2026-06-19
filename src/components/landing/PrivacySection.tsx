import { motion } from "framer-motion";
import { Shield, Hourglass, MessagesSquare, ShieldCheck } from "lucide-react";

const points = [
  {
    Icon: Shield,
    title: "Ubicación protegida",
    desc: "Tú decides si compartir tu ubicación exacta o usar la ubicación protegida, la cual coloca tu PIN aleatoriamente a 40 metros a la redonda.",
    accent: "oklch(0.68 0.31 340)",
  },
  {
    Icon: Hourglass,
    title: "Cero Huellas",
    desc: "Las publicaciones desaparecen automáticamente del mapa al expirar. Sin historial público.",
    accent: "oklch(0.82 0.18 200)",
  },
  {
    Icon: MessagesSquare,
    title: "Chats bajo tu Control",
    desc: "Nadie puede enviarte mensajes libremente. Si publicas algo, recibes solicitudes. El chat solo se abre si tú aceptas.",
    accent: "oklch(0.55 0.28 300)",
  },
  {
    Icon: ShieldCheck,
    title: "Entorno Verificado",
    desc: "Verificación obligatoria para publicar o chatear. Adiós a los trolls y perfiles falsos.",
    accent: "oklch(0.78 0.22 145)",
  },
];

export function PrivacySection() {
  return (
    <section id="privacidad" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto max-w-3xl text-balance text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          Privacidad por diseño. Tú tienes el control.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-center text-gray-400 sm:text-lg">
          Warpin protege tu identidad sin sacrificar la experiencia social.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ Icon, title, desc, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-md transition-shadow hover:shadow-[0_20px_60px_-20px_var(--accent)]"
              style={{ ["--accent" as string]: accent }}
            >
              <div className="relative mb-5">
                <div
                  className="absolute inset-0 rounded-full opacity-40 blur-2xl"
                  style={{ background: accent }}
                />
                <div
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${accent}40, transparent)`, border: `1px solid ${accent}60` }}
                >
                  <Icon className="h-8 w-8" style={{ color: accent }} strokeWidth={1.8} />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm text-gray-300">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
