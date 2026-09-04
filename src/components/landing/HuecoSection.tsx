import { StoreButtons } from "./StoreButtons";
import { ACCESOS_REDONDEADO, CAMPUS_ACTIVOS, RADIO_RADAR } from "@/lib/launch";

const STATS = [
  { value: ACCESOS_REDONDEADO, label: "accesos reclamados" },
  { value: RADIO_RADAR, label: "de radio a la redonda" },
  { value: "40 m", label: "de ubicación protegida" },
];

/** Cuántos campus caben en la barra antes de que se vea llena. */
const CUPOS_CAMPUS = 6;

/**
 * El momento tipográfico de la página: arranca por el momento de uso
 * (el "hueco" entre clases), no por la app. Segunda aparición de los
 * botones de descarga, a mitad de página.
 */
export function HuecoSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.07] bg-[#08070D] px-6 py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-16 h-[42rem] w-[42rem] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--magenta) 24%, transparent), transparent 62%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div>
          <h2 className="font-display text-[3.1rem] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] text-white sm:text-[4.6rem] lg:text-[6rem]">
            2 horas
            <br />
            de hueco.
            <br />
            <span className="text-white/35">Cero planes.</span>
          </h2>

          <div className="mt-8 h-[3px] w-28 rounded-full bg-[var(--magenta)]" />

          <p className="mt-5 font-display text-[2rem] font-bold tracking-[-0.035em] text-[var(--magenta)] sm:text-[2.4rem]">
            Abre el mapa.
          </p>

          <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-white/60 sm:text-[17px]">
            Alguien a 300 metros está buscando con quién almorzar. Otro necesita un cargador antes
            de su clase. Y en el patio se está armando algo que no está en ningún grupo de WhatsApp.
          </p>

          <div className="mt-9">
            <StoreButtons />
          </div>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-10 border-t border-white/[0.07] pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-[2rem] font-bold leading-none tracking-tight tabular-nums text-white sm:text-[2.2rem]">
                {s.value}
              </p>
              <p className="mt-2 text-[11.5px] uppercase tracking-[0.12em] text-white/40">
                {s.label}
              </p>
            </div>
          ))}

          <CampusMeter />
        </div>
      </div>
    </section>
  );
}

/** Campus activos: una barra que se irá llenando conforme entren universidades. */
function CampusMeter() {
  return (
    <div className="flex items-start gap-5">
      <div>
        <p className="font-display text-[2rem] font-bold leading-none tracking-tight tabular-nums text-white sm:text-[2.2rem]">
          {CAMPUS_ACTIVOS.length}
        </p>
        <p className="mt-2 text-[11.5px] uppercase tracking-[0.12em] text-white/40">
          campus activo
        </p>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <div className="flex flex-col-reverse gap-1" aria-hidden>
          {Array.from({ length: CUPOS_CAMPUS }, (_, i) => (
            <span
              key={i}
              className={`block h-[5px] w-8 rounded-full ${
                i < CAMPUS_ACTIVOS.length ? "bg-[var(--magenta)]" : "bg-white/[0.09]"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col-reverse gap-1 text-[11px] leading-[9px]">
          {Array.from({ length: CUPOS_CAMPUS }, (_, i) => (
            <span
              key={i}
              className={i < CAMPUS_ACTIVOS.length ? "font-semibold text-white" : "text-white/20"}
            >
              {CAMPUS_ACTIVOS[i] ?? "—"}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
