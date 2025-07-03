// src/components/nosotros/StatsSection.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Clases compartidas
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

const statsData = [
  { value: "+12", label: "Años de Experiencia", numericValue: 10 },
  { value: "+60", label: "Clientes Satisfechos", numericValue: 20 },
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const statRefsSnapshot = [...statRefs.current];
    if (
      sectionEl &&
      statRefs.current.length === statsData.length &&
      valueRefs.current.length === statsData.length
    ) {
      statRefs.current.forEach((statEl) => {
        if (statEl) {
          gsap.fromTo(
            statEl,
            { opacity: 0, y: 50, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: statEl,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
      valueRefs.current.forEach((valueEl, index) => {
        if (valueEl) {
          const stat = statsData[index];
          const counter = { val: 0 };
          gsap.to(counter, {
            val: stat.numericValue,
            duration: 2,
            ease: "circ.out",
            scrollTrigger: {
              trigger: valueEl,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              if (valueEl) {
                valueEl.textContent =
                  Math.ceil(counter.val).toString() +
                  (stat.value.includes("+") ? "+" : "");
              }
            },
          });
        }
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && sectionEl?.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
      statRefsSnapshot.forEach((el) => el && gsap.killTweensOf(el));
      // Para los contadores, el tween es sobre el objeto 'counter', no directamente sobre valueEl
      // valueRefs.current.forEach(el => el && gsap.killTweensOf(el)); // Esto podría no ser necesario o correcto para el contador
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-slate-100 w-full">
      <div
        className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-center">
          {statsData.map((stat, index) => (
            <div
              key={index}
              // CORRECCIÓN AQUÍ: Añadir llaves para el cuerpo de la función
              ref={(el) => {
                statRefs.current[index] = el;
              }}
              className="p-6 md:p-8 bg-white rounded-xl shadow-xl opacity-0">
              <div
                // CORRECCIÓN AQUÍ: Añadir llaves para el cuerpo de la función
                ref={(el) => {
                  valueRefs.current[index] = el;
                }}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--color-primary)] mb-3 md:mb-4">
                0{stat.value.includes("+") ? "+" : ""}
              </div>
              <div className="text-base md:text-lg text-slate-700">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
