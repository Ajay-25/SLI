/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

import { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scd.sos.org',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
