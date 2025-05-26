// src/app/page.tsx
import CTASection from '@/app/components/home/CTASection';
import HeroSection from '@/app/components/home/HeroSection'; // Importaremos el componente Hero aquí
import IntroTextSection from '@/app/components/home/IntroTextSection';
import PrinciplesSection from '@/app/components/home/PrinciplesSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroTextSection />
      <PrinciplesSection />
      <CTASection />
      {/* Aquí puedes agregar más secciones o componentes */}
    </>
  );
}