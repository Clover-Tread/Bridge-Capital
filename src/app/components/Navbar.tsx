// src/components/Navbar.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const navLinks = [
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/filosofia-inversion', label: 'Filosofía de Inversión' },
    { href: '/calculadora', label: 'Calculadora' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setHasScrolled(offset > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const navbarScrolledBgClasses = "bg-(--color-primary) shadow-xl";
  const navbarInitialBgClasses = "bg-transparent";

  // Clases para los enlaces de texto según el estado de scroll
  const linkBaseTextColor = "text-(--color-primary)"; 
  const linkScrolledTextColor = "text-white";
  const linkHoverScrolledTextColor = "hover:text-(--color-white)";
  const linkHoverInitialTextColor = "hover:text-(--color-primary)";

  const afterBgScrolledColor = "after:bg-(--color-white)";
  const afterBgInitialColor = "after:bg-(--color-primary)";

  return (
    <header className="sticky top-0 z-50 w-full pt-4 md:pt-6 px-4">
      <nav 
        className={`container mx-auto max-w-screen-xl flex items-center justify-between p-3 md:p-4 rounded-xl transition-all duration-300 ease-in-out ${hasScrolled ? navbarScrolledBgClasses : navbarInitialBgClasses}`}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-bridge-capital.svg"
              alt="Bridge Capital Logo"
              className={hasScrolled ? 'brightness-0 invert' : ''}
              width={23}
              height={60}
              priority
            />
          </Link>
        </div>

        <div className="hidden md:flex flex-grow justify-center items-center space-x-3 lg:space-x-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`
                relative 
                font-normal 
                text-sm md:text-base
                ${hasScrolled ? linkScrolledTextColor : linkBaseTextColor}
                ${hasScrolled ? linkHoverScrolledTextColor : linkHoverInitialTextColor}
                px-2 py-1
                transition-all duration-300 ease-in-out
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] 
                ${hasScrolled ? afterBgScrolledColor : afterBgInitialColor}
                after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out
                hover:after:scale-x-100
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Botón de Contacto (Desktop) */}
        <div className="hidden md:flex flex-shrink-0">
          <Link
            href="/contacto"
            className={`
              ${hasScrolled ? 'bg-(--color-white) hover:bg-(--color-white) text-(--color-primary)' : 'bg-(--color-primary) hover:bg-(--color-primary) text-white'} px-5 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors duration-300 ease-in-out`} // Padding y tamaño de texto ajustados
          >
            Contacto
          </Link>
        </div>

        {/* Botón de Menú Hamburguesa para Móvil */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${hasScrolled ? linkScrolledTextColor : linkBaseTextColor} focus:outline-none transition-colors duration-300 ease-in-out p-1`}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </nav> {/* Fin del <nav> interno */}

      {/* Menú Desplegable para Móvil (se posiciona relativo al <header> sticky) */}
      {isMobileMenuOpen && (
        // Este menú sí debería ocupar el ancho, o al menos un ancho considerable bajo el navbar flotante
        <div className={`md:hidden mt-2 mx-4 rounded-lg shadow-xl ${hasScrolled ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="flex flex-col space-y-1 px-2 py-3">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className={`block px-3 py-2 rounded-md text-base font-medium 
                            ${hasScrolled ? 'text-white hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'} 
                            hover:text-blue-300`}
                onClick={() => setIsMobileMenuOpen(false)} 
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contacto" 
              className={`block text-center mt-2 px-3 py-2 rounded-md text-base font-medium 
                          ${hasScrolled ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
              onClick={() => setIsMobileMenuOpen(false)} 
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </header> // Fin del <header> exterior
  );
};

export default Navbar;