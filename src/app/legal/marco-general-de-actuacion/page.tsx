"use client";

import React, { useState, useEffect, useRef } from "react";
import { Download, AlertCircle } from "lucide-react";

const sections = [
  { href: "#declaracion-cliente", title: "Declaración del Cliente" },
  { href: "#perfiles-carteras", title: "Perfiles y Carteras de Inversión" },
  { href: "#horizonte-benchmarks", title: "Horizonte y Benchmarks" },
  { href: "#caracteristicas-activos", title: "Características de los Activos" },
  { href: "#politicas-inversion", title: "Políticas y Criterios de Inversión" },
  { href: "#riesgos", title: "Riesgos de Inversión" },
  { href: "#operaciones-referencias", title: "Operaciones y Referencias" },
  { href: "#excepciones", title: "Excepciones" },
];

const MarcoGeneralActuacionPage = () => {
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
    const options = { rootMargin: "-120px 0px -70% 0px", threshold: 0 };
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

  const headingClasses =
    "text-2xl md:text-3xl font-bold text-gray-800 mt-12 mb-4 scroll-mt-40";

  return (
    <>
      <header className="bg-gray-100 py-16 md:py-24">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
            MARCO GENERAL DE ACTUACIÓN
          </h1>
        </div>
      </header>
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
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
                          ? "font-bold text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <main className="lg:w-3/4">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <div className="mb-10 p-4 border-l-4 border-sky-500 bg-sky-50 rounded-r-lg flex items-start gap-4">
                <AlertCircle className="text-sky-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sky-800 !mt-0">
                    Documento para Llenar y Firmar
                  </p>
                  <p className="text-sm text-sky-700 !mt-1">
                    Este documento detalla el Marco General de Actuación. Para
                    formalizar nuestra relación de servicios, es necesario
                    descargarlo, completarlo con sus datos y firmarlo.
                  </p>
                  <a
                    href="/documentos/BC_Marco_General.pdf"
                    download
                    className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors">
                    <Download size={16} />
                    Descargar Marco General de Actuación en PDF
                  </a>
                </div>
              </div>
              <h2 id="declaracion-cliente" className={headingClasses}>
                Declaración del Cliente
              </h2>
              <p>
                Manifiesto que el Promotor de Valores asignado para el manejo de
                la cuenta aplicó el cuestionario &quot;Perfil de
                Inversión&quot;, resultando un perfil que, después de haberme
                sido explicado y aclaradas mis dudas, acepto que es congruente
                con mis necesidades y objetivos de inversión.
              </p>
              <p>
                Que el presente Marco General de Actuación rige el servicio de
                Gestión de Inversiones, el que implica el manejo discrecional de
                la cartera que me ha sido ofrecida y que es adecuada a mi perfil
                de inversión, por lo que autorizo a BC ASESORES INDEPENDIENTES,
                S.A.P.I. DE C.V. a instruir en mi nombre cualquier tipo de
                operación en estricto apego a este documento.
              </p>
              <p>
                La discrecionalidad concedida se limita a los instrumentos que
                conforman la cartera diseñada por la empresa y asociada a mi
                perfil, considerando las clases de valores, política de
                diversificación y límites máximos. Esta discrecionalidad será
                del 100% de acuerdo con el Perfil de Inversión, aunque el
                cliente puede girar instrucciones directas por escrito.
              </p>
              <h2 id="perfiles-carteras" className={headingClasses}>
                Perfiles y Carteras de Inversión
              </h2>
              <p>
                Los porcentajes máximos de inversión según cada perfil son los
                siguientes:
              </p>
              <div className="overflow-x-auto my-8">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 border border-gray-200">
                        Instrumento
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 border border-gray-200 text-center">
                        Precavido
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 border border-gray-200 text-center">
                        Defensivo
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 border border-gray-200 text-center">
                        Balanceado
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 border border-gray-200 text-center">
                        Emprendedor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 border border-gray-200">
                        Máximo Renta Variable
                      </th>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        0%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        30%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        50%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        100%
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 border border-gray-200">
                        Mínimo Renta Fija
                      </th>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        100%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        70%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        50%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        0%
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 border border-gray-200">
                        Valores Gubernamentales
                      </th>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        100%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        100%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        100%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        100%
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 border border-gray-200">
                        Corporativos
                      </th>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        15%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        40%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        50%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        100%
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 border border-gray-200">
                        Fondos de Inversión de Renta Variable
                      </th>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        0%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        30%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        50%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        100%
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 border border-gray-200">
                        Acciones, ETFs, Fibras (SIC)
                      </th>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        0%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        30%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        50%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        100%
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 border border-gray-200">
                        Notas Estructuradas
                      </th>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        0%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        15%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        30%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        50%
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 border border-gray-200">
                        Productos Derivados
                      </th>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        0%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        0%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        30%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        50%
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 border border-gray-200">
                        Porcentaje máximo por emisora
                      </th>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        10%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        10%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        15%
                      </td>
                      <td className="px-4 py-3 border border-gray-200 text-center">
                        25%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h2 id="horizonte-benchmarks" className={headingClasses}>
                Horizonte y Benchmarks
              </h2>
              <p>
                Nuestros servicios tienen carácter patrimonial, y bajo esta
                premisa los horizontes de inversión recomendados van desde 1 año
                para perfiles Precavidos hasta más de 5 años para perfiles
                Emprendedores. Para medir el desempeño se utilizan referencias
                objetivas y de conocimiento público (&quot;Benchmarks&quot;)
                adecuadas a cada tipo de instrumento.
              </p>
              <h2 id="caracteristicas-activos" className={headingClasses}>
                Características de los Activos de Inversión
              </h2>
              <p>
                Los activos de inversión se dividen en instrumentos del mercado
                de deuda (representan una obligación de pago), instrumentos de
                renta variable (representan acceso al capital de una empresa) y
                notas estructuradas (instrumentos creados por bancos y
                referenciados a otros índices).
              </p>
              <h2 id="politicas-inversion" className={headingClasses}>
                Políticas y Criterios de Inversión
              </h2>
              <p>
                Nuestra política de inversión es moderada y prudente, buscando
                no comprometer a riesgos adicionales a los propios de cada
                instrumento. Sin embargo, para perfiles agresivos se puede
                considerar una política Activa. Todos los portafolios deben
                contar con un porcentaje de liquidez para rebalanceos y para
                cubrir eventuales requerimientos de los inversionistas. La
                selección de acciones y de instrumentos de deuda se basa en la
                calidad de las condiciones fundamentales y en los lineamientos
                acordados por el comité de inversiones.
              </p>
              <h2 id="riesgos" className={headingClasses}>
                Riesgos de Inversión
              </h2>
              <p>
                El cliente puede estar expuesto a diversos riesgos, incluyendo:
                Riesgo de Crédito, de Mercado, de Liquidez, Operativo, de
                Contraparte y Legal. Se le informa al cliente de estos riesgos
                inherentes a los mercados financieros.
              </p>
              <h2 id="operaciones-referencias" className={headingClasses}>
                Operaciones y Referencias
              </h2>
              <p>
                Las operaciones que el Asesor realiza son de compra, venta y
                reportos de instrumentos negociados en el mercado de dinero y de
                capitales, limitadas a instrumentos listados en la BMV, BIVA y
                en el Sistema Internacional de Cotizaciones (&quot;SIC&quot;).
                Las referencias para consultar información sobre los valores
                incluyen sitios web como bmv.com.mx, biva.mx, valmer.com.mx, y
                banxico.org.mx.
              </p>
              <h2 id="excepciones" className={headingClasses}>
                Excepciones
              </h2>
              <p>
                El Asesor podrá exceptuar la aplicación de la política cuando se
                presenten eventos como volatilidades extremas en el mercado,
                incumplimiento de emisores, &quot;eventos relevantes&quot; que
                afecten a una emisora, o por instrucciones expresas y
                documentadas del cliente para incluir valores fuera de la
                estrategia.
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MarcoGeneralActuacionPage;
