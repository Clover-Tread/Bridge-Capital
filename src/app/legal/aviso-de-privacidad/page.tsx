"use client"; // Necesario para usar hooks de React como useState y useEffect

import React, { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";

// Datos para la barra de navegación lateral (índice)
const sections = [
  { href: "#identidad", title: "1. Identidad del Responsable" },
  { href: "#datos-personales", title: "2. Datos Personales Recabados" },
  { href: "#datos-sensibles", title: "3. Datos Sensibles y de Menores" },
  { href: "#finalidades", title: "4. Finalidades del Tratamiento" },
  { href: "#transferencias", title: "5. Transferencia de Datos" },
  { href: "#derechos-arco", title: "6. Derechos ARCO" },
  { href: "#limitar-uso", title: "7. Limitar Uso o Divulgación" },
  { href: "#cookies", title: "8. Uso de Cookies" },
  { href: "#autoridad", title: "9. Autoridad de Protección de Datos" },
  { href: "#contacto", title: "10. Contacto" },
  { href: "#modificaciones", title: "11. Modificaciones" },
];

const AvisoDePrivacidadPage = () => {
  // Estado para guardar el ID de la sección activa
  const [activeSection, setActiveSection] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Lógica del Intersection Observer
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    // Opciones para que la detección funcione bien con el navbar fijo
    const options = {
      rootMargin: "-120px 0px -70% 0px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(observerCallback, options);
    const currentObserver = observerRef.current;

    // Observamos cada sección
    sections.forEach((section) => {
      const element = document.querySelector(section.href);
      if (element) {
        currentObserver.observe(element);
      }
    });

    // Limpieza al desmontar el componente
    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, []); // El array vacío asegura que esto solo se ejecute una vez

  // Clases unificadas para todos los títulos de sección
  const headingClasses =
    "text-2xl md:text-3xl font-bold text-gray-800 mt-12 mb-4 scroll-mt-40";

  return (
    <>
      {/* SECCIÓN DEL ENCABEZADO GRIS */}
      <header className="bg-gray-100 py-16 md:py-24">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
            AVISO DE PRIVACIDAD
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
                      // Aplicamos un estilo diferente si la sección está activa
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

          {/* COLUMNA DERECHA: CONTENIDO DEL AVISO */}
          <main className="lg:w-3/4">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <div className="mb-8 p-4 border-l-4 border-gray-200 bg-gray-50 rounded-r-lg">
                <p className="text-sm text-gray-600 font-semibold">
                  Fecha de última actualización: 05 de agosto de 2021
                </p>
                <a
                  href="/documentos/BC_Aviso_Privacidad.pdf" // Asegúrate de colocar tu PDF en la carpeta /public/documentos
                  download
                  className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors">
                  <Download size={16} />
                  Descargar Versión en PDF
                </a>
              </div>

              <p>
                Bienvenido al Aviso de Privacidad Integral para Prospectos,
                Clientes y Usuarios de las Redes Sociales (LinkedIn y Facebook
                de BRIDGE CAPITAL) y el sitio web: http://www.bridgecapital.mx/
              </p>
              <p>
                Este documento proporciona información sobre el uso de sus datos
                personales cuando adquiere servicios, cuando solicita
                información comercial, cuando se suscribe a nuestras
                comunicaciones periódicas, o bien, cuando navega por alguna de
                las Redes Sociales y el sitio web señalados en el párrafo
                anterior.
              </p>
              <p>
                En ese tenor de ideas y en cumplimiento a lo dispuesto por la
                Ley Federal de Protección de Datos Personales en Posesión de los
                Particulares (en adelante, la Ley), su Reglamento y demás
                normatividad aplicable en la materia, ponemos a su disposición
                en el presente Aviso de Privacidad, la existencia y
                características principales del tratamiento al que serán
                sometidos sus datos personales, con el objeto de que usted pueda
                ejercer sus derechos a la autodeterminación informativa,
                privacidad y protección de datos personales.
              </p>

              <h2 id="identidad" className={headingClasses}>
                1. Identidad y domicilio del Responsable
              </h2>
              <p>
                BC ASESORES INDEPENDIENTES, S.A.P.I. DE C.V., conocido
                comercialmente como "BRIDGE CAPITAL", es el responsable del
                tratamiento de sus datos personales, con domicilio en Calle
                Ernesto Elorduy número 91, interior 2, Colonia Guadalupe Inn,
                Alcaldía Álvaro Obregón, C.P. 01020 en la Ciudad de México.
              </p>

              <h2 id="datos-personales" className={headingClasses}>
                2. Datos Personales que recaba el Responsable
              </h2>
              <p>
                Para cumplir con las finalidades que describimos más adelante,
                BRIDGE CAPITAL recaba las categorías de datos personales que a
                continuación señalamos:
              </p>
              <ol>
                <li>Datos de Identificación;</li>
                <li>Datos de Contacto</li>
                <li>
                  Datos de navegación y dispositivos, como dirección IP,
                  ubicación geográfica, tipo de navegador, tipo de sistema,
                  contenido y páginas visitadas.
                </li>
              </ol>
              <p>
                Podemos recabar estas categorías de datos personales de manera
                directa o indirecta; por lo que nuestro Aviso de Privacidad
                siempre será puesto a su disposición para su consulta, en
                cualquier momento que usted así lo requiera o solicite.
              </p>

              <h2 id="datos-sensibles" className={headingClasses}>
                3. ¿Tratamos datos personales sensibles?
              </h2>
              <p>
                Para cumplir con las finalidades descritas en este Aviso, le
                informamos que BRIDGE CAPITAL no trata, ni solicita datos
                personales sensibles.
              </p>
              <p>
                Si usted proporciona datos de identificación y de contacto de
                terceras personas para finalidades de atención al cliente o
                información comercial, deberá informarles sobre la existencia
                del tratamiento de sus datos personales y el contenido de este
                Aviso de Privacidad. Cuando usted proporciona datos personales
                de terceros manifiesta con su entrega que cuenta con el
                consentimiento de sus titulares para proporcionar su información
                a BRIDGE CAPITAL.
              </p>
              <p>
                Para las finalidades establecidas en el presente Aviso de
                Privacidad, BRIDGE CAPITAL no solicita datos personales de
                menores de edad a través de formularios o cuestionarios. Si a
                pesar de lo anterior, usted proporciona datos personales de
                menores de edad, o estos los proporcionan directamente a BRIDGE
                CAPITAL, entenderemos que sus padres o tutores han consentido la
                entrega de dichos datos. Los padres y tutores podrán ejercer en
                todo momento los derechos ARCO o revocar el consentimiento para
                el tratamiento de los datos personales de menores de edad que
                hubiesen proporcionado a BRIDGE CAPITAL, en aquellos supuestos
                que la legislación vigente así lo permita.
              </p>

              <h2 id="finalidades" className={headingClasses}>
                4. Finalidades del tratamiento de sus datos personales
              </h2>
              <p>
                Tratamos datos personales para dos tipos de finalidades:
                primarias y secundarias. BRIDGE CAPITAL tratará sus datos
                personales para las siguientes{" "}
                <strong>FINALIDADES PRIMARIAS:</strong>
              </p>
              <ol>
                <li>
                  Para ofrecerle los productos y servicios que ponemos a su
                  disposición a través de nuestras redes sociales y sitio web.
                </li>
                <li>
                  Contactarle para proporcionarle información sobre los
                  servicios y productos que ponemos a su disposición, cuando así
                  lo solicite en nuestra página web, vía telefónica, correo
                  electrónico, o bien, a través de mensajería instantánea de
                  texto.
                </li>
                <li>
                  Dar seguimiento a quejas, sugerencias, denuncias, dudas y/o
                  aclaraciones.
                </li>
                <li>
                  Gestionar su alta correspondiente en nuestros canales de
                  comunicación como newsletters o blogs y, comunicar a usted, la
                  publicación de nuevo contenido en dichos canales.
                </li>
                <li>
                  Control y administración sobre el alta y gestión de nuestra
                  relación con clientes.
                </li>
                <li>
                  En su caso, análisis de datos mediante el uso de tecnologías
                  de analítica, inteligencia artificial y/o big data, con el
                  objeto de evaluar el uso de nuestros servicios en línea,
                  mejorar sus prestaciones y/o corregir errores.
                </li>
                <li>
                  Para cumplir obligaciones y requerimientos judiciales o
                  administrativos, incluyendo la entrega de información sobre
                  fraudes o suplantaciones de identidad.
                </li>
                <li>
                  Archivo de información sobre el uso de nuestros servicios para
                  el cumplimiento de las disposiciones legales aplicables,
                  incluyendo la defensa de los intereses de BRIDGE CAPITAL ante
                  instancias judiciales o administrativas.
                </li>
              </ol>
              <p>
                De manera adicional, si usted no ha manifestado su oposición,
                BRIDGE CAPITAL podrá tratar sus datos personales para las
                siguientes <strong>FINALIDADES SECUNDARIAS:</strong>
              </p>
              <ol>
                <li>
                  Envío de comunicaciones comerciales, publicitarias,
                  promocionales e informativas, así como ofertas personalizadas
                  basadas en sus intereses y antecedentes de consumo,
                  relacionadas con los servicios y productos que comercializa
                  BRIDGE CAPITAL, marcas de nuestros socios comerciales. Tales
                  comunicaciones incluyen el envío de correos electrónicos, SMS,
                  llamadas telefónicas, y otras formas de comunicación
                  electrónica o postal.
                </li>
                <li>
                  Levantamiento de encuestas de satisfacción, hábitos de consumo
                  y/o estudios para mejora de nuestros servicios.
                </li>
                <li>
                  Envío de invitaciones para eventos, ferias, exhibiciones,
                  presentaciones, concursos, capacitaciones, promociones u otro
                  tipo de actividades organizadas o patrocinadas por BRIDGE
                  CAPITAL.
                </li>
                <li>
                  Generación de perfiles de usuarios, mediante el uso de
                  tecnología analítica o big data.
                </li>
              </ol>
              <p>
                Si cambia de opinión, usted puede oponerse al tratamiento de sus
                datos personales para las finalidades secundarias antes
                indicadas, e incluso puede revocar su consentimiento para tales
                efectos. En dichos casos, podrá comunicar su decisión a través
                del procedimiento previsto en la sección "Derechos ARCO y/o
                Revocación del Consentimiento para el Tratamiento de Datos
                Personales" del presente Aviso de Privacidad.
              </p>

              <h2 id="transferencias" className={headingClasses}>
                5. ¿Con quién podemos compartir sus datos personales?
              </h2>
              <p>
                BRIDGE CAPITAL podrá compartir su información (llevar a cabo
                transferencias de datos personales), tanto dentro, como fuera de
                México, en los siguientes casos y para las finalidades
                indicadas:
              </p>
              <ul>
                <li>
                  a. Hacia nuestra empresa matriz, empresas afiliadas o
                  subsidiarias de BRIDGE CAPITAL, con finalidades de resguardo
                  centralizado de la información o archivo de información sobre
                  el uso de nuestros servicios.
                </li>
                <li>
                  b. Autoridades judiciales o administrativas, para el
                  cumplimiento de obligaciones legales de información o de
                  requerimientos de información debidamente fundados y motivados
                  en la normatividad que aplique.
                </li>
              </ul>
              <p>
                La Ley establece que las transferencias de datos personales
                antes indicadas no requieren de su consentimiento para poder ser
                efectuadas, pero sí estamos obligados a informar sobre ellas.
                Cualquier transferencia de sus datos personales que sí requiera
                de su consentimiento para efectuarse, será informada
                previamente, a través de la comunicación correspondiente y de la
                actualización al presente Aviso de Privacidad.
              </p>

              <h2 id="derechos-arco" className={headingClasses}>
                6. Derechos ARCO y/o Revocación del Consentimiento para el
                tratamiento de datos personales
              </h2>
              <p>
                En todos los casos legalmente procedentes, usted o su
                representante legal, podrá ejercer cualquiera de los Derechos de
                Acceso, Rectificación, Cancelación y Oposición (en lo sucesivo,
                Derechos ARCO), así como a Revocar su Consentimiento para el
                tratamiento o transferencia de sus datos personales, por lo que
                en cualquier momento podrá enviar una solicitud a nuestro
                Departamento de Protección de Datos Personales a través del
                siguiente correo electrónico:{" "}
                <strong>legal@bridgecapital.mx</strong>.
              </p>
              <p>
                Le recordamos que los Derechos ARCO y/o Revocación del
                Consentimiento sólo pueden ser ejercidos por el titular o su
                representante legal previa acreditación de su identidad, razón
                por la cual la solicitud que nos envíe debe acompañarse con la
                digitalización de alguna identificación oficial, como puede ser
                alguna de las siguientes: INE, Pasaporte o Documento Migratorio
                que constate la legal estancia del extranjero en el país.
              </p>
              <p>
                Asimismo, le informamos que para que su solicitud proceda es
                indispensable completar toda la información que a continuación
                le enunciamos, misma que será utilizada para acreditar su
                identidad:
              </p>
              <ul>
                <li>
                  <strong>DATOS DEL TITULAR:</strong> Nombre completo, teléfono
                  y correo electrónico (donde se le comunicará la respuesta a su
                  solicitud).
                </li>
                <li>
                  <strong>
                    INFORMACIÓN DEL REPRESENTANTE (SÓLO SI APLICA):
                  </strong>{" "}
                  Nombre completo. En caso de ser representante legal del
                  titular deberá acompañar a su escrito el instrumento público
                  correspondiente en original, o en su caso, carta poder firmada
                  ante dos testigos.
                </li>
                <li>
                  <strong>DERECHOS ARCO:</strong> Indicar el/los derecho(s) que
                  desea ejercer: Acceso, Rectificación, Cancelación y/u
                  Oposición. Asimismo se deberá hacer una descripción de los
                  datos personales respecto de los que se busca ejercer el/los
                  derecho(s) señalados anteriormente y/o cualquier otro
                  comentario que nos ayude a atender mejor su solicitud.
                </li>
                <li>
                  <strong>OTRA DOCUMENTACIÓN NECESARIA:</strong> Favor de
                  acompañar la documentación que usted considere para sustentar
                  su solicitud y nos ayude a tramitarla convenientemente. En
                  particular, en la solicitud de Rectificación de datos
                  personales (dato incorrecto, dato correcto y documento que
                  acredite su información).
                </li>
              </ul>
              <p>
                En caso de que la información proporcionada en su solicitud sea
                errónea o insuficiente, o bien, no se acompañen los documentos
                de acreditación correspondientes, el Departamento de Protección
                de Datos Personales de BRIDGE CAPITAL, dentro de los cinco (5)
                días hábiles siguientes a la recepción de la solicitud, podrá
                requerirle que aporte los elementos o documentos necesarios para
                dar trámite a la misma. Usted contará con diez (10) días hábiles
                para atender el requerimiento, contados a partir del día
                siguiente en que lo haya recibido. De no dar respuesta en dicho
                plazo, se tendrá por no presentada la solicitud correspondiente.
              </p>
              <p>
                El Departamento de Protección de Datos Personales de BRIDGE
                CAPITAL le comunicará la determinación adoptada, en un plazo
                máximo de veinte (20) días hábiles contados desde la fecha en
                que se recibió la solicitud, a efecto de que, si resulta
                procedente, haga efectiva la misma dentro de los quince (15)
                días hábiles siguientes a que se comunique la respuesta. La
                respuesta se proporcionará vía electrónica a la dirección de
                correo que se especifique en su solicitud.
              </p>
              <p>
                Respecto a las solicitudes de ejercicio de derecho de
                Cancelación, es importante señalar que no es absoluto, por favor
                tome en cuenta que debemos almacenar información que nos
                permiten cumplir con obligaciones legales. En este caso, sus
                datos personales permanecerán bloqueados y solamente se darán a
                conocer a petición de autoridades competentes cuando exista un
                requerimiento debidamente fundado y motivado.
              </p>

              <h2 id="limitar-uso" className={headingClasses}>
                7. Medios para limitar el uso o divulgación de sus datos
              </h2>
              <p>
                Si usted revoca su consentimiento y dicha revocación es
                procedente, BRIDGE CAPITAL dejará de tratar sus datos personales
                para las finalidades indicadas en este Aviso. Usted podrá
                limitar el uso o divulgación de sus datos personales dirigiendo
                la solicitud correspondiente a nuestro Departamento de
                Protección de Datos Personales a través del correo:{" "}
                <strong>legal@bridgecapital.mx</strong>. Los requisitos para
                acreditar su identidad, así como el procedimiento para atender
                su solicitud serán los mismos que los señalados para el
                ejercicio de los Derechos ARCO.
              </p>
              <p>
                BRIDGE CAPITAL cuenta con medios y procedimientos para asegurar
                la inclusión de algunos de sus datos en listados de exclusión
                propios, cuando usted solicita su inclusión en ellos de forma
                expresa. BRIDGE CAPITAL otorgará a los titulares que soliciten
                su registro, la constancia de inscripción correspondiente.
              </p>

              <h2 id="cookies" className={headingClasses}>
                8. Uso de Cookies
              </h2>
              <p>
                En nuestro sitio web (http://www.bridgecapital.mx/) usamos
                cookies y otros medios que permiten recabar información cuando
                usted nos visita y navega a través de esta. Las cookies
                utilizadas por BRIDGE CAPITAL permiten recabar, analizar y
                conservar información electrónica relacionada con sus hábitos de
                navegación y el uso de nuestros canales de comunicación y
                formularios para compras en línea. Las cookies permiten recabar
                información de forma automática, en el momento mismo en que el
                usuario hace uso de la web y nuestros servicios en línea.
              </p>
              <p>
                Para obtener información más detallada acerca de las cookies y
                la forma en que puede deshabilitarlas en función de su navegador
                y sistema operativo, recomendamos que visite el sitio
                ***************** **, en el que se explica paso a paso como
                deshabilitarlas. Debe saber que, si desactiva las cookies o
                impide su instalación, es posible que no pueda usar de manera
                completa o correcta algunas funciones de nuestra página web:
                http://www.bridgecapital.mx/
              </p>

              <h2 id="autoridad" className={headingClasses}>
                9. Autoridad en materia de Protección de Datos Personales
              </h2>
              <p>
                En caso de considerarlo necesario, le informamos que tiene el
                derecho de acudir ante el Instituto Nacional de Transparencia,
                Acceso a la Información y Protección de Datos Personales (INAI),
                para hacer valer cualquier inconformidad relacionada con su
                Derecho a la Protección de Datos Personales.
              </p>

              <h2 id="contacto" className={headingClasses}>
                10. Contacto para dudas o aclaraciones
              </h2>
              <p>
                Nuestro Departamento de Protección de Datos Personales queda a
                sus órdenes para proporcionarle cualquier información adicional
                que requiera o, en su caso, para resolver cualquier duda que
                pudiera surgirle en materia de privacidad y protección de datos
                personales, para lo que podrá contactarnos a través del correo
                electrónico: <strong>legal@bridgecapital.mx</strong>.
              </p>

              <h2 id="modificaciones" className={headingClasses}>
                11. Modificaciones y actualizaciones
              </h2>
              <p>
                El presente Aviso de Privacidad puede sufrir modificaciones,
                cambios o actualizaciones derivadas de nuevos requerimientos
                legales; de nuestras propias necesidades por los servicios que
                ofrecemos; de nuestras prácticas de privacidad; de cambios en
                nuestro modelo de negocio, por lo que BRIDGE CAPITAL se
                compromete a mantenerlo informado sobre los cambios que pueda
                sufrir el presente Aviso de Privacidad.
              </p>
              <p>
                Usted podrá solicitar en todo momento este documento al
                Departamento de Protección de Datos Personales de BRIDGE CAPITAL
                a la cuenta de correo electrónico: legal@bridgecapital.mx, o
                bien, podrá consultar su publicación en la sección "Avisos de
                Privacidad" y que estará disponible en la página web:
                http://www.bridgecapital.mx/
              </p>

              <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm">
                <p className="font-bold">ATENTAMENTE</p>
                <p className="mt-1 font-semibold">-BRIDGE CAPITAL-</p>
                <p className="mt-1 font-semibold">
                  BC ASESORES INDEPENDIENTES, S.A.P.I. DE C.V.
                </p>
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

export default AvisoDePrivacidadPage;
