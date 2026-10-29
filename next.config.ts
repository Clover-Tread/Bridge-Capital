import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    // AVIF pesa ~30-50% menos que WebP en fotografía; WebP queda de respaldo.
    formats: ["image/avif", "image/webp"],
    // Las imágenes del sitio casi no cambian: cachearlas 31 días en el CDN de Vercel.
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560],
  },
};

export default nextConfig;
