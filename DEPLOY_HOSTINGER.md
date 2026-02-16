# Guia Completo de Deploy - SOFTEC na Hostinger

## 📋 Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Preparação do Projeto](#preparação-do-projeto)
3. [Opção 1: Deploy via SSH/Git (Recomendado)](#opção-1-deploy-via-sshgit-recomendado)
4. [Opção 2: Deploy via FTP](#opção-2-deploy-via-ftp)
5. [Configuração de Ambiente](#configuração-de-ambiente)
6. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
7. [Configuração do Email SMTP](#configuração-do-email-smtp)
8. [Configuração de Domínio e SSL](#configuração-de-domínio-e-ssl)
9. [Testes Finais](#testes-finais)
10. [Manutenção](#manutenção)

---

## 🚀 Pré-requisitos

Antes de começar, você precisará de:

- ✅ Conta na Hostinger com plano que suporte Node.js (plano Premium ou superior)
- ✅ Acesso ao painel hPanel
- ✅ SSH ativado na sua conta (para opção 1)
- ✅ Cliente FTP (FileZilla, WinSCP, etc.) - para opção 2
- ✅ Git instalado no seu computador local

---

## 📦 Preparação do Projeto

### 1. Verificar arquivos do projeto

No seu computador local, verifique se todos os arquivos estão presentes:

```bash
cd /home/z/my-project
ls -la
```

Arquivos importantes que devem existir:
- `package.json`
- `next.config.ts` ou `next.config.js`
- `tsconfig.json`
- `prisma/schema.prisma`
- `.gitignore`
- Pasta `src/app/`
- Pasta `public/`

### 2. Atualizar package.json com scripts de produção

Verifique se seu `package.json` tem estes scripts:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:generate": "prisma generate"
  }
}
```

### 3. Criar arquivo de build do Prisma (Production)

No ambiente de produção, precisamos usar um banco de dados mais robusto. Vamos preparar para usar PostgreSQL ou MySQL da Hostinger.

Crie um arquivo `prisma/schema-prod.prisma` (se quiser usar um banco diferente):

```prisma
// Se usar PostgreSQL (recomendado para produção)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Se usar MySQL (disponível na Hostinger)
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Resto dos models permanece igual...
```

### 4. Verificar .gitignore

Certifique-se de que seu `.gitignore` inclui:

```
node_modules/
.next/
.env
.env.local
.env.production
*.log
db/*.db
db/*.db-journal
public/uploads/*
!public/uploads/.gitkeep
```

---

## 🌐 Opção 1: Deploy via SSH/Git (Recomendado)

Esta é a opção mais profissional e fácil de manter.

### Passo 1: Configurar Git no projeto local

```bash
cd /home/z/my-project
git init
git add .
git commit -m "Commit inicial do projeto SOFTEC"
```

### Passo 2: Criar repositório no painel Hostinger

1. Acesse o **hPanel** da Hostinger
2. Vá em **Git** > **Create Repository**
3. Configure:
   - **Repository name**: softec-website
   - **Branch**: main
   - **Public/Private**: conforme preferir
4. Clique em **Create**

### Passo 3: Conectar repositório local ao remoto

No seu terminal local:

```bash
# Adicione o remote (substitua pela URL do seu repositório Git da Hostinger)
git remote add origin https://git.hostinger.com/seu-usuario/softec-website.git

# Fazer push
git branch -M main
git push -u origin main
```

### Passo 4: Configurar deploy automático

1. No hPanel, vá no repositório Git criado
2. Clique em **Deploy Settings**
3. Configure:
   - **Deployment Path**: `/public_html` (ou subdomínio se preferir)
   - **Node.js Version**: 20.x ou 22.x (mais recente estável)
   - **Install Command**: `npm install`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
4. Clique em **Save Changes**

### Passo 5: Criar arquivo de configuração do servidor

Crie o arquivo `.htaccess` na raiz do projeto (ou será criado automaticamente):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Passo 6: Criar `package.json` específico para produção

Se necessário, ajuste o `package.json`:

```json
{
  "name": "softec-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    // suas dependências
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

---

## 📤 Opção 2: Deploy via FTP

Se preferir usar FTP manualmente:

### Passo 1: Build do projeto

No seu computador local:

```bash
cd /home/z/my-project
npm install
npm run build
```

### Passo 2: Preparar arquivos para upload

Você precisa fazer upload de:

**Arquivos obrigatórios:**
- `package.json`
- `package-lock.json`
- `next.config.ts` ou `next.config.js`
- `tsconfig.json`
- `prisma/schema.prisma`
- Pasta `src/` (completa)
- Pasta `public/` (completa, EXCETO uploads de desenvolvimento)
- Pasta `.next/` (após o build)
- Pasta `node_modules/` (se não quiser instalar no servidor)
- Arquivos de configuração (`.htaccess`, etc.)

### Passo 3: Conectar via FTP

1. Abra seu cliente FTP (FileZilla, por exemplo)
2. Configure:
   - Host: seu-domínio.com ou IP do servidor
   - Usuário: seu usuário FTP
   - Senha: sua senha FTP
   - Porta: 21

### Passo 4: Upload dos arquivos

1. Navegue até a pasta `public_html` no servidor
2. Faça upload de todos os arquivos listados acima

**Dica:** Se possível, faça upload sem a pasta `node_modules` e instale no servidor para economizar tempo e espaço.

### Passo 5: Instalar dependências no servidor

Via SSH ou Terminal do hPanel:

```bash
cd public_html
npm install --production
npm run build
```

---

## 🔧 Configuração de Ambiente

### Criar arquivo `.env.production` na Hostinger

Via hPanel > File Manager > `public_html`:

```bash
# Banco de Dados (use as credenciais do seu banco Hostinger)
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_banco"

# Ou se usar MySQL:
# DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_banco"

# Email SMTP (Hostinger)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@seu-dominio.com
SMTP_PASS=sua-senha-de-email
NOTIFICATION_EMAIL=seu-email@seu-dominio.com

# URL do site
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
NODE_ENV=production

# Aceitar certificados SSL autoassinados (se necessário)
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### Obter credenciais do banco de dados na Hostinger

1. Acesse hPanel > **Databases** > **MySQL Databases** ou **PostgreSQL**
2. Crie um novo banco de dados
3. Anote:
   - Database name
   - Username
   - Password
   - Host (geralmente `localhost`)

---

## 🗄️ Configuração do Banco de Dados

### Opção 1: Usar PostgreSQL (Recomendado)

1. No hPanel, crie um banco PostgreSQL
2. Use a URL de conexão no `.env.production`
3. No servidor, rode:

```bash
cd public_html
npx prisma generate
npx prisma db push
```

### Opção 2: Usar MySQL

1. No hPanel, crie um banco MySQL
2. Atualize `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

3. No servidor:

```bash
cd public_html
npx prisma generate
npx prisma db push
```

### Opção 3: Continuar com SQLite (Para sites simples)

Se quiser continuar com SQLite, precisa configurar o caminho absoluto:

No `.env.production`:
```
DATABASE_URL="file:/home/seu-usuario/domains/seu-dominio.com/public_html/db/softec.db"
```

E criar a pasta `db/` com permissões de escrita:

```bash
mkdir -p public_html/db
chmod 755 public_html/db
```

---

## 📧 Configuração do Email SMTP

### Criar conta de email na Hostinger

1. hPanel > **Emails** > **Create Email Account**
2. Configure:
   - Email: contato@seu-dominio.com (ou similar)
   - Password: crie uma senha forte
3. Clique em **Create**

### Testar configuração SMTP

Use as credenciais criadas no seu `.env.production`:

```bash
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contato@seu-dominio.com
SMTP_PASS=sua-senha-criada
NOTIFICATION_EMAIL=contato@seu-dominio.com
```

### Permitir envio de emails na Hostinger

1. hPanel > **Emails** > **Email Deliverability**
2. Verifique se não há restrições
3. Configure DKIM e SPF se necessário

---

## 🌍 Configuração de Domínio e SSL

### Configurar domínio

1. Se você já tem domínio na Hostinger:
   - hPanel > **Domains**
   - Verifique se está apontando para a pasta `public_html`

2. Se o domínio está em outro provedor:
   - Ajuste os DNS para apontar para os nameservers da Hostinger:
     - `ns1.hostinger.com`
     - `ns2.hostinger.com`

### Ativar SSL gratuito (Let's Encrypt)

1. hPanel > **SSL** > **Get SSL Certificate**
2. Selecione seu domínio
3. Clique em **Get SSL**
4. Ative **Force HTTPS**

### Configurar redirecionamento HTTPS

No `.htaccess` (ou via hPanel > Redirects):

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## ✅ Testes Finais

### 1. Verificar se o site está rodando

Acesse: `https://seu-dominio.com`

Deve ver o site SOFTEC completo!

### 2. Testar formulário de candidaturas

1. Preencha o formulário com dados de teste
2. Faça upload de um currículo
3. Verifique se:
   - ✅ Formulário envia sem erros
   - ✅ Toast de sucesso aparece
   - ✅ Email de notificação é recebido

### 3. Verificar banco de dados

Via SSH ou phpMyAdmin:

```bash
# Conecte-se ao servidor
ssh usuario@seu-dominio.com

# Acesse o diretório do projeto
cd domains/seu-dominio.com/public_html

# Entre no console do Prisma
npx prisma studio
# Ou use queries SQL diretas
```

Verifique se as tabelas foram criadas:
- ✅ `User`
- ✅ `SiteContent`
- ✅ `Service`
- ✅ `ContactMessage`
- ✅ `Candidatura`

### 4. Testar upload de arquivos

1. Tente enviar uma candidatura com currículo
2. Verifique se o arquivo foi salvo em `public/uploads/curriculos/`
3. Configure permissões se necessário:

```bash
chmod -R 755 public/uploads
chown -R usuario:usuario public/uploads
```

### 5. Testar responsividade

Acesse o site em:
- Desktop
- Tablet
- Smartphone (use ferramentas de desenvolvedor ou dispostivos reais)

---

## 🔄 Manutenção

### Atualizar o site

**Via Git:**
```bash
# No computador local
git add .
git commit -m "Atualização do site"
git push

# O deploy é automático na Hostinger!
```

**Via FTP:**
1. Faça as alterações localmente
2. Rode `npm run build`
3. Faça upload dos arquivos alterados

### Fazer backup do banco de dados

**Automático na Hostinger:**
1. hPanel > **Backups** > **Create Backup**

**Manual via SSH:**
```bash
mysqldump -u usuario -p nome_banco > backup.sql
# Ou
pg_dump nome_banco > backup.sql
```

### Verificar logs

```bash
# Logs da aplicação
tail -f domains/seu-dominio.com/logs/error.log

# Logs do Node.js
pm2 logs
```

### Atualizar dependências

```bash
cd domains/seu-dominio.com/public_html
npm update
npm run build
pm2 restart all
```

---

## 🚨 Solução de Problemas Comuns

### Site não carrega (500 Internal Server Error)

1. Verifique os logs de erro
2. Certifique-se de que todas as dependências estão instaladas
3. Verifique se o `npm run build` foi executado
4. Verifique as variáveis de ambiente no `.env.production`

### Formulário não envia

1. Verifique se a API está funcionando:
   ```bash
   curl -X POST https://seu-dominio.com/api/candidaturas
   ```

2. Verifique permissões da pasta `public/uploads/`

3. Teste configuração SMTP

### Banco de dados não conecta

1. Verifique credenciais no `.env.production`
2. Teste conexão direta:
   ```bash
   mysql -u usuario -p -h localhost nome_banco
   ```

3. Verifique se o Prisma Client foi gerado:
   ```bash
   npx prisma generate
   ```

### Upload de arquivos não funciona

1. Verifique permissões:
   ```bash
   chmod -R 755 public/uploads
   ```

2. Verifique se a pasta existe:
   ```bash
   mkdir -p public/uploads/curriculos
   ```

3. Ajuste tamanho máximo no `next.config.ts`:
   ```typescript
   export default {
     experimental: {
       serverActions: {
         bodySizeLimit: '5mb',
       },
     },
   }
   ```

---

## 📞 Suporte Hostinger

Se precisar de ajuda:

- 📧 Email: support@hostinger.com
- 💬 Chat: Disponível no hPanel
- 📚 Knowledge Base: https://support.hostinger.com
- 🎥 Tutoriais: https://www.youtube.com/@Hostinger

---

## ✨ Checklist Final

Antes de considerar o deploy concluído:

- [ ] Site está acessível via HTTPS
- [ ] Todas as páginas carregam corretamente
- [ ] Formulário de candidaturas funciona
- [ ] Upload de currículo funciona
- [ ] Emails são enviados/recebidos
- [ ] Banco de dados está configurado
- [ ] Página de admin funciona (se necessário)
- [ ] Site é responsivo em mobile
- [ ] SSL está ativo
- [ ] Backups automáticos configurados

Parabéns! 🎉 Seu site SOFTEC está no ar!

---

**Documentação criada em:** 2024
**Versão do projeto:** 1.0.0
**Framework:** Next.js 16
**Banco de Dados:** Prisma ORM
**Hospedagem:** Hostinger
