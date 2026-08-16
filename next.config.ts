import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    // Powers next/navigation's forbidden()/forbidden.tsx, used to gate /admin.
    authInterrupts: true,
  },
};

export default nextConfig;
