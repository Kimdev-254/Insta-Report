import { z } from 'zod'

// Report validation schema
export const reportSchema = z.object({
  user_id: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(255),
  organization_name: z.string().optional(),
  form_data: z.record(z.any()),
  status: z.enum(['draft', 'pending', 'completed', 'failed']).default('draft'),
})

// Payment validation schema
export const paymentSchema = z.object({
  user_id: z.string().uuid(),
  report_id: z.string().uuid(),
  amount: z.number().positive('Amount must be positive'),
  payment_method: z.enum(['credit_card', 'debit_card', 'bank_transfer']),
  status: z.enum(['pending', 'completed', 'failed']).default('pending'),
})

export type Report = z.infer<typeof reportSchema>
export type Payment = z.infer<typeof paymentSchema>

// Validation functions
export function validateReport(data: unknown) {
  try {
    const validatedData = reportSchema.parse(data)
    return { data: validatedData, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export function validatePayment(data: unknown) {
  try {
    const validatedData = paymentSchema.parse(data)
    return { data: validatedData, error: null }
  } catch (error) {
    return { data: null, error }
  }
}
