/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn2.thecatapi.com"], 
    formats: ["image/avif", "image/webp"],
  },
  i18n: {
      locales: ['en-GB', 'es-ES'],
      defaultLocale: 'en-GB',
  }
}

module.exports = nextConfig
