import { useEffect, useRef } from 'react';

const items = [
  '🔥 Camila reservó su acceso',
  '🍻 Nuevo plan en el patio',
  '🚕 Diego compartió taxi · Cayma',
  '📚 Lucía encontró apuntes de Cálculo',
  '🎉 Previa en Yanahuara · 2.1 km',
  '✨ +250 fundadores ya asegurados',
  '🔑 Llaves encontradas en cafetería',
  '🚨 Ayuda rápida resuelta en 4 min',
  '💜 Mateo se unió a la beta',
  '📍 Nuevo plan a 0.3 km de ti',
];

export function TickerSection() {
  const allItems = [...items, ...items]; // duplicate for seamless loop
  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 35s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="relative -mt-2 overflow-hidden border-y border-white/5 bg-black/20 py-3 backdrop-blur">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#0f1421] to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#0f1421] to-transparent" />
        <div className="ticker-track flex w-max gap-8 whitespace-nowrap text-xs font-medium text-foreground/80">
          {allItems.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_#d946ef]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
