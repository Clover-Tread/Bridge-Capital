import Link from "next/link";
import PillarBar from "@/components/editorial/PillarBar";

/**
 * Los cuatro pilares, dibujados con las cuatro barras del logo de Bridge Capital.
 * Cada barra conserva el alto y el desfase exactos del logo original
 * (viewBox 219.11 × 436.52), así la sección forma el símbolo a gran escala.
 * Es el único gesto visual llamativo del home; lo demás se mantiene sobrio.
 */
const pillars = [
  {
    title: "Negocio",
    description:
      "Invertimos en negocios sólidos que entendemos a fondo, con valor comprobado y clara visión de futuro.",
  },
  {
    title: "Dirección y liderazgo",
    description:
      "Buscamos directivos con gestión racional, transparencia probada y pensamiento verdaderamente independiente.",
  },
  {
    title: "Fundamental financiero",
    description:
      "Priorizamos empresas rentables, con márgenes sólidos, que generan valor para el accionista de forma consistente.",
  },
  {
    title: "Mercado",
    description:
      "Compramos solo con valoraciones atractivas y un amplio margen de seguridad en cada inversión.",
  },
];

const PrinciplesSection = () => {
  return (
    <section className="bg-[var(--color-paper-deep)] text-[var(--color-ink)]">
      <div className="mx-auto max-w-screen-xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <h2 className="t-h2 lg:col-span-6">
            Cuatro pilares para decidir dónde invertir.
          </h2>
          <p className="t-lead lg:col-span-5 lg:col-start-8 lg:self-end">
            Cada empresa en la que invertimos pasa por los mismos cuatro
            filtros, sin excepciones.
          </p>
        </div>

        <ol className="mt-16 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
          {pillars.map((pillar, i) => (
            <li
              key={pillar.title}
              className="grid content-start grid-cols-[3rem_1fr] gap-x-5 md:grid-cols-1 md:gap-x-0">
              <PillarBar index={i as 0 | 1 | 2 | 3} />
              <div className="md:mt-8 md:border-t md:border-[var(--color-rule)] md:pt-6">
                <h3 className="t-h3">{pillar.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-stone)]">
                  {pillar.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-14">
          <Link href="/filosofia-inversion" className="link-quiet">
            Conoce nuestra filosofía de inversión
          </Link>
        </p>
      </div>
    </section>
  );
};

export default PrinciplesSection;
