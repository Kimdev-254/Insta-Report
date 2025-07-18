"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, ArrowLeft, Lock, Copy, CheckCircle, CreditCard, X, Info, Loader2, Phone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { estimatePageCount } from "@/lib/utils"

export default function PreviewPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"input" | "processing" | "confirm">("input")
  const router = useRouter()

  const handleCopySection = async (sectionName: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedSection(sectionName)
      setTimeout(() => setCopiedSection(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleSTKPush = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid phone number")
      return
    }

    setIsProcessing(true)
    setPaymentStep("processing")

    try {
      // Simulate STK Push API call
      const response = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          amount: 999,
          accountReference: "INSTA_REPORT",
          transactionDesc: "Payment for Full Report Access",
        }),
      })

      if (response.ok) {
        setPaymentStep("confirm")
        // Simulate waiting for user confirmation on phone
        setTimeout(() => {
          setIsProcessing(false)
          setShowPaymentModal(false)
          router.push("/success")
        }, 8000) // 8 seconds to simulate user confirming on phone
      } else {
        throw new Error("STK Push failed")
      }
    } catch (error) {
      console.error("Payment error:", error)
      setIsProcessing(false)
      setPaymentStep("input")
      alert("Payment failed. Please try again.")
    }
  }

  const resetPaymentModal = () => {
    setShowPaymentModal(false)
    setPaymentStep("input")
    setIsProcessing(false)
    setPhoneNumber("")
  }

  // Simulate dynamic report content (replace with real data in production)
  const sampleReportData = {
    title: "INDUSTRIAL ATTACHMENT REPORT",
    subtitle: "A Report on Industrial Attachment at ABC Technology Solutions",
    studentName: "John Doe",
    admissionNumber: "CS/2021/001",
    course: "Bachelor of Computer Science",
    school: "School of Computing and Informatics",
    university: "University of Nairobi",
    supervisor: "Dr. Jane Smith",
    date: "December 2024",
    introduction: `This report presents a comprehensive overview of my industrial attachment experience at ABC Technology Solutions, conducted from June 2024 to August 2024. The attachment was undertaken as a partial fulfillment of the requirements for the Bachelor of Computer Science degree program.

During this period, I was exposed to real-world software development practices, project management methodologies, and professional work environments. The experience provided invaluable insights into the practical application of theoretical knowledge gained throughout my academic journey.

ABC Technology Solutions is a leading software development company specializing in web applications, mobile development, and enterprise solutions. The company has been operational for over 8 years and serves clients across East Africa. Their commitment to innovation and quality made them an ideal choice for my industrial attachment.

This report details my experiences, learning outcomes, challenges faced, and recommendations for future improvements. It serves as a reflection of the knowledge and skills acquired during the attachment period and demonstrates the practical relevance of my academic studies.`,
    objectives: `The primary objectives of this industrial attachment were carefully designed to align with my academic goals and career aspirations:

**General Objective:**
To gain practical experience in software development and understand the professional work environment in the technology industry.

**Specific Objectives:**

1. **Technical Skills Development:** To enhance my programming skills in modern web technologies including React.js, Node.js, and database management systems.

2. **Professional Experience:** To understand workplace dynamics, professional communication, and collaborative software development practices.

3. **Project Management:** To learn about project lifecycle management, agile methodologies, and software development best practices.

4. **Industry Exposure:** To gain insights into current industry trends, challenges, and opportunities in the technology sector.

5. **Network Building:** To establish professional relationships and mentorship opportunities within the technology industry.

6. **Problem-Solving Skills:** To develop analytical and problem-solving abilities through real-world project challenges.

These objectives were designed to bridge the gap between theoretical knowledge and practical application, ensuring a comprehensive learning experience that would benefit my future career in technology.`,
    literatureReview: `The concept of industrial attachment has been widely studied in academic literature as a
    crucial component of experiential learning. According to Smith et al. (2020), industrial
    attachments provide students with opportunities to apply theoretical knowledge in practical
    settings...`,
  }

  // Combine all sections for page count estimation
  const fullReportText = [
    sampleReportData.introduction,
    sampleReportData.objectives,
    sampleReportData.literatureReview,
  ].join("\n\n")

  const pageCount = estimatePageCount(fullReportText)

  // Pricing tiers
  const getPriceTier = (pages: number) => {
    if (pages <= 10) return { price: 300, label: "1-10 pages" }
    if (pages <= 20) return { price: 500, label: "11-20 pages" }
    if (pages <= 30) return { price: 750, label: "21-30 pages" }
    return { price: 999, label: "31-40 pages" }
  }
  const priceTier = getPriceTier(pageCount)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/onboarding">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#1CBF73]">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Edit
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#1CBF73]" />
                <h1 className="text-xl font-semibold text-gray-900">Your Report Preview</h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="border-[#1CBF73] text-[#1CBF73] bg-[#1CBF73]/5">
                Preview Mode
              </Badge>
              <Button onClick={() => setShowPaymentModal(true)} className="bg-[#1CBF73] hover:bg-[#16A663] text-white">
                <CreditCard className="w-4 h-4 mr-2" />
                Unlock Full Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Info Notice */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800">
                  <strong>Preview Available:</strong> You can copy the introduction and objectives for review. The rest
                  will be available after payment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Content */}
        <Card className="shadow-lg border-gray-200">
          <CardContent className="p-0">
            <ScrollArea className="h-[800px]">
              <div className="p-8 bg-white">
                {/* Cover Page */}
                <section className="mb-12 text-center border-b border-gray-200 pb-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">
                        {sampleReportData.title}
                      </h1>
                      <h2 className="text-xl text-gray-700 font-medium">{sampleReportData.subtitle}</h2>
                    </div>

                    <div className="space-y-8 mt-12">
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-gray-900">Submitted by:</p>
                        <p className="text-gray-700">{sampleReportData.studentName}</p>
                        <p className="text-gray-700">{sampleReportData.admissionNumber}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-gray-900">Course:</p>
                        <p className="text-gray-700">{sampleReportData.course}</p>
                        <p className="text-gray-700">{sampleReportData.school}</p>
                        <p className="text-gray-700">{sampleReportData.university}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-gray-900">Supervisor:</p>
                        <p className="text-gray-700">{sampleReportData.supervisor}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-gray-900">Date:</p>
                        <p className="text-gray-700">{sampleReportData.date}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Table of Contents */}
                <section className="mb-12 border-b border-gray-200 pb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-[#1CBF73] pb-2">
                      TABLE OF CONTENTS
                    </h2>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span>Declaration</span>
                      <span>i</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dedication</span>
                      <span>ii</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Acknowledgment</span>
                      <span>iii</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Abstract</span>
                      <span>iv</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Table of Contents</span>
                      <span>v</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>1. Introduction</span>
                      <span>1</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>2. Objectives</span>
                      <span>3</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>3. Literature Review</span>
                      <span>5</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>4. Organization Overview</span>
                      <span>8</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>5. Weekly Log</span>
                      <span>12</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>6. Skills Gained</span>
                      <span>18</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>7. Challenges</span>
                      <span>20</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>8. Recommendations</span>
                      <span>22</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>9. Conclusion</span>
                      <span>24</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>References</span>
                      <span>26</span>
                    </div>
                  </div>
                </section>

                {/* Introduction - Unlocked */}
                <section className="mb-12 border-b border-gray-200 pb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-[#1CBF73] pb-2">
                      1. INTRODUCTION
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopySection("Introduction", sampleReportData.introduction)}
                      className="border-[#1CBF73] text-[#1CBF73] hover:bg-[#1CBF73]/5"
                    >
                      {copiedSection === "Introduction" ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed text-justify mb-4">{sampleReportData.introduction}</p>
                  </div>
                </section>

                {/* Objectives - Unlocked */}
                <section className="mb-12 border-b border-gray-200 pb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-[#1CBF73] pb-2">2. OBJECTIVES</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopySection("Objectives", sampleReportData.objectives)}
                      className="border-[#1CBF73] text-[#1CBF73] hover:bg-[#1CBF73]/5"
                    >
                      {copiedSection === "Objectives" ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed text-justify mb-4">{sampleReportData.objectives}</p>
                  </div>
                </section>

                {/* Locked Content Overlay */}
                <div className="relative">
                  {/* Blurred/Faded Content */}
                  <div className="select-none pointer-events-none" style={{ userSelect: "none" }}>
                    <section className="mb-12 border-b border-gray-200 pb-8 blur-sm opacity-40">
                      <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-6">
                        3. LITERATURE REVIEW
                      </h2>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed text-justify">
                          {sampleReportData.literatureReview}
                        </p>
                      </div>
                    </section>

                    <section className="mb-12 border-b border-gray-200 pb-8 blur-sm opacity-40">
                      <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-6">
                        4. ORGANIZATION OVERVIEW
                      </h2>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed text-justify">
                          ABC Technology Solutions was established in 2016 with the vision of providing innovative
                          software solutions to businesses across East Africa. The company has grown from a small
                          startup to a medium-sized enterprise...
                        </p>
                      </div>
                    </section>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white flex items-center justify-center">
                    <Card className="max-w-md mx-4 border-2 border-[#1CBF73] shadow-xl">
                      <CardHeader className="text-center pb-4">
                        <div className="w-16 h-16 bg-[#1CBF73]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Lock className="w-8 h-8 text-[#1CBF73]" />
                        </div>
                        <CardTitle className="text-xl text-gray-900">Unlock the Full Report</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center space-y-4">
                        <p className="text-gray-600">
                          Get access to all sections including Literature Review, Weekly Logs, Skills Gained, and more.
                        </p>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-[#1CBF73]">KES {priceTier.price}</p>
                          <p className="text-sm text-gray-500">Complete report • DOCX & PDF formats</p>
                        </div>
                        <Button
                          onClick={() => setShowPaymentModal(true)}
                          className="w-full bg-[#1CBF73] hover:bg-[#16A663] text-white"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Unlock Full Report – KES {priceTier.price}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* M-Pesa STK Push Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg border-gray-200 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100">
              <CardTitle className="text-xl text-gray-900">
                {paymentStep === "input" && "Unlock Your Full Report"}
                {paymentStep === "processing" && "Processing Payment"}
                {paymentStep === "confirm" && "Confirm Payment"}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={resetPaymentModal} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {paymentStep === "input" && (
                <>
                  {/* Report Details */}
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-[#1CBF73]/10 rounded-full flex items-center justify-center mx-auto">
                      <FileText className="w-8 h-8 text-[#1CBF73]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Your report is {pageCount} pages</h3>
                      <p className="text-gray-600">Industrial Attachment Report - ABC Technology Solutions</p>
                    </div>
                  </div>

                  {/* Dynamic Pricing */}
                  <div className="bg-[#1CBF73]/5 border border-[#1CBF73]/20 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-900">Report Cost ({priceTier.label})</span>
                      <span className="text-2xl font-bold text-[#1CBF73]">KES {priceTier.price}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      ✓ Complete {pageCount}-page report • ✓ DOCX & PDF formats • ✓ Professional formatting
                    </div>
                  </div>

                  {/* Pricing Reference */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Pricing Tiers Reference:</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>1-10 pages</span>
                        <span>KES 300</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>11-20 pages</span>
                        <span>KES 500</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1CBF73]/10 border border-[#1CBF73]/30 rounded">
                        <span className="font-medium">21-30 pages</span>
                        <span className="font-medium text-[#1CBF73]">KES 750</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>31-40 pages</span>
                        <span>KES 999</span>
                      </div>
                    </div>
                  </div>

                  {/* Page Adjustment */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Need to adjust page count? (Optional)</Label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1CBF73] focus:border-[#1CBF73] text-sm">
                      <option value="28">Keep auto-calculated ({pageCount} pages) - KES {priceTier.price}</option>
                      <option value="20">Limit to 20 pages - KES 500</option>
                      <option value="30">Extend to 30 pages - KES 750</option>
                      <option value="35">Extend to 35 pages - KES 999</option>
                    </select>
                    <p className="text-xs text-gray-500">
                      Not sure? We'll auto-calculate after generation and you can preview before paying.
                    </p>
                  </div>

                  {/* M-Pesa Payment */}
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center mr-2">
                          M
                        </div>
                        <span className="font-medium text-green-800">M-Pesa STK Push</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Enter your M-Pesa number below. You'll receive a payment prompt on your phone.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                        M-Pesa Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="0712345678"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="pl-10 border-gray-300 focus:border-[#1CBF73] focus:ring-[#1CBF73]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={resetPaymentModal}
                      className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSTKPush}
                      disabled={!phoneNumber || phoneNumber.length < 10}
                      className="flex-1 bg-[#1CBF73] hover:bg-[#16A663] text-white"
                    >
                      Pay KES {priceTier.price}
                    </Button>
                  </div>
                </>
              )}

              {paymentStep === "processing" && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#1CBF73]/10 rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="w-8 h-8 text-[#1CBF73] animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Sending Payment Request</h3>
                    <p className="text-sm text-gray-600">
                      We're sending a payment request for <strong>KES {priceTier.price}</strong> to <strong>{phoneNumber}</strong>
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Next:</strong> Check your phone for the M-Pesa payment prompt and enter your PIN to
                      complete the payment.
                    </p>
                  </div>
                </div>
              )}

              {paymentStep === "confirm" && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Check Your Phone</h3>
                    <p className="text-sm text-gray-600">
                      A payment request has been sent to <strong>{phoneNumber}</strong>
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                      <strong>Action Required:</strong> Please check your phone and enter your M-Pesa PIN to complete
                      the payment of <strong>KES {priceTier.price}</strong> for your {pageCount}-page report.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Waiting for payment confirmation...</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
