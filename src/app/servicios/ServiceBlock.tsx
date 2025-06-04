// src/components/servicios/ServiceBlock.tsx
import React from "react";
import Image from "next/legacy/image";
import { Card, CardContent } from "@/components/ui/card"; // CardContent se mantiene si ShadCN lo recomienda para estructura interna, pero con p-0

interface ServiceBlockProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  children: React.ReactNode; // Para el contenido de texto (párrafos, listas)
}

const ServiceBlock: React.FC<ServiceBlockProps> = ({
  title,
  imageUrl,
  imageAlt,
  imagePosition = "left",
  children,
}) => {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      {/* Columna de Imagen */}
      <div
        className={`w-full lg:w-1/2 ${imagePosition === "right" ? "lg:order-2" : "lg:order-1"}`}>
        <Card
          className="group relative w-full overflow-hidden rounded-xl shadow-lg 
                       h-80 sm:h-96 md:h-[500px] lg:h-[550px] xl:h-[600px] 
                       transition-shadow duration-300 hover:shadow-2xl p-0">
          <CardContent className="p-0 w-full h-full relative">
            <Image
              src={imageUrl}
              alt={imageAlt}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 ease-in-out group-hover:scale-105"
              quality={75}
            />
          </CardContent>
        </Card>
      </div>

      {/* Columna de Texto */}
      <div
        className={`w-full lg:w-1/2 space-y-4 ${imagePosition === "right" ? "lg:order-1" : "lg:order-2"}`}>
        <h2 className="text-5xl md:text-6xl font-[900] text-[var(--color-primary)] text-center">
          {title}
        </h2>
        <div className="text-(--color-primary) space-y-3 text-base md:text-lg leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ServiceBlock;
