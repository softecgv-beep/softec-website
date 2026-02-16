-- ========================================
-- SCRIPT SQL - SETUP DO BANCO DE DADOS
-- SOFTEC - Hostinger MySQL
-- ========================================

-- Este script cria todas as tabelas necessárias para o site SOFTEC
-- Execute no phpMyAdmin ou terminal MySQL da Hostinger

-- ========================================
-- CRIAR BANCO DE DADOS (se necessário)
-- ========================================
-- CREATE DATABASE softec_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE softec_db;

-- ========================================
-- TABELA: users
-- ========================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `emailVerified` DATETIME,
  `image` VARCHAR(191),
  `password` VARCHAR(191),
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABELA: posts
-- ========================================
CREATE TABLE IF NOT EXISTS `posts` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `title` VARCHAR(191) NOT NULL,
  `content` TEXT NOT NULL,
  `published` BOOLEAN NOT NULL DEFAULT FALSE,
  `authorId` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABELA: SiteContent
-- Armazena conteúdo editável do site
-- ========================================
CREATE TABLE IF NOT EXISTS `SiteContent` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `key` VARCHAR(191) NOT NULL UNIQUE,
  `value` TEXT NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABELA: Service
-- Armazena os serviços oferecidos
-- ========================================
CREATE TABLE IF NOT EXISTS `Service` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `title` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `icon` VARCHAR(191) NOT NULL,
  `active` BOOLEAN NOT NULL DEFAULT TRUE,
  `order` INTEGER NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABELA: ContactMessage
-- Armazena mensagens de contato
-- ========================================
CREATE TABLE IF NOT EXISTS `ContactMessage` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(191) NOT NULL,
  `subject` VARCHAR(191) NOT NULL,
  `message` TEXT NOT NULL,
  `read` BOOLEAN NOT NULL DEFAULT FALSE,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABELA: Candidatura
-- Armazena candidaturas para vagas
-- ========================================
CREATE TABLE IF NOT EXISTS `Candidatura` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(191) NOT NULL,
  `service` VARCHAR(191) NOT NULL,
  `experience` TEXT,
  `message` TEXT,
  `curriculoUrl` VARCHAR(191),
  `status` VARCHAR(191) NOT NULL DEFAULT 'pendente',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- DADOS INICIAIS - Conteúdo do Site
-- ========================================
INSERT INTO `SiteContent` (`id`, `key`, `value`) VALUES
('1', 'hero_title', 'Soluções Tecnológicas e Gestão de Frotas'),
('2', 'hero_subtitle', 'Profissionalismo e agilidade para atender às suas necessidades. Do Brasil a Portugal, levamos qualidade e compromisso em cada serviço.'),
('3', 'about_title', 'Conheça a SOFTEC'),
('4', 'about_description', 'Uma trajetória de crescimento e inovação, levando qualidade e compromisso em cada serviço.'),
('5', 'services_title', 'Nossos Serviços'),
('6', 'services_description', 'Soluções completas para suas necessidades tecnológicas e logísticas')
ON DUPLICATE KEY UPDATE `value` = `value`;

-- ========================================
-- DADOS INICIAIS - Serviços
-- ========================================
INSERT INTO `Service` (`id`, `title`, `description`, `icon`, `active`, `order`) VALUES
('1', 'Frota TVDE', 'Gestão completa de frotas para transporte por aplicativo', 'Car', TRUE, 1),
('2', 'Estafetas de Delivery', 'Entregas rápidas e confiáveis para seu negócio', 'Truck', TRUE, 2),
('3', 'Encomendas Express', 'Entregas urgentes com máxima agilidade', 'Package', TRUE, 3),
('4', 'Vendas por Licitação', 'Fornecimento de produtos via processos licitatórios', 'Building2', TRUE, 4),
('5', 'Assistência Técnica', 'Suporte especializado em tecnologia', 'Package', TRUE, 5),
('6', 'Serviços Gráficos', 'Soluções completas em impressão e design', 'Package', TRUE, 6),
('7', 'Relocation de Veículos', 'Serviços de transferência e relocation de veículos', 'Car', TRUE, 7)
ON DUPLICATE KEY UPDATE `title` = `title`;

-- ========================================
-- ÍNDICES para melhorar performance
-- ========================================
CREATE INDEX IF NOT EXISTS `idx_users_email` ON `users`(`email`);
CREATE INDEX IF NOT EXISTS `idx_posts_authorId` ON `posts`(`authorId`);
CREATE INDEX IF NOT EXISTS `idx_SiteContent_key` ON `SiteContent`(`key`);
CREATE INDEX IF NOT EXISTS `idx_Service_active` ON `Service`(`active`);
CREATE INDEX IF NOT EXISTS `idx_ContactMessage_read` ON `ContactMessage`(`read`);
CREATE INDEX IF NOT EXISTS `idx_Candidatura_status` ON `Candidatura`(`status`);
CREATE INDEX IF NOT EXISTS `idx_Candidatura_service` ON `Candidatura`(`service`);

-- ========================================
-- CONCLUÍDO!
-- ========================================
SELECT '====================================' AS '';
SELECT 'BANCO DE DADOS CONFIGURADO COM SUCESSO!' AS '';
SELECT '====================================' AS '';
SELECT '' AS '';
SELECT 'Tabelas criadas:' AS '';
SELECT '  - users' AS '';
SELECT '  - posts' AS '';
SELECT '  - SiteContent' AS '';
SELECT '  - Service' AS '';
SELECT '  - ContactMessage' AS '';
SELECT '  - Candidatura' AS '';
SELECT '' AS '';
SELECT 'Dados iniciais inseridos:' AS '';
SELECT '  - 6 itens de conteúdo do site' AS '';
SELECT '  - 7 serviços' AS '';
SELECT '' AS '';
SELECT 'O site SOFTEC está pronto para usar!' AS '';
