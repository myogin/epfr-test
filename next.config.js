/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://203.85.37.54:8000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
