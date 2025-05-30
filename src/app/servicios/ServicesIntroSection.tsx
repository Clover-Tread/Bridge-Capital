"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

// Clases compartidas
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

const CONTENT_PADDING_TOP_CLASS = "md:pt-32";

const ServicesIntroSection = () => {
  const gradientStyle =
    "linear-gradient(to bottom, rgba(252,252,252,0) 0%, rgba(252,252,252,1) 100%)";

  // Refs para los elementos a animar
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageContainerRef = useRef<HTMLDivElement>(null);
  const gradientOverlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const bgImageEl = bgImageContainerRef.current;
    const gradientEl = gradientOverlayRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;

    if (sectionEl && bgImageEl && gradientEl && titleEl && subtitleEl) {
      // Inicia los elementos que se animarán con opacidad 0
      gsap.set([bgImageEl, gradientEl, titleEl, subtitleEl], { opacity: 0 });

      const tl = gsap.timeline({
        // Opcional: ScrollTrigger si quieres que la animación se dispare al scrollear a esta sección
        // scrollTrigger: {
        //   trigger: sectionEl,
        //   start: "top 80%",
        //   toggleActions: "play none none none",
        // }
      });

      // 1. Animación de la imagen de fondo
      tl.to(bgImageEl, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut",
      });

      // 2. Animación del gradiente (puede empezar un poco después o junto con la imagen)
      tl.to(
        gradientEl,
        {
          opacity: 1,
          duration: 1.2,
          ease: "sine.inOut",
        },
        "-=1.0"
      ); // Empieza 1.0s antes de que termine la animación de la imagen

      // 3. Animación del Título "Conoce Nuestros Servicios"
      if (
        titleEl.childNodes.length > 0 &&
        titleEl.childNodes[0].nodeType === Node.TEXT_NODE
      ) {
        const words = titleEl.innerText.split(" ");
        titleEl.innerHTML = "";
        words.forEach((word) => {
          const span = document.createElement("span");
          span.textContent =
            word + (words.indexOf(word) === words.length - 1 ? "" : "\u00A0");
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(30px)";
          titleEl.appendChild(span);
        });

        tl.to(
          titleEl.children,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.4)",
            delay: 0.3,
          },
          "-=0.5"
        );
      } else {
        tl.to(
          titleEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.3,
          },
          "-=0.5"
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
        "-=0.5"
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mt-[-7rem] relative w-full min-h-screen flex flex-col items-center text-center overflow-hidden">
      {/* Capa de Imagen de Fondo */}
      <div
        ref={bgImageContainerRef}
        className="absolute inset-0 -z-10 opacity-0">
        <Image
          src="/images/servicios-bg.jpg"
          alt="Fondo de la sección de Servicios de Bridge Capital"
          layout="fill"
          objectFit="cover"
          quality={100}
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
          pb-90 md:pb-25 lg:pb-40
        `}>
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-[900] text-[var(--color-primary)] mb-4 opacity-0">
          Conoce Nuestros Servicios
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
