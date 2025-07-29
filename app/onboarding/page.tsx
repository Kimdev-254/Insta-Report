"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileUpload } from "@/components/ui/file-upload"
import { uploadMultipleFiles } from "@/lib/upload"
import { 
  FileText,
  User,
  Building,
  FileCheck,
  Palette,
  Edit,
  Upload,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  FileUp,
  Info
} from "lucide-react"

const steps = [
  { id: 1, title: "Basic Info", icon: User, description: "Personal and academic details" },
  { id: 2, title: "Attachment Details", icon: Building, description: "Work placement information" },
  { id: 3, title: "Organization Structure", icon: Building, description: "Company hierarchy and structure" },
  { id: 4, title: "Document Structure", icon: FileCheck, description: "Report sections and components" },
  { id: 5, title: "Styling Preferences", icon: Palette, description: "Format and appearance settings" },
  { id: 6, title: "Content Inputs", icon: Edit, description: "Your experiences and insights" },
  { id: 7, title: "Additional Requirements", icon: Upload, description: "Required documents and supporting files" },
  { id: 8, title: "Summary", icon: CheckCircle, description: "Review and confirm details" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: "",
    admissionNumber: "",
    school: "",
    department: "",
    course: "",
    yearOfStudy: "",
    supervisor: "",
    institutionAddress: "",

    // Step 2: Attachment Details
    attachmentStartDate: "",
    attachmentEndDate: "",
    organizationName: "",
    organizationLocation: "",
    departmentWorkedIn: "",
    schedule: "",
    toolsUsed: "",

    // Step 3: Organization Structure
    organizationStructure: "",

    // Step 4: Document Structure (updated indices)
    includeDeclaration: true,
    includeDedication: true,
    includeAcknowledgment: true,
    includeAbstract: true,
    includeTOC: true,
    includeIntroduction: true,
    includeObjectives: true,
    includeLiteratureReview: true,
    includeWeeklyLog: true,
    includeChallenges: true,
    includeSkillsGained: true,
    includeRecommendations: true,
    includeConclusion: true,
    includeReferences: true,
    includeAppendices: true,

    // Step 5: Styling Preferences (updated indices)
    format: "both",
    font: "times-new-roman",
    fontSize: "12",
    lineSpacing: "1.5",
    margins: "normal",
    alignment: "justified",
    includePageNumbers: true,
    includeNameInHeader: true,

    // Step 6: Content Inputs (updated indices)
    weeklyLogs: Array(8).fill(""),
    skillsGained: "",
    challenges: "",
    recommendations: "",
    conclusion: "",

    // Step 7: Additional Requirements
    institutionLogo: null,
    sampleFormat: null,
    referenceFiles: [],
    weeklyPhotos: [],

    // New fields for auto-generation options
    autoGenerateOrgStructure: false,
    autoGenerateContentInputs: false,
    targetPageCount: "auto", // New field for page count selection
  })

  const router = useRouter()
  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Navigate to AI analysis
      router.push("/generate")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className="border-gray-200 focus:border-[#1CBF73]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admissionNumber">Admission Number *</Label>
                <Input
                  id="admissionNumber"
                  value={formData.admissionNumber}
                  onChange={(e) => updateFormData("admissionNumber", e.target.value)}
                  placeholder="e.g., CS/2021/001"
                  className="border-gray-200 focus:border-[#1CBF73]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="school">School/Faculty *</Label>
                <Input
                  id="school"
                  value={formData.school}
                  onChange={(e) => updateFormData("school", e.target.value)}
                  placeholder="e.g., School of Computing"
                  className="border-gray-200 focus:border-[#1CBF73]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => updateFormData("department", e.target.value)}
                  placeholder="e.g., Computer Science"
                  className="border-gray-200 focus:border-[#1CBF73]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course *</Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={(e) => updateFormData("course", e.target.value)}
                  placeholder="e.g., Bachelor of Computer Science"
                  className="border-gray-200 focus:border-[#1CBF73]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearOfStudy">Year of Study *</Label>
                <Select value={formData.yearOfStudy} onValueChange={(value) => updateFormData("yearOfStudy", value)}>
                  <SelectTrigger className="border-gray-200 focus:border-[#1CBF73]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">First Year</SelectItem>
                    <SelectItem value="2">Second Year</SelectItem>
                    <SelectItem value="3">Third Year</SelectItem>
                    <SelectItem value="4">Fourth Year</SelectItem>
                    <SelectItem value="5">Fifth Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supervisor">Supervisor(s)</Label>
              <Input
                id="supervisor"
                value={formData.supervisor}
                onChange={(e) => updateFormData("supervisor", e.target.value)}
                placeholder="e.g., Dr. Jane Smith, Prof. John Doe"
                className="border-gray-200 focus:border-[#1CBF73]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institutionAddress">Institution Address</Label>
              <Textarea
                id="institutionAddress"
                value={formData.institutionAddress}
                onChange={(e) => updateFormData("institutionAddress", e.target.value)}
                placeholder="Enter your institution's full address"
                className="border-gray-200 focus:border-[#1CBF73]"
                rows={3}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="attachmentStartDate">Attachment Start Date *</Label>
                <Input
                  id="attachmentStartDate"
                  type="date"
                  value={formData.attachmentStartDate}
                  onChange={(e) => updateFormData("attachmentStartDate", e.target.value)}
                  className="border-gray-200 focus:border-[#1CBF73]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attachmentEndDate">Attachment End Date *</Label>
                <Input
                  id="attachmentEndDate"
                  type="date"
                  value={formData.attachmentEndDate}
                  onChange={(e) => updateFormData("attachmentEndDate", e.target.value)}
                  className="border-gray-200 focus:border-[#1CBF73]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization Name *</Label>
              <Input
                id="organizationName"
                value={formData.organizationName}
                onChange={(e) => updateFormData("organizationName", e.target.value)}
                placeholder="e.g., ABC Technology Solutions"
                className="border-gray-200 focus:border-[#1CBF73]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizationLocation">Organization Location *</Label>
              <Input
                id="organizationLocation"
                value={formData.organizationLocation}
                onChange={(e) => updateFormData("organizationLocation", e.target.value)}
                placeholder="e.g., Nairobi, Kenya"
                className="border-gray-200 focus:border-[#1CBF73]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departmentWorkedIn">Department Worked In *</Label>
              <Input
                id="departmentWorkedIn"
                value={formData.departmentWorkedIn}
                onChange={(e) => updateFormData("departmentWorkedIn", e.target.value)}
                placeholder="e.g., IT Department, Software Development"
                className="border-gray-200 focus:border-[#1CBF73]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule">Daily/Weekly Schedule</Label>
              <Textarea
                id="schedule"
                value={formData.schedule}
                onChange={(e) => updateFormData("schedule", e.target.value)}
                placeholder="Describe your typical work schedule (e.g., Monday-Friday 8AM-5PM, specific tasks per day)"
                className="border-gray-200 focus:border-[#1CBF73]"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="toolsUsed">Tools/Technologies Used</Label>
              <Textarea
                id="toolsUsed"
                value={formData.toolsUsed}
                onChange={(e) => updateFormData("toolsUsed", e.target.value)}
                placeholder="List the tools, software, or technologies you worked with (e.g., Python, React, MySQL, Figma)"
                className="border-gray-200 focus:border-[#1CBF73]"
                rows={3}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-900 mb-2">Organization Structure</h3>
              <p className="text-sm text-blue-700">
                Help us understand the hierarchy and structure of the organization where you completed your internship.
                This will be used to provide context in your report.
              </p>
            </div>

            {/* Auto-generate option */}
            <div className="bg-[#1CBF73]/5 border border-[#1CBF73]/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="autoGenerateOrgStructure"
                  checked={formData.autoGenerateOrgStructure}
                  onChange={(e) => updateFormData("autoGenerateOrgStructure", e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-[#1CBF73] focus:ring-[#1CBF73]"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="autoGenerateOrgStructure"
                    className="text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    Let AI generate the organizational structure
                  </Label>
                  <p className="text-xs text-gray-600 mt-1">
                    Our AI will create a professional organizational structure based on your organization type and
                    industry standards.
                  </p>
                </div>
              </div>
            </div>

            {!formData.autoGenerateOrgStructure && (
              <div className="space-y-2">
                <Label htmlFor="organizationStructure" className="text-base font-medium">
                  Enter the structure of the organization where you did your internship *
                </Label>
                <p className="text-sm text-gray-600 mb-3">
                  You can list titles and hierarchy (e.g., CEO → Manager → Intern) or describe departments.
                </p>
                <Textarea
                  id="organizationStructure"
                  value={formData.organizationStructure}
                  onChange={(e) => updateFormData("organizationStructure", e.target.value)}
                  placeholder="CEO&#10;→ Head of Engineering&#10;→ ICT Department&#10;→ Intern (You)&#10;&#10;Or describe departments:&#10;• Executive Management&#10;• Human Resources&#10;• Information Technology&#10;• Finance & Accounting&#10;• Operations"
                  className="border-gray-200 focus:border-[#1CBF73] min-h-[200px]"
                  rows={10}
                />
              </div>
            )}

            {!formData.autoGenerateOrgStructure && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">💡 Tips for describing organization structure:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Use arrows (→) to show hierarchy levels</li>
                  <li>• Include your position in the structure</li>
                  <li>• Mention key departments you interacted with</li>
                  <li>• You can describe both formal hierarchy and functional departments</li>
                </ul>
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-sm text-gray-600 mb-4">
              Select which sections to include in your report. You can toggle any section on or off.
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { key: "includeDeclaration", label: "Declaration" },
                { key: "includeDedication", label: "Dedication" },
                { key: "includeAcknowledgment", label: "Acknowledgment" },
                { key: "includeAbstract", label: "Abstract" },
                { key: "includeTOC", label: "Table of Contents" },
                { key: "includeIntroduction", label: "Introduction" },
                { key: "includeObjectives", label: "Objectives" },
                { key: "includeLiteratureReview", label: "Literature Review" },
                { key: "includeWeeklyLog", label: "Weekly Log" },
                { key: "includeChallenges", label: "Challenges" },
                { key: "includeSkillsGained", label: "Skills Gained" },
                { key: "includeRecommendations", label: "Recommendations" },
                { key: "includeConclusion", label: "Conclusion" },
                { key: "includeReferences", label: "References" },
                { key: "includeAppendices", label: "Appendices" },
              ].map((section) => (
                <div
                  key={section.key}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <Label htmlFor={section.key} className="text-sm font-medium flex-1">
                    {section.label}
                  </Label>
                  <Switch
                    id={section.key}
                    checked={formData[section.key as keyof typeof formData] as boolean}
                    onCheckedChange={(checked) => updateFormData(section.key, checked)}
                    className="data-[state=checked]:bg-[#1CBF73] scale-75"
                  />
                </div>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Output Format *</Label>
              <Select value={formData.format} onValueChange={(value) => updateFormData("format", value)}>
                <SelectTrigger className="border-gray-200 focus:border-[#1CBF73]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="docx">DOCX only</SelectItem>
                  <SelectItem value="pdf">PDF only</SelectItem>
                  <SelectItem value="both">Both DOCX & PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Font Family</Label>
                <Select value={formData.font} onValueChange={(value) => updateFormData("font", value)}>
                  <SelectTrigger className="border-gray-200 focus:border-[#1CBF73]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="times-new-roman">Times New Roman</SelectItem>
                    <SelectItem value="arial">Arial</SelectItem>
                    <SelectItem value="calibri">Calibri</SelectItem>
                    <SelectItem value="georgia">Georgia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Font Size</Label>
                <Select value={formData.fontSize} onValueChange={(value) => updateFormData("fontSize", value)}>
                  <SelectTrigger className="border-gray-200 focus:border-[#1CBF73]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10pt</SelectItem>
                    <SelectItem value="11">11pt</SelectItem>
                    <SelectItem value="12">12pt</SelectItem>
                    <SelectItem value="14">14pt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Line Spacing</Label>
                <Select value={formData.lineSpacing} onValueChange={(value) => updateFormData("lineSpacing", value)}>
                  <SelectTrigger className="border-gray-200 focus:border-[#1CBF73]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.0">Single (1.0)</SelectItem>
                    <SelectItem value="1.5">1.5 spacing</SelectItem>
                    <SelectItem value="2.0">Double (2.0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Margins</Label>
                <Select value={formData.margins} onValueChange={(value) => updateFormData("margins", value)}>
                  <SelectTrigger className="border-gray-200 focus:border-[#1CBF73]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="narrow">Narrow (0.5")</SelectItem>
                    <SelectItem value="normal">Normal (1")</SelectItem>
                    <SelectItem value="wide">Wide (1.5")</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Page Count Selection */}
            <div className="space-y-2">
              <Label>Target Page Count</Label>
              <Select
                value={formData.targetPageCount}
                onValueChange={(value) => updateFormData("targetPageCount", value)}
              >
                <SelectTrigger className="border-gray-200 focus:border-[#1CBF73]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-calculate based on content</SelectItem>
                  <SelectItem value="10">Limit to 10 pages (KES 300)</SelectItem>
                  <SelectItem value="15">Limit to 15 pages (KES 500)</SelectItem>
                  <SelectItem value="20">Limit to 20 pages (KES 500)</SelectItem>
                  <SelectItem value="25">Target 25 pages (KES 750)</SelectItem>
                  <SelectItem value="30">Target 30 pages (KES 750)</SelectItem>
                  <SelectItem value="35">Target 35 pages (KES 999)</SelectItem>
                  <SelectItem value="40">Target 40 pages (KES 999)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Choose "Auto-calculate" to let AI determine the optimal length, or set a specific target.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <Label htmlFor="includePageNumbers" className="text-sm font-medium flex-1">
                  Include Page Numbers
                </Label>
                <Switch
                  id="includePageNumbers"
                  checked={formData.includePageNumbers}
                  onCheckedChange={(checked) => updateFormData("includePageNumbers", checked)}
                  className="data-[state=checked]:bg-[#1CBF73] scale-75"
                />
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <Label htmlFor="includeNameInHeader" className="text-sm font-medium flex-1">
                  Include Name in Header
                </Label>
                <Switch
                  id="includeNameInHeader"
                  checked={formData.includeNameInHeader}
                  onCheckedChange={(checked) => updateFormData("includeNameInHeader", checked)}
                  className="data-[state=checked]:bg-[#1CBF73] scale-75"
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            {/* Auto-generate option */}
            <div className="bg-[#1CBF73]/5 border border-[#1CBF73]/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="autoGenerateContentInputs"
                  checked={formData.autoGenerateContentInputs}
                  onChange={(e) => updateFormData("autoGenerateContentInputs", e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-[#1CBF73] focus:ring-[#1CBF73]"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="autoGenerateContentInputs"
                    className="text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    Let AI generate the content inputs
                  </Label>
                  <p className="text-xs text-gray-600 mt-1">
                    Our AI will create professional content for weekly logs, skills gained, challenges, and
                    recommendations based on your organization and field.
                  </p>
                </div>
              </div>
            </div>

            {!formData.autoGenerateContentInputs && (
              <>
                <div className="space-y-4">
                  <Label className="text-base font-medium">Weekly Log Entries</Label>
                  <div className="text-sm text-gray-600 mb-4">
                    Describe your activities and experiences for each week of your attachment.
                  </div>
                  {formData.weeklyLogs.map((log, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`week-${index + 1}`}>Week {index + 1}</Label>
                      <Textarea
                        id={`week-${index + 1}`}
                        value={log}
                        onChange={(e) => {
                          const newLogs = [...formData.weeklyLogs]
                          newLogs[index] = e.target.value
                          updateFormData("weeklyLogs", newLogs)
                        }}
                        placeholder={`Describe your activities and learnings in week ${index + 1}`}
                        className="border-gray-200 focus:border-[#1CBF73]"
                        rows={3}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skillsGained">Skills Gained</Label>
                  <Textarea
                    id="skillsGained"
                    value={formData.skillsGained}
                    onChange={(e) => updateFormData("skillsGained", e.target.value)}
                    placeholder="Describe the technical and soft skills you developed during your attachment"
                    className="border-gray-200 focus:border-[#1CBF73]"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges">Challenges Faced</Label>
                  <Textarea
                    id="challenges"
                    value={formData.challenges}
                    onChange={(e) => updateFormData("challenges", e.target.value)}
                    placeholder="Describe any challenges you encountered and how you overcame them"
                    className="border-gray-200 focus:border-[#1CBF73]"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recommendations">Recommendations</Label>
                  <Textarea
                    id="recommendations"
                    value={formData.recommendations}
                    onChange={(e) => updateFormData("recommendations", e.target.value)}
                    placeholder="Your recommendations for the organization or future students"
                    className="border-gray-200 focus:border-[#1CBF73]"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conclusion">Conclusion</Label>
                  <Textarea
                    id="conclusion"
                    value={formData.conclusion}
                    onChange={(e) => updateFormData("conclusion", e.target.value)}
                    placeholder="Summarize your overall experience and key takeaways"
                    className="border-gray-200 focus:border-[#1CBF73]"
                    rows={4}
                  />
                </div>
              </>
            )}
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-sm text-gray-600 mb-4">
              Upload any supporting files that will help generate a better report. All uploads are optional.
            </div>    

            <div className="grid gap-6">
              <FileUpload
                id="institution-logo"
                label="Institution Logo"
                description="Upload your institution's logo (Optional)"
                accept="image/jpeg,image/png"
                maxSize={2}
                onUpload={async (files) => {
                  const urls = await uploadMultipleFiles(files, 'logos')
                  updateFormData('institutionLogo', urls[0])
                }}
              />

              <FileUpload
                id="sample-format"
                label="Sample Format"
                description="Upload a sample report format from your institution (Optional)"
                accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                maxSize={5}
                onUpload={async (files) => {
                  const urls = await uploadMultipleFiles(files, 'samples')
                  updateFormData('sampleFormat', urls[0])
                }}
              />

              <FileUpload
                id="reference-files"
                label="Reference Files"
                description="Upload any reference materials or documents (Optional)"
                accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                maxSize={10}
                multiple
                maxFiles={5}
                onUpload={async (files) => {
                  const urls = await uploadMultipleFiles(files, 'references')
                  updateFormData('referenceFiles', urls)
                }}
              />

              <FileUpload
                id="weekly-photos"
                label="Weekly Log Photos"
                description="Upload up to 10 photos of your handwritten weekly logs"
                accept="image/jpeg,image/png"
                maxSize={5}
                multiple
                maxFiles={10}
                onUpload={async (files) => {
                  const urls = await uploadMultipleFiles(files, 'weekly-logs')
                  updateFormData('weeklyPhotos', urls)
                }}
              />
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Your Information</h3>
              <p className="text-gray-600">Please review all the information below before generating your report.</p>
            </div>

            <div className="space-y-4">
              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <User className="w-5 h-5 mr-2 text-[#1CBF73]" />
                      Basic Information
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="text-[#1CBF73]">
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {formData.fullName || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">Admission No:</span> {formData.admissionNumber || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">School:</span> {formData.school || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">Course:</span> {formData.course || "Not provided"}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Building className="w-5 h-5 mr-2 text-[#1CBF73]" />
                      Attachment Details
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)} className="text-[#1CBF73]">
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Organization:</span> {formData.organizationName || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {formData.organizationLocation || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">Department:</span> {formData.departmentWorkedIn || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span>{" "}
                      {formData.attachmentStartDate && formData.attachmentEndDate
                        ? `${formData.attachmentStartDate} to ${formData.attachmentEndDate}`
                        : "Not provided"}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Building className="w-5 h-5 mr-2 text-[#1CBF73]" />
                      Organization Structure
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)} className="text-[#1CBF73]">
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-sm">
                    <span className="font-medium">Structure:</span>
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      <pre className="whitespace-pre-wrap text-gray-700">
                        {formData.organizationStructure || "Not provided"}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Palette className="w-5 h-5 mr-2 text-[#1CBF73]" />
                      Format Preferences
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(5)} className="text-[#1CBF73]">
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Format:</span>{" "}
                      {formData.format === "both" ? "DOCX & PDF" : formData.format.toUpperCase()}
                    </div>
                    <div>
                      <span className="font-medium">Font:</span>{" "}
                      {formData.font.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </div>
                    <div>
                      <span className="font-medium">Font Size:</span> {formData.fontSize}pt
                    </div>
                    <div>
                      <span className="font-medium">Line Spacing:</span> {formData.lineSpacing}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-[#1CBF73]/5 border border-[#1CBF73]/20 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-[#1CBF73] mr-2" />
                <span className="font-medium text-[#1CBF73]">Ready to Generate</span>
              </div>
              <p className="text-sm text-gray-700">
                Your report will be generated based on the information provided above. You'll be able to preview it
                before making any payment.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6FA] to-white">
      {/* Header */}
      <header className="fixed top-2 md:top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl mx-auto px-2 md:px-4">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl shadow-lg px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-[#1CBF73] rounded-lg flex items-center justify-center">
                <FileText className="w-3 h-3 md:w-5 md:h-5 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold text-gray-900">Insta_Report</span>
            </div>
            <Badge
              variant="outline"
              className="border-[#1CBF73] text-[#1CBF73] bg-white/50 text-xs md:text-sm px-2 py-1"
            >
              Step {currentStep} of {steps.length}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl pt-20 md:pt-24">
        {/* Progress Bar */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Create Your Report</h1>
            <span className="text-xs md:text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200">
            <div
              className="h-full bg-[#1CBF73] transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>

        {/* Step Navigation */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between overflow-x-auto pb-4 scrollbar-hide">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isActive
                          ? "bg-[#1CBF73] border-[#1CBF73] text-white"
                          : isCompleted
                            ? "bg-[#1CBF73] border-[#1CBF73] text-white"
                            : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                      ) : (
                        <StepIcon className="w-4 h-4 md:w-5 md:h-5" />
                      )}
                    </div>
                    <div className="mt-2 text-center max-w-16 md:max-w-none">
                      <div
                        className={`text-xs font-medium ${
                          isActive ? "text-[#1CBF73]" : isCompleted ? "text-[#1CBF73]" : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-400 hidden md:block">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 md:w-12 h-0.5 mx-2 md:mx-4 ${isCompleted ? "bg-[#1CBF73]" : "bg-gray-300"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              {React.createElement(steps[currentStep - 1].icon, { className: "w-6 h-6 mr-2 text-[#1CBF73]" })}
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6 md:mt-8 px-2">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent px-4 py-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>

          <div className="text-xs md:text-sm text-gray-500">
            {currentStep} / {steps.length}
          </div>

          <Button onClick={handleNext} className="bg-[#1CBF73] hover:bg-[#16A663] text-white px-4 py-2">
            {currentStep === steps.length ? (
              <>
                <span className="hidden sm:inline">Generate Report</span>
                <span className="sm:hidden">Generate</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
