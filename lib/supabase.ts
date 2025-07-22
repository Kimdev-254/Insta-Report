import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Insert a new report
type ReportInsert = {
  user_id: string;
  title: string;
  organization_name?: string;
  form_data: any;
  status?: string;
  [key: string]: any;
};
export async function insertReport(report: ReportInsert) {
  return supabase.from('reports').insert([report]);
}

// Insert a new payment
type PaymentInsert = {
  user_id: string;
  report_id: string;
  amount: number;
  payment_method: string;
  status?: string;
  [key: string]: any;
};
export async function insertPayment(payment: PaymentInsert) {
  return supabase.from('payments').insert([payment]);
}

// Fetch all payments for a user
export async function fetchPayments(user_id: string) {
  return supabase.from('payments').select('*').eq('user_id', user_id).order('created_at', { ascending: false });
} 