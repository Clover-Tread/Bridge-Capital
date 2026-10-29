"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { projectInvestment } from "@/lib/projection";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


// Clases compartidas y estilos
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-5 md:px-8";

// Estilos específicos para los inputs y select
const inputBottomBorderStyle = ` block w-full appearance-none rounded-none border-x-0 border-t-0 border-b border-[var(--color-ink)]/30 bg-transparent px-0 py-3 font-[family-name:var(--font-display)] text-[1.75rem] md:text-[1.75rem] h-auto leading-none text-[var(--color-ink)] shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-[var(--color-ink)] `;
const selectTriggerStyle = ` w-full flex items-center justify-between rounded-none border-x-0 border-t-0 border-b border-[var(--color-ink)]/30 bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:border-b-2 focus-visible:border-[var(--color-ink)] h-auto py-3 pl-0 pr-8 font-[family-name:var(--font-display)] text-[1.75rem] leading-none text-left [&>svg]:hidden relative `;
// Tasas acotadas a rangos históricos realistas (ver referencias en el PR):
// CETES 28 días ~6 % (ago 2026); bolsa a largo plazo ~9–12 % nominal.
const annualReturnOptions = ["6.00", "8.00", "10.00", "12.00"] as const;
const annualReturnLabels: Record<(typeof annualReturnOptions)[number], string> = {
  "6.00": "6\u00a0% · conservador",
  "8.00": "8\u00a0% · moderado",
  "10.00": "10\u00a0% · histórico de bolsa",
  "12.00": "12\u00a0% · optimista",
};
// Inflación supuesta para expresar el resultado en pesos de hoy
// (meta de Banxico 3 % ± 1; usamos el extremo superior para no sobrestimar).
const INFLATION_RATE = 0.04;
const calculatorSchema = z.object({
  initialCapital: z.string().refine(
    (value) => {
      const num = parseFloat(value.replace(/[^0-9.]/g, ""));
      return !isNaN(num) && num >= 3000000;
    },
    { message: "El capital inicial debe ser de al menos $3,000,000." }
  ),
  annualReturn: z.enum(annualReturnOptions, {
    error: "Debes seleccionar un rendimiento estimado.",
  }),
  investmentTerm: z.enum(["5", "10", "20"], {
    error: "Debes seleccionar un plazo.",
  }),
  annualContribution: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value || value.trim() === "") {
          return true;
        }
        const num = parseFloat(value.replace(/[^0-9.]/g, ""));
        if (isNaN(num) || num === 0) return true;
        return num >= 10000;
      },
      { message: "La aportación anual debe ser $0 o al menos $10,000." }
    ),
});
type CalculatorFormValues = z.infer<typeof calculatorSchema>;
interface CalculationResults {
  totalValue: number;
  realTotalValue: number;
  totalContributions: number;
  totalInterest: number;
  breakdown: { year: number; value: number }[];
}

