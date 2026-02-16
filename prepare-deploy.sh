#!/bin/bash

# ========================================
# SCRIPT DE PREPARAÇÃO PARA DEPLOY
# SOFTEC - Hostinger
# ========================================

echo "🚀 Iniciando preparação para deploy..."
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: package.json não encontrado!${NC}"
    echo "Execute este script na raiz do projeto."
    exit 1
fi

echo -e "${GREEN}✓ Diretório correto identificado${NC}"

# 1. Limpar build anterior
echo ""
echo "📦 Limpando builds anteriores..."
rm -rf .next
rm -rf node_modules/.cache
echo -e "${GREEN}✓ Build anterior limpo${NC}"

# 2. Instalar dependências
echo ""
echo "📥 Instalando dependências..."
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependências instaladas${NC}"
else
    echo -e "${RED}❌ Erro ao instalar dependências${NC}"
    exit 1
fi

# 3. Build do projeto
echo ""
echo "🔨 Fazendo build do projeto..."
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build concluído com sucesso${NC}"
else
    echo -e "${RED}❌ Erro no build${NC}"
    exit 1
fi

# 4. Verificar pastas necessárias
echo ""
echo "📁 Verificando pastas necessárias..."
mkdir -p public/uploads/curriculos
mkdir -p db
touch public/uploads/.gitkeep
echo -e "${GREEN}✓ Pastas criadas/verificadas${NC}"

# 5. Gerar Prisma Client
echo ""
echo "🗄️ Gerando Prisma Client..."
npx prisma generate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Prisma Client gerado${NC}"
else
    echo -e "${RED}❌ Erro ao gerar Prisma Client${NC}"
    exit 1
fi

# 6. Verificar arquivos críticos
echo ""
echo "🔍 Verificando arquivos críticos..."
critical_files=(
    "package.json"
    "next.config.ts"
    "tsconfig.json"
    "prisma/schema.prisma"
    ".htaccess"
    ".gitignore"
    "src/app/page.tsx"
    "src/app/layout.tsx"
)

all_files_ok=true
for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (ARQUIVO FALTANDO!)"
        all_files_ok=false
    fi
done

if [ "$all_files_ok" = false ]; then
    echo -e "${RED}❌ Alguns arquivos críticos estão faltando!${NC}"
    exit 1
fi

# 7. Verificar se .env.production existe
echo ""
echo "🔐 Verificando configuração de ambiente..."
if [ ! -f ".env.production" ]; then
    echo -e "${YELLOW}⚠ Arquivo .env.production não encontrado!${NC}"
    echo "Por favor, crie o arquivo .env.production baseado em .env.production.example"
    echo ""
    echo "Comando para criar:"
    echo "  cp .env.production.example .env.production"
    echo "  nano .env.production"
    echo ""
    echo -e "${YELLOW}⚠ DEPLOY PODE FALHAR SEM .ENV.PRODUCTION!${NC}"
else
    echo -e "${GREEN}✓ Arquivo .env.production encontrado${NC}"
fi

# 8. Informar sobre arquivos para upload
echo ""
echo "=========================================="
echo -e "${GREEN}📋 ARQUIVOS PARA UPLOAD (FTP):${NC}"
echo "=========================================="
echo ""
echo "Arquivos obrigatórios:"
echo "  - package.json"
echo "  - package-lock.json"
echo "  - next.config.ts"
echo "  - tsconfig.json"
echo "  - .htaccess"
echo "  - prisma/schema.prisma"
echo "  - .env.production (CRIAR SE NÃO EXISTIR!)"
echo ""
echo "Pastas:"
echo "  - src/"
echo "  - public/"
echo "  - .next/ (após o build)"
echo "  - prisma/"
echo ""
echo -e "${YELLOW}⚠ IMPORTANTE:${NC}"
echo "  - NÃO faça upload da pasta node_modules/ (instale no servidor)"
echo "  - Crie a pasta public/uploads/ com permissão de escrita"
echo "  - Configure o arquivo .env.production no servidor"
echo ""
echo "=========================================="
echo -e "${GREEN}✅ PREPARAÇÃO CONCLUÍDA!${NC}"
echo "=========================================="
echo ""
echo "Próximos passos:"
echo "1. Se usar Git: git add . && git commit -m 'Prep deploy' && git push"
echo "2. Se usar FTP: Faça upload dos arquivos listados acima"
echo "3. No servidor: npm install --production"
echo "4. No servidor: npx prisma db push"
echo "5. No servidor: npm start (ou reinicie o serviço Node.js)"
echo ""
echo -e "${GREEN}🚀 Bom deploy!${NC}"
