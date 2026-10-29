import Image from "next/image";

/**
 * Franja de confianza justo debajo del hero: regulación y trayectoria,
 * que para un cliente de alto patrimonio es lo primero que importa.
 */
const facts = [
  { value: "12+ años", label: "de experiencia gestionando inversiones" },
  { value: "60+", label: "clientes que nos confían su patrimonio" },
];

const TrustStrip = () => {
  return (
    <section className="editorial" aria-label="Regulación y trayectoria">
      <div className="mx-auto max-w-screen-xl px-5 md:px-8">
        <ul className="grid grid-cols-1 border-t border-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <li
              key={fact.value}
              className="flex flex-col gap-1 border-b border-[var(--color-rule)] py-7 sm:pr-8 lg:border-b-0 lg:border-r lg:pl-8 lg:first:pl-0">
              <span className="font-[family-name:var(--font-display)] text-[2rem] leading-none">
                {fact.value}
              </span>
              <span className="text-sm text-[var(--color-stone)]">{fact.label}</span>
            </li>
          ))}

          <li className="flex items-center gap-4 border-b border-[var(--color-rule)] py-7 sm:pr-8 lg:border-b-0 lg:border-r lg:pl-8">
            <Image
              src="/cnbv.svg"
              alt="Comisión Nacional Bancaria y de Valores"
              width={96}
              height={48}
              className="h-11 w-auto grayscale"
            />
            <div>
              <p className="text-sm font-medium">Registro ante la CNBV</p>
              <p className="text-sm text-[var(--color-stone)]">30152-001 (15445)</p>
            </div>
          </li>

          <li className="flex items-center gap-4 py-7 lg:pl-8">
            <Image
              src="/amib.svg"
              alt="Asociación Mexicana de Instituciones Bursátiles"
              width={96}
              height={48}
              className="h-11 w-auto grayscale"
            />
            <div>
              <p className="text-sm font-medium">Asesores certificados</p>
              <p className="text-sm text-[var(--color-stone)]">por la AMIB</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TrustStrip;
