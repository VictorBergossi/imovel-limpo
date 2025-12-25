'use client'

import { useState, useEffect } from 'react'
import { Logo } from './Logo'

type Message = {
  id: number
  type: 'bot' | 'user'
  content: string | 'result'
  delay: number
}

export function HeroDemo() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const messages: Message[] = [
    { id: 1, type: 'bot', content: 'Olá! 👋 Envie a matrícula ou número + cartório.', delay: 1500 },
    { id: 2, type: 'user', content: '📄 Matrícula_Apt_Moema.pdf', delay: 1500 },
    { id: 3, type: 'bot', content: '🔍 Analisando matrícula...', delay: 1200 },
    { id: 4, type: 'bot', content: '📑 Verificando certidões...', delay: 1200 },
    { id: 5, type: 'bot', content: 'result', delay: 1500 },
  ]

  // Auto-start after 1.5 seconds
  useEffect(() => {
    if (!hasStarted) {
      const timeout = setTimeout(() => {
        setIsPlaying(true)
        setHasStarted(true)
      }, 1500)
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
      }, 5000)
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

  const ResultCard = () => (
    <div className="space-y-2 animate-fade-in">
      <div className="flex items-center gap-2 text-brand-600 font-bold text-sm">
        <span>✅</span> Análise Completa
      </div>
      
      <div className="bg-brand-50 rounded-lg p-2">
        <div className="flex items-center justify-between">
          <span className="text-brand-700 text-xs">Status</span>
          <span className="font-bold text-brand-600 text-sm flex items-center gap-1">
            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
            LIMPO
          </span>
        </div>
      </div>

      <div className="space-y-1 text-xs">
        <div className="flex justify-between py-1 border-b border-gray-100">
          <span className="text-gray-500">Ônus/Gravames</span>
          <span className="text-brand-600 font-medium">Nenhum ✓</span>
        </div>
        <div className="flex justify-between py-1 border-b border-gray-100">
          <span className="text-gray-500">Certidões</span>
          <span className="text-brand-600 font-medium">OK ✓</span>
        </div>
        <div className="flex justify-between py-1 border-b border-gray-100">
          <span className="text-gray-500">Processos</span>
          <span className="text-brand-600 font-medium">Nenhum ✓</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-lg p-3 text-center">
        <p className="text-xs opacity-80">Previsão comissão</p>
        <p className="text-2xl font-bold">~35 dias</p>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-sm">
      {/* WhatsApp Header */}
      <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
        <Logo className="w-9 h-9" />
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">Imóvel Limpo</p>
          <p className="text-green-200 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
            online
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        className="bg-[#ECE5DD] p-3 min-h-[350px] space-y-2"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d4ccc4" fill-opacity="0.3"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      >
        {/* Date */}
        <div className="flex justify-center mb-2">
          <span className="bg-white/90 text-gray-500 text-xs px-3 py-1 rounded-full shadow-sm">
            Hoje
          </span>
        </div>

        {/* Messages */}
        {messages.map((message) => {
          if (!visibleMessages.includes(message.id)) return null
          
          if (message.content === 'result') {
            return (
              <div key={message.id} className="flex justify-start animate-slide-up">
                <div className="bg-white rounded-2xl rounded-tl-sm p-3 max-w-[95%] shadow-sm">
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
              <div 
                className={`
                  max-w-[85%] px-3 py-2 shadow-sm text-sm
                  ${message.type === 'user' 
                    ? 'bg-[#DCF8C6] rounded-2xl rounded-tr-sm' 
                    : 'bg-white rounded-2xl rounded-tl-sm'
                  }
                `}
              >
                <p className="text-gray-800">{message.content}</p>
              </div>
            </div>
          )
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        {/* Waiting state */}
        {visibleMessages.length === 0 && !isTyping && (
          <div className="flex items-center justify-center h-[300px] text-gray-400">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
              Iniciando...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

