'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChatMessage, AnalysisReport } from '@/lib/types'
import { ChatBubble } from './ChatBubble'
import { ChatInput } from './ChatInput'
import { ReportCard } from './ReportCard'
import { Logo } from '@/components/Logo'
import { saveAnalysis } from '@/lib/services/storage'

function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [report, setReport] = useState<AnalysisReport | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mensagem inicial
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: generateId(),
        role: 'assistant',
        content: 'Olá! 👋 Sou o assistente do Imóvel Limpo.\n\nEnvie a matrícula do imóvel que você quer analisar:\n\n📎 **Anexe o PDF ou imagem** da matrícula\n📋 Ou **cole o texto** diretamente aqui\n\nVou extrair os dados e verificar certidões de todos os proprietários!',
        timestamp: new Date(),
        type: 'text'
      }])
    }
  }, [messages.length])

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, report])

  const addMessage = (role: 'user' | 'assistant', content: string, type: ChatMessage['type'] = 'text') => {
    const newMessage: ChatMessage = {
      id: generateId(),
      role,
      content,
      timestamp: new Date(),
      type
    }
    setMessages(prev => [...prev, newMessage])
    return newMessage
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    // Adiciona mensagem do usuário
    addMessage('user', content)
    setIsLoading(true)

    try {
      // Primeiro, envia para o chat para entender a mensagem
      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      })

      const chatData = await chatResponse.json()

      if (chatData.error) {
        addMessage('assistant', 'Desculpe, tive um problema ao processar sua mensagem. Tente novamente.')
        setIsLoading(false)
        return
      }

      // Adiciona resposta do chat
      addMessage('assistant', chatData.response)

      // Se detectou uma matrícula, inicia análise
      if (chatData.shouldAnalyze) {
        await runAnalysis(content)
      }
    } catch (error) {
      console.error('Erro:', error)
      addMessage('assistant', 'Ops! Algo deu errado. Por favor, tente novamente.')
    }

    setIsLoading(false)
  }

  const runAnalysis = async (matriculaText: string) => {
    // Mensagem de início
    addMessage('assistant', '🔍 **Iniciando análise completa...**\n\n📄 Extraindo dados da matrícula...')

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriculaText })
      })

      const data = await response.json()

      if (data.error) {
        addMessage('assistant', '❌ Não consegui analisar esta matrícula. Verifique se o texto está completo e tente novamente.')
        return
      }

      if (data.report) {
        // Mostra resumo dos proprietários encontrados
        const proprietariosPF = data.report.proprietarios.filter((p: { tipo: string }) => p.tipo === 'PF')
        const proprietariosPJ = data.report.proprietarios.filter((p: { tipo: string }) => p.tipo === 'PJ')
        
        let propMsg = '👥 **Proprietários identificados:**\n'
        if (proprietariosPF.length > 0) {
          propMsg += `\n**Pessoas Físicas (${proprietariosPF.length}):**\n`
          proprietariosPF.forEach((p: { nome: string; cpfCnpj: string }) => {
            propMsg += `• ${p.nome} (CPF: ***${p.cpfCnpj.slice(-4)})\n`
          })
        }
        if (proprietariosPJ.length > 0) {
          propMsg += `\n**Pessoas Jurídicas (${proprietariosPJ.length}):**\n`
          proprietariosPJ.forEach((p: { nome: string; cpfCnpj: string }) => {
            propMsg += `• ${p.nome} (CNPJ: ***${p.cpfCnpj.slice(-4)})\n`
          })
        }
        addMessage('assistant', propMsg)

        // Mostra resumo das certidões consultadas
        const certidoesNegativas = data.report.certidoes.filter((c: { status: string }) => c.status === 'negativa')
        const certidoesPositivas = data.report.certidoes.filter((c: { status: string }) => c.status === 'positiva')
        const certidoesErro = data.report.certidoes.filter((c: { status: string }) => c.status === 'erro')

        let certMsg = `📋 **Certidões consultadas: ${data.report.certidoes.length}**\n\n`
        
        if (certidoesNegativas.length > 0) {
          certMsg += `✅ **Nada Consta (${certidoesNegativas.length}):**\n`
          certidoesNegativas.forEach((c: { nome: string; detalhes?: string }) => {
            certMsg += `• ${c.nome}\n`
          })
          certMsg += '\n'
        }
        
        if (certidoesPositivas.length > 0) {
          certMsg += `❌ **Atenção - Consta (${certidoesPositivas.length}):**\n`
          certidoesPositivas.forEach((c: { nome: string; detalhes?: string }) => {
            certMsg += `• ${c.nome}${c.detalhes ? `: ${c.detalhes}` : ''}\n`
          })
          certMsg += '\n'
        }

        if (certidoesErro.length > 0) {
          certMsg += `⚪ **Não consultadas (${certidoesErro.length}):**\n`
          certidoesErro.forEach((c: { nome: string }) => {
            certMsg += `• ${c.nome}\n`
          })
        }

        addMessage('assistant', certMsg)

        // Exibe o relatório completo
        setReport(data.report)
        
        // Salva a análise no histórico
        try {
          saveAnalysis(data.report)
          console.log('✅ Análise salva no histórico')
        } catch (err) {
          console.error('Erro ao salvar análise:', err)
        }
        
        // Calcula tempo poupado TOTAL (plano completo - todas as certidões disponíveis)
        const certidoesConsultadas = data.report.certidoes.filter((c: { status: string }) => c.status !== 'nao_consultada').length
        const numProprietarios = data.report.proprietarios.length
        
        // Certidões no plano completo por proprietário:
        // PF: TST, PGFN, CENPROT, TJ Estadual, TRF, Antecedentes, CND Estadual + Empresas vinculadas
        // PJ: TST, PGFN, CENPROT, Receita CNPJ, SEFAZ, TJ Estadual, TRF
        const certidoesPFCompleto = 8 // Por pessoa física
        const certidoesPJCompleto = 7 // Por pessoa jurídica
        const pfCount = data.report.proprietarios.filter((p: { tipo: string }) => p.tipo === 'PF').length
        const pjCount = data.report.proprietarios.filter((p: { tipo: string }) => p.tipo === 'PJ').length
        const totalCertidoesPlanoCompleto = (pfCount * certidoesPFCompleto) + (pjCount * certidoesPJCompleto)
        
        const tempoMatricula = 30 // minutos para ler e analisar matrícula manualmente
        const tempoPorCertidao = 15 // minutos por certidão (acessar site, preencher, esperar)
        const tempoTotalMinutos = tempoMatricula + (totalCertidoesPlanoCompleto * tempoPorCertidao)
        const tempoHoras = Math.floor(tempoTotalMinutos / 60)
        const tempoMinutos = tempoTotalMinutos % 60
        const tempoFormatado = tempoHoras > 0 
          ? `${tempoHoras}h${tempoMinutos > 0 ? ` ${tempoMinutos}min` : ''}`
          : `${tempoMinutos} minutos`

        addMessage('assistant', 
          `✅ **Análise completa!**\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `⏱️ **TEMPO QUE VOCÊ ECONOMIZARIA:**\n` +
          `🎯 **${tempoFormatado.toUpperCase()}**\n` +
          `*(com plano completo)*\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          `📊 **O que você deixaria de fazer manualmente:**\n` +
          `• 📖 Ler e interpretar matrícula: ~30min\n` +
          `• 🔍 Consultar até ${totalCertidoesPlanoCompleto} certidões: ~${totalCertidoesPlanoCompleto * 15}min\n` +
          `• 🌐 Acessar diversos órgãos e sites\n` +
          `• ✍️ Preencher formulários para ${numProprietarios} proprietário${numProprietarios > 1 ? 's' : ''}\n\n` +
          `📋 **Neste teste:** consultamos ${certidoesConsultadas} certidões\n\n` +
          `📋 Veja o relatório detalhado abaixo:`
        )

        // Mensagem de upsell
        setTimeout(() => {
          addMessage('assistant', 
            '💡 **Quer uma análise ainda mais completa?**\n\n' +
            'Ao se cadastrar no Imóvel Limpo, você terá acesso a:\n\n' +
            '📋 **Todas as certidões:**\n' +
            '• Processos no TJ do estado\n' +
            '• Processos no TRF (Justiça Federal)\n' +
            '• Antecedentes Criminais\n' +
            '• Certidões estaduais de todos os estados\n' +
            '• E muito mais!\n\n' +
            '⚡ **Benefícios exclusivos:**\n' +
            '• Análise de empresas vinculadas aos proprietários\n' +
            '• Monitoramento contínuo de novos processos\n' +
            '• Alertas em tempo real\n' +
            '• Relatórios em PDF para seus clientes\n\n' +
            '👉 [Quero ter acesso completo](/)' 
          )
        }, 2000)
      }
    } catch (error) {
      console.error('Erro na análise:', error)
      addMessage('assistant', '❌ Erro ao realizar análise. Por favor, tente novamente.')
    }
  }

  const handleSendFile = async (file: File) => {
    // Adiciona mensagem do usuário mostrando o arquivo
    addMessage('user', `📎 Arquivo: ${file.name}`)
    setIsLoading(true)

    try {
      // Verifica o tamanho do arquivo (máx 10MB)
      if (file.size > 10 * 1024 * 1024) {
        addMessage('assistant', '⚠️ Arquivo muito grande! O limite é 10MB. Tente um arquivo menor ou cole o texto diretamente.')
        setIsLoading(false)
        return
      }

      addMessage('assistant', `📄 Processando "${file.name}"...\n\n⏳ Extraindo texto do documento...`)

      // Envia para API de extração
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/extract-file', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.error) {
        addMessage('assistant', `❌ ${data.error}`)
        setIsLoading(false)
        return
      }

      if (!data.text || !data.text.trim()) {
        addMessage('assistant', 'Não consegui extrair texto do documento. Tente colar o texto diretamente.')
        setIsLoading(false)
        return
      }

      addMessage('assistant', `✅ Texto extraído com sucesso!\n\n🔍 Iniciando análise da matrícula...`)
      
      // Inicia análise com o texto extraído
      await runAnalysis(data.text)
    } catch (error) {
      console.error('Erro ao processar arquivo:', error)
      addMessage('assistant', '❌ Erro ao processar arquivo. Tente colar o texto da matrícula diretamente.')
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-full bg-[#E5DDD5]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54] text-white">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <Logo className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold">Imóvel Limpo</h2>
          <p className="text-xs text-green-200">online</p>
        </div>
        <Link 
          href="/comando"
          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition flex items-center gap-1.5"
          title="Centro de Comando"
        >
          📊 Histórico
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4" style={{ backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3Oeli1TlIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqFf0TAAAAL0lEQVR4AWPABRgGFUCCYQgQYBg0AAGGQQMQYBhigACDDAMEGGQYIMAQAwAB7AABCnV0zgAAAABJRU5ErkJggg==")' }}>
        <div className="max-w-2xl mx-auto">
          {messages.map(message => (
            <ChatBubble key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <ChatBubble 
              message={{
                id: 'loading',
                role: 'assistant',
                content: '',
                timestamp: new Date(),
                type: 'loading'
              }} 
            />
          )}

          {report && <ReportCard report={report} />}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        onSendFile={handleSendFile}
        disabled={isLoading}
      />
    </div>
  )
}

