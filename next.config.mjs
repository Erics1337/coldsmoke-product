/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: 'coldsmoke-product',
  assetPrefix: 'coldsmoke-product',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
