import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  MapPin, Search, Bell, Plus, Home, Compass, MessageCircle, User,
  Eye, Filter, Send, MessageSquare, UserPlus, Inbox, Check, X, Sparkles,
} from "lucide-react";
import ucsmMap from "@/assets/ucsm-map.png";

type StepKey = 0 | 1 | 2 | 3 | 4 | 5;

const STEPS = [
  { n: "01", icon: Eye,        t: "Descubre",        d: "Abre el mapa y mira pines de estudiantes cerca en tiempo real." },
  { n: "02", icon: Filter,     t: "Elige categoría", d: "Filtra por tus intereses y simplifica tu búsqueda al instante." },
  { n: "03", icon: Send,       t: "Publica",         d: "Lanza un PIN en segundos. Configura tu plan y hora de expiración." },
  { n: "04", icon: MessageSquare, t: "Comenta",      d: "Los comentarios son públicos para todos los que estén cerca. Interactúa sin fricciones." },
  { n: "05", icon: UserPlus,   t: "Conecta",         d: "Envía una solicitud para chatear en privado. Solo se abre si ambos aceptan." },
  { n: "06", icon: Inbox,      t: "Controla",        d: "Gestiona las solicitudes recibidas. Tú decides quién entra a tu chat privado." },
] as const;

const STEP_POSITIONS: Record<StepKey, string> = {
  0: "top-[40%]",
  1: "top-[40%]",
  2: "top-[68%]",
  3: "top-[16%]",
  4: "top-[68%]",
  5: "top-[68%]",
};

