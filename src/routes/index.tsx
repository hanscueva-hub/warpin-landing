import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useRef } from "react";
import {
  MapPin, Sparkles, Users, Beer, PartyPopper, Car, KeyRound, Siren, BookOpen,
  Shield, Eye, BadgeCheck, MessageCircle as MessageCircleLock, GraduationCap, Timer, Crown,
  ChevronDown, Menu, X, ArrowRight, Star, Lock, Zap, Droplet, Check,
} from "lucide-react";
import { WarpinLogo } from "@/components/warpin/Logo";
import { InteractionSection } from "@/components/warpin/InteractionSection";
import { useReveal } from "@/hooks/use-reveal";
import campusImg from "@/assets/warpin-campus.jpg";
import logoImg from "@/assets/warpin-logo.png";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WARPIN — Tu radar social en tiempo real" },
      { name: "description", content: "App de socialización local en tiempo real para universitarios menores de 30. Beta cerrada en UCSM." },
      { property: "og:title", content: "WARPIN — Tu radar social en tiempo real" },
      { property: "og:description", content: "Conecta al instante con personas cerca de ti. Únete a la beta cerrada." },
    ],
  }),
  component: Landing,
});

const WHATSAPP_URL = "https://chat.whatsapp.com/IK4zPo8yN4gIc9Y5RY1ecq";

const NAV = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#categorias", label: "Categorías" },
  { href: "#zona-cero", label: "Zona Cero" },
  { href: "#drops", label: "Drops" },
  { href: "#elite", label: "Pre-registro" },
  { href: "#faq", label: "FAQ" },
];

function Landing() {
  useReveal();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <BackgroundFX />
      <Navbar open={open} setOpen={setOpen} />
      <main className="relative z-10">
        <Hero />
        <LiveTicker />
        <WhatIs />
        <InteractionSection />
        <Categories />
        <Privacy />
        <ZonaCero />
        <Drops />
        <Founders />
        <Testimonials />
        <WhatsAppCTA />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}


/* ---------------- Background ---------------- */
function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--magenta), transparent 60%)" }} />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--cyan), transparent 60%)" }} />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
    </div>
  );
}

