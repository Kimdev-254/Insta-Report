import { createClient } from '@supabase/supabase-js'
import { validateReport, validatePayment } from './validation'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

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
  try {
    const validation = validateReport(report);
    if (validation.error) {
      throw new Error('Invalid report data');
    }
    
    const { data, error } = await supabase.from('reports').insert([validation.data]).select().single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error inserting report:', error);
    return { data: null, error };
  }
}

// Fetch reports for a user
export async function fetchReports(user_id: string) {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching reports:', error);
    return { data: null, error };
  }
}

// Update report status
export async function updateReportStatus(report_id: string, status: string) {
  try {
    const { data, error } = await supabase
      .from('reports')
      .update({ status })
      .eq('id', report_id)
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating report status:', error);
    return { data: null, error };
  }
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
  try {
    const { data, error } = await supabase.from('payments').insert([payment]).select().single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error inserting payment:', error);
    return { data: null, error };
  }
}

// Fetch all payments for a user
export async function fetchPayments(user_id: string) {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*, reports(*)')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching payments:', error);
    return { data: null, error };
  }
}

// Get report by ID
export async function getReportById(report_id: string) {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', report_id)
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching report:', error);
    return { data: null, error };
  }
} 