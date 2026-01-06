// Serviço de integração com InfoSimples para consulta de certidões

import { CertidaoResult, Proprietario } from '../types'

const INFOSIMPLES_TOKEN = process.env.INFOSIMPLES_API_KEY || ''
const INFOSIMPLES_BASE_URL = 'https://api.infosimples.com/api/v2'

interface InfoSimplesResponse {
  code: number
  code_message: string
  data?: Record<string, unknown>[]
  errors?: string[]
  site_receipts?: string[] // URLs das certidões/comprovantes gerados
}

// Certidões ATIVAS na conta (funcionando)
const CERTIDOES_ATIVAS = {
  tst_cndt: {
    endpoint: '/consultas/tst/cndt',
    nome: 'CNDT - Débitos Trabalhistas (TST)',
    tipo: 'AMBOS' as const
  },
  receita_cnpj: {
    endpoint: '/consultas/receita-federal/cnpj',
    nome: 'Situação Cadastral CNPJ',
    tipo: 'PJ' as const
  },
  cenprot_sp: {
    endpoint: '/consultas/cenprot-sp/protestos',
    nome: 'Protestos (CENPROT SP)',
    tipo: 'AMBOS' as const
  }
}

// Certidões disponíveis no PLANO PAGO (não ativas na demonstração)
const CERTIDOES_PLANO_PAGO = [
  { nome: 'CND Federal (Receita + PGFN)', tipo: 'AMBOS' },
  { nome: 'CNJ - Improbidade Administrativa', tipo: 'AMBOS' },
  { nome: 'CGU - Certidão Correcional (CEIS/CNEP)', tipo: 'AMBOS' },
  { nome: 'PGFN - Lista de Devedores', tipo: 'AMBOS' },
  { nome: 'Empresas Vinculadas ao CPF', tipo: 'PF' },
  { nome: 'Processos TJ (Estadual)', tipo: 'AMBOS' },
  { nome: 'Processos TRF (Federal)', tipo: 'AMBOS' },
  { nome: 'Antecedentes Criminais', tipo: 'PF' },
  { nome: 'CRF/FGTS (Caixa)', tipo: 'PJ' },
  { nome: 'Consulta IPTU do Imóvel', tipo: 'AMBOS' },
]

type CertidaoAtivaType = keyof typeof CERTIDOES_ATIVAS

async function consultarInfoSimples(
  endpoint: string,
  params: Record<string, string>
): Promise<InfoSimplesResponse> {
  const url = `${INFOSIMPLES_BASE_URL}${endpoint}.json`
  
  const body = new URLSearchParams({
    token: INFOSIMPLES_TOKEN,
    timeout: '300',
    ...params
  })

  console.log(`   🌐 URL: ${url}`)
  console.log(`   📤 Params: ${JSON.stringify(params)}`)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString()
    })

    const jsonResponse = await response.json()
    console.log(`   📥 Response: ${JSON.stringify(jsonResponse).substring(0, 300)}`)

    return jsonResponse
  } catch (error) {
    console.error(`Erro ao consultar InfoSimples (${endpoint}):`, error)
    throw error
  }
}

async function consultarCertidao(
  tipo: CertidaoAtivaType,
  documento: string,
  tipoProprietario: 'PF' | 'PJ'
): Promise<CertidaoResult> {
  const certidaoConfig = CERTIDOES_ATIVAS[tipo]
  
  if (certidaoConfig.tipo !== 'AMBOS' && certidaoConfig.tipo !== tipoProprietario) {
    throw new Error(`Certidão ${tipo} não é compatível com ${tipoProprietario}`)
  }

  const documentoLimpo = documento.replace(/\D/g, '')
  const params: Record<string, string> = tipoProprietario === 'PF' 
    ? { cpf: documentoLimpo }
    : { cnpj: documentoLimpo }

  try {
    console.log(`   → Consultando ${certidaoConfig.nome}...`)
    const response = await consultarInfoSimples(certidaoConfig.endpoint, params)
    console.log(`   ✓ Resposta: code=${response.code} - ${response.code_message}`)

    if (response.code === 200) {
      const data = response.data?.[0] || {}
      const status = interpretarResultado(tipo, data)
      
      // Pega o link do comprovante se existir
      const comprovante = data.site_receipt as string || 
                          (Array.isArray(response.site_receipts) && response.site_receipts[0]) ||
                          undefined

      return {
        tipo,
        nome: certidaoConfig.nome,
        status: status.status,
        detalhes: status.detalhes,
        dataConsulta: new Date().toISOString(),
        fonte: 'InfoSimples',
        comprovante
      }
    } else {
      return {
        tipo,
        nome: certidaoConfig.nome,
        status: 'erro',
        detalhes: response.code_message || 'Erro na consulta',
        dataConsulta: new Date().toISOString(),
        fonte: 'InfoSimples'
      }
    }
  } catch (error) {
    console.error(`Erro ao consultar certidão ${tipo}:`, error)
    return {
      tipo,
      nome: certidaoConfig.nome,
      status: 'erro',
      detalhes: 'Não foi possível consultar esta certidão',
      dataConsulta: new Date().toISOString(),
      fonte: 'InfoSimples'
    }
  }
}

