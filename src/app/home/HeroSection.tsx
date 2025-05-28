import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="min-h-screen w-full overflow-hidden md:mt-[6.375rem] md:pt-[8.063rem]">
      {/* Fondo detrás */}
      <div className="absolute inset-0 -z-10 bg-cover bg-[center_top_40%] md:bg-[center_top_50%] hero-bg-image" />
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center pt-20 pb-0 py-20 md:py-32 lg:py-25 text-center">
        <h1 className="tracking-wide text-4xl sm:text-5xl md:text-7xl font-black text-(--color-primary) mb-4 leading-tight">
          BRIDGE CAPITAL
        </h1>
        <p className="text-lg sm:text-xl md:text-xl text-(--color-primary) mb-8 max-w-2xl mx-auto">
          Tu socio independiente para alcanzar metas financieras
        </p>
        <div>
          <Link
            href="/calculadora"
            className="bg-(--color-dark-red) my-4 text-white px-8 py-5 rounded-lg text-base sm:text-lg font-semibold hover:bg-(--color-dark-red-hover) transition duration-300 ease-in-out transform hover:scale-105"
          >
            Calculadora de rendimientos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;