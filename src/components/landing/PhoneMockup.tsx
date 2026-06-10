export function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto h-[540px] w-[270px] rounded-[3.2rem] border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.03] p-[6px] shadow-[0_40px_90px_-25px_oklch(0.65_0.18_255/0.55),inset_0_1px_0_oklch(1_0_0/0.25)] backdrop-blur-xl">
        <div className="relative h-full w-full overflow-hidden rounded-[2.7rem] bg-[oklch(0.1_0.012_270)]">
          {/* iOS-style status bar */}
          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-white/90">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-3 rounded-sm bg-white/80" />
              <span className="inline-block h-2 w-2 rounded-full bg-white/80" />
              <span className="inline-block h-2 w-4 rounded-sm border border-white/70" />
            </span>
          </div>
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-2.5 z-30 h-7 w-[88px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_oklch(1_0_0/0.08)]" />

          {/* Map mock */}
          <div className="absolute inset-0 opacity-80">
            <svg viewBox="0 0 270 540" className="h-full w-full">
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="oklch(0.28 0.02 260)" strokeWidth="0.5" />
                </pattern>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.65 0.18 255 / 0.35)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <rect width="270" height="540" fill="url(#grid)" />
              <rect width="270" height="540" fill="url(#glow)" />
              <path d="M0,200 Q135,150 270,220" stroke="oklch(0.55 0.15 255 / 0.45)" strokeWidth="2" fill="none" />
              <path d="M50,0 Q90,270 35,540" stroke="oklch(0.55 0.15 255 / 0.45)" strokeWidth="2" fill="none" />
              <path d="M230,0 Q190,310 250,540" stroke="oklch(0.55 0.15 255 / 0.45)" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Center pin with halo */}
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.65_0.25_305)]/30 blur-2xl" />
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.65_0.25_305)] shadow-[0_0_22px_oklch(0.65_0.25_305)]" />

          {/* Bottom glass card (iOS sheet) */}
          <div className="absolute bottom-3 left-3 right-3 rounded-2xl glass-strong px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[oklch(0.72_0.18_255)] to-[oklch(0.6_0.23_305)]" />
              <div className="flex-1">
                <p className="text-[10px] font-semibold text-white">Lucía · 0.4 km</p>
                <p className="text-[10px] text-white/70">Previa en el depa 🍻</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
