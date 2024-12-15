/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'cdn.shopify.com',
      'images.unsplash.com',
      'localhost',
      'res.cloudinary.com'
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true, // Enable this for blob URLs
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  }
}

module.exports = nextConfig