// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dependiendo de tu configuración previa, si ya tenías images:{…}, agrégalo aquí también.
  basePath: "/Porfafolio_Web_22193",
  assetPrefix: "/Porfafolio_Web_22193/",
  images: {
    domains: ["picsum.photos"], // si ya lo tenías, mantenlo
  },
};

export default nextConfig;