import Link from 'next/link';

const HeroSection = () => {
  return (
    <section
      className="hero-bg-image relative w-full min-h-screen bg-cover bg-[center_top_40%] md:bg-[center_top_50%] text-center flex flex-col justify-center items-center -mt-[101px]">
      <div className="relative container mx-auto px-4 z-10 -mt-[17rem] md:-mt-[15rem]">
        <h1 className="tracking-wide text-5xl sm:text-5xl md:text-7xl font-black text-(--color-primary) mb-4 leading-tight">
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