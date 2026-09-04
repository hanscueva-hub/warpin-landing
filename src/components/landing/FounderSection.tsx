import { Check, Lock } from "lucide-react";
import { LAUNCH_DATE_LABEL, WHATSAPP_URL } from "@/lib/launch";
import { StoreButtons } from "./StoreButtons";

const TITULOS = [
  {
    nombre: "Miembro Fundador",
    quienes: "Entraron al grupo cuando Warpin todavía no existía.",
    beneficios: [
      'Título "Miembro Fundador" de por vida, visible en su perfil',
      "Acceso a la comunidad beta",
      "Soporte directo desde el primer día",
    ],
  },
  {
    nombre: "Fundador Élite",
    quienes: "Los primeros 300. Se agotaron antes del lanzamiento.",
    beneficios: [
      'Título "Fundador Élite" destacado en el mapa y en su perfil',
      "Acceso anticipado prioritario",
      "Su opinión decide las primeras funciones que se construyen",
    ],
    destacado: true,
  },
];

/**
 * Los títulos de fundador ya no se pueden reclamar. La sección deja de ser
 * una oferta y pasa a ser lo que realmente es: el reconocimiento a la gente
 * que se apuntó antes de que hubiera una app que descargar.
 */
export function FounderSection() {
  return (
    <section id="fundador" className="relative overflow-hidden px-6 py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--magenta) 18%, transparent), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* El anuncio: lo primero y lo más grande de la sección */}
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
            Títulos de fundador
          </p>

          <h2
            className="mt-4 font-display text-[4.2rem] font-extrabold uppercase leading-[0.84] tracking-[-0.055em] sm:text-[7rem] lg:text-[9rem]"
            style={{
              // Relleno fantasma + contorno: si el navegador no soporta el
              // contorno, la palabra igual se lee.
              color: "color-mix(in oklab, var(--magenta) 16%, transparent)",
              WebkitTextStroke: "2px color-mix(in oklab, var(--magenta) 75%, transparent)",
            }}
          >
            <span className="sr-only">Títulos de fundador: </span>Cerrado
          </h2>

          <p className="mx-auto mt-7 max-w-[46ch] text-base leading-relaxed text-white/70 sm:text-[17px]">
            <span className="font-semibold text-white">
              Más de 1.000 personas ya reclamaron su título
            </span>{" "}
            de Miembro Fundador o Fundador Élite, por haberse unido al grupo antes de que Warpin
            existiera. Esos títulos quedan en su perfil para siempre y ya no se entregan más.
          </p>

        </div>

        {/* Qué eran esos títulos, ya en pasado */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {TITULOS.map((t) => (
            <div
              key={t.nombre}
              className={`relative overflow-hidden rounded-3xl border p-7 ${
                t.destacado
                  ? "border-[color-mix(in_oklab,var(--magenta)_28%,transparent)] bg-[color-mix(in_oklab,var(--magenta)_7%,#0E0C18)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-white">
                    {t.nombre}
                  </h3>
                  <p className="mt-1.5 max-w-[30ch] text-[13.5px] leading-relaxed text-white/50">
                    {t.quienes}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-white/55">
                  <Lock className="h-3 w-3" />
                  Agotado
                </span>
              </div>

              <ul className="mt-6 flex flex-col gap-3 border-t border-white/[0.07] pt-5">
                {t.beneficios.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[14px] leading-snug text-white/65">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: t.destacado ? "var(--magenta)" : "var(--cyan)" }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Lo importante de esta sección no es lo que se cerró, sino lo que sigue
            abierto: quien llega ahora todavía puede ganarse sus propios títulos. */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[color-mix(in_oklab,var(--cyan)_22%,transparent)] bg-[color-mix(in_oklab,var(--cyan)_5%,#0B0A12)] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--cyan)]">
                Si llegaste ahora
              </p>
              <h3 className="mt-3 text-balance font-display text-[1.75rem] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.1rem]">
                Los de fundador se cerraron.{" "}
                <span className="text-white/45">Los demás no.</span>
              </h3>
              <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-white/65">
                Dentro de Warpin los títulos se ganan usándola: publicando, respondiendo, ayudando
                a gente que está cerca. El {LAUNCH_DATE_LABEL} todos arrancan de cero el mismo día —
                y el que se mueve primero, llega primero.
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-white/40">
                Tu título se ve en tu perfil y al costado de cada pin que publicas.
              </p>
            </div>

            <div className="lg:shrink-0">
              <StoreButtons size="md" />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-[13px] text-white/45 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white/80"
              >
                O entra ya a la comunidad de WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
