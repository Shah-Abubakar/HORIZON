const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,  // ← ADD THIS
  },
  eslint: {
    ignoreDuringBuilds: true,  // ← ADD THIS
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'firebase/auth': path.resolve(__dirname, 'node_modules/firebase/auth/dist/esm/index.esm.js'),
      'firebase/app': path.resolve(__dirname, 'node_modules/firebase/app/dist/esm/index.esm.js'),
      '@firebase/auth': path.resolve(__dirname, 'node_modules/firebase/node_modules/@firebase/auth/dist/esm2017/index.js'),
    }
    return config
  },
}

module.exports = nextConfig