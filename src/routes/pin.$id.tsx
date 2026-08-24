import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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
  if (mins < 60) return `Expira en ${mins} min`;
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  if (rest === 0) return `Expira en ${hours} h`;
  return `Expira en ${hours} h ${rest} min`;
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
    // El servidor y el cliente pueden calcular minutos distintos si el
    // renderizado cae justo en el cambio de minuto. Es irrelevante y se
    // corrige al montar.
    <span suppressHydrationWarning>{formatLeft(mins)}</span>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16 text-foreground">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

function InstallCta({ label }: { label: string }) {
  return (
    <div className="mt-8 text-center">
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {label}
      </Link>
      <p className="mt-3 text-xs text-muted-foreground">
        Warpin es una app de campus. Lo que pasa cerca, ahora.
      </p>
    </div>
  );
}

function PinPage() {
  const pin = Route.useLoaderData();

  // Un pin inexistente y uno expirado se ven igual, a propósito.
  if (!pin) {
    return (
      <Shell>
        <div className="rounded-xl border border-border bg-card p-7 text-center">
          <p className="text-4xl" aria-hidden="true">
            📍
          </p>
          <h1 className="mt-4 text-xl font-semibold tracking-tight">
            Este pin ya expiró
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            En Warpin los pines duran poco: aparecen, pasan y se van. Este ya no
            está.
          </p>
        </div>
        <InstallCta label="Conoce Warpin" />
      </Shell>
    );
  }

  return (
    <Shell>
      <article className="rounded-xl border border-border bg-card p-7">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">
          Pin en Warpin
        </p>

        <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-balance">
          {pin.title}
        </h1>

        {pin.description ? (
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {pin.description}
          </p>
        ) : null}

        <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
          <span
            className="inline-block size-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          <Countdown expiresAt={pin.expiresAt} />
        </div>
      </article>

      <InstallCta label="Ver esto en Warpin" />
    </Shell>
  );
}
