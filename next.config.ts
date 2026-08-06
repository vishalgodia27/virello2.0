import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    
  allowedDevOrigins: ['192.168.1.7','192.168.1.6'],
  serverExternalPackages: ['@arcjet/analyze', '@arcjet/analyze-wasm', 'arcjet'],
};

export default nextConfig;