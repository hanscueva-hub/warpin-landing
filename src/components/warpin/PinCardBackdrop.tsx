/**
 * Fondo decorativo de la página pública del pin.
 *
 * IMPORTANTE: este mapa es inventado, no la ubicación del pin. La página
 * pública no revela dónde está — solo qué pasa y cuánto le queda. Si alguna
 * vez se sustituye por un mapa real, se rompe esa decisión de producto.
 */
export function PinCardBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Trama de calles, borrosa: lee como mapa sin serlo */}
      <svg
        className="absolute inset-0 size-full opacity-[0.28] blur-[3px]"
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="400" height="800" fill="#0E1420" />
        <g stroke="#8FA3C8" strokeOpacity="0.5" strokeWidth="1.4" fill="none">
          <path d="M-20 120 H420 M-20 300 H420 M-20 470 H420 M-20 640 H420" />
          <path d="M70 -20 V820 M180 -20 V820 M290 -20 V820" />
          <path d="M-20 210 L200 380 L420 300" />
          <path d="M-20 560 L140 660 L420 610" />
          <path d="M240 -20 L320 180 L280 420 L360 640" />
        </g>
        <g fill="#6E82A8" fillOpacity="0.22">
          <rect x="86" y="136" width="78" height="60" rx="4" />
          <rect x="196" y="136" width="78" height="60" rx="4" />
          <rect x="86" y="318" width="78" height="52" rx="4" />
          <rect x="196" y="486" width="78" height="66" rx="4" />
          <rect x="306" y="318" width="60" height="60" rx="4" />
        </g>
        {/* Un parque y un río, para que no parezca una cuadrícula */}
        <path d="M20 470 Q120 500 200 470 T400 500 L400 560 Q260 540 180 560 T20 540 Z" fill="#3E6B57" fillOpacity="0.3" />
        <path d="M-20 700 Q120 660 220 720 T420 690" stroke="#3B6E9B" strokeOpacity="0.45" strokeWidth="14" fill="none" />
      </svg>

      {/* Halos de color de la marca */}
      <div className="absolute -left-24 top-[12%] size-72 rounded-full bg-[#00E5FF] opacity-[0.16] blur-[90px]" />
      <div className="absolute -right-20 top-[38%] size-80 rounded-full bg-[#EC4899] opacity-[0.20] blur-[100px]" />
      <div className="absolute bottom-[6%] left-[18%] size-72 rounded-full bg-[#8B5CF6] opacity-[0.16] blur-[95px]" />

      {/* Viñeta: hunde los bordes para que la tarjeta destaque */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(6,8,14,0.82)_100%)]" />
    </div>
  );
}
