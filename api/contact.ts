// Vercel serverless function: sends the contact form through EmailJS.
// The EmailJS keys live only in Vercel environment variables, never in the
// browser bundle or the repo.

declare const process: { env: Record<string, string | undefined> }

const EMAILJS_URL = 'https://api.emailjs.com/api/v1.0/email/send'
const MAX = { from_name: 100, reply_to: 200, message: 5000 }

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

export async function POST(request: Request) {
  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY } =
    process.env
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
    return json(500, { error: 'Email service not configured' })
  }

  let data: Record<string, unknown>
  try {
    data = await request.json()
  } catch {
    return json(400, { error: 'Invalid body' })
  }

  // Honeypot: bots fill the hidden "website" field. Pretend success.
  if (typeof data.website === 'string' && data.website.trim() !== '') {
    return json(200, { ok: true })
  }

  const fromName = String(data.from_name ?? '').trim()
  const replyTo = String(data.reply_to ?? '').trim()
  const message = String(data.message ?? '').trim()

  if (!fromName || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
    return json(400, { error: 'Missing or invalid fields' })
  }
  if (
    fromName.length > MAX.from_name ||
    replyTo.length > MAX.reply_to ||
    message.length > MAX.message
  ) {
    return json(400, { error: 'Fields too long' })
  }

  const res = await fetch(EMAILJS_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY,
      template_params: { from_name: fromName, reply_to: replyTo, message },
    }),
  })

  if (!res.ok) {
    console.error('EmailJS error', res.status, await res.text())
    return json(502, { error: 'Could not send' })
  }
  return json(200, { ok: true })
}
