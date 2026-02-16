# 📋 Informações sobre Candidaturas e Currículos

## 🗄️ Onde os Dados Estão Sendo Salvos?

### 1. **Banco de Dados (Dados Textuais)**
**Localização:** `/home/z/my-project/db/custom.db`
**Tabela:** `Candidatura`

**Campos armazenados:**
- `id` - Identificador único da candidatura
- `name` - Nome completo do candidato
- `email` - Email do candidato
- `phone` - Telefone do candidato
- `service` - Serviço de interesse (tvde, estafeta, encomendas)
- `experience` - Experiência prévia (opcional)
- `message` - Mensagem adicional (opcional)
- `curriculoUrl` - URL do arquivo de currículo (opcional)
- `status` - Status da candidatura (padrão: "pendente")
- `createdAt` - Data e hora de criação
- `updatedAt` - Data e hora de atualização

### 2. **Sistema de Arquivos (Currículos)**
**Localização:** `/home/z/my-project/public/uploads/curriculos/`

**Formatos aceitos:**
- PDF (.pdf)
- Microsoft Word (.doc, .docx)

**Limites:**
- Tamanho máximo: 5MB por arquivo
- Validação de tipo MIME no servidor

**Nome do arquivo gerado automaticamente:**
- Formato: `{timestamp}-{randomString}.{extensão}`
- Exemplo: `1739654321-a3b7c8d9.pdf`

---

## 🔧 Como Acessar as Candidaturas?

### Via API:

**Listar todas as candidaturas:**
```bash
curl http://localhost:3000/api/candidaturas
```

**Resposta JSON:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxxxxxxxxxxx",
      "name": "João Silva",
      "email": "joao@email.com",
      "phone": "+351 912345678",
      "service": "tvde",
      "experience": "3 anos de experiência",
      "message": "Gostaria de me candidatar",
      "curriculoUrl": "/uploads/curriculos/1739654321-a3b7c8d9.pdf",
      "status": "pendente",
      "createdAt": "2024-02-15T12:00:00.000Z",
      "updatedAt": "2024-02-15T12:00:00.000Z"
    }
  ]
}
```

### Via Banco de Dados Diretamente:

```bash
cd /home/z/my-project
sqlite3 db/custom.db
```

**Comandos SQL úteis:**
```sql
-- Ver todas as candidaturas
SELECT * FROM Candidatura;

-- Ver candidaturas recentes
SELECT * FROM Candidatura ORDER BY createdAt DESC LIMIT 10;

-- Ver candidaturas com currículo
SELECT id, name, email, service, curriculoUrl, createdAt 
FROM Candidatura 
WHERE curriculoUrl IS NOT NULL;

-- Buscar por serviço
SELECT * FROM Candidatura WHERE service = 'tvde';

