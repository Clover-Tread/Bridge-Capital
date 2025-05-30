import React from "react";
import Image from "next/image";

const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

const CONTENT_PADDING_TOP_CLASS = "pt-32";

const ContactHeaderSection = () => {
  const backgroundImageFilename = "sala-junta.jpg"; // Nombre de tu imagen
  const imagePath = `/images/${backgroundImageFilename}`;

  return (
    <section className="-mt-[7rem] relative w-full min-h-[80vh] md:min-h-[100vh] flex flex-col items-center text-center overflow-hidden">
      {/* Capa de Imagen de Fondo con Blur */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={imagePath}
          alt="Sala de juntas - Contacto Bridge Capital"
          layout="fill"
          objectFit="cover"
          quality={75}
          priority
          className="blur-[3px] md:blur-[4px]" // Ajusta el valor de blur según tu preferencia
        />
      </div>
      {/* Opcional: Un ligero overlay oscuro para mejorar el contraste del texto sobre la imagen con blur */}
      <div className="absolute inset-0 -z-0 bg-black/20"></div>{" "}
      {/* Ejemplo: 20% de opacidad negra */}
      {/* Contenedor para el contenido de texto */}
      <div
        className={`
          relative mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}
          z-10 flex flex-col justify-center items-center flex-grow 
          w-full 
          ${CONTENT_PADDING_TOP_CLASS} 
          pb-12 md:pb-16 lg:pb-20 
        `}>
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-[900] text-[#efefef] leading-tight shadow-sm">
          {/* Texto blanco para contrastar con la imagen con blur y posible overlay */}
          Suma Nuestra Experiencia a Tu Estrategia Financiera.
        </h1>
        {/* El subtítulo "¿Tienes dudas? Revisa nuestras preguntas frecuentes" ahora irá en FAQSection */}
      </div>
    </section>
  );
};

export default ContactHeaderSection;
