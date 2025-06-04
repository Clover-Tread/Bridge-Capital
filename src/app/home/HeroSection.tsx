"use client";
import Link from "next/link";
import Image from "next/legacy/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HeroSection = () => {
  const heroBackgroundImageName = "hero-image.jpg";
  const heroBackgroundImagePath = `/images/${heroBackgroundImageName}`;

  // Refs para los elementos a animar
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  // Padding superior para el contenido DENTRO del Hero
  const CONTENT_PADDING_TOP_CLASS = "pt-[10rem] md:pt-0";

  // Padding inferior (ajusta estos valores según necesites)
  const contentPaddingBottomClass = "pb-90 md:pb-25 lg:pb-35";

  useEffect(() => {
    // Referencias a los elementos del DOM
    const bgElement = backgroundRef.current;
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;
    const buttonElement = buttonContainerRef.current;

    // Asegurarse de que las refs estén disponibles
    if (bgElement && titleElement && subtitleElement && buttonElement) {
      // Animación para el fondo (sutil)
      // Inicia con opacidad 0 para que GSAP controle el fade-in
      gsap.set(bgElement, { opacity: 0 });
      gsap.to(bgElement, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      });

      // Timeline para animaciones secuenciales del texto y botón
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.5,
      });

      // Establecer estado inicial para animación 'from'
      gsap.set([titleElement, subtitleElement, buttonElement], {
        opacity: 0,
        y: 30,
      });

      tl.to(titleElement, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      })
        .to(
          subtitleElement,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.6"
        )
        .to(
          buttonElement,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        );
    }
  }, []);

  return (
    <section className="-mt-[7rem] relative w-full min-h-[80vh] md:min-h-[100vh] flex flex-col items-center text-center overflow-hidden">
      {/* Capa de Imagen de Fondo con next/image */}
      <div ref={backgroundRef} className="absolute inset-0 -z-20 opacity-0">
        {" "}
        {/* Inicia con opacidad 0 */}
        <Image
          src={heroBackgroundImagePath}
          alt="Fondo Hero Section Bridge Capital"
          layout="fill"
          objectFit="cover"
          quality={80}
          priority
        />
      </div>

      {/* Contenedor del contenido del Hero */}
      <div
        className={`
          container mx-auto px-4 
          flex flex-col justify-center items-center text-center 
          flex-grow 
          w-full max-w-screen-xl 
          ${CONTENT_PADDING_TOP_CLASS} 
          ${contentPaddingBottomClass}
          relative z-10 
        `}>
        <div className="w-full">
          <h1
            ref={titleRef}
            className="tracking-wide text-4xl sm:text-5xl md:text-7xl font-[900] text-[var(--color-primary)] mb-4 leading-tight opacity-0">
            BRIDGE CAPITAL
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl sm:text-xl md:text-xl text-[var(--color-primary)] mb-8 max-w-2xl mx-auto opacity-0">
            Tu socio independiente para alcanzar metas financieras
          </p>
          <div ref={buttonContainerRef} className="opacity-0">
            {" "}
            {/* Envuelve el Link y aplica ref y opacidad inicial */}
            <Link
              href="/calculadora"
              className="bg-[var(--color-dark-red)] inline-block my-4 text-white px-8 py-5 rounded-lg text-base sm:text-lg font-semibold hover:bg-[var(--color-dark-red-hover)] transition duration-300 ease-in-out transform hover:scale-105">
              Calculadora de rendimientos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
