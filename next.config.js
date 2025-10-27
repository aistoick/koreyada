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
    // Barcha ruxsat etilgan rasm manbalari
    domains: [
      "encrypted-tbn0.gstatic.com", // Google cached images
      "globallawexperts.com",       // Biznes logolari uchun
      "koreyada-api.umiddev.uz",    // Agar API orqali rasm bo‘lsa
      "scontent.fbhk1-2.fna.fbcdn.net", // Facebook
      "www.korvia.com",             // Korvia domeni
      "hometownrealty.co.kr",       // Koreya realty sayti
      "images.unsplash.com",        // Fallback yoki test uchun
      "cdn.pixabay.com",            // Fallback rasm manbalari
    ],
  },
}

module.exports = nextConfig
