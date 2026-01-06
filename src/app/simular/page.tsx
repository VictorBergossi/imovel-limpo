import { ChatContainer } from '@/components/chat'
import { Logo } from '@/components/Logo'
import Link from 'next/link'

export const metadata = {
  title: 'Simular Análise | Imóvel Limpo',
  description: 'Teste a análise de matrícula do Imóvel Limpo gratuitamente',
}

export default function SimularPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="font-display font-bold text-lg text-gray-900">Imóvel Limpo</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">Simulação gratuita</span>
            <Link 
              href="/#planos"
              className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors"
            >
              Ver planos
            </Link>
          </div>
        </div>
      </header>

      {/* Info Banner */}
      <div className="bg-brand-50 border-b border-brand-100 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div className="text-sm">
              <p className="text-brand-800 font-medium">
                Esta é uma demonstração do Imóvel Limpo
              </p>
              <p className="text-brand-600">
                Cole o texto de uma matrícula de imóvel para ver como funciona a análise. 
                Nesta simulação, consultamos certidões reais dos proprietários.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto bg-white shadow-xl">
        <ChatContainer />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            Gostou? <Link href="/#planos" className="text-brand-600 font-semibold hover:underline">Assine um plano</Link> para usar com seus imóveis.
          </p>
        </div>
      </footer>
    </div>
  )
}


