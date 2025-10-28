import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['ik.imagekit.io'],
  },
  api: {
    bodyParser: false,
  },
};

export default nextConfig;
