import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// M-Pesa API credentials
const consumerKey = process.env.MPESA_CONSUMER_KEY!
const consumerSecret = process.env.MPESA_CONSUMER_SECRET!
const businessShortCode = process.env.MPESA_SHORTCODE!
const passkey = process.env.MPESA_PASSKEY!
const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`

export async function POST(req: Request) {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc } = await req.json()

    // Validate input
    if (!phoneNumber || !amount) {
      return NextResponse.json(
        { error: 'Phone number and amount are required' },
        { status: 400 }
      )
    }

    // Format phone number to include country code if needed
    const formattedPhone = phoneNumber.startsWith('254') 
      ? phoneNumber 
      : `254${phoneNumber.slice(1)}`

    // Get OAuth token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    const tokenResponse = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })

    const { access_token } = await tokenResponse.json()

    // Generate timestamp
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
    const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString('base64')

    // Initiate STK Push
    const stkResponse = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: businessShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: businessShortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: callbackUrl,
        AccountReference: accountReference,
        TransactionDesc: transactionDesc,
      }),
    })

    const stkData = await stkResponse.json()

    if (stkData.ResponseCode === '0') {
      // Store the checkout request ID in the database
      const { error } = await supabase
        .from('mpesa_transactions')
        .insert({
          checkout_request_id: stkData.CheckoutRequestID,
          phone_number: formattedPhone,
          amount: amount,
          status: 'pending'
        })

      if (error) throw error

      return NextResponse.json({
        success: true,
        checkoutRequestId: stkData.CheckoutRequestID
      })
    }

    throw new Error('STK push failed')
  } catch (error) {
    console.error('STK Push error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    )
  }
}
