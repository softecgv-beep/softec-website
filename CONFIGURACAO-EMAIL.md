# Configuração de Email - Hostinger

## 📧 Configuração SMTP do Hostinger

### Passo 1: Obter Credenciais SMTP no Hostinger

1. Acesse o painel do Hostinger (hPanel)
2. Vá para **Emails** → **Gerenciar**
3. Crie um email ou use um existente (ex: candidaturas@seu-dominio.com)
4. Clique no email e vá para **Configurações de Email**
5. Anote as seguintes informações:

   - **Servidor SMTP:** smtp.hostinger.com
   - **Porta:** 587 (TLS) ou 465 (SSL)
   - **Usuário:** email completo (ex: candidaturas@seu-dominio.com)
   - **Senha:** senha do email ou senha de aplicação

### Passo 2: Configurar Variáveis de Ambiente

Crie ou edite o arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configuração SMTP Hostinger
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=candidaturas@seu-dominio.com
SMTP_PASS=sua-senha-de-email-aqui

# Email que receberá as notificações
NOTIFICATION_EMAIL=seu-email@seu-dominio.com

# URL do seu site (para links de currículo)
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
```

### Passo 3: Detalhes das Configurações

#### Para TLS (Recomendado):
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### Para SSL:
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
```

### Passo 4: Testar a Configuração

Depois de configurar as variáveis de ambiente, reinicie o servidor:

```bash
bun run dev
```

Faça uma candidatura de teste e verifique:
1. Se o email foi recebido na conta configurada
2. Se o email contém todas as informações
3. Se o link do currículo funciona

---

## 🔒 Dicas de Segurança

### 1. Use Senha de Aplicação (Recomendado)
- Em vez da senha do email, crie uma "senha de aplicação" no painel do Hostinger
- Isso é mais seguro e evita bloqueios

### 2. Não Compartilhe o .env
- O arquivo `.env` contém senhas
- Adicione ao `.gitignore` se não estiver lá
- Nunca faça commit do `.env` no git

### 3. Use Email Dedicado
- Crie um email específico para receber candidaturas
- Não use seu email pessoal

### 4. Verifique Limites do Hostinger
- Plano Free: 100 emails por dia
- Plano Premium: 500+ emails por dia
- Se precisar de mais, considere um serviço como SendGrid ou Mailgun

---

## 🐛 Solução de Problemas

### Email não está sendo enviado:

1. **Verifique as variáveis de ambiente:**
   ```bash
   echo $SMTP_HOST
   echo $SMTP_USER
   ```

2. **Verifique os logs do servidor:**
   ```bash
   tail -f dev.log
   ```

3. **Teste a conexão SMTP manualmente:**
   - Use um cliente de email (Outlook, Thunderbird)
   - Configure com as mesmas credenciais
   - Tente enviar um email

4. **Verifique se o Hostinger está bloqueando:**
   - Alguns planos gratuitos podem ter limitações
   - Verifique o painel do Hostinger para ver estatísticas

### Erro: "Self-signed certificate"

Adicione ao `.env`:
```env
NODE_TLS_REJECT_UNAUTHORIZED=0
```

**⚠️ Aviso:** Isso reduz a segurança, use apenas em desenvolvimento!

### Erro: "Too many emails"

- Você excedeu o limite diário do Hostinger
- Considere:
  - Usar um serviço de email profissional (SendGrid, Mailgun)
  - Fazer upgrade do plano Hostinger
  - Implementar fila de emails

---

## 📧 Estrutura do Email Recebido

O email enviado conterá:

1. **Assunto:** "Nova Candidatura - [Serviço] - [Nome]"
   - Exemplo: "Nova Candidatura - Frota TVDE - João Silva"

2. **Corpo do Email:**
   - Nome do candidato
   - Email (com link para responder)
   - Telefone
   - Serviço de interesse
   - Experiência prévia (se fornecida)
   - Mensagem adicional (se fornecida)
   - Link para baixar o currículo (se anexado)
   - Data/hora de envio

3. **Design:**
   - HTML formatado com cores da SOFTEC (verde e branco)
   - Responsivo para mobile
   - Versão texto plano incluída

---

## 🔄 Como Alterar o Design do Email

O template está em `src/lib/email.ts`. Você pode personalizar:

- Cores (atualmente verde #16a34a)
- Layout HTML
- Informações incluídas
- Textos e mensagens

---

## 📊 Monitoramento

Para ver estatísticas de envio de emails, use o painel do Hostinger:

1. Acesse **Emails** → **Gerenciar**
2. Clique no email usado para envio
3. Verifique:
   - Emails enviados
   - Emails recebidos
   - Espaço usado
   - Taxa de entrega

---

## 🚀 Deploy em Produção

Ao fazer deploy na Hostinger:

1. **Configure as variáveis de ambiente:**
   - No painel da Hostinger
   - Em "Variáveis de Ambiente"
   - Adicione todas as variáveis listadas acima

2. **Verifique o arquivo `.env`:**
   - Não deve ser commitado no git
   - Configure no ambiente de produção separadamente

3. **Teste após o deploy:**
   - Faça uma candidatura de teste
   - Verifique se o email chegou
   - Verifique os links de currículo

---

## 📝 Exemplo Completo de .env

```env
# Configuração SMTP Hostinger
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=candidaturas@softec.com
SMTP_PASS=SuaSenhaSegura123!

# Email que receberá as notificações
NOTIFICATION_EMAIL=contato@softec.com

# URL do site (para links de currículo)
NEXT_PUBLIC_APP_URL=https://www.softec.com

# Desenvolvimento apenas (NÃO usar em produção)
NODE_TLS_REJECT_UNAUTHORIZED=0
```

---

**Última atualização:** 2024-02-15
