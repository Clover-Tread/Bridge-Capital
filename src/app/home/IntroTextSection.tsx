import Link from "next/link";

const IntroTextSection = () => {
  return (
    <section id="intro" className="editorial">
      <div className="mx-auto grid max-w-screen-xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:gap-8">
        <h2 className="t-h2 lg:col-span-5">
          Navegando el presente, asegurando tu mañana.
        </h2>
        <div className="space-y-6 lg:col-span-6 lg:col-start-7">
          <p className="t-body">
            En Bridge Capital creemos que un futuro financiero próspero depende
            de la calidad del análisis y de una disciplina inquebrantable. Los
            mercados fluctúan y la vida cambia; nuestro enfoque no: identificar
            oportunidades con retornos superiores y actuar con inteligencia
            donde otros dudan.
          </p>
          <p className="t-body">
            Operamos en estricto apego al marco legal. Estamos registrados ante
            la CNBV (30152-001 (15445) 03/07/2021) y todos nuestros asesores
            están certificados por la AMIB. Tu dinero se resguarda en una cuenta
            a tu nombre en una institución financiera reconocida; nosotros te
            ayudamos a decidir en qué invertirlo.
          </p>
          <p className="pt-2">
            <Link href="/servicios" className="link-quiet">
              Conoce nuestros servicios
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroTextSection;
