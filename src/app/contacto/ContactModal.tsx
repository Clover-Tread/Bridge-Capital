"use client"; // Necesario para la interactividad del formulario y el modal

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * Componente del Formulario con Lógica de Validación
 * Maneja su propio estado para los campos y los errores.
 */
type FormFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
  privacyConsent: boolean;
};

type FormErrors = Record<keyof FormFields, string>;

const emptyErrors: FormErrors = {
  name: "",
  email: "",
  phone: "",
  message: "",
  privacyConsent: "",
};

const ContactForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    phone: "",
    message: "",
    privacyConsent: false,
  });
  const [errors, setErrors] = useState<FormErrors>(emptyErrors);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const validate = () => {
    const newErrors: FormErrors = { ...emptyErrors };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Por favor, introduce tu nombre completo.";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El formato del correo no es válido.";
      isValid = false;
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      newErrors.phone = "Introduce un teléfono de 10 dígitos.";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "No olvides escribir tu mensaje.";
      isValid = false;
    }
    if (!formData.privacyConsent) {
      newErrors.privacyConsent =
        "Necesitamos tu consentimiento para contactarte.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setServerMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || "No pudimos enviar tu mensaje.");
      }
      setStatus("success");
      setServerMessage(
        "¡Gracias! Un asesor se pondrá en contacto contigo muy pronto."
      );
      onSuccess();
    } catch (error) {
      setStatus("error");
      setServerMessage(
        error instanceof Error
          ? `${error.message} Intenta de nuevo o llámanos al (55) 8852 2764.`
          : "No pudimos enviar tu mensaje. Llámanos al (55) 8852 2764."
      );
    }
  };

  if (status === "success") {
    return (
      <p role="status" className="text-green-700 text-base py-6 text-center">
        {serverMessage}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="sr-only">
          Nombre
        </label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Nombre Completo"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          required
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Correo Electrónico
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          required
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="phone" className="sr-only">
          Teléfono
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Teléfono (10 dígitos)"
          value={formData.phone}
          onChange={handleChange}
          aria-invalid={!!errors.phone}
          required
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Mensaje
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="¿En qué te podemos ayudar?"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          aria-invalid={!!errors.message}
          required
        />
        {errors.message && (
          <p className="text-red-600 text-sm mt-1">{errors.message}</p>
        )}
      </div>
      <div>
        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="privacyConsent"
            checked={formData.privacyConsent}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                privacyConsent: e.target.checked,
              }))
            }
            aria-invalid={!!errors.privacyConsent}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-dark-red)]"
          />
          <span>
            He leído y acepto el{" "}
            <Link
              href="/legal/aviso-de-privacidad"
              target="_blank"
              className="underline underline-offset-2 text-[var(--color-dark-red)]">
              Aviso de Privacidad
            </Link>
            .
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="text-red-600 text-sm mt-1">{errors.privacyConsent}</p>
        )}
      </div>
      {status === "error" && (
        <p role="alert" className="text-red-600 text-sm">
          {serverMessage}
        </p>
      )}
      <Button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[var(--color-dark-red)] hover:bg-[var(--color-dark-red-hover)]/90 text-white font-bold">
        {status === "sending" ? "Enviando..." : "Enviar Mensaje"}
      </Button>
    </form>
  );
};

/**
 * Componente que actúa como el disparador del Modal (el botón).
 * Se exporta para poder usarlo en PreContactCTASection.tsx
 */
export const ContactModalTrigger = () => {
  return (
    <DialogTrigger asChild>
      <Button
        size="lg"
        className=" bg-[var(--color-dark-red)] hover:bg-[var(--color-dark-red-hover)]/90 text-white font-bold text-lg px-8 py-6">
        Contacta a un asesor
      </Button>
    </DialogTrigger>
  );
};

/**
 * Componente principal que une el Modal y el Formulario.
 * Recibe 'children', que será el botón disparador (ContactModalTrigger)
 * envuelto en la sección visible de la página (PreContactCTASection).
 */
export const ContactModal = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    // Cierra el modal después de un envío exitoso
    // Deja visible el mensaje de confirmación unos segundos antes de cerrar.
    setTimeout(() => {
      setIsOpen(false);
    }, 3500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children} {/* Aquí se renderizará el componente que contiene el botón */}
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[var(--color-primary-blue)]">
            Contacta a un Experto
          </DialogTitle>
          <DialogDescription className="pt-2">
            Completa tus datos y un miembro de nuestro equipo se comunicará
            contigo a la brevedad.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ContactForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
