import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─── Constants ─────────────────────────────────────────────────────────────────

const PHONE_W = 270;
const PHONE_H_MOBILE = 440; // shorter phone on mobile (leaves room for nav)
const PHONE_H_DESKTOP = 540;

// Desktop-only zoom per step (1-3 zoom in for "close-up", step 5 slightly zoomed for deck)
// On mobile we skip these and use mobileScale instead (no extra zoom)
const DESKTOP_PHONE_SCALE = [1.0, 1.14, 1.14, 1.14, 1.14, 1.15];

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    key: "discover",
    title: "01  Descubre",
    text: "Abre el mapa y mira publicaciones temporales de estudiantes alrededor de tu zona en tiempo real.",
  },
  {
    key: "filter",
    title: "02  Elige categoría",
    text: "Filtra por Socializar, Transporte, Perdidos, Eventos o Ayuda. Sin ahogarte en grupos de WhatsApp.",
  },
  {
    key: "publish",
    title: "03  Publica",
    text: "Lanza un pin en segundos. Aparece en el mapa cerca de ti y desaparece automáticamente al expirar.",
  },
  {
    key: "comment",
    title: "04  Comenta",
    text: "Los comentarios son públicos y visibles para todos cerca. Interactúa sin necesidad de un chat privado.",
  },
  {
    key: "respond",
    title: "05  Conecta",
    text: "Si hay interés real, envía una solicitud de chat. El chat solo se abre si el publicador acepta.",
  },
  {
    key: "requests",
    title: "05  Conecta",
    text: "Revisa las solicitudes recibidas. Acepta, bloquea o reporta. Tú controlas quién entra a tu chat.",
  },
];

const basePins = [
  { top: "30%", left: "22%", color: "#22d3ee", emoji: "🚕", label: "Transporte", text: "¿Alguien comparte taxi?", side: "right" as const },
  { top: "40%", left: "68%", color: "#fb923c", emoji: "👥", label: "Socializar", text: "¿Almuerzo por la U?", side: "left" as const },
  { top: "57%", left: "28%", color: "#94a3b8", emoji: "🔑", label: "Perdidos", text: "Perdí mi carnet UCSM", side: "right" as const },
  { top: "63%", left: "70%", color: "#e879f9", emoji: "🎉", label: "Eventos", text: "Plan cerca de la U", side: "left" as const },
];

const chips = [
  { label: "Socializar", emoji: "👥", color: "#fb923c" },
  { label: "Transporte", emoji: "🚕", color: "#22d3ee" },
  { label: "Perdidos", emoji: "🔑", color: "#94a3b8" },
  { label: "Eventos", emoji: "🎉", color: "#e879f9" },
  { label: "Ayuda", emoji: "📚", color: "#4ade80" },
];

const REQUESTS = [
  { id: 0, name: "Carlos R.", time: "2 min", msg: "Holaa, voy al Cayma en 20 minutos, podemos compartir?" },
  { id: 1, name: "Valeria M.", time: "5 min", msg: "Puedes esperarme 30 min porfa? 😢" },
  { id: 2, name: "Diego S.", time: "8 min", msg: "Hola me pasas tu wsp para hablar por ahi?" },
];

const AVATAR_COLORS = [
  "linear-gradient(135deg, #22d3ee, #8b5cf6)",
  "linear-gradient(135deg, #f472b6, #fb923c)",
  "linear-gradient(135deg, #4ade80, #22d3ee)",
];

const STACK_STYLES = [
  { scale: 1.00, y: 0, opacity: 1.00, zIndex: 30, shadow: "0 10px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.12)" },
  { scale: 0.94, y: 20, opacity: 0.72, zIndex: 20, shadow: "0 4px 12px rgba(0,0,0,0.3)" },
  { scale: 0.88, y: 38, opacity: 0.50, zIndex: 10, shadow: "0 2px 6px rgba(0,0,0,0.2)" },
];

// ─── Google Maps Dark Mode SVG ────────────────────────────────────────────────

