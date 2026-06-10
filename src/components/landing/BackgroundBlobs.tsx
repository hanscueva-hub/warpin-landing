export function BackgroundBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-neon-magenta/30 blur-[120px] animate-blob" />
      <div className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-neon-cyan/25 blur-[140px] animate-blob" style={{ animationDelay: "4s" }} />
      <div className="absolute -bottom-40 left-1/4 h-[26rem] w-[26rem] rounded-full bg-neon-purple/25 blur-[120px] animate-blob" style={{ animationDelay: "8s" }} />
    </div>
  );
}
