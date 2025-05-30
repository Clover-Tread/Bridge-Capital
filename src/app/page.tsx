import CTASection from "@/app/home/CTASection";
import HeroSection from "@/app/home/HeroSection"; // Importaremos el componente Hero aquí
import IntroTextSection from "@/app/home/IntroTextSection";
import PrinciplesSection from "@/app/home/PrinciplesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroTextSection />
      <PrinciplesSection />
      <CTASection />
    </>
  );
}
