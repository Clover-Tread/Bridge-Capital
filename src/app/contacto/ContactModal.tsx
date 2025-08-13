"use client"; // Necesario para la interactividad del formulario y el modal

import React, { useState } from "react";
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
const ContactForm = ({ onSuccess }: { onSuccess: () => void }) => {
  // Estado para los valores de los inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Estado para los mensajes de error
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Estado para el proceso de envío
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'

  // Función para validar los campos del formulario
  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Por favor, introduce tu nombre completo.";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
      isValid = false;
    }
    // Opcional: validación de formato de email
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El formato del correo no es válido.";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "No olvides escribir tu mensaje.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Maneja los cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Maneja el envío del formulario de forma real
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate()) {
      setStatus("sending");
      // console.log("Formulario válido, enviando al backend...", formData);

      try {
        // 1. Enviamos una solicitud POST a nuestra API Route
        const response = await fetch("../../api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // 2. Convertimos los datos del formulario a formato JSON
          body: JSON.stringify(formData),
        });

        // 3. Si el servidor responde con un error, lo manejamos
        if (!response.ok) {
          // Obtenemos el mensaje de error del backend si existe
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Algo salió mal en el servidor."
          );
        }

        // 4. Si todo sale bien
        console.log("Formulario enviado y procesado con éxito por el backend.");
        setStatus("success");
        onSuccess(); // Cierra el modal
      } catch (error) {
        // 5. Si hay un error de red o del servidor, lo mostramos
        console.error("Error al enviar el formulario:", error);
        setStatus("error");
        // Aquí podrías mostrar un mensaje de error al usuario en la UI
      }
    } else {
      console.error("La validación del formulario falló.", errors);
    }
  };

  return (
    // 'noValidate' deshabilita los popups de validación del navegador
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="sr-only">
          Nombre
        </label>
        <Input
          id="name"
          placeholder="Nombre Completo"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
        />
        {/* Muestra el mensaje de error personalizado si existe */}
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
          type="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Mensaje
        </label>
        <Textarea
          id="message"
          placeholder="Tu mensaje..."
          value={formData.message}
          onChange={handleChange}
          rows={5}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="text-red-600 text-sm mt-1">{errors.message}</p>
        )}
      </div>
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
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
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
