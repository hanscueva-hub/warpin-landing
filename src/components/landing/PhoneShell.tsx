import type { ReactNode } from "react";

/**
 * Carcasa de iPhone: marco de titanio, isla dinámica, barra de estado y
 * reflejo en el vidrio. Solo el envase — lo que va adentro lo pone quien la usa.
 */
export function PhoneShell({
  children,
  hora = "9:41",
  className = "",
  onClick,
  onMouseDown,
  onTouchStart,
}: {
  children: ReactNode;
  hora?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Botones laterales */}
      <span
        aria-hidden
        className="absolute -left-[3px] top-[16%] h-8 w-[3px] rounded-l-sm bg-gradient-to-r from-[#5B5A66] to-[#2A2934]"
      />
      <span
        aria-hidden
        className="absolute -left-[3px] top-[25%] h-14 w-[3px] rounded-l-sm bg-gradient-to-r from-[#5B5A66] to-[#2A2934]"
      />
      <span
        aria-hidden
        className="absolute -left-[3px] top-[38%] h-14 w-[3px] rounded-l-sm bg-gradient-to-r from-[#5B5A66] to-[#2A2934]"
      />
      <span
        aria-hidden
        className="absolute -right-[3px] top-[30%] h-20 w-[3px] rounded-r-sm bg-gradient-to-l from-[#5B5A66] to-[#2A2934]"
      />

      {/* Marco de titanio */}
      <div
        className="relative rounded-[2.6rem] p-[3px]"
        style={{
          background:
            "linear-gradient(150deg, #6E6D7A 0%, #34333F 22%, #8C8B99 48%, #2C2B36 72%, #6E6D7A 100%)",
          boxShadow:
            "0 50px 90px -45px rgba(0,0,0,.95), 0 0 0 1px rgba(255,255,255,.05), inset 0 0 0 1px rgba(255,255,255,.12)",
        }}
      >
        {/* Bisel negro */}
        <div className="relative overflow-hidden rounded-[2.45rem] bg-black p-[7px]">
          <div
            onClick={onClick}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2rem] bg-[#0B0A12]"
          >
            {/* Barra de estado */}
            <div className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 pt-3 text-[11px] font-semibold text-white">
              <span className="tabular-nums">{hora}</span>
              <span className="flex items-center gap-1.5">
                <SenalIcon />
                <WifiIcon />
                <BateriaIcon />
              </span>
            </div>

            {/* Isla dinámica */}
            <div className="absolute left-1/2 top-[9px] z-40 flex h-[26px] w-[86px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-2.5">
              <span className="h-[9px] w-[9px] rounded-full bg-[#14131C] ring-1 ring-white/[0.08]" />
            </div>

            {children}

            {/* Reflejo del vidrio */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-50"
              style={{
                background:
                  "linear-gradient(118deg, rgba(255,255,255,.11) 0%, rgba(255,255,255,.03) 16%, transparent 34%, transparent 68%, rgba(255,255,255,.045) 86%, transparent 100%)",
              }}
            />

            {/* Indicador de inicio */}
            <span
              aria-hidden
              className="absolute bottom-[7px] left-1/2 z-50 h-[4px] w-[110px] -translate-x-1/2 rounded-full bg-white/45"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SenalIcon() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
      <rect x="0" y="7.5" width="3" height="3.5" rx="1" />
      <rect x="4.6" y="5.2" width="3" height="5.8" rx="1" />
      <rect x="9.2" y="2.6" width="3" height="8.4" rx="1" />
      <rect x="13.8" y="0" width="3" height="11" rx="1" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 12" fill="currentColor" aria-hidden>
      <path d="M8 11.2 5.9 8.8a3.2 3.2 0 0 1 4.2 0L8 11.2Z" />
      <path
        d="M3.6 6.3a6.6 6.6 0 0 1 8.8 0l-1.4 1.6a4.5 4.5 0 0 0-6 0L3.6 6.3Z"
        opacity=".95"
      />
      <path d="M1.2 3.6a10 10 0 0 1 13.6 0l-1.4 1.6a7.9 7.9 0 0 0-10.8 0L1.2 3.6Z" opacity=".9" />
    </svg>
  );
}

function BateriaIcon() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden>
      <rect x="0.5" y="0.5" width="22" height="11" rx="3.2" fill="none" stroke="currentColor" strokeOpacity=".38" />
      <rect x="2" y="2" width="16.5" height="8" rx="2" fill="currentColor" />
      <path d="M24 4.2v3.6a2 2 0 0 0 0-3.6Z" fill="currentColor" fillOpacity=".45" />
    </svg>
  );
}
