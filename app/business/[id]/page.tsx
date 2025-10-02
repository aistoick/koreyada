import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { ReviewCard } from "@/components/review-card"
import { ReviewForm } from "@/components/review-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, MapPin, Phone, Globe, Mail, Star, MessageSquare } from "lucide-react"

const businesses = {
  "kn-bank": {
    name: "KN Bank",
    category: "money",
    description:
      "KR Bank is one of Korea's largest financial institutions, well-known for its strong international banking services. With more than 50 years of experience, the bank has built trust among locals and foreigners alike. Today, it provides specialized solutions for migrant workers, international students, and foreign residents in Korea.",
    image: "/korean-bank-building-exterior.jpg",
    rating: 4.9,
    reviews: 103,
    languages: ["Korean", "English", "Russian"],
    services: [
      {
        title: "Bank Accounts",
        description: "Easy setup for foreigners with passport/ARC",
      },
      {
        title: "Remittances",
        description: "Fast and affordable transfers to Uzbekistan and other countries.",
      },
      {
        title: "Currency Exchange",
        description: "Competitive rates for major currencies.",
      },
      {
        title: "Loans & Credit",
        description: "Personal loans, housing loans, and credit cards for eligible residents.",
      },
    ],
    address: "84 Namdaemun-ro, Jung-gu, Seoul",
    phone: "+82-2-2222-2222",
    website: "www.krbank.com",
    email: "info@seoulimmigration.com",
  },
  "seoul-immigration": {
    name: "Seoul Immigration Services",
    category: "visa",
    description:
      "Leading consultancy with 15+ years helping foreign workers with visa and agency processes in Korea. Our experienced team provides comprehensive immigration support with multilingual services.",
    image: "/immigration-office-korea.jpg",
    rating: 4.9,
    reviews: 103,
    languages: ["Korean", "English", "Uzbek", "Russian"],
    services: [
      {
        title: "Visa Applications",
        description: "Complete assistance with new visa applications",
      },
      {
        title: "Visa Renewals",
        description: "Fast and reliable visa renewal services",
      },
      {
        title: "Work Permits",
        description: "Help with E-9 and other work permit applications",
      },
      {
        title: "Legal Consultation",
        description: "Expert advice on immigration law and procedures",
      },
    ],
    address: "84 Namdaemun-ro, Jung-gu, Seoul",
    phone: "+82-2-2222-2222",
    website: "www.seoulimmigration.com",
    email: "info@seoulimmigration.com",
  },
}

export default function BusinessDetailPage({ params }: { params: { id: string } }) {
  const business = businesses[params.id as keyof typeof businesses]

  if (!business) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href={`/categories/${business.category}`}>
          <Button variant="default" className="mb-6 bg-[#5B8DEF] hover:bg-[#4A7DD8]">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        {/* Business Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-[#5B8DEF] mb-8">{business.name}</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Business Image */}
            <div className="relative h-64 rounded-lg overflow-hidden bg-gray-200">
              <img
                src={business.image || "/placeholder.svg"}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Overview</h2>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-6 w-6 fill-current" />
                  <span className="text-xl font-bold">{business.rating}</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">{business.description}</p>
              <div>
                <h3 className="font-semibold mb-2">Languages:</h3>
                <div className="flex flex-wrap gap-2">
                  {business.languages.map((lang) => (
                    <Badge key={lang} className="bg-[#5B8DEF]">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Services</h2>
          <ul className="space-y-3">
            {business.services.map((service, index) => (
              <li key={index} className="text-gray-700">
                <Link href="#" className="text-[#5B8DEF] hover:underline font-medium">
                  {service.title}
                </Link>
                {" – "}
                {service.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Contact info</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{business.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">{business.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">{business.website}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">{business.email}</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <Button className="bg-[#5B8DEF] hover:bg-[#4A7DD8] w-full">Call Now</Button>
            <Button variant="outline" className="w-full bg-transparent">
              visit website
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Customer Reviews ({business.reviews})
          </h2>

          <ReviewForm />

          <div className="mt-8 space-y-4">
            <ReviewCard
              name="Asilbek Karimov"
              rating={5}
              comment="Excellent service! Professional team and quick results"
              date="2025-25-08"
            />
            <ReviewCard
              name="Asilbek Karimov"
              rating={5}
              comment="Excellent service! Professional team and quick results"
              date="2025-25-08"
            />
            <ReviewCard
              name="Asilbek Karimov"
              rating={5}
              comment="Excellent service! Professional team and quick results"
              date="2025-25-08"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(businesses).map((id) => ({
    id,
  }))
}
