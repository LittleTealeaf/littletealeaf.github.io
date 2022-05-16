
const withPlugins = require('next-compose-plugins');


/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false
    }
    return config
  },
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ['githubusercontent.com']
  }
}

module.exports = withPlugins([
  [require('next-optimized-images'), {}]
], nextConfig);
