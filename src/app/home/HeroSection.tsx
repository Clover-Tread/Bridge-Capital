import Link from "next/link";
import Image from "next/image";

/**
 * Hero editorial: texto a la izquierda, fotografía vertical en marco alto a la derecha.
 * Server component; el contenido se pinta visible desde el HTML (bueno para LCP).
 */
const HeroSection = () => {
  return (
    <section className="editorial">
      <div className="mx-auto grid max-w-screen-xl gap-12 px-5 pt-10 pb-16 md:px-8 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="flex flex-col justify-center lg:col-span-7 lg:pr-8">
          <h1 className="t-display hero-rise">
            Asesor en inversiones independiente para patrimonios de largo plazo.
          </h1>
          <p className="t-lead mt-8 hero-rise" style={{ animationDelay: "80ms" }}>
            Invertimos en empresas sólidas que entendemos a fondo, con
            disciplina, análisis y riesgos controlados. Tu dinero siempre está
            en una cuenta a tu nombre.
          </p>
          <div
            className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8 hero-rise"
            style={{ animationDelay: "160ms" }}>
            <Link href="/contacto" className="btn btn-primary">
              Agendar una conversación
            </Link>
            <Link href="/calculadora" className="link-quiet">
              Simular rendimientos
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-paper-deep)] lg:aspect-[3/4]">
            <Image
              src="/images/hero-image.jpg"
              alt="Fachada de un edificio corporativo vista desde abajo"
              fill
              priority
              quality={75}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_72%] grayscale-[35%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
