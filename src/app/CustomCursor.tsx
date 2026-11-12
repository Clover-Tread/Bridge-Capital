"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const blendRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      if (blendRef.current) blendRef.current.style.display = "none";
      return;
    }

    const xTo = gsap.quickTo(blendRef.current, "x", {
      duration: 0.1,
      ease: "power3",
    });
    const yTo = gsap.quickTo(blendRef.current, "y", {
      duration: 0.1,
      ease: "power3",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const hoverSelector =
      'a, button, input, textarea, [role="button"], label, select';

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(hoverSelector);
      if (target) {
        blendRef.current?.classList.add("interactive-hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(hoverSelector);
      if (target) {
        blendRef.current?.classList.remove("interactive-hover");
      }
    };

    // El efecto de inversión (mix-blend-mode) obliga a recomponer toda la
    // página en cada cuadro de scroll; se oculta mientras se desplaza y
    // reaparece al detenerse.
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;
    // También se pausan los efectos hover mientras la página se desplaza:
    // las tarjetas pasan bajo el puntero y disparan zoom y sombras en cadena.
    const root = document.documentElement;
    const handleScroll = () => {
      blendRef.current?.classList.add("is-scrolling");
      root.classList.add("is-scrolling");
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        blendRef.current?.classList.remove("is-scrolling");
        root.classList.remove("is-scrolling");
      }, 150);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(scrollTimer);
      root.classList.remove("is-scrolling");
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div ref={blendRef} className="custom-cursor-blend" />;
};

export default CustomCursor;
