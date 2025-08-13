"use client"; // Necesario para usar hooks de React como useState y useEffect

import React, { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";

// Datos para la barra de navegación lateral (índice)
const sections = [
  { href: "#que-son-cookies", title: "1. ¿Qué son las Cookies?" },
  { href: "#que-son-web-beacons", title: "2. ¿Qué son los Web Beacons?" },
  { href: "#que-son-sdk", title: "3. ¿Qué son los SDK?" },
  { href: "#recaban-datos", title: "4. ¿Recaban Datos Personales?" },
  { href: "#uso-de-tecnologias", title: "5. Uso de Tecnologías de Rastreo" },
  { href: "#eliminar-cookies", title: "6. ¿Se pueden eliminar las Cookies?" },
  { href: "#autoridad", title: "7. Autoridad de Protección de Datos" },
  { href: "#contacto", title: "8. Contacto" },
];

const PoliticaCookiesPage = () => {
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

  // Clases unificadas para todos los títulos de sección
  const headingClasses =
    "text-2xl md:text-3xl font-bold text-gray-800 mt-12 mb-4 scroll-mt-40";

  return (
    <>
      {/* SECCIÓN DEL ENCABEZADO GRIS */}
      <header className="bg-gray-100 py-16 md:py-24">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
            POLÍTICA DE USO DE COOKIES
          </h1>
        </div>
      </header>

      {/* SECCIÓN DEL CONTENIDO PRINCIPAL */}
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* COLUMNA IZQUIERDA: NAVEGACIÓN STICKY */}
          <aside className="lg:w-1/4">
            <nav className="lg:sticky lg:top-24">
              <h3 className="font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Índice del documento
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

          {/* COLUMNA DERECHA: CONTENIDO DE LA POLÍTICA */}
          <main className="lg:w-3/4">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <div className="mb-8 p-4 border-l-4 border-gray-200 bg-gray-50 rounded-r-lg">
                <p className="text-sm text-gray-600 font-semibold">
                  Fecha de última actualización: 05 de agosto de 2021
                </p>
                <a
                  href="/documentos/BC_Politica_Cookies.pdf" // Coloca tu PDF en la carpeta /public/documentos
                  download
                  className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors">
                  <Download size={16} />
                  Descargar Versión en PDF
                </a>
              </div>

              <p>
                En cumplimiento de lo dispuesto por la Ley Federal de Protección
                de Datos Personales en Posesión de los Particulares, su
                Reglamento, los Lineamientos del Aviso de Privacidad y demás
                normatividad aplicable en la materia, BC ASESORES
                INDEPENDIENTES, S.A.P.I. DE C.V., conocido comercialmente como
                BRIDGE CAPITAL, actuará como el Responsable del tratamiento de
                sus datos personales que se recaben a través del sitio web
                http://www.bridgecapital.mx/ (en adelante, "nuestra
                plataforma"), por lo que ponemos a su disposición la presente
                Política de Uso de Cookies, SDK, Tecnologías de Rastreo y
                Similares; en ese sentido, hacemos de su conocimiento la
                siguiente información:
              </p>

              <h2 id="que-son-cookies" className={headingClasses}>
                1. ¿QUÉ SON LAS COOKIES?
              </h2>
              <p>
                Las Cookies son archivos que permiten la recolección automática
                de información relativa a la visita de un usuario a una
                determinada página web y que se almacena en el navegador del
                usuario; esto permite al sitio web consultar la actividad previa
                del usuario. Las Cookies tienen fechas de caducidad variadas,
                que puede oscilar desde el tiempo que dure la sesión (Cookies de
                sesión), hasta una fecha futura especificada a partir de la cual
                dejan de ser operativas (Cookies persistentes).
              </p>

              <h2 id="que-son-web-beacons" className={headingClasses}>
                2. ¿QUÉ SON LOS WEB BEACONS?
              </h2>
              <p>
                Los Web Beacons son archivos con una imagen que ayuda a hacer un
                seguimiento de la navegación en una web concreta o en un grupo
                de webs. Los Web Beacons también se conocen como balizas web y
                normalmente los utilizan las webs que recurren a una tercera
                parte para monitorizar el tráfico y hacer seguimiento de los
                servicios. Los Web Beacons pueden ser utilizados conjuntamente
                con las Cookies para comprender cómo los usuarios de una web
                navegan y procesan el contenido almacenado en ella.
              </p>

              <h2 id="que-son-sdk" className={headingClasses}>
                3. ¿QUÉ SON LOS SDK?
              </h2>
              <p>
                Un Software Development Kit, abreviado como SDK y que en español
                quiere decir un Kit de Desarrollo de Software, es un paquete de
                herramientas y datos que facilita e incluso permite a los
                programadores desarrollar programas en un lenguaje concreto o
                para una plataforma o aplicación específica. De la composición y
                distribución de un SDK se encarga el desarrollador original del
                lenguaje o del hardware o software en cuestión. En la mayoría de
                casos, los SDK son de uso gratuito, si bien su fabricante los
                puede limitar con ciertas reglas y licencias.
              </p>

              <h2 id="recaban-datos" className={headingClasses}>
                4. ¿LAS COOKIES RECABAN DATOS PERSONALES?
              </h2>
              <p>
                Cuando las Cookies permiten la identificación del usuario
                (determinadas Cookies analíticas y Cookies de publicidad lo
                permiten), se considera que las Cookies recaban datos
                personales. En tales casos, tratamos esta información como
                Responsable del Tratamiento de esos Datos Personales, para las
                finalidades antes descritas.
              </p>

              <h2 id="uso-de-tecnologias" className={headingClasses}>
                5. USO DE COOKIES, WEB BEACONS, SDK Y SIMILARES
              </h2>
              <p>
                Hacemos de su conocimiento que a través de nuestras plataformas,
                podemos hacer uso de Cookies, Web Beacons, SDK y otras
                tecnologías a través de las cuales es posible monitorear su
                comportamiento como usuario de nuestras plataformas, así como
                ofrecerle nuevos productos y servicios basados en sus
                preferencias. Para cumplir con lo anterior, podemos dar uso a
                las siguientes Cookies y SDK's propias y de terceros:
              </p>
              <ul>
                <li>
                  <strong>Cookies y SDK's esenciales:</strong> Son esenciales
                  para permitirle un uso adecuado de nuestras plataformas y
                  utilizar sus características, por lo que no pueden ser
                  deshabilitadas.
                </li>
                <li>
                  <strong>
                    Cookies y SDK's para recordar sus preferencias:
                  </strong>{" "}
                  Nos permiten recordar sus preferencias y opciones de
                  navegación, proporcionarle funciones personalizadas y recordar
                  cambios realizados al tamaño del texto, tipo de letra, etc.
                </li>
                <li>
                  <strong>
                    Cookies y SDK's para personalizar su experiencia:
                  </strong>{" "}
                  Podemos usar este tipo para cambiar el comportamiento o el
                  aspecto de nuestras plataformas, con el objetivo de
                  personalizar su experiencia.
                </li>
                <li>
                  <strong>
                    Cookies y SDK's para objetivos de rendimiento y análisis:
                  </strong>{" "}
                  Usamos herramientas propias y de terceros para identificar la
                  forma en que usted utiliza nuestros servicios con la finalidad
                  de mejorar su rendimiento y futuros desarrollos.
                </li>
                <li>
                  <strong>
                    Cookies y SDK's publicitarias propias y de terceros:
                  </strong>{" "}
                  Podemos colocar cookies publicitarias, dentro y fuera de
                  nuestras plataformas, para mostrarle publicidad que
                  consideremos relevante para usted.
                </li>
              </ul>

              <h2 id="eliminar-cookies" className={headingClasses}>
                6. ¿SE PUEDEN ELIMINAR LAS COOKIES?
              </h2>
              <p>
                Sí. Usted puede rechazar la instalación de Cookies y eliminar
                aquellas que ya están instaladas en su computadora. La forma de
                bloquear y eliminar las cookies puede diferir de un navegador de
                Internet a otro. A continuación, le proporcionamos links para
                configurar la gestión de cookies en los principales navegadores:
              </p>
              <ul>
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647?hl=es"
                    target="_blank"
                    rel="noopener noreferrer">
                    Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                    target="_blank"
                    rel="noopener noreferrer">
                    Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/es-mx/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer">
                    Safari
                  </a>
                </li>
              </ul>
              <p>
                Si usted rechaza la instalación de Cookies podrá seguir usando
                nuestro sitio web, aunque algunas funciones o prestaciones del
                sitio podrán estar limitadas o no funcionar adecuadamente.
              </p>

              <h2 id="autoridad" className={headingClasses}>
                7. AUTORIDAD EN MATERIA DE PROTECCIÓN DE DATOS PERSONALES
              </h2>
              <p>
                En caso de considerarlo necesario, le informamos que tiene el
                derecho de acudir ante el Instituto Nacional de Transparencia,
                Acceso a la Información y Protección de Datos Personales (INAI),
                para hacer valer cualquier inconformidad relacionada con su
                Derecho a la Protección de Datos Personales.
              </p>

              <h2 id="contacto" className={headingClasses}>
                8. CONTACTO PARA DUDAS O ACLARACIONES
              </h2>
              <p>
                Nuestro Departamento de Protección de Datos Personales queda a
                sus órdenes para proporcionarle cualquier información adicional
                que requiera o, en su caso, para resolver cualquier duda que
                pudiera surgirle respecto a la presente Política, por lo que
                podrá contactarnos a través del correo electrónico:{" "}
                <strong>legal@bridgecapital.mx</strong>.
              </p>

              <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm">
                <p className="font-bold">ATENTAMENTE</p>
                <p className="mt-1 font-semibold">BRIDGE CAPITAL</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PoliticaCookiesPage;
