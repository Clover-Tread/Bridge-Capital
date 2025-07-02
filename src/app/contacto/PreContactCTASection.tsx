import React from "react";
// Importamos solo el componente del botón desde el archivo del modal
import { ContactModalTrigger } from "./ContactModal";

const PreContactCTASection = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-100 w-full">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-[800] text-[var(--color-primary-blue)] mb-4 leading-tight">
          Iniciemos una Conversación Estratégica
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          ¿Listo para dar el siguiente paso hacia tus objetivos de inversión?
          Nuestro equipo de expertos está preparado para asesorarte.
        </p>

        {/* Este es el botón que importamos. Al hacer clic, abrirá el modal. */}
        <ContactModalTrigger />
      </div>
    </section>
  );
};

export default PreContactCTASection;
