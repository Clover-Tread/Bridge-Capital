"use client"; // Necesario para usar hooks de React como useState y useEffect

import React, { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";

// Datos para la barra de navegación lateral (índice)
const sections = [
  { href: "#introduccion", title: "I. Introducción" },
  { href: "#servicios-inversion", title: "II. Servicios de Inversión" },
  { href: "#otros-servicios", title: "III. Otros Servicios" },
  { href: "#productos-financieros", title: "IV. Productos Financieros" },
  { href: "#politica-productos", title: "V. Política de Productos" },
  {
    href: "#politica-diversificacion",
    title: "VI. Política de Diversificación",
  },
  { href: "#comisiones", title: "VII. Comisiones" },
  { href: "#reclamaciones", title: "VIII. Reclamaciones" },
  { href: "#conflictos-interes", title: "IX. Conflictos de Interés" },
];

const GuiaServiciosInversionPage = () => {
  // Estado para guardar el ID de la sección activa
  const [activeSection, setActiveSection] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const intersectingEntries = entries.filter(
        (entry) => entry.isIntersecting
      );

      if (intersectingEntries.length > 0) {
        intersectingEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        setActiveSection(intersectingEntries[0].target.id);
      }
    };

    const options = {
      rootMargin: "-120px 0px -70% 0px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(observerCallback, options);
    const currentObserver = observerRef.current;

    sections.forEach((section) => {
      const element = document.querySelector(section.href);
      if (element) {
        currentObserver.observe(element);
      }
    });

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, []);

  // Clases unificadas para los títulos de sección
  const headingClasses =
    "text-2xl md:text-3xl font-bold text-gray-800 mt-12 mb-4 scroll-mt-40";
  const subHeadingClasses =
    "text-xl md:text-2xl font-semibold text-gray-700 mt-8 mb-3";

  return (
    <>
      {/* SECCIÓN DEL ENCABEZADO GRIS */}
      <header className="bg-gray-100 py-16 md:py-24">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
            GUÍA DE SERVICIOS DE INVERSIÓN
          </h1>
        </div>
      </header>

      {/* SECCIÓN DEL CONTENIDO PRINCIPAL */}
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* COLUMNA IZQUIERDA: NAVEGAZACIÓN STICKY */}
          <aside className="lg:w-1/4">
            <nav className="lg:sticky lg:top-24">
              <h3 className="font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Contenido
              </h3>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.href}>
                    <a
                      href={section.href}
                      className={`transition-colors duration-200 text-sm ${
                        activeSection === section.href.substring(1)
                          ? "font-bold text-gray-900" // Estilo ACTIVO
                          : "text-gray-600 hover:text-gray-900" // Estilo INACTIVO
                      }`}>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* COLUMNA DERECHA: CONTENIDO DE LA GUÍA */}
          <main className="lg:w-3/4">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <div className="mb-8 p-4 border-l-4 border-gray-200 bg-gray-50 rounded-r-lg">
                <p className="text-sm text-gray-600 font-semibold">
                  Fecha de última actualización: 05 de agosto de 2021
                </p>
                <a
                  href="/documentos/BC_Guia_Servicios_Inversion.pdf"
                  download
                  className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors">
                  <Download size={16} />
                  Descargar Versión en PDF
                </a>
              </div>

              <h2 id="introduccion" className={headingClasses}>
                I. INTRODUCCIÓN
              </h2>
              <p>
                La presente Guía tiene por sustento la Ley del Mercado de
                Valores y las Disposiciones de carácter general aplicables a
                entidades financieras y demás personas que proporcionen
                servicios de inversión. En cumplimiento con la normatividad, BC
                ASESORES INDEPENDIENTES, S.A.P.I. DE C.V. (en adelante "BC
                Asesores"), pone a disposición del público inversionista la
                presente Guía, en la que se describen los servicios de inversión
                que proporciona, las comisiones, mecanismos de reclamaciones y
                políticas para prevenir conflictos de interés y para la
                diversificación de carteras.
              </p>

              <h2 id="servicios-inversion" className={headingClasses}>
                II. SERVICIOS DE INVERSIÓN
              </h2>
              <h3 className={subHeadingClasses}>Servicios Asesorados</h3>
              <p>
                Es la prestación habitual y profesional de Asesoría de
                Inversiones o Gestión de Inversiones.
              </p>
              <h3 className={subHeadingClasses}>Asesoría de Inversiones</h3>
              <p>
                Consiste en proporcionar recomendaciones o consejos
                personalizados a un cliente sobre la toma de decisiones de
                inversión sobre uno o más Productos Financieros, a solicitud del
                cliente o por iniciativa de BC Asesores.
              </p>
              <h3 className={subHeadingClasses}>Gestión de Inversiones</h3>
              <p>
                Es la toma de decisiones de inversión por cuenta de los clientes
                a través de la administración de cuentas, ya sea a través de
                carteras pre-conformadas por perfiles de riesgo o mediante el
                manejo de un portafolio a la medida del cliente.
              </p>
              <p>
                Para ofrecer estos servicios, BC Asesores aplica un cuestionario
                para determinar el perfil de inversión del cliente y justifica
                la correspondencia entre dicho perfil y la cartera de productos
                ofrecida.
              </p>

              <h2 id="otros-servicios" className={headingClasses}>
                III. OTROS SERVICIOS
              </h2>
              <p>
                BC Asesores también gestiona retiros y depósitos a cuentas de
                cheques ligadas al contrato de inversión, siguiendo las
                instrucciones del cliente vía telefónica o por medios
                electrónicos.
              </p>

              <h2 id="productos-financieros" className={headingClasses}>
                IV. PRODUCTOS FINANCIEROS
              </h2>
              <p>Asesoramos en una amplia gama de productos, incluyendo:</p>
              <ul>
                <li>
                  <strong>Mercado de Deuda:</strong> Instrumentos
                  gubernamentales, bancarios y corporativos.
                </li>
                <li>
                  <strong>Mercado de Capitales:</strong> Acciones de emisoras
                  listadas en la Bolsa Mexicana de Valores, FIBRAS y valores del
                  Sistema Internacional de Cotizaciones (SIC).
                </li>
                <li>
                  <strong>Mercado de Divisas:</strong> Compra y venta de divisas
                  y activos denominados en moneda extranjera.
                </li>
                <li>
                  <strong>Fondos de Inversión:</strong> Fondos de deuda y de
                  renta variable.
                </li>
                <li>
                  <strong>Notas Estructuradas e Instrumentos Derivados.</strong>
                </li>
                <li>
                  <strong>Mercados Internacionales:</strong> Asesoría a clientes
                  con cuentas en el extranjero.
                </li>
              </ul>

              <h2 id="politica-productos" className={headingClasses}>
                V. POLÍTICA DE LOS PRODUCTOS FINANCIEROS
              </h2>
              <p>
                Para determinar los productos en los que se sugerirá invertir,
                se considerará la relación entre el producto y el perfil de
                riesgo del cliente, el plazo de la inversión, los límites
                máximos por tipo de producto y las bases de comparación de
                rendimiento. La política de inversión puede ser activa (buscando
                superar un rendimiento de referencia) o pasiva (buscando igualar
                el rendimiento de referencia).
              </p>

              <h2 id="politica-diversificacion" className={headingClasses}>
                VI. POLÍTICA DE DIVERSIFICACIÓN DE CARTERAS
              </h2>
              <p>
                BC Asesores cuenta con políticas para la diversificación de las
                carteras de inversión de sus clientes en función de los
                diferentes perfiles. Se establecen límites de inversión por
                emisor y tipo de valor, tanto para Renta Fija como para Renta
                Variable, mitigando el riesgo. Los Instrumentos Financieros
                Derivados son utilizados como réplica de activos o cobertura.
              </p>

              <h2 id="comisiones" className={headingClasses}>
                VII. COMISIONES
              </h2>
              <p>
                BC Asesores solo cobra comisiones por los servicios de inversión
                expresamente convenidos con el cliente. Las comisiones que se
                cobran son:
              </p>
              <ul>
                <li>
                  <strong>Comisión por Manejo de Cuenta:</strong> Un porcentaje
                  fijo mensual sobre los activos administrados.
                </li>
                <li>
                  <strong>Comisión por Rendimiento Anual:</strong> Un premio
                  sobre las utilidades que superen un rendimiento base pactado.
                </li>
              </ul>
              <p>
                Todos los honorarios generan IVA. BC Asesores no recibe ingresos
                de intermediarios del Mercado de Valores.
              </p>

              <h2 id="reclamaciones" className={headingClasses}>
                VIII. RECLAMACIONES
              </h2>
              <p>
                Las reclamaciones y quejas deberán presentarse por escrito en
                nuestras oficinas o enviarse al correo electrónico:{" "}
                <strong>contacto@bridgecapital.com</strong>, y serán atendidas
                por el Área de Cumplimiento. También puede acudir a la Comisión
                Nacional para la Protección y Defensa de los Usuarios de
                Servicios Financieros (CONDUSEF).
              </p>

              <h2 id="conflictos-interes" className={headingClasses}>
                IX. CONFLICTOS DE INTERÉS
              </h2>
              <p>
                BC Asesores se rige por políticas que vigilan el adecuado
                desempeño para prevenir y manejar conflictos de interés. Se
                privilegian en todos los casos las instrucciones de compra o
                venta de valores por cuenta de los clientes sobre las propias
                del Asesor o de sus empleados. Se presume la existencia de un
                conflicto de interés cuando, entre otros casos, se realizan
                recomendaciones que no son acordes con el perfil del cliente o
                se obtiene un beneficio en perjuicio de los intereses del mismo.
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default GuiaServiciosInversionPage;
