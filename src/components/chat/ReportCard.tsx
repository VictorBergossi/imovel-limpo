'use client'

import { AnalysisReport } from '@/lib/types'

interface ReportCardProps {
  report: AnalysisReport
}

export function ReportCard({ report }: ReportCardProps) {
  const statusConfig = {
    limpo: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '✅',
      title: 'Imóvel Limpo',
      color: 'text-green-700'
    },
    atencao: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: '⚠️',
      title: 'Atenção Necessária',
      color: 'text-amber-700'
    },
    pendencia: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: '🚨',
      title: 'Pendências Encontradas',
      color: 'text-red-700'
    }
  }

  const config = statusConfig[report.status]

  return (
    <div className="flex justify-start mb-3">
      <div className={`rounded-2xl rounded-bl-md overflow-hidden shadow-md max-w-[95%] w-full ${config.bg} border ${config.border}`}>
        {/* Header */}
        <div className={`px-4 py-3 ${config.bg} border-b ${config.border}`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{config.icon}</span>
            <div>
              <h3 className={`font-bold ${config.color}`}>{config.title}</h3>
              <p className="text-xs text-gray-500">Análise completa do imóvel</p>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="bg-white p-4 space-y-4">
          {/* Dados do Imóvel */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">📍 Imóvel</h4>
            <div className="bg-gray-50 rounded-lg p-3 text-sm">
              <p><strong>Matrícula:</strong> {report.imovel.matricula}</p>
              {report.imovel.cartorio && <p><strong>Cartório:</strong> {report.imovel.cartorio}</p>}
              {report.imovel.endereco && <p><strong>Endereço:</strong> {report.imovel.endereco}</p>}
              {report.imovel.area && <p><strong>Área:</strong> {report.imovel.area}</p>}
            </div>
          </div>

          {/* Proprietários */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">👤 Proprietários</h4>
            <div className="space-y-1">
              {report.proprietarios.map((prop, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg px-3 py-2 text-sm flex justify-between">
                  <span>{prop.nome}</span>
                  <span className="text-gray-500 text-xs">
                    {prop.tipo === 'PF' ? 'CPF' : 'CNPJ'}: ***{prop.cpfCnpj.slice(-4)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certidões Consultadas */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              ✅ Certidões Consultadas ({report.certidoes.filter(c => c.status !== 'nao_consultada').length})
            </h4>
            <div className="space-y-2">
              {report.certidoes.filter(c => c.status !== 'nao_consultada').map((cert, idx) => (
                <div 
                  key={idx} 
                  className={`rounded-lg px-3 py-2 text-sm ${
                    cert.status === 'negativa' ? 'bg-green-50 border border-green-100' :
                    cert.status === 'positiva' ? 'bg-red-50 border border-red-100' :
                    cert.status === 'erro' ? 'bg-gray-100 border border-gray-200' :
                    'bg-gray-50 border border-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span>
                        {cert.status === 'negativa' ? '✅' :
                         cert.status === 'positiva' ? '❌' :
                         cert.status === 'erro' ? '⚪' : '⚪'}
                      </span>
                      <span className="font-medium text-xs">{cert.nome}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {cert.comprovante && (
                        <a
                          href={cert.comprovante}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-0.5 rounded transition-colors"
                        >
                          📄 Ver certidão
                        </a>
                      )}
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        cert.status === 'negativa' ? 'bg-green-100 text-green-700' :
                        cert.status === 'positiva' ? 'bg-red-100 text-red-700' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {cert.status === 'negativa' ? 'NADA CONSTA' :
                         cert.status === 'positiva' ? 'CONSTA' :
                         cert.status === 'erro' ? 'ERRO' : 'N/A'}
                      </span>
                    </div>
                  </div>
                  {cert.detalhes && (
                    <p className={`text-[10px] mt-1 ${
                      cert.status === 'negativa' ? 'text-green-600' :
                      cert.status === 'positiva' ? 'text-red-600' :
                      'text-gray-500'
                    }`}>
                      {cert.detalhes}
                    </p>
                  )}
                  <p className="text-[9px] text-gray-400 mt-1">
                    Fonte: {cert.fonte} • {new Date(cert.dataConsulta).toLocaleString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certidões Disponíveis no Plano Pago */}
          {report.certidoes.filter(c => c.status === 'nao_consultada').length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-amber-600 uppercase mb-2">
                🔒 Disponível no Plano Completo ({report.certidoes.filter(c => c.status === 'nao_consultada').length})
              </h4>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="grid grid-cols-2 gap-2">
                  {report.certidoes.filter(c => c.status === 'nao_consultada').map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-xs text-amber-700">
                      <span>🔒</span>
                      <span>{cert.nome}</span>
                    </div>
                  ))}
                </div>
                <a 
                  href="/#planos" 
                  className="mt-3 block text-center bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Ver Planos e Desbloquear Todas
                </a>
              </div>
            </div>
          )}

          {/* Pendências */}
          {report.pendencias.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">⚠️ Pendências</h4>
              <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                <ul className="text-sm text-red-800 space-y-1">
                  {report.pendencias.map((pend, idx) => (
                    <li key={idx}>{pend}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tempo Estimado */}
          <div className={`p-4 rounded-xl ${config.bg} border ${config.border}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Tempo estimado para comissão</p>
                <p className={`text-xl font-bold ${config.color}`}>{report.tempoEstimadoComissao}</p>
              </div>
              <span className="text-3xl">⏱️</span>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Resumo</p>
            <p className="text-sm text-gray-700">{report.resumo}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 text-center">
            Análise gerada pelo Imóvel Limpo • {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  )
}

