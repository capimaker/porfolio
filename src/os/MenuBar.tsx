import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { AppleLogo, BatteryFull, Globe, WifiHigh } from '@phosphor-icons/react'
import { APP_META, useWindows } from './windowContext'
import { profile } from '../data/portfolio'

interface MenuBarProps {
  onRestart: () => void
  onLogout: () => void
}

export default function MenuBar({ onRestart, onLogout }: MenuBarProps) {
  const { t, i18n } = useTranslation()
  const { focusedApp, openApp } = useWindows()
  const [now, setNow] = useState(() => new Date())
  const [menuOpen, setMenuOpen] = useState(false)
  const [fileOpen, setFileOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(timer)
  }, [])

  const lang = i18n.language.startsWith('es') ? 'es' : 'en'
  const locale = lang === 'es' ? 'es-ES' : 'en-US'
  const date = now.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' })
  const time = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })

  const appName = focusedApp ? t(APP_META[focusedApp].titleKey) : t('menu.appName')

  return (
    <>
      <header className="glass relative z-[500] flex h-8 shrink-0 items-center justify-between rounded-none border-x-0 border-t-0 px-3 text-[13px] font-medium text-white/90">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`rounded-md px-2 py-0.5 transition-colors hover:bg-white/15 ${menuOpen ? 'bg-white/15' : ''}`}
            aria-label="Menu"
          >
            <AppleLogo size={16} weight="fill" />
          </button>
          <button
            onClick={() => openApp('projects')}
            className="rounded-md px-2 py-0.5 font-bold transition-colors hover:bg-white/15"
          >
            {appName}
          </button>
          <nav className="hidden items-center md:flex">
            <span className="relative">
              <button
                onClick={() => setFileOpen((v) => !v)}
                className={`rounded-md px-2 py-0.5 transition-colors hover:bg-white/15 ${fileOpen ? 'bg-white/15' : ''}`}
              >
                {t('menu.file')}
              </button>
              <AnimatePresence>
                {fileOpen && (
                  <>
                    <div className="fixed inset-0 z-[510]" onClick={() => setFileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="glass absolute left-0 top-full z-[520] mt-1.5 w-56 rounded-xl p-1.5 text-[13px] font-normal"
                    >
                      {(
                        [
                          { label: t('about.tabSkills'), action: () => openApp('about', 'skills') },
                          { label: t('about.tabExperience'), action: () => openApp('about', 'experience') },
                          { label: t('about.tabEducation'), action: () => openApp('about', 'education') },
                          { label: t('apps.projects'), action: () => openApp('projects') },
                          { label: t('apps.cv'), action: () => openApp('cv') },
                          { label: t('apps.about'), action: () => openApp('about', 'bio') },
                        ] as const
                      ).map((item) => (
                        <button
                          key={item.label}
                          onClick={() => {
                            item.action()
                            setFileOpen(false)
                          }}
                          className="block w-full rounded-lg px-3 py-1.5 text-left hover:bg-blue-500/80"
                        >
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </span>
            {(['edit', 'view', 'go', 'window', 'help'] as const).map((key) => (
              <span key={key} className="cursor-default rounded-md px-2 py-0.5 hover:bg-white/10">
                {t(`menu.${key}`)}
              </span>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => i18n.changeLanguage(lang === 'es' ? 'en' : 'es')}
            className="flex items-center gap-1 rounded-md px-2 py-0.5 uppercase transition-colors hover:bg-white/15"
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
          >
            <Globe size={14} />
            {lang}
          </button>
          <span className="hidden items-center gap-2 px-1 sm:flex">
            <WifiHigh size={16} />
            <BatteryFull size={20} />
          </span>
          <span className="hidden px-1 sm:inline">{date}</span>
          <span className="px-1 tabular-nums">{time}</span>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-[510]" onClick={() => setMenuOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="glass absolute left-2 top-9 z-[520] w-64 rounded-xl p-1.5 text-[13px]"
              >
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    setAboutOpen(true)
                  }}
                  className="block w-full rounded-lg px-3 py-1.5 text-left hover:bg-blue-500/80"
                >
                  {t('menu.aboutPortfolio')}
                </button>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-lg px-3 py-1.5 text-left hover:bg-blue-500/80"
                >
                  {t('menu.sourceCode')}
                </a>
                <div className="mx-3 my-1 border-t border-white/15" />
                <button
                  onClick={onRestart}
                  className="block w-full rounded-lg px-3 py-1.5 text-left hover:bg-blue-500/80"
                >
                  {t('menu.restart')}
                </button>
                <button
                  onClick={onLogout}
                  className="block w-full rounded-lg px-3 py-1.5 text-left hover:bg-blue-500/80"
                >
                  {t('menu.logout')}
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {aboutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] flex items-center justify-center bg-black/40 px-4"
            onClick={() => setAboutOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-sm rounded-2xl p-6 text-center text-white/90"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="mx-auto mb-3 h-16 w-16 rounded-full object-cover ring-2 ring-white/30"
              />
              <h2 className="text-base font-bold">{t('aboutDialog.title')}</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-white/75">{t('aboutDialog.line1')}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-white/60">{t('aboutDialog.line2')}</p>
              <button
                onClick={() => setAboutOpen(false)}
                className="mt-4 rounded-full bg-blue-500 px-5 py-1.5 text-[13px] font-semibold text-white transition-transform active:scale-[0.97]"
              >
                {t('aboutDialog.close')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