const InvestmentCalculator = () => {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedTermForDescription, setSelectedTermForDescription] =
    useState<string>("10");

  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      initialCapital: "3,000,000",
      annualReturn: "8.00",
      investmentTerm: "10",
      annualContribution: "10,000",
    },
    mode: "onBlur",
  });

  const { watch, setValue, getValues } = form;
  const investmentTermWatched = watch("investmentTerm");

  useEffect(() => {
    if (investmentTermWatched) {
      setSelectedTermForDescription(investmentTermWatched);
    }
  }, [investmentTermWatched]);

  const formatCurrency = (
    value: number | string | undefined,
    showSymbol = true
  ): string => {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    )
      return showSymbol ? "$0" : "0";
    const numValue =
      typeof value === "string"
        ? parseFloat(value.replace(/[^0-9.]/g, ""))
        : value;
    if (isNaN(numValue)) return showSymbol ? "$0" : "0";
    return new Intl.NumberFormat("es-MX", {
      style: showSymbol ? "currency" : "decimal",
      currency: "MXN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numValue);
  };
  const parseCurrency = (value: string | undefined): number => {
    if (!value || typeof value !== "string") return 0;
    return parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  };
  const handleCurrencyBlur = (
    fieldName: "initialCapital" | "annualContribution"
  ) => {
    const currentValue = getValues(fieldName);
    if (currentValue !== undefined) {
      const numericValue = parseCurrency(currentValue);
      setValue(
        fieldName,
        numericValue > 0 || currentValue === "0"
          ? formatCurrency(numericValue, false)
          : "",
        { shouldValidate: true }
      );
    }
  };
  const handleCurrencyFocus = (
    fieldName: "initialCapital" | "annualContribution"
  ) => {
    const currentValue = getValues(fieldName);
    if (currentValue !== undefined) {
      const numericValue = parseCurrency(currentValue);
      setValue(fieldName, numericValue > 0 ? numericValue.toString() : "", {
        shouldValidate: false,
      });
    }
  };
  function onSubmit(data: CalculatorFormValues) {
    setIsCalculating(true);
    setResults(null);
    const projection = projectInvestment({
      initialCapital: parseCurrency(data.initialCapital),
      annualRate: parseFloat(data.annualReturn) / 100,
      years: parseInt(data.investmentTerm, 10),
      annualContribution: data.annualContribution
        ? parseCurrency(data.annualContribution)
        : 0,
      inflationRate: INFLATION_RATE,
    });
    const n = projection.years.length;
    const finalBreakdownResult = projection.years
      .filter((row) => row.year % 5 === 0 || row.year === n)
      .map((row) => ({ year: row.year, value: row.value }));
    setTimeout(() => {
      setResults({
        totalValue: projection.totalValue,
        realTotalValue: projection.realTotalValue,
        totalContributions: projection.totalContributions,
        totalInterest: projection.totalInterest,
        breakdown: finalBreakdownResult,
      });
      setIsCalculating(false);
    }, 500);
  }
  const handleGeneratePDF = async () => {
    if (!results) return;
    // jsPDF pesa ~150 KB: se carga solo cuando el usuario pide el PDF.
    const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
    ]);
    const doc = new jsPDF();
    const currentFormValues = getValues();
    doc.setFontSize(20);
    doc.setTextColor(0, 42, 58);
    doc.text("Estimación de Inversión", 105, 22, { align: "center" });
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Bridge Capital", 105, 30, { align: "center" });
    let startY = 48;
    doc.setFontSize(12);
    doc.setTextColor(0, 42, 58);
    doc.text("Parámetros de la Simulación:", 14, startY);
    startY += 8;
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text(
      `Capital Inicial: ${formatCurrency(parseCurrency(currentFormValues.initialCapital), true)}`,
      14,
      startY
    );
    startY += 7;
    doc.text(
      `Aportación Anual Adicional: ${formatCurrency(parseCurrency(currentFormValues.annualContribution || "0"), true)}`,
      14,
      startY
    );
    startY += 7;
    doc.text(
      `Plazo de Inversión: ${currentFormValues.investmentTerm} años`,
      14,
      startY
    );
    startY += 7;
    doc.text(
      `Rendimiento Anual Estimado: ${currentFormValues.annualReturn}%`,
      14,
      startY
    );
    startY += 14;
    doc.setFontSize(12);
    doc.setTextColor(0, 42, 58);
    doc.text(
      `Resultados Estimados para ${currentFormValues.investmentTerm} años:`,
      14,
      startY
    );
    startY += 8;
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text(
      `Total de Aportaciones: ${formatCurrency(results.totalContributions, true)}`,
      14,
      startY
    );
    startY += 7;
    doc.text(
      `Rendimiento Estimado: ${formatCurrency(results.totalInterest, true)}`,
      14,
      startY
    );
    startY += 7;
    doc.setFontSize(11);
    doc.setFont("", "bold");
    doc.text(
      `Valor Estimado Total: ${formatCurrency(results.totalValue, true)}`,
      14,
      startY
    );
    doc.setFont("", "normal");
    startY += 7;
    doc.text(
      `En pesos de hoy (inflación ${INFLATION_RATE * 100}% anual): ${formatCurrency(results.realTotalValue, true)}`,
      14,
      startY
    );
    startY += 14;
    doc.setFontSize(12);
    doc.setTextColor(0, 42, 58);
    doc.text("Desglose Anual del Valor Estimado:", 14, startY);
    const tableColumns = ["Año", "Valor Estimado al Final del Año"];
    const tableRows = results.breakdown.map((item) => [
      item.year.toString(),
      formatCurrency(item.value, true),
    ]);
    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: startY + 7,
      theme: "grid",
      headStyles: { fillColor: [0, 42, 58], textColor: [255, 255, 255] },
      styles: { fontSize: 9, cellPadding: 2.5, halign: "center" },
      columnStyles: {
        0: { halign: "center", cellWidth: 30 },
        1: { halign: "right" },
      },
      didDrawPage: function (data) {
        const pageCount = doc.getNumberOfPages();
        const currentPage = data.pageNumber;
        doc.setPage(currentPage);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
          "Simulación ilustrativa. No incluye comisiones ni impuestos. Rendimientos pasados no garantizan rendimientos futuros.",
          105,
          doc.internal.pageSize.height - 15,
          { align: "center" }
        );
        doc.text(
          `Página ${currentPage} de ${pageCount}`,
          doc.internal.pageSize.width - 30,
          doc.internal.pageSize.height - 10
        );
      },
    });
    doc.save(
      `Estimacion_Inversion_BridgeCapital_${currentFormValues.investmentTerm}anos.pdf`
    );
  };

  return (
    <section className="editorial w-full">
      <div
        className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES} border-t border-[var(--color-rule)] pt-16 pb-24 md:pt-20`}>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16 items-start">
            {/* Columna de Inputs */}
            <div className="space-y-10 lg:col-span-5">
              {/* FormField para initialCapital */}
              <FormField
                control={form.control}
                name="initialCapital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capital inicial</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        placeholder="Ej: $3,000,000"
                        {...field}
                        className={inputBottomBorderStyle}
                        onFocus={() => handleCurrencyFocus("initialCapital")}
                        onBlur={() => {
                          field.onBlur();
                          handleCurrencyBlur("initialCapital");
                        }}
                        onChange={(e) => {
                          const value = e.target.value;
                          const sanitizedValue = value.replace(/[^0-9.]/g, "");
                          if ((sanitizedValue.match(/\./g) || []).length <= 1) {
                            field.onChange(sanitizedValue);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Monto inicial de tu inversión. Mínimo $3,000,000.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* FormField para annualReturn */}
              <FormField
                control={form.control}
                name="annualReturn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rendimiento anual estimado</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={selectTriggerStyle}>
                          <SelectValue placeholder="Selecciona un rendimiento" />
                          <span className="absolute inset-y-0 right-1 flex items-center pointer-events-none text-sm text-[var(--color-stone)]">
                            ▼
                          </span>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {annualReturnOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {annualReturnLabels[option]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Tasa promedio anual supuesta. Como referencia, CETES paga alrededor de 6 % y la bolsa ha promediado entre 9 % y 12 % en plazos largos.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* FormField para investmentTerm */}
              <FormField
                control={form.control}
                name="investmentTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plazo de inversión</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedTermForDescription(value);
                      }}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={selectTriggerStyle}>
                          <SelectValue placeholder="Selecciona un plazo" />
                          <span className="absolute inset-y-0 right-1 flex items-center pointer-events-none text-sm text-[var(--color-stone)]">
                            ▼
                          </span>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">5 años</SelectItem>
                        <SelectItem value="10">10 años</SelectItem>
                        <SelectItem value="20">20 años</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Resultados calculados para{" "}
                      {selectedTermForDescription ||
                        getValues("investmentTerm")}{" "}
                      años.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* FormField para annualContribution */}
              <FormField
                control={form.control}
                name="annualContribution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aportación anual adicional (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        placeholder="Ej: $10,000"
                        {...field}
                        className={inputBottomBorderStyle}
                        onFocus={() =>
                          handleCurrencyFocus("annualContribution")
                        }
                        onBlur={() => {
                          field.onBlur();
                          handleCurrencyBlur("annualContribution");
                        }}
                        onChange={(e) => {
                          const value = e.target.value;
                          const sanitizedValue = value.replace(/[^0-9.]/g, "");
                          if ((sanitizedValue.match(/\./g) || []).length <= 1) {
                            field.onChange(sanitizedValue);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Suma que planeas agregar al inicio de cada año a partir
                      del segundo. Mínimo $10,000 si es mayor a $0.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isCalculating}
                className="btn btn-primary w-full h-auto">
                {isCalculating ? "Calculando..." : "Calcular"}
              </Button>
            </div>

            {/* Columna de Resultados */}
            {!results && (
              <div className="flex min-h-[22rem] items-center border-t border-[var(--color-rule)] pt-10 lg:col-span-6 lg:col-start-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                <p className="t-lead">
                  Ajusta el capital, el rendimiento y el plazo, y presiona
                  Calcular para ver tu estimación año por año.
                </p>
              </div>
            )}
            {results && (
              <div className="space-y-8 border-t border-[var(--color-rule)] pt-10 lg:col-span-6 lg:col-start-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12" aria-live="polite">
                <div>
                  <p className="text-sm text-[var(--color-stone)]">
                    Valor estimado a {getValues("investmentTerm")} años
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.75rem,2rem+3vw,4.5rem)] leading-none">
                    {formatCurrency(results.totalValue, true)}
                  </p>
                  <p className="mt-4 text-[0.9375rem] text-[var(--color-stone)]">
                    Equivale a{" "}
                    <span className="font-medium text-[var(--color-ink)]">
                      {formatCurrency(results.realTotalValue, true)}
                    </span>{" "}
                    en pesos de hoy, considerando una inflación de{" "}
                    {INFLATION_RATE * 100} % anual.
                  </p>
                </div>
                <dl className="grid grid-cols-2 gap-6 border-y border-[var(--color-rule)] py-6">
                  <div>
                    <dt className="text-sm text-[var(--color-stone)]">Tus aportaciones</dt>
                    <dd className="mt-1 text-lg font-medium">{formatCurrency(results.totalContributions, true)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[var(--color-stone)]">Rendimiento estimado</dt>
                    <dd className="mt-1 text-lg font-medium">{formatCurrency(results.totalInterest, true)}</dd>
                  </div>
                </dl>

                <Link href="/contacto" className="btn btn-primary w-full">
                  Habla con un asesor sobre este escenario
                </Link>

                <Button
                  type="button"
                  onClick={handleGeneratePDF}
                  variant="outline"
                  className="btn w-full h-auto rounded-[2px] border border-[var(--color-ink)] bg-transparent text-[var(--color-ink)] shadow-none hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]">
                  Descargar estimación en PDF
                </Button>

                {results.breakdown.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Desglose por año
                    </h4>
                    <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
                      {results.breakdown.map((item) => (
                        <div
                          key={item.year}
                          className="py-3 flex justify-between items-center">
                          <p className="text-sm text-[var(--color-stone)]">
                            Al final del año {item.year}
                          </p>
                          <p className="font-medium">
                            {formatCurrency(item.value, true)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs leading-relaxed text-[var(--color-stone)]">
                  Simulación ilustrativa con interés compuesto anual a una tasa
                  constante; en la realidad los rendimientos varían año con año y
                  pueden ser negativos. El valor nominal no descuenta comisiones,
                  impuestos ni inflación. Los rendimientos pasados no garantizan
                  rendimientos futuros y esta estimación no constituye una
                  recomendación ni una promesa de retorno.
                </p>
              </div>
            )}
          </form>
        </Form>
      </div>
    </section>
  );
};

export default InvestmentCalculator;