function MobileStepCard({
  stepIndex,
  className = "",
  onClick,
  onDragEnd,
}: {
  stepIndex: StepKey;
  className?: string;
  onClick?: () => void;
  onDragEnd?: (_: unknown, info: PanInfo) => void;
}) {
  const s = STEPS[stepIndex];
  const Icon = s.icon;
  return (
    <div className={`absolute inset-x-[-16px] z-30 md:hidden pointer-events-none transition-all duration-300 ${className}`}>
      <motion.div
        onPanEnd={onDragEnd}
        onTap={() => onClick?.()}
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="gradient-border rounded-2xl bg-white/[0.08] p-3.5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] pointer-events-auto cursor-pointer"
      >
        <div className="relative flex items-start gap-3.5">
          {/* Number Badge */}
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold text-white shadow-[0_0_24px_-4px_var(--magenta)]"
            style={{ background: "linear-gradient(135deg, var(--magenta), var(--cyan))" }}
          >
            {s.n}
          </div>
          {/* Text content */}
          <div className="min-w-0 flex-1 text-left">
            <div className="flex items-center gap-1.5">
              <Icon size={14} className="text-cyan-400" />
              <h3 className="text-[15px] font-bold text-white leading-none">
                {s.t}
              </h3>
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/90 font-medium">
              {s.d}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function InteractionSection() {
  const [step, setStep] = useState<StepKey>(0);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) {
      setStep((s) => ((s + 1) % 6) as StepKey);
    } else if (info.offset.x > 60) {
      setStep((s) => ((s - 1 + 6) % 6) as StepKey);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      dragStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleScreenClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
      return;
    }

    const dx = Math.abs(e.clientX - dragStartPos.current.x);
    const dy = Math.abs(e.clientY - dragStartPos.current.y);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 8) {
      setStep((s) => ((s + 1) % 6) as StepKey);
    }
  };

  return (
    <section id="como-funciona" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Cómo funciona</p>
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Seis pasos. <span className="text-gradient">Cero fricción.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Desliza el celular o toca un paso para ver cómo se siente Warpin en vivo.
          </p>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Phone column (top mobile, right desktop) */}
          <div className="order-1 flex justify-center md:order-2">
            <div className="relative w-full max-w-[340px] sm:max-w-[360px]">
              <div
                aria-hidden
                className="absolute -inset-10 -z-10 opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--magenta) 60%, transparent), transparent 60%), radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--cyan) 50%, transparent), transparent 60%)",
                }}
              />
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={onDragEnd}
                className="relative cursor-grab rounded-[2.6rem] p-[2px] shadow-[0_40px_120px_-30px_rgba(236,72,153,0.55)] active:cursor-grabbing"
                style={{
                  background:
                    "linear-gradient(140deg, color-mix(in oklab, var(--magenta) 75%, transparent), color-mix(in oklab, var(--cyan) 75%, transparent))",
                }}
              >
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[oklch(0.08_0.03_280)] p-2">
                  <div className="absolute left-1/2 top-2 z-30 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-black" />
                  <div
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onClick={handleScreenClick}
                    className="relative aspect-[9/19] w-full overflow-hidden rounded-[2.1rem] cursor-pointer"
                    style={{
                      background:
                        "radial-gradient(80% 60% at 30% 10%, color-mix(in oklab, var(--magenta) 28%, transparent), transparent 60%), radial-gradient(60% 50% at 90% 90%, color-mix(in oklab, var(--cyan) 22%, transparent), transparent 60%), linear-gradient(180deg, #14101e, #0c0a14)",
                    }}
                  >
                    <PhoneChrome />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 0.96, y: 14 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.02, y: -10 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 pt-16"
                      >
                        <StepScreen step={step} />
                      </motion.div>
                    </AnimatePresence>

                    <PhoneTabBar />
                  </div>
                </div>
              </motion.div>
              <MobileStepCard
                stepIndex={step}
                className={STEP_POSITIONS[step]}
                onClick={() => setStep((s) => ((s + 1) % 6) as StepKey)}
                onDragEnd={onDragEnd}
              />

              {/* Dots */}
              <div className="mt-5 flex items-center justify-center gap-2">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i as StepKey)}
                    aria-label={`Paso ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === step
                        ? "w-7 bg-gradient-to-r from-magenta to-cyan shadow-[0_0_12px_var(--magenta)]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Steps column (hidden on mobile, visible on desktop) */}
          <div className="order-2 hidden md:flex flex-col gap-3 md:order-1">
            {STEPS.map((s, i) => {
              const active = i === step;
              const Icon = s.icon;
              return (
                <button
                  key={s.n}
                  onClick={() => setStep(i as StepKey)}
                  className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all backdrop-blur-sm ${
                    active
                      ? "border-transparent bg-white/[0.06] shadow-glow"
                      : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="step-active-border"
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                      style={{
                        padding: "1px",
                        background:
                          "linear-gradient(135deg, var(--magenta), var(--cyan))",
                        WebkitMask:
                          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                  )}
                  <div className="relative flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold transition-all ${
                        active
                          ? "text-white shadow-[0_0_24px_-4px_var(--magenta)]"
                          : "bg-white/5 text-foreground/70"
                      }`}
                      style={
                        active
                          ? { background: "linear-gradient(135deg, var(--magenta), var(--cyan))" }
                          : undefined
                      }
                    >
                      {s.n}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className={active ? "text-cyan-400" : "text-muted-foreground"} />
                        <h3 className={`text-base font-semibold ${active ? "text-foreground" : "text-foreground/85"}`}>
                          {s.t}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------ Phone chrome (status + top bar + tab bar) ------------ */
function PhoneChrome() {
  return (
    <>
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-white/90">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        </span>
      </div>
      <div className="absolute inset-x-0 top-7 z-20 mt-2 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">
          <MapPin size={12} className="text-magenta" />
          <span className="text-[11px] font-medium text-white">UCSM · 0.8 km</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/10 p-1.5 backdrop-blur">
            <Search size={12} className="text-white" />
          </span>
          <span className="relative rounded-full bg-white/10 p-1.5 backdrop-blur">
            <Bell size={12} className="text-white" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-magenta ring-2 ring-[#14101e]" />
          </span>
        </div>
      </div>
    </>
  );
}

function PhoneTabBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/5 bg-black/30 px-6 py-3 backdrop-blur-xl">
      <div className="flex items-center justify-between text-white/50">
        <Home size={16} className="text-white" />
        <Compass size={16} />
        <div className="-mt-1 h-1 w-8 rounded-full bg-white/30" />
        <MessageCircle size={16} />
        <User size={16} />
      </div>
    </div>
  );
}

