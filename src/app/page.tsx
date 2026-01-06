'use client'

import { useState } from 'react'
import { Logo } from '@/components/Logo'
import { HeroDemo } from '@/components/HeroDemo'

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const benefits = [
    "Matrícula atualizada rapidamente",
    "Certidões públicas consolidadas",
    "Status jurídico claro para venda",
    "Estimativa de tempo para receber sua comissão",
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
      answer: "Oferecemos consulta avulsa por R$9,90 e planos a partir de R$47/mês. A matrícula atualizada tem custo adicional de R$25. Se você já tiver a matrícula em PDF, não há custo extra. Todos os planos incluem verificação de certidões e processos dos proprietários.",
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
            href="#planos"
            className="px-5 py-2 bg-brand-600 text-white rounded-full text-sm font-semibold hover:bg-brand-700 transition-all hover:scale-105"
          >
            Ver planos
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-brand-50 via-white to-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Descubra em segundos se um imóvel está{' '}
                <span className="gradient-text">pronto para vender</span>
                {' '}— evite perder tempo e comissão.
              </h1>

              {/* Indicação de preço */}
              <div className="inline-flex items-center gap-2 px-5 py-3 bg-brand-50 border border-brand-200 rounded-xl">
                <span className="text-brand-600 text-lg">💰</span>
                <span className="text-brand-800 font-medium">Consulta avulsa por <strong className="text-brand-700">R$9,90</strong> ou planos a partir de <strong className="text-brand-700">R$47/mês</strong></span>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed">
                Análise rápida de matrícula, certidões públicas e cenário documental — tudo via WhatsApp.
              </p>

              {/* Benefícios */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 bg-brand-50 border border-brand-100 rounded-xl p-4 hover:bg-brand-100 transition-colors">
                    <span className="flex-shrink-0 w-6 h-6 bg-brand-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                    <span className="text-brand-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="/simular"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 whatsapp-gradient text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg shadow-green-500/30"
                  data-event="cta_simular_click"
                >
                  🔍 Testar agora grátis
                </a>
                <a 
                  href="#planos"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Ver planos e preços
                </a>
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


      {/* Planos e Preços */}
      <section id="planos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-semibold mb-4">
              Planos para imobiliárias
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Escolha o plano ideal para sua equipe
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Preços transparentes. Pague apenas pelo que usar. Sem surpresas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Consulta Avulsa */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand-300 hover:shadow-xl transition-all">
              <div className="text-center mb-4">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-1">Consulta Avulsa</h3>
                <p className="text-gray-500 text-xs">Para testar o serviço</p>
              </div>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-900">R$9,90</span>
                <span className="text-gray-500 text-sm">/consulta</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> 1 diligência completa
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> Certidões incluídas
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> Processos verificados
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-gray-300">+</span> Matrícula: <strong>+R$25</strong>
                </li>
              </ul>
              <a 
                href="https://wa.me/5541987966912?text=🛒 QUERO COMPRAR - Consulta Avulsa R$9,90%0A%0AOlá! Quero contratar uma consulta avulsa por R$9,90.%0A%0AMeu nome: %0AImóvel (número matrícula ou endereço):"
                target="_blank"
                className="block w-full py-2.5 text-center bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-all text-sm"
                data-event="compra_avulsa"
              >
                Comprar agora
              </a>
            </div>

            {/* Plano Starter */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand-300 hover:shadow-xl transition-all">
              <div className="text-center mb-4">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-1">Starter</h3>
                <p className="text-gray-500 text-xs">Para corretores autônomos</p>
              </div>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-900">R$47</span>
                <span className="text-gray-500 text-sm">/mês</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> 1 usuário (corretor)
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> 5 diligências/mês
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> Certidões + processos
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-gray-300">+</span> Matrícula: <strong>+R$25</strong>/cada
                </li>
              </ul>
              <a 
                href="https://wa.me/5541987966912?text=🛒 QUERO ASSINAR - Plano Starter R$47/mês%0A%0AOlá! Quero contratar o plano Starter (R$47/mês).%0A%0AMeu nome:%0AMeu CRECI (se tiver):"
                target="_blank"
                className="block w-full py-2.5 text-center bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-all text-sm"
                data-event="compra_starter"
              >
                Assinar plano
              </a>
            </div>

            {/* Plano Profissional */}
            <div className="bg-white rounded-2xl p-6 border-2 border-brand-500 shadow-xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Mais popular
              </div>
              <div className="text-center mb-4">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-1">Profissional</h3>
                <p className="text-gray-500 text-xs">Para pequenas imobiliárias</p>
              </div>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-900">R$147</span>
                <span className="text-gray-500 text-sm">/mês</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> Até 5 corretores
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> 20 diligências/mês
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> Certidões + processos
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> 3 matrículas inclusas
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-gray-300">+</span> Extra: <strong>+R$25</strong>/matrícula
                </li>
              </ul>
              <a 
                href="https://wa.me/5541987966912?text=🛒 QUERO ASSINAR - Plano Profissional R$147/mês%0A%0AOlá! Quero contratar o plano Profissional (R$147/mês) para minha imobiliária.%0A%0ANome da imobiliária:%0AQuantos corretores:%0ACRECI:"
                target="_blank"
                className="block w-full py-2.5 text-center bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-all text-sm"
                data-event="compra_profissional"
              >
                Assinar plano
              </a>
            </div>

            {/* Plano Imobiliária */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand-300 hover:shadow-xl transition-all">
              <div className="text-center mb-4">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-1">Imobiliária</h3>
                <p className="text-gray-500 text-xs">Para equipes maiores</p>
              </div>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-900">R$297</span>
                <span className="text-gray-500 text-sm">/mês</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> Até 15 corretores
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> 50 diligências/mês
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> Certidões + processos
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-brand-500">✓</span> 10 matrículas inclusas
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-gray-300">+</span> Extra: <strong>+R$25</strong>/matrícula
                </li>
              </ul>
              <a 
                href="https://wa.me/5541987966912?text=🛒 QUERO ASSINAR - Plano Imobiliária R$297/mês%0A%0AOlá! Quero contratar o plano Imobiliária (R$297/mês).%0A%0ANome da imobiliária:%0AQuantos corretores:%0ACRECI:"
                target="_blank"
                className="block w-full py-2.5 text-center bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-all text-sm"
                data-event="compra_imobiliaria"
              >
                Assinar plano
              </a>
            </div>
          </div>

          {/* Nota sobre o serviço */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-brand-500 text-lg">📋</span>
                  <div>
                    <strong className="text-brand-800">Análise completa de proprietários</strong>
                    <p className="text-brand-700">Verificamos certidões e processos de todos os proprietários do imóvel.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-500 text-lg">📄</span>
                  <div>
                    <strong className="text-brand-800">Matrícula atualizada: +R$25</strong>
                    <p className="text-brand-700">Se você já tiver o PDF da matrícula, não há custo extra.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Dúvidas */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Precisa de um plano personalizado? Entre em contato após escolher um plano.
            </p>
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

      {/* Urgência / CTA Final */}
      <section className="py-12 bg-gradient-to-r from-brand-600 to-brand-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Pronto para proteger sua comissão?
              </h3>
              <p className="text-white/90 text-lg">
                Comece com uma consulta avulsa por apenas R$9,90.
              </p>
            </div>
            <a 
              href="#planos"
              className="flex-shrink-0 px-8 py-4 bg-white text-brand-700 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg"
              data-event="cta_urgencia_click"
            >
              Escolher meu plano
            </a>
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
            
            <p className="text-gray-400 text-sm">
              Análise jurídica de imóveis via WhatsApp
            </p>
            
            <p className="text-gray-400 text-sm">
              © 2025 Imóvel Limpo. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
