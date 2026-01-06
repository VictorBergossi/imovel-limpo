'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { SavedAnalysis, AnalysisFilters } from '@/lib/types'
import { 
  getAllAnalyses, 
  filterAnalyses, 
  deleteAnalysis, 
  toggleFavorite,
  getAnalysisStats,
  exportAnalysesToJSON
} from '@/lib/services/storage'

export default function CentroDeComando() {
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([])
  const [stats, setStats] = useState<ReturnType<typeof getAnalysisStats> | null>(null)
  const [filters, setFilters] = useState<AnalysisFilters>({ status: 'todos' })
  const [selectedAnalysis, setSelectedAnalysis] = useState<SavedAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carrega análises
  useEffect(() => {
    loadData()
  }, [filters])

  function loadData() {
    setIsLoading(true)
    const data = filterAnalyses(filters)
    setAnalyses(data)
    setStats(getAnalysisStats())
    setIsLoading(false)
  }

  function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja excluir esta análise?')) {
      deleteAnalysis(id)
      loadData()
      if (selectedAnalysis?.id === id) {
        setSelectedAnalysis(null)
      }
    }
  }

  function handleToggleFavorite(id: string) {
    toggleFavorite(id)
    loadData()
    if (selectedAnalysis?.id === id) {
      setSelectedAnalysis(prev => prev ? { ...prev, favorito: !prev.favorito } : null)
    }
  }

  function handleExport() {
    const json = exportAnalysesToJSON()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `imovel-limpo-analises-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const statusConfig = {
    limpo: { bg: 'bg-emerald-500', text: 'text-emerald-500', label: 'Limpo', icon: '✅' },
    atencao: { bg: 'bg-amber-500', text: 'text-amber-500', label: 'Atenção', icon: '⚠️' },
    pendencia: { bg: 'bg-rose-500', text: 'text-rose-500', label: 'Pendência', icon: '🚨' }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                <Logo className="w-8 h-8" />
                <span className="font-bold text-xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Imóvel Limpo
                </span>
              </Link>
              <span className="text-slate-500">|</span>
              <h1 className="text-slate-300 font-medium">Centro de Comando</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                href="/simular"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition flex items-center gap-2"
              >
                <span>+</span>
                Nova Análise
              </Link>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition"
                title="Exportar análises"
              >
                📥 Exportar
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <StatCard 
              title="Total de Análises" 
              value={stats.total} 
              icon="📊" 
              color="bg-slate-800"
            />
            <StatCard 
              title="Imóveis Limpos" 
              value={stats.limpos} 
              icon="✅" 
              color="bg-emerald-900/50"
              textColor="text-emerald-400"
            />
            <StatCard 
              title="Com Atenção" 
              value={stats.atencao} 
              icon="⚠️" 
              color="bg-amber-900/50"
              textColor="text-amber-400"
            />
            <StatCard 
              title="Com Pendências" 
              value={stats.pendencias} 
              icon="🚨" 
              color="bg-rose-900/50"
              textColor="text-rose-400"
            />
            <StatCard 
              title="Última Semana" 
              value={stats.ultimaSemana} 
              icon="📅" 
              color="bg-cyan-900/50"
              textColor="text-cyan-400"
            />
            <StatCard 
              title="Taxa Aprovação" 
              value={`${stats.taxaAprovacao}%`} 
              icon="🎯" 
              color="bg-violet-900/50"
              textColor="text-violet-400"
            />
          </div>
        )}

        {/* Filters */}
        <div className="bg-slate-900/50 rounded-xl p-4 mb-6 border border-slate-800">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="🔍 Buscar por matrícula, endereço, proprietário..."
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <select
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              value={filters.status || 'todos'}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as AnalysisFilters['status'] })}
            >
              <option value="todos">Todos os Status</option>
              <option value="limpo">✅ Limpos</option>
              <option value="atencao">⚠️ Atenção</option>
              <option value="pendencia">🚨 Pendências</option>
            </select>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filters.favoritos 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-slate-800 border border-slate-700 hover:bg-slate-700'
              }`}
              onClick={() => setFilters({ ...filters, favoritos: !filters.favoritos })}
            >
              ⭐ Favoritos
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Analysis List */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <h2 className="font-semibold text-slate-300">
                  Análises ({analyses.length})
                </h2>
              </div>
              
              {isLoading ? (
                <div className="p-8 text-center text-slate-500">
                  <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                  Carregando...
                </div>
              ) : analyses.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-4xl mb-4">📭</div>
                  <h3 className="text-lg font-medium text-slate-300 mb-2">Nenhuma análise encontrada</h3>
                  <p className="text-slate-500 text-sm mb-4">
                    {filters.search || filters.status !== 'todos' || filters.favoritos
                      ? 'Tente ajustar os filtros de busca'
                      : 'Faça sua primeira análise no simulador'
                    }
                  </p>
                  <Link 
                    href="/simular"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition"
                  >
                    🔍 Fazer Nova Análise
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-800 max-h-[600px] overflow-y-auto">
                  {analyses.map((analysis) => (
                    <AnalysisRow
                      key={analysis.id}
                      analysis={analysis}
                      isSelected={selectedAnalysis?.id === analysis.id}
                      statusConfig={statusConfig}
                      onSelect={() => setSelectedAnalysis(analysis)}
                      onToggleFavorite={() => handleToggleFavorite(analysis.id)}
                      onDelete={() => handleDelete(analysis.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedAnalysis ? (
              <AnalysisDetail 
                analysis={selectedAnalysis} 
                statusConfig={statusConfig}
                onClose={() => setSelectedAnalysis(null)}
              />
            ) : (
              <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-8 text-center">
                <div className="text-4xl mb-4">👈</div>
                <h3 className="text-slate-300 font-medium mb-2">Selecione uma análise</h3>
                <p className="text-slate-500 text-sm">
                  Clique em uma análise à esquerda para ver os detalhes completos
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente de Card de Estatística
function StatCard({ 
  title, 
  value, 
  icon, 
  color = 'bg-slate-800',
  textColor = 'text-white'
}: { 
  title: string
  value: number | string
  icon: string
  color?: string
  textColor?: string
}) {
  return (
    <div className={`${color} rounded-xl p-4 border border-slate-700/50`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <span className="text-xs text-slate-400 uppercase tracking-wider">{title}</span>
      </div>
      <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
    </div>
  )
}

// Componente de Linha de Análise
function AnalysisRow({
  analysis,
  isSelected,
  statusConfig,
  onSelect,
  onToggleFavorite,
  onDelete
}: {
  analysis: SavedAnalysis
  isSelected: boolean
  statusConfig: Record<string, { bg: string; text: string; label: string; icon: string }>
  onSelect: () => void
  onToggleFavorite: () => void
  onDelete: () => void
}) {
  const config = statusConfig[analysis.report.status]
  const date = new Date(analysis.createdAt)
  
  return (
    <div 
      className={`p-4 cursor-pointer transition hover:bg-slate-800/50 ${
        isSelected ? 'bg-slate-800/80 border-l-2 border-emerald-500' : ''
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${config.bg}`}></span>
            <span className="font-medium text-slate-200 truncate">
              Matrícula {analysis.report.imovel.matricula}
            </span>
            {analysis.favorito && <span className="text-amber-400">⭐</span>}
          </div>
          <p className="text-sm text-slate-400 truncate mb-2">
            {analysis.report.imovel.endereco || 'Endereço não informado'}
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>👤 {analysis.report.proprietarios.length} proprietário(s)</span>
            <span>📋 {analysis.report.certidoes.length} certidões</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${config.bg}/20 ${config.text}`}>
            {config.icon} {config.label}
          </span>
          <span className="text-xs text-slate-500">
            {date.toLocaleDateString('pt-BR')}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
              className="p-1 hover:bg-slate-700 rounded transition"
              title={analysis.favorito ? 'Remover favorito' : 'Adicionar favorito'}
            >
              {analysis.favorito ? '⭐' : '☆'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="p-1 hover:bg-rose-900/50 rounded transition text-slate-400 hover:text-rose-400"
              title="Excluir"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente de Detalhe da Análise
function AnalysisDetail({ 
  analysis, 
  statusConfig,
  onClose 
}: { 
  analysis: SavedAnalysis
  statusConfig: Record<string, { bg: string; text: string; label: string; icon: string }>
  onClose: () => void
}) {
  const config = statusConfig[analysis.report.status]
  const date = new Date(analysis.createdAt)
  
  const certidoesConsultadas = analysis.report.certidoes.filter(c => c.status !== 'nao_consultada')
  const certidoesNegativas = certidoesConsultadas.filter(c => c.status === 'negativa')
  const certidoesPositivas = certidoesConsultadas.filter(c => c.status === 'positiva')
  
  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
      {/* Header */}
      <div className={`px-4 py-3 ${config.bg}/20 border-b border-slate-800`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{config.icon}</span>
            <div>
              <h3 className={`font-bold ${config.text}`}>{config.label}</h3>
              <p className="text-xs text-slate-400">
                {date.toLocaleDateString('pt-BR')} às {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded transition text-slate-400"
          >
            ✕
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
        {/* Imóvel */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">📍 Imóvel</h4>
          <div className="bg-slate-800/50 rounded-lg p-3 text-sm space-y-1">
            <p><span className="text-slate-400">Matrícula:</span> <span className="text-white font-medium">{analysis.report.imovel.matricula}</span></p>
            {analysis.report.imovel.cartorio && (
              <p><span className="text-slate-400">Cartório:</span> {analysis.report.imovel.cartorio}</p>
            )}
            {analysis.report.imovel.endereco && (
              <p><span className="text-slate-400">Endereço:</span> {analysis.report.imovel.endereco}</p>
            )}
            {analysis.report.imovel.area && (
              <p><span className="text-slate-400">Área:</span> {analysis.report.imovel.area}</p>
            )}
          </div>
        </div>

        {/* Proprietários */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">
            👤 Proprietários ({analysis.report.proprietarios.length})
          </h4>
          <div className="space-y-1">
            {analysis.report.proprietarios.map((prop, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-lg px-3 py-2 text-sm flex justify-between items-center">
                <span className="text-slate-200">{prop.nome}</span>
                <span className="text-xs text-slate-500">
                  {prop.tipo === 'PF' ? 'CPF' : 'CNPJ'}: ***{prop.cpfCnpj.slice(-4)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certidões */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">
            📋 Certidões ({certidoesConsultadas.length})
          </h4>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-emerald-900/30 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-emerald-400">{certidoesNegativas.length}</div>
              <div className="text-xs text-emerald-400/70">Nada Consta</div>
            </div>
            <div className="bg-rose-900/30 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-rose-400">{certidoesPositivas.length}</div>
              <div className="text-xs text-rose-400/70">Consta</div>
            </div>
          </div>
          <div className="space-y-1 max-h-[150px] overflow-y-auto">
            {certidoesConsultadas.map((cert, idx) => (
              <div 
                key={idx} 
                className={`rounded-lg px-3 py-2 text-xs ${
                  cert.status === 'negativa' 
                    ? 'bg-emerald-900/20 border border-emerald-900/30' 
                    : cert.status === 'positiva'
                    ? 'bg-rose-900/20 border border-rose-900/30'
                    : 'bg-slate-800/50 border border-slate-700/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={cert.status === 'negativa' ? 'text-emerald-400' : cert.status === 'positiva' ? 'text-rose-400' : 'text-slate-400'}>
                    {cert.status === 'negativa' ? '✅' : cert.status === 'positiva' ? '❌' : '⚪'} {cert.nome}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pendências */}
        {analysis.report.pendencias.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-rose-500 uppercase mb-2">
              ⚠️ Pendências ({analysis.report.pendencias.length})
            </h4>
            <div className="bg-rose-900/20 border border-rose-900/30 rounded-lg p-3">
              <ul className="text-xs text-rose-300 space-y-1">
                {analysis.report.pendencias.map((pend, idx) => (
                  <li key={idx}>• {pend}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Resumo */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">📝 Resumo</h4>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <p className="text-sm text-slate-300">{analysis.report.resumo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

