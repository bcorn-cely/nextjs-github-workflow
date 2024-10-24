import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      }
    ],
    minimumCacheTTL: 60 * 60 * 24 // 24 hours,
  },
  experimental: {
    ppr: 'incremental',
  },
};

export default nextConfig;
