"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

// Clases compartidas
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

const CONTENT_PADDING_TOP_CLASS = "pt-0 md:pt-[10rem]";
const CONTENT_PADDING_BOTTOM_CLASS = "pb-100 md:pb-16 lg:pb-20";
const SECTION_NEGATIVE_MARGIN_TOP_CLASS = "-mt-[7rem]";

const ServicesIntroSection = () => {
  const gradientStyle =
    "linear-gradient(to bottom, rgba(252,252,252,0) 0%, rgba(252,252,252,1) 100%)";

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageContainerRef = useRef<HTMLDivElement>(null);
  const gradientOverlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const titleText = "Conoce Nuestros Servicios";

  useEffect(() => {
    const bgImageEl = bgImageContainerRef.current;
    const gradientEl = gradientOverlayRef.current;
    const titleEl = titleRef.current; // El h1 completo
    const subtitleEl = subtitleRef.current;

    if (bgImageEl && gradientEl && titleEl && subtitleEl) {
      const titleWords = gsap.utils.toArray<HTMLSpanElement>(
        titleEl.querySelectorAll(".title-word")
      );

      // Estado inicial para GSAP
      gsap.set(bgImageEl, { opacity: 0, scale: 1.1 });
      gsap.set(gradientEl, { opacity: 0, scale: 0 });
      gsap.set(titleEl, { opacity: 0 }); // El H1 padre también inicia invisible para GSAP
      if (titleWords.length > 0) {
        gsap.set(titleWords, { opacity: 0, y: 30 }); // Palabras individuales
      } else {
        // Fallback si no se encuentran los spans de palabras, preparar el H1 para una animación simple
        gsap.set(titleEl, { y: 30 });
      }
      gsap.set(subtitleEl, { opacity: 0, y: 20 });

      const tl = gsap.timeline({});

      // 1. Animación de la imagen de fondo
      tl.to(bgImageEl, {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power2.out",
      });

      // 2. Animación del gradiente
      tl.to(
        gradientEl,
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "circ.out",
        },
        "-=1.0" // Solapar con la animación anterior
      );

      // 3. Hacer visible el H1 padre (necesario si los hijos se animan individualmente)
      tl.to(
        titleEl,
        {
          opacity: 1,
          duration: 0.01,
          delay: 0.2,
        },
        "-=0.5"
      );

      if (titleWords.length > 0) {
        tl.to(
          titleWords,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.4)",
          },
          "<0.1"
        );
      } else {
        gsap.set(titleEl, { y: 30 });
        tl.to(
          titleEl,
          {
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<"
        );
      }

      // 4. Animación del Subtítulo
      tl.to(
        subtitleEl,
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
      className={`relative w-full min-h-screen flex flex-col items-center text-center overflow-hidden ${SECTION_NEGATIVE_MARGIN_TOP_CLASS}`}>
      <div
        ref={bgImageContainerRef}
        className="absolute inset-0 -z-10 opacity-0">
        <Image
          src="/images/servicios-bg.jpg"
          alt="Fondo de la sección de Servicios de Bridge Capital"
          layout="fill"
          objectFit="cover"
          quality={80}
          priority
        />
      </div>

      <div
        ref={gradientOverlayRef}
        className="absolute inset-0 z-0 opacity-0"
        style={{ background: gradientStyle, transformOrigin: "center center" }}
      />

      <div
        className={`
          relative mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}
          z-10 flex flex-col justify-center items-center flex-grow 
          w-full 
          ${CONTENT_PADDING_TOP_CLASS}
          ${CONTENT_PADDING_BOTTOM_CLASS} 
        `}>
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-[900] text-[var(--color-primary)] mb-4 opacity-0">
          {titleText.split(" ").map((word, index, wordsArray) => (
            <span
              key={index}
              className="title-word inline-block"
              style={{
                marginRight: index < wordsArray.length - 1 ? "0.20em" : "0",
                opacity: 0,
              }}>
              {word}
            </span>
          ))}
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-[var(--color-primary)] max-w-3xl mx-auto opacity-0">
          Descubre cómo adaptamos cada servicio para responder precisamente a
          tus expectativas.
        </p>
      </div>
    </section>
  );
};

export default ServicesIntroSection;
