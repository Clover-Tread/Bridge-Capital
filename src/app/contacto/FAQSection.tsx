// src/components/contacto/FAQSection.tsx
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


// Datos para el FAQ
export const faqData = [
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
      "El monto mínimo para comenzar a invertir es desde $3,000,000.00 de pesos.",
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
      "Si eres persona física, se requieren: Identificación Oficial Vigente (IFE/INE/Pasaporte), Comprobante de Domicilio no mayor a 3 meses (recibo de luz, agua, telefonía fija, predial), Cédula RFC, CURP, Carátula y hoja donde viene el sello digital de estado de cuenta bancario que se quiera registrar para los retiros de dinero.\n\nSi eres persona moral, se requieren: Acta Constitutiva con sello de registro público de comercio, Poderes de las personas que firmarán dentro de la cuenta con sello de registro público de comercio, Cédula RFC de la empresa, Comprobante de domicilio de la empresa, Identificaciones Oficiales Vigentes de los apoderados (INE/Pasaporte), Cédula RFC de los apoderados.",
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
    <section className="bg-[var(--color-paper-deep)] text-[var(--color-ink)]">
      <div className="mx-auto grid max-w-screen-xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 className="t-h2">Preguntas frecuentes</h2>
          <p className="t-lead mt-6">
            Lo que más nos preguntan antes de la primera conversación.
          </p>
        </div>
        <Accordion type="single" collapsible className="lg:col-span-7 lg:col-start-6 border-t border-[var(--color-rule)]">
          {faqData.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="border-b border-[var(--color-rule)]">
              <AccordionTrigger className="py-6 text-left font-[family-name:var(--font-display)] text-[1.375rem] leading-snug font-normal text-[var(--color-ink)] hover:no-underline focus-visible:ring-[var(--color-night)]/40">
                {item.question}
              </AccordionTrigger>
              {/* forceMount: la respuesta siempre está en el HTML (indexable por Google);
                  el CSS la oculta cuando el acordeón está cerrado. */}
              <AccordionContent
                forceMount
                className="t-body pb-6 text-[var(--color-stone)]">
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
