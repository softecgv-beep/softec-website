/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Não usar Turbopack
  turbopack: false,
};

module.exports = nextConfig;