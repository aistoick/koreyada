/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://koreyada-api.umiddev.uz/:path*", // proxy rewrite
      },
    ]
  },

  images: {
    domains: [
      "scontent.fbhk1-2.fna.fbcdn.net",
      "www.korvia.com",
      "hometownrealty.co.kr",
    ],
  },
}

module.exports = nextConfig
