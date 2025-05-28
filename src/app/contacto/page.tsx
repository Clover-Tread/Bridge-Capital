import React from 'react';
import FAQSection from './FAQSection';
import ContactHeaderSection from './ContactHeaderSection';
import PreContactFormCTASection from './PreContactFormCTASection';
// import { Contact } from 'lucide-react';
import ContactFormSection from './ContactFormSection';


export const metadata = {
  title: 'Contacto y Preguntas Frecuentes - Bridge Capital',
  description: 'Resuelve tus dudas con nuestras preguntas frecuentes o contáctanos directamente.',
};

export default function ContactoPage() {
  console.log("Renderizando /contacto page");
  return (
    <>
      {/* Podríamos añadir un título general para la página aquí si es necesario */}
      <ContactHeaderSection />
      <FAQSection />
      <PreContactFormCTASection />
      <ContactFormSection />
    </>
  );
}