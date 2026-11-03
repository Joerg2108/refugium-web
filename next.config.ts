import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Nur für /demo: die Beispielmedien des Komponenten-Autors.
    remotePatterns: [
      { protocol: "https", hostname: "me7aitdbxq.ufs.sh" },
      { protocol: "https", hostname: "cdn.21st.dev" },
    ],
  },
};

export default nextConfig;
