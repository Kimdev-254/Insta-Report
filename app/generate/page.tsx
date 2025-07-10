"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileText, Brain, CheckCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

const generationSteps = [
  { id: 1, title: "Analyzing your information", description: "Processing your academic and attachment details" },
  { id: 2, title: "Structuring content", description: "Organizing sections and creating outline" },
  { id: 3, title: "Generating content", description: "AI is writing your report content" },
  { id: 4, title: "Formatting document", description: "Applying your preferred styling" },
  { id: 5, title: "Final review", description: "Quality checking and finalizing" },
]

export default function GeneratePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            router.push("/preview")
          }, 1000)
          return 100
        }

        const newProgress = prev + Math.random() * 15
        const stepProgress = Math.floor(newProgress / 20) + 1
        setCurrentStep(Math.min(stepProgress, generationSteps.length))

        return Math.min(newProgress, 100)
      })
    }, 800)

    return () => clearInterval(interval)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6FA] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1CBF73] rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generating Your Report</h1>
          <p className="text-gray-600">
            Our AI is creating your professional academic report. This usually takes 2-3 minutes.
          </p>
        </div>

        {/* Progress Card */}
        <Card className="border-gray-200 shadow-lg mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1CBF73] mb-2">{Math.round(progress)}%</div>
                <Progress value={progress} className="h-3 bg-gray-200">
                  <div
                    className="h-full bg-[#1CBF73] transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </Progress>
              </div>

              <div className="space-y-4">
                {generationSteps.map((step, index) => {
                  const isActive = currentStep === step.id
                  const isCompleted = currentStep > step.id

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center p-4 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#1CBF73]/5 border border-[#1CBF73]/20"
                          : isCompleted
                            ? "bg-green-50 border border-green-200"
                            : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                          isActive
                            ? "bg-[#1CBF73] text-white"
                            : isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : isActive ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <span className="text-sm font-medium">{step.id}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`font-medium ${
                            isActive ? "text-[#1CBF73]" : isCompleted ? "text-green-700" : "text-gray-600"
                          }`}
                        >
                          {step.title}
                        </div>
                        <div className="text-sm text-gray-500">{step.description}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-gray-200">
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-[#1CBF73] mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-sm text-gray-600">
                Your report will meet academic standards with proper formatting and structure.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-[#1CBF73] mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Preview First</h3>
              <p className="text-sm text-gray-600">Review your complete report before making any payment.</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Please don't close this page while your report is being generated.</p>
        </div>
      </div>
    </div>
  )
}
