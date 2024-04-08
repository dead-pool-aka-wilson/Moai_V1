/** @type {import('next').NextConfig} */
const nextConfig = {
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
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
