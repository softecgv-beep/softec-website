/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Desabilitar Turbopack no build
  turbo: undefined,
  experimental: {
    turbo: undefined,
  },
};

module.exports = nextConfig;