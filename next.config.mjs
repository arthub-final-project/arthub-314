/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '1000mb', // You can adjust the limit as needed
    },
  },
  images: {
    domains: ['github.com', 'placehold.co'], // ✅ Add external image sources here
  },
}

export default nextConfig
