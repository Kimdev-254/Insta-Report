"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, FileText, Share } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const [downloadStarted, setDownloadStarted] = useState(false)

  const handleDownload = (format: string) => {
    setDownloadStarted(true)
    // Simulate download
    setTimeout(() => {
      setDownloadStarted(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6FA] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 text-lg">Your report has been generated and is ready for download.</p>
        </div>

        {/* Download Card */}
        <Card className="border-gray-200 shadow-lg mb-6">
          <CardHeader className="bg-green-50 border-b border-green-200">
            <CardTitle className="text-xl text-green-800 flex items-center">
              <FileText className="w-6 h-6 mr-2" />
              Industrial Attachment Report
            </CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-600">
                25 pages
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-sm">
                  <span className="text-gray-600">Student:</span>
                  <div className="font-medium">John Doe</div>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Organization:</span>
                  <div className="font-medium">ABC Technology Solutions</div>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Generated:</span>
                  <div className="font-medium">{new Date().toLocaleDateString()}</div>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Transaction ID:</span>
                  <div className="font-medium">QH12345678</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Download Your Report</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => handleDownload("docx")}
                    disabled={downloadStarted}
                    className="flex-1 bg-[#1CBF73] hover:bg-[#16A663] text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {downloadStarted ? "Downloading..." : "Download DOCX"}
                  </Button>
                  <Button
                    onClick={() => handleDownload("pdf")}
                    disabled={downloadStarted}
                    variant="outline"
                    className="flex-1 border-[#1CBF73] text-[#1CBF73] hover:bg-[#1CBF73]/5"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {downloadStarted ? "Downloading..." : "Download PDF"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card className="border-gray-200">
            <CardContent className="p-6 text-center">
              <Share className="w-8 h-8 text-[#1CBF73] mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Share Your Experience</h3>
              <p className="text-sm text-gray-600 mb-4">
                Help other students by sharing your experience with Insta_Report.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-[#1CBF73] text-[#1CBF73] hover:bg-[#1CBF73]/5 bg-transparent"
              >
                Leave a Review
              </Button>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-[#1CBF73] mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Need Another Report?</h3>
              <p className="text-sm text-gray-600 mb-4">Generate reports for other courses or projects with ease.</p>
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#1CBF73] text-[#1CBF73] hover:bg-[#1CBF73]/5 bg-transparent"
                >
                  Create New Report
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reports">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
              View My Reports
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-[#1CBF73] hover:bg-[#16A663] text-white">Back to Home</Button>
          </Link>
        </div>

        {/* Support Info */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Need help? Contact our support team at{" "}
            <a href="mailto:support@instareport.com" className="text-[#1CBF73] hover:underline">
              support@instareport.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
