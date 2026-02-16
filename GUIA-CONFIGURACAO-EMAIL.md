# 🚀 Guia Rápido de Configuração de Email

## ✅ O que foi feito:

1. **✅ Botão FacilitaFrota removido do meio do site**
   - Agora aparece apenas no cabeçalho
   - Hero Section tem apenas o botão "Fazer Candidatura"

2. **✅ Sistema de email configurado**
   - nodemailer instalado
   - Biblioteca de email criada (`src/lib/email.ts`)
   - API atualizada para enviar emails
   - Template de email HTML profissional

---

## 📧 Como Configurar o Email no Hostinger

### Passo 1: Obter Credenciais SMTP

1. Acesse o **hPanel** da Hostinger
2. Vá em **Emails** → **Gerenciar**
3. Crie um email (ex: `candidaturas@seu-dominio.com`)
4. Clique no email e vá em **Configurações de Email**
5. Copie as credenciais:
   - **Servidor SMTP:** `smtp.hostinger.com`
   - **Porta:** `587` (TLS) ou `465` (SSL)
   - **Usuário:** seu email completo
   - **Senha:** senha do email

### Passo 2: Criar/Editar Arquivo .env

Crie o arquivo `.env` na raiz do projeto:

```bash
nano .env
```

Adicione estas configurações:

```env
# Configuração SMTP Hostinger
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=candidaturas@seu-dominio.com
SMTP_PASS=SuaSenhaEmailAqui

# Email que receberá as notificações
NOTIFICATION_EMAIL=seu-email@seu-dominio.com

# URL do seu site (para links de currículo)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Apenas para desenvolvimento (remova em produção)
NODE_TLS_REJECT_UNAUTHORIZED=0
```

**Substitua os valores pelos seus dados reais!**

### Passo 3: Reiniciar o Servidor

```bash
# Pare o servidor (Ctrl+C)
# Reinicie
bun run dev
```

### Passo 4: Testar

1. Faça uma candidatura no formulário
2. Verifique seu email
3. Você deve receber um email com:
   - Todas as informações do candidato
   - Link para baixar o currículo (se anexado)
   - Design HTML profissional com cores da SOFTEC

---

## 📧 O Que o Email Contém

### Assunto:
```
Nova Candidatura - [Serviço] - [Nome]
Exemplo: Nova Candidatura - Frota TVDE - João Silva
```

### Corpo do Email:
- ✅ Nome do candidato
- ✅ Email (com link para responder)
- ✅ Telefone
- ✅ Serviço de interesse
- ✅ Experiência prévia (se fornecida)
- ✅ Mensagem adicional (se fornecida)
- ✅ Link para baixar currículo (se anexado)
- ✅ Data/hora de envio

### Design:
- 🎨 Cores da SOFTEC (verde #16a34a)
- 📱 Layout responsivo
- 📄 Versão HTML + texto plano

---

## 🔧 Solução de Problemas

### Email não chega:

**1. Verifique se o .env foi criado:**
```bash
ls -la .env
cat .env
```

**2. Verifique as credenciais:**
- SMTP_USER deve ser o email completo
- SMTP_PASS deve ser a senha correta
- NOTIFICATION_EMAIL deve ser o email que vai receber

**3. Verifique os logs:**
```bash
tail -f dev.log
```
Procure por:
- ✅ "Email de notificação enviado com sucesso"
- ⚠️ "Erro ao enviar email"

**4. Teste SMTP manualmente:**
- Use um cliente de email (Outlook, Thunderbird)
- Configure com as mesmas credenciais
- Tente enviar um email

### Erro "Self-signed certificate":

Adicione ao `.env` (apenas desenvolvimento):
```env
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### Erro "Too many emails":

O plano gratuito da Hostinger tem limite de 100 emails/dia.

**Soluções:**
- Aguardar 24h para resetar
- Fazer upgrade do plano
- Usar SendGrid ou Mailgun (mais emails grátis)

---

## 📊 Estrutura do Sistema

```
Sistema de Candidaturas
├── Frontend (Formulário)
│   └── Envia dados + arquivo para API
├── API (/api/candidaturas)
│   ├── Valida dados
│   ├── Salva arquivo no servidor
│   ├── Salva dados no banco
│   └── Envia email de notificação
└── Email (SMTP Hostinger)
    └── Envia notificação para você
```

---

## 📱 Em Produção (Deploy na Hostinger)

Quando fazer deploy:

1. **Configure as variáveis de ambiente:**
   - No painel da Hostinger
   - Em "Variáveis de Ambiente"
   - Adicione todas as variáveis do `.env`

2. **NÃO inclua:**
   ```env
   NODE_TLS_REJECT_UNAUTHORIZED=0  # Remova esta linha em produção!
   ```

3. **URL do site:**
   ```env
   NEXT_PUBLIC_APP_URL=https://www.seu-dominio.com
   ```

4. **Teste após o deploy:**
   - Faça uma candidatura de teste
   - Verifique se o email chegou

---

## 📚 Arquivos Criados

1. **`src/lib/email.ts`** - Biblioteca de envio de email
2. **`CONFIGURACAO-EMAIL.md`** - Documentação completa
3. **`.env.example`** - Exemplo de configuração
4. **`src/app/api/candidaturas/route.ts`** - API atualizada

---

## ✅ Checklist de Configuração

- [ ] Criar email no Hostinger
- [ ] Obter credenciais SMTP
- [ ] Criar arquivo `.env`
- [ ] Configurar SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
- [ ] Configurar NOTIFICATION_EMAIL
- [ ] Configurar NEXT_PUBLIC_APP_URL
- [ ] Reiniciar servidor
- [ ] Fazer teste de candidatura
- [ ] Verificar se email chegou
- [ ] Verificar se link do currículo funciona

---

## 💡 Dicas Importantes

1. **Use um email dedicado para candidaturas**
   - Não use seu email pessoal
   - Exemplo: `candidaturas@softec.com`

2. **Senhas de aplicação são mais seguras**
   - Crie no painel do Hostinger
   - Mais seguro que a senha do email

3. **Monitore os limites do plano**
   - Plano Free: 100 emails/dia
   - Plano Premium: mais emails

4. **Arquivos de currículo**
   - São salvos em `/public/uploads/curriculos/`
   - Links no email funcionam corretamente

---

**Pronto! O sistema está configurado e pronto para receber candidaturas por email! 🎉**

Se precisar de ajuda, consulte o arquivo `CONFIGURACAO-EMAIL.md` para mais detalhes.
