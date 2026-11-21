import { useTranslation } from 'react-i18next'
import { ArrowSquareOut, DownloadSimple } from '@phosphor-icons/react'
import { cvFor } from '../data/portfolio'

export default function CVApp() {
  const { t, i18n } = useTranslation()
  const cv = cvFor(i18n.language)

  return (
    <div className="flex h-full flex-col text-white/90">
      <div className="flex items-center gap-2 border-b border-white/10 p-2.5">
        <a
          href={cv.url}
          download={cv.file}
          className="flex items-center gap-1.5 rounded-full bg-blue-500 px-4 py-1.5 text-[13px] font-semibold text-white transition-transform active:scale-95"
        >
          <DownloadSimple size={14} weight="bold" />
          {t('cv.download')}
        </a>
        <a
          href={cv.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-white/12 px-4 py-1.5 text-[13px] font-semibold transition-colors hover:bg-white/25"
        >
          <ArrowSquareOut size={14} weight="bold" />
          {t('cv.openNew')}
        </a>
      </div>
      <iframe
        src={`${cv.url}#toolbar=0&view=FitH`}
        title="CV Carlos Ramos"
        className="min-h-0 flex-1 bg-white"
      />
    </div>
  )
}
