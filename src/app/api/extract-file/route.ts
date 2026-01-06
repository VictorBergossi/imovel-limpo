import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { fromBuffer } from 'pdf2pic'
import path from 'path'
import os from 'os'
import fs from 'fs/promises'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''
const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

// Função de delay para retry
const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

// Função para converter PDF para imagens e extrair texto via OCR
async function extractTextFromPDFWithOCR(buffer: Buffer, fileName: string): Promise<string> {
  console.log('\n📄 Convertendo PDF para imagens...')
  
  const tempDir = path.join(os.tmpdir(), `pdf-${Date.now()}`)
  await fs.mkdir(tempDir, { recursive: true })
  
  try {
    const converter = fromBuffer(buffer, {
      density: 200,           // DPI - maior = melhor qualidade
      saveFilename: 'page',
      savePath: tempDir,
      format: 'png',
      width: 2000,            // Largura máxima
      height: 2800            // Altura máxima
    })
    
    // Primeiro, descobre quantas páginas tem
    const firstPage = await converter(1, { responseType: 'buffer' })
    
    if (!firstPage.buffer) {
      throw new Error('Falha ao converter primeira página')
    }
    
    console.log(`📄 Primeira página convertida: ${(firstPage.buffer.length / 1024).toFixed(0)} KB`)
    
    // Processa todas as páginas (até 10 para não demorar muito)
    const maxPages = 10
    const allTexts: string[] = []
    
    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      try {
        console.log(`\n📄 Processando página ${pageNum}...`)
        
        const pageResult = await converter(pageNum, { responseType: 'buffer' })
        
        if (!pageResult.buffer) {
          console.log(`📄 Página ${pageNum} não existe, finalizando.`)
          break
        }
        
        const base64Image = pageResult.buffer.toString('base64')
        console.log(`📄 Página ${pageNum}: ${(pageResult.buffer.length / 1024).toFixed(0)} KB`)
        
        // OCR com GPT-4o Vision
        const result = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Extraia TODO o texto visível nesta imagem de documento. 
Mantenha a formatação original.
Não omita nenhuma informação.
Retorne APENAS o texto extraído.`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/png;base64,${base64Image}`,
                    detail: 'high'
                  }
                }
              ]
            }
          ],
          max_tokens: 4096
        })
        
        const pageText = result.choices[0]?.message?.content || ''
        const tokens = result.usage?.total_tokens || 0
        
        console.log(`📄 Página ${pageNum} OCR: ${pageText.length} chars, ${tokens} tokens`)
        console.log(`   Preview: "${pageText.substring(0, 100)}..."`)
        
        if (pageText.trim()) {
          allTexts.push(`--- PÁGINA ${pageNum} ---\n${pageText}`)
        }
        
      } catch (pageError) {
        console.log(`📄 Erro na página ${pageNum}:`, pageError)
        break
      }
    }
    
    const fullText = allTexts.join('\n\n')
    
    console.log(`\n${'='.repeat(60)}`)
    console.log(`📄 TEXTO TOTAL VIA OCR: ${fullText.length} caracteres`)
    console.log(`📄 Páginas processadas: ${allTexts.length}`)
    console.log(`${'='.repeat(60)}`)
    console.log(fullText.substring(0, 1500))
    console.log(`${'='.repeat(60)}\n`)
    
    return fullText
    
  } finally {
    // Cleanup
    try {
      await fs.rm(tempDir, { recursive: true, force: true })
    } catch (e) {
      console.log('Cleanup error:', e)
    }
  }
}

// Função para gerar conteúdo com retry automático
async function generateWithRetry(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  maxRetries = 3
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 4096
      })
      return result
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string }
      
      if (err.status === 429 || err.message?.includes('429')) {
        console.log(`Limite atingido (tentativa ${attempt}/${maxRetries}), aguardando 25 segundos...`)
        
        if (attempt < maxRetries) {
          await delay(25000)
          continue
        }
      }
      
      throw error
    }
  }
  
  throw new Error('Número máximo de tentativas excedido')
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Arquivo não enviado' }, { status: 400 })
    }

    console.log(`\n${'#'.repeat(60)}`)
    console.log(`# PROCESSANDO: ${file.name}`)
    console.log(`# Tipo: ${file.type}`)
    console.log(`# Tamanho: ${(file.size / 1024).toFixed(2)} KB`)
    console.log(`${'#'.repeat(60)}\n`)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let mimeType = file.type
    if (!mimeType) {
      const extension = file.name.toLowerCase().split('.').pop()
      const mimeTypes: Record<string, string> = {
        'pdf': 'application/pdf',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'txt': 'text/plain'
      }
      mimeType = mimeTypes[extension || ''] || 'application/octet-stream'
    }

    // Texto puro
    if (mimeType === 'text/plain') {
      const text = await file.text()
      return NextResponse.json({ success: true, text })
    }

    // PDF - converte para imagem e usa OCR
    if (mimeType === 'application/pdf') {
      console.log('📄 PDF detectado - usando conversão para imagem + OCR')
      
      try {
        const extractedText = await extractTextFromPDFWithOCR(buffer, file.name)
        
        if (!extractedText.trim()) {
          return NextResponse.json(
            { error: 'Não foi possível extrair texto do PDF.' },
            { status: 400 }
          )
        }
        
        return NextResponse.json({ 
          success: true, 
          text: extractedText,
          fileName: file.name,
          method: 'pdf_to_image_ocr'
        })
        
      } catch (pdfError) {
        console.log('❌ Erro ao processar PDF:', pdfError)
        return NextResponse.json(
          { error: 'Erro ao processar PDF. Tente enviar como imagem.' },
          { status: 400 }
        )
      }
    }

    // Imagens - OCR direto
    if (mimeType.startsWith('image/')) {
      console.log('🖼️ Imagem - usando OCR direto')
      
      const base64Data = buffer.toString('base64')
      
      const result = await generateWithRetry([
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Extraia TODO o texto visível nesta imagem.
Mantenha a formatação original.
Não omita nenhuma informação.
Retorne APENAS o texto extraído.`
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64Data}`,
                detail: 'high'
              }
            }
          ]
        }
      ])

      const extractedText = result.choices[0]?.message?.content || ''
      const tokens = result.usage?.total_tokens || 0
      
      console.log(`📊 OCR: ${extractedText.length} chars, ${tokens} tokens`)

      return NextResponse.json({ 
        success: true, 
        text: extractedText,
        fileName: file.name,
        method: 'image_ocr'
      })
    }

    return NextResponse.json(
      { error: 'Tipo não suportado. Use PDF, imagem ou texto.' },
      { status: 400 }
    )

  } catch (error: unknown) {
    const err = error as { message?: string }
    console.error('❌ Erro geral:', error)
    
    return NextResponse.json(
      { error: err.message || 'Erro ao processar arquivo.' },
      { status: 500 }
    )
  }
}