function interpretarResultado(
  tipo: CertidaoAtivaType,
  data: Record<string, unknown>
): { status: CertidaoResult['status']; detalhes: string } {
  console.log(`   📋 Interpretando resultado de ${tipo}:`, JSON.stringify(data).substring(0, 500))
  
  switch (tipo) {
    case 'tst_cndt': {
      const conseguiu = data.conseguiu_emitir_certidao_negativa
      const consta = data.consta
      const mensagem = String(data.mensagem || '').toLowerCase()
      
      if (conseguiu === true || consta === false || mensagem.includes('negativa')) {
        return { status: 'negativa', detalhes: `CNDT expedida (${data.certidao || 'OK'}) - válida até ${data.validade || 'N/A'}` }
      } else if (consta === true || mensagem.includes('positiva')) {
        const processos = data.total_de_processos || 'N/A'
        return { status: 'positiva', detalhes: `Existem débitos trabalhistas - ${processos} processo(s)` }
      }
      return { status: 'nada_consta', detalhes: String(data.mensagem || 'Consulta realizada') }
    }

    case 'receita_cnpj': {
      const situacao = String(data.situacao || '').toLowerCase()
      
      if (situacao.includes('ativa')) {
        return { status: 'negativa', detalhes: `Situação: ATIVA` }
      } else if (situacao.includes('baixada') || situacao.includes('inapta') || situacao.includes('suspensa')) {
        return { status: 'positiva', detalhes: `Situação: ${situacao.toUpperCase()} - ATENÇÃO` }
      }
      return { status: 'nada_consta', detalhes: `Situação: ${situacao || 'Consultado'}` }
    }

    case 'cenprot_sp': {
      const qtdTitulos = Number(data.quantidade_titulos || 0)
      const cartorios = data.cartorios as string[] || []
      
      if (qtdTitulos === 0) {
        return { status: 'negativa', detalhes: 'Nenhum protesto encontrado em SP' }
      } else {
        const cartoriosInfo = cartorios.length > 0 ? ` em ${cartorios.length} cartório(s)` : ''
        return { 
          status: 'positiva', 
          detalhes: `${qtdTitulos} protesto(s) encontrado(s)${cartoriosInfo} - ATENÇÃO` 
        }
      }
    }

    default:
      return { status: 'nada_consta', detalhes: String(data.mensagem || 'Consulta realizada') }
  }
}

export async function consultarTodasCertidoes(
  proprietarios: Proprietario[]
): Promise<CertidaoResult[]> {
  const resultados: CertidaoResult[] = []

  console.log(`\n🔍 InfoSimples: Consultando certidões para ${proprietarios.length} proprietário(s)`)

  for (const proprietario of proprietarios) {
    if (!proprietario.cpfCnpj) {
      console.log(`⚠️ Proprietário ${proprietario.nome} sem CPF/CNPJ - pulando`)
      continue
    }

    console.log(`📋 Consultando certidões de ${proprietario.nome} (${proprietario.cpfCnpj})`)
    const tipoDoc = proprietario.tipo

    // 1. Consulta CNDT (funciona para PF e PJ)
    try {
      const cndt = await consultarCertidao('tst_cndt', proprietario.cpfCnpj, tipoDoc)
      cndt.detalhes = `${proprietario.nome}: ${cndt.detalhes}`
      resultados.push(cndt)
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(`Erro ao consultar CNDT para ${proprietario.nome}:`, error)
    }

    // 2. Consulta CENPROT SP - Protestos (funciona para PF e PJ)
    try {
      const protestos = await consultarCertidao('cenprot_sp', proprietario.cpfCnpj, tipoDoc)
      protestos.detalhes = `${proprietario.nome}: ${protestos.detalhes}`
      resultados.push(protestos)
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(`Erro ao consultar CENPROT para ${proprietario.nome}:`, error)
    }

    // 3. Se for PJ, consulta situação cadastral
    if (tipoDoc === 'PJ') {
      try {
        const situacao = await consultarCertidao('receita_cnpj', proprietario.cpfCnpj, 'PJ')
        situacao.detalhes = `${proprietario.nome}: ${situacao.detalhes}`
        resultados.push(situacao)
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Erro ao consultar situação CNPJ para ${proprietario.nome}:`, error)
      }
    }
  }

  // 3. Adiciona certidões do plano pago como "não consultadas"
  const tiposProp = proprietarios.map(p => p.tipo)
  const temPF = tiposProp.includes('PF')
  const temPJ = tiposProp.includes('PJ')

  for (const certidao of CERTIDOES_PLANO_PAGO) {
    // Só adiciona se for relevante para os tipos de proprietários
    if (certidao.tipo === 'AMBOS' || 
        (certidao.tipo === 'PF' && temPF) || 
        (certidao.tipo === 'PJ' && temPJ)) {
      resultados.push({
        tipo: certidao.nome.toLowerCase().replace(/\s/g, '_'),
        nome: certidao.nome,
        status: 'nao_consultada',
        detalhes: '🔒 Disponível no plano completo',
        dataConsulta: new Date().toISOString(),
        fonte: 'Imóvel Limpo'
      })
    }
  }

  return resultados
}
