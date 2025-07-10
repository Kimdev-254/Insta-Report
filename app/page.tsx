import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  FileText,
  Upload,
  Eye,
  Star,
  Clock,
  Shield,
  Zap,
  Bot,
  GraduationCap,
  Settings,
  Wand2,
  File,
  Sparkles,
  Cpu,
  Database,
  Code,
  Layers,
} from "lucide-react"
import Link from "next/link"

// Background Icons Component
function BackgroundIcons() {
  const icons = [
    { Icon: FileText, id: "doc1", isGreen: true },
    { Icon: Zap, id: "lightning", isGreen: false },
    { Icon: Bot, id: "robot", isGreen: true },
    { Icon: File, id: "doc2", isGreen: false },
    { Icon: Sparkles, id: "ai", isGreen: true },
    { Icon: GraduationCap, id: "grad", isGreen: false },
    { Icon: FileText, id: "report", isGreen: true },
    { Icon: Settings, id: "gear", isGreen: false },
    { Icon: Wand2, id: "wand", isGreen: true },
    { Icon: File, id: "paper", isGreen: false },
    { Icon: Sparkles, id: "snap", isGreen: true },
    { Icon: FileText, id: "page", isGreen: false },
    { Icon: Cpu, id: "cpu", isGreen: true },
    { Icon: Database, id: "database", isGreen: false },
    { Icon: Code, id: "code", isGreen: true },
    { Icon: Layers, id: "layers", isGreen: false },
  ]

  // Calculate positions for icons on concentric circles
  const getIconPosition = (circleIndex: number, iconIndex: number, totalIcons: number, isTopHalf = true) => {
    // Use safe defaults for SSR
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1024
    const baseRadius = windowWidth < 768 ? 120 : 180 // Smaller radius on mobile
    const radiusIncrement = windowWidth < 768 ? 80 : 100 // Smaller increments on mobile
    const radius = baseRadius + circleIndex * radiusIncrement
    const angleStep = Math.PI / (totalIcons - 1) // Divide semicircle by number of icons
    const angle = iconIndex * angleStep + (isTopHalf ? 0 : Math.PI) // Top or bottom half

    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius * (isTopHalf ? -1 : 1) // Negative for top half

    return { x, y, radius }
  }

  return (
    <>
      {/* Top Half Circles - Hero Section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Circle 1 - Innermost */}
          {[0, 1, 2, 3].map((iconIndex) => {
            const { x, y } = getIconPosition(0, iconIndex, 4, true)
            const iconData = icons[iconIndex % icons.length]
            const IconComponent = iconData.Icon
            const offset = typeof window !== "undefined" && window.innerWidth < 768 ? 80 : 150 // Smaller offset on mobile
            return (
              <div
                key={`circle1-${iconIndex}`}
                className="absolute opacity-15"
                style={{
                  transform: `translate(${x}px, ${y + offset}px)`,
                }}
              >
                <IconComponent
                  className={`w-6 h-6 md:w-8 md:h-8 ${iconData.isGreen ? "text-[#1CBF73]" : "text-gray-400"}`}
                />
              </div>
            )
          })}

          {/* Circle 2 - Second */}
          {[0, 1, 2, 3, 4, 5].map((iconIndex) => {
            const { x, y } = getIconPosition(1, iconIndex, 6, true)
            const iconData = icons[(iconIndex + 4) % icons.length]
            const IconComponent = iconData.Icon
            const offset = typeof window !== "undefined" && window.innerWidth < 768 ? 80 : 150
            return (
              <div
                key={`circle2-${iconIndex}`}
                className="absolute opacity-12"
                style={{
                  transform: `translate(${x}px, ${y + offset}px)`,
                }}
              >
                <IconComponent
                  className={`w-5 h-5 md:w-6 md:h-6 ${iconData.isGreen ? "text-[#1CBF73]" : "text-gray-400"}`}
                />
              </div>
            )
          })}

          {/* Circle 3 - Third */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((iconIndex) => {
            const { x, y } = getIconPosition(2, iconIndex, 8, true)
            const iconData = icons[(iconIndex + 8) % icons.length]
            const IconComponent = iconData.Icon
            const offset = typeof window !== "undefined" && window.innerWidth < 768 ? 80 : 150
            return (
              <div
                key={`circle3-${iconIndex}`}
                className="absolute opacity-10"
                style={{
                  transform: `translate(${x}px, ${y + offset}px)`,
                }}
              >
                <IconComponent
                  className={`w-4 h-4 md:w-5 md:h-5 ${iconData.isGreen ? "text-[#1CBF73]" : "text-gray-400"}`}
                />
              </div>
            )
          })}

          {/* Circle 4 - Outermost (New) */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((iconIndex) => {
            const { x, y } = getIconPosition(3, iconIndex, 10, true)
            const iconData = icons[(iconIndex + 12) % icons.length]
            const IconComponent = iconData.Icon
            const offset = typeof window !== "undefined" && window.innerWidth < 768 ? 80 : 150
            return (
              <div
                key={`circle4-${iconIndex}`}
                className="absolute opacity-8 hidden md:block" // Hide on mobile to reduce clutter
                style={{
                  transform: `translate(${x}px, ${y + offset}px)`,
                }}
              >
                <IconComponent className={`w-4 h-4 ${iconData.isGreen ? "text-[#1CBF73]" : "text-gray-400"}`} />
              </div>
            )
          })}

          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
            <defs>
              <pattern id="dots" patternUnits="userSpaceOnUse" width="4" height="4">
                <circle cx="2" cy="2" r="0.5" fill="#e5e7eb" opacity="0.3" />
              </pattern>
            </defs>

            {/* Circle paths */}
            {[0, 1, 2, 3].map((circleIndex) => {
              const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1024
              const baseRadius = windowWidth < 768 ? 120 : 180
              const radiusIncrement = windowWidth < 768 ? 80 : 100
              const radius = baseRadius + circleIndex * radiusIncrement
              const offset = typeof window !== "undefined" && window.innerWidth < 768 ? 80 : 150
              const centerX = windowWidth / 2
              const centerY = typeof window !== "undefined" ? window.innerHeight / 2 + offset : 300

              return (
                <path
                  key={`path-${circleIndex}`}
                  d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="2,4"
                  fill="none"
                  opacity="0.4"
                  className={circleIndex === 3 ? "hidden md:block" : ""}
                />
              )
            })}
          </svg>
        </div>
      </div>
    </>
  )
}

