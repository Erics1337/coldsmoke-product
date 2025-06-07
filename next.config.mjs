const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath: isProd ? '/coldsmoke-product' : '', // Still needed for routing
  assetPrefix: isProd ? '/coldsmoke-product' : undefined,
  basePath: isProd ? '/coldsmoke-product' : undefined,
    images: {
    unoptimized: true,
  },
  // Optional: Add a trailing slash to all URLs
  // trailingSlash: true,
};

export default nextConfig;
