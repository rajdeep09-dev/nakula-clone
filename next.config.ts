import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
    ],
    unoptimized: true,
  },
  // This explicitly tells Next.js 16 how to handle the Turbopack/Webpack transition
  experimental: {
    turbopack: {},
  },
  // Keep your webpack fallback for the --webpack flag in package.json
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