/* ------------ Step-specific screen content ------------ */
function StepScreen({ step }: { step: StepKey }) {
  if (step === 0) return <ScreenDiscover />;
  if (step === 1) return <ScreenCategory />;
  if (step === 2) return <ScreenPublish />;
  if (step === 3) return <ScreenComments />;
  if (step === 4) return <ScreenConnect />;
  return <ScreenControl />;
}

/* ----- shared mini map ----- */
function MiniMap({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0c0a14]">
      {/* Dark styled Google Maps image */}
      <img
        src={ucsmMap}
        alt="UCSM Map"
        className="absolute inset-0 h-full w-full object-cover opacity-38"
        style={{
          filter: "invert(1) hue-rotate(215deg) brightness(0.42) contrast(1.35) saturate(0.85)",
        }}
      />
      {/* Glow overlay to match page background color */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a14]/90 via-transparent to-[#0c0a14]/40 pointer-events-none" />

      {/* Range circle (user) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="absolute inset-0 -m-16 rounded-full border border-cyan/35" />
        <div className="absolute inset-0 -m-10 rounded-full border border-magenta/45" />
        <div className="relative flex h-4 w-4 items-center justify-center">
          <span className="absolute h-12 w-12 animate-pulse-ring rounded-full bg-cyan/35" />
          <span className="relative h-3 w-3 rounded-full bg-cyan ring-2 ring-white" />
        </div>
      </div>
      {children}
    </div>
  );
}

function Pin({ x, y, emoji, tone, faded = false, delay = "0s" }: {
  x: string; y: string; emoji: string; tone: "magenta" | "cyan" | "orange" | "red" | "green" | "gray"; faded?: boolean; delay?: string;
}) {
  const colors: Record<string, string> = {
    magenta: "var(--magenta)", cyan: "var(--cyan)",
    orange: "#f97316", red: "#ef4444", green: "#22c55e", gray: "#64748b",
  };
  const c = colors[tone];
  return (
    <motion.div
      initial={false}
      animate={{ opacity: faded ? 0.15 : 1, scale: faded ? 0.85 : 1 }}
      transition={{ duration: 0.4 }}
      className="absolute"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      {!faded && (
        <span
          className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full"
          style={{ background: c, opacity: 0.3, animationDelay: delay }}
        />
      )}
      <div
        className="relative flex h-7 w-7 items-center justify-center rounded-full text-[13px] ring-2 ring-white/80"
        style={{ background: c, boxShadow: faded ? "none" : `0 0 18px ${c}` }}
      >
        {emoji}
      </div>
    </motion.div>
  );
}

/* --- 01: Discover --- */
function ScreenDiscover() {
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    let timeoutId: any;
    
    const runLoop = (step: number) => {
      setActiveCount(step);
      
      let nextDelay = 800; // delay between each pin
      let nextStep = step + 1;
      
      if (step === 4) {
        nextDelay = 3000; // stay visible for 3 seconds
        nextStep = -1; // reset state
      } else if (step === -1) {
        nextDelay = 150; // short pause before restarting
        nextStep = 0;
      }
      
      timeoutId = setTimeout(() => {
        runLoop(nextStep);
      }, nextDelay);
    };

    runLoop(0);

    return () => clearTimeout(timeoutId);
  }, []);

  const pins = [
    { x: "24%", y: "22%", emoji: "🚕", tone: "cyan" as const, msg: "Comparto taxi a Cayma" },
    { x: "38%", y: "78%", emoji: "🚨", tone: "red" as const, msg: "¿Dónde queda el pabellón de medicina?" },
    { x: "18%", y: "65%", emoji: "🎲", tone: "magenta" as const, msg: "Recomendaciones de música indie" },
    { x: "42%", y: "52%", emoji: "🍻", tone: "orange" as const, msg: "Alguien almuerzo por la U?" },
    { x: "32%", y: "34%", emoji: "💬", tone: "magenta" as const, msg: "Conversar un rato" },
  ];

  return (
    <MiniMap>
      <AnimatePresence>
        {pins.map((p, i) => {
          const isVisible = activeCount !== -1 && i <= activeCount;
          const showMsg = activeCount !== -1 && i <= activeCount;

          return (
            isVisible && (
              <motion.div
                key={p.emoji}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none"
              >
                <Pin x={p.x} y={p.y} emoji={p.emoji} tone={p.tone} delay="0s" />
                <AnimatePresence>
                  {showMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 250, damping: 15 }}
                      className="absolute z-40 whitespace-nowrap rounded-xl bg-[rgba(15,10,25,0.95)] border border-white/10 px-3 py-2 text-[12px] font-extrabold text-white shadow-glow pointer-events-none"
                      style={{ left: p.x, top: `calc(${p.y} - 28px)`, transform: "translateX(-50%)" }}
                    >
                      {p.msg}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          );
        })}
      </AnimatePresence>
    </MiniMap>
  );
}

/* --- 02: Category --- */
const CATEGORIES = [
  { e: "👥", t: "Social",     c: "#FF5722" },
  { e: "🚨", t: "Ayuda",      c: "#EF4444" },
  { e: "🚕", t: "Transporte", c: "#00E5FF" },
  { e: "🎲", t: "Random",     c: "#A855F7" },
];

function ScreenCategory() {
  return (
    <div className="relative h-full w-full bg-[#0c0a14]">
      {/* Full screen MiniMap as background */}
      <div className="absolute inset-0">
        <MiniMap>
          <Pin x="22%" y="32%" emoji="🚕" tone="cyan" delay="0s" />
          <Pin x="68%" y="60%" emoji="🚕" tone="cyan" delay="0.5s" />
          <Pin x="72%" y="22%" emoji="🍻" tone="orange" faded />
          <Pin x="78%" y="68%" emoji="🚨" tone="red" faded />
          <Pin x="18%" y="72%" emoji="🎲" tone="magenta" faded />
          <Pin x="48%" y="16%" emoji="💬" tone="magenta" faded />
        </MiniMap>
      </div>

      {/* Grid of categories over map */}
      <div className="absolute inset-x-0 top-0 z-10 grid grid-cols-3 gap-1 px-1.5 pt-1.5 pb-5 bg-gradient-to-b from-[#0c0a14] via-[#0c0a14]/80 to-transparent">
        {CATEGORIES.map((c, i) => {
          const active = c.t === "Transporte";
          return (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: -8 }}
              animate={{
                opacity: 1,
                y: 0,
                boxShadow: active
                  ? [
                      "0 0 4px rgba(34,211,238,0.4), inset 0 0 4px rgba(34,211,238,0.2)",
                      "0 0 12px rgba(34,211,238,0.8), inset 0 0 8px rgba(34,211,238,0.4)",
                      "0 0 4px rgba(34,211,238,0.4), inset 0 0 4px rgba(34,211,238,0.2)",
                    ]
                  : [
                      "0 0 2px rgba(255,255,255,0.05), inset 0 0 2px rgba(255,255,255,0.02)",
                      "0 0 8px rgba(255,255,255,0.25), inset 0 0 4px rgba(255,255,255,0.1)",
                      "0 0 2px rgba(255,255,255,0.05), inset 0 0 2px rgba(255,255,255,0.02)",
                    ],
              }}
              transition={{
                delay: i * 0.05,
                boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
              className="flex items-center justify-center gap-0.5 rounded-full py-1.5 px-1 text-[10.5px] font-extrabold tracking-tight ring-1 border border-white/5 cursor-pointer"
              style={{
                background: active ? c.c : "rgba(255,255,255,0.06)",
                color: active ? "#0c0a14" : "rgba(255,255,255,0.85)",
                borderColor: active ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.05)",
              }}
            >
              <span>{c.e}</span>
              <span className="truncate">{c.t}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* --- 03: Publish --- */
function InteractiveToggle({ label }: { label: string }) {
  const [enabled, setEnabled] = useState(true);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setEnabled(!enabled);
      }}
      className="flex items-center justify-between rounded-xl bg-white/5 hover:bg-white/10 transition-colors px-2.5 py-1.5 w-full text-left"
    >
      <span className="text-[8.5px] font-bold text-white/80 leading-none">{label}</span>
      <div
        className={`h-4 w-7 shrink-0 rounded-full p-0.5 transition-colors duration-200 relative flex items-center ${
          enabled ? "bg-green-500 justify-end" : "bg-white/20 justify-start"
        }`}
      >
        <motion.div
          layout
          className="h-3 w-3 rounded-full bg-white shadow-sm"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </button>
  );
}

function ScreenPublish() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <MiniMap />
      </div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="absolute inset-x-3 top-6 rounded-2xl border border-white/10 bg-[rgba(20,16,30,0.92)] p-3.5 backdrop-blur-xl"
      >
        <div className="mb-2.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
          <Plus size={12} /> NUEVO PIN
        </div>
        <div className="space-y-1.5">
          <TypeLine label="Título" text="Alguien para un taco? Somos 3 🎱" delay={0.2} />
          <TypeLine label="Categoría" text="👥 Social" delay={0.6} />
          <TypeLine label="Expira en" text="45 min" delay={1.0} />
          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            <InteractiveToggle label="Permitir Chats" />
            <InteractiveToggle label="Permitir comentarios" />
          </div>
        </div>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-3.5 w-full rounded-xl py-2.5 text-[11px] font-bold text-white"
          style={{ background: "linear-gradient(135deg, var(--magenta), var(--cyan))" }}
        >
          Publicar PIN
        </motion.button>
      </motion.div>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute left-1/2 top-[76%] -translate-x-1/2 -translate-y-1/2"
      >
        <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full bg-magenta/40" />
        <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full bg-cyan/40" style={{ animationDelay: "0.3s" }} />
        <div
          className="relative flex h-8 w-8 items-center justify-center rounded-full text-base ring-2 ring-white"
          style={{ background: "var(--magenta)", boxShadow: "0 0 24px var(--magenta)" }}
        >
          🍻
        </div>
      </motion.div>
    </div>
  );
}

function TypeLine({ label, text, delay }: { label: string; text: string; delay: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5">
      <span className="text-[9px] uppercase tracking-wider text-white/50">{label}</span>
      <motion.span
        initial={{ opacity: 0, x: 6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className="text-[11px] font-semibold text-white"
      >
        {text}
      </motion.span>
    </div>
  );
}

/* --- 04: Comments --- */
const COMMENTS = [
  { u: "Camila", c: "Estoy con mi amiga al costado del Oxxo", t: "#ec4899" },
  { u: "Diego",  c: "Puedo en 10",      t: "#22d3ee" },
  { u: "Lucía",  c: "Un versus?",         t: "#f97316" },
];

function ScreenComments() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0"><MiniMap /></div>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute inset-x-2 bottom-16 rounded-2xl border border-white/10 bg-[rgba(20,16,30,0.92)] p-3.5 backdrop-blur-xl"
      >
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg text-base" style={{ background: "linear-gradient(135deg, var(--magenta), var(--cyan))" }}>🍻</div>
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-extrabold text-white leading-snug">Alguien para un taco? Somos 3 🎱</div>
            <div className="text-[10px] text-white/50 mt-0.5">3 comentarios públicos</div>
          </div>
        </div>
        <div className="space-y-2">
          {COMMENTS.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.18 }}
              className="flex items-start gap-2"
            >
              <span className="mt-1 h-4 w-4 shrink-0 rounded-full" style={{ background: c.t }} />
              <div className="max-w-[85%] rounded-xl bg-white/8 px-3 py-2 text-[12.5px] text-white/95 leading-snug">
                <span className="mr-1.5 font-bold text-white">{c.u}:</span>{c.c}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* --- 05: Connect --- */
function ScreenConnect() {
  const [sent, setSent] = useState(false);
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0"><MiniMap /></div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute inset-x-3 top-6 rounded-2xl border border-white/10 bg-[rgba(20,16,30,0.92)] p-3.5 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2.5 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl text-lg" style={{ background: "linear-gradient(135deg, var(--magenta), var(--cyan))" }}>🍻</div>
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-bold text-white leading-tight">Alguien para un taco? Somos 3 🎱</div>
            <div className="text-[10px] text-white/50">0.4 km · 3 personas</div>
          </div>
        </div>

        {/* Rounded text box above button */}
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12.5px] text-white/90 leading-relaxed italic mb-3">
          "Holaaa, Ya estan completos? prefiero hablar por chat 😊"
        </div>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setSent(true);
          }}
          whileTap={{ scale: 0.96 }}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[12.5px] font-bold text-white"
          style={{ background: "linear-gradient(135deg, var(--magenta), var(--cyan))" }}
        >
          <MessageSquare size={14} /> Solicitar chat
        </motion.button>
      </motion.div>
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="absolute inset-x-6 bottom-20 flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-xl"
            style={{ boxShadow: "0 10px 40px -10px var(--magenta)" }}
          >
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-[11.5px] font-semibold text-white">¡Solicitud de chat enviada!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* --- 06: Control --- */
const REQUESTS = [
  { n: "Carlos R.",  c: "#ec4899", msg: "Hola, vi que public..." },
  { n: "Valeria M.", c: "#22d3ee", msg: "Recien vi tu pin, todav..." },
];

