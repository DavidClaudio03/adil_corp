import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { nombre, email, telefono, empresa, servicio, mensaje } = data;

    // Validación básica
    if (!nombre || !email || !telefono || !servicio) {
      return NextResponse.json(
        { success: false, message: "Campos obligatorios faltantes." },
        { status: 400 }
      );
    }

    // Configurar transporte SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Cuerpo del correo
    const mailOptions = {
      from: `"Contacto Web AdilServices" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Solicitud de información – ${nombre}`,
      html: `
        <h2>Solicitud de información</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Empresa:</strong> ${empresa || "No especificada"}</p>
        <p><strong>Servicio:</strong> ${servicio}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje || "Sin mensaje adicional."}</p>
        <hr />
        <p style="font-size: 12px; color: #888;">Este mensaje fue enviado desde el formulario de contacto del sitio web.</p>
      `,
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return NextResponse.json(
      { success: false, message: "Error al enviar el correo." },
      { status: 500 }
    );
  }
}
