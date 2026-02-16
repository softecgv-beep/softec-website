# SOFTEC - Website Oficial

Site oficial da SOFTEC - Soluções Tecnológicas e Gestão de Frotas

**URL:** https://www.softecgv.pt

## 🌟 Sobre

A SOFTEC é uma empresa especializada em:
- Gestão de frotas TVDE
- Estafetas de delivery
- Encomendas express
- Vendas por licitação
- Assistência técnica
- Serviços gráficos
- Relocation de veículos

**Fundada em 2020** - Governador Valadares, Brasil
**Expansão em 2024** - Porto, Portugal

## 🚀 Tecnologias

- **Framework:** Next.js 16
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Componentes:** shadcn/ui
- **Banco de Dados:** MySQL (Hostinger) / PlanetScale
- **Email:** Nodemailer (Hostinger SMTP)
- **Deploy:** Vercel

## 📦 Instalação Local

```bash
# Clonar repositório
git clone https://github.com/SEU-USUARIO/softec-website.git
cd softec-website

# Instalar dependências
npm install --legacy-peer-deps

# Configurar variáveis de ambiente
cp .env.example .env.local

# Rodar em desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## 🔧 Variáveis de Ambiente

```bash
DATABASE_URL="mysql://usuario:senha@host:porta/banco"
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER="seu-email@softecgv.pt"
SMTP_PASS="sua-senha"
NOTIFICATION_EMAIL="seu-email@softecgv.pt"
NEXT_PUBLIC_APP_URL="https://www.softecgv.pt"
NODE_ENV="production"
```

## 🗄️ Banco de Dados

Para configurar o banco de dados:

1. Crie um banco MySQL ou use PlanetScale
2. Execute o script `database-setup.sql`
3. Configure a variável `DATABASE_URL`

## 📄 Licença

© 2024 SOFTEC. Todos os direitos reservados.

---

**Contato:** contato@softecgv.pt
**Site:** https://www.softecgv.pt
