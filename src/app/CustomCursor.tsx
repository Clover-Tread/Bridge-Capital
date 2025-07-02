"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      if (cursorRef.current) cursorRef.current.style.display = "none";
      return;
    }

    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.7,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.7,
      ease: "power3",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Selector que incluye todos los elementos que activarán algún efecto.
    const hoverSelector =
      'a, button, input, textarea, [role="button"], p, h1, h2, h3, h4, h5, h6, li, blockquote, span';

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      let color = "white"; // Color por defecto si no se encuentra nada

      // 1. Prioridad: Usar el atributo data-cursor-color si existe (para casos especiales).
      if (target.dataset.cursorColor) {
        color = target.dataset.cursorColor;
      }
      // 2. Si no, leer automáticamente el color del texto del elemento.
      else {
        color = window.getComputedStyle(target).color;
      }

      // Animamos el cambio de color de fondo del cursor con GSAP.
      //   gsap.to(cursorRef.current, {
      //     backgroundColor: color,
      //     duration: 0.2,
      //     ease: "power3.inOut",
      //   });

      // 3. Revisamos si el elemento es INTERACTIVO (link, botón) para hacerlo más grande.
      if (target.closest('a, button, input, textarea, [role="button"]')) {
        cursorRef.current?.classList.add("interactive-hover");
      }
    };

    const handleMouseLeave = () => {
      // Revertimos el color de fondo a blanco.
      //   gsap.to(cursorRef.current, {
      //     backgroundColor: "white",
      //     duration: 0.2,
      //     ease: "power3.inOut",
      //   });
      // Quitamos la clase que lo hace grande.
      cursorRef.current?.classList.remove("interactive-hover");
    };

    window.addEventListener("mousemove", moveCursor);
    const targetElements = document.querySelectorAll(hoverSelector);

    targetElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter as EventListener);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      targetElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter as EventListener);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor"></div>;
};

export default CustomCursor;
