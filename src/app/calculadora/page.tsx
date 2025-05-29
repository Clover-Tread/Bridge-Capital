// src/app/calculadora/page.tsx
import React from "react";
import CalculatorIntroSection from "@/app/calculadora/CalculatorIntroSection";
import InvestmentCalculator from "@/app/calculadora/InvestmentCalculator";

export const metadata = {
  title: "Calculadora de Rendimientos - Bridge Capital",
  description:
    "Simula tus inversiones y planifica tu futuro financiero con nuestra calculadora de rendimientos.",
};

export default function CalculadoraPage() {
  return (
    <>
      <CalculatorIntroSection />
      <InvestmentCalculator />
    </>
  );
}
