import { useTranslation } from 'react-i18next'
import Modal from './Modal'
import { profile } from '../data/portfolio'

/** "About this portfolio", opened from the menu-bar logo menu. */
export default function AboutDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation()

  return (
    <Modal open={open} onClose={onClose} labelledBy="about-dialog-title" className="max-w-sm p-6 text-center">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="mx-auto mb-3 h-16 w-16 rounded-full object-cover ring-2 ring-white/30"
      />
      <h2 id="about-dialog-title" className="text-base font-bold">{t('aboutDialog.title')}</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-white/75">{t('aboutDialog.line1')}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-white/60">{t('aboutDialog.line2')}</p>
      <button
        onClick={onClose}
        className="mt-4 rounded-full bg-blue-500 px-5 py-1.5 text-[13px] font-semibold text-white transition-transform active:scale-[0.97]"
      >
        {t('aboutDialog.close')}
      </button>
    </Modal>
  )
}
