"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Clases compartidas (asumiendo que están definidas o las defines aquí)
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

// Esquema de validación con Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido." }).max(50),
  email: z
    .string()
    .email({ message: "Por favor, ingresa un correo electrónico válido." }),
  phone: z
    .string()
    .min(7, { message: "El teléfono debe tener al menos 7 dígitos." })
    .max(15)
    .optional()
    .or(z.literal("")),
  message: z.string().min(1, { message: "El mensaje es requerido." }).max(500),
});

type FormValues = z.infer<typeof formSchema>;

const focusColorClass = "focus:border-b-[var(--color-primary)]";
const labelFocusColorClass = "text-[var(--color-primary)]";

const ContactFormSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",
        });
        form.reset();
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Hubo un error al enviar el mensaje."
        );
      }
    } catch (error: unknown) {
      let errorMessage = "Hubo un error al enviar el mensaje.";
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      setSubmitStatus({ type: "error", message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputBaseClasses = `
    peer block w-full appearance-none rounded-none 
    border-x-0 border-t-0 border-b-2 border-gray-300 
    bg-transparent px-0.5 py-2.5 text-sm text-slate-900 
    focus:outline-none focus:ring-0 ${focusColorClass} 
    dark:border-gray-600 dark:text-white dark:focus:border-b-[var(--color-primary)]
  `;

  const getLabelClasses = (fieldName: keyof FormValues, isTextarea = false) => {
    const hasValue = !!form.watch(fieldName);
    const isFocused = activeField === fieldName;
    const fieldError = form.formState.errors[fieldName];
    const shouldFloat = hasValue || isFocused || fieldError;

    let topClass = isTextarea ? "top-3" : "top-1/2 -translate-y-1/2";
    if (shouldFloat) {
      topClass = "top-0 -translate-y-full";
    }

    return `
      absolute left-0.5 ${topClass} transform cursor-text 
      text-base text-gray-500 dark:text-gray-400 
      transition-all duration-300 origin-[0]
      ${
        shouldFloat ? `scale-75 px-0 ${labelFocusColorClass}` : "scale-100 px-0"
      }
    `;
  };

  return (
    <section className="py-12 md:py-20 bg-white w-full">
      <div
        className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}`}>
        <div className="text-center mb-10 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-700">
            Iniciemos una Conversación Estratégica.
          </h3>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-10 max-w-2xl mx-auto">
            <FormField
              control={form.control}
              name="name"
              render={(
                { field } // Eliminado fieldState si error no se usa aquí directamente para la clase del label
              ) => (
                <FormItem className="relative pt-2">
                  <FormControl>
                    <Input
                      placeholder=" "
                      {...field}
                      className={inputBaseClasses}
                      onFocus={() => setActiveField("name")}
                      onBlur={() => {
                        if (activeField === "name") setActiveField(null);
                        field.onBlur();
                      }}
                    />
                  </FormControl>
                  <FormLabel className={getLabelClasses("name")}>
                    Nombre Completo
                  </FormLabel>
                  <FormMessage className="pt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative pt-2">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder=" "
                      {...field}
                      className={inputBaseClasses}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => {
                        if (activeField === "email") setActiveField(null);
                        field.onBlur();
                      }}
                    />
                  </FormControl>
                  <FormLabel className={getLabelClasses("email")}>
                    Correo Electrónico
                  </FormLabel>
                  <FormMessage className="pt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="relative pt-2">
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder=" "
                      {...field}
                      className={inputBaseClasses}
                      onFocus={() => setActiveField("phone")}
                      onBlur={() => {
                        if (activeField === "phone") setActiveField(null);
                        field.onBlur();
                      }}
                    />
                  </FormControl>
                  <FormLabel className={getLabelClasses("phone")}>
                    Teléfono de Contacto (Opcional)
                  </FormLabel>
                  <FormMessage className="pt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="relative pt-2">
                  <FormControl>
                    <Textarea
                      placeholder=" "
                      {...field}
                      className={`${inputBaseClasses} resize-none min-h-[100px]`}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => {
                        if (activeField === "message") setActiveField(null);
                        field.onBlur();
                      }}
                    />
                  </FormControl>
                  <FormLabel className={getLabelClasses("message", true)}>
                    Mensaje
                  </FormLabel>
                  <FormMessage className="pt-1" />
                </FormItem>
              )}
            />

            {submitStatus && (
              <p
                className={`text-sm ${
                  submitStatus.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                {submitStatus.message}
              </p>
            )}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-[#79242F] hover:bg-[#601e26] text-white font-semibold text-base md:text-lg py-4 px-8 md:py-7 md:px-10 rounded-lg transition-colors duration-300 ease-in-out">
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ContactFormSection;
