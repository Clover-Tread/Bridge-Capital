import Link from "next/link";

type ClosingCTAProps = {
  title?: string;
  lead?: React.ReactNode;
  tone?: "paper" | "deep";
};

/** Cierre de página: una pregunta, una acción principal y el teléfono como alternativa. */
export default function ClosingCTA({
  title = "¿Te interesan las inversiones a largo plazo, en compañías rentables y con riesgos controlados?",
  lead = "En una primera conversación te explicamos cómo trabajamos, el monto mínimo de inversión y cómo cobramos.",
  tone = "paper",
}: ClosingCTAProps) {
  return (
    <section
      className={
        tone === "deep"
          ? "bg-[var(--color-paper-deep)] text-[var(--color-ink)]"
          : "editorial border-t border-[var(--color-rule)]"
      }>
      <div className="mx-auto grid max-w-screen-xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-8">
          <h2 className="t-h2">{title}</h2>
          {lead && <div className="t-lead mt-6">{lead}</div>}
        </div>
        <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end">
          <Link href="/contacto" className="btn btn-primary">
            Agendar una conversación
          </Link>
          <a href="tel:5588522764" className="link-quiet">
            O llámanos al (55) 8852 2764
          </a>
        </div>
      </div>
    </section>
  );
}
