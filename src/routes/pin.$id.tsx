import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { PinCardBackdrop } from "@/components/warpin/PinCardBackdrop";
import { getPublicPin } from "@/lib/api/pin.functions";

export const Route = createFileRoute("/pin/$id")({
  loader: ({ params }) => getPublicPin({ data: { id: params.id } }),
  head: ({ loaderData }) => {
    const pin = loaderData ?? null;

    const title = pin ? `${pin.title} — WARPIN` : "Este pin ya expiró — WARPIN";
    const description = pin
      ? pin.description || "Mira este pin en Warpin."
      : "Los pines de Warpin duran poco. Este ya no está disponible.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        // Los pines son efímeros: no queremos páginas de pines caducados
        // indexadas en buscadores.
        { name: "robots", content: "noindex" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
    };
  },
  component: PinPage,
});

/** Minutos que faltan, o 0 si ya pasó. */
function minutesLeft(expiresAt: string): number {
  const diff = new Date(expiresAt).getTime() - Date.now();
  return diff > 0 ? Math.ceil(diff / 60000) : 0;
}

function formatLeft(mins: number): string {
  if (mins <= 0) return "Expirando";
  if (mins < 60) return `Expira en ${mins}m`;
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  return rest === 0 ? `Expira en ${hours}h` : `Expira en ${hours}h ${rest}m`;
}

function Countdown({ expiresAt }: { expiresAt: string }) {
  const [mins, setMins] = useState(() => minutesLeft(expiresAt));

  useEffect(() => {
    const tick = () => setMins(minutesLeft(expiresAt));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [expiresAt]);

  return (
    // Servidor y cliente pueden calcular minutos distintos si el render cae
    // justo en el cambio de minuto. Se corrige al montar.
    <span suppressHydrationWarning>{formatLeft(mins)}</span>
  );
}

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#06080E] px-4 py-8">
      <div className="flex w-full max-w-[26rem] flex-col">{children}</div>
    </div>
  );
}

/**
 * Marco 4:5 con el mapa de fondo y la tarjeta horizontal centrada encima,
 * como se ve un pin dentro de la app.
 */
function MapFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-4/5 w-full overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_28px_80px_-24px_rgba(0,0,0,0.9)]">
      <PinCardBackdrop />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full rounded-[1.35rem] border border-white/20 bg-white/[0.10] p-5 shadow-[0_18px_50px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {children}
        </div>
      </div>
    </div>
  );
}

function Cta({ label }: { label: string }) {
  return (
    <div className="mt-6 flex w-full flex-col items-center">
      <Link
        to="/"
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] px-6 py-3.5 text-sm font-bold text-[#06080E] transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF]"
      >
        {label}
      </Link>
      <p className="mt-3 text-center text-xs leading-relaxed text-white/45">
        Warpin es el radar social de tu campus.
        <br />
        Lo que está pasando cerca, ahora mismo.
      </p>
    </div>
  );
}

function PinPage() {
  const pin = Route.useLoaderData();

  // Un pin inexistente y uno expirado se ven igual, a propósito.
  if (!pin) {
    return (
      <Stage>
        <MapFrame>
          <div className="text-center">
            <p className="text-3xl" aria-hidden="true">
              📍
            </p>
            <h1 className="mt-3 text-xl font-bold tracking-tight text-white">
              Este pin ya expiró
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              En Warpin los pines duran poco: aparecen, pasan y se van.
            </p>
          </div>
        </MapFrame>
        <Cta label="Descubre Warpin" />
      </Stage>
    );
  }

  return (
    <Stage>
      <MapFrame>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-[#00E5FF]/40 bg-[#00E5FF]/12 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.13em] text-[#6BEFFF]">
            Pin en Warpin
          </span>
          <span className="flex shrink-0 items-center gap-1 text-[0.72rem] font-bold text-[#FF6FB1]">
            <span aria-hidden="true">⏱</span>
            <Countdown expiresAt={pin.expiresAt} />
          </span>
        </div>

        <h1 className="mt-3.5 text-[1.4rem] font-bold leading-[1.2] tracking-tight text-balance text-white">
          {pin.title}
        </h1>

        {pin.description ? (
          <p className="mt-2 line-clamp-3 whitespace-pre-line text-[0.9rem] leading-snug text-white/65">
            {pin.description}
          </p>
        ) : null}

        <div className="mt-4 flex items-center gap-2 border-t border-white/12 pt-3 text-[0.68rem] text-white/45">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#00E5FF]" />
          Publicado en el campus
        </div>
      </MapFrame>

      <Cta label="Ver esto en Warpin" />
    </Stage>
  );
}