// Footer Background Icons Component
function FooterBackgroundIcons() {
  const icons = [
    { Icon: FileText, id: "doc1", isGreen: true },
    { Icon: Zap, id: "lightning", isGreen: false },
    { Icon: Bot, id: "robot", isGreen: true },
    { Icon: File, id: "doc2", isGreen: false },
    { Icon: Sparkles, id: "ai", isGreen: true },
    { Icon: GraduationCap, id: "grad", isGreen: false },
    { Icon: FileText, id: "report", isGreen: true },
    { Icon: Settings, id: "gear", isGreen: false },
    { Icon: Wand2, id: "wand", isGreen: true },
    { Icon: File, id: "paper", isGreen: false },
    { Icon: Sparkles, id: "snap", isGreen: true },
    { Icon: FileText, id: "page", isGreen: false },
    { Icon: Cpu, id: "cpu", isGreen: true },
    { Icon: Database, id: "database", isGreen: false },
    { Icon: Code, id: "code", isGreen: true },
    { Icon: Layers, id: "layers", isGreen: false },
    { Icon: Shield, id: "shield", isGreen: true },
    { Icon: Upload, id: "upload", isGreen: false },
    { Icon: Eye, id: "eye", isGreen: true },
    { Icon: Clock, id: "clock", isGreen: false },
  ]

  const getIconPosition = (circleIndex: number, iconIndex: number, totalIcons: number) => {
    // Use safe defaults for SSR
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1024
    const baseRadius = windowWidth < 768 ? 120 : 180
    const radiusIncrement = windowWidth < 768 ? 80 : 100
    const radius = baseRadius + circleIndex * radiusIncrement
    const angleStep = Math.PI / (totalIcons - 1)
    const angle = iconIndex * angleStep + Math.PI // Bottom half

    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    return { x, y }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full flex items-start justify-center">
        {/* Circle 1 - Innermost */}
        {[0, 1, 2, 3, 4, 5].map((iconIndex) => {
          const { x, y } = getIconPosition(0, iconIndex, 6)
          const iconData = icons[iconIndex % icons.length]
          const IconComponent = iconData.Icon
          return (
            <div
              key={`footer-circle1-${iconIndex}`}
              className="absolute opacity-15"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <IconComponent
                className={`w-6 h-6 md:w-8 md:h-8 ${iconData.isGreen ? "text-[#1CBF73]" : "text-gray-400"}`}
              />
            </div>
          )
        })}

        {/* Circle 2 - Second */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((iconIndex) => {
          const { x, y } = getIconPosition(1, iconIndex, 8)
          const iconData = icons[(iconIndex + 6) % icons.length]
          const IconComponent = iconData.Icon
          return (
            <div
              key={`footer-circle2-${iconIndex}`}
              className="absolute opacity-12"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <IconComponent
                className={`w-5 h-5 md:w-6 md:h-6 ${iconData.isGreen ? "text-[#1CBF73]" : "text-gray-400"}`}
              />
            </div>
          )
        })}

        {/* Circle 3 - Third */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((iconIndex) => {
          const { x, y } = getIconPosition(2, iconIndex, 10)
          const iconData = icons[(iconIndex + 10) % icons.length]
          const IconComponent = iconData.Icon
          return (
            <div
              key={`footer-circle3-${iconIndex}`}
              className="absolute opacity-10"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <IconComponent
                className={`w-4 h-4 md:w-5 md:h-5 ${iconData.isGreen ? "text-[#1CBF73]" : "text-gray-400"}`}
              />
            </div>
          )
        })}

        {/* Circle 4 - Outermost (New) */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((iconIndex) => {
          const { x, y } = getIconPosition(3, iconIndex, 12)
          const iconData = icons[(iconIndex + 14) % icons.length]
          const IconComponent = iconData.Icon
          return (
            <div
              key={`footer-circle4-${iconIndex}`}
              className="absolute opacity-8 hidden md:block"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <IconComponent className={`w-4 h-4 ${iconData.isGreen ? "text-[#1CBF73]" : "text-gray-400"}`} />
            </div>
          )
        })}

        {/* Connecting Lines for Footer */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          {[0, 1, 2, 3].map((circleIndex) => {
            const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1024
            const baseRadius = windowWidth < 768 ? 120 : 180
            const radiusIncrement = windowWidth < 768 ? 80 : 100
            const radius = baseRadius + circleIndex * radiusIncrement
            const centerX = windowWidth / 2
            const centerY = 0

            return (
              <path
                key={`footer-path-${circleIndex}`}
                d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 0 ${centerX + radius} ${centerY}`}
                stroke="#6b7280"
                strokeWidth="1"
                strokeDasharray="2,4"
                fill="none"
                opacity="0.3"
                className={circleIndex === 3 ? "hidden md:block" : ""}
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Floating Glassmorphic Header */}
      <header className="fixed top-2 md:top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl mx-auto px-2 md:px-4">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl shadow-lg px-3 md:px-6 py-2 md:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-[#1CBF73] rounded-lg flex items-center justify-center">
                <FileText className="w-3 h-3 md:w-5 md:h-5 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold text-gray-900">Insta_Report</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#features" className="text-gray-600 hover:text-[#1CBF73] transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-[#1CBF73] transition-colors">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-[#1CBF73] transition-colors">
                Reviews
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link href="/auth">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-[#1CBF73] text-sm md:text-base px-3 md:px-4 py-1 md:py-2"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-[#1CBF73] hover:bg-[#16A663] text-white rounded-lg md:rounded-xl text-sm md:text-base px-3 md:px-4 py-1 md:py-2">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Background Icons */}
      <section className="relative pt-16 md:pt-32 pb-16 md:pb-20 px-4 text-center bg-gradient-to-b from-[#F5F6FA] to-white overflow-hidden">
        <BackgroundIcons />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Badge className="mb-6 md:mb-6 bg-[#1CBF73]/10 text-[#1CBF73] border-[#1CBF73]/20 text-sm px-4 py-1">
            AI-Powered Report Generation
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-6 leading-tight px-2">
            Generate a Full Report in <span className="text-[#1CBF73]">Seconds</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-8 max-w-2xl mx-auto px-2 leading-relaxed">
            AI-powered attachment and school report generator that creates professional academic reports instantly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 max-w-md sm:max-w-none mx-auto">
            <Link href="/auth" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-[#1CBF73] hover:bg-[#16A663] text-white px-8 py-4 text-lg font-medium"
              >
                Get Started
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-[#1CBF73] text-[#1CBF73] hover:bg-[#1CBF73]/5 px-8 py-4 text-lg font-medium bg-transparent"
            >
              How it Works
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Everything You Need for Perfect Reports
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Our AI-powered platform handles all the heavy lifting so you can focus on what matters most
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="border-gray-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1CBF73]/10 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#1CBF73]" />
                </div>
                <CardTitle className="text-gray-900 text-lg md:text-xl">AI-Generated Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm md:text-base">
                  Advanced AI creates comprehensive, well-structured academic reports tailored to your requirements
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-gray-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1CBF73]/10 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Upload className="w-5 h-5 md:w-6 md:h-6 text-[#1CBF73]" />
                </div>
                <CardTitle className="text-gray-900 text-lg md:text-xl">Upload Your Format</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm md:text-base">
                  Upload your institution's specific format and we'll match it perfectly
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-gray-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1CBF73]/10 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#1CBF73]" />
                </div>
                <CardTitle className="text-gray-900 text-lg md:text-xl">Supports DOCX/PDF</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm md:text-base">
                  Export in multiple formats including DOCX and PDF with professional formatting
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-gray-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1CBF73]/10 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Eye className="w-5 h-5 md:w-6 md:h-6 text-[#1CBF73]" />
                </div>
                <CardTitle className="text-gray-900 text-lg md:text-xl">Preview Before Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm md:text-base">
                  Review your complete report before making any payment - satisfaction guaranteed
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Mobile Optimized */}
      <section id="testimonials" className="py-12 md:py-20 px-4 bg-[#F5F6FA] overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Loved by Students Everywhere
            </h2>
            <p className="text-lg md:text-xl text-gray-600 px-4">
              Join thousands of students who've already generated perfect reports
            </p>
          </div>

          {/* Mobile: Single Column Layout */}
          <div className="md:hidden">
            <div className="space-y-4 max-w-sm mx-auto">
              <TestimonialCard
                quote="Saved me weeks of work! 🎉 The AI generated exactly what I needed for my industrial attachment report."
                name="Sarah Mwangi"
                role="Computer Science Student"
                avatar="SM"
                color="from-[#1CBF73] to-[#16A663]"
              />
              <TestimonialCard
                quote="Amazing tool! Generated my 30-page report in under 5 minutes. Quality exceeded expectations! 🚀"
                name="David Mutua"
                role="IT Student, JKUAT"
                avatar="DM"
                color="from-orange-500 to-orange-600"
              />
              <TestimonialCard
                quote="Perfect for busy students! 📚 The AI captured all my experiences perfectly and got me an A+."
                name="Grace Njeri"
                role="Medical Student"
                avatar="GN"
                color="from-pink-500 to-pink-600"
              />
              <TestimonialCard
                quote="Professional quality reports in minutes! The formatting was perfect and matched our requirements exactly. ⭐"
                name="James Kiprotich"
                role="Engineering Student"
                avatar="JK"
                color="from-blue-500 to-blue-600"
              />
              <TestimonialCard
                quote="Best investment for my final year project! 💯 The AI understood exactly what I needed."
                name="Mary Wanjiku"
                role="Business Student"
                avatar="MW"
                color="from-purple-500 to-purple-600"
              />
            </div>
          </div>

          {/* Desktop: Animated Testimonials Grid */}
          <div className="hidden md:block relative h-[600px] overflow-hidden">
            {/* Column 1 - Scrolling Up */}
            <div className="absolute left-0 w-1/3 pr-3">
              <div className="animate-scroll-up space-y-6">
                {/* First set of testimonials */}
                <TestimonialCard
                  quote="Saved me weeks of work! 🎉 The AI generated exactly what I needed for my industrial attachment report. Professional quality and perfect formatting."
                  name="Sarah Mwangi"
                  role="Computer Science Student"
                  avatar="SM"
                  color="from-[#1CBF73] to-[#16A663]"
                />
                <TestimonialCard
                  quote="Amazing tool! Generated my 30-page report in under 5 minutes. The quality exceeded my expectations and my supervisor was impressed! 🚀"
                  name="David Mutua"
                  role="IT Student, JKUAT"
                  avatar="DM"
                  color="from-orange-500 to-orange-600"
                />
                <TestimonialCard
                  quote="Perfect for busy students! 📚 The AI captured all my experiences perfectly and created a professional report that got me an A+."
                  name="Grace Njeri"
                  role="Medical Student"
                  avatar="GN"
                  color="from-pink-500 to-pink-600"
                />

                {/* Duplicate set for seamless loop */}
                <TestimonialCard
                  quote="Saved me weeks of work! 🎉 The AI generated exactly what I needed for my industrial attachment report. Professional quality and perfect formatting."
                  name="Sarah Mwangi"
                  role="Computer Science Student"
                  avatar="SM"
                  color="from-[#1CBF73] to-[#16A663]"
                />
                <TestimonialCard
                  quote="Amazing tool! Generated my 30-page report in under 5 minutes. The quality exceeded my expectations and my supervisor was impressed! 🚀"
                  name="David Mutua"
                  role="IT Student, JKUAT"
                  avatar="DM"
                  color="from-orange-500 to-orange-600"
                />
                <TestimonialCard
                  quote="Perfect for busy students! 📚 The AI captured all my experiences perfectly and created a professional report that got me an A+."
                  name="Grace Njeri"
                  role="Medical Student"
                  avatar="GN"
                  color="from-pink-500 to-pink-600"
                />
              </div>
            </div>

            {/* Column 2 - Scrolling Down */}
            <div className="absolute left-1/3 w-1/3 px-3">
              <div className="animate-scroll-down space-y-6">
                {/* First set of testimonials */}
                <TestimonialCard
                  quote="Professional quality reports in minutes! The formatting was perfect and matched our university requirements exactly. Highly recommend! ⭐"
                  name="James Kiprotich"
                  role="Engineering Student"
                  avatar="JK"
                  color="from-blue-500 to-blue-600"
                />
                <TestimonialCard
                  quote="Incredible service! The report structure was exactly what my university required. Saved me so much stress during finals week! 🙌"
                  name="Alex Ochieng"
                  role="Architecture Student"
                  avatar="AO"
                  color="from-teal-500 to-teal-600"
                />
                <TestimonialCard
                  quote="Worth every shilling! 💰 The report quality was outstanding and the turnaround time was incredibly fast. Will definitely use again!"
                  name="Peter Maina"
                  role="Finance Student, UoN"
                  avatar="PM"
                  color="from-red-500 to-red-600"
                />

                {/* Duplicate set for seamless loop */}
                <TestimonialCard
                  quote="Professional quality reports in minutes! The formatting was perfect and matched our university requirements exactly. Highly recommend! ⭐"
                  name="James Kiprotich"
                  role="Engineering Student"
                  avatar="JK"
                  color="from-blue-500 to-blue-600"
                />
                <TestimonialCard
                  quote="Incredible service! The report structure was exactly what my university required. Saved me so much stress during finals week! 🙌"
                  name="Alex Ochieng"
                  role="Architecture Student"
                  avatar="AO"
                  color="from-teal-500 to-teal-600"
                />
                <TestimonialCard
                  quote="Worth every shilling! 💰 The report quality was outstanding and the turnaround time was incredibly fast. Will definitely use again!"
                  name="Peter Maina"
                  role="Finance Student, UoN"
                  avatar="PM"
                  color="from-red-500 to-red-600"
                />
              </div>
            </div>

            {/* Column 3 - Scrolling Up */}
            <div className="absolute right-0 w-1/3 pl-3">
              <div className="animate-scroll-up-delayed space-y-6">
                {/* First set of testimonials */}
                <TestimonialCard
                  quote="Best investment for my final year project! 💯 The AI understood exactly what I needed and delivered perfectly."
                  name="Mary Wanjiku"
                  role="Business Student"
                  avatar="MW"
                  color="from-purple-500 to-purple-600"
                />
                <TestimonialCard
                  quote="Game changer for students! ✨ The AI understood my field perfectly and created content that was both accurate and engaging."
                  name="Linda Kamau"
                  role="Psychology Student"
                  avatar="LK"
                  color="from-indigo-500 to-indigo-600"
                />
                <TestimonialCard
                  quote="Insta_Report made my attachment report writing so much easier. The structure was perfect and saved me countless hours of formatting!"
                  name="Kevin Otieno"
                  role="Mechanical Engineering"
                  avatar="KO"
                  color="from-green-500 to-green-600"
                />

                {/* Duplicate set for seamless loop */}
                <TestimonialCard
                  quote="Best investment for my final year project! 💯 The AI understood exactly what I needed and delivered perfectly."
                  name="Mary Wanjiku"
                  role="Business Student"
                  avatar="MW"
                  color="from-purple-500 to-purple-600"
                />
                <TestimonialCard
                  quote="Game changer for students! ✨ The AI understood my field perfectly and created content that was both accurate and engaging."
                  name="Linda Kamau"
                  role="Psychology Student"
                  avatar="LK"
                  color="from-indigo-500 to-indigo-600"
                />
                <TestimonialCard
                  quote="Insta_Report made my attachment report writing so much easier. The structure was perfect and saved me countless hours of formatting!"
                  name="Kevin Otieno"
                  role="Mechanical Engineering"
                  avatar="KO"
                  color="from-green-500 to-green-600"
                />

                {/* Duplicate set for seamless loop */}
                <TestimonialCard
                  quote="Best investment for my final year project! 💯 The AI understood exactly what I needed and delivered perfectly."
                  name="Mary Wanjiku"
                  role="Business Student"
                  avatar="MW"
                  color="from-purple-500 to-purple-600"
                />
                <TestimonialCard
                  quote="Game changer for students! ✨ The AI understood my field perfectly and created content that was both accurate and engaging."
                  name="Linda Kamau"
                  role="Psychology Student"
                  avatar="LK"
                  color="from-indigo-500 to-indigo-600"
                />
                <TestimonialCard
                  quote="Insta_Report made my attachment report writing so much easier. The structure was perfect and saved me countless hours of formatting!"
                  name="Kevin Otieno"
                  role="Mechanical Engineering"
                  avatar="KO"
                  color="from-green-500 to-green-600"
                />
              </div>
            </div>

            {/* Fade overlays */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#F5F6FA] to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F5F6FA] to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Flexible Pricing Based on Report Length
            </h2>
            <p className="text-lg md:text-xl text-gray-600 px-4">
              Pay only for the pages you need. No hidden fees, transparent pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* 1-10 Pages */}
            <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="text-sm text-gray-600 mb-2">Perfect for</div>
                <CardTitle className="text-xl text-gray-900 mb-2">1–10 Pages</CardTitle>
                <div className="text-3xl font-bold text-[#1CBF73]">KES 300</div>
                <div className="text-sm text-gray-500">Short reports & summaries</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Up to 10 pages</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>DOCX & PDF formats</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Professional formatting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Preview before payment</span>
                  </div>
                </div>
                <Link href="/auth" className="block">
                  <Button className="w-full bg-white border-2 border-[#1CBF73] text-[#1CBF73] hover:bg-[#1CBF73] hover:text-white transition-colors">
                    Generate Report
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 11-20 Pages */}
            <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="text-sm text-gray-600 mb-2">Great for</div>
                <CardTitle className="text-xl text-gray-900 mb-2">11–20 Pages</CardTitle>
                <div className="text-3xl font-bold text-[#1CBF73]">KES 500</div>
                <div className="text-sm text-gray-500">Standard academic reports</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Up to 20 pages</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>DOCX & PDF formats</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Professional formatting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Preview before payment</span>
                  </div>
                </div>
                <Link href="/auth" className="block">
                  <Button className="w-full bg-white border-2 border-[#1CBF73] text-[#1CBF73] hover:bg-[#1CBF73] hover:text-white transition-colors">
                    Generate Report
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 21-30 Pages - Most Popular */}
            <Card className="border-2 border-[#1CBF73] relative hover:shadow-xl transition-all duration-300 scale-105">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#1CBF73] text-white">
                Most Popular
              </Badge>
              <CardHeader className="text-center pb-4 pt-6">
                <div className="text-sm text-[#1CBF73] mb-2 font-medium">Recommended</div>
                <CardTitle className="text-xl text-gray-900 mb-2">21–30 Pages</CardTitle>
                <div className="text-3xl font-bold text-[#1CBF73]">KES 750</div>
                <div className="text-sm text-gray-500">Comprehensive reports</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Up to 30 pages</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>DOCX & PDF formats</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Professional formatting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Preview before payment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Priority support</span>
                  </div>
                </div>
                <Link href="/auth" className="block">
                  <Button className="w-full bg-[#1CBF73] hover:bg-[#16A663] text-white">Generate Report</Button>
                </Link>
              </CardContent>
            </Card>

            {/* 31-40 Pages */}
            <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="text-sm text-gray-600 mb-2">Best for</div>
                <CardTitle className="text-xl text-gray-900 mb-2">31–40 Pages</CardTitle>
                <div className="text-3xl font-bold text-[#1CBF73]">KES 999</div>
                <div className="text-sm text-gray-500">Detailed research reports</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Up to 40 pages</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>DOCX & PDF formats</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Professional formatting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Preview before payment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#1CBF73] mr-2 flex-shrink-0" />
                    <span>Rush delivery available</span>
                  </div>
                </div>
                <Link href="/auth" className="block">
                  <Button className="w-full bg-white border-2 border-[#1CBF73] text-[#1CBF73] hover:bg-[#1CBF73] hover:text-white transition-colors">
                    Generate Report
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 px-4">
            <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-gray-900 mb-2">Not sure how many pages you need?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Start generating your report and we'll automatically calculate the exact number of pages based on your
                content. You only pay after previewing your complete report.
              </p>
              <Link href="/auth">
                <Button className="bg-[#1CBF73] hover:bg-[#16A663] text-white px-8 py-2">Start Your Report Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Background Icons */}
      <footer className="relative bg-gray-900 text-white py-8 md:py-12 px-4 overflow-hidden">
        <FooterBackgroundIcons />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-3 md:mb-4">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-[#1CBF73] rounded-lg flex items-center justify-center">
                  <FileText className="w-3 h-3 md:w-5 md:h-5 text-white" />
                </div>
                <span className="text-lg md:text-xl font-bold">Insta_Report</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base">
                AI-powered academic report generation for students worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Product</h3>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li>
                  <Link href="#features" className="hover:text-[#1CBF73] transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-[#1CBF73] transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/auth" className="hover:text-[#1CBF73] transition-colors">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Support</h3>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li>
                  <Link href="/contact" className="hover:text-[#1CBF73] transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-[#1CBF73] transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-[#1CBF73] transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Legal</h3>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li>
                  <Link href="/terms" className="hover:text-[#1CBF73] transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#1CBF73] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-[#1CBF73] transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
            <p>&copy; 2024 Insta_Report. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Testimonial Card Component
function TestimonialCard({
  quote,
  name,
  role,
  avatar,
  color,
}: {
  quote: string
  name: string
  role: string
  avatar: string
  color: string
}) {
  return (
    <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 testimonial-card">
      <div className="flex items-center mb-3 md:mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-[#1CBF73] text-[#1CBF73]" />
        ))}
      </div>
      <p className="text-gray-700 mb-3 md:mb-4 leading-relaxed text-xs md:text-sm">{quote}</p>
      <div className="flex items-center">
        <div
          className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br ${color} rounded-full flex items-center justify-center mr-2 md:mr-3`}
        >
          <span className="text-white font-semibold text-xs md:text-sm">{avatar}</span>
        </div>
        <div>
          <p className="font-bold text-gray-900 text-xs md:text-sm">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  )
}
