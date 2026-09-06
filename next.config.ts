import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http",  hostname: "**" },
    ],
    // Allow base64 data URLs (admin uploaded images)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    unoptimized: false,
  },
};

export default nextConfig;
