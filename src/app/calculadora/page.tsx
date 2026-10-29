// src/app/calculadora/page.tsx
import PageHeader from "@/components/editorial/PageHeader";
import InvestmentCalculator from "@/app/calculadora/InvestmentCalculator";

export const metadata = {
  title: "Calculadora de Rendimientos de Inversión",
  description:
    "Simula tus inversiones y planifica tu futuro financiero con nuestra calculadora de rendimientos.",
  alternates: { canonical: "/calculadora" },
};

export default function CalculadoraPage() {
  return (
    <div className="editorial">
      <PageHeader
        title="Simula tu inversión, planifica tu futuro."
        lead="Calcula el rendimiento aproximado de tu inversión a lo largo de los años. Tú decides el monto, el plazo y la tasa."
      />
      <InvestmentCalculator />
    </div>
  );
}
