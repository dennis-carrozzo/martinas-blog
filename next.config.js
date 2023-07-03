/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    storyblokPreviewToken: process.env.STORYBLOK_PREVIEW_TOKEN
  },
  images: {
    domains: ['a.storyblok.com']
  }
}

module.exports = nextConfig
