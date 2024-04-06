/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/app',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
