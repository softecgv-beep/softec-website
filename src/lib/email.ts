import nodemailer from 'nodemailer'

interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

interface CandidaturaEmailData {
  name: string
  email: string
  phone: string
  service: string
  experience?: string
  message?: string
  curriculoUrl?: string
}

// Criar transporter de email (configurado com variáveis de ambiente)
const createTransporter = () => {
  const config: EmailConfig = {
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true para 465, false para 587
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  }

  return nodemailer.createTransport(config)
}

// Mapeamento de serviços para nomes legíveis
const serviceNames: { [key: string]: string } = {
  tvde: 'Frota TVDE',
  estafeta: 'Estafeta de Delivery',
  encomendas: 'Encomendas Express',
  relocation: 'Relocation de Veículos',
}

// Enviar email de nova candidatura
export async function sendCandidaturaEmail(data: CandidaturaEmailData) {
  const transporter = createTransporter()
  const toEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER
  const fromEmail = process.env.SMTP_USER || 'noreply@seu-dominio.com'

  if (!toEmail) {
    console.warn('NOTIFICATION_EMAIL não configurado. Email não será enviado.')
    return { success: false, message: 'Email de notificação não configurado' }
  }

  try {
    // URL completa do currículo
    const curriculoFullUrl = data.curriculoUrl
      ? `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${data.curriculoUrl}`
      : null

    const mailOptions = {
      from: `"SOFTEC - Sistema de Candidaturas" <${fromEmail}>`,
      to: toEmail,
      subject: `Nova Candidatura - ${serviceNames[data.service] || data.service} - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .info-row {
              margin: 15px 0;
              padding: 10px;
              background: white;
              border-left: 4px solid #16a34a;
              border-radius: 4px;
            }
            .label {
              font-weight: bold;
              color: #16a34a;
            }
            .footer {
              background: #333;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              background: #16a34a;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Nova Candidatura Recebida</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">SOFTEC - Gestão de Frotas</p>
          </div>

          <div class="content">
            <h2 style="color: #16a34a; margin-top: 0;">Informações do Candidato</h2>

            <div class="info-row">
              <span class="label">Nome:</span> ${data.name}
            </div>

            <div class="info-row">
              <span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
            </div>

            <div class="info-row">
              <span class="label">Telefone:</span> ${data.phone}
            </div>

            <div class="info-row">
              <span class="label">Serviço de Interesse:</span> ${serviceNames[data.service] || data.service}
            </div>

            ${data.experience ? `
            <div class="info-row">
              <span class="label">Experiência Prévia:</span><br/>
              ${data.experience}
            </div>
            ` : ''}

            ${data.message ? `
            <div class="info-row">
              <span class="label">Mensagem:</span><br/>
              ${data.message.replace(/\n/g, '<br/>')}
            </div>
            ` : ''}

            ${curriculoFullUrl ? `
            <div class="info-row">
              <span class="label">Currículo:</span><br/>
              <a href="${curriculoFullUrl}" target="_blank" style="color: #16a34a;">
                📎 Clique aqui para baixar o currículo
              </a>
            </div>
            ` : '<p style="color: #666; font-style: italic;">Nenhum currículo anexado.</p>'}

            <p style="text-align: center; color: #666; margin-top: 30px;">
              Esta candidatura foi enviada em: ${new Date().toLocaleString('pt-BR')}
            </p>
          </div>

          <div class="footer">
            <p style="margin: 0;">© ${new Date().getFullYear()} SOFTEC - Todos os direitos reservados</p>
            <p style="margin: 10px 0 0 0; opacity: 0.7; font-size: 14px;">
              Brasil: +55 33 99130-4737 | Portugal: +351 934 474 316
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
NOVA CANDIDATURA RECEBIDA - SOFTEC

====================================
INFORMAÇÕES DO CANDIDATO
====================================

Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}
Serviço: ${serviceNames[data.service] || data.service}

${data.experience ? `Experiência: ${data.experience}\n` : ''}
${data.message ? `Mensagem: ${data.message}\n` : ''}

${curriculoFullUrl ? `Currículo: ${curriculoFullUrl}` : 'Nenhum currículo anexado.'}

====================================
Enviado em: ${new Date().toLocaleString('pt-BR')}
====================================
      `,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email enviado com sucesso:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' }
  }
}
