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
  async redirects() {
    // Old PostdocWorks URLs now permanently redirect to the Doc2Postdoc pages.
    return [
      // i4isciences.ai -> canonical .com site, same path (decision: always .com)
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?i4isciences\\.ai" }],
        destination: "https://www.i4isciences.com/:path*",
        permanent: true,
      },
      { source: "/postdocworks", destination: "/doc2postdoc", permanent: true },
      { source: "/postdocworks/doc2postdoc", destination: "/doc2postdoc", permanent: true },
      { source: "/postdocworks/eyewee", destination: "/eyewee", permanent: true },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
