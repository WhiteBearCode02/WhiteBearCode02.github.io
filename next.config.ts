import type { NextConfig } from "next";

// User site: https://whitebearcode02.github.io/ (no repository prefix).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
