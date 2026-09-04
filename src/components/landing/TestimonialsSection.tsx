/**
 * Testimonios reales de la encuesta de validación (268 respuestas, jun–ago 2026).
 * Son citas textuales y anónimas: no se inventan nombres ni caras.
 * El orden no es casual — abre y cierra con socializar, que es el dolor #1.
 */
const CITAS = [
  {
    texto:
      "El tener que hablarle a la gente cara a cara y que no te haga caso… por mensaje duele menos.",
    contexto: "Sobre por qué cuesta dar el primer paso",
    tema: "social" as const,
  },
  {
    texto:
      "Encontrar gente que también tenga problemas para hacer amigos, y hacernos compañía en los ratos libres.",
    contexto: "Al preguntar qué querría resolver",
    tema: "social" as const,
  },
  {
    texto:
      "Perdí un anillo con un significado especial en el baño del campus. Si regresaba a buscarlo, perdía mi clase.",
    contexto: "Sobre una necesidad urgente en el campus",
    tema: "ayuda" as const,
  },
  {
    texto: "Poder ayudar a la gente, y que la cato se vuelva más unida.",
    contexto: "Sobre qué esperaría de la app",
    tema: "ayuda" as const,
  },
];

const COLOR = {
  social: "var(--magenta)",
  ayuda: "#2BD980",
};

const ETIQUETA = {
  social: "Socializar",
  ayuda: "Ayuda rápida",
};

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-[52ch]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
            268 respuestas · encuesta de validación
          </p>
          <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.035em] text-white sm:text-[2.6rem]">
            Warpin no salió de una lluvia de ideas.
            <br />
            <span className="text-white/40">Salió de lo que nos contaron.</span>
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-white/55">
            Estas son respuestas textuales de estudiantes, tal como las escribieron. Sin nombres,
            porque así las dieron.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {CITAS.map((c) => (
            <figure
              key={c.texto}
              className="relative flex flex-col justify-between rounded-3xl border border-white/[0.09] bg-white/[0.025] p-7"
            >
              <span
                aria-hidden
                className="absolute left-7 top-0 h-[3px] w-12 rounded-full"
                style={{ background: COLOR[c.tema] }}
              />

              <blockquote className="text-[17px] leading-[1.5] text-white/85">
                «{c.texto}»
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-4">
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    color: COLOR[c.tema],
                    background: `color-mix(in srgb, ${COLOR[c.tema]} 14%, transparent)`,
                  }}
                >
                  {ETIQUETA[c.tema]}
                </span>
                <span className="text-[12.5px] text-white/40">{c.contexto}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-[13.5px] text-white/35">
          Encuesta aplicada entre junio y agosto de 2026. Las citas se transcribieron sin cambiar
          lo que dijeron; solo se corrigió puntuación.
        </p>
      </div>
    </section>
  );
}
