import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  
  basePath: "/Porfafolio_Web_22193",
  assetPrefix: "/Porfafolio_Web_22193/",
  trailingSlash: true,
  images: {
    domains: ["picsum.photos"],
  },
};

export default nextConfig;