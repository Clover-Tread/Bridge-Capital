// app/contacto/page.tsx

import React from "react";
import ContactHeaderSection from "./ContactHeaderSection";
// Importa la sección visible que contiene el botón
import PreContactCTASection from "./PreContactCTASection";
// Importa el componente que provee la lógica del modal
import { ContactModal } from "./ContactModal";
import FAQSection from "./FAQSection";

export default function ContactoPage() {
  return (
    <>
      <main>
        <ContactHeaderSection />
        <ContactModal>
          <PreContactCTASection />
        </ContactModal>

        <FAQSection />
      </main>
    </>
  );
}
