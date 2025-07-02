// src/components/filosofia/PhilosophyCTASection.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Clases compartidas para la alineación del ancho con el Navbar
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

const PhilosophyCTASection = () => {
  const ctaButtonBgColor = "bg-[var(--color-dark-red)]";
  const ctaButtonHoverBgColor = "hover:bg-(--color-dark-red-hover)";

  const officeHours = (
    <div className="space-y-1 text-sm">
      <p>
        <strong className="font-medium">Lunes a Viernes:</strong> 9:00 a 18:00
      </p>
      <p>
        <strong className="font-medium">Sábado y Domingo</strong> Cerrado
      </p>
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-[#efefef] w-full">
      <div
        className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES} text-center`}>
        <h2 className="text-4xl md:text-6xl font-black text-(--color-primary) mb-4 md:mb-6 leading-tight">
          {/* font-black para grosor 900 */}
          ¿Quiere profundizar en nuestra Filosofía de Inversión?
        </h2>
        <p className="text-lg md:text-xl text-(--color-primary) max-w-2xl mx-auto mb-8 md:mb-10">
          Permítenos explicarte personalmente nuestra estrategia. Contáctanos
          durante{" "}
          <Popover>
            <PopoverTrigger asChild>
              <span className="text-[var(--color-primary)] font-semibold underline cursor-pointer hover:text-opacity-80 transition-colors duration-200">
                horas de oficina
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4 bg-white shadow-md rounded-lg border">
              {/* Contenido del Popover */}
              <div className="text-left">
                <h4 className="font-bold text-md mb-2 text-(--color-primary)">
                  Horario de Atención
                </h4>
                {officeHours}
              </div>
            </PopoverContent>
          </Popover>
          ; será un placer atenderte y aclarar tus dudas.
        </p>
        <Button
          asChild
          className={`
            ${ctaButtonBgColor} 
            text-white 
            ${ctaButtonHoverBgColor} 
            font-semibold
            text-base md:text-lg 
            py-4 px-8 md:py-7 md:px-10 
            rounded-lg 
            transition-all duration-300 ease-in-out
            focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]/80
          `}>
          <Link href="/contacto">Contactar ahora</Link>
        </Button>
      </div>
    </section>
  );
};

export default PhilosophyCTASection;
