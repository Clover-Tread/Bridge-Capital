"use client";

import Link from "next/link";
import Image from "next/legacy/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { gsap } from "gsap";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();
  const mobileMenuContainerRef = useRef<HTMLDivElement>(null); // Ref para el contenedor principal del menú
  const mobileMenuContentRef = useRef<HTMLDivElement>(null); // Ref para el div con los enlaces

  const navLinks = [
    { href: "/nosotros", label: "Nosotros" },
    { href: "/servicios", label: "Servicios" },
    { href: "/filosofia-inversion", label: "Filosofía de Inversión" },
    { href: "/calculadora", label: "Calculadora" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setHasScrolled(offset > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect para animar el menú móvil
  useEffect(() => {
    const menuContainer = mobileMenuContainerRef.current;
    const menuContent = mobileMenuContentRef.current;

    if (!menuContainer || !menuContent) return;

    gsap.killTweensOf([menuContainer, menuContent]); // Detiene animaciones previas en estos elementos

    if (isMobileMenuOpen) {
      gsap.set(menuContainer, { display: "block", pointerEvents: "auto" });
      gsap.to(menuContainer, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.fromTo(
        menuContent,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, delay: 0.05, ease: "power2.out" }
      );
    } else {
      // Animar la salida del contenido primero
      gsap.to(menuContent, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          // Luego animar la salida del contenedor principal
          gsap.to(menuContainer, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(menuContainer, {
                display: "none",
                pointerEvents: "none",
              });
            },
          });
        },
      });
    }
  }, [isMobileMenuOpen]);

  // Clases para el navbar y enlaces
  const navbarScrolledBgClasses =
    "bg-[var(--color-primary)]/80 shadow-xl backdrop-blur-sm";
  const navbarInitialBgClasses = "bg-transparent";
  const linkBaseTextColor = "text-[var(--color-primary)]";
  const linkScrolledTextColor = "text-white";
  const linkHoverScrolledTextColor = "hover:text-[var(--color-white)]";
  const linkHoverInitialTextColor = "hover:text-[var(--color-primary)]";
  const afterBgScrolledColor = "after:bg-[var(--color-white)]";
  const afterBgInitialColor = "after:bg-[var(--color-primary)]";
  const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
  const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4";

  return (
    <header className="sticky top-0 z-50 w-full pt-4 md:pt-6 px-4">
      <nav
        className={`
          mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES} 
          flex items-center justify-between py-3 md:py-4 rounded-xl 
          transition-all duration-300 ease-in-out
          ${hasScrolled ? navbarScrolledBgClasses : navbarInitialBgClasses}
        `}>
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-bridge-capital.svg"
              alt="Bridge Capital Logo"
              className={hasScrolled ? "brightness-0 invert" : ""}
              width={23}
              height={60}
              priority
            />
          </Link>
        </div>

        {/* Enlaces de Navegación para Escritorio */}
        <div className="hidden md:flex flex-grow justify-center items-center space-x-3 lg:space-x-5">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" &&
                pathname.startsWith(link.href) &&
                link.href.length > 1);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`
                  relative font-[600] text-sm md:text-base
                  ${isActive ? (hasScrolled ? linkScrolledTextColor : "text-[var(--color-primary)]") : hasScrolled ? linkScrolledTextColor : linkBaseTextColor}
                  ${isActive ? "" : hasScrolled ? linkHoverScrolledTextColor : linkHoverInitialTextColor}
                  ${isActive ? "font-[600]" : "hover:font-[600]"}
                  px-2 py-1 transition-all duration-300 ease-in-out
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] 
                  ${isActive ? (hasScrolled ? afterBgScrolledColor : afterBgInitialColor) : hasScrolled ? afterBgScrolledColor : afterBgInitialColor}
                  after:origin-left after:transition-transform after:duration-300 after:ease-out
                  ${isActive ? "after:scale-x-100" : "after:scale-x-0"}
                  hover:after:scale-x-100
                `}>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Botón de Contacto (Desktop) */}
        <div className="hidden md:flex flex-shrink-0">
          <Link
            href="/contacto"
            className={`
              ${pathname === "/contacto" ? (hasScrolled ? "bg-[var(--color-white)] text-[var(--color-primary)] ring-2 ring-inset ring-[var(--color-primary)]" : "bg-[var(--color-dark-red)] text-white ring-2 ring-inset ring-[var(--color-dark-red-hover)]") : hasScrolled ? `bg-[var(--color-white)] hover:bg-opacity-80 text-[var(--color-primary)]` : `bg-[var(--color-primary)] hover:bg-opacity-80 text-white`} 
              px-5 py-2 rounded-lg text-xs md:text-sm font-[600] transition-all duration-300 ease-in-out
            `}>
            Contacto
          </Link>
        </div>

        {/* Botón de Menú Hamburguesa para Móvil */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${hasScrolled ? linkScrolledTextColor : linkBaseTextColor} focus:outline-none transition-colors duration-300 ease-in-out p-1`}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú Desplegable para Móvil - Contenedor Persistente */}
      <div
        ref={mobileMenuContainerRef} // Ref al contenedor principal del menú
        style={{ display: "none", opacity: 0 }} // GSAP lo controlará, inicia oculto y transparente
        className={`
          md:hidden absolute top-full left-0 right-0 mx-auto w-[calc(100%-2rem)] max-w-screen-xl 
          rounded-lg shadow-xl 
          ${hasScrolled ? "bg-[#1d1d1b]/90 backdrop-blur-md" : "bg-white"}
          pointer-events-none /* Inicia sin pointer-events, GSAP los activará */
        `}>
        <div
          ref={mobileMenuContentRef}
          className="flex flex-col space-y-1 px-3 py-3 opacity-0">
          {" "}
          {/* Ref al contenido, inicia transparente */}
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" &&
                pathname.startsWith(link.href) &&
                link.href.length > 1);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`block px-3 py-2.5 rounded-md text-base font-[600] 
                            ${hasScrolled ? (isActive ? "text-white font-semibold underline underline-offset-8" : `text-white hover:bg-[var(--color-dark-red)]/80`) : isActive ? "text-[var(--color-primary)] font-semibold" : `text-gray-700 hover:bg-gray-100`}`}
                onClick={() => setIsMobileMenuOpen(false)}>
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contacto"
            className={`block text-center mt-2 px-3 py-2.5 rounded-md text-base font-medium 
                        ${pathname === "/contacto" ? (hasScrolled ? "bg-slate-600 text-white" : "bg-[var(--color-dark-red)] text-white") : hasScrolled ? `bg-[var(--color-dark-red)]/90 hover:bg-[var(--color-dark-red-hover)]/90 text-white` : `bg-[var(--color-primary)] hover:bg-opacity-80 text-white`}`}
            onClick={() => setIsMobileMenuOpen(false)}>
            Contacto
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
