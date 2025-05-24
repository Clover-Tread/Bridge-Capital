// src/app/page.tsx
import CTASection from './components/home/CTASection';
import HeroSection from './components/home/HeroSection'; // Importaremos el componente Hero aquí
import IntroTextSection from './components/home/IntroTextSection';
import PrinciplesSection from './components/home/PrinciplesSection';

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