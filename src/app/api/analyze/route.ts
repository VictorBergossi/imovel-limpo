import { NextRequest, NextResponse } from 'next/server'
import { analyzeMatricula, generateAnalysisSummary } from '@/lib/services/gemini'
import { consultarTodasCertidoes } from '@/lib/services/infosimples'
import { AnalysisReport } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { matriculaText } = body

    if (!matriculaText || typeof matriculaText !== 'string') {
      return NextResponse.json(
        { error: 'Texto da matrícula é obrigatório' },
        { status: 400 }
      )
    }

    // Etapa 1: Analisar matrícula com Gemini
    const matriculaData = await analyzeMatricula(matriculaText)

    // Etapa 2: Consultar certidões dos proprietários
    const certidoesResults = await consultarTodasCertidoes(matriculaData.proprietarios)

    // Etapa 3: Gerar resumo final com Gemini
    const certidoesParaResumo = certidoesResults.map(c => ({
      tipo: c.nome,
      status: c.status,
      detalhes: c.detalhes
    }))

    const analise = await generateAnalysisSummary(matriculaData, certidoesParaResumo)

    // Identificar pendências
    const pendencias: string[] = []
    
    // Pendências da matrícula
    if (matriculaData.onus && matriculaData.onus.length > 0) {
      pendencias.push(...matriculaData.onus.map(o => `📋 Ônus: ${o}`))
    }

    // Pendências das certidões
    certidoesResults
      .filter(c => c.status === 'positiva')
      .forEach(c => {
        pendencias.push(`⚠️ ${c.nome}: ${c.detalhes}`)
      })

    // Montar relatório final
    const report: AnalysisReport = {
      imovel: {
        matricula: matriculaData.numero,
        cartorio: matriculaData.cartorio,
        endereco: matriculaData.endereco,
        area: matriculaData.area
      },
      proprietarios: matriculaData.proprietarios,
      certidoes: certidoesResults,
      status: analise.status,
      tempoEstimadoComissao: analise.tempoEstimado,
      resumo: analise.resumo,
      pendencias
    }

    return NextResponse.json({ success: true, report })
  } catch (error) {
    console.error('Erro na análise:', error)
    return NextResponse.json(
      { error: 'Erro ao processar análise. Tente novamente.' },
      { status: 500 }
    )
  }
}


