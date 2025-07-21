"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Edit, Eye, Search, Plus, Calendar, Filter } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { fetchPayments } from '@/lib/supabase'

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [payments, setPayments] = useState<any[]>([])
  const [paymentsLoading, setPaymentsLoading] = useState(true)
  const [paymentsError, setPaymentsError] = useState("")

  // TODO: Replace with actual user ID from auth context/session
  const userId = "mock-user-id" // Replace with real user ID

  useEffect(() => {
    async function fetchReports() {
      setLoading(true)
      setError("")
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
      if (error) setError(error.message)
      else setReports(data || [])
      setLoading(false)
    }
    fetchReports()
  }, [userId])

  useEffect(() => {
    async function getPayments() {
      setPaymentsLoading(true)
      setPaymentsError("")
      const { data, error } = await fetchPayments(userId)
      if (error) setPaymentsError(error.message)
      else setPayments(data || [])
      setPaymentsLoading(false)
    }
    getPayments()
  }, [userId])

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.organization_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || (report.status || "").toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6FA] to-white">
      {/* Header */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#1CBF73] rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Insta_Report</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/reports" className="text-[#1CBF73] font-medium">
                My Reports
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-[#1CBF73] transition-colors">
                Profile
              </Link>
              <Link href="/help" className="text-gray-600 hover:text-[#1CBF73] transition-colors">
                Help
              </Link>
            </nav>
            <Link href="/onboarding">
              <Button className="bg-[#1CBF73] hover:bg-[#16A663] text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                New Report
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl pt-24">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reports</h1>
          <p className="text-gray-600">Manage and download your generated reports</p>
        </div>

        {/* Filters and Search */}
        <Card className="border-gray-200 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-[#1CBF73]"
                />
              </div>
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 border-gray-200 focus:border-[#1CBF73]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 border-gray-200 focus:border-[#1CBF73]">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Grid */}
        {filteredReports.length === 0 ? (
          <Card className="border-gray-200">
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reports Found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "No reports match your current filters."
                  : "You haven't created any reports yet. Get started by creating your first report!"}
              </p>
              <Link href="/onboarding">
                <Button className="bg-[#1CBF73] hover:bg-[#16A663] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Report
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 line-clamp-2 mb-1">{report.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">{report.organization_name}</CardDescription>
                    </div>
                    <Badge
                      className={
                        report.status === "Completed"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }
                    >
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <div className="font-medium">{new Date(report.created_at).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Format:</span>
                      <div className="font-medium">{report.format}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Pages:</span>
                      <div className="font-medium">{report.pages} pages</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Size:</span>
                      <div className="font-medium">~{Math.round(report.pages * 0.8)}MB</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {report.status === "Completed" ? (
                      <>
                        <Button size="sm" className="flex-1 bg-[#1CBF73] hover:bg-[#16A663] text-white">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" className="flex-1 bg-[#1CBF73] hover:bg-[#16A663] text-white">
                          <Edit className="w-3 h-3 mr-1" />
                          Continue
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Card */}
        <Card className="border-gray-200 mt-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-[#1CBF73]">{reports.length}</div>
                <div className="text-sm text-gray-600">Total Reports</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {reports.filter((r) => r.status === "Completed").length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {reports.filter((r) => r.status === "Draft").length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">
                  {reports.reduce((sum, r) => sum + r.pages, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Pages</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments Dashboard */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Payments</h2>
          {paymentsLoading ? (
            <div className="text-gray-500">Loading payments...</div>
          ) : paymentsError ? (
            <div className="text-red-600">{paymentsError}</div>
          ) : payments.length === 0 ? (
            <div className="text-gray-600">No payments found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Method</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-t border-gray-100">
                      <td className="px-4 py-2 text-gray-900">KES {payment.amount}</td>
                      <td className="px-4 py-2 text-gray-700">{payment.payment_method}</td>
                      <td className="px-4 py-2">
                        <span className={
                          payment.status === 'completed'
                            ? 'bg-green-100 text-green-800 px-2 py-1 rounded text-xs'
                            : 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs'
                        }>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-600">{new Date(payment.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
