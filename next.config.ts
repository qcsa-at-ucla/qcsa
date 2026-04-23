import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  // just comment after re-enabling merch
  async redirects() {
    return [
      // Merch temporarily disabled — remove these when re-enabling
      { source: "/merch", destination: "/", permanent: false },
      { source: "/merch/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
