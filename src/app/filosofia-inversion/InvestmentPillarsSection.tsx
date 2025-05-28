// src/components/filosofia/InvestmentPillarsSection.tsx
import React from 'react';
import Image from 'next/image';
// Reemplaza estos con tus componentes de icono SVG o mantenlos si te sirven
import { LucideIcon, Briefcase, Users, BarChart3, Target } from 'lucide-react';

// Clases compartidas para la alineación del ancho con el Navbar
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

interface PointDetail {
  boldText: string;
  normalText: string;
}

interface PillarProps {
  icon: LucideIcon; // O React.ElementType si usas tus propios SVGs
  title: string;
  points: PointDetail[];
  titleAlign?: 'left' | 'center';
}

const PillarCard: React.FC<PillarProps> = ({ icon: Icon, title, points, titleAlign = 'center' }) => {
    const titleAlignmentClass = titleAlign === 'left' ? 'text-left' : 'text-center';
    // Si quieres que el icono también se alinee a la izquierda con el título:
    const iconContainerAlignmentClass = titleAlign === 'left' ? 'justify-start' : 'justify-center';
  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl h-full flex flex-col ring-1 ring-white/20">
      {/* Contenedor del icono, para poder alinearlo si es necesario */}
      <div className={`flex ${iconContainerAlignmentClass} mb-5`}>
        <Icon className="h-10 w-10 text-white inline-block" /> {/* Quitamos m-auto, text-center */}
      </div>
      {/* Contenedor del título con alineación dinámica */}
      <div className={`mb-4 ${titleAlignmentClass}`}> {/* Aplicamos la clase de alineación */}
        <h3 className="text-xl font-semibold text-white inline-block">{title}</h3> {/* inline-block para que text-left/center funcione */}
      </div>
      <ul className="list-disc list-inside space-y-2 text-gray-200 text-sm md:text-base flex-grow">
        {points.map((point, index) => (
          <li key={index}>
            <span className="font-semibold">{point.boldText}</span>
            <span>{point.normalText}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const InvestmentPillarsSection = () => {
  const backgroundImageFilename = 'pilares.jpg';
  const imagePath = `/images/${backgroundImageFilename}`;

  // Gradiente: #003F5F (100% opacidad) a #003F5F (70% opacidad)
  // rgba(0, 63, 95, 1) a rgba(0, 63, 95, 0.7)
  const gradientStyle = 'linear-gradient(to bottom, rgba(0,63,95,1) 0%, rgba(0,63,95,0.7) 100%)';

  const pillarsData: PillarProps[] = [
    {
      icon: Briefcase,
      title: 'Pilar 1: Negocio',
      titleAlign: 'center',
      points: [
        { boldText: "Comprensión del Negocio:", normalText: " Entender a que se dedica la compañía es esencial."},
        { boldText: "Consistencia histórica:", normalText: " Su antigüedad, número de empleados y consistencia de resultados."},
      ],
    },
    {
      icon: Users,
      title: 'Pilar 2: Dirección y Liderazgo',
      titleAlign: 'center',
      points: [
        { boldText: "Dirección racional:", normalText: " Existe una toma de decisiones racional por parte de la directiva." },
        { boldText: "Transparencia frente a los socios:", normalText: " Se reconocen éxitos y errores de la misma forma." },
        { boldText: "Resistencia a Imperativa Institucional:", normalText: " Piensan de forma independiente y evaden la mentalidad de las masas." },
      ],
    },
    {
      icon: BarChart3,
      title: 'Pilar 3: Fundamental Financiero',
      titleAlign: 'center',
      points: [
        { boldText: "Consistencia y rentabilidad:", normalText: " Comportamiento y resultados similares en el tiempo." },
        { boldText: "Ganancias de los socios:", normalText: " Habilidad para generar efectivo para los accionistas." },
        { boldText: "Márgenes:", normalText: " Presentan altos márgenes que reflejan fortaleza." },
        { boldText: "Más Valor con Utilidades y Acciones:", normalText: " Generación de valor tanto en la compañía como en el mercado." },
      ],
    },
    {
      icon: Target,
      title: 'Pilar 4: Mercado',
      titleAlign: 'center',
      points: [
        { boldText: "Valuación de la compañía:", normalText: " Lo que recibo a cambio de lo que pago." },
        { boldText: "Margen de seguridad:", normalText: " Existe un descuento atractivo." },
        { boldText: "Análisis de precios:", normalText: " Tasa de retorno de inversión y tasa de crecimiento." },
        { boldText: "Estrategia de inversión:", normalText: " ¿Seremos accionistas o les prestaremos capital?" },
      ],
    },
  ];

  return (
    <section className="relative py-16 md:py-24 w-full overflow-hidden">
      {/* Capa de Imagen de Fondo */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={imagePath} 
          alt="Fondo de Pilares de Inversión Bridge Capital"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Capa de Gradiente Overlay */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: gradientStyle }}
      />
      
      {/* Contenedor para el contenido (cita, declaración, pilares) */}
      <div className={`relative mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}`}>
        {/* Cita */}
        <blockquote className="text-center max-w-5xl mx-auto mb-12 md:mb-16">
          <p className="text-xl md:text-2xl font-[400] lg:text-2xl italic text-white leading-relaxed md:leading-loose">
            &quot;La convicción sobre una idea, la disciplina radical, la paciencia, 
            no tomar decisiones basadas en pronósticos o predicciones y no buscar 
            atinarle al momento de entrada en el mercado, son nuestros principios 
            del proceso inversor.&quot;
          </p>
        </blockquote>

        <div className="text-center mb-12 md:mb-16">
          {/* Estilo para que destaque sobre el fondo oscuro/gradiente */}
          <p className="inline-block px-6 py-3  backdrop-blur-sm text-white font-[700] text-xl md:text-xl">
            Los pilares y principios nunca cambian, nuestras estrategias sí.
          </p>
        </div>

        {/* Grid de los Pilares */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pillarsData.map((pillar) => (
            <PillarCard
              key={pillar.title}
              icon={pillar.icon}
              title={pillar.title}
              points={pillar.points}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentPillarsSection;