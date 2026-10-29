"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/filosofia-inversion", label: "Filosofía de inversión" },
  { href: "/calculadora", label: "Calculadora" },
];

/**
 * Barra de navegación editorial.
 * Sin GSAP: el menú móvil y el cambio al hacer scroll son transiciones de CSS,
 * así esta pieza (presente en todas las páginas) ya no arrastra la librería.
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al cambiar de página y bloquea el scroll mientras está abierto.
  useEffect(() => setIsMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const solid = hasScrolled || isMenuOpen;

  return (
    <header
      className={`sticky top-0 z-50 w-full h-20 transition-[background-color,border-color] duration-300 border-b ${
        solid
          ? "bg-[var(--color-paper)]/95 backdrop-blur-md border-[var(--color-rule)]"
          : "bg-transparent border-transparent"
      }`}>
      <nav className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-sm" aria-label="Bridge Capital, inicio">
          <Image
            src="/images/logo-bridge-capital.svg"
            alt=""
            width={16}
            height={32}
            priority
          />
          <span className="text-[0.9375rem] font-semibold tracking-[0.02em] text-[var(--color-ink)]">
            Bridge Capital
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-[0.9375rem] font-medium transition-colors duration-200 underline-offset-[0.6em] decoration-1 ${
                  isActive(link.href)
                    ? "text-[var(--color-ink)] underline decoration-[var(--color-ink)]"
                    : "text-[var(--color-stone)] hover:text-[var(--color-ink)]"
                }`}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contacto"
          aria-current={isActive("/contacto") ? "page" : undefined}
          className="hidden md:inline-flex h-10 items-center rounded-[2px] border border-[var(--color-ink)] px-5 text-sm font-medium text-[var(--color-ink)] transition-colors duration-200 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]">
          Contacto
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="-mr-2 p-2 text-[var(--color-ink)] md:hidden"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="menu-movil">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {isMenuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menú móvil: panel a pantalla completa, transición solo con CSS */}
      <div
        id="menu-movil"
        className={`fixed inset-x-0 top-20 bottom-0 bg-[var(--color-paper)] px-5 pt-8 pb-10 transition-[opacity,visibility] duration-300 md:hidden flex flex-col ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}>
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-[var(--color-rule)]">
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
                className="block py-5 font-[family-name:var(--font-display)] text-[1.75rem] leading-none text-[var(--color-ink)]">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contacto" onClick={() => setIsMenuOpen(false)} className="btn btn-primary mt-auto w-full">
          Agendar una conversación
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
