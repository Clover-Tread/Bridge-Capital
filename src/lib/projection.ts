/**
 * Proyección de inversión con interés compuesto anual.
 *
 * Supuestos (los mismos que se muestran al usuario en la calculadora):
 * - La tasa anual es constante durante todo el plazo.
 * - El capital inicial se invierte al inicio del año 1.
 * - La aportación anual se hace al inicio de cada año a partir del año 2.
 * - No se descuentan comisiones ni impuestos.
 * - El "valor en pesos de hoy" descuenta una inflación anual constante.
 */
export type ProjectionInput = {
  initialCapital: number;
  annualRate: number; // 0.08 = 8 %
  years: number;
  annualContribution: number;
  inflationRate: number; // 0.04 = 4 %
};

export type ProjectionYear = {
  year: number;
  value: number; // valor nominal al cierre del año
  realValue: number; // el mismo valor en pesos de hoy
  contributed: number; // capital aportado acumulado
};

export type ProjectionResult = {
  totalValue: number;
  realTotalValue: number;
  totalContributions: number;
  totalInterest: number;
  years: ProjectionYear[];
};

const round2 = (n: number) => Math.round(n * 100) / 100;

export function projectInvestment({
  initialCapital,
  annualRate,
  years,
  annualContribution,
  inflationRate,
}: ProjectionInput): ProjectionResult {
  if (![initialCapital, annualRate, years, annualContribution, inflationRate].every(Number.isFinite)) {
    throw new Error("Parámetros de proyección inválidos");
  }
  const n = Math.max(0, Math.floor(years));
  let value = Math.max(0, initialCapital);
  let contributed = value;
  const rows: ProjectionYear[] = [];

  for (let year = 1; year <= n; year++) {
    if (year > 1 && annualContribution > 0) {
      value += annualContribution;
      contributed += annualContribution;
    }
    value *= 1 + annualRate;
    rows.push({
      year,
      value: round2(value),
      realValue: round2(value / Math.pow(1 + inflationRate, year)),
      contributed: round2(contributed),
    });
  }

  const last = rows[rows.length - 1];
  const totalValue = last ? last.value : round2(value);
  return {
    totalValue,
    realTotalValue: last ? last.realValue : totalValue,
    totalContributions: round2(contributed),
    totalInterest: round2(totalValue - contributed),
    years: rows,
  };
}
