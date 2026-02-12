import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.icloud-content.com',
      },
      {
        protocol: 'https',
        hostname: 'cvws.icloud-content.com',
      },
    ],
  },
};

export default nextConfig;
