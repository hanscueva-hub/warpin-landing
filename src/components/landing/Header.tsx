import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Categorías",    href: "#categorias" },
  { label: "Privacidad",    href: "#privacidad" },
  { label: "Únete",         href: "#fundador" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-4 md:top-5">
      {/* Main pill */}
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full glass-strong px-3 py-2 md:px-4 md:py-2.5">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 pl-1 text-[15px] font-bold tracking-tight text-white">
          <img
            src="/warpin-logo.png"
            alt="WARPIN"
            className="h-8 w-8 rounded-lg object-cover shadow-[inset_0_1px_0_oklch(1_0_0/0.3),0_4px_12px_-2px_oklch(0.6_0.23_305/0.5)]"
          />
          WARPIN
          <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white/80 shadow-[inset_0_1px_0_oklch(1_0_0/0.2)]">
            Beta
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right side: Entrar button + hamburger */}
        <div className="flex items-center gap-2">
          <a
            href="#fundador"
            className="rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-[inset_0_1px_0_oklch(1_0_0/0.25)] transition-colors hover:bg-white/15"
          >
            Entrar
          </a>

          {/* Hamburger button — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <path d="M6 18L18 6" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 5h16" />
                  <path d="M4 12h16" />
                  <path d="M4 19h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-3xl overflow-hidden rounded-2xl glass-strong md:hidden"
          >
            <nav className="flex flex-col">
              {navLinks.map((l, index) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white${
                    index < navLinks.length - 1 ? " border-b border-white/[0.08]" : ""
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
