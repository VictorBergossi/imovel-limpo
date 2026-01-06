// Tipos para o sistema de chat

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  type: 'text' | 'file' | 'loading' | 'report'
  metadata?: {
    fileName?: string
    fileType?: string
    reportData?: AnalysisReport
  }
}

export interface AnalysisReport {
  imovel: {
    matricula: string
    cartorio?: string
    endereco?: string
    area?: string
  }
  proprietarios: Proprietario[]
  certidoes: CertidaoResult[]
  status: 'limpo' | 'atencao' | 'pendencia'
  tempoEstimadoComissao: string
  resumo: string
  pendencias: string[]
}

export interface Proprietario {
  nome: string
  cpfCnpj: string
  tipo: 'PF' | 'PJ'
}

export interface CertidaoResult {
  tipo: string
  nome: string
  status: 'positiva' | 'negativa' | 'nada_consta' | 'erro' | 'nao_consultada'
  detalhes?: string
  dataConsulta: string
  fonte: string
  comprovante?: string // URL do comprovante/certidão para download
}

export interface MatriculaData {
  numero: string
  cartorio?: string
  endereco?: string
  area?: string
  proprietarios: Proprietario[]
  averbacoes?: string[]
  onus?: string[]
}

// Tipos para análises salvas no Centro de Comando
export interface SavedAnalysis {
  id: string
  createdAt: string
  updatedAt: string
  report: AnalysisReport
  corretor?: {
    nome: string
    email?: string
  }
  cliente?: {
    nome: string
    telefone?: string
  }
  notas?: string
  tags?: string[]
  favorito?: boolean
}

export interface AnalysisFilters {
  search?: string
  status?: 'limpo' | 'atencao' | 'pendencia' | 'todos'
  dateFrom?: string
  dateTo?: string
  corretor?: string
  favoritos?: boolean
}


