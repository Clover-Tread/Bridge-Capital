"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

export default function ContactForm() {
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
      <div role="status" className="border-t border-[var(--color-rule)] pt-8">
        <p className="t-h3">Mensaje enviado.</p>
        <p className="t-body mt-3 text-[var(--color-stone)]">{serverMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Nombre completo
        </label>
        <Input
          id="name"
          className="mt-2 h-12 rounded-none border-0 border-b border-[var(--color-ink)]/30 bg-transparent px-0 text-base shadow-none focus-visible:border-b-2 focus-visible:border-[var(--color-ink)] focus-visible:ring-0 aria-invalid:border-red-700"
          name="name"
          autoComplete="name"
          placeholder=""
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          required
        />
        {errors.name && (
          <p className="text-red-700 text-sm mt-2">{errors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Correo electrónico
        </label>
        <Input
          id="email"
          className="mt-2 h-12 rounded-none border-0 border-b border-[var(--color-ink)]/30 bg-transparent px-0 text-base shadow-none focus-visible:border-b-2 focus-visible:border-[var(--color-ink)] focus-visible:ring-0 aria-invalid:border-red-700"
          name="email"
          type="email"
          autoComplete="email"
          placeholder=""
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          required
        />
        {errors.email && (
          <p className="text-red-700 text-sm mt-2">{errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="phone" className="text-sm font-medium">
          Teléfono (10 dígitos)
        </label>
        <Input
          id="phone"
          className="mt-2 h-12 rounded-none border-0 border-b border-[var(--color-ink)]/30 bg-transparent px-0 text-base shadow-none focus-visible:border-b-2 focus-visible:border-[var(--color-ink)] focus-visible:ring-0 aria-invalid:border-red-700"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder=""
          value={formData.phone}
          onChange={handleChange}
          aria-invalid={!!errors.phone}
          required
        />
        {errors.phone && (
          <p className="text-red-700 text-sm mt-2">{errors.phone}</p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          ¿En qué te podemos ayudar?
        </label>
        <Textarea
          id="message"
          className="mt-2 min-h-32 rounded-none border-0 border-b border-[var(--color-ink)]/30 bg-transparent px-0 text-base shadow-none focus-visible:border-b-2 focus-visible:border-[var(--color-ink)] focus-visible:ring-0 aria-invalid:border-red-700"
          name="message"
          placeholder=""
          value={formData.message}
          onChange={handleChange}
          rows={4}
          aria-invalid={!!errors.message}
          required
        />
        {errors.message && (
          <p className="text-red-700 text-sm mt-2">{errors.message}</p>
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
          <p className="text-red-700 text-sm mt-2">{errors.privacyConsent}</p>
        )}
      </div>
      {status === "error" && (
        <p role="alert" className="text-red-700 text-sm">
          {serverMessage}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
