import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/postdocworks",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nosnippet",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
