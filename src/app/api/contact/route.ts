// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as z from "zod";

// 1. Define el esquema de validación (debe coincidir con el del frontend)
const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido.").max(50, "El nombre es muy largo."),
  email: z.string().email("Correo electrónico inválido."),
  phone: z
    .string()
    .max(20, "El teléfono es muy largo.")
    .refine((v) => v === "" || /^[0-9+()\s-]{7,20}$/.test(v), "Teléfono inválido.")
    .optional()
    .or(z.literal('')),
  message: z.string().min(1, "El mensaje es requerido.").max(1000, "El mensaje es muy largo."),
  // El formulario del modal exige aceptar el Aviso de Privacidad (LFPDPPP).
  // Opcional aquí para no romper el formulario de ContactFormSection.
  privacyConsent: z.boolean().optional(),
});

// Escapa HTML para que nadie pueda inyectar enlaces o markup en el correo que recibe Bridge Capital.
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// 2. Variables de entorno. Resend se instancia dentro del handler para que
//    `next build` no truene cuando la API key no está disponible en build time.
const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.TO_EMAIL;
const fromEmail = process.env.FROM_EMAIL;

export async function POST(request: Request) {
  // Verifica si las variables de entorno clave están cargadas
  if (!resendApiKey) {
    console.error("RESEND_API_KEY no está definida.");
    return NextResponse.json({ message: 'Error de configuración del servidor.' }, { status: 500 });
  }
  if (!toEmail || !fromEmail) {
    return NextResponse.json({ message: 'Error de configuración del servidor.' }, { status: 500 });
  }

  const resend = new Resend(resendApiKey);

  try {
    const body = await request.json();

    // 4. Valida los datos del formulario usando Zod
    const validationResult = formSchema.safeParse(body);

    if (!validationResult.success) {
      console.error("Datos de formulario inválidos:", validationResult.error.flatten().fieldErrors);
      return NextResponse.json(
        { 
          message: 'Datos de formulario inválidos.', 
          errors: validationResult.error.flatten().fieldErrors 
        }, 
        { status: 400 }
      );
    }

    const { privacyConsent } = validationResult.data;
    const name = escapeHtml(validationResult.data.name);
    const email = escapeHtml(validationResult.data.email);
    const phone = validationResult.data.phone ? escapeHtml(validationResult.data.phone) : "";
    const message = escapeHtml(validationResult.data.message);

    // 5. Prepara el contenido del email
    const subject = `Nuevo Mensaje de Contacto de: ${validationResult.data.name.replace(/[\r\n]/g, ' ')}`;
    const emailHtmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #003F5F;">Nuevo Mensaje de Contacto desde el Sitio Web</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Correo Electrónico:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Teléfono:</strong> <a href="tel:${phone.replace(/[^0-9+]/g, "")}">${phone}</a></p>` : ''}
          ${privacyConsent ? `<p><strong>Aceptó Aviso de Privacidad:</strong> Sí (${new Date().toISOString()})</p>` : ''}
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Mensaje:</strong></p>
          <div style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 30px; font-size: 0.9em; color: #777;">
            Este mensaje fue enviado desde el formulario de contacto del sitio web de Bridge Capital.
          </p>
        </body>
      </html>
    `;

    // 6. Envía el email usando Resend
    const { data, error: sendError } = await resend.emails.send({
      from: fromEmail,       // Ej: 'Bridge Capital Web <contacto@tudominioverificado.com>'
      to: [toEmail],         // Ej: 'tuCorreoReceptor@tuempresa.com'
      subject: subject,
      html: emailHtmlContent,
      replyTo: validationResult.data.email, // Para que al responder, le respondas al usuario
    });

    if (sendError) {
      console.error('Error al enviar email con Resend:', sendError);
      return NextResponse.json({ message: 'Error al enviar el mensaje.' }, { status: 500 });
    }

    return NextResponse.json({ message: '¡Mensaje enviado con éxito!', emailId: data?.id }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error en la API Route /api/contact:', error);
    // No exponemos detalles internos al cliente; quedan en los logs de Vercel.
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}