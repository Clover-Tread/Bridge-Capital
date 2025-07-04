import Image from "next/legacy/image";

const IntroTextSection = () => {
  return (
    <section id="intro" className="bg-[#ebebeb] pt-12 md:pt-16 pb-20 md:pb-28">
      <div className="container mx-auto px-4">
        {/* Contenedor principal */}
        <div className="max-w-4xl mx-auto md:max-w-[50rem]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[800] text-gray-900 mb-8 text-center">
            Navegando el Presente, Asegurando tu Mañana.
          </h2>
          <div className="text-base md:text-lg text-[var(--color-primary)] leading-relaxed space-y-6 text-justify">
            <p>
              En Bridge Capital, entendemos que la clave de un futuro financiero
              próspero reside en una{" "}
              <strong>
                calidad de análisis y una disciplina inquebrantable
              </strong>
              . Mientras los mercados fluctúan y nuestras vidas cambian, nuestro
              enfoque permanece constante: identificar oportunidades de
              inversión con retornos superiores para ti, actuando con
              inteligencia donde otros dudan.
            </p>
            <p>
              Operamos en estricto apego al marco legal, lo que nos ha llevado a
              obtener la certificación{" "}
              <strong>CNBV (30152-001 (15445) 03/07/2021)</strong>, así mismo,
              todos nuestros Asesores se encuentran certificados por la AMIB, lo
              que nos permite gestionar tus inversiones con la máxima seguridad
              y transparencia. No solo invertimos tu dinero, protegemos tu
              patrimonio.
            </p>
            <p>
              <strong>A nuestros valiosos clientes:</strong> Siéntanse
              orgullosos de haber elegido un socio que prioriza la certeza y la
              regulación. Su confianza es nuestro mayor activo.{" "}
              <strong>A quienes exploran un futuro con nosotros:</strong> Los
              invitamos a unirse a una firma donde la seguridad no es una
              promesa, es un hecho. En Bridge Capital tu capital está destinado
              a crecer.{" "}
              <strong>Invierte con nosotros, invierte en tu futuro</strong>.
            </p>
          </div>
          {/* Logos */}
          <div className="mt-12 flex justify-center items-center space-x-10 md:space-x-16">
            <div className="relative h-16 w-32">
              <Image
                src="/cnbv.svg"
                alt="Logo CNBV"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="relative h-16 w-32">
              <Image
                src="/amib.svg"
                alt="Logo AMIB"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroTextSection;
