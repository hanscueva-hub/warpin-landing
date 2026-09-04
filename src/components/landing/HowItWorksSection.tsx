type Paso = {
  num: string;
  titulo: string;
  desc: string;
  imagen: string;
  color: string;
};

const PASOS: Paso[] = [
  {
    num: "01",
    titulo: "Descubre",
    desc: "Abres y el mapa ya está lleno. Quién necesita algo, quién armó un plan, a cuántos metros está.",
    imagen: "/mascota/paso-1-descubre.webp",
    color: "#35D0F5",
  },
  {
    num: "02",
    titulo: "Publica",
    desc: "Escribes qué necesitas y cuánto dura. Treinta segundos. Al expirar desaparece solo.",
    imagen: "/mascota/paso-2-publica.webp",
    color: "#FF3D8A",
  },
  {
    num: "03",
    titulo: "Comenta",
    desc: "Los que están cerca responden ahí mismo, a la vista de todos. Nadie tiene que escribirte al privado.",
    imagen: "/mascota/paso-3-comenta.webp",
    color: "#7B7BFF",
  },
  {
    num: "04",
    titulo: "Conecta",
    desc: "Si van a coordinar, se pide chat. Se abre solo si los dos aceptan, así nadie te escribe de la nada.",
    imagen: "/mascota/paso-4-conecta.webp",
    color: "#2BD980",
  },
  {
    num: "05",
    titulo: "Controla",
    desc: "Ubicación exacta o protegida, que mueve tu pin 40 m al azar. Bloqueas y reportas cuando quieras.",
    imagen: "/mascota/paso-5-controla.webp",
    color: "#35D0F5",
  },
];

export function HowItWorksSection() {
  return (
    <section id="pasos" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-[46ch]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
            Cómo se usa
          </p>
          <h2 className="mt-4 text-balance font-display text-[2.1rem] font-bold leading-[1.04] tracking-[-0.035em] text-white sm:text-[2.9rem]">
            Cinco pasos. <span className="text-white/40">Cero fricción.</span>
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/55 sm:text-[17px]">
            De abrir el mapa a quedar con alguien que está a dos cuadras, en menos de un minuto.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PASOS.map((p) => (
            <li
              key={p.num}
              className="group relative flex flex-col rounded-3xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors duration-300 hover:bg-white/[0.045]"
            >
              <div className="relative mb-4 flex h-32 items-center justify-center">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(60% 60% at 50% 55%, color-mix(in srgb, ${p.color} 20%, transparent), transparent 72%)`,
                  }}
                />
                <img
                  src={p.imagen}
                  alt=""
                  width={512}
                  height={512}
                  loading="lazy"
                  decoding="async"
                  className="relative h-32 w-auto object-contain transition-transform duration-300 group-hover:-translate-y-1"
                />
              </div>

              <span
                className="font-display text-[12px] font-bold tracking-[0.14em]"
                style={{ color: p.color }}
              >
                {p.num}
              </span>
              <h3 className="mt-1.5 font-display text-[17px] font-bold tracking-tight text-white">
                {p.titulo}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{p.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
