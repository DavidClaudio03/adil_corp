export const ACCEPTED_FILE_EXTENSIONS = ".jpg,.jpeg,.png,.webp,.heic,.heif,.pdf"

export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf"
] as const

export const MAX_FILE_SIZE_MB = 5
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

export type BankAccountInfo = {
  holderName: string
  idNumber: string
  bankName: string
  accountType: string
  accountNumber: string
  email: string
  phone: string
  referenceNote?: string
  notified_at?: string | null
  notification_error_message?: string | null
}

export const BANK_ACCOUNT: BankAccountInfo = {
  holderName: "ADIL CORP SERVICIOS AUTOMOTRICES",
  idNumber: "1723456789",
  bankName: "Banco Pichincha",
  accountType: "Cuenta de ahorros",
  accountNumber: "2203456789",
  email: "pagos@tusitio.com",
  phone: "+593 99 999 9999",
  referenceNote: "Usa la placa del vehículo como referencia de pago."
}

export const DEPOSIT_AMOUNT = 20
export const PAYMENT_PROOFS_BUCKET = "payment-proofs"
