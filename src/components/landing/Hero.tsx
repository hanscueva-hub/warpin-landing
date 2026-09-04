import { LiveMap } from "./LiveMap";
import { Countdown } from "./Countdown";
import { StoreButtons } from "./StoreButtons";

const FACTS = [
  { value: "Correo institucional", label: "para poder entrar" },
  { value: "0.5 – 3 km", label: "radio del radar" },
  { value: "Ubicación protegida", label: "en cada publicación" },
  { value: "Todo expira", label: "sin historial público" },
];

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#0A0910]">
      {/* El producto es el fondo: mapa oscuro con pines reales */}
      <LiveMap />

      {/* Velos que dejan leer el texto sin apagar el mapa */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(72% 92% at 74% 46%, transparent 38%, rgba(10,9,16,.88) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(10,9,16,.80)_0%,rgba(10,9,16,.93)_34%,rgba(10,9,16,.97)_100%)] lg:bg-[linear-gradient(96deg,#0A0910_0%,rgba(10,9,16,.96)_34%,rgba(10,9,16,.55)_58%,rgba(10,9,16,.12)_76%,rgba(10,9,16,.6)_100%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pt-[5.5rem] pb-[4.75rem]">
        <div className="animate-fade-up max-w-[34rem]">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[13px] text-white/70 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-[var(--cyan)]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--cyan)]" />
            </span>
            <span className="tabular-nums">779 accesos reclamados</span>
            <span className="hidden sm:inline"> · UCSM Arequipa</span>
          </span>

          <h1 className="mt-6 text-balance font-display text-[2.05rem] font-bold leading-[1] sm:leading-[0.98] tracking-[-0.04em] text-white sm:text-[3.4rem] lg:text-[3.6rem]">
            Mira qué está pasando en el campus{" "}
            <span className="text-[var(--magenta)]">ahora mismo</span>.
          </h1>

          <p className="mt-4 max-w-[47ch] text-base leading-relaxed text-white/65 sm:text-[17px]">
            Un cargador, apuntes de Cálculo, con quién compartir taxi.{" "}
            <span className="hidden sm:inline">
              Lo publicas, alguien cerca responde, y desaparece cuando expira.
            </span>
          </p>
        </div>

        <div
          id="descargar"
          className="animate-fade-up mt-8 flex flex-col gap-7 sm:flex-row sm:items-end sm:gap-10"
          style={{ animationDelay: "0.12s" }}
        >
          <Countdown />
          <div className="sm:pb-[26px]">
            <StoreButtons />
          </div>
        </div>

        <p
          className="animate-fade-up mt-5 text-[13px] tracking-[0.02em] text-white/40"
          style={{ animationDelay: "0.24s" }}
        >
          Solo estudiantes de la <span className="text-white/65">UCSM</span> ·{" "}
          <span className="text-white/65">Verificados</span> ·{" "}
          <span className="text-white/65">Sin spam</span>
        </p>
      </div>

      {/* Franja de datos al pie de la portada */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/[0.07] bg-gradient-to-t from-[#0A0910] to-transparent">
        <div className="mx-auto flex max-w-6xl gap-x-8 gap-y-2 overflow-x-auto px-6 py-3.5 text-[12.5px] text-white/40 no-scrollbar">
          {FACTS.map((f) => (
            <span key={f.value} className="whitespace-nowrap">
              <span className="font-medium text-white/70">{f.value}</span> {f.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
