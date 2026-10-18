import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Wajib untuk Cloudflare Pages (Static Export)
  devIndicators: false,
  // cacheComponents: true,     <-- DIHAPUS (tidak support static export)
  // partialPrefetching: true,  <-- DIHAPUS (tidak support static export)
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    unoptimized: true, // Wajib untuk static export agar gambar tidak error
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;