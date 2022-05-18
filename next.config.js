
const withPlugins = require('next-compose-plugins');


/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer}) => {

    config.resolve.fallback = {
      fs: false,
      path: false,
      dotenv: false
    }
    return config
  },
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ['githubusercontent.com']
  },
  unstable_runtimeJS: false,
  env: {
    CACHE_LOADED: "false"
  }
}

module.exports = withPlugins([
  [require('next-optimized-images'), {}]
], nextConfig);
