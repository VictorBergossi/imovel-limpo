'use client'

import { useState } from 'react'
import { Logo } from '@/components/Logo'

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
      answer: "Os primeiros 20 usuários terão acesso vitalício gratuito. Depois, teremos planos acessíveis para corretores autônomos e imobiliárias.",
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

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 font-medium">
                  🎁 Os 20 primeiros usuários terão acesso gratuito!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="#cadastro"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 whatsapp-gradient text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg shadow-green-500/30"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Quero ser um dos 20
                </a>
                <a 
                  href="#como-funciona"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  <span>▶️</span>
                  Como funciona?
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

            {/* WhatsApp Mockup */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 max-w-sm mx-auto">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <Logo className="w-10 h-10" />
                  <div>
                    <p className="font-semibold text-gray-900">Imóvel Limpo</p>
                    <p className="text-xs text-green-600">Online</p>
                  </div>
                </div>

                <div className="space-y-3 py-4">
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-[90%]">
                    <p className="text-sm text-gray-700">📄 Envie o arquivo da matrícula ou o número da matrícula e o cartório.</p>
                  </div>
                  
                  <div className="bg-brand-500 rounded-2xl rounded-tr-sm p-3 max-w-[75%] ml-auto text-white">
                    <p className="text-sm">Matrícula 123.456 - 5º RI São Paulo</p>
                  </div>

                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3">
                    <p className="text-sm text-gray-700 mb-2">✅ <strong>Análise completa:</strong></p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>• Matrícula atualizada: sem ônus</p>
                      <p>• 2 proprietários anteriores verificados</p>
                      <p>• Certidões negativas: OK</p>
                      <p>• Empresa do proprietário: sem processos</p>
                      <p className="text-brand-700 font-semibold">• Estimativa: 45 dias para comissão</p>
                    </div>
                  </div>
                </div>
              </div>
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
                <span>🎁</span>
                <span className="text-white font-medium">20 vagas gratuitas restantes</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Garanta seu acesso gratuito
              </h2>
              <p className="text-brand-100 text-lg">
                Os 20 primeiros corretores terão acesso vitalício gratuito. Depois, será pago. Entre agora.
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
                      'Quero ser um dos 20'
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
                <span>+183 corretores já na lista — restam poucas vagas</span>
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
