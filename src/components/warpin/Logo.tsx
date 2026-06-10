import logoImg from "@/assets/warpin-logo.png";

export function WarpinLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logoImg}
        alt="Warpin Logo"
        className="h-8 w-8 rounded-xl object-cover shadow-[0_0_12px_rgba(34,211,238,0.35)]"
      />
      <span className="font-display text-xl font-bold tracking-tight">
        WARP<span className="text-gradient">IN</span>
      </span>
    </div>
  );
}
