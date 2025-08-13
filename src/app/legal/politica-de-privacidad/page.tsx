"use client";

import React, { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";

const sections = [
  { href: "#aspectos-importantes", title: "Aspectos Importantes" },
  { href: "#terminos-definiciones", title: "1. Términos y Definiciones" },
  { href: "#informacion-recabada", title: "2. Información que Recabamos" },
  { href: "#seguridad", title: "3. Seguridad de la Información" },
  { href: "#derechos-arco", title: "4. Derechos ARCO" },
  { href: "#limitar-uso", title: "5. Limitar Uso o Divulgación" },
  { href: "#autoridad", title: "6. Autoridad de Privacidad" },
  { href: "#contacto", title: "7. Contacto" },
  { href: "#informacion-adicional", title: "8. Información Adicional" },
  { href: "#cambios-politica", title: "9. Cambios a la Política" },
];

const PoliticaDePrivacidadPage = () => {
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
            POLÍTICA DE PRIVACIDAD
          </h1>
        </div>
      </header>
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <aside className="lg:w-1/4">
            <nav className="lg:sticky lg:top-40">
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
              <div className="mb-8 p-4 border-l-4 border-gray-200 bg-gray-50 rounded-r-lg">
                <p className="text-sm text-gray-600 font-semibold">
                  Fecha de última actualización: 05 de agosto de 2021
                </p>
                <a
                  href="/documentos/BC_Politica_Privacidad.pdf"
                  download
                  className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors">
                  <Download size={16} />
                  Descargar Versión en PDF
                </a>
              </div>
              <p>
                BC ASESORES INDEPENDIENTES, S.A.P.I. DE C.V. (en adelante,
                BRIDGE CAPITAL), se apega en total cumplimiento a lo establecido
                por la Ley Federal de Protección de Datos Personales en Posesión
                de los Particulares, su Reglamento y demás normatividad
                aplicable en la materia, buscando garantizar en todo momento el
                tratamiento legítimo, controlado e informado de los datos
                personales, en aras de proteger la privacidad de los mismos y
                velar por los derechos correspondientes en materia de protección
                de datos personales de todo aquel que visite o sea usuario de la
                página web http://www.bridgecapital.mx/, misma que ponemos a
                disposición del público en general.
              </p>
              <p>
                Conforme a lo anterior, BRIDGE CAPITAL ha elaborado la presente
                Política que contiene el conjunto de acciones internas, con las
                cuales se pretende la adaptación e incorporación de BRIDGE
                CAPITAL al cumplimiento de las normas legales vigentes en
                materia de Protección de Datos Personales.
              </p>
              <p>
                Asimismo, la presente Política de Privacidad y Manejo de Datos
                Personales tiene como objetivo fundamental crear un estándar
                legal y práctico en el tratamiento legítimo y responsable de los
                datos personales al interior de BRIDGE CAPITAL.
              </p>
              <h2 id="aspectos-importantes" className={headingClasses}>
                Aspectos Importantes a Considerar
              </h2>
              <ul>
                <li>
                  Los datos personales de los Titulares sólo pueden utilizarse a
                  partir del momento en que se haya puesto a disposición de los
                  mismos el respectivo Aviso de Privacidad de BRIDGE CAPITAL por
                  los diferentes medios establecidos.
                </li>
                <li>
                  Los datos personales de los Titulares sólo pueden ser
                  utilizados para los fines comunicados en el Aviso de
                  Privacidad de BRIDGE CAPITAL.
                </li>
                <li>
                  Para poder realizar el tratamiento de datos personales de los
                  Titulares, es necesario obtener su consentimiento, salvo que
                  tenga el propósito de cumplir con las obligaciones derivadas
                  de una relación jurídica u otras excepciones previstas en la
                  legislación aplicable a la materia. No obstante, en caso de
                  duda es preferible optar por la obtención del mismo.
                </li>
                <li>
                  Si los datos personales son patrimoniales y/o financieros, se
                  requerirá en todo momento obtener el consentimiento
                  correspondiente, mismo que podrá ser de manera expresa y por
                  escrito, o bien, a través de cualquier tecnología.
                </li>
                <li>
                  Los Titulares tienen derecho, en todo momento, a acceder a sus
                  datos personales, a rectificarlos cuando sean inexactos o
                  incompletos, a cancelarlos cuando el tratamiento sea ilegítimo
                  o a oponerse a su uso para determinados fines (Derechos ARCO).
                  El Departamento de Protección de Datos Personales de BRIDGE
                  CAPITAL será encargado de dar trámite a las solicitudes de los
                  titulares para el ejercicio de sus Derechos ARCO.
                </li>
              </ul>
              <h2 id="terminos-definiciones" className={headingClasses}>
                1. Términos y Definiciones
              </h2>
              <ul>
                <li>
                  <strong>Aviso de Privacidad:</strong> Documento físico,
                  electrónico o en cualquier otro formato generado by BRIDGE
                  CAPITAL y que es puesto a disposición del Titular, previo al
                  tratamiento de sus datos personales.
                </li>
                <li>
                  <strong>Confidencialidad:</strong> Propiedad de la información
                  para no estar a disposición o ser revelada a personas,
                  entidades o procesos no autorizados.
                </li>
                <li>
                  <strong>Consentimiento:</strong> Manifestación de la voluntad
                  del Titular, mediante la cual se efectúa el tratamiento de su
                  información y datos personales.
                </li>
                <li>
                  <strong>Datos Personales:</strong> Cualquier información
                  concerniente a una persona física identificada o
                  identificable.
                </li>
                <li>
                  <strong>Datos Personales Sensibles:</strong> Aquellos datos
                  personales que afecten a la esfera más íntima de su Titular, o
                  cuya utilización indebida pueda dar origen a discriminación o
                  conlleve un riesgo grave para éste.
                </li>
                <li>
                  <strong>Derechos ARCO:</strong> Derechos de Acceso,
                  Rectificación, Cancelación y Oposición.
                </li>
                <li>
                  <strong>Titular:</strong> La persona física a quien
                  corresponden los datos personales.
                </li>
              </ul>
              <h2 id="informacion-recabada" className={headingClasses}>
                2. ¿Qué Información y Datos Recabamos?
              </h2>
              <p>
                Cuando accede a nuestra página web, recolectamos la información
                personal que nos proporciona como usuario, tal como: datos
                personales de identificación, de contacto, de transacciones,
                patrimoniales y/o financieros, así como datos de navegación y
                dispositivos, como dirección IP, ubicación geográfica, tipo de
                navegador, tipo de sistema, contenido y páginas visitadas.
              </p>
              <p>
                Es importante señalar que cuando navega en nuestra página web
                http://www.bridgecapital.mx/ podemos hacer uso de Cookies, SDK y
                otras tecnologías, a través de las cuales es posible monitorear
                su comportamiento como usuario.
              </p>
              <h2 id="seguridad" className={headingClasses}>
                3. Seguridad de la Información
              </h2>
              <p>
                Para proteger tu información personal, tomamos precauciones
                razonables y seguimos las mejores prácticas de la industria para
                asegurarnos de que no haya pérdida de manera inapropiada, mal
                uso, acceso, divulgación, alteración o destrucción de esta.
              </p>
              <h2 id="derechos-arco" className={headingClasses}>
                4. Derechos ARCO y Revocación del Consentimiento
              </h2>
              <p>
                Usted o su representante legal, podrá ejercer cualquiera de los
                Derechos de Acceso, Rectificación, Cancelación u Oposición
                (&quot;Derechos ARCO&quot;), así como Revocar su Consentimiento
                para el tratamiento de sus datos personales enviando un correo
                electrónico a nuestro Departamento de Protección de Datos
                Personales a la dirección:{" "}
                <strong>legal@bridgecapital.mx</strong>.
              </p>
              <p>
                La solicitud debe acompañarse con la digitalización de una
                identificación oficial (INE, Pasaporte, etc.) para acreditar su
                identidad y debe incluir la información completa solicitada en
                nuestro Aviso de Privacidad.
              </p>
              <h2 id="limitar-uso" className={headingClasses}>
                5. Medios para Limitar el Uso o la Divulgación de sus Datos
              </h2>
              <p>
                Usted podrá limitar el uso o divulgación de sus datos personales
                enviando su solicitud a <strong>legal@bridgecapital.mx</strong>.
                Si su solicitud es procedente se le registrará en el listado de
                exclusión propio de BRIDGE CAPITAL. Adicionalmente, existen
                otros mecanismos como el Registro Público para Evitar Publicidad
                (REPEP) de la PROFECO.
              </p>
              <h2 id="autoridad" className={headingClasses}>
                6. Autoridad de Privacidad y Protección de Datos Personales
              </h2>
              <p>
                En caso de considerarlo necesario, le informamos que tiene el
                derecho de acudir ante el Instituto Nacional de Transparencia,
                Acceso a la Información y Protección de Datos Personales (INAI)
                para hacer valer cualquier inconformidad.
              </p>
              <h2 id="contacto" className={headingClasses}>
                7. Contacto para Dudas o Aclaraciones
              </h2>
              <p>
                Nuestro Departamento de Protección de Datos Personales queda a
                sus órdenes para resolver cualquier duda en materia de
                privacidad a través del correo:{" "}
                <strong>legal@bridgecapital.mx</strong>.
              </p>
              <h2 id="informacion-adicional" className={headingClasses}>
                8. Información Adicional a la Política
              </h2>
              <ol>
                <li>
                  Reunimos información de carácter no personal (tipo de
                  explorador, sistema operativo, etc.) para administrar nuestro
                  sitio web.
                </li>
                <li>
                  Utilizamos Cookies y otras tecnologías para administrar
                  nuestro sitio y programas de correo, pero no para reunir o
                  almacenar información de carácter personal.
                </li>
                <li>
                  Los datos que ingrese en los formularios no serán difundidos,
                  distribuidos o comercializados.
                </li>
                <li>
                  Puede solicitar la baja de nuestra base de datos en cualquier
                  momento enviando un correo a:{" "}
                  <strong>legal@bridgecapital.mx</strong>.
                </li>
                <li>
                  Su petición puede ser incluida en informes estadísticos
                  anónimos.
                </li>
                <li>
                  Sus datos personales podrán ser transferidos a terceros de
                  acuerdo con lo estrictamente señalado en el artículo 37 de la
                  Ley.
                </li>
              </ol>
              <h2 id="cambios-politica" className={headingClasses}>
                9. Cambios a la Política de Privacidad y Manejo de Datos
                Personales
              </h2>
              <p>
                La presente Política puede sufrir modificaciones, cambios o
                actualizaciones. BRIDGE CAPITAL se compromete a mantenerlo
                informado sobre los cambios que pueda sufrir la misma. Puede
                solicitar este documento o consultar su publicación en nuestro
                sitio web.
              </p>
              <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm">
                <p className="font-bold">ATENTAMENTE</p>
                <p className="mt-1 font-semibold">BRIDGE CAPITAL</p>
                <p className="mt-2 text-gray-500">
                  Calle Ernesto Elorduy número 91, interior 2, Colonia Guadalupe
                  Inn, Alcaldía Álvaro Obregón, C.P. 01020 en la Ciudad de
                  México
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PoliticaDePrivacidadPage;
