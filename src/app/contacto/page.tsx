// app/contacto/page.tsx
import type { Metadata } from "next";
import ContactForm from "./ContactForm";
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
    <div className="editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="editorial">
        <div className="mx-auto grid max-w-screen-xl gap-16 px-5 pt-10 pb-20 md:px-8 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-28">
          <div className="lg:col-span-5">
            <h1 className="t-display hero-rise">Suma nuestra experiencia a tu estrategia financiera.</h1>
            <p className="t-lead mt-8">
              Cuéntanos qué buscas y un asesor te contactará en horario de
              oficina. Si prefieres, llámanos o escríbenos directamente.
            </p>
            <dl className="mt-12 space-y-6 border-t border-[var(--color-rule)] pt-8">
              <div>
                <dt className="text-sm text-[var(--color-stone)]">Teléfono</dt>
                <dd className="mt-1 text-lg">
                  <a href="tel:5588522764" className="link-quiet text-lg">(55) 8852 2764</a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-stone)]">Correo</dt>
                <dd className="mt-1 text-lg">
                  <a href="mailto:contacto@bridgecapital.mx" className="link-quiet text-lg">contacto@bridgecapital.mx</a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-stone)]">Oficina</dt>
                <dd className="mt-1 leading-relaxed">
                  Avenida Insurgentes Sur 1431, Piso 10
                  <br />
                  Col. Insurgentes Mixcoac, Benito Juárez, 03920, CDMX
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-stone)]">Horario</dt>
                <dd className="mt-1">Lunes a viernes, 9:00 a 18:00</dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="sr-only">Formulario de contacto</h2>
            <ContactForm />
          </div>
        </div>
      </section>
      <FAQSection />
    </div>
  );
}
