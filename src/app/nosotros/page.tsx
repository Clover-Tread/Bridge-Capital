// src/app/nosotros/page.tsx
import PageHeader from "@/components/editorial/PageHeader";
import ClosingCTA from "@/components/editorial/ClosingCTA";

export const metadata = {
  title: "Nosotros",
  description:
    "Socios estratégicos para tu patrimonio: misión, visión y los principios con los que Bridge Capital gestiona inversiones.",
  alternates: { canonical: "/nosotros" },
};

const values = [
  {
    name: "Intereses comunes",
    text: "Evitamos o gestionamos con transparencia los conflictos de interés, priorizando y tratando igual a todos los clientes.",
  },
  {
    name: "Integridad",
    text: "Nos regimos por la ética y la integridad en todo momento, y así forjamos confianza con clientes y colaboradores.",
  },
  {
    name: "Comunicación abierta",
    text: "Fomentamos una comunicación abierta y constructiva para mejorar relaciones y responder con agilidad a retos y oportunidades.",
  },
  {
    name: "Honestidad radical",
    text: "Comprender la verdad, con sus errores y debilidades, es clave para el éxito y nos permite mejorar de forma continua.",
  },
  {
    name: "Investigación profunda",
    text: "Generamos valor con una ventaja de conocimiento, obtenida con investigación a profundidad y una metodología aplicada de forma consistente.",
  },
  {
    name: "Trabajo en equipo",
    text: "Somos un equipo multidisciplinario que impulsa la creatividad y el sentido de pertenencia.",
  },
  {
    name: "Excelencia",
    text: "Buscamos rendimientos atractivos con riesgos controlados y decisiones que preserven y hagan crecer el capital, incluso en mercados ineficientes y tiempos difíciles.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="editorial">
      <PageHeader
        title="Socios estratégicos para tu patrimonio."
        lead={
          <>
            <p>
              Nuestro equipo combina pasión con tres cualidades esenciales:
              inteligencia, iniciativa e integridad.
            </p>
            <p className="mt-4">
              Esa combinación nos permite ofrecer una asesoría ágil, profunda y
              enfocada en proteger y hacer crecer tu capital.
            </p>
          </>
        }
        image={{
          src: "/images/bridge.jpg",
          alt: "Puente colgante entre la niebla",
          position: "object-[35%_50%]",
        }}>
        <ul className="flex flex-wrap gap-x-12 gap-y-6">
          <li>
            <span className="block font-[family-name:var(--font-display)] text-[2rem] leading-none">12+ años</span>
            <span className="mt-1 block text-sm text-[var(--color-stone)]">de experiencia</span>
          </li>
          <li>
            <span className="block font-[family-name:var(--font-display)] text-[2rem] leading-none">60+</span>
            <span className="mt-1 block text-sm text-[var(--color-stone)]">clientes</span>
          </li>
        </ul>
      </PageHeader>

      {/* Misión y visión: el texto completo a la vista, sin modales */}
      <section className="editorial">
        <div className="mx-auto grid max-w-screen-xl gap-16 border-t border-[var(--color-rule)] px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:gap-8">
          <article className="lg:pr-12">
            <h2 className="t-h2">Misión</h2>
            <div className="mt-8 space-y-5">
              <p className="t-body">
                Ser el socio estratégico preferido por personas, familias y
                empresas que buscan optimizar su patrimonio y alcanzar sus metas
                financieras a largo plazo, con asesoría de inversión
                independiente, transparente y de la más alta calidad.
              </p>
              <p className="t-body text-[var(--color-stone)]">
                Transformamos la complejidad de los mercados en oportunidades
                claras, actuando siempre con integridad y con la convicción de
                que el verdadero valor se construye con paciencia y estrategia.
              </p>
            </div>
          </article>
          <article className="lg:border-l lg:border-[var(--color-rule)] lg:pl-12">
            <h2 className="t-h2">Visión</h2>
            <div className="mt-8 space-y-5">
              <p className="t-body">
                Ser la firma de asesoría en inversiones independiente más
                respetada y reconocida en México, por la excelencia de nuestro
                servicio, la profundidad de nuestro análisis y la solidez de los
                resultados que generamos para nuestros clientes.
              </p>
              <p className="t-body text-[var(--color-stone)]">
                Imaginamos un futuro en el que cada vez más personas y empresas
                toman decisiones financieras informadas y construyen
                patrimonios sólidos con Bridge Capital como aliado de confianza.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Valores: todo el texto visible, también en móvil (antes solo aparecía con hover) */}
      <section className="bg-[var(--color-paper-deep)]">
        <div className="mx-auto max-w-screen-xl px-5 py-20 md:px-8 md:py-28">
          <h2 className="t-h2 max-w-xl">Principios y valores</h2>
          <dl className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.name} className="border-t border-[var(--color-rule)] py-8 pr-4">
                <dt className="t-h3">{value.name}</dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-stone)]">
                  {value.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClosingCTA />
    </div>
  );
}
