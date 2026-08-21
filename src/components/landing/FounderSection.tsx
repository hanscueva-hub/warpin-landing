import { motion } from "framer-motion";
import { ArrowLeft, ArrowUp, Check, GraduationCap, Lock, Sparkles } from "lucide-react";

const basicBenefits = [
  'Título "Miembro Fundador" de por vida',
  "Acceso a la comunidad beta de WhatsApp",
  "Avisos de drops de acceso prioritario",
  "Soporte inicial de la comunidad",
];

const eliteBenefits = [
  'Título "Fundador Élite" destacado y llamativo',
  "Acceso anticipado prioritario al lanzamiento",
  "Reportes prioritarios directos en la app",
  "Tu feedback define las primeras funciones",
  "Comunidad beta exclusiva de fundadores",
];

const WHATSAPP_URL = "https://chat.whatsapp.com/IK4zPo8yN4gIc9Y5RY1ecq";
const CAMPUS_SURVEY_URL = "https://tally.so/r/WOqWOk";

export function FounderSection() {
  return (
    <section id="fundador" className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
            ✨ Últimos cupos · Primera generación
          </div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Elige tu estatus <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">dentro de la app</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-300 sm:text-lg">
            Los cupos de Fundador Élite ya se agotaron. Todavía puedes entrar como Miembro Fundador y asegurar tu título antes del lanzamiento.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card A — Miembro Fundador (ahora la opción destacada) */}
          <motion.div
            id="miembro-fundador"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-strong gradient-border relative flex scroll-mt-28 flex-col justify-between rounded-3xl p-8 ring-1 ring-primary/30 transition-shadow target:ring-2 target:ring-cyan-400"
          >
            <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl" />

            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-gradient-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-glow">
                  <Sparkles className="h-3 w-3 text-yellow-300" /> Disponible ahora
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Comunidad Beta
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-extrabold text-white sm:text-[26px]">
                Miembro Fundador
              </h3>
              <p className="mt-3 text-sm text-gray-300 sm:text-[15px]">
                Entra al grupo de WhatsApp y asegura tu título antes del lanzamiento. Ahí anunciamos primero los códigos de acceso.
              </p>

              <ul className="mt-6 space-y-3 text-left">
                {basicBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cyan-400/20">
                      <Check className="h-3 w-3 text-cyan-400" strokeWidth={3} />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-4 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.02]"
            >
              💬 Unirme a la Comunidad
            </motion.a>
          </motion.div>

          {/* Card B — Fundador Élite (cupos agotados) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass relative flex flex-col justify-between rounded-3xl border border-white/5 p-8"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/50">
                  <Lock className="h-3 w-3" strokeWidth={2.5} /> Cupos agotados
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30">
                  Acceso Élite
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-extrabold text-white/50 sm:text-[26px]">
                Fundador Élite
              </h3>
              <p className="mt-3 text-sm text-white/50 sm:text-[15px]">
                El título de Fundador Élite ya se llenó. Pero todavía puedes asegurar el tuyo como{" "}
                <span className="font-semibold text-white/70">Miembro Fundador</span>.
              </p>

              <ul className="mt-6 space-y-3 text-left">
                {eliteBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-white/30">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/5">
                      <Lock className="h-2.5 w-2.5 text-white/40" strokeWidth={2.5} />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.a
              href="#miembro-fundador"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold text-white/90 backdrop-blur transition-colors hover:bg-white/10"
            >
              <ArrowUp className="h-4 w-4 md:hidden" strokeWidth={2.5} />
              <ArrowLeft className="hidden h-4 w-4 md:inline" strokeWidth={2.5} />
              Quiero ser Miembro Fundador
            </motion.a>
          </motion.div>
        </div>

        {/* Postulación de campus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass mt-6 flex flex-col items-center gap-5 rounded-3xl p-8 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan-400/15">
              <GraduationCap className="h-5 w-5 text-cyan-400" />
            </span>
            <div>
              <h3 className="text-lg font-extrabold text-white sm:text-xl">
                ¿Quieres que tu universidad sea la próxima?
              </h3>
              <p className="mt-1.5 max-w-lg text-sm text-gray-300">
                WARPIN arranca en la UCSM, pero vamos campus por campus. Postula el tuyo y llegamos ahí.
              </p>
            </div>
          </div>

          <motion.a
            href={CAMPUS_SURVEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            Postular mi universidad →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
