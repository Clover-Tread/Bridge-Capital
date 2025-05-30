import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Clases compartidas para la alineación del ancho con el Navbar
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

const CTASection = () => {
  const ctaButtonBaseColor = "bg-[#79242F]";
  const ctaButtonHoverColor = "hover:bg-[#601e26]";

  return (
    <section className="py-16 md:py-24 bg-(--color-light-grey) w-full">
      {" "}
      {/* Fondo claro para la sección */}
      <div
        className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES} text-center`}>
        <h2 className="text-3xl md:text-4xl font-[800] text-(--color-primary) mb-6 md:mb-10 leading-tight">
          ¿Tienes Dudas? <br className="block sm:hidden" /> Contáctanos para
          Asesorarte.
        </h2>
        <Button
          asChild
          className={`
            ${ctaButtonBaseColor} 
            ${ctaButtonHoverColor}
            text-white 
            font-semibold {/* Puedes quitar esto si no quieres negrita en el texto del botón */}
            text-base md:text-lg 
            py-4 px-8 md:py-7 md:px-10 {/* Padding generoso para un CTA */}
            rounded-lg 
            transition-colors duration-300 ease-in-out
            focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#79242F]/80 {/* Estilo de foco */}
          `}>
          <Link href="/contacto">Contáctanos</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
