import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lock, Droplet, Crown, ArrowRight } from 'lucide-react';

export function DropsSection() {
  return (
    <section id="drops" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          {/* Pill label */}
          <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm">
            Drops de Acceso
          </span>

          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl mb-8">
            El acceso se libera <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">por lotes</span>
          </h2>
        </div>

        {/* Droplet Badge */}
        <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full glass-strong px-4 py-2 text-xs">
          <Droplet size={14} className="text-cyan-400 animate-pulse" />
          <span className="font-semibold text-foreground">Oleada de drops: Muy pronto</span>
        </div>

        {/* Drops Grid */}
        <div className="grid gap-4 sm:grid-cols-3">
          <DropCard day="Primera oleada" slots={500} taken={100} maxTaken={450} hot live />
          <DropCard day="Segunda oleada" slots={500} taken={0} />
          <DropCard day="Próximos drops" slots={0} taken={0} mystery />
        </div>

        {/* Next Drops strip */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
            Próximos drops
          </p>
          <p className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent sm:text-5xl">
            ???
          </p>
          <p className="mt-2 text-base font-semibold text-white">
            Drops sorpresa o por invitación.
          </p>
          <p className="mt-1 text-sm text-white/60">Los fundadores tendrán el poder.</p>
        </div>

        {/* CTA bottom */}
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <motion.a
            href="https://chat.whatsapp.com/IK4zPo8yN4gIc9Y5RY1ecq"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-base font-bold text-white shadow-glow"
            style={{ background: '#25D366' }}
          >
            {/* WhatsApp SVG icon */}
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M19.05 4.91A10 10 0 0 0 4.05 18.7L3 22l3.43-1A10 10 0 1 0 19.05 4.91Zm-7.05 16a8 8 0 0 1-4.07-1.11l-.29-.17-2.04.6.61-2-.19-.3A8 8 0 1 1 12 20.91Zm4.55-5.85c-.25-.13-1.47-.73-1.7-.82s-.39-.13-.56.13-.64.82-.79.99-.29.19-.54.06a6.55 6.55 0 0 1-1.93-1.19 7.25 7.25 0 0 1-1.34-1.67c-.14-.24 0-.37.11-.49s.25-.29.37-.43a1.68 1.68 0 0 0 .25-.41.45.45 0 0 0 0-.43c-.06-.13-.56-1.35-.77-1.84s-.41-.42-.56-.43h-.48a.92.92 0 0 0-.67.31 2.81 2.81 0 0 0-.88 2.09 4.88 4.88 0 0 0 1 2.59 11.18 11.18 0 0 0 4.27 3.77 14.4 14.4 0 0 0 1.43.53 3.42 3.42 0 0 0 1.58.1 2.58 2.58 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .15-1.2c-.06-.11-.23-.18-.49-.31Z" />
            </svg>
            Quiero estar en el primer drop.
          </motion.a>

          <p className="text-xs text-white/40">
            Los códigos se anuncian primero en la Comunidad de WhatsApp
          </p>
        </div>

      </div>
    </section>
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
    <div className={`relative overflow-hidden rounded-3xl glass-strong p-6 ${hot ? "gradient-border" : ""}`}>
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
