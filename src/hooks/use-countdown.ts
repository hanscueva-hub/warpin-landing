import { useEffect, useState } from "react";
import { LAUNCH_MS } from "@/lib/launch";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** true cuando ya pasó la hora de lanzamiento */
  open: boolean;
};

function compute(target: number): TimeLeft {
  const ms = target - Date.now();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, open: true };
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1_000) % 60,
    open: false,
  };
}

/**
 * Devuelve `null` hasta que el componente monta en el navegador.
 * El servidor y el navegador nunca tienen la misma hora exacta, así que
 * renderizar el contador en el servidor rompería la hidratación.
 */
export function useCountdown(target: number = LAUNCH_MS): TimeLeft | null {
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setLeft(compute(target));
    const id = setInterval(() => setLeft(compute(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return left;
}
