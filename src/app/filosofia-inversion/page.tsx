// src/app/filosofia-inversion/page.tsx
import PageHeader from "@/components/editorial/PageHeader";
import ClosingCTA from "@/components/editorial/ClosingCTA";
import PillarBar from "@/components/editorial/PillarBar";

export const metadata = {
  title: "Filosofía de Inversión",
  description:
    "Los cuatro pilares con los que Bridge Capital elige en qué empresas invertir: negocio, dirección y liderazgo, fundamental financiero y mercado.",
  alternates: { canonical: "/filosofia-inversion" },
};

const pillars = [
  {
    name: "Negocio",
    points: [
      { term: "Comprensión del negocio", detail: "Entender a qué se dedica la compañía es esencial." },
      { term: "Consistencia histórica", detail: "Su antigüedad, número de empleados y consistencia de resultados." },
    ],
  },
  {
    name: "Dirección y liderazgo",
    points: [
      { term: "Dirección racional", detail: "La directiva toma decisiones de forma racional." },
      { term: "Transparencia frente a los socios", detail: "Reconoce éxitos y errores de la misma forma." },
      { term: "Resistencia al imperativo institucional", detail: "Piensa de forma independiente y evita la mentalidad de las masas." },
    ],
  },
  {
    name: "Fundamental financiero",
    points: [
      { term: "Consistencia y rentabilidad", detail: "Comportamiento y resultados similares a lo largo del tiempo." },
      { term: "Ganancias de los socios", detail: "Habilidad para generar efectivo para los accionistas." },
      { term: "Márgenes", detail: "Márgenes altos que reflejan fortaleza." },
      { term: "Valor con utilidades y acciones", detail: "Genera valor tanto en la compañía como en el mercado." },
    ],
  },
  {
    name: "Mercado",
    points: [
      { term: "Valuación de la compañía", detail: "Lo que recibimos a cambio de lo que pagamos." },
      { term: "Margen de seguridad", detail: "Existe un descuento atractivo." },
      { term: "Análisis de precios", detail: "Tasa de retorno de la inversión y tasa de crecimiento." },
      { term: "Estrategia de inversión", detail: "¿Seremos accionistas o le prestaremos capital?" },
    ],
  },
] as const;

export default function FilosofiaPage() {
  return (
    <div className="editorial">
      <PageHeader
        title="Lo que hacemos es fácil de entender, pero difícil de ejecutar."
        lead="Buscamos empresas con prospectos y modelos de negocio superiores, capaces de generar valor durante años, no meses."
        image={{
          src: "/pilares.jpg",
          alt: "Cuatro columnas de piedra contra el cielo",
          position: "object-[50%_60%]",
        }}
      />

      {/* El único bloque oscuro de la página: la convicción que guía el proceso */}
      <section className="bg-[var(--color-night)] text-[var(--color-paper)]">
        <div className="mx-auto max-w-screen-xl px-5 py-20 md:px-8 md:py-28">
          <figure className="max-w-4xl">
            <blockquote className="t-h2 text-[var(--color-paper)]">
              La convicción sobre una idea, la disciplina radical, la paciencia,
              no decidir con base en pronósticos y no intentar adivinar el
              momento de entrada al mercado: esos son los principios de nuestro
              proceso inversor.
            </blockquote>
            <figcaption className="mt-10 text-[0.9375rem] text-[#c9d2d6]">
              Los pilares y principios nunca cambian; nuestras estrategias sí.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="editorial">
        <div className="mx-auto max-w-screen-xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <h2 className="t-h2 lg:col-span-6">
              Cuatro pilares para encontrar ventajas competitivas durables.
            </h2>
            <p className="t-lead lg:col-span-5 lg:col-start-8 lg:self-end">
              Nuestro proceso localiza consistencias y ventajas duraderas dentro
              de las empresas en las que se invierte tu patrimonio.
            </p>
          </div>

          <ol className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-x-8 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <li key={pillar.name} className="grid content-start grid-cols-[3rem_1fr] gap-x-5 lg:grid-cols-1 lg:gap-x-0">
                <PillarBar index={i as 0 | 1 | 2 | 3} className="h-28 lg:h-72" />
                <div className="lg:mt-8 lg:border-t lg:border-[var(--color-rule)] lg:pt-6">
                  <h3 className="t-h3">{pillar.name}</h3>
                  <dl className="mt-5 space-y-4">
                    {pillar.points.map((point) => (
                      <div key={point.term}>
                        <dt className="text-[0.9375rem] font-medium">{point.term}</dt>
                        <dd className="mt-1 text-[0.9375rem] leading-relaxed text-[var(--color-stone)]">
                          {point.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ClosingCTA
        tone="deep"
        title="¿Quieres profundizar en nuestra filosofía de inversión?"
        lead="Te explicamos personalmente nuestra estrategia. Atendemos de lunes a viernes, de 9:00 a 18:00."
      />
    </div>
  );
}
