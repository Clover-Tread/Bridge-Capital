"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Clases compartidas
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

const CONTENT_PADDING_TOP_CLASS = "pt-10 md:pt-15";

const AboutHeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textColumnRef = useRef<HTMLDivElement>(null);
  const imageColumnRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const textColEl = textColumnRef.current;
    const imgColEl = imageColumnRef.current;
    const titleEl = titleRef.current;
    const p1El = paragraph1Ref.current;
    const p2El = paragraph2Ref.current;

    if (sectionEl && textColEl && imgColEl && titleEl && p1El && p2El) {
      gsap.set([titleEl, p1El, p2El], { opacity: 0, y: 30 });
      gsap.set(imgColEl, { opacity: 0, scale: 1.1, rotateY: -30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 70%",
          end: "bottom 80%",
          toggleActions: "play none none none",
        },
      });

      // Animación de la columna de texto
      tl.to(titleEl, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          p1El,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.6"
        ) // Empieza un poco después del título
        .to(
          p2El,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // Animación de la columna de imagen (puede correr en paralelo o ligeramente después)
      gsap.to(imgColEl, {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    }

    // Limpieza al desmontar
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([titleEl, p1El, p2El, imgColEl]);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-white ${CONTENT_PADDING_TOP_CLASS} py-12 md:py-20`}>
      <div
        className={`
          mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}
          ${CONTENT_PADDING_TOP_CLASS} 
          pb-100 md:pb-16 lg:pb-20
        `}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Columna de Texto */}
          <div
            ref={textColumnRef}
            className="text-center md:text-left flex flex-col justify-center">
            <div>
              <h1
                ref={titleRef}
                className="text-3xl md:text-4xl lg:text-[2.8rem] font-[900] text-[var(--color-primary)] mb-6 leading-tight opacity-0">
                Socios estratégicos para tu patrimonio: seguro y en constante
                crecimiento.
              </h1>
              <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed">
                <p ref={paragraph1Ref} className="opacity-0">
                  Nuestro equipo combina pasión con tres cualidades esenciales:
                  Inteligencia, Iniciativa e Integridad.
                </p>
                <p ref={paragraph2Ref} className="opacity-0">
                  Esta sinergia nos permite ofrecer un servicio de asesoría
                  ágil, profundo y enfocado en la protección y el crecimiento de
                  tu capital.
                </p>
              </div>
            </div>
          </div>

          {/* Columna de Imagen */}
          <div ref={imageColumnRef} className="w-full opacity-0">
            <div
              className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg 
                           transform perspective-[1000px]">
              <Image
                src="/images/handshake.jpg"
                alt="Socios estratégicos en Bridge Capital - Apretón de manos"
                layout="fill"
                objectFit="cover"
                className="transform transition-transform duration-500 hover:scale-105"
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
