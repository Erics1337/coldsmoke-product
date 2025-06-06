const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/coldsmoke-product' : '',
  assetPrefix: isProd ? '/coldsmoke-product' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
