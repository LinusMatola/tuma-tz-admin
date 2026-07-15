import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: "https://api.tuma-tz.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;