// src/app/calculadora/page.tsx
import React from "react";
import CalculatorIntroSection from "@/app/calculadora/CalculatorIntroSection";
import InvestmentCalculator from "@/app/calculadora/InvestmentCalculator";

export const metadata = {
  title: "Calculadora de Rendimientos de Inversión",
  description:
    "Simula tus inversiones y planifica tu futuro financiero con nuestra calculadora de rendimientos.",
  alternates: { canonical: '/calculadora' },
};

export default function CalculadoraPage() {
  return (
    <>
      <CalculatorIntroSection />
      <InvestmentCalculator />
    </>
  );
}
