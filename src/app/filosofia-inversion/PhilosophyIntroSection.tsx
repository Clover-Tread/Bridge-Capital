"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

// Clases compartidas
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

// Padding superior para el contenido.
const CONTENT_PADDING_TOP_CLASS = "pt-32";

const PhilosophyIntroSection = () => {
  const backgroundImageFilename = "filosofia-inversion-hero-bg.jpg";
  const imagePath = `/images/${backgroundImageFilename}`;
  const gradientStyle =
    "linear-gradient(to bottom, rgba(217,217,217,1) 0%, rgba(217,217,217,0.7) 100%)";

  // Refs para los elementos a animar
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageContainerRef = useRef<HTMLDivElement>(null);
  const gradientOverlayRef = useRef<HTMLDivElement>(null);
  const titleMainRef = useRef<HTMLSpanElement>(null);
  const titleSubRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bgImageEl = bgImageContainerRef.current;
    const gradientEl = gradientOverlayRef.current;
    const titleMainEl = titleMainRef.current;
    const titleSubEl = titleSubRef.current;

    if (bgImageEl && gradientEl && titleMainEl && titleSubEl) {
      // Estado inicial para las animaciones (invisibles)
      gsap.set([bgImageEl, gradientEl, titleMainEl, titleSubEl], {
        opacity: 0,
      });
      gsap.set(titleMainEl, { y: 30, filter: "blur(5px)" });
      gsap.set(titleSubEl, { y: 20 });

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
        duration: 1.2,
        ease: "power2.inOut",
      });

      // 2. Animación del gradiente (ligeramente después o solapado)
      tl.to(
        gradientEl,
        {
          opacity: 1,
          duration: 1.0,
          ease: "sine.inOut",
        },
        "-=0.8"
      );

      // 3. Animación del Título Principal
      tl.to(
        titleMainEl,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "expo.out",
          delay: 0.2,
        },
        "<"
      );

      // 4. Animación del Sub-Título (span)
      tl.to(
        titleSubEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center text-center overflow-hidden mt-[-7rem]">
      {/* Capa de Imagen de Fondo */}
      <div
        ref={bgImageContainerRef}
        className="absolute inset-0 -z-10 opacity-0">
        <Image
          src={imagePath}
          alt="Filosofía de Inversión Bridge Capital"
          layout="fill"
          objectFit="cover"
          quality={75}
          priority
        />
      </div>

      {/* Capa de Gradiente Overlay */}
      <div
        ref={gradientOverlayRef}
        className="absolute inset-0 z-0 opacity-0"
        style={{ background: gradientStyle }}
      />

      {/* Contenedor para el contenido de texto */}
      <div
        className={`
          relative mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}
          z-10 flex flex-col justify-center items-center flex-grow 
          w-full 
          ${CONTENT_PADDING_TOP_CLASS}
          pb-12 md:pb-16 lg:pb-20
        `}>
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-[var(--color-primary)] leading-tight">
          <span ref={titleMainRef} className="inline-block opacity-0">
            {" "}
            {/* Envolver el texto principal */}
            LO QUE HACEMOS
            <br className="hidden md:block" />
            ES FÁCIL DE ENTENDER.
          </span>
          <br className="hidden md:block" />
          <span
            ref={titleSubRef}
            className="block text-2xl sm:text-3xl md:text-4xl font-semibold mt-1 md:mt-2 opacity-0">
            pero es difícil de ejecutar
          </span>
        </h1>
      </div>
    </section>
  );
};

export default PhilosophyIntroSection;