/* ---------------- Live Ticker (FOMO) ---------------- */
function LiveTicker() {
  const items = [
    "🔥 Camila reservó su acceso", "🍻 Nuevo pin en el patio", "🚕 Diego compartió taxi", "📚 Lucía pidió apuntes",
    "🎉 Previa en Yanahuara · 2.1 km", "✨ 24 nuevos accesos hoy", "🔑 Llaves encontradas en cafetería", "🚨 Ayuda rápida resuelta en 4 min",
    "💜 Mateo se unió al Comunidad de WhatsApp", "📍 Nuevo plan a 0.3 km",
  ];
  const loop = [...items, ...items];
  return (
    <div className="relative -mt-2 overflow-hidden border-y border-white/5 bg-black/20 py-3 backdrop-blur">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-xs font-medium text-foreground/80">
        {loop.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-magenta shadow-[0_0_8px_var(--magenta)]" />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function CountdownBox() {
  return (
    <div className="reveal mx-auto mb-8 flex w-fit items-center gap-2 rounded-full glass-strong px-4 py-2 text-xs">
      <Droplet size={14} className="text-cyan-400 animate-pulse" />
      <span className="font-semibold text-foreground">Oleada de drops: Muy pronto</span>
    </div>
  );
}


/* ---------------- Navbar ---------------- */
const MOBILE_NAV = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#categorias", label: "Categorías" },
  { href: "#zona-cero", label: "Zona Cero" },
  { href: "#drops", label: "Drops" },
  { href: "#elite", label: "Pre-registro" },
  { href: "#faq", label: "FAQ" },
];

function Navbar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const shellBase =
    "flex items-center justify-between rounded-3xl border border-white/10 px-4 py-2.5 backdrop-blur-xl transition-all";
  const shellBg = scrolled
    ? "bg-black/25 shadow-soft"
    : "bg-black/10";
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className={`${shellBase} ${shellBg}`}>
          <a href="#top" className="flex items-center"><WarpinLogo /></a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#elite"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-white/10"
            >
              Entrar
            </a>
            <button
              aria-label="Menú"
              onClick={() => setOpen(!open)}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-foreground md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="mt-2 overflow-hidden rounded-3xl border border-white/10 bg-[rgba(26,20,38,0.85)] p-2 backdrop-blur-lg md:hidden">
            <nav className="flex flex-col">
              {MOBILE_NAV.map((n, i) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 text-sm text-foreground/90 transition-colors hover:bg-white/5 ${i > 0 ? "border-t border-white/5" : ""}`}
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="top" className="relative px-4 pb-16 pt-32 sm:pt-36 md:pt-40">
      <div className="mx-auto max-w-4xl text-center">
        <div className="animate-fade-up flex flex-col items-center">
          <img
            src={logoImg}
            alt="Warpin Logo"
            className="mb-8 h-24 w-24 rounded-3xl object-cover shadow-[0_0_40px_rgba(34,211,238,0.5)] border border-cyan-400/20"
          />
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(26,20,38,0.7)] px-3 py-1.5 text-xs text-foreground/80 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Mapa en tiempo real · Arequipa
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem] max-w-3xl">
            Estás a <span className="text-cyan-400">500 metros</span> de un plan, <span className="text-cyan-400">una ayuda</span> o una respuesta.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Publica lo que necesitas o descubre lo que pasa cerca: planes, taxis compartidos, objetos perdidos y ayuda rápida. Warpin conecta estudiantes en tiempo real con opción de ubicación exacta o protegida.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#elite"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("elite")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group btn-glass-cyan inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-white transition-transform sm:w-auto"
            >
              🚀 Asegura tu Acceso Anticipado
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              <span className="h-8 w-8 rounded-full ring-2 ring-background" style={{ background: "#ec4899" }} />
              <span className="h-8 w-8 rounded-full ring-2 ring-background" style={{ background: "#22d3ee" }} />
              <span className="h-8 w-8 rounded-full ring-2 ring-background" style={{ background: "#f97316" }} />
              <span className="h-8 w-8 rounded-full ring-2 ring-background" style={{ background: "#22c55e" }} />
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Únete a los primeros miembros fundadores de Arequipa
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <TrustPill><Shield size={12} className="text-cyan-400" /> Ubicación protegida</TrustPill>
            <TrustPill><Timer size={12} className="text-magenta" /> Contenido efímero</TrustPill>
            <TrustPill><BadgeCheck size={12} className="text-cyan-400" /> Usuarios verificados</TrustPill>
          </div>

          <div className="mt-12 flex justify-center">
            <a href="#que-es" className="group flex flex-col items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground">
              Descubre más
              <ChevronDown size={18} className="animate-bounce text-foreground/60 group-hover:text-foreground" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/85 backdrop-blur">
      {children}
    </span>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium text-foreground/90">
      {children}
    </span>
  );
}



/* ---------------- What is ---------------- */
function WhatIs() {
  const items = [
    { icon: MapPin, title: "Local y en tiempo real", text: "Mira lo que pasa a tu alrededor en un radio de 0.5 a 3 km." },
    { icon: Users, title: "Pensada para tu campus", text: "Diseñada para conectar universitarios dentro del mismo ecosistema." },
    { icon: Sparkles, title: "Espontánea y efímera", text: "Publicaciones geolocalizadas que desaparecen al expirar. Sin huellas." },
  ];
  return (
    <Section id="que-es" eyebrow="¿Qué es WARPIN?" title={<>La red social local <span className="text-gradient">que sí entiende tu mundo</span></>}>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it, i) => (
          <Card key={it.title} delay={i * 80}>
            <it.icon className="h-7 w-7 text-cyan" />
            <h3 className="mt-4 text-lg font-semibold">{it.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{it.text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- How it works ---------------- */
function HowItWorks() {
  const steps = [
    { n: "01", icon: Eye, t: "Descubre", d: "Mira lo que está pasando cerca de ti en un mapa interactivo." },
    { n: "02", icon: Zap, t: "Publica", d: "Lanza un pin en segundos: un plan, una duda, una solicitud." },
    { n: "03", icon: Sparkles, t: "Responde", d: "Acepta o responde solicitudes cercanas en tiempo real." },
    { n: "04", icon: MessageCircleLock, t: "Conecta", d: "El chat se activa solo si ambos aceptan. Tú decides." },
  ];
  return (
    <Section id="como-funciona" eyebrow="Cómo funciona" title={<>Cuatro pasos. <span className="text-gradient">Cero fricción.</span></>}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Card key={s.n} delay={i * 70} className="group">
            <div className="flex items-center justify-between">
              <span className="font-display text-3xl font-bold text-gradient">{s.n}</span>
              <s.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Categories ---------------- */
function Categories() {
  const cats = [
    { e: "🍻", t: "Socializar", d: "Arma planes espontáneos, busca gente para comer, jugar billar o salir un rato." },
    { e: "🎉", t: "Eventos", d: "Descubre fiestas, previas y actividades cerca de ti." },
    { e: "🚕", t: "Transporte", d: "Coordina taxis compartidos, rutas o divide gastos de movilidad." },
    { e: "🔑", t: "Perdidos / Encontrados", d: "Reporta al instante llaves, carnet u objetos olvidados." },
    { e: "🚨", t: "Ayuda Rápida", d: "Pide apoyo inmediato para resolver urgencias o necesidades puntuales." },
    { e: "📚", t: "Académico", d: "Pide apuntes, presta un cargador o consigue info universitaria." },
  ];
  const icons = [Beer, PartyPopper, Car, KeyRound, Siren, BookOpen];
  return (
    <Section id="categorias" eyebrow="Categorías" title={<>Todo lo que necesitas, <span className="text-gradient">a un pin/warp de distancia</span></>}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c, i) => {
          const Ic = icons[i];
          return (
            <Card key={c.t} delay={i * 60} className="group relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                style={{ background: i % 2 ? "var(--cyan)" : "var(--magenta)" }} />
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl glass text-2xl">
                  {c.e}
                </div>
                <Ic className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{c.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.d}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------- Privacy ---------------- */
function Privacy() {
  const items = [
    { icon: MapPin, t: "Ubicación protegida", d: "Elige entre mostrar tu ubicación exacta o protegida (con desfase aleatorio de 40 metros)." },
    { icon: Timer, t: "Contenido efímero", d: "Todo desaparece al expirar. Sin huellas permanentes." },
    { icon: BadgeCheck, t: "Comunidad verificada", d: "Solo usuarios verificados con Google o teléfono pueden publicar o responder." },
    { icon: MessageCircleLock, t: "Chats bajo control", d: "Los mensajes privados solo se activan si ambos aceptan." },
  ];
  return (
    <Section id="privacidad"
      eyebrow={<><Lock size={12} className="inline -mt-0.5" /> Privacidad primero</>}
      title={<>Seguridad <span className="text-gradient">en cada PIN</span></>}>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((it, i) => (
          <Card key={it.t} delay={i * 70} className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow">
              <it.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{it.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.d}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Zona Cero ---------------- */
function ZonaCero() {
  return (
    <Section id="zona-cero" eyebrow="Zona Cero" title={<>Empezamos donde tú estás: <span className="text-gradient">UCSM</span></>}>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal relative overflow-hidden rounded-3xl glass-strong p-1">
          <img src={campusImg} alt="Vista aérea nocturna del campus con pines neón" loading="lazy" width={1280} height={800}
            className="aspect-[4/3] w-full rounded-[22px] object-cover opacity-90" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ background: "linear-gradient(180deg, transparent 40%, oklch(0.10 0.03 280 / 0.8) 100%)" }} />
          <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-cyan" />
            <div>
              <div className="font-display text-lg font-semibold">Universidad Católica de Santa María</div>
              <div className="text-xs text-muted-foreground">Arequipa · Punto de partida oficial</div>
            </div>
          </div>
        </div>
        <div className="reveal flex flex-col gap-4">
          <Card>
            <h3 className="text-lg font-semibold">El campus como punto de partida</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">El lanzamiento será exclusivo en la UCSM y sus zonas comerciales cercanas. Queremos construir una comunidad real, no un mar de extraños.</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">Pensado para tu día a día</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">WARPIN nace para resolver lo que pasa entre clases, en el patio, al salir de la U: planes, taxis, apuntes y conexiones reales.</p>
          </Card>
          <Card className="relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl" style={{ background: "var(--magenta)" }} />
            <h3 className="text-lg font-semibold">Próximas zonas</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">Después de UCSM, expandimos campus por campus. ¿Quieres traer WARPIN al tuyo?</p>
            <a
              href="https://tally.so/r/WOqWOk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-white mt-4 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white hover:scale-[1.02]"
            >
              Postular mi campus <ArrowRight size={14} />
            </a>
          </Card>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Drops ---------------- */
function Drops() {
  return (
    <Section id="drops"
      eyebrow={<><Timer size={12} className="inline -mt-0.5" /> Drops de acceso</>}
      title={<>El acceso se libera <span className="text-gradient">por lotes</span></>}
      subtitle="Cuando lancemos, el acceso se abre por drops limitados. Los códigos se anuncian primero en la Comunidad de WhatsApp de Warpin."
    >
      <CountdownBox />
      <div className="grid gap-4 sm:grid-cols-3">
        <DropCard day="Primera oleada" slots={500} taken={100} maxTaken={450} hot live />
        <DropCard day="Segunda oleada" slots={500} taken={0} />
        <DropCard day="Próximos drops" slots={0} taken={0} mystery />
      </div>
      <div className="reveal mt-8 flex flex-col items-center gap-3 text-center">
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
          className="btn-glass-whatsapp inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-white transition-transform hover:scale-[1.03] animate-glow-pulse">
          <WhatsAppIcon className="h-4 w-4" /> Quiero estar en el primer drop
          <ArrowRight size={16} />
        </a>
        <span className="text-xs text-muted-foreground">Los códigos se anuncian primero en la Comunidad de WhatsApp.</span>
      </div>
    </Section>
  );
}

function DropCard({ day, slots, taken, maxTaken, hot, mystery, live }: { day: string; slots: number; taken: number; maxTaken?: number; hot?: boolean; mystery?: boolean; live?: boolean }) {
  const cap = maxTaken ?? slots - 5;
  const [t, setT] = useState(taken);
  const growingRef = useRef(true);

  useEffect(() => {
    if (!live || slots === 0) return;
    const intervalTime = 60;
    const id = setInterval(() => {
      setT((prev) => {
        const step = 3;
        if (growingRef.current) {
          if (prev + step >= cap) {
            growingRef.current = false;
            return cap;
          }
          return prev + step;
        } else {
          if (prev - step <= taken) {
            growingRef.current = true;
            return taken;
          }
          return prev - step;
        }
      });
    }, intervalTime);
    return () => clearInterval(id);
  }, [live, slots, cap, taken]);

  const current = live ? t : taken;
  const pct = slots ? Math.min(100, Math.round((current / slots) * 100)) : 0;
  return (
    <div className={`reveal relative overflow-hidden rounded-3xl glass-strong p-6 ${hot ? "gradient-border" : ""}`}>
      {hot && (
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
          <Crown size={10} className="text-yellow-300" /> Fundador élite
        </div>
      )}
      <div className="text-sm text-muted-foreground">{day}</div>
      {mystery ? (
        <>
          <div className="mt-2 font-display text-4xl font-bold text-gradient">???</div>
          <p className="mt-2 text-sm text-muted-foreground">Drops sorpresa o por invitación. Los fundadores tendrán el poder.</p>
        </>
      ) : (
        <>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold">{slots}</span>
            <span className="text-sm text-muted-foreground">accesos</span>
          </div>
          {slots > 0 && (
            <>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-brand transition-all" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span className="tabular-nums">{current} reclamados</span>
                <span className={`tabular-nums ${live ? "text-magenta font-semibold" : ""}`}>{slots - current} disponibles{live && " · en vivo"}</span>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

/* ---------------- Founders ---------------- */
function Founders() {
  const basicBenefits = [
    'Título "Miembro Fundador" de por vida',
    "Acceso a la comunidad beta de WhatsApp",
    "Avisos de drops de acceso prioritario",
    "Soporte inicial de la comunidad",
  ];

  const eliteBenefits = [
    'Título "Fundador Élite" destacado y llamativo',
    "Acceso anticipado prioritario al lanzamiento",
    "Reportes prioritarios directos en la app",
    "Tu feedback define las primeras funciones",
    "Comunidad beta exclusiva de fundadores",
  ];

  return (
    <Section
      id="elite"
      eyebrow="Pre-registro"
      title={<>Pre-registro <span className="text-gradient">fundadores élite</span></>}
      subtitle="El acceso anticipado es limitado. Únete a la comunidad o completa la encuesta estratégica para asegurar tu rango."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card A — Miembro Fundador */}
        <div className="reveal glass relative flex flex-col justify-between rounded-3xl p-6 sm:p-8">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/80">
                Comunidad Beta
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-extrabold text-white">
              Miembro Fundador
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Reserva tu título exclusivo uniéndote a nuestra comunidad de WhatsApp. Es simple, rápido y te mantendrá al tanto de los drops de acceso.
            </p>

            <ul className="mt-6 space-y-3 text-left">
              {basicBenefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cyan-400/20">
                    <Check className="h-3 w-3 text-cyan-400" strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass-whatsapp mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold text-white"
          >
            💬 Unirme a la Comunidad
          </a>
        </div>

        {/* Card B — Fundador Élite (destacado) */}
        <div className="reveal glass-strong gradient-border relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 ring-1 ring-primary/30">
          <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl" />
          
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-gradient-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-glow">
                <Sparkles className="h-3 w-3 text-yellow-300" /> Recomendado
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Acceso Élite
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-extrabold text-white">
              Fundador Élite
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Para quienes quieren ayudar a dar forma a WARPIN y ser los primeros en entrar con un título ultra llamativo. Completa la encuesta del MVP.
            </p>

            <ul className="mt-6 space-y-3 text-left">
              {eliteBenefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="https://tally.so/r/68PdWY"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass-brand mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold text-white"
          >
            📝 Reclamar Fundador Élite
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const t = [
    { q: "Por fin una app pensada para lo que realmente pasa en la U.", n: "Camila R.", r: "Ingeniería · UCSM" },
    { q: "Mucho mejor que perderse en grupos gigantes de WhatsApp.", n: "Diego A.", r: "Derecho · UCSM" },
    { q: "Me encanta que sea local, rápido y privado.", n: "Lucía F.", r: "Comunicaciones · UCSM" },
  ];
  return (
    <Section id="testimonios" eyebrow="Lo que dicen" title={<>Voces <span className="text-gradient">de la comunidad</span></>}>
      <div className="grid gap-4 md:grid-cols-3">
        {t.map((it, i) => (
          <Card key={i} delay={i * 80}>
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={14} className="fill-magenta text-magenta" />
              ))}
            </div>
            <p className="text-base leading-relaxed">"{it.q}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-bold text-white">
                {it.n[0]}
              </div>
              <div>
                <div className="text-sm font-semibold">{it.n}</div>
                <div className="text-xs text-muted-foreground">{it.r}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Signup ---------------- */


/* ---------------- WhatsApp CTA ---------------- */
function WhatsAppCTA() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="reveal relative overflow-hidden rounded-[2rem] glass-strong p-8 text-center sm:p-12">
          <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-40 blur-3xl" style={{ background: "var(--magenta)" }} />
          <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-40 blur-3xl" style={{ background: "var(--cyan)" }} />
          <div className="relative">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--whatsapp)] shadow-glow animate-glow-pulse">
              <WhatsAppIcon className="h-7 w-7 text-white" />
            </div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Entra al comunidad beta de <span className="text-gradient">WARPIN</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Recibe noticias, códigos de acceso y drops exclusivos antes que todos.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
              className="btn-glass-whatsapp mt-7 inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold text-white hover:scale-[1.03]">
              <WhatsAppIcon className="h-5 w-5" /> Entrar a la Comunidad de WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const qs: { q: string; a: React.ReactNode }[] = [
    { q: "¿Qué es WARPIN?", a: "Una app de socialización local en tiempo real basada en geolocalización, pensada para universitarios menores de 30." },
    { q: "¿Quién puede unirse?", a: "Jóvenes menores de 30, verificados con Google o teléfono. El lanzamiento es exclusivo para UCSM y zonas cercanas." },
    { q: "¿Cómo protegen mi privacidad?", a: "Tu ubicación exacta es opcional. Puedes optar por la ubicación protegida (desfase aleatorio de 40 metros) y los chats requieren consentimiento mutuo." },
    { q: "¿Cómo consigo acceso?", a: "Puedes unirte a nuestra Comunidad de WhatsApp para obtener códigos de acceso en los drops diarios, o completar la encuesta estratégica de Fundador Élite para recibir acceso anticipado prioritario." },
    { q: "¿Cuándo estará disponible?", a: "Estamos en beta cerrada. Lanzaremos la app inicial (MVP) en julio o agosto." },
    { q: "¿Necesito estar en UCSM para usarlo?", a: "Debes frecuentar la UCSM o zonas aledañas ya que inicialmente la app solo funcionará para usuarios geolocalizados 3km a la redonda. Esto asegura una comunidad activa y relevante desde el primer día." },
    {
      q: "¿Cuándo estará disponible en mi campus?",
      a: (
        <span>
          El lanzamiento inicial es exclusivo para la UCSM en Arequipa. Si quieres que WARPIN llegue pronto a tu universidad, puedes postular tu campus completando nuestra encuesta de lista de espera{" "}
          <a
            href="https://tally.so/r/WOqWOk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline font-semibold"
          >
            aquí
          </a>.
        </span>
      ),
    },
  ];
  return (
    <Section id="faq" eyebrow="FAQ" title={<>Preguntas <span className="text-gradient">frecuentes</span></>}>
      <div className="mx-auto max-w-3xl space-y-3">
        {qs.map((it, i) => (
          <FaqItem key={i} q={it.q} a={it.a} />
        ))}
      </div>
    </Section>
  );
}

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="reveal overflow-hidden rounded-2xl glass">
      <button onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="font-medium">{q}</span>
        <ChevronDown size={18} className={`shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <WarpinLogo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Tu radar social en tiempo real. Local, efímero y seguro. Hecho para jóvenes que viven el momento.
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Producto</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#como-funciona" className="hover:text-foreground text-muted-foreground">Cómo funciona</a></li>
            <li><a href="#privacidad" className="hover:text-foreground text-muted-foreground">Privacidad</a></li>
            <li><a href="#faq" className="hover:text-foreground text-muted-foreground">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} WARPIN. Todos los derechos reservados.</div>
        <div className="flex gap-3">
          <SocialDot label="IG" />
          <SocialDot label="TT" />
          <SocialDot label="X" />
        </div>
      </div>
    </footer>
  );
}

