import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['avatar.iran.liara.run', 'img.clerk.com', 'res.cloudinary.com']
  },
  experimental: {
    serverActions: {
      bodySizeLimit: 100 * 1024 * 1024, // 10 MB
    },
  },
};

export default nextConfig;