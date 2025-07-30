import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Loader2, CheckCircle, X } from "lucide-react"
import { toast } from "sonner"

interface MpesaPaymentProps {
  amount: number
  onSuccess: () => void
  onClose: () => void
}

export function MpesaPayment({ amount, onSuccess, onClose }: MpesaPaymentProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [mpesaCode, setMpesaCode] = useState("")
  const [status, setStatus] = useState<"input" | "processing" | "confirm">("input")
  const [isVerifying, setIsVerifying] = useState(false)

  const handlePhoneSubmit = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number")
      return
    }

    try {
      setStatus("processing")
      const response = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          amount,
          accountReference: "INSTA_REPORT",
          transactionDesc: "Report Payment"
        })
      })

      if (!response.ok) throw new Error("Failed to initiate payment")
      
      setStatus("confirm")
      toast.success("Payment request sent to your phone")
    } catch (error) {
      toast.error("Failed to initiate payment. Please try again.")
      setStatus("input")
    }
  }

  const verifyPayment = async () => {
    if (!mpesaCode || mpesaCode.length < 10) {
      toast.error("Please enter a valid M-Pesa code")
      return
    }

    try {
      setIsVerifying(true)
      const response = await fetch("/api/mpesa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mpesaCode })
      })

      if (!response.ok) throw new Error("Payment verification failed")

      toast.success("Payment verified successfully!")
      onSuccess()
    } catch (error) {
      toast.error("Payment verification failed. Please check your code.")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">M-Pesa Payment</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Amount Display */}
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <p className="text-center">
          <span className="block text-sm text-green-800">Amount to Pay</span>
          <span className="block text-2xl font-bold text-green-700 mt-1">KES {amount}</span>
        </p>
      </div>

      {status === "input" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">M-Pesa Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="07xxxxxxxx"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button 
            onClick={handlePhoneSubmit} 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!phoneNumber || phoneNumber.length < 10}
          >
            Request Payment
          </Button>
        </div>
      )}

      {status === "processing" && (
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto" />
          <p className="text-gray-600">Sending payment request to {phoneNumber}...</p>
        </div>
      )}

      {status === "confirm" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mpesa-code">Enter M-Pesa Code</Label>
            <Input
              id="mpesa-code"
              placeholder="e.g., QK12ABCDEF"
              value={mpesaCode}
              onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
              className="text-center uppercase"
              maxLength={10}
            />
          </div>
          <Button 
            onClick={verifyPayment} 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4 mr-2" />
            )}
            {isVerifying ? "Verifying..." : "Verify Payment"}
          </Button>
        </div>
      )}
    </div>
  )
}