function SocialDot({ label }: { label: string }) {
  return (
    <a href="#" aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full glass text-[10px] font-bold hover:bg-white/10">
      {label}
    </a>
  );
}

/* ---------------- Floating WhatsApp ---------------- */
function FloatingWhatsApp() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Entrar a la Comunidad de WhatsApp"
      className="btn-glass-whatsapp group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full py-3 pl-3 pr-4 text-white animate-glow-pulse hover:scale-105">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
        <WhatsAppIcon className="h-5 w-5" />
      </span>
      <span className="hidden text-sm font-bold sm:inline">Comunidad WhatsApp</span>
    </a>
  );
}

/* ---------------- Primitives ---------------- */
function Section({
  id, eyebrow, title, subtitle, children,
}: {
  id?: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-4 py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mx-auto mb-10 max-w-2xl text-center md:mb-14">
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              {eyebrow}
            </div>
          )}
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
          {subtitle && <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function Card({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div
      className={`reveal group rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-glow ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.05 4.91A10 10 0 0 0 4.05 18.7L3 22l3.43-1A10 10 0 1 0 19.05 4.91Zm-7.05 16a8 8 0 0 1-4.07-1.11l-.29-.17-2.04.6.61-2-.19-.3A8 8 0 1 1 12 20.91Zm4.55-5.85c-.25-.13-1.47-.73-1.7-.82s-.39-.13-.56.13-.64.82-.79.99-.29.19-.54.06a6.55 6.55 0 0 1-1.93-1.19 7.25 7.25 0 0 1-1.34-1.67c-.14-.24 0-.37.11-.49s.25-.29.37-.43a1.68 1.68 0 0 0 .25-.41.45.45 0 0 0 0-.43c-.06-.13-.56-1.35-.77-1.84s-.41-.42-.56-.43h-.48a.92.92 0 0 0-.67.31 2.81 2.81 0 0 0-.88 2.09 4.88 4.88 0 0 0 1 2.59 11.18 11.18 0 0 0 4.27 3.77 14.4 14.4 0 0 0 1.43.53 3.42 3.42 0 0 0 1.58.1 2.58 2.58 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .15-1.2c-.06-.11-.23-.18-.49-.31Z" />
    </svg>
  );
}
