import React from "react";
import ServiceBlock from "./ServiceBlock";

const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

export default function InvestmentAdvisorySection() {
  return (
    // Contenedor principal que se alinea con el Navbar
    <div
      className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES} py-12 md:py-20 space-y-16 md:space-y-24`}>
      {/* Gestión de Inversiones */}
      <ServiceBlock
        title="Gestión de Inversiones"
        imageUrl="/images/gestor-inversiones-bg.jpg"
        imageAlt="Gráfico de inversión representando gestión de inversiones"
        imagePosition="left">
        <p>
          Con este servicio no tienes que preocuparte por nada, ya que se lo
          dejas todo a los <strong>expertos</strong>.
        </p>
        <p>
          Te ayudamos a invertir y diversificar tu dinero en{" "}
          <strong>empresas públicas, nacionales e internacionales</strong>.
        </p>
        <p>
          Servicio enfocado para personas físicas (individuales o empresas
          familiares), personas morales (tesorerías, cajas de ahorro, fondos de
          ahorro, fondos de pensiones), y <strong>sector público</strong>. Sólo
          tú podrás disponer de tus recursos.
        </p>
        <p>
          Tu dinero estará resguardado en una cuenta a tu nombre en una
          reconocida institución financiera. Nosotros sólo te ayudamos a decidir
          en qué invertirlo.
        </p>
      </ServiceBlock>
      {/* Asesoría de Inversiones */}
      <ServiceBlock
        title="Asesoría de Inversiones"
        imageUrl="/images/asesoria-inversiones-bg.jpg"
        imageAlt="Brújula guiando la asesoría de inversiones"
        imagePosition="right">
        <p>
          Tu tienes el control y eres el que decide la compra o venta de alguna
          inversión, nosotros somos tu cinturón de seguridad al analizar y
          emitir una opinión respecto a cómo planeas invertir.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Ideal para personas que les gusta tomar sus propias decisiones
          </li>
          <li>
            <strong>Bridge Capital</strong> es tu cinturón de seguridad al
            analizar y emitir una opinión respecto a cómo planeas invertir.
          </li>
          <li>Te ayudamos a abrir tu contrato de inversión.</li>
          <li>Tu decides que comprar, que vender y en qué momento.</li>
          <li>Nosotros te damos recomendaciones.</li>
          <li>
            Servicio enfocado para personas físicas (empresas familiares),
            personas morales (tesorerías, cajas de ahorro, fondos de ahorro,
            fondos de pensiones), y sector público.
          </li>
          <li>
            <strong>Bridge Capital</strong> forma parte de tu comité de
            inversión.
          </li>
        </ul>
      </ServiceBlock>
      {/* Consultoría Financiera */}
      <ServiceBlock
        title="Consultoría Financiera"
        imageUrl="/images/consultoria-financiera-bg.jpg"
        imageAlt="Análisis financiero en laptop"
        imagePosition="left">
        <p>
          Con la consultoría de <strong>Bridge Capital</strong> se busca
          ayudarte a entender cómo funciona tu flujo de dinero, para que puedas
          tomar mejores decisiones:
        </p>
        <ul>
          <li>
            <strong>Consultoría de finanzas personales:</strong> Generar
            comparativo de ingresos vs egresos. Balance de activos contra
            pasivos. Consultoría de cómo están hoy y cómo poder mejorar. Qué
            hacer con los distintos créditos que se tienen.
          </li>
          <li>
            <strong>Consultoría de finanzas corporativas:</strong> Análisis de
            estados financieros. Salud de la empresa. Áreas de oportunidad
            financiera. Viabilidad de financiamientos. Networking con entes
            financieros para la obtención de créditos.
          </li>
          <li>
            <strong>Consultoría de Mercados:</strong> Servicios de Inteligencia
            y Análisis de Mercados Financieros a Nivel Nacional e Internacional
            para la toma de decisiones
          </li>
        </ul>
      </ServiceBlock>
    </div>
  );
}
