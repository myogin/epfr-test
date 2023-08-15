/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/api/:path*",

        // matching all API routes
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
        ],
      },
    ];
  },
};

module.exports = nextConfig;
