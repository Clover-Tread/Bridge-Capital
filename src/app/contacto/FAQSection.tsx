// src/components/contacto/FAQSection.tsx
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Clases compartidas para la alineación del ancho
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

// Datos para el FAQ
const faqData = [
  {
    id: "faq-1",
    question: "¿Qué es un Asesor en Inversiones Independiente?",
    answer:
      "Un Asesor en Inversiones Independiente es una persona física o moral que, sin pertenecer a ninguna institución financiera, proporciona de manera habitual y profesional servicios de administración de cartera de valores tomando decisiones de inversión a nombre y por cuenta de sus clientes, otorgando de manera habitual y profesional asesoría de inversión en valores, análisis y emisión de recomendaciones de inversión de manera individualizada.",
  },
  {
    id: "faq-2",
    question: "¿Quiénes pueden solicitar nuestros servicios?",
    answer:
      "Nuestros servicios están disponibles para: Personas Físicas, Personas Morales, Fideicomisos, y Entidades Gubernamentales.",
  },
  {
    id: "faq-3",
    question: "¿Cuánto es el monto mínimo para invertir?",
    answer:
      "El monto mínimo para comenzar a invertir es desde $5,000,000.00 de pesos.",
  },
  {
    id: "faq-4",
    question: "¿Qué hace Bridge Capital?",
    answer:
      "Bridge Capital te ayuda a alcanzar tus metas construyendo un portafolio de inversión a tu medida, buscando invertir tu patrimonio en empresas con ventajas competitivas durables que generen valor a lo largo de los años, no de meses o días.",
  },
  {
    id: "faq-5",
    question: "¿Cuáles son los documentos para ser cliente de Bridge Capital?",
    answer:
      "Si eres persona física, se requieren: Identificación Oficial Vigente (IFE/INE/Pasaporte), Comprobante de Domicilio no mayor a 3 meses (recibo de luz, agua, telefonía fija, predial), Cédula RFC, CURP, Carátula y hoja donde viene el sello digital de estado de cuenta bancario que se quiera registrar para los retiros de dinero. [cite: 6]\n\nSi eres persona moral, se requieren: Acta Constitutiva con sello de registro público de comercio, Poderes de las personas que firmarán dentro de la cuenta con sello de registro público de comercio, Cédula RFC de la empresa, Comprobante de domicilio de la empresa, Identificaciones Oficiales Vigentes de los apoderados (INE/Pasaporte), Cédula RFC de los apoderados.",
  },
  {
    id: "faq-6",
    question: "¿Cómo cobra Bridge Capital?",
    answer:
      'Los honorarios de Bridge Capital se dividen en dos: Comisión por Administración de Activos ("Management Fee"), que es un porcentaje fijo mensual sobre los activos administrados, y una Comisión por Resultados ("Success Fee"), que es un premio si se generan rendimientos positivos por encima de un rendimiento base pactado anualmente.',
  },
  {
    id: "faq-7",
    question: "¿Dónde estaría mi dinero?",
    answer:
      "Tu dinero estará siempre resguardado en una cuenta de inversión a tu nombre en alguna de las instituciones financieras reconocidas. Nosotros solo te ayudamos a decidir en qué negocio invertirlo.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-12 md:py-20 bg-white w-full">
      <div
        className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}`}>
        <div className="text-center mb-10 md:mb-12">
          <h3 className="text-3xl md:text-4xl text-(--color-primary))">
            <span className="text-3xl md:text-6xl font-[800] mb-4">
              ¿Tienes dudas?
            </span>{" "}
            <br />
            <span className="text-3xl font-[500]">
              Revisa nuestras preguntas frecuentes
            </span>
          </h3>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto">
          {faqData.map((item) => (
            <AccordionItem value={item.id} key={item.id}>
              <AccordionTrigger className="text-left text-lg hover:no-underline font-[600] text-(--color-primary) hover:text-[var(--color-dark-grey)]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-(--color-primary) text-base leading-relaxed pt-2 pb-4">
                {/* Para renderizar saltos de línea en la respuesta */}
                {item.answer.split("\n").map((paragraph, index) => (
                  <p key={index} className={index > 0 ? "mt-3" : ""}>
                    {paragraph}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
