import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from '../api/contact'

const valid = { from_name: 'Ana', reply_to: 'ana@example.com', message: 'Hola Carlos', website: '' }

// The rate limiter keeps state for the whole module, so each test uses its own IPs
let ipCounter = 0
const nextIp = () => `203.0.113.${++ipCounter}`

function post(body: unknown, ip = nextIp()) {
  return POST(
    new Request('https://carlosramos.app/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  )
}

const emailjs = vi.fn()

beforeEach(() => {
  vi.stubEnv('EMAILJS_SERVICE_ID', 'service')
  vi.stubEnv('EMAILJS_TEMPLATE_ID', 'template')
  vi.stubEnv('EMAILJS_PUBLIC_KEY', 'public')
  vi.stubEnv('EMAILJS_PRIVATE_KEY', 'private')
  emailjs.mockReset().mockResolvedValue(new Response('OK', { status: 200 }))
  vi.stubGlobal('fetch', emailjs)
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('POST /api/contact', () => {
  it('sends a valid message through EmailJS with the private key', async () => {
    const res = await post(valid)
    expect(res.status).toBe(200)
    expect(emailjs).toHaveBeenCalledOnce()
    const sent = JSON.parse(emailjs.mock.calls[0][1].body)
    expect(sent.accessToken).toBe('private')
    expect(sent.template_params).toEqual({ from_name: 'Ana', reply_to: 'ana@example.com', message: 'Hola Carlos' })
  })

  it('rejects missing fields or an invalid email without calling EmailJS', async () => {
    expect((await post({ ...valid, from_name: '  ' })).status).toBe(400)
    expect((await post({ ...valid, reply_to: 'not-an-email' })).status).toBe(400)
    expect((await post({ ...valid, message: 'x'.repeat(5001) })).status).toBe(400)
    expect((await post('{not json')).status).toBe(400)
    expect(emailjs).not.toHaveBeenCalled()
  })

  it('fakes success for bots that fill the honeypot', async () => {
    const res = await post({ ...valid, website: 'https://spam.example' })
    expect(res.status).toBe(200)
    expect(emailjs).not.toHaveBeenCalled()
  })

  it('allows 3 messages per IP and blocks the 4th with 429', async () => {
    const ip = nextIp()
    const statuses = []
    for (let i = 0; i < 4; i++) statuses.push((await post(valid, ip)).status)
    expect(statuses).toEqual([200, 200, 200, 429])
    expect((await post(valid)).status).toBe(200)
  })

  it('returns 502 when EmailJS refuses the message', async () => {
    emailjs.mockResolvedValue(new Response('API access disabled', { status: 403 }))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect((await post(valid)).status).toBe(502)
  })

  it('returns 500 when the EmailJS keys are not configured', async () => {
    vi.stubEnv('EMAILJS_PRIVATE_KEY', '')
    expect((await post(valid)).status).toBe(500)
    expect(emailjs).not.toHaveBeenCalled()
  })
})
