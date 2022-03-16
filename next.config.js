/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true
  }
}

const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  [require('next-optimized-images'),{}]
],nextConfig);