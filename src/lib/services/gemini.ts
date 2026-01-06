// Serviço de integração com OpenAI para análise de matrículas

import OpenAI from 'openai'
import { MatriculaData, Proprietario } from '../types'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''
const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

// Função de delay para retry
const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

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

export async function analyzeMatricula(matriculaText: string): Promise<MatriculaData> {
  const prompt = `Você é um especialista em análise de matrículas de imóveis brasileiras.

Analise o texto da matrícula abaixo e extraia as seguintes informações em formato JSON:

{
  "numero": "número da matrícula",
  "cartorio": "nome do cartório de registro",
  "endereco": "endereço completo do imóvel",
  "area": "área do imóvel em m²",
  "proprietarios": [
    {
      "nome": "nome completo",
      "cpfCnpj": "CPF ou CNPJ (apenas números)",
      "tipo": "PF ou PJ"
    }
  ],
  "averbacoes": ["lista de averbações importantes"],
  "onus": ["lista de ônus, hipotecas, penhoras ou gravames encontrados"]
}

IMPORTANTE:
- Extraia APENAS os PROPRIETÁRIOS ATUAIS do imóvel (os que constam na ÚLTIMA transmissão/compra vigente)
- A última transmissão geralmente tem 1 ou 2 proprietários (ex: casal que comprou junto)
- NÃO inclua proprietários anteriores que já venderam ou transmitiram o imóvel
- A matrícula mostra um histórico cronológico - identifique quem é o dono ATUAL baseado no registro mais recente de compra/venda
- Se a última transmissão foi para um casal, inclua AMBOS os cônjuges
- Se não encontrar algum campo, coloque null
- Os CPFs/CNPJs devem ter apenas números
- Seja preciso na extração

TEXTO DA MATRÍCULA:
${matriculaText}

Responda APENAS com o JSON, sem explicações adicionais.`

  try {
    const result = await generateWithRetry([
      { role: 'user', content: prompt }
    ])
    
    const textResponse = result.choices[0]?.message?.content || ''

    // Contagem de tokens
    const inputTokens = result.usage?.prompt_tokens || 0
    const outputTokens = result.usage?.completion_tokens || 0
    
    console.log(`📊 Análise Matrícula - Input: ${inputTokens}, Output: ${outputTokens}, Total: ${inputTokens + outputTokens}`)

    if (!textResponse) {
      throw new Error('Resposta vazia do OpenAI')
    }

    // Limpa o JSON de possíveis marcações markdown
    const jsonString = textResponse
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    const parsed = JSON.parse(jsonString)

    return {
      numero: parsed.numero || 'Não identificado',
      cartorio: parsed.cartorio || undefined,
      endereco: parsed.endereco || undefined,
      area: parsed.area || undefined,
      proprietarios: (parsed.proprietarios || []).map((p: Proprietario) => ({
        nome: p.nome,
        cpfCnpj: p.cpfCnpj?.replace(/\D/g, '') || '',
        tipo: p.tipo || 'PF'
      })),
      averbacoes: parsed.averbacoes || [],
      onus: parsed.onus || []
    }
  } catch (error) {
    console.error('Erro ao analisar matrícula com OpenAI:', error)
    throw error
  }
}

export async function generateAnalysisSummary(
  matriculaData: MatriculaData,
  certidoesResults: { tipo: string; status: string; detalhes?: string }[]
): Promise<{ resumo: string; tempoEstimado: string; status: 'limpo' | 'atencao' | 'pendencia' }> {
  const prompt = `Você é um especialista em due diligence imobiliária.

Com base nos dados abaixo, gere uma análise resumida para um corretor de imóveis.

DADOS DA MATRÍCULA:
${JSON.stringify(matriculaData, null, 2)}

CERTIDÕES CONSULTADAS:
${JSON.stringify(certidoesResults, null, 2)}

Responda em JSON com:
{
  "status": "limpo" ou "atencao" ou "pendencia",
  "tempoEstimado": "tempo estimado para receber comissão após a venda (ex: 30-45 dias, 2-3 meses, 6+ meses)",
  "resumo": "resumo em 2-3 frases sobre a situação do imóvel e o que o corretor precisa saber"
}

Critérios:
- "limpo": Sem pendências, certidões negativas, sem ônus. Comissão rápida.
- "atencao": Algumas certidões positivas mas de baixo risco, ou pequenos ônus. Pode atrasar um pouco.
- "pendencia": Ônus graves, penhoras, hipotecas não quitadas, certidões com débitos significativos. Risco alto.

Responda APENAS com o JSON.`

  try {
    const result = await generateWithRetry([
      { role: 'user', content: prompt }
    ])
    
    const textResponse = result.choices[0]?.message?.content || ''

    // Contagem de tokens
    const inputTokens = result.usage?.prompt_tokens || 0
    const outputTokens = result.usage?.completion_tokens || 0
    
    console.log(`📊 Resumo Análise - Input: ${inputTokens}, Output: ${outputTokens}, Total: ${inputTokens + outputTokens}`)

    if (!textResponse) {
      throw new Error('Resposta vazia do OpenAI')
    }

    const jsonString = textResponse
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    return JSON.parse(jsonString)
  } catch (error) {
    console.error('Erro ao gerar resumo com OpenAI:', error)
    // Fallback caso o OpenAI falhe
    const hasOnus = matriculaData.onus && matriculaData.onus.length > 0
    const hasPositiveCertidao = certidoesResults.some(c => c.status === 'positiva')

    if (hasOnus) {
      return {
        status: 'pendencia',
        tempoEstimado: '3-6 meses ou mais',
        resumo: 'Imóvel possui ônus registrados na matrícula. Recomenda-se análise jurídica antes de prosseguir com a venda.'
      }
    } else if (hasPositiveCertidao) {
      return {
        status: 'atencao',
        tempoEstimado: '45-90 dias',
        resumo: 'Algumas certidões retornaram com apontamentos. Verificar detalhes antes de fechar negócio.'
      }
    } else {
      return {
        status: 'limpo',
        tempoEstimado: '30-45 dias',
        resumo: 'Imóvel sem pendências identificadas. Documentação em ordem para venda.'
      }
    }
  }
}
