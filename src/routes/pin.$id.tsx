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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#06080E] px-5 py-10">
      <PinCardBackdrop />
      <div className="relative z-10 flex w-full max-w-[22rem] flex-col items-center">
        {children}
      </div>
    </div>
  );
}

/** Tarjeta de vidrio 4:5, el mismo formato que la de la app. */
function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/[0.07] p-6 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
        {/* Brillo superior, como el cristal de la app */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.12] to-transparent"
        />
        <div className="relative flex size-full flex-col">{children}</div>
      </div>
    </div>
  );
}

function Cta({ label }: { label: string }) {
  return (
    <div className="mt-7 flex w-full flex-col items-center">
      <Link
        to="/"
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] px-6 py-3.5 text-sm font-bold text-[#06080E] transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF]"
      >
        {label}
      </Link>
      <p className="mt-3 text-center text-xs text-white/45">
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
        <GlassCard>
          <div className="flex size-full flex-col items-center justify-center text-center">
            <p className="text-5xl" aria-hidden="true">
              📍
            </p>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-white">
              Este pin ya expiró
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              En Warpin los pines duran poco: aparecen, pasan y se van.
              <br />
              Este ya no está.
            </p>
          </div>
        </GlassCard>
        <Cta label="Descubre Warpin" />
      </Stage>
    );
  }

  return (
    <Stage>
      <GlassCard>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-[#00E5FF]/35 bg-[#00E5FF]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#5FEEFF]">
            Pin en Warpin
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#FF6FB1]">
            <span aria-hidden="true">⏱</span>
            <Countdown expiresAt={pin.expiresAt} />
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center py-5">
          <h1 className="text-[1.7rem] font-bold leading-[1.15] tracking-tight text-balance text-white">
            {pin.title}
          </h1>

          {pin.description ? (
            <p className="mt-3.5 line-clamp-6 whitespace-pre-line text-[0.95rem] leading-relaxed text-white/60">
              {pin.description}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-2 border-t border-white/10 pt-4 text-[0.7rem] text-white/40">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#00E5FF]" />
          Publicado en el campus
        </div>
      </GlassCard>

      <Cta label="Ver esto en Warpin" />
    </Stage>
  );
}
