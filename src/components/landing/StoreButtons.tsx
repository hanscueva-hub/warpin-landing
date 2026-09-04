import { useEffect, useState } from "react";
import { APP_STORE_URL, LAUNCH_DATE_LABEL, LAUNCH_TIME_LABEL, PLAY_STORE_URL } from "@/lib/launch";
import { useCountdown } from "@/hooks/use-countdown";

type Platform = "ios" | "android" | "unknown";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  // iPadOS 13+ se presenta como Mac con pantalla táctil.
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Macintosh/.test(ua) && typeof document !== "undefined" && "ontouchend" in document) return "ios";
  return "unknown";
}

/**
 * Los dos botones de tienda, siempre los dos visibles y del mismo tamaño.
 * El de la plataforma del visitante se resalta; el otro queda en vidrio oscuro,
 * nunca reducido a un enlace de texto.
 * Mientras no llegue la hora de lanzamiento los dos quedan bloqueados.
 */
export function StoreButtons({
  align = "start",
  size = "lg",
}: {
  align?: "start" | "center";
  size?: "lg" | "md";
}) {
  const [platform, setPlatform] = useState<Platform>("unknown");
  const left = useCountdown();
  const open = left?.open ?? false;

  useEffect(() => setPlatform(detectPlatform()), []);

  const buttons = [
    {
      key: "ios" as const,
      href: APP_STORE_URL,
      icon: <AppleIcon />,
      top: "Descárgala en el",
      name: "App Store",
    },
    {
      key: "android" as const,
      href: PLAY_STORE_URL,
      icon: <PlayIcon />,
      top: "Disponible en",
      name: "Google Play",
    },
  ];

  return (
    <div className={align === "center" ? "flex flex-col items-center" : "flex flex-col items-start"}>
      <div className={`flex flex-wrap gap-3 ${align === "center" ? "justify-center" : ""}`}>
        {buttons.map(({ key, ...rest }) => (
          <StoreButton
            key={key}
            {...rest}
            highlighted={platform === key}
            locked={!open}
            size={size}
          />
        ))}
      </div>

      {!open && (
        <p
          className={`mt-3 flex items-center gap-2 text-[12.5px] text-white/45 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <LockIcon className="h-3.5 w-3.5 shrink-0" />
          <span>Se abren el {LAUNCH_DATE_LABEL} a las&nbsp;{LAUNCH_TIME_LABEL}</span>
        </p>
      )}
    </div>
  );
}

function StoreButton({
  href,
  icon,
  top,
  name,
  highlighted,
  locked,
  size,
}: {
  href: string;
  icon: React.ReactNode;
  top: string;
  name: string;
  highlighted: boolean;
  locked: boolean;
  size: "lg" | "md";
}) {
  const pad = size === "lg" ? "py-3 pl-4 pr-5" : "py-2.5 pl-3.5 pr-4";
  const nameSize = size === "lg" ? "text-[17px]" : "text-[15px]";

  const shell =
    "relative flex items-center gap-3 rounded-[14px] border transition-all duration-300 " + pad;

  const skin = highlighted
    ? "border-transparent text-white shadow-[0_16px_38px_-16px_var(--magenta)]"
    : "border-white/25 bg-black/55 text-white backdrop-blur-md";

  const dim = locked ? "opacity-60 saturate-[.75]" : "";

  const body = (
    <>
      <span className="shrink-0">{icon}</span>
      <span className="block text-left">
        <span className="block text-[10.5px] leading-tight text-white/75">{top}</span>
        <span className={`block font-semibold leading-tight tracking-tight ${nameSize}`}>{name}</span>
      </span>
      {locked && (
        <span
          aria-hidden
          className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-[#131022] text-white/70"
        >
          <LockIcon className="h-3 w-3" />
        </span>
      )}
    </>
  );

  const highlightStyle = highlighted
    ? { background: "linear-gradient(120deg, var(--magenta), oklch(0.7 0.2 20))" }
    : undefined;

  if (locked) {
    return (
      <span
        aria-disabled="true"
        title={`Disponible el ${LAUNCH_DATE_LABEL} a las ${LAUNCH_TIME_LABEL}`}
        className={`${shell} ${skin} ${dim} cursor-not-allowed select-none`}
        style={highlightStyle}
      >
        {body}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${shell} ${skin} hover:-translate-y-0.5 hover:brightness-110`}
      style={highlightStyle}
    >
      {body}
    </a>
  );
}

/* ---------------- iconos ---------------- */

function AppleIcon() {
  return (
    <svg width="26" height="30" viewBox="0 0 22 26" fill="currentColor" aria-hidden>
      <path d="M15.5 13.6c0-2.6 2.1-3.9 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.8 1.3 10.3.9 1.3 1.9 2.7 3.2 2.6 1.3 0 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1-1.5 1.4-2.9 1.4-3-.1 0-2.8-1.1-2.8-4.1Z" />
      <path d="M13.2 5.3c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.5-.7.8-1.2 2-1.1 3.2 1.1.1 2.3-.6 3-1.4Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="26" height="28" viewBox="0 0 24 24" aria-hidden>
      <path d="M3.3 1.6 13.9 12 3.3 22.4c-.4-.4-.6-1-.6-1.7V3.3c0-.7.2-1.3.6-1.7Z" fill="#00C8FF" />
      <path d="M13.9 12 3.3 1.6c.3-.3.9-.4 1.5 0l12.5 7Z" fill="#00E676" />
      <path d="m17.3 8.6 3.3 1.9c1 .6 1 1.8 0 2.4l-3.3 1.9L13.9 12Z" fill="#FFC400" />
      <path d="m13.9 12 3.4 3.4-12.5 7c-.6.4-1.2.3-1.5 0Z" fill="#FF3A44" />
    </svg>
  );
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" strokeLinecap="round" />
    </svg>
  );
}
