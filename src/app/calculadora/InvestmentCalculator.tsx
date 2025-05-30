"use client";

import React, { useState, useEffect } from "react";
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

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Clases compartidas y estilos
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

// Estilos específicos para los inputs y select
const inputBottomBorderStyle = ` block w-full appearance-none rounded-none border-x-0 border-t-0 border-b-2 border-gray-300 bg-transparent px-0.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-0 focus:border-b-[var(--color-primary)] dark:border-gray-600 dark:text-white dark:focus:border-b-[var(--color-primary)] `;
const selectTriggerStyle = ` w-full flex items-center justify-between rounded-none border-x-0 border-t-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:ring-offset-0 focus:border-b-[var(--color-primary)] h-auto py-2.5 pl-0.5 pr-8 text-sm text-left [&>svg]:hidden relative `;
const annualReturnOptions = [
  "4.00",
  "8.00",
  "12.00",
  "16.00",
  "25.00",
] as const;
const calculatorSchema = z.object({
  initialCapital: z.string().refine(
    (value) => {
      const num = parseFloat(value.replace(/[^0-9.]/g, ""));
      return !isNaN(num) && num >= 50000;
    },
    { message: "El capital inicial debe ser de al menos $50,000." }
  ),
  annualReturn: z.enum(annualReturnOptions, {
    required_error: "Debes seleccionar un rendimiento estimado.",
  }),
  investmentTerm: z.enum(["5", "10", "20"], {
    required_error: "Debes seleccionar un plazo.",
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
      initialCapital: "50,000",
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
    const P = parseCurrency(data.initialCapital);
    const r = parseFloat(data.annualReturn) / 100;
    const n = parseInt(data.investmentTerm);
    const C = data.annualContribution
      ? parseCurrency(data.annualContribution)
      : 0;
    let currentValue = P;
    let totalContributionsMade = P;
    const yearlyBreakdown: { year: number; value: number }[] = [];
    for (let year = 1; year <= n; year++) {
      if (year > 1) {
        currentValue += C;
        totalContributionsMade += C;
      } else if (year === 1 && P === 0 && C > 0) {
        currentValue += C;
        totalContributionsMade += C;
      }
      currentValue = currentValue * (1 + r);
      if ([5, 10, 15, 20].includes(year) || year === n) {
        if (
          yearlyBreakdown.findIndex((item) => item.year === year) === -1 &&
          year <= n
        ) {
          yearlyBreakdown.push({
            year,
            value: parseFloat(currentValue.toFixed(2)),
          });
        }
      }
    }
    const finalValue = parseFloat(currentValue.toFixed(2));
    const totalInterest = parseFloat(
      (finalValue - totalContributionsMade).toFixed(2)
    );
    const uniqueYears = new Set<number>();
    const finalBreakdownResult = yearlyBreakdown
      .filter((item) => {
        if (uniqueYears.has(item.year)) return false;
        uniqueYears.add(item.year);
        return true;
      })
      .sort((a, b) => a.year - b.year);
    if (
      !finalBreakdownResult.find((item) => item.year === n) &&
      n > 0 &&
      ![5, 10, 15, 20].includes(n)
    ) {
      finalBreakdownResult.push({ year: n, value: finalValue });
      finalBreakdownResult.sort((a, b) => a.year - b.year);
    }
    setTimeout(() => {
      setResults({
        totalValue: finalValue,
        totalContributions: totalContributionsMade,
        totalInterest: totalInterest,
        breakdown: finalBreakdownResult,
      });
      setIsCalculating(false);
    }, 500);
  }
  const handleGeneratePDF = () => {
    if (!results) return;
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
      `Intereses Estimados Ganados: ${formatCurrency(results.totalInterest, true)}`,
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
          "Esta es una simulación y los rendimientos reales pueden variar. No constituye una garantía de retorno.",
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
    <section className="py-12 md:py-16 bg-white w-full">
      <div
        className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}`}>
        {/* Texto Descriptivo */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-lg md:text-2xl text-(--color-primary) max-w-4xl mx-auto">
            Aquí podrás calcular los rendimientos aproximados de tus inversiones
            a lo largo de los años, tú decides el plazo y el monto a invertir.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 items-start">
            {/* Columna de Inputs */}
            <div className="space-y-8 bg-slate-50 p-6 md:p-8 rounded-lg shadow">
              {/* FormField para initialCapital */}
              <FormField
                control={form.control}
                name="initialCapital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capital Inicial</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ej: $50,000"
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
                      Monto inicial de tu inversión. Mínimo $50,000.
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
                    <FormLabel>Rendimiento Anual Estimado (%)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={selectTriggerStyle}>
                          <SelectValue placeholder="Selecciona un rendimiento" />
                          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-500">
                            ▼
                          </span>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {annualReturnOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}%
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Tasa esperada, los rendimientos reales pueden variar.
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
                    <FormLabel>Plazo de Inversión (Años)</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedTermForDescription(value);
                      }}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={selectTriggerStyle}>
                          <SelectValue placeholder="Selecciona un plazo" />
                          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-500">
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
                    <FormLabel>Aportación Anual Adicional (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
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
                      Suma que planeas agregar cada año. Mínimo $10,000 si es
                      mayor a $0.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isCalculating}
                className="w-full bg-[var(--color-dark-red)] hover:bg-[var(--color-dark-red-hover)] text-base py-3">
                {isCalculating ? "Calculando..." : "Calcular"}
              </Button>
            </div>

            {/* Columna de Resultados */}
            {results && (
              <div className="space-y-6 bg-sky-50 p-6 md:p-8 rounded-lg shadow">
                <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                  Resultados Estimados para{" "}
                  {results.breakdown.find(
                    (b) => b.year === parseInt(getValues("investmentTerm"))
                  )?.year || getValues("investmentTerm")}{" "}
                  años:
                </h3>
                <div className="space-y-3 text-lg mb-6">
                  <p>
                    <strong>Valor Estimado Total:</strong>{" "}
                    {formatCurrency(results.totalValue, true)}
                  </p>
                  <p>
                    <strong>Total de Tus Aportaciones:</strong>{" "}
                    {formatCurrency(results.totalContributions, true)}
                  </p>
                  <p className="font-semibold text-green-700">
                    <strong>Intereses Estimados Ganados:</strong>{" "}
                    {formatCurrency(results.totalInterest, true)}
                  </p>
                </div>

                <Button
                  onClick={handleGeneratePDF}
                  variant="outline"
                  className="w-full border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10">
                  Descargar Estimación en PDF
                </Button>

                {results.breakdown.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="text-xl font-semibold text-slate-700 mb-3">
                      Desglose del Valor Estimado:
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {results.breakdown.map((item) => (
                        <div
                          key={item.year}
                          className="bg-white p-3 rounded shadow flex justify-between items-center">
                          <p className="text-sm text-slate-600">
                            Al final del Año {item.year}
                          </p>
                          <p className="font-semibold text-slate-800 text-md">
                            {formatCurrency(item.value, true)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </Form>
      </div>
    </section>
  );
};

export default InvestmentCalculator;
