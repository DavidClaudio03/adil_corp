import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { nombre, email, telefono, empresa, servicio, mensaje } = data;

    if (!nombre || !email || !telefono || !servicio) {
      return NextResponse.json(
        { success: false, message: "Campos obligatorios faltantes." },
        { status: 400 }
      );
    }

    const html = `
      <h2>Solicitud de información</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Empresa:</strong> ${empresa || "No especificada"}</p>
      <p><strong>Servicio:</strong> ${servicio}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje || "Sin mensaje adicional."}</p>
      <hr />
      <p style="font-size: 12px; color: #888;">Este mensaje fue enviado desde el formulario de contacto del sitio web AdilServices.</p>
    `;

    await resend.emails.send({
      from: "Formulario Web AdilServices <info@adilservices.com>",
      to: "info@adilservices.com",
      subject: `Solicitud de información – ${nombre}`,
      html,
      //reply_to: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return NextResponse.json(
      { success: false, message: "Error al enviar el correo." },
      { status: 500 }
    );
  }
}
