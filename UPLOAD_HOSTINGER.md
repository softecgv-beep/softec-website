# 📤 UPLOAD NA HOSTINGER - Guia Simples

## PASSO 1: Criar Banco de Dados no phpMyAdmin

1. Acesse o **hPanel** da Hostinger
2. Vá em **Databases** > **MySQL Databases**
3. Crie um novo banco:
   - Database name: `softec_db` (ou outro nome de sua escolha)
   - Username: `softec_user` (ou outro)
   - Password: (crie uma senha forte)
4. Clique em **Create**

5. Depois, clique em **Manage** no banco criado (abre o phpMyAdmin)

6. No phpMyAdmin:
   - Selecione o banco criado na lateral esquerda
   - Clique na aba **SQL**
   - Copie e cole todo o conteúdo do arquivo `database-setup.sql`
   - Clique em **Go/Executar**

✅ **Banco de dados criado e configurado!**

---

## PASSO 2: Fazer Upload dos Arquivos

### Arquivos para fazer upload (via File Manager):

**1. Arquivos na raiz (pasta public_html ou subdomínio):**
```
✅ .env.production (criar com seus dados)
✅ .htaccess
✅ next.config.ts
✅ package.json
✅ package-lock.json
✅ tsconfig.json
```

**2. Pastas completas:**
```
✅ prisma/ (toda a pasta)
✅ src/ (toda a pasta)
✅ public/ (toda a pasta)
```

**NÃO fazer upload:**
```
❌ node_modules/ (vamos instalar no servidor)
❌ .next/ (vamos criar no servidor)
❌ db/ (não precisa, vamos usar MySQL)
❌ .env ou .env.local (apenas .env.production)
```

---

## PASSO 3: Criar arquivo .env.production

No File Manager, crie o arquivo `.env.production` na raiz com:

```bash
# BANCO DE DADOS - Substitua pelos seus dados!
DATABASE_URL="mysql://usuario_banco:senha@localhost:3306/nome_banco"

# EMAIL SMTP - Substitua pelos seus dados!
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@seu-dominio.com
SMTP_PASS=sua_senha_email
NOTIFICATION_EMAIL=seu-email@seu-dominio.com

# URL DO SITE
NEXT_PUBLIC_APP_URL=https://seu-dominio.com

NODE_ENV=production
NODE_TLS_REJECT_UNAUTHORIZED=0
```

**Onde pegar os dados do banco:**
- Vá em hPanel > Databases > MySQL Databases
- Use os dados mostrados lá

**Onde pegar os dados do email:**
- Crie um email em hPanel > Emails > Create Email Account
- Use esse email e senha acima

---

## PASSO 4: Comandos para rodar no servidor

Acesse o **Terminal** no hPanel (ou via SSH) e rode estes comandos:

```bash
# 1. Ir para a pasta do site
cd public_html

# 2. Instalar dependências
npm install

# 3. Substituir schema pelo do MySQL
mv prisma/schema-mysql.prisma prisma/schema.prisma

# 4. Instalar cliente MySQL do Prisma
npm install @prisma/adapter-mysql

# 5. Gerar Prisma Client
npx prisma generate

# 6. Criar pasta para uploads
mkdir -p public/uploads/curriculos
chmod 755 public/uploads

# 7. Testar conexão com o banco
npx prisma db pull

# 8. Iniciar a aplicação
npm start
```

**Se quiser rodar em background (recomendado):**

```bash
# 1. Instalar PM2
npm install -g pm2

# 2. Iniciar com PM2
pm2 start npm --name "softec" -- start

# 3. Salvar configuração
pm2 save

# 4. Configurar para iniciar automaticamente
pm2 startup
```

---

## PASSO 5: Verificar se funcionou

1. Acesse seu domínio: `https://seu-dominio.com`
2. Teste o formulário de candidaturas
3. Verifique se recebe o email

---

## COMANDOS ÚTEIS

### Verificar logs da aplicação:
```bash
pm2 logs softec
```

### Reiniciar a aplicação:
```bash
pm2 restart softec
```

### Parar a aplicação:
```bash
pm2 stop softec
```

### Verificar status:
```bash
pm2 status
```

### Atualizar o site:
```bash
# Faça upload dos arquivos atualizados
cd public_html
npm install
npm run build
pm2 restart softec
```

---

## ESTRUTURA FINAL NO SERVIDOR

```
public_html/
├── .env.production          ← CRIAR ESTE
├── .htaccess
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── prisma/
│   ├── schema.prisma       ← (vai ser o schema-mysql.prisma renomeado)
│   └── schema-mysql.prisma
├── src/
│   └── app/
│       ├── page.tsx
│       ├── layout.tsx
│       └── api/
│           └── candidaturas/
│               └── route.ts
├── public/
│   ├── uploads/
│   │   └── curriculos/
│   └── (imagens e arquivos estáticos)
├── node_modules/           ← Criado pelo npm install
└── .next/                  ← Criado pelo npm run build
```

---

## SOLUÇÃO DE PROBLEMAS

### Erro: Cannot connect to database
```bash
# Verifique se DATABASE_URL está correto no .env.production
# Teste conexão:
npx prisma db pull
```

### Erro: Module not found
```bash
# Reinstale dependências:
cd public_html
rm -rf node_modules package-lock.json
npm install
```

### Upload de arquivos não funciona
```bash
# Verifique permissões:
chmod -R 755 public/uploads
mkdir -p public/uploads/curriculos
```

### Site não carrega (erro 500)
```bash
# Verifique logs:
pm2 logs softec

# Ou veja o log de erro:
tail -f ~/domains/seu-dominio.com/logs/error.log
```

---

## RESUMO RÁPIDO

1. ✅ Criar banco no hPanel
2. ✅ Rodar script SQL no phpMyAdmin
3. ✅ Upload dos arquivos (File Manager)
4. ✅ Criar .env.production com seus dados
5. ✅ Rodar comandos no Terminal:
   ```bash
   cd public_html
   npm install
   mv prisma/schema-mysql.prisma prisma/schema.prisma
   npm install @prisma/adapter-mysql
   npx prisma generate
   mkdir -p public/uploads/curriculos
   chmod 755 public/uploads
   pm2 start npm --name "softec" -- start
   pm2 save
   pm2 startup
   ```

6. ✅ Acessar site: `https://seu-dominio.com`

---

🎉 **PRONTO! Seu site SOFTEC está no ar!**
