/**
 * El mapa oscuro con pines que sirve de fondo a la portada.
 * Los pines son los mismos casos reales que la gente pide en el campus.
 * Regla del informe de 268 respuestas: nunca mostrar el mapa casi vacío.
 */

type Category = "social" | "ayuda" | "transporte" | "random";

const CATEGORY_COLOR: Record<Category, string> = {
  social: "#FF3D8A",
  ayuda: "#2BD980",
  transporte: "#35D0F5",
  random: "#7B7BFF",
};

type Pin = {
  text: string;
  cat: Category;
  /** posición en % dentro del mapa */
  x: number;
  y: number;
};

/** Escritorio: el mapa vive a la derecha del texto, con espacio para 7 pines. */
const PINS_DESKTOP: Pin[] = [
  { text: "Junta tranqui en el parque de las piedritas", cat: "social", x: 63, y: 30 },
  { text: "Comparto taxi a Cayma, salgo 6:40", cat: "transporte", x: 79, y: 45 },
  { text: "Alguien que me enseñe Cálculo II?", cat: "ayuda", x: 68, y: 62 },
  { text: "A la señora le quedan 2 almuerzos", cat: "random", x: 89, y: 71 },
  { text: "Nos faltan 2 para el taco", cat: "random", x: 84, y: 88 },
  { text: "Cargador tipo C en la biblio", cat: "ayuda", x: 92, y: 27 },
  { text: "Voy a Busta, alguien quiere?", cat: "social", x: 58, y: 16 },
];

/** Celular: el texto ocupa la pantalla, así que los pines se van al borde
 *  superior derecho y el mapa queda como atmósfera, nunca tapando la lectura. */
const PINS_MOBILE: Pin[] = [
  { text: "Nos faltan 2 para el taco", cat: "random", x: 46, y: 15 },
  { text: "Comparto taxi a Cayma", cat: "transporte", x: 75, y: 11 },
  { text: "Cargador tipo C en la biblio", cat: "ayuda", x: 89, y: 25 },
];

export function LiveMap() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0E0E16]">
      <style>{`
        .wp-pin {
          position: absolute;
          transform: translate(-50%, -100%);
          width: max-content;
          animation: wp-pin-in .6s cubic-bezier(.22,1,.36,1) both;
        }
        .wp-pin-bubble {
          max-width: 130px;
          padding: 7px 9px 9px;
          border-radius: 11px;
          font-size: 10.5px;
          line-height: 1.28;
          font-weight: 500;
          color: #fff;
          background: color-mix(in srgb, var(--pin) 26%, #0D0D15);
          border: 1px solid color-mix(in srgb, var(--pin) 62%, transparent);
          box-shadow: 0 8px 22px -12px #000;
        }
        .wp-pin::after {
          content: "";
          position: absolute;
          left: 14px;
          bottom: -9px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--pin) 45%, #0D0D15);
          border: 1.5px solid color-mix(in srgb, var(--pin) 75%, transparent);
        }
        @keyframes wp-pin-in {
          from { opacity: 0; transform: translate(-50%, -84%) scale(.9); }
          to   { opacity: 1; transform: translate(-50%, -100%) scale(1); }
        }
        .wp-ping {
          position: absolute;
          width: 14px; height: 14px;
          margin: -7px 0 0 -7px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--cyan) 25%, transparent);
        }
        .wp-ping::after {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1.5px solid var(--cyan);
          animation: wp-ping 2.6s ease-out infinite;
        }
        @keyframes wp-ping {
          0%   { transform: scale(.6); opacity: .9; }
          100% { transform: scale(3.4); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wp-pin { animation: none; }
          .wp-ping::after { animation: none; opacity: 0; }
        }
      `}</style>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1280 820"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <rect width="1280" height="820" fill="#0E0E16" />
        <g transform="rotate(-14 640 410)">
          <path d="M780 -150 L780 1050" stroke="#16222A" strokeWidth="26" />
          <g stroke="#141420" strokeWidth="34">
            <path d="M-200 90 H1500" /><path d="M-200 300 H1500" /><path d="M-200 510 H1500" />
            <path d="M-200 720 H1500" /><path d="M-200 930 H1500" />
            <path d="M60 -150 V1050" /><path d="M330 -150 V1050" /><path d="M600 -150 V1050" />
            <path d="M1060 -150 V1050" /><path d="M1330 -150 V1050" />
          </g>
          <g stroke="#12121C" strokeWidth="14">
            <path d="M-200 195 H1500" /><path d="M-200 405 H1500" /><path d="M-200 615 H1500" /><path d="M-200 825 H1500" />
            <path d="M195 -150 V1050" /><path d="M465 -150 V1050" /><path d="M920 -150 V1050" /><path d="M1195 -150 V1050" />
          </g>
          <path d="M600 300 H1060 V510 H600 Z" fill="#111C18" />
          <path d="M60 615 H330 V825 H60 Z" fill="#141522" />
          <g fill="#3A3A4D" fontFamily="Inter, sans-serif" fontSize="12" letterSpacing="1.5">
            <text x="640" y="284">AV. EJÉRCITO</text>
            <text x="640" y="704">AV. CAYMA</text>
            <text x="616" y="60" transform="rotate(90 616 60)">CALLE MISTI</text>
            <text x="1076" y="60" transform="rotate(90 1076 60)">AV. PARRA</text>
          </g>
        </g>
      </svg>

      <div className="hidden lg:block">
        {PINS_DESKTOP.map((p, i) => (
          <PinBubble key={p.text} pin={p} index={i} />
        ))}
      </div>

      <div className="hidden sm:block lg:hidden">
        {PINS_MOBILE.map((p, i) => (
          <PinBubble key={p.text} pin={p} index={i} />
        ))}
      </div>

      <span className="wp-ping hidden lg:block" style={{ left: "73%", top: "54%" }} aria-hidden />
      <span className="wp-ping lg:hidden" style={{ left: "63%", top: "22%" }} aria-hidden />
    </div>
  );
}

function PinBubble({ pin, index }: { pin: Pin; index: number }) {
  return (
    <div
      className="wp-pin"
      style={
        {
          left: `${pin.x}%`,
          top: `${pin.y}%`,
          "--pin": CATEGORY_COLOR[pin.cat],
          animationDelay: `${0.25 + index * 0.12}s`,
        } as React.CSSProperties
      }
    >
      <div className="wp-pin-bubble">{pin.text}</div>
    </div>
  );
}