function ScreenControl() {
  const [accepted, setAccepted] = useState(false);
  return (
    <div className="relative h-full w-full px-3 pt-2">
      <div className="mb-2 flex items-center gap-2">
        <Inbox size={14} className="text-cyan-400" />
        <span className="text-[11px] font-semibold text-white">Solicitudes entrantes</span>
      </div>
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div key="list" exit={{ opacity: 0, y: -10 }} className="space-y-2">
            {REQUESTS.map((r, i) => (
              <motion.div
                key={r.n}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.06] p-2"
              >
                <span className="h-8 w-8 shrink-0 rounded-full ring-2 ring-white/20" style={{ background: r.c }} />
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] font-bold text-white">{r.n}</div>
                  <div className="text-[10px] font-bold text-cyan-400">Te ha enviado un Mensaje</div>
                  <div className="text-[11px] text-white/60 truncate italic">"{r.msg}"</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (i === 0) setAccepted(true);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-500 text-white"
                  style={{ boxShadow: "0 0 14px rgba(34,197,94,0.6)" }}
                >
                  <Check size={14} strokeWidth={3} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white/70"
                >
                  <X size={14} strokeWidth={3} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-white/10 bg-[rgba(20,16,30,0.95)] p-3"
          >
            <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
              <span className="h-7 w-7 rounded-full" style={{ background: "#ec4899" }} />
              <div>
                <div className="text-[11px] font-semibold text-white">Carlos R.</div>
                <div className="text-[9px] text-green-400">● en línea</div>
              </div>
            </div>
            <div className="space-y-1.5">
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="max-w-[80%] rounded-lg bg-white/8 px-2 py-1 text-[10px] text-white/90">
                ¡Gracias por aceptar! 🙌
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="ml-auto max-w-[80%] rounded-lg bg-cyan/20 px-2 py-1 text-right text-[10px] text-cyan-100">
                Llego en 5 ✌️
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
