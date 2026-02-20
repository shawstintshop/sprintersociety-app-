import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
          remotePatterns: [
            { protocol: "https", hostname: "*.supabaseusercontent.com" },
            { protocol: "https", hostname: "img.youtube.com" },
                ],
    },
};

export default nextConfig;
