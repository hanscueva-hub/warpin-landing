import { MapPin, Search, Bell, Plus, Home, Compass, MessageCircle, User } from "lucide-react";

/**
 * Fully-coded WARPIN phone mockup — looks like a real app, no AI image.
 * Glass + neon, animated pins, live indicators.
 */
export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px]">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-12 -z-10 opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--magenta) 55%, transparent), transparent 60%), radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--cyan) 45%, transparent), transparent 60%)",
        }}
      />

      {/* Phone frame */}
      <div className="relative rounded-[2.6rem] p-[2px] shadow-[0_40px_120px_-30px_rgba(236,72,153,0.55)]"
        style={{ background: "linear-gradient(140deg, color-mix(in oklab, var(--magenta) 70%, transparent), color-mix(in oklab, var(--cyan) 70%, transparent))" }}
      >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[oklch(0.08_0.03_280)] p-2">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-30 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-black" />

          {/* Screen */}
          <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2.1rem]"
            style={{
              background:
                "radial-gradient(80% 60% at 30% 10%, color-mix(in oklab, var(--magenta) 30%, transparent), transparent 60%), radial-gradient(60% 50% at 90% 90%, color-mix(in oklab, var(--cyan) 25%, transparent), transparent 60%), linear-gradient(180deg, #14101e, #0c0a14)",
            }}
          >
            {/* Status bar */}
            <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-white/90">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              </span>
            </div>

            {/* Top bar */}
            <div className="mt-6 flex items-center justify-between px-4">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">
                <MapPin size={12} className="text-magenta" />
                <span className="text-[11px] font-medium text-white">UCSM · 0.8 km</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-full bg-white/10 p-1.5 backdrop-blur">
                  <Search size={12} className="text-white" />
                </button>
                <button className="relative rounded-full bg-white/10 p-1.5 backdrop-blur">
                  <Bell size={12} className="text-white" />
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-magenta ring-2 ring-[#14101e]" />
                </button>
              </div>
            </div>

            {/* Map */}
            <MapCanvas />

            {/* Bottom sheet card */}
            <div className="absolute inset-x-3 bottom-20 rounded-2xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur-xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl text-lg"
                  style={{ background: "linear-gradient(135deg, var(--magenta), var(--cyan))" }}>
                  🍻
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-semibold text-white">Billar en el patio · 4 personas</div>
                  <div className="text-[10px] text-white/60">0.4 km · expira en 38 min</div>
                </div>
                <button className="rounded-full px-3 py-1 text-[10px] font-bold text-white shadow-[0_0_20px_-5px_rgba(236,72,153,0.8)]"
                  style={{ background: "linear-gradient(135deg, var(--magenta), var(--cyan))" }}>
                  Unirme
                </button>
              </div>
            </div>

            {/* Floating + button */}
            <button className="absolute bottom-24 right-4 flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-[0_10px_30px_-5px_rgba(236,72,153,0.8)] animate-glow-pulse"
              style={{ background: "linear-gradient(135deg, var(--magenta), var(--cyan))" }}>
              <Plus size={20} strokeWidth={2.5} />
            </button>

            {/* Tab bar */}
            <div className="absolute inset-x-0 bottom-0 border-t border-white/5 bg-black/30 px-6 py-3 backdrop-blur-xl">
              <div className="flex items-center justify-between text-white/50">
                <Home size={16} className="text-white" />
                <Compass size={16} />
                <div className="-mt-1 h-1 w-8 rounded-full bg-white/30" />
                <MessageCircle size={16} />
                <User size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapCanvas() {
  return (
    <div className="relative mt-3 h-[58%] w-full">
      {/* Streets */}
      <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full opacity-40">
        <defs>
          <linearGradient id="street" x1="0" x2="1">
            <stop offset="0" stopColor="#ec4899" stopOpacity="0.4" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g stroke="url(#street)" strokeWidth="1" fill="none">
          <path d="M-10 80 Q 100 60 320 110" />
          <path d="M-10 180 Q 120 200 320 160" />
          <path d="M-10 280 Q 140 240 320 300" />
          <path d="M60 -10 Q 70 200 50 410" />
          <path d="M160 -10 Q 180 200 170 410" />
          <path d="M250 -10 Q 240 200 260 410" />
        </g>
        <g fill="rgba(255,255,255,0.04)">
          <rect x="20" y="100" width="60" height="40" rx="4" />
          <rect x="110" y="130" width="50" height="60" rx="4" />
          <rect x="200" y="80" width="70" height="50" rx="4" />
          <rect x="40" y="220" width="80" height="50" rx="4" />
          <rect x="180" y="240" width="60" height="60" rx="4" />
        </g>
      </svg>

      {/* Range circle (user) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 -m-16 rounded-full border border-cyan/30" />
        <div className="absolute inset-0 -m-10 rounded-full border border-magenta/40" />
        <div className="relative flex h-4 w-4 items-center justify-center">
          <span className="absolute h-12 w-12 animate-pulse-ring rounded-full bg-cyan/30" />
          <span className="relative h-3 w-3 rounded-full bg-cyan ring-2 ring-white" />
        </div>
      </div>

      {/* Pins */}
      <Pin x="22%" y="28%" emoji="🚕" tone="cyan" delay="0s" />
      <Pin x="72%" y="22%" emoji="🍻" tone="magenta" delay="0.6s" />
      <Pin x="78%" y="62%" emoji="📚" tone="cyan" delay="1.1s" />
      <Pin x="18%" y="70%" emoji="🎉" tone="magenta" delay="1.6s" />
      <Pin x="48%" y="14%" emoji="🔑" tone="magenta" delay="0.3s" />
    </div>
  );
}

function Pin({ x, y, emoji, tone, delay }: { x: string; y: string; emoji: string; tone: "magenta" | "cyan"; delay: string }) {
  const color = tone === "magenta" ? "var(--magenta)" : "var(--cyan)";
  return (
    <div className="absolute" style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}>
      <span
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full"
        style={{ background: color, opacity: 0.3, animationDelay: delay }}
      />
      <div
        className="relative flex h-7 w-7 items-center justify-center rounded-full text-[13px] ring-2 ring-white/80"
        style={{ background: color, boxShadow: `0 0 18px ${color}` }}
      >
        {emoji}
      </div>
    </div>
  );
}
