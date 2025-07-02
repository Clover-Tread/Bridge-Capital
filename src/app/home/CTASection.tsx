import Link from "next/link";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-[#ebebeb] py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[800] text-(--color-primary) mb-8">
            ¿Te interesan las inversiones a largo plazo, en compañías rentables
            y con riesgos controlados?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            {/* Botón 1: "Contáctanos" con fondo sólido */}
            <Link href="/contacto">
              <Button
                size="lg"
                className="bg-[#8B3A3A] hover:bg-[#7a3232] text-white px-15 py-6 text-lg ">
                Contáctanos
              </Button>
            </Link>

            {/* Botón 2: "Conoce nuestros Servicios" */}
            <Link href="/servicios">
              <Button
                variant="link"
                className="text-(--color-primary) underline underline-offset-4 hover:text-(--color-dark-red) text-lg ">
                Conoce nuestros Servicios
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
