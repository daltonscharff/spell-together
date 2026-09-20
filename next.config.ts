import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  redirects() {
    return [
      {
        source: '/rooms',
        destination: '/',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
