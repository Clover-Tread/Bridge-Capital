import React from 'react';
import PhilosophyIntroSection from './PhilosophyIntroSection';
import WhyInvestSection from './WhyInvestSection';
import InvestmentPillarsSection from './InvestmentPillarsSection';
import PhilosophyCTASection from './PhilosophyCTASection';


export const metadata = {
  title: 'Filosofía de Inversión - Bridge Capital',
  description: 'Conoce los pilares y principios de nuestra estrategia de inversión en Bridge Capital.',
};

export default function FilosofiaInversionPage() {
  console.log("Renderizando /filosofia-inversion page");
  return (
    <>
      <PhilosophyIntroSection />
      <WhyInvestSection />
      <InvestmentPillarsSection />
      <PhilosophyCTASection />
    </>
  );
}