function GoogleStyleMap({ opacity = 1 }: { opacity?: number }) {
  return (
    <svg
      viewBox="0 0 270 540"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
    >
      <defs>
        <radialGradient id="gmGlow" cx="50%" cy="46%" r="55%">
          <stop offset="0%" stopColor="#1e3a6e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="270" height="540" fill="#1a1f2e" />
      <rect x="8" y="148" width="54" height="38" rx="3" fill="#162616" />
      <rect x="158" y="280" width="47" height="30" rx="3" fill="#162616" />
      <rect x="98" y="412" width="38" height="28" rx="3" fill="#162616" />
      <g fill="#1e2540">
        <rect x="0" y="0" width="84" height="78" rx="1" />
        <rect x="0" y="88" width="78" height="46" rx="1" />
        <rect x="98" y="0" width="80" height="50" rx="1" />
        <rect x="188" y="0" width="82" height="88" rx="1" />
        <rect x="188" y="98" width="82" height="64" rx="1" />
        <rect x="0" y="210" width="68" height="118" rx="1" />
        <rect x="0" y="378" width="84" height="98" rx="1" />
        <rect x="0" y="486" width="84" height="54" rx="1" />
        <rect x="168" y="348" width="102" height="88" rx="1" />
        <rect x="168" y="448" width="102" height="92" rx="1" />
        <rect x="98" y="450" width="60" height="58" rx="1" />
      </g>
      <path d="M -15 70 C 55 130, 75 210, 128 272 S 218 415, 285 498" stroke="#1b3a54" strokeWidth="20" fill="none" />
      <path d="M -15 70 C 55 130, 75 210, 128 272 S 218 415, 285 498" stroke="#1e4a6a" strokeWidth="12" fill="none" opacity="0.7" />
      <path d="M -15 70 C 55 130, 75 210, 128 272 S 218 415, 285 498" stroke="#2a6a8a" strokeWidth="2" fill="none" opacity="0.35" />
      <g stroke="#2e3855" strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M 0 186 L 270 200" />
        <path d="M 0 354 L 270 340" />
        <path d="M 88  0   L 73  540" />
        <path d="M 202 0   L 217 540" />
      </g>
      <g fill="#3a4870" fontSize="5" fontFamily="sans-serif" letterSpacing="0.3">
        <text x="10" y="183">AV. INDEPENDENCIA</text>
        <text x="10" y="350">AV. TRINIDAD MORÁN</text>
        <text x="92" y="52" transform="rotate(90,92,52)">AV. EJÉRCITO</text>
        <text x="206" y="76" transform="rotate(90,206,76)">AV. AVIACIÓN</text>
      </g>
      <g stroke="#252d42" strokeWidth="1.2" fill="none">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 44 + 18} x2="270" y2={i * 44 + 23} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 37 + 16} y1="0" x2={i * 37 + 10} y2="540" />
        ))}
      </g>
      <line x1="25" y1="55" x2="235" y2="235" stroke="#252d42" strokeWidth="1.8" />
      <g fill="#4a5580" fontSize="7.5" fontFamily="sans-serif" fontWeight="600">
        <text x="14" y="162">CERCADO</text>
        <text x="175" y="94" >YANAHUARA</text>
        <text x="14" y="442">SELVA ALEGRE</text>
        <text x="174" y="470">CAYMA</text>
      </g>
      <g transform="translate(135 272)">
        <rect x="-13" y="-13" width="26" height="26" rx="2" fill="#1e2e50" stroke="#2a4080" strokeWidth="0.8" />
        <circle r="5" fill="#1a3520" />
        <circle r="2" fill="#2a5530" />
      </g>
      <rect width="270" height="540" fill="url(#gmGlow)" />
    </svg>
  );
}

// ─── Status Bar ───────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <>
      <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-white/90">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-3 rounded-sm bg-white/80" />
          <span className="inline-block h-2 w-2 rounded-full bg-white/80" />
          <span className="inline-block h-2 w-4 rounded-sm border border-white/70" />
        </span>
      </div>
      <div className="absolute left-1/2 top-2.5 z-40 h-7 w-[88px] -translate-x-1/2 rounded-full bg-black" />
    </>
  );
}

// ─── Step 1: Live Map ─────────────────────────────────────────────────────────

