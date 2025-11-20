export interface Booking {
  id: string
  name: string
  phone: string
  email: string
  plate: string
  date: string        // YYYY-MM-DD
  time: string        // "09:00", etc.
  deposit_amount: number
  payment_proof_path: string
  status: string
  created_at: string
  notified_at?: string | null
  notification_error_message?: string | null
}
