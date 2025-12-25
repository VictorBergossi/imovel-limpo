'use client'

import { useState } from 'react'
import { Logo } from '@/components/Logo'
import { HeroDemo } from '@/components/HeroDemo'

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''

export default function Home() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      if (WEB3FORMS_KEY) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: '🏠 Novo Lead - Imóvel Limpo',
            from_name: 'Imóvel Limpo',
            ...formData,
          }),
        })
      }
      setIsSubmitted(true)
    } catch (err) {
      console.error('Erro:', err)
      setIsSubmitted(true)
    }
    setIsLoading(false)
  }

  const painPoints = [
    "Já perdeu uma venda quente por documentação?",
    "Financiamento negado por pendência jurídica?",
    "Esperou meses a mais para receber sua comissão?",
    "Vendeu imóvel que virou dor de cabeça?",
  ]

  const steps = [
    {
      number: "01",
      icon: "📱",
      title: "Envie pelo WhatsApp",
      description: "Mande o PDF da matrícula ou só o número + cartório. A gente puxa a atualizada pra você.",
    },
    {
      number: "02",
      icon: "🔍",
      title: "Análise profunda",
      description: "Analisamos a matrícula, buscamos certidões de todos os proprietários, processos trabalhistas, fiscais e até das empresas vinculadas.",
    },
    {
      number: "03",
      icon: "📋",
      title: "Diagnóstico completo",
      description: "Você recebe: situação do imóvel, pendências encontradas, risco da operação e tempo estimado para receber sua comissão.",
    },
  ]

  const features = [
    {
      icon: "📄",
      title: "Matrícula atualizada na hora",
      description: "Puxamos a matrícula atualizada direto do cartório. Você vê todas as pendências que existem hoje, não de meses atrás.",
    },
    {
      icon: "📑",
      title: "Certidões de todos os proprietários",
      description: "Buscamos certidões negativas de débitos, processos trabalhistas, fiscais e judiciais de cada proprietário que aparece na matrícula.",
    },
    {
      icon: "🏢",
      title: "Empresas dos proprietários",
      description: "Se o proprietário tem empresa, verificamos processos e pendências dela também. Nada passa despercebido.",
    },
    {
      icon: "⏱️",
      title: "Estimativa de tempo para comissão",
      description: "Com base na análise completa, você sabe se vai receber em 30 dias ou em 6 meses antes de investir seu tempo.",
    },
    {
      icon: "🛡️",
      title: "Proteja sua comissão",
      description: "Pare de perder vendas e tempo com imóveis problemáticos. Descubra os riscos antes do comprador aparecer.",
    },
    {
      icon: "💬",
      title: "Tudo pelo WhatsApp",
      description: "Sem app, sem cadastro, sem espera. Manda a matrícula e recebe o diagnóstico completo em minutos.",
    },
  ]

  const faqs = [
    {
      question: "Como funciona a análise de matrícula?",
      answer: "Você envia o arquivo da matrícula (PDF ou foto) ou só o número + cartório pelo WhatsApp. Se enviar só o número, nossa tecnologia puxa a matrícula atualizada. Depois analisamos tudo automaticamente.",
    },
    {
      question: "Quais certidões são verificadas?",
      answer: "Verificamos certidões negativas de débitos federais, estaduais e municipais, certidões trabalhistas, certidões de protestos, certidões cíveis e criminais de todos os proprietários.",
    },
    {
      question: "Como é calculado o tempo para receber a comissão?",
      answer: "Com base nas pendências encontradas e nossa experiência com milhares de transações, estimamos quanto tempo cada tipo de pendência costuma levar para ser resolvida.",
    },
    {
      question: "Preciso baixar algum aplicativo?",
      answer: "Não! Tudo funciona 100% pelo WhatsApp. Você manda a matrícula e recebe o diagnóstico na mesma conversa.",
    },
    {
      question: "Quanto custa o serviço?",
      answer: "Estamos em fase de lançamento com acesso gratuito para os primeiros usuários. Depois, teremos planos acessíveis para corretores autônomos e imobiliárias.",
    },
    {
      question: "Os dados dos imóveis e clientes são seguros?",
      answer: "Sim! Todos os dados são criptografados e não compartilhamos informações com terceiros. Sua privacidade e a dos seus clientes é nossa prioridade.",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo className="w-9 h-9" />
            <span className="font-display font-bold text-xl text-gray-900">Imóvel Limpo</span>
          </div>
          <a 
            href="#cadastro"
            className="px-5 py-2 bg-brand-600 text-white rounded-full text-sm font-semibold hover:bg-brand-700 transition-all hover:scale-105"
          >
            Quero acesso
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-brand-50 via-white to-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full">
                <span className="text-brand-600">💬</span>
                <span className="text-sm font-medium text-brand-700">Integração direta com WhatsApp</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Descubra em segundos se o imóvel está{' '}
                <span className="gradient-text">limpo para venda</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Análise completa de matrícula, certidões e estimativa de tempo para receber sua comissão. Tudo via WhatsApp.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {painPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4 hover:bg-red-100 transition-colors">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✗</span>
                    <span className="text-red-800 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="#cadastro"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 whatsapp-gradient text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg shadow-green-500/30"
                >
                  Quero acesso antecipado
                </a>
                <a 
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  <span>▶️</span>
                  Ver demo completa
                </a>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-brand-600">✓</span>
                  <span className="text-sm text-gray-600">Matrícula atualizada</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-600">✓</span>
                  <span className="text-sm text-gray-600">Certidões completas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-600">✓</span>
                  <span className="text-sm text-gray-600">100% via WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Demo Interativa */}
            <div className="relative">
              <HeroDemo />
              <p className="text-center text-sm text-gray-500 mt-4">
                ⚡ Demo ao vivo - atualiza automaticamente
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-semibold mb-4">
              Como funciona
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              3 passos simples
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Sem cadastros complicados. Sem esperar dias. Tudo direto no seu WhatsApp.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="absolute -top-4 left-8 bg-brand-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {step.number}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 bg-white rounded-full px-6 py-3 shadow-md w-fit mx-auto">
            <span className="text-brand-600">⚡</span>
            <span className="text-gray-600">Tempo médio de análise: <strong className="text-gray-900">menos de 5 minutos</strong></span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-semibold mb-4">
              Por que usar
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Chega de perder tempo e dinheiro
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Feito por quem entende a dor do corretor que precisa de agilidade e segurança.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Form */}
      <section id="cadastro" className="py-20 bg-gradient-to-b from-brand-600 to-brand-800">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
                <span>🚀</span>
                <span className="text-white font-medium">Acesso antecipado</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Entre na lista de espera
              </h2>
              <p className="text-brand-100 text-lg">
                Seja um dos primeiros a usar o Imóvel Limpo e ganhe acesso gratuito no lançamento.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Seu nome</label>
                    <input
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white/20 outline-none"
                      placeholder="Como podemos te chamar?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Seu WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white/20 outline-none"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">E-mail (opcional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white/20 outline-none"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-white text-brand-700 rounded-xl font-bold text-lg hover:scale-[1.02] transition-all shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Garantindo vaga...
                      </>
                    ) : (
                      'Garantir meu acesso'
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Você está na lista!
                  </h3>
                  <p className="text-white/80">
                    Vamos te chamar no WhatsApp assim que liberarmos o acesso.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-white/70">
                <span>👥</span>
                <span>+180 corretores já na lista de espera</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-semibold mb-4">
              Dúvidas frequentes
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas comuns
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Tudo o que você precisa saber sobre o Imóvel Limpo.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <span className={`text-gray-400 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Logo className="w-8 h-8" />
              <span className="font-display font-bold text-lg">Imóvel Limpo</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="mailto:contato@imovellimpo.com.br" className="hover:text-white transition-colors flex items-center gap-2">
                <span>📧</span>
                contato@imovellimpo.com.br
              </a>
              <a href="https://wa.me/5511999999999" className="hover:text-white transition-colors flex items-center gap-2">
                <span>💬</span>
                WhatsApp
              </a>
            </div>
            
            <p className="text-gray-400 text-sm">
              © 2025 Imóvel Limpo. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
