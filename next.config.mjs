/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/app",
        permanent: true
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pmm6ncakzkfpdq8g.public.blob.vercel-storage.com",
        port: ""
      }
    ]
  }
};

export default nextConfig;
