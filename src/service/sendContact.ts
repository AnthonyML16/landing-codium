import { ActionError, defineAction } from "astro:actions";
import { Resend } from "resend";
import { isValidEmail, isValidPhone } from "../helpers/contactValidate";
import logo from "../assets/logo.webp";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: "form",
    handler: async (formData) => {
      const name = formData.get("name")?.toString() || "";
      const email = formData.get("email")?.toString() || "";
      const phone = formData.get("phone")?.toString() || "";
      const message = formData.get("message")?.toString() || "";

      if (!name) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "El nombre es obligatorio",
        });
      }
      if (!email || !isValidEmail(email)) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "El correo electrónico es obligatorio y debe ser válido",
        });
      }
      if (!phone || !isValidPhone(phone)) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "El teléfono es obligatorio y debe ser válido",
        });
      }
      if (!message) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "El mensaje es obligatorio",
        });
      }

      try {
        const { data, error } = await resend.emails.send({
          from: "Codium Platform <onboarding@resend.dev>",
          to: ["luis.anthony.laml@gmail.com"],
          subject: "Contacto - Codium Platform",
          html: `
          <body
            style="background-color:#efeef1;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
            <table
            align="center"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="max-width:580px;margin:30px auto;background-color:#ffffff">
            <tbody>
                <tr style="width:100%">
                <td>
                    <table
                    align="center"
                    width="100%"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="display:flex;justify-content:center;aling-items:center;padding:30px">
                    <tbody>
                        <tr>
                        <td>
                            <img
                            src="${logo.src}"
                            style="display:block;outline:none;border:none;text-decoration:none"
                            width="114"
                            alt="Logo Codium Platform" />
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    <table
                    align="center"
                    width="100%"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="width:100%;display:flex">
                    <tbody>
                        <tr>
                        <td>
                            <table
                            align="center"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation">
                            <tbody style="width:100%">
                                <tr style="width:100%">
                                <td
                                    data-id="__react-email-column"
                                    style="border-bottom:1px solid rgb(238,238,238);width:200px"></td>
                                <td
                                    data-id="__react-email-column"
                                    style="border-bottom:1px solid rgb(255,110,0);width:200px"></td>
                                <td
                                    data-id="__react-email-column"
                                    style="border-bottom:1px solid rgb(238,238,238);width:200px"></td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    <table
                    align="center"
                    width="100%"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="padding:5px 20px 10px 20px">
                    <tbody>
                        <tr>
                        <td>
                            <p style="font-size:14px;line-height:1.5;margin:16px 0">
                            Hola <strong>${name}</strong>
                            </p>
                            <p style="font-size:14px;line-height:1.5;margin:16px 0">
                            A continuación te enviamos una copia de la información de contacto que ingresaste en el sitio web de Codium.
                            </p>
                            <table style="width: 100%;">
                                <tr>
                                    <td style="width: 32.5%;">
                                        <p style="font-size:14px;line-height:1.5;margin:5px 25px;">Nombre</p>
                                    </td>
                                    <td style="width: 67.5%;">
                                        <p style="font-size:14px;line-height:1.5;margin:5px 25px;">${name}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 32.5%;">
                                        <p style="font-size:14px;line-height:1.5;margin:5px 25px;">Correo electrónico</p>
                                    </td>
                                    <td style="width: 67.5%;">
                                        <p style="font-size:14px;line-height:1.5;margin:5px 25px;">${email}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 32.5%;">
                                        <p style="font-size:14px;line-height:1.5;margin:5px 25px;">Teléfono</p>
                                    </td>
                                    <td style="width: 67.5%;">
                                        <p style="font-size:14px;line-height:1.5;margin:5px 25px;">${phone}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 32.5%;">
                                        <p style="font-size:14px;line-height:1.5;margin:5px 25px;">Mensaje</p>
                                    </td>
                                    <td style="width: 67.5%;">
                                        <p style="font-size:14px;line-height:1.5;margin:5px 25px;">${message}</p>
                                    </td>
                                </tr>
                            </table>
                            <p style="font-size:14px;line-height:1.5;margin:16px 0">
                                Pronto uno de nuestros asesores se pondrá en contacto contigo para brindarte más información.
                            </p>
                            <p style="font-size:14px;line-height:1.5;margin:16px 0">
                            Gracias,<br />Equipo de Codium Platform
                            </p>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </td>
                </tr>
            </tbody>
            </table>
            <table
            align="center"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="max-width:580px;margin:0 auto">
            <tbody>
                <tr>
                <td>
                    <table
                    align="center"
                    width="100%"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation">
                    <tbody style="width:100%">
                        <tr style="width:100%">
                            <p
                            style="font-size:14px;line-height:24px;margin:10px 0;text-align:center;color:#706a7b">
                            Por favor no respondas a este correo electrónico.
                            </p>
                        </tr>
                        <tr style="width:100%">
                        <p
                            style="font-size:14px;line-height:24px;margin:10px 0;text-align:center;color:#706a7b">
                            © 2025 Codium Platformm, Todos los Derechos Reservados <br />
                            Lima, Perú
                        </p>
                        </tr>
                    </tbody>
                    </table>
                </td>
                </tr>
            </tbody>
            </table>
        </body>
        `,
        });

        if (error) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        }

        return data;
      } catch (error) {
        if (error instanceof ActionError) {
          throw error; // Re-throw ActionError
        } else {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error al enviar el correo",
          });
        }
      }
    },
  }),
};
