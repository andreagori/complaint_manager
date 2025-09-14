import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },

  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;