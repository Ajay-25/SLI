/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  experimental: {
    middleware: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scd.sos.org",
      },
    ],
  },
};

module.exports = nextConfig;
