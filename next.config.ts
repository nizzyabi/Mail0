import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [{ hostname: "lh3.googleusercontent.com" }, { hostname: "mail0.io" }],
  },
  // Optional: If you still have issues, you can use this instead of domains
  // images: {
  //   unoptimized: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/settings",
        destination: "/settings/general",
        permanent: true,
      },
      {
        source: "/mail",
        destination: "/mail/inbox",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
