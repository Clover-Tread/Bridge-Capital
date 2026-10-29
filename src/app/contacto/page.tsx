// app/contacto/page.tsx
import type { Metadata } from "next";
import ContactHeaderSection from "./ContactHeaderSection";
import PreContactCTASection from "./PreContactCTASection";
import { ContactModal } from "./ContactModal";
import FAQSection, { faqData } from "./FAQSection";

export const metadata: Metadata = {
  title: "Contacto | Habla con un Asesor en Inversiones",
  description:
    "Agenda una conversación con un asesor de Bridge Capital. Resolvemos tus dudas sobre monto mínimo, comisiones, documentos y dónde se resguarda tu dinero.",
  alternates: { canonical: "/contacto" },
};

// Schema FAQPage: permite que las preguntas aparezcan como resultado enriquecido en Google.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function ContactoPage() {
  // El layout raíz ya envuelve todo en <main>; aquí no se repite.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactHeaderSection />
      <ContactModal>
        <PreContactCTASection />
      </ContactModal>
      <FAQSection />
    </>
  );
}
