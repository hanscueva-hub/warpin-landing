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
      {/* Trama de calles: lee como mapa nocturno sin serlo */}
      <svg
        className="absolute inset-0 size-full opacity-90 blur-[1px]"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="400" height="500" fill="#0D1622" />

        {/* Manzanas */}
        <g fill="#17243A">
          <rect x="26" y="34" width="120" height="86" rx="5" />
          <rect x="166" y="34" width="96" height="86" rx="5" />
          <rect x="282" y="34" width="104" height="60" rx="5" />
          <rect x="26" y="146" width="120" height="70" rx="5" />
          <rect x="166" y="146" width="96" height="70" rx="5" />
          <rect x="282" y="122" width="104" height="94" rx="5" />
          <rect x="26" y="300" width="96" height="88" rx="5" />
          <rect x="142" y="300" width="130" height="60" rx="5" />
          <rect x="292" y="300" width="94" height="88" rx="5" />
          <rect x="26" y="412" width="150" height="66" rx="5" />
          <rect x="196" y="412" width="190" height="66" rx="5" />
        </g>

        {/* Avenidas */}
        <g stroke="#2F4666" strokeWidth="9" strokeLinecap="round" fill="none">
          <path d="M-10 133 H410" />
          <path d="M-10 287 H410" />
          <path d="M-10 400 H410" />
          <path d="M155 -10 V500" />
          <path d="M275 -10 V500" />
        </g>

        {/* Calles menores */}
        <g stroke="#243855" strokeWidth="3.5" fill="none">
          <path d="M-10 226 H410 M-10 466 H410" />
          <path d="M78 -10 V500 M345 -10 V500" />
          <path d="M-10 60 L155 133 M275 287 L410 232" />
        </g>

        {/* Parque y río, para que no parezca una cuadrícula */}
        <path
          d="M20 232 Q110 252 190 236 T392 258 L392 292 Q250 276 176 292 T20 280 Z"
          fill="#1E4438"
        />
        <path
          d="M-10 356 Q110 328 214 372 T410 348"
          stroke="#1C3E5E"
          strokeWidth="16"
          fill="none"
        />
      </svg>

      {/* Halos de color de la marca */}
      <div className="absolute -left-16 top-[8%] size-56 rounded-full bg-[#00E5FF] opacity-25 blur-[70px]" />
      <div className="absolute -right-14 top-[45%] size-64 rounded-full bg-[#EC4899] opacity-30 blur-[80px]" />
      <div className="absolute -bottom-10 left-[22%] size-56 rounded-full bg-[#8B5CF6] opacity-25 blur-[75px]" />

      {/* Viñeta suave: hunde los bordes sin tapar el mapa */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,8,14,0.6)_100%)]" />
    </div>
  );
}
