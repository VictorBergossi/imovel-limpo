import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''
const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

// Função de delay para retry
const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// Função para enviar mensagem com retry automático
async function sendMessageWithRetry(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  maxRetries = 3
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 2048
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
    const body = await request.json()
    const { message, history = [] } = body as { message: string; history: ChatMessage[] }

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' },
        { status: 400 }
      )
    }

    // Contexto do sistema
    const systemPrompt = `Você é o assistente virtual do Imóvel Limpo, uma plataforma que analisa matrículas de imóveis e certidões para corretores imobiliários.

Seu papel é:
1. Receber e entender matrículas de imóveis que os usuários enviam
2. Explicar o processo de análise
3. Responder dúvidas sobre documentação imobiliária
4. Ser amigável e profissional

Quando o usuário enviar um texto que parece ser uma matrícula de imóvel (contém palavras como "matrícula", "registro", "cartório", "R$", "imóvel", "averbação", proprietário, CPF, CNPJ, etc), você deve:
1. Confirmar que recebeu a matrícula
2. Informar que vai iniciar a análise
3. Responder com a seguinte estrutura JSON no final da sua mensagem:
{"action": "ANALYZE_MATRICULA", "hasMatricula": true}

Se o usuário enviar uma mensagem normal (dúvida, saudação, etc), responda normalmente de forma amigável.

IMPORTANTE: 
- Responda SEMPRE em português do Brasil
- Seja conciso e objetivo
- Se identificar uma matrícula, SEMPRE inclua o JSON de ação no final
- Você é simpático mas profissional`

    // Monta o histórico para o chat
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...history.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    const result = await sendMessageWithRetry(messages)
    const textResponse = result.choices[0]?.message?.content || ''

    // Contagem de tokens
    const inputTokens = result.usage?.prompt_tokens || 0
    const outputTokens = result.usage?.completion_tokens || 0
    
    console.log(`📊 Chat Tokens - Input: ${inputTokens}, Output: ${outputTokens}, Total: ${inputTokens + outputTokens}`)

    if (!textResponse) {
      throw new Error('Resposta vazia do OpenAI')
    }

    // Verifica se há ação de análise
    const actionMatch = textResponse.match(/\{"action":\s*"ANALYZE_MATRICULA".*?\}/)
    let shouldAnalyze = false
    let cleanResponse = textResponse

    if (actionMatch) {
      try {
        const action = JSON.parse(actionMatch[0])
        shouldAnalyze = action.hasMatricula === true
        // Remove o JSON da resposta visível
        cleanResponse = textResponse.replace(actionMatch[0], '').trim()
      } catch {
        // Ignora erros de parse
      }
    }

    return NextResponse.json({
      success: true,
      response: cleanResponse,
      shouldAnalyze,
      matriculaText: shouldAnalyze ? message : null,
      tokenUsage: {
        input: inputTokens,
        output: outputTokens,
        total: inputTokens + outputTokens
      }
    })
  } catch (error: unknown) {
    const err = error as { message?: string }
    console.error('Erro no chat:', error)
    
    if (err.message?.includes('429')) {
      return NextResponse.json(
        { error: 'Limite de requisições atingido. Aguarde alguns segundos e tente novamente.' },
        { status: 429 }
      )
    }
    
    return NextResponse.json(
      { error: 'Erro ao processar mensagem. Tente novamente.' },
      { status: 500 }
    )
  }
}
