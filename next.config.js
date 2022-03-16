/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true
  }
}

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([optimizedImages, {
  handleImages: ['png']
}],nextConfig);