import Link from "next/link";
import Image from "next/legacy/image";
import {
  BriefcaseBusiness,
  Handshake,
  ChartNoAxesCombined,
  Target,
} from "lucide-react";

type Pillar = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const pillars: Pillar[] = [
  {
    icon: BriefcaseBusiness,
    title: "Pilar 1: Negocio",
    description:
      "Invertimos en negocios sólidos que entendemos a fondo, con valor comprobado y clara visión de futuro.",
  },
  {
    icon: Handshake,
    title: "Pilar 2: Dirección y Liderazgo",
    description:
      "Buscamos liderazgo excepcional: directivas con gestión racional, probada transparencia y pensamiento verdaderamente independiente.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Pilar 3: Fundamental Financiero",
    description:
      "Priorizamos la fortaleza financiera: empresas rentables, con márgenes sólidos, que consistentemente generan valor para el accionista.",
  },
  {
    icon: Target,
    title: "Pilar 4: Mercado",
    description:
      "Estrategia de mercado inteligente: identificamos valoraciones atractivas y un amplio margen de seguridad para optimizar cada inversión.",
  },
];

const PrinciplesSection = () => {
  return (
    <section className="relative text-white">
      {/* Fondo de la sección */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pilares.jpg"
          alt="4 columnas representando los 4 pilares"
          layout="fill"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 z-10 opacity-85 bg-[linear-gradient(to_bottom,_#53575A_100%,_#7C7C7C_70%)]"></div>

      {/* Contenido de la sección */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[800]">
            Principios Fundamentales de Nuestra Estrategia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="relative rounded-2xl p-8 overflow-hidden">
                {/* === 2. FONDO === */}
                <div className="absolute inset-0 bg-(--color-bg-card) backdrop-blur-sm z-0"></div>

                {/* === 3. CONTENIDO === */}
                <div className="relative z-10 flex items-center gap-6">
                  <div className="flex-shrink-0 w-20 flex justify-center">
                    <IconComponent className="w-12 h-12 text-[#ebebeb]" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold mb-5">
                      {pillar.title}
                    </h3>
                    <p className="text-[#ebebeb] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón */}
        <div className="text-center mt-20">
          <Link
            href="/filosofia-inversion"
            className="bg-[#ebebeb] text-(--color-dark-red) font-semibold px-10 py-4 rounded-lg hover:bg-(--color-dark-red) hover:text-[#ebebeb] transition-colors duration-300">
            Conoce los 4 Pilares
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
