import { useCountdown } from "@/hooks/use-countdown";
import { LAUNCH_DATE_LABEL, LAUNCH_TIME_LABEL } from "@/lib/launch";

const CELLS = [
  { key: "days", label: "días" },
  { key: "hours", label: "horas" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "seg" },
] as const;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/**
 * Contador hasta la apertura. Antes de montar en el navegador muestra "--"
 * para no romper la hidratación ni mover el diseño cuando llegan los números.
 */
export function Countdown({ size = "lg" }: { size?: "lg" | "sm" }) {
  const left = useCountdown();

  if (left?.open) {
    return (
      <div className="inline-flex items-center gap-2.5 rounded-full border border-[color-mix(in_oklab,var(--cyan)_45%,transparent)] bg-[color-mix(in_oklab,var(--cyan)_12%,transparent)] px-4 py-2 text-sm font-semibold text-white">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-[var(--cyan)]" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--cyan)]" />
        </span>
        Warpin ya está abierto. Descárgala.
      </div>
    );
  }

  const value = (key: (typeof CELLS)[number]["key"]) => (left ? pad(left[key]) : "--");

  const box =
    size === "lg"
      ? "min-w-[74px] px-3 py-3 sm:min-w-[88px] sm:px-4 sm:py-4"
      : "min-w-[58px] px-2.5 py-2.5";
  const digits =
    size === "lg" ? "text-[34px] sm:text-[44px]" : "text-[24px]";

  return (
    <div>
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        Warpin abre en
      </p>

      <div className="flex gap-2 sm:gap-2.5" role="timer" aria-live="off">
        {CELLS.map(({ key, label }) => (
          <div
            key={key}
            className={`glass rounded-2xl text-center ${box}`}
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)" }}
          >
            <span
              className={`block font-display font-bold leading-none tracking-tight tabular-nums ${digits} ${
                key === "seconds" ? "text-[var(--cyan)]" : "text-white"
              }`}
            >
              {value(key)}
            </span>
            <span className="mt-1.5 block text-[10px] uppercase tracking-[0.14em] text-white/40">
              {label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-2.5 text-[12.5px] text-white/50">
        {LAUNCH_DATE_LABEL}, {LAUNCH_TIME_LABEL} · hora de Perú
      </p>
    </div>
  );
}
