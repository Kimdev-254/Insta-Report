import React, { useState } from 'react'
import { Button } from './ui/button'
import { Tooltip } from './ui/tooltip'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'

interface HumanizeReportProps {
  reportText: string
  isHumanized: boolean
  onHumanized?: (rewritten: string) => void
  onPayment?: () => void
}

export function HumanizeReport({ reportText, isHumanized, onHumanized, onPayment }: HumanizeReportProps) {
  const [loading, setLoading] = useState(false)
  const [rewritten, setRewritten] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')

  const handleHumanize = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/humanize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: reportText }),
      })
      const data = await res.json()
      if (data.rewritten) {
        setRewritten(data.rewritten)
        onHumanized?.(data.rewritten)
      } else {
        setError('Failed to humanize report.')
      }
    } catch (e) {
      setError('An error occurred.')
    }
    setLoading(false)
  }

  const handleDownload = () => {
    const blob = new Blob([rewritten], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'humanized-report.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          disabled={isHumanized || loading}
          onClick={() => setShowModal(true)}
        >
          🧠 Humanize My Report (KES 200)
        </Button>
        <Tooltip>
          <Badge>AI Detector Safe</Badge>
          <span className="ml-2">Avoid AI detectors like Turnitin. Ethically rewritten.</span>
        </Tooltip>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogTitle>Confirm Payment</DialogTitle>
          <p>
            This feature costs <b>KES 200</b>. Your report will be ethically rewritten to sound more human and bypass AI detectors.
          </p>
          <div className="flex gap-2 mt-4">
            <Button
              onClick={() => {
                setShowModal(false)
                onPayment?.() // Optionally trigger payment logic
                handleHumanize()
              }}
              disabled={loading}
            >
              {loading ? 'Humanizing...' : 'Proceed & Pay'}
            </Button>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {loading && <div className="text-blue-600">Humanizing...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {rewritten && (
        <div className="space-y-2">
          <textarea
            className="w-full p-2 border rounded bg-gray-50"
            rows={12}
            value={rewritten}
            readOnly
          />
          <Button onClick={handleDownload}>Download Humanized Report</Button>
        </div>
      )}
    </div>
  )
} 