import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/.well-known/openai-apps-challenge",
        destination: "/api/openai-apps-challenge",
      },
    ];
  },
};

export default nextConfig;
