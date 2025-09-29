import { url } from "inspector";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ['ecommerce.routemisr.com'],
    remotePatterns: [new URL('https://ecommerce.routemisr.com/**/**')]
  }
};

export default nextConfig;
