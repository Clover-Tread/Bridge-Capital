// src/components/nosotros/AboutHeroSection.tsx
import React from 'react';
import Image from 'next/image';

const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl"; 
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

const AboutHeroSection = () => {
  return (
    <section className={`relative w-full min-h-screen flex flex-col items-center text-center`}>
      <div 
        className={`
          relative mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}
          z-10 flex flex-col justify-center items-center flex-grow 
          w-full
          pb-12 md:pb-16 lg:pb-20
        `}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Columna de Texto */}
          <div className="text-center md:text-left flex flex-col justify-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-[900] text-(--color-primary) mb-6 leading-tight">
                Socios estratégicos para tu patrimonio: seguro y en constante crecimiento.
              </h1>
              <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed">
                <p>
                  Nuestro equipo combina pasión con tres cualidades esenciales: Inteligencia, Iniciativa e Integridad.
                </p>
                <p>
                  Esta sinergia nos permite ofrecer un servicio de asesoría ágil, profundo y enfocado en la 
                  protección y el crecimiento de tu capital.
                </p>
              </div>
            </div>
          </div>

          {/* Columna de Imagen */}
          {/* Aumentamos las alturas aquí para hacer la imagen más rectangular y alta */}
          <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg"> {/* ALTURAS AUMENTADAS */}
            <Image
              src="/images/handshake.jpg" 
              alt="Socios estratégicos en Bridge Capital - Apretón de manos"
              layout="fill"
              objectFit="cover"
              className="transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;