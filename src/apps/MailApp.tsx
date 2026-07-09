import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import { CheckCircle, PaperPlaneTilt, WarningCircle } from '@phosphor-icons/react'
import { profile } from '../data/portfolio'

type Status = 'idle' | 'sending' | 'ok' | 'error'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function MailApp() {
  const { t } = useTranslation()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current || status === 'sending') return
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      formRef.current.reset()
      setStatus('ok')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex h-full flex-col text-white/90">
      <div className="flex items-center justify-between border-b border-white/10 p-2.5">
        <p className="px-1 text-[13px] text-white/60">{t('mail.subtitle')}</p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex items-center gap-1.5 rounded-full bg-blue-500 px-4 py-1.5 text-[13px] font-semibold text-white transition-transform active:scale-95 disabled:opacity-60"
        >
          <PaperPlaneTilt size={14} weight="fill" />
          {status === 'sending' ? t('mail.sending') : t('mail.send')}
        </button>
      </div>

      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2 text-[13px]">
        <span className="w-14 shrink-0 text-white/50">{t('mail.to')}:</span>
        <span className="rounded-full bg-blue-500/25 px-2.5 py-0.5 text-blue-200">
          {profile.name} &lt;{profile.email}&gt;
        </span>
      </div>

      <label className="flex items-center gap-2 border-b border-white/10 px-4 py-2 text-[13px]">
        <span className="w-14 shrink-0 text-white/50">{t('mail.fromName')}:</span>
        <input
          name="from_name"
          required
          autoComplete="name"
          className="w-full bg-transparent outline-none placeholder:text-white/35"
        />
      </label>

      <label className="flex items-center gap-2 border-b border-white/10 px-4 py-2 text-[13px]">
        <span className="w-14 shrink-0 text-white/50">{t('mail.fromEmail')}:</span>
        <input
          name="reply_to"
          type="email"
          required
          autoComplete="email"
          className="w-full bg-transparent outline-none placeholder:text-white/35"
        />
      </label>

      {/* Honeypot kept from the original form */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <textarea
        name="message"
        required
        placeholder={t('mail.message')}
        className="os-scroll min-h-0 flex-1 resize-none bg-transparent p-4 text-sm leading-relaxed outline-none placeholder:text-white/35"
      />

      {status === 'ok' && (
        <p className="flex items-center gap-1.5 border-t border-white/10 px-4 py-2 text-[13px] text-emerald-300">
          <CheckCircle size={15} weight="fill" />
          {t('mail.sentOk')}
        </p>
      )}
      {status === 'error' && (
        <p className="flex items-center gap-1.5 border-t border-white/10 px-4 py-2 text-[13px] text-red-300">
          <WarningCircle size={15} weight="fill" />
          {t('mail.sentError')}
        </p>
      )}
    </form>
  )
}
