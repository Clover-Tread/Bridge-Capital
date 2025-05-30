"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

// Clases compartidas
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";
const CONTENT_PADDING_TOP_CLASS = "pt-32";
const SECTION_NEGATIVE_MARGIN_TOP_CLASS = "-mt-[7rem]";

const CalculatorIntroSection = () => {
  const backgroundImageFilename = "calculadora-hero-bg.jpg";
  const imagePath = `/images/${backgroundImageFilename}`;
  const radialGradientStyle =
    "radial-gradient(ellipse at center, rgba(217,217,217,0.2) 0%, rgba(217,217,217,1) 70%, rgba(217,217,217,1) 100%)";

  // Refs para los elementos a animar
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageDivRef = useRef<HTMLDivElement>(null);
  const gradientOverlayRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bgImageEl = bgImageDivRef.current;
    const gradientEl = gradientOverlayRef.current;
    const titleL1El = titleLine1Ref.current;
    const titleL2El = titleLine2Ref.current;

    if (bgImageEl && gradientEl && titleL1El && titleL2El) {
      // Establecer estado inicial para GSAP
      gsap.set(bgImageEl, { opacity: 0, scale: 1.1 });
      gsap.set(gradientEl, { opacity: 0, scale: 0 });
      gsap.set(titleL1El, { opacity: 0, x: -50 });
      gsap.set(titleL2El, { opacity: 0, x: 50 });

      const tl = gsap.timeline({
        // Opcional: ScrollTrigger si esta sección no es visible inmediatamente al cargar
        // scrollTrigger: {
        //   trigger: sectionRef.current,
        //   start: "top 75%",
        //   toggleActions: "play none none none",
        // }
      });

      // 1. Animación de la imagen de fondo
      tl.to(bgImageEl, {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power2.out",
      });

      // 2. Animación del gradiente radial (expandiéndose desde el centro)
      tl.to(
        gradientEl,
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "circ.out",
        },
        "-=1.0"
      );

      // 3. Animación de la primera línea del título
      tl.to(
        titleL1El,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.7"
      );

      // 4. Animación de la segunda línea del título
      tl.to(
        titleL2El,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-[80vh] flex flex-col text-left overflow-hidden ${SECTION_NEGATIVE_MARGIN_TOP_CLASS}`}>
      {/* Capa de Imagen de Fondo */}
      <div ref={bgImageDivRef} className="absolute inset-0 -z-20 opacity-0">
        {" "}
        {/* Inicia con opacidad 0 */}
        <Image
          src={imagePath}
          alt="Calculadora de Inversiones - Fondo Bridge Capital"
          layout="fill"
          objectFit="cover"
          quality={75}
          priority
        />
      </div>

      {/* Capa de Gradiente Radial */}
      <div
        ref={gradientOverlayRef}
        className="absolute inset-0 -z-10 opacity-0"
        style={{
          backgroundImage: radialGradientStyle,
          transformOrigin: "center center",
        }}
      />

      {/* Contenedor para el contenido de texto */}
      <div
        className={`
          relative mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}
          z-10 flex flex-col justify-center flex-grow 
          w-full 
          ${CONTENT_PADDING_TOP_CLASS} 
          pb-12 md:pb-16
          text-left 
        `}>
        <h1 className="text-[var(--color-primary)]">
          <span
            ref={titleLine1Ref}
            className="block text-4xl md:text-5xl lg:text-6xl font-black leading-tight md:leading-snug opacity-0">
            Simula Tu Inversión,
          </span>
          <span
            ref={titleLine2Ref}
            className="block text-5xl md:text-6xl lg:text-7xl font-black leading-tight md:leading-snug mt-1 md:mt-2 opacity-0">
            Planifica Tu Futuro.
          </span>
        </h1>
      </div>
    </section>
  );
};

export default CalculatorIntroSection;
