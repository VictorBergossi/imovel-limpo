'use client'

import { useState, useEffect } from 'react'
import { Logo } from '@/components/Logo'

type Message = {
  id: number
  type: 'bot' | 'user'
  content: string | 'result'
  delay: number
}

export default function DemoPage() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showReport, setShowReport] = useState(false)

  const messages: Message[] = [
    { id: 1, type: 'bot', content: 'Olá! 👋 Envie a matrícula ou número + cartório.', delay: 1500 },
    { id: 2, type: 'user', content: 'Matrícula 45.892 - 5º RI de São Paulo', delay: 1500 },
    { id: 3, type: 'bot', content: '📥 Puxando matrícula atualizada do cartório...', delay: 1500 },
    { id: 4, type: 'bot', content: '🔍 Analisando ônus e gravames...', delay: 1200 },
    { id: 5, type: 'bot', content: '📑 Consultando certidões dos proprietários...', delay: 1200 },
    { id: 6, type: 'bot', content: '⚠️ Encontrei uma pendência!', delay: 1200 },
    { id: 7, type: 'bot', content: 'result', delay: 1500 },
  ]

  const startDemo = () => {
    setVisibleMessages([])
    setCurrentStep(0)
    setIsPlaying(true)
    setShowReport(false)
  }

  useEffect(() => {
    // Auto-start after 1 second
    const timeout = setTimeout(() => {
      if (!isPlaying && visibleMessages.length === 0) {
        startDemo()
      }
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    if (currentStep < messages.length) {
      const message = messages[currentStep]
      
      if (message.type === 'bot') {
        setIsTyping(true)
        const timeout = setTimeout(() => {
          setIsTyping(false)
          setVisibleMessages(prev => [...prev, message.id])
          if (message.content === 'result') {
            setTimeout(() => setShowReport(true), 1000)
          }
          setCurrentStep(prev => prev + 1)
        }, message.delay)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setVisibleMessages(prev => [...prev, message.id])
          setCurrentStep(prev => prev + 1)
        }, message.delay)
        return () => clearTimeout(timeout)
      }
    } else {
      setIsPlaying(false)
    }
  }, [currentStep, isPlaying])

  const ResultCard = () => (
    <div className="space-y-2 animate-fade-in">
      <div className="flex items-center gap-2 text-amber-600 font-bold">
        <span>⚠️</span> Atenção Necessária
      </div>
      <div className="bg-amber-50 rounded-lg p-2 text-center">
        <p className="text-xs text-amber-600">Status</p>
        <p className="font-bold text-amber-700">PENDÊNCIA ENCONTRADA</p>
      </div>
      <div className="text-xs space-y-1">
        <div className="flex justify-between"><span className="text-gray-500">Ônus</span><span className="text-red-600">1 penhora ⚠️</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Certidões</span><span className="text-brand-600">OK ✓</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Processos</span><span className="text-amber-600">1 trabalhista</span></div>
      </div>
      <div className="bg-amber-600 text-white rounded-lg p-2 text-center">
        <p className="text-xs opacity-80">Previsão comissão</p>
        <p className="text-xl font-bold">~120 dias</p>
      </div>
      <p className="text-xs text-gray-500 text-center">Veja o relatório completo ao lado →</p>
    </div>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-brand-900">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <span className="font-display text-xl font-bold text-white">Imóvel Limpo</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={startDemo}
            disabled={isPlaying}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-all disabled:opacity-50"
          >
            {isPlaying ? '⏳ Analisando...' : '🔄 Repetir Demo'}
          </button>
          <a href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Voltar
          </a>
        </div>
      </header>

      <div className="container mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Left - WhatsApp Demo */}
          <div>
            <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
              <span>💬</span> Conversa no WhatsApp
            </h2>
            
            <div className="bg-gray-800 rounded-2xl overflow-hidden max-w-md">
              {/* WhatsApp Header */}
              <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                <Logo className="w-10 h-10" />
                <div>
                  <p className="text-white font-semibold">Imóvel Limpo</p>
                  <p className="text-green-200 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    online
                  </p>
                </div>
              </div>

              {/* Chat */}
              <div 
                className="bg-[#ECE5DD] p-4 min-h-[450px] space-y-2"
                style={{ 
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d4ccc4" fill-opacity="0.3"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                }}
              >
                <div className="flex justify-center mb-2">
                  <span className="bg-white/90 text-gray-500 text-xs px-3 py-1 rounded-full">Hoje</span>
                </div>

                {messages.map((message) => {
                  if (!visibleMessages.includes(message.id)) return null
                  
                  if (message.content === 'result') {
                    return (
                      <div key={message.id} className="flex justify-start animate-slide-up">
                        <div className="bg-white rounded-2xl rounded-tl-sm p-3 max-w-[90%] shadow-sm">
                          <ResultCard />
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div 
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                    >
                      <div className={`max-w-[85%] px-3 py-2 shadow-sm text-sm ${
                        message.type === 'user' ? 'bg-[#DCF8C6] rounded-2xl rounded-tr-sm' : 'bg-white rounded-2xl rounded-tl-sm'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  )
                })}

                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Report */}
          <div className={`transition-all duration-500 ${showReport ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
              <span>📄</span> Relatório Completo
            </h2>

            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              {/* Report Header */}
              <div className="bg-amber-500 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">⚠️</span>
                  <div>
                    <p className="font-bold text-white text-lg">ATENÇÃO NECESSÁRIA</p>
                    <p className="text-amber-100 text-sm">Pendência encontrada</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-amber-100 text-xs">Previsão comissão</p>
                  <p className="text-white text-2xl font-bold">~120 dias</p>
                </div>
              </div>

              <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
                {/* Dados do Imóvel */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🏠</span> Dados do Imóvel
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-500 text-xs">Matrícula</p>
                      <p className="font-semibold">45.892</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-500 text-xs">Cartório</p>
                      <p className="font-semibold">5º RI São Paulo</p>
                    </div>
                  </div>
                </div>

                {/* Pendência */}
                <div>
                  <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                    <span>🚨</span> Pendência Encontrada
                  </h3>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <p className="text-red-600 text-xs">Tipo</p>
                        <p className="font-bold text-red-800">Penhora Trabalhista</p>
                      </div>
                      <div>
                        <p className="text-red-600 text-xs">Valor</p>
                        <p className="font-bold text-red-800">R$ 45.000,00</p>
                      </div>
                    </div>
                    <div className="text-xs text-red-700">
                      <p><strong>Processo:</strong> 0001234-56.2023.5.02.0001</p>
                      <p><strong>Vara:</strong> 1ª Vara do Trabalho de São Paulo</p>
                    </div>
                  </div>
                </div>

                {/* Proprietários */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>👥</span> Proprietários (2)
                  </h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-semibold text-sm">José da Silva Santos</p>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs">1 pendência</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <a href="https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PF/Emitir" target="_blank" className="flex items-center gap-1 text-brand-600 hover:underline">
                          ✓ CND Federal <span className="text-gray-400">↗</span>
                        </a>
                        <a href="https://www.dividaativa.pge.sp.gov.br/da-ic-web/inicio.do" target="_blank" className="flex items-center gap-1 text-brand-600 hover:underline">
                          ✓ CND Estadual <span className="text-gray-400">↗</span>
                        </a>
                        <a href="https://cndt-certidao.tst.jus.br/inicio.faces" target="_blank" className="flex items-center gap-1 text-red-600 hover:underline">
                          ⚠️ CNDT Trabalhista <span className="text-gray-400">↗</span>
                        </a>
                        <a href="https://www.protestosp.com.br/" target="_blank" className="flex items-center gap-1 text-brand-600 hover:underline">
                          ✓ Protestos <span className="text-gray-400">↗</span>
                        </a>
                      </div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-semibold text-sm">Maria Santos Silva</p>
                        <span className="px-2 py-0.5 bg-brand-100 text-brand-700 rounded-full text-xs">✓ Regular</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <a href="https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PF/Emitir" target="_blank" className="flex items-center gap-1 text-brand-600 hover:underline">
                          ✓ CND Federal <span className="text-gray-400">↗</span>
                        </a>
                        <a href="https://www.dividaativa.pge.sp.gov.br/da-ic-web/inicio.do" target="_blank" className="flex items-center gap-1 text-brand-600 hover:underline">
                          ✓ CND Estadual <span className="text-gray-400">↗</span>
                        </a>
                        <a href="https://cndt-certidao.tst.jus.br/inicio.faces" target="_blank" className="flex items-center gap-1 text-brand-600 hover:underline">
                          ✓ CNDT Trabalhista <span className="text-gray-400">↗</span>
                        </a>
                        <a href="https://www.protestosp.com.br/" target="_blank" className="flex items-center gap-1 text-brand-600 hover:underline">
                          ✓ Protestos <span className="text-gray-400">↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resumo */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📊</span> Resumo
                  </h3>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-brand-50 rounded-lg p-2">
                      <p className="text-xl font-bold text-brand-600">7</p>
                      <p className="text-xs text-brand-700">Certidões</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-2">
                      <p className="text-xl font-bold text-red-600">1</p>
                      <p className="text-xs text-red-700">Pendência</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xl font-bold text-gray-700">2</p>
                      <p className="text-xs text-gray-600">Proprietários</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xl font-bold text-gray-700">1</p>
                      <p className="text-xs text-gray-600">Empresa</p>
                    </div>
                  </div>
                </div>

                {/* Recomendação */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h4 className="font-bold text-amber-800 mb-2">📋 Recomendação</h4>
                  <p className="text-sm text-amber-900">
                    O vendedor deve quitar o débito trabalhista ou obter autorização judicial antes da venda. 
                    Prazo estimado para resolução: 60-90 dias.
                  </p>
                </div>

                {/* Download */}
                <a 
                  href="/relatorio"
                  target="_blank"
                  className="block w-full py-3 bg-gray-900 text-white rounded-xl font-semibold text-center hover:bg-gray-800 transition-all"
                >
                  📄 Ver Relatório Completo (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
