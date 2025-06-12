/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn2.thecatapi.com"], 
    formats: ["image/avif", "image/webp"],
},
}

module.exports = nextConfig
