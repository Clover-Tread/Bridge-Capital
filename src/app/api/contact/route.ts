// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as z from "zod";

// 1. Define el esquema de validación (debe coincidir con el del frontend)
const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido.").max(50, "El nombre es muy largo."),
  email: z.string().email("Correo electrónico inválido."),
  phone: z.string().max(15, "El teléfono es muy largo.").optional().or(z.literal('')), // Coincide con el frontend
  message: z.string().min(1, "El mensaje es requerido.").max(500, "El mensaje es muy largo."),
});

// 2. Inicializa Resend con tu API key desde las variables de entorno
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  console.error("RESEND_API_KEY no está definida en las variables de entorno.");
  // En un caso real, podrías querer manejar esto de forma más robusta
}
const resend = new Resend(resendApiKey);

// 3. Define el email receptor y el remitente (idealmente desde variables de entorno)
const toEmail = process.env.TO_EMAIL;
const fromEmail = process.env.FROM_EMAIL;

if (!toEmail || !fromEmail) {
  console.error("COMPANY_CONTACT_EMAIL o RESEND_FROM_EMAIL no están definidos.");
}

export async function POST(request: Request) {
  // Verifica si las variables de entorno clave están cargadas
  if (!resendApiKey) {
    return NextResponse.json({ message: 'Error de configuración del servidor: RESEND_API_KEY faltante.' }, { status: 500 });
  }
  if (!toEmail || !fromEmail) {
    return NextResponse.json({ message: 'Error de configuración del servidor: Email de contacto o remitente faltante.' }, { status: 500 });
  }

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

    const { name, email, phone, message } = validationResult.data;

    // 5. Prepara el contenido del email
    const subject = `Nuevo Mensaje de Contacto de: ${name}`;
    const emailHtmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #003F5F;">Nuevo Mensaje de Contacto desde el Sitio Web</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Correo Electrónico:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
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
      replyTo: email,        // Para que al responder, le respondas al usuario
    });

    if (sendError) {
      console.error('Error al enviar email con Resend:', sendError);
      return NextResponse.json({ message: 'Error al enviar el mensaje.', errorDetail: sendError.message }, { status: 500 });
    }

    console.log('Email enviado exitosamente:', data);
    return NextResponse.json({ message: '¡Mensaje enviado con éxito!', emailId: data?.id }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error en la API Route /api/contact:', error);
    // Evita exponer detalles internos del error al cliente en producción
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
    return NextResponse.json({ message: 'Error interno del servidor.', errorDetail: errorMessage }, { status: 500 });
  }
}