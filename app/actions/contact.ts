'use server'

export interface ContactResult {
  success: boolean
  error?: string
}

export async function sendContactEmail(
  formData: FormData
): Promise<ContactResult> {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()

  if (!name || !email) {
    return { success: false, error: 'Name and email are required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  // Email sending is disabled — wire up SMTP/Resend here later
  return { success: true }
}
