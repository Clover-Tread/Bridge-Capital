// src/components/filosofia/WhyInvestSection.tsx
import React from 'react';
import Image from "next/legacy/image";
import { Card, CardContent } from '@/components/ui/card'; // Usaremos Card y CardContent

// Clases compartidas para la alineación del ancho con el Navbar
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl"; // Usa la misma que en tu Navbar
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

const WhyInvestSection = () => {
  const imageUrl = "/images/porque-invertir.jpg"; // <-- CAMBIA ESTO por la ruta a tu imagen
  const imageAlt = "Análisis de inversiones y crecimiento financiero"; // Cambia el alt según tu imagen

  return (
    <section className="py-12 md:py-20 bg-white w-full">
      <div className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}`}>
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Columna de Texto (Izquierda) */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-[700] text-(--color-primary) mb-6 md:mb-8 leading-tight">
              ¿Por qué invertir con nosotros a largo plazo es sinónimo de rendimientos superiores y riesgos controlados?
            </h2>
            <div className="space-y-4 text-(--color-primary) text-base md:text-lg leading-relaxed">
              <p>
                En Bridge Capital, nos enfocamos en identificar empresas con prospectos y 
                modelos de negocio superiores que puedan generar valor durante años, no meses.
              </p>
              <p>
                El proceso inversor de Bridge Capital consta de <strong>4 pilares</strong>, los cuales ayudan a localizar 
                consistencias y ventajas competitivas durables dentro de las empresas en las que 
                se invierte tu patrimonio.
              </p>
            </div>
          </div>

          {/* Columna de Imagen (Derecha) */}
          <div className="w-full lg:w-1/2">
            <Card className="group relative w-full overflow-hidden rounded-xl shadow-lg 
                           h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[550px] {/* ALTURAS RESPONSIVAS - AJUSTA ESTAS */}
                           transition-shadow duration-300 hover:shadow-2xl p-0"
                  // Puedes cambiar estas alturas fijas por clases de aspect-ratio si lo prefieres:
                  // مثلاً: aspect-square md:aspect-[4/3]
            >
              <CardContent className="p-0 w-full h-full relative"> 
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 ease-in-out group-hover:scale-105 blur-[15%]"
                  quality={100}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyInvestSection;