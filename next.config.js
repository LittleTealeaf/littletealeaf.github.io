

const withPlugins = require('next-compose-plugins');


/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.fallback = {
      fs: false,
      path: false
    }
    config.module.rules.push({
      test: /\.html$/i,
      use: [{
        loader: "html-loader",
        options:{}
      }]
    })
    // Important: return the modified config
    return config
  },
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ['githubusercontent.com']
  }
}

module.exports = withPlugins([
  [require('next-optimized-images'),{}]
],nextConfig);

