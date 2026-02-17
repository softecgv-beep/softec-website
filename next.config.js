/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Forçar webpack em vez de turbopack
  experimental: {
    // Vazio para não usar turbopack
  },
};

module.exports = nextConfig;