import { useTranslation } from 'react-i18next'
import Modal from './Modal'
import { profile } from '../data/portfolio'

interface WelcomeDialogProps {
  open: boolean
  onClose: () => void
  onSeeProjects: () => void
  userName?: string
}

/** Shown on desktop entry and reopened from Help. */
export default function WelcomeDialog({ open, onClose, onSeeProjects, userName }: WelcomeDialogProps) {
  const { t } = useTranslation()

  return (
    <Modal open={open} onClose={onClose} className="max-w-md p-7">
      <div className="flex items-center gap-4">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="h-14 w-14 rounded-full object-cover ring-2 ring-white/30"
        />
        <h2 className="text-lg font-bold leading-snug">
          {userName ? t('welcome.titleNamed', { name: userName }) : t('welcome.title')}
        </h2>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-white/80">{t('welcome.body')}</p>
      <p className="mt-3 text-sm leading-relaxed text-white/80">{t('welcome.next')}</p>
      <p className="mt-3 text-right text-sm italic text-white/70">{t('welcome.signature')}</p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-full bg-white/15 px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-white/25"
        >
          {t('welcome.secondary')}
        </button>
        <button
          autoFocus
          onClick={onSeeProjects}
          className="rounded-full bg-blue-500 px-6 py-2 text-[13px] font-semibold text-white transition-transform active:scale-[0.97]"
        >
          {t('welcome.cta')}
        </button>
      </div>
    </Modal>
  )
}