-- Atualizar status
UPDATE Candidatura SET status = 'em_analise' WHERE id = 'seu-id';
```

### Acessar Arquivos de Currículo:

Os arquivos são salvos em `/home/z/my-project/public/uploads/curriculos/` e podem ser acessados via URL:

```
http://localhost:3000/uploads/curriculos/1739654321-a3b7c8d9.pdf
```

---

## 📝 Fluxo Completo de uma Candidatura

### 1. **Usuário preenche o formulário**
   - Nome, email, telefone, serviço, experiência, mensagem
   - (Opcional) Anexa currículo em PDF, DOC ou DOCX

### 2. **Frontend envia dados**
   - Cria `FormData` com todos os campos
   - Envia para `/api/candidaturas` via POST
   - Arquivo é incluído no FormData

### 3. **API processa a requisição**
   - Recebe `FormData` (não JSON)
   - Valida os campos com Zod
   - Valida o arquivo (tipo, tamanho)
   - Salva o arquivo em `/public/uploads/curriculos/`
   - Gera URL pública do arquivo
   - Cria registro no banco de dados

### 4. **Dados são persistidos**
   - Informações textuais → Banco de dados SQLite
   - Arquivo de currículo → Sistema de arquivos
   - URL do arquivo → Banco de dados (campo `curriculoUrl`)

### 5. **Feedback ao usuário**
   - Toast de sucesso: "Candidatura enviada com sucesso!"
   - Formulário é limpo

---

## 🔒 Segurança

### Validações no Servidor:

1. **Tipo de arquivo:**
   - Apenas: PDF, DOC, DOCX
   - Validação por MIME type e extensão

2. **Tamanho do arquivo:**
   - Máximo: 5MB
   - Rejeita arquivos maiores

3. **Dados obrigatórios:**
   - Nome (mínimo 3 caracteres)
   - Email (formato válido)
   - Telefone (mínimo 10 caracteres)
   - Serviço (enum: tvde, estafeta, encomendas)

4. **Nome do arquivo:**
   - Gerado aleatoriamente para evitar conflitos
   - Previne overwriting de arquivos existentes

---

## 📊 Como Gerenciar as Candidaturas?

### Opção 1: Via Painel Admin (Recomendado)

Você pode acessar as candidaturas em `/admin` e ver:
- Lista de todas as candidaturas
- Informações de cada candidato
- Links para baixar os currículos

### Opção 2: Via API

```bash
# Listar todas
curl http://localhost:3000/api/candidaturas

# Ver detalhes de uma candidatura específica
curl http://localhost:3000/api/candidaturas/{id}
```

### Opção 3: Via SQLite CLI

```bash
sqlite3 db/custom.db

# Ver todas
SELECT * FROM Candidatura;

# Exportar para CSV
.mode csv
.headers on
.output candidaturas.csv
SELECT * FROM Candidatura;
.quit
```

---

## 📁 Estrutura de Arquivos

```
/home/z/my-project/
├── db/
│   └── custom.db              # Banco de dados SQLite
├── public/
│   └── uploads/
│       └── curriculos/        # Arquivos de currículo
│           ├── 1739654321-a3b7c8d9.pdf
│           ├── 1739654444-e5f6g7h0.docx
│           └── ...
├── src/
│   └── app/
│       └── api/
│           └── candidaturas/
│               └── route.ts    # API de candidaturas
└── prisma/
    └── schema.prisma          # Definição do banco
```

---

## 💡 Dicas de Uso

### Para Candidatos:
1. O currículo é opcional, mas recomendado
2. Formatos aceitos: PDF, DOC, DOCX
3. Tamanho máximo: 5MB
4. Preencha todos os campos obrigatórios marcados com *

### Para Administradores:
1. Acesse `/api/candidaturas` para ver todas as candidaturas
2. Cada candidatura tem um status (padrão: "pendente")
3. Atualize o status conforme o progresso
4. Baixe os currículos usando a URL em `curriculoUrl`

---

## 🔍 Como Ver os Currículos Recebidos?

### Via Browser:
1. Acesse a API: `http://localhost:3000/api/candidaturas`
2. Copie a URL do `curriculoUrl`
3. Cole no navegador para baixar/visualizar

### Via CLI:
```bash
# Listar arquivos de currículo
ls -lh /home/z/my-project/public/uploads/curriculos/

# Copiar arquivo específico
cp /home/z/my-project/public/uploads/curriculos/{arquivo} ~/Desktop/
```

---

## 🚀 Próximas Melhorias Possíveis

1. **Painel Admin Completo**
   - Visualizar lista de candidaturas
   - Baixar currículos diretamente
   - Atualizar status
   - Filtrar por serviço ou data

2. **Notificações por Email**
   - Enviar email quando nova candidatura chega
   - Notificar candidato sobre status

3. **Dashboard de Estatísticas**
   - Contagem de candidaturas por serviço
   - Gráficos de evolução temporal
   - Taxa de conversão

---

**Documentação atualizada em:** 2024-02-15
