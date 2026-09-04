import { useEffect, useRef, useState } from "react";

type Caso = {
  id: string;
  /** lo que la persona diría, no lo que hace la app */
  gatillo: string;
  titulo: string;
  texto: string;
  /** la ilustración; opcional mientras alguna esté pendiente */
  imagen?: string;
  pin: {
    categoria: "Social" | "Ayuda rápida";
    color: string;
    titulo: string;
    detalle: string;
    autor: string;
    distancia: string;
    expira: string;
  };
};

const CASOS: Caso[] = [
  {
    id: "hueco",
    gatillo: "Estoy en hueco y no sé qué hacer",
    titulo: "Alguien más también está en hueco ahora mismo",
    texto:
      "Publicas que estás libre y en minutos alguien cerca responde. No tienes que conocerlo de antes ni escribirle por privado a nadie.",
    imagen: "/mascota/escena-socializar.webp",
    pin: {
      categoria: "Social",
      color: "#FF3D8A",
      titulo: "Alguien para almorzar? Estoy en hueco",
      detalle: "Libre hasta las 2, si bajan a la cafetería avisen",
      autor: "Valeria M.",
      distancia: "180 m",
      expira: "1 h 40 m",
    },
  },
  {
    id: "ayuda",
    gatillo: "Necesito algo y lo necesito ya",
    titulo: "Se lo pides al mapa, no a un grupo de 200",
    texto:
      "Un cargador, apuntes, una calculadora. Lo ve solo la gente que está cerca y que puede resolvértelo ahora, no mañana.",
    imagen: "/mascota/escena-ayuda.webp",
    pin: {
      categoria: "Ayuda rápida",
      color: "#2BD980",
      titulo: "¿Alguien tiene cargador tipo C?",
      detalle: "Estoy en la biblioteca central, lo devuelvo en 1 hora",
      autor: "Diego R.",
      distancia: "90 m",
      expira: "45 min",
    },
  },
  {
    id: "espacio",
    gatillo: "¿Habrá sitio o me voy a ir de gane?",
    titulo: "Alguien que ya está ahí te lo dice",
    texto:
      "Si hay mesa en la cafetería, si el salón de estudio está lleno, si vale la pena cruzar el campus. Te ahorras el viaje.",
    pin: {
      categoria: "Ayuda rápida",
      color: "#2BD980",
      titulo: "¿Dónde hay espacio en la cafetería?",
      detalle: "Vengo saliendo de clase, ¿alguien está por ahí?",
      autor: "Camila P.",
      distancia: "310 m",
      expira: "25 min",
    },
  },
];

const ROTACION_MS = 6500;

export function WhatIsSection() {
  const [activo, setActivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pausado) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActivo((a) => (a + 1) % CASOS.length), ROTACION_MS);
    return () => clearInterval(id);
  }, [pausado]);

  const caso = CASOS[activo];

  return (
    <section id="que-es" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-[46ch]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
            ¿Qué es Warpin?
          </p>
          <h2 className="mt-4 text-balance font-display text-[2.1rem] font-bold leading-[1.04] tracking-[-0.035em] text-white sm:text-[2.9rem]">
            Imagina abrir un mapa y ver todo lo que pasa{" "}
            <span className="text-[var(--magenta)]">alrededor tuyo</span>.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/55 sm:text-[17px]">
            No publicaciones de hace tres días. Lo que está pasando ahora, a metros de donde estás
            parado, puesto por gente de tu propia universidad.
          </p>
        </div>

        <div
          ref={contenedor}
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-12"
        >
          {/* Los tres casos, en las palabras de la persona */}
          <div className="flex flex-col gap-3">
            {CASOS.map((c, i) => {
              const on = i === activo;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActivo(i);
                    setPausado(true);
                  }}
                  aria-pressed={on}
                  className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                    on
                      ? "border-white/15 bg-white/[0.055]"
                      : "border-white/[0.07] bg-white/[0.015] hover:bg-white/[0.035]"
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] transition-all duration-300"
                    style={{
                      background: on ? c.pin.color : "transparent",
                    }}
                  />
                  <p
                    className={`text-[15px] font-semibold leading-snug transition-colors ${
                      on ? "text-white" : "text-white/55"
                    }`}
                  >
                    «{c.gatillo}»
                  </p>
                  <div
                    className={`grid transition-all duration-300 ${
                      on ? "mt-2.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[14px] leading-relaxed text-white/60">{c.texto}</p>
                    </div>
                  </div>

                  {/* barra de tiempo del carrusel */}
                  {on && !pausado && (
                    <span
                      key={`t-${c.id}`}
                      aria-hidden
                      className="absolute bottom-0 left-0 h-[2px] motion-safe:animate-[wp-progreso_6.5s_linear_forwards]"
                      style={{ background: c.pin.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* La escena: ilustración + el pin tal como se ve en la app */}
          <div className="relative flex min-h-[26rem] items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0C0B14] px-6 py-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 transition-colors duration-700"
              style={{
                background: `radial-gradient(70% 60% at 50% 35%, color-mix(in srgb, ${caso.pin.color} 16%, transparent), transparent 70%)`,
              }}
            />

            <div className="relative flex w-full max-w-sm flex-col items-center">
              {caso.imagen ? (
                <img
                  key={caso.imagen}
                  src={caso.imagen}
                  alt=""
                  width={512}
                  height={512}
                  loading="lazy"
                  className="h-44 w-auto object-contain motion-safe:animate-fade-up sm:h-56"
                />
              ) : (
                <div className="flex h-44 items-center sm:h-56">
                  <span
                    className="rounded-full border border-dashed px-4 py-2 text-[12px] text-white/35"
                    style={{ borderColor: `color-mix(in srgb, ${caso.pin.color} 35%, transparent)` }}
                  >
                    Ilustración en camino
                  </span>
                </div>
              )}

              <PinCard key={caso.id} caso={caso} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wp-progreso { from { width: 0 } to { width: 100% } }
      `}</style>
    </section>
  );
}

/** El pin tal como se ve dentro de la app. */
function PinCard({ caso }: { caso: Caso }) {
  const p = caso.pin;
  return (
    <div className="mt-6 w-full rounded-2xl border border-white/10 bg-[#181426]/90 p-4 backdrop-blur-xl motion-safe:animate-fade-up">
      <div className="flex items-center gap-2">
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            color: p.color,
            background: `color-mix(in srgb, ${p.color} 14%, transparent)`,
            border: `1px solid color-mix(in srgb, ${p.color} 32%, transparent)`,
          }}
        >
          {p.categoria}
        </span>
        <span className="rounded-full bg-white/[0.07] px-2.5 py-1 text-[10px] text-white/50">
          Expira en {p.expira}
        </span>
      </div>

      <h3 className="mt-3 text-[15px] font-semibold leading-snug text-white">{p.titulo}</h3>
      <p className="mt-1 text-[12.5px] leading-relaxed text-white/45">{p.detalle}</p>

      <div className="mt-4 flex items-center gap-2.5 border-t border-white/[0.07] pt-3">
        <span
          className="h-6 w-6 shrink-0 rounded-full"
          style={{ background: `linear-gradient(135deg, ${p.color}, var(--vio, #7A5BFF))` }}
        />
        <span className="text-[12px] text-white/55">{p.autor}</span>
        <span className="text-[12px] text-white/30">· a {p.distancia}</span>
        <span
          className="ml-auto rounded-full px-3 py-1.5 text-[11px] font-semibold text-[#0A0910]"
          style={{ background: p.color }}
        >
          Ver detalles
        </span>
      </div>
    </div>
  );
}
