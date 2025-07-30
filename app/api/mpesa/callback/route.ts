import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // Extract the relevant information from the callback
    const {
      Body: {
        stkCallback: {
          MerchantRequestID,
          CheckoutRequestID,
          ResultCode,
          ResultDesc,
          CallbackMetadata
        }
      }
    } = data

    // Get transaction details from metadata
    let amount = 0
    let mpesaReceiptNumber = ''
    let transactionDate = ''
    let phoneNumber = ''

    if (CallbackMetadata && CallbackMetadata.Item) {
      CallbackMetadata.Item.forEach((item: any) => {
        switch (item.Name) {
          case 'Amount':
            amount = item.Value
            break
          case 'MpesaReceiptNumber':
            mpesaReceiptNumber = item.Value
            break
          case 'TransactionDate':
            transactionDate = item.Value
            break
          case 'PhoneNumber':
            phoneNumber = item.Value
            break
        }
      })
    }

    // Update the transaction in the database
    const { error } = await supabase
      .from('mpesa_transactions')
      .update({
        result_code: ResultCode,
        result_desc: ResultDesc,
        amount: amount,
        transaction_code: mpesaReceiptNumber,
        transaction_date: transactionDate,
        phone_number: phoneNumber,
        status: ResultCode === 0 ? 'completed' : 'failed',
        completed_at: ResultCode === 0 ? new Date().toISOString() : null
      })
      .eq('checkout_request_id', CheckoutRequestID)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('M-Pesa callback error:', error)
    return NextResponse.json(
      { error: 'Failed to process callback' },
      { status: 500 }
    )
  }
}
