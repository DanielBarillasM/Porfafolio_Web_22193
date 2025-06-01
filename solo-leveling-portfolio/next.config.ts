import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Habilitar dominios externos para <Image /> (de FnafMiniGames.txs)
  images: {
    domains: ["picsum.photos"],
  },
};

export default nextConfig;
