import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { sendCandidaturaEmail } from '@/lib/email'

const candidaturaSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 caracteres'),
  service: z.enum(['tvde', 'estafeta', 'encomendas', 'relocation'], {
    errorMap: () => ({ message: 'Serviço inválido' })
  }),
  experience: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extrair dados do formulário
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const service = formData.get('service') as string
    const experience = formData.get('experience') as string
    const message = formData.get('message') as string
    const curriculo = formData.get('curriculo') as File | null

    // Validar dados textuais
    const validatedData = candidaturaSchema.parse({
      name,
      email,
      phone,
      service,
      experience: experience || undefined,
      message: message || undefined,
    })

    // Processar upload do currículo se existir
    let curriculoUrl: string | null = null

    if (curriculo && curriculo.size > 0) {
      // Validar tipo de arquivo
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      const maxSize = 5 * 1024 * 1024 // 5MB

      if (!allowedTypes.includes(curriculo.type)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Tipo de arquivo inválido. Aceitos: PDF, DOC, DOCX'
          },
          { status: 400 }
        )
      }

      if (curriculo.size > maxSize) {
        return NextResponse.json(
          {
            success: false,
            error: 'Arquivo muito grande. Tamanho máximo: 5MB'
          },
          { status: 400 }
        )
      }

      // Criar diretório de uploads se não existir
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'curriculos')
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true })
      }

      // Gerar nome único para o arquivo
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const fileExtension = path.extname(curriculo.name)
      const fileName = `${timestamp}-${randomString}${fileExtension}`
      const filePath = path.join(uploadDir, fileName)

      // Salvar arquivo
      const bytes = await curriculo.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)

      // URL pública do arquivo
      curriculoUrl = `/uploads/curriculos/${fileName}`
    }

    // Criar candidatura no banco
    const candidatura = await db.candidatura.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        service: validatedData.service,
        experience: validatedData.experience || null,
        message: validatedData.message || null,
        curriculoUrl: curriculoUrl,
      },
    })

    // Enviar notificação por email
    try {
      const emailResult = await sendCandidaturaEmail({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        service: validatedData.service,
        experience: validatedData.experience,
        message: validatedData.message,
        curriculoUrl: curriculoUrl,
      })

      if (emailResult.success) {
        console.log('✅ Email de notificação enviado com sucesso')
      } else {
        console.warn('⚠️ Erro ao enviar email:', emailResult.error)
      }
    } catch (emailError) {
      console.error('❌ Erro ao enviar email de notificação:', emailError)
      // Não falha a requisição se o email falhar
    }

    return NextResponse.json(
      {
        success: true,
        data: candidatura,
        message: 'Candidatura enviada com sucesso!'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao criar candidatura:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dados inválidos',
          details: error.errors
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao processar candidatura. Tente novamente mais tarde.'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const candidaturas = await db.candidatura.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: candidaturas
    })
  } catch (error) {
    console.error('Erro ao buscar candidaturas:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar candidaturas'
      },
      { status: 500 }
    )
  }
}