function Step1Map() {
  return (
    <>
      <div className="absolute inset-0">
        <GoogleStyleMap />
      </div>
      <motion.div
        className="absolute left-1/2 top-[48%] z-10 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400"
        />
        <div className="relative h-5 w-5 rounded-full bg-cyan-400 shadow-[0_0_22px_#22d3ee]" />
      </motion.div>
      {basePins.map((p, i) => (
        <motion.div
          key={p.label}
          className="absolute z-20"
          style={{ top: p.top, left: p.left, transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0, scale: 0, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
          transition={{
            opacity: { duration: 0.4, delay: 0.25 + i * 0.13 },
            scale: { duration: 0.4, delay: 0.25 + i * 0.13 },
            y: { duration: 2.5 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
          }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-base"
            style={{ background: `${p.color}22`, border: `2px solid ${p.color}`, boxShadow: `0 0 18px ${p.color}80` }}
          >
            {p.emoji}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.16, duration: 0.35 }}
            className="absolute top-2 max-w-[100px] whitespace-normal rounded-xl bg-[#0f1421]/85 px-2 py-1 text-[9.5px] font-medium leading-snug text-white backdrop-blur-sm"
            style={{ border: `1px solid ${p.color}30`, ...(p.side === "right" ? { left: 34 } : { right: 34 }) }}
          >
            {p.text}
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}

// ─── Step 2: Category Filter ──────────────────────────────────────────────────

function Step2Categories() {
  return (
    <>
      <div className="absolute inset-0 opacity-25"><GoogleStyleMap /></div>
      <div className="absolute inset-0 bg-[#0f1421]/75" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400/80">
          Filtrar por
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="mb-6 text-[13px] font-extrabold text-white">
          ¿Qué buscas hoy?
        </motion.p>
        <div className="grid w-full grid-cols-2 gap-2.5">
          {chips.map((c, i) => {
            const active = c.label === "Transporte";
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: active ? [1, 1.05, 1] : 1 }}
                transition={{
                  opacity: { delay: 0.12 + i * 0.1 },
                  scale: active ? { duration: 1.3, repeat: Infinity, delay: 1 } : {},
                }}
                className="flex items-center gap-2 rounded-xl border px-3 py-2.5"
                style={{
                  borderColor: active ? c.color : "#ffffff1a",
                  background: active ? `${c.color}22` : "#ffffff08",
                  boxShadow: active ? `0 0 20px ${c.color}55, inset 0 1px 0 ${c.color}30` : "none",
                }}
              >
                <span className="text-lg">{c.emoji}</span>
                <span className="text-[11px] font-bold" style={{ color: active ? c.color : "#ffffff80" }}>{c.label}</span>
                {active && (
                  <motion.div
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-auto h-2 w-2 rounded-full"
                    style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
          className="mt-4 text-[9px] text-cyan-400/60"
        >
          ✦ Selecciona para filtrar el mapa
        </motion.p>
      </div>
    </>
  );
}

// ─── Step 3: Publish ──────────────────────────────────────────────────────────

function Step3Publish() {
  return (
    <>
      <div className="absolute inset-0 opacity-18"><GoogleStyleMap /></div>
      <div className="absolute inset-0 bg-[#0f1421]/78" />
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-0 right-0 top-11 z-30 flex items-center border-b border-white/8 px-4 py-2"
      >
        <span className="text-[11px] text-white/40">←</span>
        <p className="mx-auto text-[12px] font-bold text-white/85">Crea Publicaciones</p>
        <span className="text-[11px] text-white/0">←</span>
      </motion.div>
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
        className="absolute inset-x-3 bottom-5 z-30 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl"
        style={{ boxShadow: "0 8px 40px #8b5cf620" }}
      >
        <p className="text-[9px] font-bold uppercase tracking-widest text-white/45">Nueva Publicación</p>
        <div className="mt-2.5 rounded-xl border border-white/8 bg-white/[0.05] p-2.5 text-[10.5px] italic leading-relaxed text-white/90">
          "Voy hacia Cayma en 10 min, ¿alguien comparte taxi?"
        </div>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1 rounded-full bg-cyan-400/15 px-2.5 py-0.5 text-[9.5px] font-semibold text-cyan-400">🚕 Transporte</span>
          <span className="text-[9px] text-white/40">⏱ Duración: 1 hora</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-white/6 bg-white/[0.04] px-2.5 py-1.5">
          <span className="text-[10px]">🔒</span>
          <span className="text-[8.5px] text-white/40">Tu ubicación exacta no se muestra</span>
        </div>
        <motion.button
          animate={{ boxShadow: ["0 0 0px #8b5cf6", "0 0 24px #8b5cf680", "0 0 0px #8b5cf6"] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="mt-3 w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-2 text-[10.5px] font-bold text-white"
        >
          Publicar →
        </motion.button>
      </motion.div>
    </>
  );
}

// ─── Step 4: Comments (public) ────────────────────────────────────────────────

const PUBLIC_COMMENTS = [
  { name: "Ana R.", time: "2m", text: "Yo también voy para ese lado! 🙌", color: "linear-gradient(135deg,#22d3ee,#8b5cf6)" },
  { name: "Mateo S.", time: "4m", text: "¿Van por Independencia o Ejército?", color: "linear-gradient(135deg,#f472b6,#fb923c)" },
  { name: "Sofía L.", time: "6m", text: "Yo me apunto si esperan 5 min más 🚕", color: "linear-gradient(135deg,#4ade80,#22d3ee)" },
];

function Step4Comments() {
  const [typed, setTyped] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <>
      <div className="absolute inset-0 opacity-15"><GoogleStyleMap /></div>
      <div className="absolute inset-0 bg-[#0f1421]/80" />
      {/* Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-0 right-0 top-11 z-30 flex items-center border-b border-white/8 px-4 py-2"
      >
        <span className="text-[11px] text-white/40">←</span>
        <p className="mx-auto text-[11px] font-bold text-white/80">Comentarios públicos</p>
        <span className="text-[9px] text-cyan-400 font-bold">3</span>
      </motion.div>

      {/* Post preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="absolute left-3 right-3 top-[62px] z-20 rounded-xl border border-white/8 bg-white/[0.05] p-2.5 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 text-[8.5px] font-bold text-cyan-400">🚕 Transporte</span>
          <span className="text-[8px] text-white/35">⏱ 42 min</span>
        </div>
        <p className="mt-1.5 text-[9.5px] leading-snug text-white/85">"Voy hacia Cayma en 10 min, ¿alguien comparte taxi?"</p>
        <p className="mt-0.5 text-[8px] text-white/35">📍 a 300 m · hace 8 min</p>
      </motion.div>

      {/* Comments list */}
      <div className="absolute left-3 right-3 top-[150px] z-20 space-y-2">
        {PUBLIC_COMMENTS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.14 }}
            className="flex items-start gap-2"
          >
            <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full" style={{ background: c.color }} />
            <div className="min-w-0 flex-1 rounded-xl rounded-tl-sm border border-white/8 bg-white/[0.06] px-2.5 py-1.5 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold text-white">{c.name}</span>
                <span className="text-[8px] text-green-400">✓</span>
                <span className="ml-auto text-[8px] text-white/30">{c.time}</span>
              </div>
              <p className="mt-0.5 text-[9px] leading-snug text-white/75">{c.text}</p>
            </div>
          </motion.div>
        ))}
        {sent && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-2"
          >
            <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
            <div className="min-w-0 flex-1 rounded-xl rounded-tl-sm border border-cyan-400/20 bg-cyan-400/[0.08] px-2.5 py-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold text-white">Tú</span>
                <span className="text-[8px] text-green-400">✓</span>
                <span className="ml-auto text-[8px] text-white/30">ahora</span>
              </div>
              <p className="mt-0.5 text-[9px] leading-snug text-white/75">{typed || "¡Yo también voy! 🙌"}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Comment input */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="absolute inset-x-3 bottom-5 z-30 flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.07] px-3 py-2 backdrop-blur-xl"
      >
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
        <div
          className="flex-1 text-[9.5px] text-white/35"
          style={{ fontStyle: sent ? "normal" : "italic" }}
        >
          {sent ? "Comentario enviado ✅" : "Escribe un comentario público..."}
        </div>
        <motion.button
          onClick={() => { setSent(true); setTyped("¡Yo también voy! 🙌"); }}
          animate={sent ? {} : { boxShadow: ["0 0 0px #22d3ee", "0 0 14px #22d3ee", "0 0 0px #22d3ee"] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="rounded-xl px-2.5 py-1 text-[9px] font-bold text-white"
          style={{ background: "linear-gradient(135deg,#22d3ee,#8b5cf6)" }}
        >
          {sent ? "✓" : "Enviar"}
        </motion.button>
      </motion.div>
    </>
  );
}

// ─── Step 5: Connect (old Step 4) ────────────────────────────────────────────

function Step5Respond() {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <div className="absolute inset-0 opacity-18"><GoogleStyleMap /></div>
      <div className="absolute inset-0 bg-[#0f1421]/78" />
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-0 right-0 top-11 z-30 flex items-center border-b border-white/8 px-4 py-2"
      >
        <span className="text-[11px] text-white/40">←</span>
        <p className="mx-auto text-[11px] font-bold text-white/80">Solicitar chat privado</p>
        <span className="text-[11px] text-white/0">←</span>
      </motion.div>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
        className="absolute inset-x-3 bottom-5 z-30 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl"
        style={{ boxShadow: "0 8px 40px #22d3ee15" }}
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-cyan-400/18 px-2.5 py-0.5 text-[9.5px] font-bold text-cyan-400">🚕 Transporte</span>
          <span className="text-[9px] text-white/40">⏱ 42 min restantes</span>
        </div>
        <p className="mt-2 text-[10.5px] leading-relaxed text-white">
          "Voy hacia Cayma en 10 min, ¿alguien comparte taxi?"
        </p>
        <p className="mt-0.5 text-[9px] text-white/40">📍 a 300 m aprox.</p>
        <div className="mt-2 rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1.5">
          <p className="text-[8.5px] text-white/45">💬 El chat se abre solo si el publicador acepta tu solicitud.</p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <motion.button
            onClick={() => setClicked(true)}
            animate={clicked ? {} : { boxShadow: ["0 0 0px #22d3ee", "0 0 20px #22d3ee", "0 0 0px #22d3ee"] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="rounded-xl bg-cyan-500 py-2 text-[9.5px] font-bold text-[#0f1421]"
          >
            Conectar
          </motion.button>
          <button className="rounded-xl bg-white/10 py-2 text-[9.5px] text-white/65">Guardar</button>
          <button className="rounded-xl bg-white/10 py-2 text-[9.5px] text-white/65">Reportar</button>
        </div>
      </motion.div>
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="absolute bottom-44 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-2xl border border-green-400/30 bg-green-400/15 px-4 py-2 text-[10.5px] font-semibold text-green-300 backdrop-blur-xl"
          >
            ✅ Solicitud de chat enviada
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Step 6: Stacked Card Deck / Requests (with fan-reveal on mount) ──────────

function Step6Requests({ activeCard }: { activeCard: number }) {
  const [revealed, setRevealed] = useState(false);
  const getStackPos = (id: number) => (id - activeCard + 3) % 3;

  // Fan-reveal: back cards fade in from hidden → stack position after a short delay
  // This makes the "stacked deck" structure immediately obvious on entry
  useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => setRevealed(true), 450);
    return () => clearTimeout(t);
  }, []); // Only on mount (entering step 5)

  const getAnimate = (pos: number) => {
    const s = STACK_STYLES[pos];
    if (!revealed && pos > 0) {
      return { scale: s.scale, y: s.y, opacity: 0, zIndex: s.zIndex, boxShadow: s.shadow };
    }
    return { scale: s.scale, y: s.y, opacity: s.opacity, zIndex: s.zIndex, boxShadow: s.shadow };
  };

  return (
    <>
      <div className="absolute inset-0 opacity-20"><GoogleStyleMap /></div>
      <div className="absolute inset-0 bg-[#0f1421]/82" />

      <div className="absolute bottom-0 left-0 right-0 top-[42px] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-white/8 px-4 py-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-white">Solicitudes recibidas</p>
              <p className="text-[8.5px] text-white/40">Tu publicación · 🚕 · Activa</p>
            </div>
            <div className="flex items-center gap-2">
              {REQUESTS.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeCard ? 16 : 6,
                    background: i === activeCard ? "#22d3ee" : "rgba(255,255,255,0.25)",
                    boxShadow: i === activeCard ? "0 0 6px #22d3ee" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card stack */}
        <div className="flex flex-1 flex-col items-center justify-center px-3 pb-2">
          <div className="relative w-full" style={{ height: 205 }}>
            {REQUESTS.map((card) => {
              const pos = getStackPos(card.id);
              const isFront = pos === 0;
              return (
                <motion.div
                  key={card.id}
                  className="absolute inset-x-0 rounded-2xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur-xl"
                  style={{ transformOrigin: "top center" }}
                  animate={getAnimate(pos)}
                  transition={{ duration: 0.42, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 shrink-0 rounded-full" style={{ background: AVATAR_COLORS[card.id % 3] }} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="truncate text-[10.5px] font-bold text-white">{card.name}</span>
                        <span className="text-[9px] text-green-400">✓</span>
                      </div>
                      <p className="text-[8px] text-white/40">Usuario verificado · hace {card.time}</p>
                    </div>
                    {isFront && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/12 text-[12px] text-white/45">×</div>
                    )}
                  </div>
                  <div className="mt-2 rounded-lg border border-white/8 bg-white/[0.05] px-2.5 py-1.5">
                    <p className="text-[9.5px] leading-relaxed text-white/85">"{card.msg}"</p>
                  </div>
                  <p className="mt-1.5 text-[8px] text-white/38">📍 Ubicación aproximada · ~300 m</p>
                  {isFront ? (
                    <div className="mt-2 flex items-center gap-1.5">
                      <motion.button
                        animate={{ boxShadow: ["0 0 0px #22d3ee", "0 0 16px #22d3ee80", "0 0 0px #22d3ee"] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                        className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 py-2 text-[9.5px] font-bold text-white"
                      >
                        Aceptar Solicitud
                      </motion.button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/12 text-[14px]" title="Bloquear">🚫</button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-orange-400/25 bg-orange-400/12 text-[14px]" title="Reportar">⚠️</button>
                    </div>
                  ) : (
                    <div className="mt-2 h-8" />
                  )}
                </motion.div>
              );
            })}
          </div>
          <motion.p
            animate={{ opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 1 }}
            className="mt-3 text-center text-[9px] text-white/40"
          >
            Toca para ver la siguiente solicitud →
          </motion.p>
        </div>
      </div>
    </>
  );
}

// ─── Phone Screen ─────────────────────────────────────────────────────────────

function PhoneScreen({ step, cardIndex }: { step: number; cardIndex: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2.7rem] bg-[#0f1421]">
      <StatusBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === 0 && <Step1Map />}
          {step === 1 && <Step2Categories />}
          {step === 2 && <Step3Publish />}
          {step === 3 && <Step4Comments />}
          {step === 4 && <Step5Respond />}
          {step === 5 && <Step6Requests activeCard={cardIndex} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Step Dots — 44px tap targets (mobile-accessible) ────────────────────────

function StepDots({ current, total, onClick }: { current: number; total: number; onClick: (i: number) => void }) {
  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          aria-label={`Ir al paso ${i + 1}`}
          className="flex h-11 w-11 items-center justify-center" // 44×44px tap target
        >
          <div
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 32 : 10,
              height: 6,
              background: i === current ? "#22d3ee" : "rgba(255,255,255,0.2)",
              boxShadow: i === current ? "0 0 10px #22d3ee" : "none",
            }}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Phone frame helper ───────────────────────────────────────────────────────

const PHONE_FRAME_SHADOW =
  "0 40px 90px -20px rgba(139,92,246,0.45), inset 0 1px 0 rgba(255,255,255,0.22), 0 0 0 1px rgba(255,255,255,0.06)";

// ─── Main Section ─────────────────────────────────────────────────────────────

export function InteractionSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [mobileScale, setMobileScale] = useState(1);
  const touchStartX = useRef<number | null>(null);

  // Compute how much to scale the phone on mobile so it fills the available width
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) { setMobileScale(1); return; }
      const available = window.innerWidth - 48; // account for px-6 padding
      setMobileScale(Math.min(1.35, available / PHONE_W));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Navigation ──────────────────────────────────────────────────────────────

  const advance = () => {
    if (currentStep === 5) {
      cardIndex < REQUESTS.length - 1
        ? setCardIndex((c) => c + 1)
        : (setCardIndex(0), setCurrentStep(0));
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const goToPrev = () => {
    if (currentStep === 5 && cardIndex > 0) {
      setCardIndex((c) => c - 1);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      setCardIndex(0);
    }
  };

  const goTo = (i: number) => { setCurrentStep(i); setCardIndex(0); };

  // ── Swipe detection ─────────────────────────────────────────────────────────

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    touchStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = e.clientX - touchStartX.current;
    touchStartX.current = null;
    Math.abs(delta) > 40 ? (delta < 0 ? advance() : goToPrev()) : advance();
  };

  // ── Derived values ──────────────────────────────────────────────────────────

  const step = STEPS[currentStep];
  const deskPhoneScale = DESKTOP_PHONE_SCALE[currentStep];
  const isFirstAction = currentStep === 0 && cardIndex === 0;
  const isLastAction = currentStep === 5 && cardIndex === REQUESTS.length - 1;
  const mobileVisualH = PHONE_H_MOBILE * mobileScale; // layout-flow compensation

  const tapHintText =
    currentStep === 5
      ? cardIndex < 2 ? "Toca para siguiente solicitud" : "Toca para volver al inicio"
      : "Desliza o toca para avanzar";

  // Shared phone frame JSX (used in both mobile and desktop)
  const phoneInner = (height: number) => (
    <div
      className="relative w-[270px] rounded-[3.2rem] border border-white/15 p-[6px]"
      style={{
        height,
        background: "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))",
        boxShadow: PHONE_FRAME_SHADOW,
        backdropFilter: "blur(16px)",
      }}
    >
      <PhoneScreen step={currentStep} cardIndex={cardIndex} />
    </div>
  );

  return (
    <section
      id="interaccion"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16"
    >
      {/* ── Title ── */}
      <div className="mb-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300"
          style={{ textShadow: "0 0 18px rgba(34,211,238,0.8)" }}
        >
          ¿Cómo Funciona?
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          Mira{" "}
          <span
            className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent"
            style={{ filter: "drop-shadow(0 0 18px rgba(168,85,247,0.5))" }}
          >
            WARPIN
          </span>{" "}
          en acción
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-sm text-white/50"
        >
          5 pasos clave · toca o desliza para navegar
        </motion.p>
      </div>

      {/* ── Step dots — large tap targets ── */}
      <StepDots current={Math.min(currentStep, 4)} total={5} onClick={goTo} />

      {/* ════════════════════════════════════════════════════
           MOBILE LAYOUT  (hidden on lg+)
          ════════════════════════════════════════════════════ */}
      <div className="mt-4 flex w-full flex-col items-center lg:hidden">

        {/* Step text panel — full width, readable size */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.key + "-mob"}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28 }}
            className="mb-4 w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center backdrop-blur-md"
          >
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: "#22d3ee22", color: "#22d3ee" }}
            >
              Paso {Math.min(currentStep + 1, 5)} de 5
            </span>
            <h3 className="mt-1.5 text-[15px] font-bold leading-snug text-white">
              {step.title}
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-white/60">
              {step.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Phone scaled to fill available mobile width
            transform: scale() doesn't affect layout flow, so we need a wrapper
            div with the correct visual height to prevent content overlap.       */}
        <div
          className="relative flex w-full justify-center"
          style={{ height: mobileVisualH }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: `translateX(-50%) scale(${mobileScale})`,
              transformOrigin: "top center",
              width: PHONE_W,
              height: PHONE_H_MOBILE,
              touchAction: "none",
              userSelect: "none",
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            className="cursor-pointer"
          >
            {phoneInner(PHONE_H_MOBILE)}
          </div>
        </div>

        {/* Swipe/tap hint — always below phone, always in viewport */}
        <motion.div
          animate={{ opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="mt-4 flex items-center gap-2 text-[12px] text-white/55"
        >
          <span className="text-white/30">←</span>
          <span>{tapHintText}</span>
          <span className="text-white/30">→</span>
        </motion.div>

        {/* Large navigation buttons — always visible, easy to tap */}
        <div className="mt-3 flex w-full max-w-xs gap-3">
          <button
            onClick={goToPrev}
            disabled={isFirstAction}
            className="flex-1 rounded-2xl border border-white/15 bg-white/5 py-3.5 text-[13px] font-semibold text-white/65 transition active:bg-white/10 disabled:pointer-events-none disabled:opacity-25"
          >
            ← Anterior
          </button>
          <button
            onClick={advance}
            className="flex-1 rounded-2xl py-3.5 text-[13px] font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #22d3ee, #8b5cf6)",
              boxShadow: "0 0 22px rgba(139,92,246,0.5)",
            }}
          >
            {isLastAction ? "↺ Inicio" : "Siguiente →"}
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
           DESKTOP LAYOUT  (hidden below lg)
          ════════════════════════════════════════════════════ */}
      <div className="mt-10 hidden w-full max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-10 lg:grid">

        {/* Left: text panel */}
        <div className="flex flex-col items-end pr-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.key + "-left"}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.35 }}
              className="max-w-xs text-right"
            >
              <span
                className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ background: "#22d3ee22", color: "#22d3ee", boxShadow: "0 0 12px #22d3ee40" }}
              >
                Paso {Math.min(currentStep + 1, 5)} / 5
              </span>
              <h3 className="mt-3 text-2xl font-extrabold leading-snug text-white">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-white/65">{step.text}</p>
              <div className="mt-6 flex justify-end gap-2">
                {!isFirstAction && (
                  <button
                    onClick={goToPrev}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] text-white/60 transition hover:bg-white/10 hover:text-white"
                  >
                    ← Anterior
                  </button>
                )}
                <button
                  onClick={advance}
                  className="rounded-full px-4 py-1.5 text-[11px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #22d3ee, #8b5cf6)", boxShadow: "0 0 16px #8b5cf660" }}
                >
                  {isLastAction ? "↺ Reiniciar" : "Siguiente →"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: desktop phone with zoom */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={advance}
            aria-label="Avanzar al siguiente estado"
            className="group relative cursor-pointer outline-none"
          >
            {/* Tap hint */}
            <motion.div
              animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-medium text-white/70 backdrop-blur-md"
            >
              {currentStep === 5
                ? cardIndex < 2 ? "👇 Siguiente solicitud" : "👇 Volver al inicio"
                : "👇 Toca para avanzar"}
            </motion.div>

            {/* Framer Motion zoom (desktop only) */}
            <motion.div
              animate={{ scale: deskPhoneScale }}
              whileHover={{ scale: deskPhoneScale * 1.02 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="relative mx-auto"
            >
              {phoneInner(PHONE_H_DESKTOP)}
              {/* Glow ring */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[3.2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: "0 0 60px rgba(34,211,238,0.25)" }}
              />
            </motion.div>
          </button>
        </div>

        {/* Right: step list */}
        <div>
          <ol className="space-y-1.5">
            {STEPS.slice(0, 5).map((s, i) => (
              <li key={s.key}>
                <button
                  onClick={() => goTo(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${i === currentStep ? "bg-white/10 text-white" : "text-white/45 hover:bg-white/5 hover:text-white/75"
                    }`}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{
                      background: i === currentStep ? "#22d3ee" : "rgba(255,255,255,0.08)",
                      color: i === currentStep ? "#0f1421" : "rgba(255,255,255,0.5)",
                      boxShadow: i === currentStep ? "0 0 12px #22d3ee" : "none",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[13px] font-semibold leading-snug">
                    {s.title.replace(/^\d+\.\s*/, "")}
                  </span>
                  {i === currentStep && (
                    <motion.div
                      layoutId="active-step-indicator"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400"
                      style={{ boxShadow: "0 0 8px #22d3ee" }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
