'use client'

import { Logo } from '@/components/Logo'

export default function RelatorioPage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      {/* Print Button - Hidden on print */}
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-all shadow-lg flex items-center gap-2"
        >
          <span>🖨️</span>
          Salvar como PDF
        </button>
      </div>

      <main className="min-h-screen bg-white p-8 print:p-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <header className="flex items-center justify-between border-b-2 border-brand-600 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <Logo className="w-12 h-12" />
              <div>
                <h1 className="font-display text-2xl font-bold text-gray-900">Imóvel Limpo</h1>
                <p className="text-gray-500 text-sm">Análise de Documentação Imobiliária</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Relatório gerado em</p>
              <p className="font-semibold text-gray-900">{new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
              <p className="text-xs text-gray-400">ID: IL-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </header>

          {/* Status Banner */}
          <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center">
                <span className="text-3xl">⚠️</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-800">ATENÇÃO NECESSÁRIA</h2>
                <p className="text-amber-700">Foram encontradas pendências que precisam ser resolvidas antes da venda.</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm text-amber-600">Previsão para comissão</p>
                <p className="text-4xl font-bold text-amber-700">~120 dias</p>
              </div>
            </div>
          </div>

          {/* Dados do Imóvel */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
              <span>🏠</span> Dados do Imóvel
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Matrícula</p>
                <p className="font-semibold text-gray-900">45.892</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Cartório</p>
                <p className="font-semibold text-gray-900">5º Registro de Imóveis de São Paulo</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Endereço</p>
                <p className="font-semibold text-gray-900">Rua dos Pinheiros, 1500 - Apto 82</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Área</p>
                <p className="font-semibold text-gray-900">120 m² (área útil)</p>
              </div>
            </div>
          </section>

          {/* Análise da Matrícula */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
              <span>📄</span> Análise da Matrícula Atualizada
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Data da matrícula consultada</span>
                <span className="font-semibold">{new Date().toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Último registro (R-15)</span>
                <span className="font-semibold">Compra e Venda - 15/03/2019</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <span className="text-red-700 font-medium">⚠️ Averbação (AV-8)</span>
                <span className="font-semibold text-red-700">PENHORA - 22/08/2023</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Hipotecas</span>
                <span className="font-semibold text-brand-600">Nenhuma ✓</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Usufruto</span>
                <span className="font-semibold text-brand-600">Não consta ✓</span>
              </div>
            </div>
          </section>

          {/* Pendência Detalhada */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-red-700 border-b border-red-200 pb-2 mb-4 flex items-center gap-2">
              <span>🚨</span> Pendência Encontrada
            </h3>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-red-600">Tipo</p>
                  <p className="font-bold text-red-800">Penhora Trabalhista</p>
                </div>
                <div>
                  <p className="text-sm text-red-600">Valor</p>
                  <p className="font-bold text-red-800">R$ 45.000,00</p>
                </div>
                <div>
                  <p className="text-sm text-red-600">Processo</p>
                  <p className="font-bold text-red-800">0001234-56.2023.5.02.0001</p>
                </div>
                <div>
                  <p className="text-sm text-red-600">Vara</p>
                  <p className="font-bold text-red-800">1ª Vara do Trabalho de São Paulo</p>
                </div>
              </div>
              <div className="border-t border-red-200 pt-4">
                <p className="text-sm text-red-600 mb-1">Recomendação</p>
                <p className="text-red-800">O vendedor deve quitar o débito ou obter autorização judicial para venda. Tempo estimado para resolução: 60-90 dias.</p>
              </div>
            </div>
          </section>

          {/* Proprietários */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
              <span>👥</span> Proprietários Verificados
            </h3>
            
            {/* Proprietário 1 */}
            <div className="border border-gray-200 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold text-gray-900">José da Silva Santos</p>
                  <p className="text-sm text-gray-500">CPF: ***.456.789-**</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">1 pendência</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <a href="https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PF/Emitir" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Certidão Negativa Federal</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ OK <span className="text-gray-400">↗</span></span>
                </a>
                <a href="https://www.dividaativa.pge.sp.gov.br/da-ic-web/inicio.do" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Certidão Negativa Estadual</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ OK <span className="text-gray-400">↗</span></span>
                </a>
                <a href="https://duc.prefeitura.sp.gov.br/certidoes/forms_anonimo/frmConsultaEmissaoCertificado.aspx" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Certidão Negativa Municipal</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ OK <span className="text-gray-400">↗</span></span>
                </a>
                <a href="https://cndt-certidao.tst.jus.br/inicio.faces" target="_blank" className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-200 hover:bg-red-100 transition-colors group">
                  <span className="text-red-700 group-hover:underline">Certidão Trabalhista</span>
                  <span className="text-red-600 font-medium flex items-center gap-1">⚠️ 1 processo <span className="text-red-400">↗</span></span>
                </a>
                <a href="https://www.protestosp.com.br/" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Protestos</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ Nenhum <span className="text-gray-400">↗</span></span>
                </a>
                <a href="https://esaj.tjsp.jus.br/cpopg/open.do" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Ações Cíveis</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ Nenhuma <span className="text-gray-400">↗</span></span>
                </a>
              </div>
            </div>

            {/* Proprietário 2 */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold text-gray-900">Maria Santos Silva</p>
                  <p className="text-sm text-gray-500">CPF: ***.789.123-**</p>
                </div>
                <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">✓ Regular</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <a href="https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PF/Emitir" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Certidão Negativa Federal</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ OK <span className="text-gray-400">↗</span></span>
                </a>
                <a href="https://www.dividaativa.pge.sp.gov.br/da-ic-web/inicio.do" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Certidão Negativa Estadual</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ OK <span className="text-gray-400">↗</span></span>
                </a>
                <a href="https://duc.prefeitura.sp.gov.br/certidoes/forms_anonimo/frmConsultaEmissaoCertificado.aspx" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Certidão Negativa Municipal</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ OK <span className="text-gray-400">↗</span></span>
                </a>
                <a href="https://cndt-certidao.tst.jus.br/inicio.faces" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Certidão Trabalhista</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ OK <span className="text-gray-400">↗</span></span>
                </a>
                <a href="https://www.protestosp.com.br/" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Protestos</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ Nenhum <span className="text-gray-400">↗</span></span>
                </a>
                <a href="https://esaj.tjsp.jus.br/cpopg/open.do" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Ações Cíveis</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ Nenhuma <span className="text-gray-400">↗</span></span>
                </a>
              </div>
            </div>
          </section>

          {/* Empresas Vinculadas */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
              <span>🏢</span> Empresas Vinculadas aos Proprietários
            </h3>
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold text-gray-900">Santos & Silva Comércio LTDA</p>
                  <p className="text-sm text-gray-500">CNPJ: 12.345.678/0001-90 | Sócio: José da Silva Santos (50%)</p>
                </div>
                <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">✓ Regular</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <a href="https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_solicitacao.asp" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Situação Receita</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ Ativa <span className="text-gray-400">↗</span></span>
                </a>
                <a href="https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PJ/Emitir" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Débitos Federais</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ Nenhum <span className="text-gray-400">↗</span></span>
                </a>
                <a href="https://esaj.tjsp.jus.br/cpopg/open.do" target="_blank" className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors group">
                  <span className="group-hover:underline">Processos</span>
                  <span className="text-brand-600 font-medium flex items-center gap-1">✓ Nenhum <span className="text-gray-400">↗</span></span>
                </a>
              </div>
            </div>
          </section>

          {/* Resumo Final */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
              <span>📊</span> Resumo da Análise
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-brand-600">7</p>
                <p className="text-sm text-brand-700">Certidões verificadas</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-red-600">1</p>
                <p className="text-sm text-red-700">Pendência encontrada</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-gray-700">2</p>
                <p className="text-sm text-gray-600">Proprietários analisados</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-gray-700">1</p>
                <p className="text-sm text-gray-600">Empresa verificada</p>
              </div>
            </div>
          </section>

          {/* Conclusão */}
          <section className="mb-8">
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-800 mb-3">📋 Conclusão e Recomendações</h3>
              <div className="space-y-3 text-amber-900">
                <p>
                  <strong>1. Penhora:</strong> O imóvel possui penhora trabalhista de R$ 45.000,00 que precisa ser quitada ou ter autorização judicial para venda.
                </p>
                <p>
                  <strong>2. Prazo estimado:</strong> Considerando a resolução da pendência, a venda deve ser concluída em aproximadamente 120 dias.
                </p>
                <p>
                  <strong>3. Recomendação:</strong> Negocie com o vendedor a quitação do débito antes de apresentar compradores, ou inclua essa condição no contrato.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t-2 border-gray-200 pt-6 mt-12">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Logo className="w-6 h-6" />
                <span>Imóvel Limpo - imovellimpo.com.br</span>
              </div>
              <div>
                <p>Este relatório tem caráter informativo e não substitui consulta jurídica.</p>
              </div>
            </div>
          </footer>

        </div>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body { 
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden { display: none !important; }
          .print\\:p-4 { padding: 1rem !important; }
        }
      `}</style>
    </>
  )
}

