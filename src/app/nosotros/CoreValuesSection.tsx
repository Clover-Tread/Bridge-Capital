"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { gsap } from "gsap";

// Clases compartidas
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

interface ValueCardProps {
  title: string;
  shortDescription?: string;
  modalTitle?: string;
  modalContent?: string;
  hoverRevealText?: string;
  imageUrl?: string;
  gradientColors: { from: string; to: string };
  cardType?: "large" | "small" | "full-width-small";
  interactionType: "modal" | "hoverReveal";
  className?: string;
  textColor?: string;
}

const ValueCard: React.FC<ValueCardProps> = ({
  title,
  shortDescription,
  modalTitle,
  modalContent,
  hoverRevealText,
  imageUrl,
  gradientColors,
  cardType = "large",
  interactionType,
  className = "",
  textColor = "text-white",
}) => {
  const gradientStyle = `linear-gradient(to bottom, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`;

  let cardHeightClass = "";
  let titleSizeClass = "";
  let descriptionSizeClass = "";

  if (cardType === "large") {
    cardHeightClass = "h-[280px] sm:h-[320px] md:h-[350px] lg:h-[380px]"; // Altura para Misión/Visión
    titleSizeClass = "text-2xl sm:text-3xl md:text-4xl";
    descriptionSizeClass =
      "text-xs sm:text-sm md:text-base line-clamp-3 sm:line-clamp-4";
  } else if (cardType === "small" || cardType === "full-width-small") {
    cardHeightClass = "h-[250px] sm:h-[280px] md:h-[300px]"; // Altura para tarjetas pequeñas
    titleSizeClass = "text-lg sm:text-xl md:text-2xl";
    descriptionSizeClass = "text-xs sm:text-sm line-clamp-3 p-1";
  }

  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hoverTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (
      interactionType === "hoverReveal" &&
      cardRef.current &&
      titleRef.current &&
      hoverTextRef.current
    ) {
      const cardElement = cardRef.current;
      const titleElement = titleRef.current;
      const hoverTextElement = hoverTextRef.current;

      // Estado inicial para la animación hoverReveal
      gsap.set(titleElement, { opacity: 1, y: 0 });
      gsap.set(hoverTextElement, { opacity: 0, y: 20 }); // Inicia abajo y transparente

      const tlEnter = gsap.timeline({
        paused: true,
        defaults: { duration: 0.3, ease: "power2" },
      });
      tlEnter
        .to(titleElement, { opacity: 0, y: -20 }) // Título se va hacia arriba
        .to(hoverTextElement, { opacity: 1, y: 0 }, "-=0.2"); // Texto revelado entra (ajusta offset)

      const tlLeave = gsap.timeline({
        paused: true,
        defaults: { duration: 0.3, ease: "power2" },
      });
      tlLeave
        .to(hoverTextElement, { opacity: 0, y: 20 }) // Texto revelado se va
        .to(titleElement, { opacity: 1, y: 0 }, "-=0.2"); // Título regresa

      cardElement.addEventListener("mouseenter", () => tlEnter.restart());
      cardElement.addEventListener("mouseleave", () => tlLeave.restart());

      return () => {
        cardElement.removeEventListener("mouseenter", () => tlEnter.restart());
        cardElement.removeEventListener("mouseleave", () => tlLeave.restart());
        tlEnter.kill();
        tlLeave.kill();
      };
    }
  }, [interactionType, title, hoverRevealText]);

  const cardInnerContent = (
    <div
      ref={cardRef}
      className={`relative w-full ${cardHeightClass} rounded-xl overflow-hidden shadow-2xl group cursor-pointer hover:shadow-slate-400/50 transition-shadow duration-300 ${className}`}>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          quality={75}
        />
      )}
      {/* 2. Overlay de Gradiente siempre visible */}
      <div className="absolute inset-0" style={{ background: gradientStyle }} />
      {/* 3. Contenido de Texto (encima del gradiente) */}
      <div
        className={`absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-4 sm:p-6 ${textColor}`}>
        <h3
          ref={titleRef}
          className={`${titleSizeClass} font-bold mb-2 sm:mb-3`}>
          {title}
        </h3>

        {/* Mostrar shortDescription si es tipo modal y existe */}
        {interactionType === "modal" && shortDescription && (
          <p className={`${descriptionSizeClass} leading-relaxed`}>
            {shortDescription}
          </p>
        )}

        {/* Mostrar hoverRevealText si es tipo hoverReveal (inicialmente opacity-0 manejado por GSAP) */}
        {interactionType === "hoverReveal" && hoverRevealText && (
          <p
            ref={hoverTextRef}
            className={`${descriptionSizeClass} leading-relaxed absolute opacity-0`} // Inicia opacity-0
            // Aplica el mismo padding que el contenedor del texto para que se alinee bien
            // o ajusta su posicionamiento con clases de top/left/transform si es necesario.
          >
            {hoverRevealText}
          </p>
        )}
      </div>
    </div>
  );

  if (interactionType === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild>{cardInnerContent}</DialogTrigger>
        <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl bg-white/90 font-[400] text-(--color-primary)">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-[800] text-[var(--color-primary)]">
              {modalTitle || title}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm md:text-base leading-relaxed text-(--color-primary) max-h-[60vh] overflow-y-auto">
            {modalContent &&
              modalContent.split("\n").map((paragraph, index) => (
                <p key={index} className={index > 0 ? "mt-4" : ""}>
                  {paragraph}
                </p>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  return cardInnerContent;
};

const CoreValuesSection = () => {
  const missionVisionData: ValueCardProps[] = [
    {
      title: "Misión",
      modalTitle: "Nuestra Misión Corporativa",
      modalContent: `En Bridge Capital, nuestra misión es ser el socio estratégico preferido por individuos, familias y empresas que buscan optimizar su patrimonio y alcanzar sus metas financieras a largo plazo. Nos comprometemos a ofrecer asesoría de inversión independiente, transparente y de la más alta calidad, fundamentada en un análisis profundo, disciplina y un enfoque centrado en el cliente.\n\nBuscamos transformar la complejidad de los mercados en oportunidades claras y rendimientos superiores, actuando siempre con integridad y con la convicción de que el verdadero valor se construye con paciencia y estrategia.`,
      imageUrl: "/images/mision-bg.jpg",
      gradientColors: { from: "rgba(0,42,58,0.5)", to: "rgba(0,42,58,1)" },
      cardType: "large",
      interactionType: "modal",
      textColor: "text-white",
    },
    {
      title: "Visión",
      modalTitle: "Nuestra Visión a Futuro",
      modalContent: `Aspiramos a ser la firma de asesoría en inversiones independiente más respetada y reconocida en México, destacándonos por nuestra excelencia en el servicio, la profundidad de nuestro análisis y la solidez de los resultados que generamos para nuestros clientes.\n\nVisualizamos un futuro donde cada vez más personas y empresas toman decisiones financieras informadas y estratégicas, construyendo patrimonios sólidos y alcanzando su máximo potencial económico con Bridge Capital como su aliado de confianza.`,
      imageUrl: "/images/vision-bg.jpg", // MANTIENE IMAGEN
      gradientColors: { from: "rgba(121,36,47,0.5)", to: "rgba(121,36,47,1)" },
      cardType: "large",
      interactionType: "modal",
      textColor: "text-white",
    },
  ];

  const principlesAndValuesData: ValueCardProps[] = [
    {
      title: "Intereses Comunes",
      hoverRevealText:
        "Evitamos o gestionamos con transparencia los conflictos de interés, priorizando y tratando igual a todos los clientes.",
      gradientColors: { from: "#002A3A", to: "#18647C" },
      cardType: "small",
      interactionType: "hoverReveal",
      textColor: "text-white",
    },
    {
      title: "Integridad",
      hoverRevealText:
        "Nos regimos por la ética y la integridad en todo momento, forjando así confianza con clientes y colaboradores.",
      gradientColors: { from: "#002A3A", to: "#18647C" },
      cardType: "small",
      interactionType: "hoverReveal",
      textColor: "text-white",
    },
    {
      title: "Comunicación Abierta",
      hoverRevealText:
        "Fomentamos una comunicación abierta y constructiva para mejorar relaciones y responder ágilmente a retos y oportunidades.",
      gradientColors: { from: "#002A3A", to: "#18647C" },
      cardType: "small",
      interactionType: "hoverReveal",
      textColor: "text-white",
    },
    {
      title: "Honestidad Radical",
      hoverRevealText:
        "Comprender la verdad, con sus errores y debilidades, es clave para el éxito y permite impulsar mejoras continuas.",
      gradientColors: { from: "#79242F", to: "#B03853" },
      cardType: "small",
      interactionType: "hoverReveal",
      textColor: "text-white",
    },
    {
      title: "Investigación Profunda",
      hoverRevealText:
        "Generamos valor extra mediante ventaja de conocimiento, obtenida con investigación a profundidad y una metodología aplicada de forma consistente.",
      gradientColors: { from: "#79242F", to: "#B03853" },
      cardType: "small",
      interactionType: "hoverReveal",
      textColor: "text-white",
    },
    {
      title: "Trabajo en equipo",
      hoverRevealText:
        "Formamos un equipo multidisciplinario que impulsa la creatividad y el sentido de pertenencia en Bridge Capital.",
      gradientColors: { from: "#79242F", to: "#B03853" },
      cardType: "small",
      interactionType: "hoverReveal",
      textColor: "text-white",
    },
    {
      title: "Excelencia",
      hoverRevealText:
        "Apuntamos a la excelencia con curiosidad e honestidad intelectual, buscando rendimientos atractivos con riesgos controlados y decisiones que aseguren la preservación y crecimiento del capital, incluso en mercados ineficientes y tiempos difíciles.",
      gradientColors: { from: "#53575A", to: "#333537" },
      cardType: "full-width-small",
      interactionType: "hoverReveal",
      className: "lg:col-span-3",
      textColor: "text-white",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div
        className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}`}>
        {/* Sección Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
          {missionVisionData.map((item) => (
            <ValueCard key={item.title} {...item} />
          ))}
        </div>

        {/* Sección Principios y Valores */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Principios y Valores
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {principlesAndValuesData.map((item) => (
            <ValueCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
