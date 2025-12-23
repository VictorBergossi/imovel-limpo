# Imóvel Limpo - Landing Page

Landing page para validação de mercado do Imóvel Limpo - previsão de comissão e análise jurídica de imóveis via WhatsApp.

## 🚀 Deploy no Vercel

1. Suba este código para o GitHub
2. Acesse [vercel.com](https://vercel.com) → "Add New Project"
3. Importe o repositório
4. Adicione a variável de ambiente `NEXT_PUBLIC_WEB3FORMS_KEY` (veja abaixo)
5. Deploy!

## 📧 Capturar Leads (2 minutos)

### Opção 1: Web3Forms (Mais Fácil - Grátis)

1. Acesse [web3forms.com](https://web3forms.com)
2. Coloque seu email
3. Copie a **Access Key** que aparece
4. Crie o arquivo `.env.local`:

```
NEXT_PUBLIC_WEB3FORMS_KEY=sua-access-key-aqui
```

**Pronto!** Os leads chegam direto no seu email.

- ✅ 250 submissões/mês grátis
- ✅ Sem cadastro complicado
- ✅ Recebe por email instantaneamente

### Opção 2: Google Sheets (Se preferir planilha)

Veja instruções detalhadas no final deste arquivo.

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Criar arquivo de ambiente
echo "NEXT_PUBLIC_WEB3FORMS_KEY=sua-key-aqui" > .env.local

# Rodar servidor
npm run dev

# Acessar http://localhost:3000
```

## 🎨 Tecnologias

- Next.js 14
- TypeScript
- Tailwind CSS
- Web3Forms (captura de leads)
- Vercel (deploy)

## ✏️ Personalizações Rápidas

- **Cores**: `tailwind.config.ts` → `theme.extend.colors.brand`
- **Textos**: `src/app/page.tsx` → arrays `painPoints`, `features`, `steps`
- **SEO**: `src/app/layout.tsx` → objeto `metadata`

---

## 📊 Alternativa: Google Sheets

Se preferir receber os leads em uma planilha:

### 1. Criar a Planilha

Crie uma planilha com colunas: `Data | Nome | Email | Telefone | Cargo | Origem`

### 2. Criar o Apps Script

Em **Extensões → Apps Script**, cole:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date().toISOString(),
    data.nome || '',
    data.email || '',
    data.telefone || '',
    data.cargo || '',
    data.origem || ''
  ]);
  
  return ContentService.createTextOutput("OK");
}
```

### 3. Publicar

- Implantar → Nova implantação → App da Web
- Quem tem acesso: Qualquer pessoa
- Copie a URL

### 4. Modificar o código

No `page.tsx`, troque Web3Forms por Google Sheets (veja commit anterior ou peça ajuda).
