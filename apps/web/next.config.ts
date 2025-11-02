import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure workspace packages are transpiled (TS, CSS) by Next
  transpilePackages: ["@devmarket/ui"],
};

export default nextConfig;
