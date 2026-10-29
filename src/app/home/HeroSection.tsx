import Link from "next/link";
import Image from "next/image";

/**
 * Hero del home.
 *
 * Antes era un client component que arrancaba con opacity-0 y GSAP lo mostraba
 * ~1.5 s después, lo que retrasaba el LCP (en móvil el H1 no se veía al cargar).
 * Ahora el contenido se pinta visible desde el HTML del servidor y solo se anima
 * con transform (CSS), que no afecta el LCP ni requiere JavaScript.
 */
const HeroSection = () => {
  return (
    <section className="-mt-[7rem] relative w-full min-h-[80vh] md:min-h-[100vh] flex flex-col items-center text-center overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-image.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          priority
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 flex flex-col justify-center items-center text-center flex-grow w-full max-w-screen-xl pt-[10rem] md:pt-0 pb-90 md:pb-25 lg:pb-35 relative z-10">
        <div className="w-full">
          <h1 className="hero-rise tracking-wide text-4xl sm:text-5xl md:text-7xl font-[900] text-[var(--color-primary)] mb-4 leading-tight">
            BRIDGE CAPITAL
          </h1>
          <p
            className="hero-rise text-xl text-[var(--color-primary)] mb-8 max-w-2xl mx-auto"
            style={{ animationDelay: "80ms" }}>
            Tu asesor en inversiones independiente para alcanzar metas
            financieras
          </p>
          <div
            className="hero-rise flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
            style={{ animationDelay: "160ms" }}>
            <Link
              href="/contacto"
              className="bg-[var(--color-dark-red)] inline-block text-white px-8 py-5 rounded-lg text-base sm:text-lg font-semibold hover:bg-[var(--color-dark-red-hover)] transition duration-300 ease-in-out hover:scale-105">
              Habla con un asesor
            </Link>
            <Link
              href="/calculadora"
              className="inline-block px-8 py-5 rounded-lg text-base sm:text-lg font-semibold text-[var(--color-primary)] border-2 border-[var(--color-primary)] bg-white/40 backdrop-blur-sm hover:bg-white/70 transition duration-300 ease-in-out">
              Calcula tus rendimientos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
