import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Imóvel Limpo | Análise Jurídica de Imóveis via WhatsApp',
  description: 'Saiba em minutos se um imóvel está pronto para venda. Análise de matrícula, certidões e documentação jurídica direto no seu WhatsApp.',
  keywords: 'imóvel, análise jurídica, matrícula, certidão negativa, corretor, imobiliária, documentação imóvel',
  openGraph: {
    title: 'Imóvel Limpo | Análise Jurídica de Imóveis via WhatsApp',
    description: 'Saiba em minutos se um imóvel está pronto para venda. Análise completa direto no WhatsApp.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

