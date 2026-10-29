// src/app/servicios/page.tsx
import PageHeader from "@/components/editorial/PageHeader";
import ClosingCTA from "@/components/editorial/ClosingCTA";

export const metadata = {
  title: "Servicios de Inversión",
  description:
    "Gestión de inversiones, asesoría de inversiones y consultoría financiera para personas, empresas familiares, personas morales y sector público.",
  alternates: { canonical: "/servicios" },
};

type Service = {
  id: string;
  name: string;
  summary: string;
  audience: string;
  body: React.ReactNode;
};

const services: Service[] = [
  {
    id: "gestion",
    name: "Gestión de inversiones",
    summary: "Delegas la gestión de tu patrimonio en nuestro equipo.",
    audience:
      "Personas físicas (individuales o empresas familiares), personas morales (tesorerías, cajas de ahorro, fondos de ahorro y de pensiones) y sector público.",
    body: (
      <>
        <p className="t-body">
          Te ayudamos a invertir y diversificar tu dinero en empresas públicas,
          nacionales e internacionales, para que no tengas que preocuparte por
          el día a día de los mercados.
        </p>
        <p className="t-body">
          Tu dinero se resguarda en una cuenta a tu nombre en una reconocida
          institución financiera. Solo tú puedes disponer de tus recursos;
          nosotros te ayudamos a decidir en qué invertirlos.
        </p>
      </>
    ),
  },
  {
    id: "asesoria",
    name: "Asesoría de inversiones",
    summary: "Tú decides; nosotros analizamos y te recomendamos.",
    audience:
      "Personas físicas (empresas familiares), personas morales (tesorerías, cajas de ahorro, fondos de ahorro y de pensiones) y sector público.",
    body: (
      <>
        <p className="t-body">
          Ideal si te gusta tomar tus propias decisiones. Tú tienes el control
          de cada compra y venta; Bridge Capital es tu cinturón de seguridad:
          analizamos y te damos nuestra opinión sobre cómo planeas invertir.
        </p>
        <ul className="t-body space-y-3 border-l border-[var(--color-rule)] pl-6">
          <li>Te ayudamos a abrir tu contrato de inversión.</li>
          <li>Tú decides qué comprar, qué vender y en qué momento.</li>
          <li>Te damos recomendaciones sustentadas en análisis.</li>
          <li>Formamos parte de tu comité de inversión.</li>
        </ul>
      </>
    ),
  },
  {
    id: "consultoria",
    name: "Consultoría financiera",
    summary: "Entiende cómo se mueve tu dinero para decidir mejor.",
    audience: "Personas, empresas e instituciones que necesitan claridad financiera.",
    body: (
      <dl className="space-y-6">
        {[
          {
            term: "Finanzas personales",
            detail:
              "Comparativo de ingresos contra egresos, balance de activos y pasivos, diagnóstico de tu situación actual y qué hacer con los créditos que tienes.",
          },
          {
            term: "Finanzas corporativas",
            detail:
              "Análisis de estados financieros, salud de la empresa, áreas de oportunidad, viabilidad de financiamientos y vinculación con entidades financieras para obtener crédito.",
          },
          {
            term: "Mercados",
            detail:
              "Inteligencia y análisis de mercados financieros nacionales e internacionales para la toma de decisiones.",
          },
        ].map((item) => (
          <div key={item.term} className="border-t border-[var(--color-rule)] pt-5">
            <dt className="font-medium">{item.term}</dt>
            <dd className="t-body mt-2 text-[var(--color-stone)]">{item.detail}</dd>
          </div>
        ))}
      </dl>
    ),
  },
];

export default function ServiciosPage() {
  return (
    <div className="editorial">
      <PageHeader
        title="Tres formas de trabajar con tu patrimonio."
        lead="Adaptamos cada servicio a lo que esperas: desde delegar por completo la gestión hasta tener una segunda opinión experta en tus decisiones."
        image={{
          src: "/images/servicios-bg.jpg",
          alt: "Edificios corporativos vistos desde abajo",
          position: "object-[30%_50%]",
        }}
      />

      <section className="editorial">
        <div className="mx-auto max-w-screen-xl px-5 md:px-8">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="grid scroll-mt-28 gap-8 border-t border-[var(--color-rule)] py-16 md:py-20 lg:grid-cols-12 lg:gap-8">
              <header className="lg:col-span-5">
                <h2 className="t-h2">{service.name}</h2>
                <p className="t-lead mt-5">{service.summary}</p>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-[var(--color-stone)]">
                  <span className="font-medium text-[var(--color-ink)]">Para quién: </span>
                  {service.audience}
                </p>
              </header>
              <div className="space-y-6 lg:col-span-6 lg:col-start-7">{service.body}</div>
            </article>
          ))}
        </div>
      </section>

      <ClosingCTA
        tone="deep"
        title="¿No sabes qué servicio te conviene?"
        lead="Cuéntanos tu situación y te recomendamos la forma de trabajo que mejor se adapta a tus metas."
      />
    </div>
  );
}
