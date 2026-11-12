import Image from "next/image";

// Franja breve bajo la portada que hace visible el respaldo regulatorio.
const RegulatoryStrip = () => {
  return (
    <section
      aria-label="Respaldo regulatorio"
      className="w-full bg-white border-y border-[var(--color-light-grey)]">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-10 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <Image
            src="/cnbv.svg"
            alt="Logo CNBV"
            width={56}
            height={28}
            className="h-7 w-auto"
            unoptimized
          />
          <p className="text-sm text-[var(--color-primary)]">
            Registro ante la CNBV{" "}
            <span className="font-semibold">30152-001 (15445)</span>
          </p>
        </div>
        <span
          aria-hidden="true"
          className="hidden sm:block h-6 w-px bg-[var(--color-light-grey)]"
        />
        <div className="flex items-center gap-3">
          <Image
            src="/amib.svg"
            alt="Logo AMIB"
            width={56}
            height={28}
            className="h-7 w-auto"
            unoptimized
          />
          <p className="text-sm text-[var(--color-primary)]">
            Asesores certificados por la{" "}
            <span className="font-semibold">AMIB</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegulatoryStrip;
