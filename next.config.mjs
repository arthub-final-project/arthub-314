/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '1000mb', // You can adjust the limit as needed (e.g., '10mb')
      },
    },
  };
  
  export default nextConfig;