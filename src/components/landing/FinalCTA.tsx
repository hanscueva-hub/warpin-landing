import { motion } from "framer-motion";
import { StoreButtons } from "./StoreButtons";
import { ACCESOS_REDONDEADO, WHATSAPP_URL } from "@/lib/launch";

/* ─────────────────────────────────────────────
   FinalCTA
───────────────────────────────────────────── */
export function FinalCTA() {
  return (
    <section className="relative px-6 py-28 text-center">
      <div className="mx-auto max-w-3xl">
        {/* Headline */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-balance text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl"
        >
          ¿Vas a seguir perdiéndote lo que pasa a una cuadra de ti?
        </motion.h3>

        {/* Social proof pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md"
            style={{ boxShadow: "0 0 24px 0 rgba(255,255,255,0.04)" }}
          >
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
                style={{ animationDuration: "1.4s" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            ✨ {ACCESOS_REDONDEADO} accesos ya reclamados
          </div>
        </motion.div>

        {/* Botones de tienda — tercera y última aparición */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <StoreButtons align="center" />
        </motion.div>

        {/* La fórmula de cierre */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10 font-display text-lg font-semibold tracking-tight text-white/80 sm:text-xl"
        >
          Solo estudiantes de la UCSM. Verificados. Sin spam.
        </motion.p>

        {/* WhatsApp queda como segunda opción, nunca compitiendo con la descarga */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-6"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/45 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white/80"
          >
            Mientras tanto, entra a la Comunidad de WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */

const explorarLinks = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Categorías", href: "#categorias" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos de uso", href: "/terminos" },
  { label: "Únete", href: "#fundador" },
];

const comunidadLinks = [
  {
    label: "Comunidad de WhatsApp",
    href: "https://chat.whatsapp.com/IK4zPo8yN4gIc9Y5RY1ecq",
    external: true,
  },
  {
    label: "Postular mi universidad",
    href: "https://tally.so/r/WOqWOk",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/warpin.app/",
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Three-column grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white/90">
                WARPIN
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">
                Beta
              </span>
            </div>
            <p className="max-w-[22ch] text-sm leading-relaxed text-white/50">
              Radar social hiperlocal en tiempo real. Beta cerrada en Arequipa.
            </p>
          </div>

          {/* Column 2 — Explorar */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Explorar
            </p>
            <ul className="flex flex-col gap-2">
              {explorarLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Comunidad */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Comunidad
            </p>
            <ul className="flex flex-col gap-2">
              {comunidadLinks.map(({ label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            © 2026 WARPIN App · Privacidad por diseño
          </p>
          <p className="text-xs text-white/40">
            Hecho para la generación &lt;30 · Arequipa, Perú
          </p>
        </div>
      </div>
    </footer>
  );
}
