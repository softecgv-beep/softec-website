# 🚀 Deploy Rápido - SOFTEC na Hostinger

## Opção 1: Deploy Automático via Git (RECOMENDADO)

### Passo 1: Configurar Git no projeto
```bash
cd /home/z/my-project
git init
git add .
git commit -m "Deploy inicial SOFTEC"
```

### Passo 2: Criar repositório na Hostinger
1. Acesse **hPanel** > **Git**
2. Clique em **Create Repository**
3. Nome: `softec-website`
4. Branch: `main`
5. Clique em **Create**

### Passo 3: Conectar e fazer push
```bash
# Copie a URL do repositório criado
git remote add origin https://git.hostinger.com/SEU-USUARIO/softec-website.git
git branch -M main
git push -u origin main
```

### Passo 4: Configurar Deploy Settings
1. No repositório Git da Hostinger, clique em **Deploy Settings**
2. Configure:
   - **Deployment Path**: `/public_html`
   - **Node.js Version**: `20.x` (ou mais recente)
   - **Install Command**: `npm install`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
3. Clique em **Save Changes**

### Passo 5: Configurar Variáveis de Ambiente
1. No hPanel, vá em **File Manager** > `public_html`
2. Crie o arquivo `.env.production` com o conteúdo de `.env.production.example`
3. Substitua pelos seus dados reais:
   - `DATABASE_URL`: credenciais do banco PostgreSQL/MySQL
   - `SMTP_*`: credenciais do email
   - `NEXT_PUBLIC_APP_URL`: seu domínio

### Passo 6: Configurar Banco de Dados
1. hPanel > **Databases** > **PostgreSQL** (ou MySQL)
2. Crie um novo banco
3. No servidor (via SSH ou Terminal), rode:
   ```bash
   cd public_html
   npx prisma generate
   npx prisma db push
   ```

### Passo 7: Criar pasta de uploads
```bash
mkdir -p public/uploads/curriculos
chmod 755 public/uploads
```

✅ **Pronto!** Seu site estará online em `https://seu-dominio.com`

---

## Opção 2: Deploy Manual via FTP

### Passo 1: Build local
```bash
cd /home/z/my-project
npm install
npm run build
```

### Passo 2: Preparar arquivos
Use o script de preparação (se permitido):
```bash
./prepare-deploy.sh
```

Ou manualmente, prepare estes arquivos para upload:
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `.htaccess`
- `prisma/schema.prisma`
- Pasta `src/`
- Pasta `public/`
- Pasta `.next/`
- Pasta `prisma/`

### Passo 3: Conectar via FTP
1. Use FileZilla ou outro cliente FTP
2. Host: seu-dominio.com
3. Usuário: seu usuário FTP
4. Senha: sua senha FTP
5. Porta: 21

### Passo 4: Upload
1. Navegue até `public_html` no servidor
2. Faça upload dos arquivos (NÃO inclua `node_modules/`)

### Passo 5: Instalar no servidor
Via SSH ou Terminal do hPanel:
```bash
cd public_html
npm install --production
npm run build
npx prisma generate
npx prisma db push
```

### Passo 6: Configurar ambiente
Crie `.env.production` com as variáveis do `.env.production.example`

### Passo 7: Criar pasta de uploads
```bash
mkdir -p public/uploads/curriculos
chmod 755 public/uploads
```

### Passo 8: Iniciar aplicação
```bash
npm start
```

Ou configure PM2 para rodar em background:
```bash
npm install -g pm2
pm2 start npm --name "softec" -- start
pm2 save
pm2 startup
```

✅ **Pronto!** Acesse `https://seu-dominio.com`

---

## 🔧 Credenciais Necessárias

### Banco de Dados (hPanel > Databases)
- Database Name: `seu_banco`
- Username: `seu_usuario`
- Password: `sua_senha`
- Host: `localhost`

### Email (hPanel > Emails)
- Email: `contato@seu-dominio.com`
- Password: `senha_email`

### Exemplo de .env.production
```bash
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/seu_banco"
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contato@seu-dominio.com
SMTP_PASS=sua_senha_de_email
NOTIFICATION_EMAIL=contato@seu-dominio.com
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
NODE_ENV=production
NODE_TLS_REJECT_UNAUTHORIZED=0
```

---

## ✅ Checklist de Deploy

- [ ] Conta Hostinger ativa
- [ ] Domínio configurado
- [ ] Banco de dados criado (PostgreSQL ou MySQL)
- [ ] Email criado no hPanel
- [ ] Arquivos enviados (Git ou FTP)
- [ ] `.env.production` configurado
- [ ] Dependências instaladas no servidor
- [ ] Build executado com sucesso
- [ ] Prisma Client gerado
- [ ] Banco de dados inicializado (`prisma db push`)
- [ ] Pasta `public/uploads/` criada com permissões
- [ ] Aplicação rodando (`npm start` ou PM2)
- [ ] SSL/HTTPS ativo
- [ ] Site acessível pelo domínio

---

## 🐛 Solução de Problemas

### Erro 500
```bash
# Verificar logs
tail -f domains/seu-dominio.com/logs/error.log

# Reinstalar dependências
cd public_html
rm -rf node_modules .next
npm install
npm run build
```

### Banco não conecta
```bash
# Testar conexão
npx prisma db push

# Regenerar Prisma Client
npx prisma generate
```

### Upload não funciona
```bash
# Verificar permissões
chmod -R 755 public/uploads
mkdir -p public/uploads/curriculos
```

---

## 📞 Suporte

- Hostinger Support: https://support.hostinger.com
- Documentação Next.js: https://nextjs.org/docs
- Documentação Prisma: https://www.prisma.io/docs

---

🎉 **Boa sorte com o deploy!**
