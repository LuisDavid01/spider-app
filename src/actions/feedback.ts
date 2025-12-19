'use server';
import { env } from "@/env";
import { Resend } from "resend";
import { z } from "zod";
import sanitizeHtml from 'sanitize-html';
const feedbackSchema = z.object({
	companyrole: z.string().min(1, "Role has to be included").max(50, "Role must be between 1 and 50 characters"),
	expertise: z.string().min(1, "Expertise has to be included").max(50, "Expertise must be between 1 and 50 characters"),
	coment: z.string().max(500, "Comment must be between 1 and 500 characters").optional().nullable(),
	features: z.array(z.string()).min(1, "Must select at least one feature").max(6, "You can only select up to 6 features"),
});

export type feedbackData = z.infer<typeof feedbackSchema>;

export async function sendFeedback(data: feedbackData): Promise<ActionResponse> {
	try {
		const validationResult = feedbackSchema.safeParse(data);
		if (!validationResult.success) {
			return {
				success: false,
				message: 'Validation failed',
				errors: validationResult.error.flatten().fieldErrors,
			}
		}

		// sanitizamos los datos
		const sanitazionResult = {
			features: validationResult.data.features.map(feature => sanitizeHtml(feature)),
			coment: sanitizeHtml(validationResult.data.coment ?? ''),
			expertise: sanitizeHtml(validationResult.data.expertise),
			companyrole: sanitizeHtml(validationResult.data.companyrole),
		}
		const currentDate = new Date().toLocaleString();
		const validatedData = sanitazionResult as feedbackData;
		const resend = new Resend(env.RESEND_SECRET_KEY);
		resend.emails.send({
			from: 'onboarding@resend.dev',
			to: 'luisdavid01@proton.me',
			subject: `Auto reporte ${currentDate}`,
			html:
				`
		<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 40px 20px;
      color: #374151;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      padding: 32px;
      border-bottom: 1px solid #f3f4f6;
    }
    .header h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #111827;
    }
    .content {
      padding: 32px;
    }
    .section {
      margin-bottom: 28px;
    }
    .label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #2563eb;
      margin-bottom: 8px;
    }
    .feature-tag {
      display: inline-block;
      background-color: #f3f4f6;
      border: 1px solid #e5e7eb;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 14px;
      margin-right: 6px;
      margin-bottom: 6px;
    }
    .comment-box {
      background-color: #f9fafb;
      border-left: 4px solid #e5e7eb;
      padding: 16px;
      font-style: italic;
      margin: 0;
    }
    .grid {
      display: table;
      width: 100%;
      border-top: 1px solid #f3f4f6;
      padding-top: 24px;
    }
    .grid-col {
      display: table-cell;
      width: 50%;
    }
    .data-value {
      font-size: 15px;
      font-weight: 500;
      color: #111827;
      margin: 0;
    }
    .footer {
      padding: 24px;
      background-color: #f9fafb;
      text-align: center;
      font-size: 12px;
      color: #9ca3af;
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <h1>Reporte de SpiderQ</h1>
    </div>

    <div class="content">
      <!-- Features -->
      <div class="section">
        <span class="label">Características Seleccionadas</span>
        <div>

          <span class="feature-tag">${validatedData.features.join(',')}</span>
        </div>
      </div>

      <!-- Comentario -->
      <div class="section">
        <span class="label">Comentarios del usuario</span>
        <p class="comment-box">
          "${validatedData.coment ?? 'Sin comentario del usuarios'}"
        </p>
      </div>

      <!-- Info del Usuario -->
      <div class="grid">
        <div class="grid-col">
          <span class="label">Expertise</span>
          <p class="data-value">${validatedData.expertise}}</p>
        </div>
        <div class="grid-col">
          <span class="label">Rol en Empresa</span>
          <p class="data-value">${validatedData.companyrole}</p>
        </div>
      </div>
    </div>

    <div class="footer">
      Este es un mensaje automático de recopilación de datos. ${currentDate}
	</div>
  </div>

</body>
</html>
		`
		});

		return {
			success: true,
			message: 'Gracias por tu opinión',
		}
	} catch (e) {
		return {
			success: false,
			message: 'Error al enviar el reporte',
			error: "Error interno del servidor"
		}
	}
}
