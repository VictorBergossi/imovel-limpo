'use client'

import { useState, useEffect } from 'react'

type Message = {
  id: number
  type: 'bot' | 'user'
  content: string | 'result-clean' | 'result-problem'
  delay: number
}

function CleanDemo() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const messages: Message[] = [
    { id: 1, type: 'bot', content: 'Olá! 👋 Envie a matrícula ou o número + cartório.', delay: 1200 },
    { id: 2, type: 'user', content: '📄 Matrícula_Apt_Moema.pdf', delay: 1200 },
    { id: 3, type: 'bot', content: '🔍 Analisando matrícula e certidões...', delay: 1500 },
    { id: 4, type: 'bot', content: 'result-clean', delay: 1500 },
  ]

  const startDemo = () => {
    setVisibleMessages([])
    setCurrentStep(0)
    setIsPlaying(true)
  }

  useEffect(() => {
    if (!isPlaying) return

    if (currentStep < messages.length) {
      const message = messages[currentStep]
      
      if (message.type === 'bot') {
        setIsTyping(true)
        const timeout = setTimeout(() => {
          setIsTyping(false)
          setVisibleMessages(prev => [...prev, message.id])
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

  const CleanResult = () => (
    <div className="space-y-2 animate-fade-in">
      <div className="flex items-center gap-2 text-brand-600 font-bold">
        <span>✅</span> Análise Completa
      </div>
      <div className="bg-brand-50 rounded-lg p-2 text-center">
        <p className="text-xs text-brand-600">Status</p>
        <p className="font-bold text-brand-700">IMÓVEL LIMPO ✓</p>
      </div>
      <div className="text-xs space-y-1">
        <div className="flex justify-between"><span className="text-gray-500">Ônus</span><span className="text-brand-600">Nenhum ✓</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Certidões</span><span className="text-brand-600">OK ✓</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Processos</span><span className="text-brand-600">Nenhum ✓</span></div>
      </div>
      <div className="bg-brand-600 text-white rounded-lg p-2 text-center">
        <p className="text-xs opacity-80">Previsão comissão</p>
        <p className="text-xl font-bold">~35 dias</p>
      </div>
    </div>
  )

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden">
      <div className="bg-brand-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">✅</span>
          <span className="font-bold text-white">Imóvel Limpo</span>
        </div>
        <button
          onClick={startDemo}
          disabled={isPlaying}
          className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm text-white transition-all disabled:opacity-50"
        >
          {isPlaying ? '...' : visibleMessages.length > 0 ? '🔄 Repetir' : '▶️ Play'}
        </button>
      </div>
      
      <div className="p-4">
        <div className="bg-[#ECE5DD] rounded-xl p-3 min-h-[300px] space-y-2 text-sm">
          {messages.map((message) => {
            if (!visibleMessages.includes(message.id)) return null
            
            if (message.content === 'result-clean') {
              return (
                <div key={message.id} className="bg-white rounded-xl p-3 shadow-sm">
                  <CleanResult />
                </div>
              )
            }

            return (
              <div 
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] px-3 py-2 rounded-xl shadow-sm ${
                  message.type === 'user' ? 'bg-[#DCF8C6]' : 'bg-white'
                }`}>
                  {message.content}
                </div>
              </div>
            )
          })}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-xl px-4 py-2 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}

          {visibleMessages.length === 0 && !isPlaying && (
            <div className="h-full flex items-center justify-center text-gray-500 min-h-[280px]">
              <p>Clique em Play para ver a demo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProblemDemo() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const messages: Message[] = [
    { id: 1, type: 'bot', content: 'Olá! 👋 Envie a matrícula ou o número + cartório.', delay: 1200 },
    { id: 2, type: 'user', content: 'Matrícula 45.892 - 5º RI de SP', delay: 1200 },
    { id: 3, type: 'bot', content: '📥 Puxando matrícula do cartório...', delay: 1200 },
    { id: 4, type: 'bot', content: '🔍 Analisando... ⚠️ Encontrei pendência!', delay: 1500 },
    { id: 5, type: 'bot', content: 'result-problem', delay: 1500 },
  ]

  // Auto-start after 2 seconds
  useEffect(() => {
    if (!hasStarted) {
      const timeout = setTimeout(() => {
        setIsPlaying(true)
        setHasStarted(true)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [hasStarted])

  // Auto-repeat after finishing
  useEffect(() => {
    if (!isPlaying && hasStarted && currentStep >= messages.length) {
      const timeout = setTimeout(() => {
        setVisibleMessages([])
        setCurrentStep(0)
        setIsPlaying(true)
      }, 4000) // Wait 4 seconds before repeating
      return () => clearTimeout(timeout)
    }
  }, [isPlaying, hasStarted, currentStep, messages.length])

  useEffect(() => {
    if (!isPlaying) return

    if (currentStep < messages.length) {
      const message = messages[currentStep]
      
      if (message.type === 'bot') {
        setIsTyping(true)
        const timeout = setTimeout(() => {
          setIsTyping(false)
          setVisibleMessages(prev => [...prev, message.id])
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

  const ProblemResult = () => (
    <div className="space-y-2 animate-fade-in">
      <div className="flex items-center gap-2 text-amber-600 font-bold">
        <span>⚠️</span> Atenção Necessária
      </div>
      <div className="bg-amber-50 rounded-lg p-2 text-center">
        <p className="text-xs text-amber-600">Status</p>
        <p className="font-bold text-amber-700">PENDÊNCIA ⚠️</p>
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
      <a 
        href="/relatorio" 
        target="_blank"
        className="block text-center text-xs text-amber-600 hover:text-amber-700 underline"
      >
        📄 Ver relatório completo
      </a>
    </div>
  )

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden">
      <div className="bg-amber-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚠️</span>
          <span className="font-bold text-white">Imóvel com Pendência</span>
        </div>
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          Ao vivo
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-[#ECE5DD] rounded-xl p-3 min-h-[300px] space-y-2 text-sm">
          {messages.map((message) => {
            if (!visibleMessages.includes(message.id)) return null
            
            if (message.content === 'result-problem') {
              return (
                <div key={message.id} className="bg-white rounded-xl p-3 shadow-sm">
                  <ProblemResult />
                </div>
              )
            }

            return (
              <div 
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] px-3 py-2 rounded-xl shadow-sm ${
                  message.type === 'user' ? 'bg-[#DCF8C6]' : 'bg-white'
                }`}>
                  {message.content}
                </div>
              </div>
            )
          })}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-xl px-4 py-2 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}

          {visibleMessages.length === 0 && !isTyping && (
            <div className="h-full flex items-center justify-center text-gray-500 min-h-[280px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                Iniciando demo...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function DemoSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-brand-600/20 text-brand-400 rounded-full text-sm font-semibold mb-4">
            Veja na prática
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Como funciona a análise
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Dois cenários reais: imóvel liberado e imóvel com pendência
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <CleanDemo />
          <ProblemDemo />
        </div>
      </div>
    </section>
  )
}
