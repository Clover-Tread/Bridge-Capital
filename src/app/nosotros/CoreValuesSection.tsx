// src/components/nosotros/CoreValuesSection.tsx
import React from "react";
import Image from "next/image";
// 1. Importa los componentes necesarios de ShadCN Dialog
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // DialogFooter,   // Opcional, si quieres un pie de página en el modal
  // DialogClose,    // Opcional, para un botón de cierre explícito
} from "@/components/ui/dialog";
// Si vas a usar un botón de ShadCN para cerrar, también impórtalo:
// import { Button } from "@/components/ui/button";

// Clases compartidas (ajusta según tu diseño general)
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

interface ValueCardProps {
  title: string;
  shortDescription: string; // Lo que se muestra en la tarjeta
  modalTitle?: string; // Título para el modal, si es diferente al de la tarjeta
  modalContent: string; // Contenido detallado para el modal
  imageUrl: string;
  gradientColors: { from: string; to: string };
}

const ValueCard: React.FC<ValueCardProps> = ({
  title,
  shortDescription,
  modalTitle,
  modalContent,
  imageUrl,
  gradientColors,
}) => {
  const gradientStyle = `linear-gradient(to bottom, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* La tarjeta completa ahora es el disparador del modal */}
        <div className="relative w-full aspect-[3/4] sm:aspect-square md:aspect-[4/3] lg:aspect-[3/4] rounded-xl overflow-hidden shadow-2xl group cursor-pointer hover:shadow-slate-400/50 transition-shadow duration-300">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out group-hover:scale-110"
            quality={75}
          />
          <div
            className="absolute inset-0"
            style={{ background: gradientStyle }}></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 sm:p-6 text-white">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">
              {title}
            </h3>
            {/* Mostramos la descripción corta en la tarjeta */}
            <p className="text-xs sm:text-sm md:text-base leading-relaxed line-clamp-3 sm:line-clamp-4">
              {shortDescription}
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl bg-white text-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
            {modalTitle || title}
          </DialogTitle>
        </DialogHeader>
        {/* Contenido del Modal */}
        <div className="py-4 text-sm md:text-base leading-relaxed text-slate-700 max-h-[60vh] overflow-y-auto">
          {modalContent.split("\n").map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-4" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CoreValuesSection = () => {
  const valuesData: ValueCardProps[] = [
    {
      title: "Misión",
      shortDescription:
        "Un resumen conciso de nuestra misión que se muestra en la tarjeta.", // Placeholder para la tarjeta
      modalTitle: "Nuestra Misión Corporativa", // Título para el modal
      modalContent: `Aquí va el texto completo y detallado de la Misión de Bridge Capital. \nPuede ser un párrafo largo, o varios párrafos.\n\nEste contenido se mostrará cuando el usuario haga clic en la tarjeta de "Misión". Asegúrate de que sea informativo y fácil de leer.`, // Texto para el modal
      imageUrl: "/images/mision-bg.jpg",
      gradientColors: { from: "rgba(0,42,58,0.5)", to: "rgba(0,42,58,1)" },
    },
    {
      title: "Valores",
      shortDescription:
        "Los principios éticos que guían cada una de nuestras acciones y decisiones.", // Placeholder
      modalTitle: "Nuestros Valores Fundamentales",
      modalContent: `El texto detallado sobre los Valores de Bridge Capital. \nEste espacio es ideal para explicar cada valor en profundidad, mostrando cómo se aplican en el día a día de la empresa y en la relación con los clientes. \n\n - Integridad\n - Transparencia\n - Excelencia`, // Texto para el modal
      imageUrl: "/images/valores-bg.jpg",
      gradientColors: { from: "rgba(121,36,47,0.5)", to: "rgba(121,36,47,1)" },
    },
    {
      title: "Principios",
      shortDescription:
        "Las bases estratégicas y filosóficas sobre las que construimos el éxito financiero.", // Placeholder
      modalTitle: "Nuestros Principios de Inversión y Actuación",
      modalContent: `Descripción completa de los Principios de Bridge Capital. \nAquí se pueden detallar las metodologías, enfoques de riesgo, y la filosofía a largo plazo que define las estrategias de inversión y la forma de operar de la firma. \nEs importante ser claro y transmitir confianza.`, // Texto para el modal
      imageUrl: "/images/principios-bg.jpg",
      gradientColors: { from: "rgba(83,87,90,0.5)", to: "rgba(83,87,90,1)" },
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div
        className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {valuesData.map((valueItem) => (
            <ValueCard
              key={valueItem.title}
              {...valueItem} // Pasa todas las props al componente ValueCard
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
