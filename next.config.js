/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  // output: "export",
  swcMinify: true,
  compiler: {
    styledComponents: true,
    ssr: false,
  },
  experimental: {
    incrementalCacheHandlerPath: false,
  },
};

module.exports = nextConfig;
module.exports = {
  pageExtensions: ["tsx", "ts", "jsx", "js"],
};
module.exports = {
  async redirects() {
    return [
      // Redirect all variations to https://www.merchantad.com/
      {
        source: "/:path*",
        destination: "https://www.merchantad.com//:path*",
        permanent: true,
      },
    ];
  },
};
module.exports = {
  images: {
    domains: [
      "merchantad.xevitech.com",
      "flagcdn.com",
      "en.lesso.com",
      "localhost",
    ],
    unoptimized: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://www.merchantad.com//' : '',
  // devIndicators: {
  //   buildActivity: false,
  // },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    return config;
  },
};



/* export out for hostinger*/
/** @type {import('next').NextConfig} */

/*
const nextConfig = {
  // Strict mode is fine
  reactStrictMode: true,

  // ✅ REQUIRED: generate `out/` folder
  output: "export",

  // ✅ REQUIRED for static hosting
  images: {
    unoptimized: true,
    domains: [
      "merchantad.xevitech.com",
      "flagcdn.com",
      "en.lesso.com",
      "localhost",
    ],
  },

  // Optional but safe
  pageExtensions: ["tsx", "ts", "jsx", "js"],

  // Safe compiler options
  compiler: {
    styledComponents: true,
  },

  // Avoid build failures from lint
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

*/
