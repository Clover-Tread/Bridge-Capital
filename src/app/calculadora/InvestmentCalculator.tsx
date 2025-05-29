// src/components/calculadora/InvestmentCalculator.tsx
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

// Clases compartidas
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

// Estilo base para los inputs (solo borde inferior)
const inputBottomBorderStyle = `
  block w-full appearance-none rounded-none 
  border-x-0 border-t-0 border-b-2 border-gray-300 
  bg-transparent px-0.5 py-2.5 text-sm text-slate-900 
  focus:outline-none focus:ring-0 focus:border-b-[var(--color-primary)]
  dark:border-gray-600 dark:text-white dark:focus:border-b-[var(--color-primary)]
`;

// Esquema de validación Zod
const calculatorSchema = z.object({
  initialCapital: z
    .string()
    .refine((value) => parseFloat(value.replace(/[^0-9.]/g, "")) >= 50000, {
      message: "El capital inicial debe ser de al menos $50,000.",
    }),
  annualReturn: z.coerce
    .number()
    .min(0, "El rendimiento debe ser positivo.")
    .max(100, "Rendimiento inválido."),
  investmentTerm: z.enum(["5", "10", "20"], {
    required_error: "Debes seleccionar un plazo.",
  }),
  annualContribution: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (
          !value ||
          value.trim() === "" ||
          parseFloat(value.replace(/[^0-9.]/g, "")) === 0
        ) {
          return true; // Es opcional o cero, lo cual está bien
        }
        return parseFloat(value.replace(/[^0-9.]/g, "")) >= 10000;
      },
      {
        message: "La aportación anual debe ser $0 o al menos $10,000.",
      }
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
    useState<string>("10"); // Para FormDescription

  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      initialCapital: "50,000", // Almacenamos como string formateado por defecto
      annualReturn: 7,
      investmentTerm: "10",
      annualContribution: "10,000", // Almacenamos como string formateado
    },
    mode: "onBlur", // Validar onBlur
  });

  const { watch, setValue } = form;
  const investmentTermWatched = watch("investmentTerm");

  useEffect(() => {
    if (investmentTermWatched) {
      setSelectedTermForDescription(investmentTermWatched);
    }
  }, [investmentTermWatched]);

  // Helper para formatear a moneda
  const formatCurrency = (
    value: number | string | undefined,
    showSymbol = true
  ): string => {
    if (value === undefined || value === null || value === "") return "";
    const numValue =
      typeof value === "string"
        ? parseFloat(value.replace(/[^0-9.]/g, ""))
        : value;
    if (isNaN(numValue)) return "";
    return new Intl.NumberFormat("es-MX", {
      style: showSymbol ? "currency" : "decimal",
      currency: "MXN",
      minimumFractionDigits: 0, // O 2 si quieres centavos
      maximumFractionDigits: 0,
    }).format(numValue);
  };

  // Helper para parsear de moneda a número
  const parseCurrency = (value: string | undefined): number => {
    if (!value) return 0;
    return parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  };

  const handleCurrencyBlur = (
    fieldName: "initialCapital" | "annualContribution"
  ) => {
    const currentValue = form.getValues(fieldName);
    if (currentValue !== undefined) {
      const numericValue = parseCurrency(currentValue);
      setValue(fieldName, formatCurrency(numericValue, false), {
        shouldValidate: true,
      }); // Formatear sin $ para re-edición, valida al salir
    }
  };

  const handleCurrencyFocus = (
    fieldName: "initialCapital" | "annualContribution"
  ) => {
    const currentValue = form.getValues(fieldName);
    if (currentValue !== undefined) {
      const numericValue = parseCurrency(currentValue);
      setValue(fieldName, numericValue > 0 ? numericValue.toString() : "", {
        shouldValidate: false,
      }); // Mostrar número para editar
    }
  };

  function onSubmit(data: CalculatorFormValues) {
    setIsCalculating(true);
    setResults(null);

    const P = parseCurrency(data.initialCapital);
    const r = data.annualReturn / 100;
    const n = parseInt(data.investmentTerm);
    const C = data.annualContribution
      ? parseCurrency(data.annualContribution)
      : 0;

    let currentValue = P;
    let totalContributionsMade = P; // Incluye el capital inicial como primera aportación
    const yearlyBreakdown: { year: number; value: number }[] = [];

    // Ajuste para la primera aportación C si P > 0
    // Si hay P, la primera C se suma al inicio del año 2 (o fin del año 1)
    // Si P = 0, la primera C se suma al inicio del año 1

    // Si se desea sumar C en el año 1 incluso si P > 0:
    // if (P > 0 && C > 0 && n >= 1) {
    //   currentValue += C; // Asumimos que P y la primera C se invierten juntas al inicio
    //   totalContributionsMade += C;
    // }

    for (let year = 1; year <= n; year++) {
      // Aportación anual (C) se suma al inicio de cada año *después* del primer año si ya hubo P,
      // o en el primer año si P era 0.
      if (year > 1) {
        currentValue += C;
        totalContributionsMade += C;
      } else if (year === 1 && P === 0 && C > 0) {
        // Si no hay capital inicial, la primera C cuenta en el año 1
        currentValue += C;
        totalContributionsMade += C;
      }

      currentValue = currentValue * (1 + r);

      if (year === 5 || year === 10 || year === 20 || year === n) {
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

    const finalBreakdown = yearlyBreakdown
      .filter((item) => item.year <= n)
      .sort((a, b) => a.year - b.year);

    if (!finalBreakdown.find((item) => item.year === n) && n > 0) {
      // const lastEntryValue = finalBreakdown.length > 0 ? finalBreakdown[finalBreakdown.length -1].value : P * Math.pow(1+r, n); // Fallback
      // Para asegurar que el valor final para el año 'n' sea el calculado y no uno intermedio
      finalBreakdown.push({ year: n, value: finalValue });
      // Limpiar duplicados y re-ordenar por si n era 5, 10 o 20
      const uniqueYears = new Set<number>();
      const uniqueBreakdown = finalBreakdown
        .filter((item) => {
          if (uniqueYears.has(item.year)) return false;
          uniqueYears.add(item.year);
          return true;
        })
        .sort((a, b) => a.year - b.year);
      setResults({
        totalValue: finalValue,
        totalContributions: totalContributionsMade,
        totalInterest: totalInterest,
        breakdown: uniqueBreakdown,
      });
    } else {
      setResults({
        totalValue: finalValue,
        totalContributions: totalContributionsMade,
        totalInterest: totalInterest,
        breakdown: finalBreakdown,
      });
    }
    setIsCalculating(false);
  }

  return (
    <section className="py-12 md:py-16 bg-white w-full">
      <div
        className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}`}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 items-start">
            {/* Columna de Inputs */}
            <div className="space-y-8 bg-slate-50 p-6 md:p-8 rounded-lg shadow">
              {" "}
              {/* Aumentado space-y */}
              <FormField
                control={form.control}
                name="initialCapital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capital Inicial</FormLabel>
                    <FormControl>
                      <Input
                        type="text" // Cambiado a text para formato
                        placeholder="Ej: $50,000"
                        {...field}
                        className={inputBottomBorderStyle}
                        onFocus={() => handleCurrencyFocus("initialCapital")}
                        onBlur={() => {
                          field.onBlur();
                          handleCurrencyBlur("initialCapital");
                        }}
                        onChange={(e) => {
                          // Permitir solo números y un punto decimal
                          const value = e.target.value;
                          const sanitizedValue = value.replace(/[^0-9.]/g, "");
                          // Prevenir múltiples puntos decimales
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
              <FormField
                control={form.control}
                name="annualReturn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rendimiento Anual Estimado (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ej: 7"
                        {...field}
                        className={inputBottomBorderStyle}
                      />
                    </FormControl>
                    <FormDescription>
                      Tasa esperada, los rendimientos reales pueden variar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        <SelectTrigger
                          className={`rounded-none border-x-0 border-t-0 border-b-2 border-gray-300 focus:ring-0 focus:ring-offset-0 focus:border-b-[var(--color-primary)] [&>svg]:hidden`}>
                          {/* Ocultamos el icono de flecha por defecto con [&>svg]:hidden y añadimos uno personalizado */}
                          <SelectValue placeholder="Selecciona un plazo" />
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 pr-2 pointer-events-none">
                            ▼
                          </span>{" "}
                          {/* Flecha personalizada */}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">5 años</SelectItem>
                        <SelectItem value="10">10 años</SelectItem>
                        <SelectItem value="20">20 años</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Resultados calculados para {selectedTermForDescription}{" "}
                      años.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="annualContribution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aportación Anual Adicional (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="text" // Cambiado a text para formato
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
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                  Resultados Estimados para{" "}
                  {results.breakdown.find(
                    (b) => b.year === parseInt(form.getValues("investmentTerm"))
                  )?.year || form.getValues("investmentTerm")}{" "}
                  años:
                </h3>
                <div className="space-y-3 text-lg">
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

                {results.breakdown.length > 0 && (
                  <div className="mt-6 pt-4 border-t">
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
