// Serviço de armazenamento de análises
import { SavedAnalysis, AnalysisReport, AnalysisFilters } from '../types'

const STORAGE_KEY = 'imovel_limpo_analyses'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// Salvar uma nova análise
export function saveAnalysis(
  report: AnalysisReport,
  corretor?: { nome: string; email?: string },
  cliente?: { nome: string; telefone?: string }
): SavedAnalysis {
  const analyses = getAllAnalyses()
  
  const newAnalysis: SavedAnalysis = {
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    report,
    corretor,
    cliente,
    favorito: false,
    tags: [],
    notas: ''
  }
  
  analyses.unshift(newAnalysis) // Adiciona no início (mais recente primeiro)
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses))
  }
  
  return newAnalysis
}

// Obter todas as análises
export function getAllAnalyses(): SavedAnalysis[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Obter uma análise por ID
export function getAnalysisById(id: string): SavedAnalysis | null {
  const analyses = getAllAnalyses()
  return analyses.find(a => a.id === id) || null
}

// Atualizar uma análise
export function updateAnalysis(id: string, updates: Partial<SavedAnalysis>): SavedAnalysis | null {
  const analyses = getAllAnalyses()
  const index = analyses.findIndex(a => a.id === id)
  
  if (index === -1) return null
  
  analyses[index] = {
    ...analyses[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses))
  }
  
  return analyses[index]
}

// Deletar uma análise
export function deleteAnalysis(id: string): boolean {
  const analyses = getAllAnalyses()
  const filtered = analyses.filter(a => a.id !== id)
  
  if (filtered.length === analyses.length) return false
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  }
  
  return true
}

// Alternar favorito
export function toggleFavorite(id: string): SavedAnalysis | null {
  const analysis = getAnalysisById(id)
  if (!analysis) return null
  
  return updateAnalysis(id, { favorito: !analysis.favorito })
}

// Filtrar análises
export function filterAnalyses(filters: AnalysisFilters): SavedAnalysis[] {
  let analyses = getAllAnalyses()
  
  // Filtro por busca (nome do imóvel, proprietário, matrícula)
  if (filters.search) {
    const search = filters.search.toLowerCase()
    analyses = analyses.filter(a => 
      a.report.imovel.matricula.toLowerCase().includes(search) ||
      a.report.imovel.endereco?.toLowerCase().includes(search) ||
      a.report.proprietarios.some(p => p.nome.toLowerCase().includes(search)) ||
      a.cliente?.nome?.toLowerCase().includes(search) ||
      a.corretor?.nome?.toLowerCase().includes(search)
    )
  }
  
  // Filtro por status
  if (filters.status && filters.status !== 'todos') {
    analyses = analyses.filter(a => a.report.status === filters.status)
  }
  
  // Filtro por data
  if (filters.dateFrom) {
    analyses = analyses.filter(a => new Date(a.createdAt) >= new Date(filters.dateFrom!))
  }
  
  if (filters.dateTo) {
    analyses = analyses.filter(a => new Date(a.createdAt) <= new Date(filters.dateTo!))
  }
  
  // Filtro por corretor
  if (filters.corretor) {
    analyses = analyses.filter(a => a.corretor?.nome === filters.corretor)
  }
  
  // Filtro por favoritos
  if (filters.favoritos) {
    analyses = analyses.filter(a => a.favorito)
  }
  
  return analyses
}

// Estatísticas das análises
export function getAnalysisStats() {
  const analyses = getAllAnalyses()
  
  const total = analyses.length
  const limpos = analyses.filter(a => a.report.status === 'limpo').length
  const atencao = analyses.filter(a => a.report.status === 'atencao').length
  const pendencias = analyses.filter(a => a.report.status === 'pendencia').length
  const favoritos = analyses.filter(a => a.favorito).length
  
  // Análises dos últimos 7 dias
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const ultimaSemana = analyses.filter(a => new Date(a.createdAt) >= weekAgo).length
  
  // Análises do mês
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)
  const ultimoMes = analyses.filter(a => new Date(a.createdAt) >= monthAgo).length
  
  return {
    total,
    limpos,
    atencao,
    pendencias,
    favoritos,
    ultimaSemana,
    ultimoMes,
    taxaAprovacao: total > 0 ? Math.round((limpos / total) * 100) : 0
  }
}

// Exportar análises para JSON
export function exportAnalysesToJSON(): string {
  const analyses = getAllAnalyses()
  return JSON.stringify(analyses, null, 2)
}

// Importar análises de JSON
export function importAnalysesFromJSON(json: string): number {
  try {
    const imported = JSON.parse(json) as SavedAnalysis[]
    const current = getAllAnalyses()
    
    // Evita duplicatas pelo ID
    const existingIds = new Set(current.map(a => a.id))
    const newAnalyses = imported.filter(a => !existingIds.has(a.id))
    
    const merged = [...newAnalyses, ...current]
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
    }
    
    return newAnalyses.length
  } catch {
    return 0
  }
}

