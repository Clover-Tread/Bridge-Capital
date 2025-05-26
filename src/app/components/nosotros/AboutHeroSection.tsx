// import Link from 'next/link';
// import Image from 'next/image';

const AboutHeroSection = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Columna de Texto */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              Socios estratégicos para tu patrimonio: seguro y en constante crecimiento.
            </h1>
            <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed">
              <p>
                Nuestro equipo combina pasión con tres cualidades esenciales: Inteligencia, Iniciativa e Integridad.
              </p>
              <p>
                Esta sinergia nos permite ofrecer un servicio de asesoría ágil, profundo y enfocado en la 
                protección y el crecimiento de tu capital.
              </p>
            </div>
          </div>

          {/* Columna de Imagen */}
          <div className="relative w-full h-64 md:h-auto md:min-h-[300px] lg:min-h-[400px] rounded-lg overflow-hidden shadow-lg">
            {/* Reemplaza esto con tu componente Image cuando tengas la imagen */}
            {/* <Image
              src="/images/apreton-de-manos-nosotros.jpg" // CAMBIA ESTA RUTA
              alt="Socios estratégicos en Bridge Capital"
              fill
              className="transform transition-transform duration-500 hover:scale-105 object-cover"
            /> */}
            {/* Placeholder mientras tanto */}
            <div className="bg-gray-300 w-full h-full flex items-center justify-center">
              <span className="text-gray-500">Imagen del Apretón de Manos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;