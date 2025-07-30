import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { mpesaCode } = await req.json()

    // Validate code format
    if (!mpesaCode || !/^[A-Z0-9]{10}$/.test(mpesaCode)) {
      return NextResponse.json(
        { error: 'Invalid M-Pesa code format' },
        { status: 400 }
      )
    }

    // Check if code already exists
    const { data: existingPayment } = await supabase
      .from('mpesa_transactions')
      .select('id')
      .eq('transaction_code', mpesaCode)
      .single()

    if (existingPayment) {
      return NextResponse.json(
        { error: 'This M-Pesa code has already been used' },
        { status: 400 }
      )
    }

    // Verify with M-Pesa API
    // Here you would typically verify the transaction with M-Pesa's API
    // For now, we'll simulate verification
    const isValid = true 

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid M-Pesa code' },
        { status: 400 }
      )
    }

    // Update transaction record
    const { error: updateError } = await supabase
      .from('mpesa_transactions')
      .update({
        transaction_code: mpesaCode,
        status: 'completed',
        verified_at: new Date().toISOString()
      })
      .eq('transaction_code', mpesaCode)

    if (updateError) throw updateError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}
