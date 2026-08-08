import { useEffect, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AppleLogo,
  ArrowSquareOut,
  BatteryFull,
  Check,
  Globe,
  WifiHigh,
} from '@phosphor-icons/react'
import { APP_META, useWindows } from './windowContext'
import { profile } from '../data/portfolio'

type MenuId = 'apple' | 'file' | 'edit' | 'view' | 'go'

interface MenuBarProps {
  onRestart: () => void
  onLogout: () => void
  userName?: string
}

const ITEM_CLASS = 'flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left hover:bg-blue-500/80'

function Dropdown({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-[510]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="glass absolute left-0 top-full z-[520] mt-1.5 w-56 rounded-xl p-1.5 text-[13px] font-normal"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function MenuBar({ onRestart, onLogout, userName }: MenuBarProps) {
  const { t, i18n } = useTranslation()
  const { focusedApp, openApp } = useWindows()
  const [now, setNow] = useState(() => new Date())
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [welcomeOpen, setWelcomeOpen] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(timer)
  }, [])

  const lang = i18n.language.startsWith('es') ? 'es' : 'en'
  const locale = lang === 'es' ? 'es-ES' : 'en-US'
  const date = now.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' })
  const time = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })

  const appName = focusedApp ? t(APP_META[focusedApp].titleKey) : t('menu.appName')

  const toggle = (id: MenuId) => setOpenMenu((cur) => (cur === id ? null : id))
  const close = () => setOpenMenu(null)

  const menuButtonClass = (id: MenuId) =>
    `rounded-md px-2 py-0.5 transition-colors hover:bg-white/15 ${openMenu === id ? 'bg-white/15' : ''}`

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        close()
      }, 900)
    } catch {
      // Clipboard unavailable: the address is visible in the menu item itself
      close()
    }
  }

  const switchLang = (target: 'es' | 'en') => {
    i18n.changeLanguage(target)
    close()
  }

  return (
    <>
      <header className="glass relative z-[500] flex h-8 shrink-0 items-center justify-between rounded-none border-x-0 border-t-0 px-3 text-[13px] font-medium text-white/90">
        <div className="flex items-center gap-1">
          {/* Apple menu */}
          <span className="relative">
            <button onClick={() => toggle('apple')} className={menuButtonClass('apple')} aria-label="Menu">
              <AppleLogo size={16} weight="fill" />
            </button>
            <Dropdown open={openMenu === 'apple'} onClose={close}>
              <button
                onClick={() => {
                  close()
                  setAboutOpen(true)
                }}
                className={ITEM_CLASS}
              >
                {t('menu.aboutPortfolio')}
              </button>
              <a href={profile.github} target="_blank" rel="noreferrer" onClick={close} className={ITEM_CLASS}>
                {t('menu.sourceCode')}
              </a>
              <div className="mx-3 my-1 border-t border-white/15" />
              <button onClick={onRestart} className={ITEM_CLASS}>
                {t('menu.restart')}
              </button>
              <button onClick={onLogout} className={ITEM_CLASS}>
                {t('menu.logout')}
              </button>
            </Dropdown>
          </span>

          {/* App name opens the portfolio window */}
          <button
            onClick={() => openApp('projects')}
            className="rounded-md px-2 py-0.5 font-bold transition-colors hover:bg-white/15"
          >
            {appName}
          </button>

          <nav className="hidden items-center md:flex">
            {/* File: direct access to every section */}
            <span className="relative">
              <button onClick={() => toggle('file')} className={menuButtonClass('file')}>
                {t('menu.file')}
              </button>
              <Dropdown open={openMenu === 'file'} onClose={close}>
                {(
                  [
                    { label: t('about.tabSkills'), action: () => openApp('about', 'skills') },
                    { label: t('about.tabExperience'), action: () => openApp('about', 'experience') },
                    { label: t('about.tabEducation'), action: () => openApp('about', 'education') },
                    { label: t('apps.projects'), action: () => openApp('projects') },
                    { label: t('apps.cv'), action: () => openApp('cv') },
                    { label: t('apps.reel'), action: () => openApp('reel') },
                    { label: t('apps.about'), action: () => openApp('about', 'bio') },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.action()
                      close()
                    }}
                    className={ITEM_CLASS}
                  >
                    {item.label}
                  </button>
                ))}
              </Dropdown>
            </span>

            {/* Edit: copy email to clipboard */}
            <span className="relative">
              <button onClick={() => toggle('edit')} className={menuButtonClass('edit')}>
                {t('menu.edit')}
              </button>
              <Dropdown open={openMenu === 'edit'} onClose={close}>
                <button onClick={copyEmail} className={ITEM_CLASS}>
                  {copied && <Check size={13} weight="bold" className="text-emerald-300" />}
                  {copied ? t('menu.copied') : `${t('menu.copyEmail')} (${profile.email})`}
                </button>
              </Dropdown>
            </span>

            {/* View: language */}
            <span className="relative">
              <button onClick={() => toggle('view')} className={menuButtonClass('view')}>
                {t('menu.view')}
              </button>
              <Dropdown open={openMenu === 'view'} onClose={close}>
                <button onClick={() => switchLang('es')} className={ITEM_CLASS}>
                  <span className="w-4">{lang === 'es' && <Check size={13} weight="bold" />}</span>
                  Español
                </button>
                <button onClick={() => switchLang('en')} className={ITEM_CLASS}>
                  <span className="w-4">{lang === 'en' && <Check size={13} weight="bold" />}</span>
                  English
                </button>
              </Dropdown>
            </span>

            {/* Go: external profiles */}
            <span className="relative">
              <button onClick={() => toggle('go')} className={menuButtonClass('go')}>
                {t('menu.go')}
              </button>
              <Dropdown open={openMenu === 'go'} onClose={close}>
                <a href={profile.github} target="_blank" rel="noreferrer" onClick={close} className={ITEM_CLASS}>
                  GitHub
                  <ArrowSquareOut size={12} className="ml-auto text-white/50" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" onClick={close} className={ITEM_CLASS}>
                  LinkedIn
                  <ArrowSquareOut size={12} className="ml-auto text-white/50" />
                </a>
              </Dropdown>
            </span>

            {/* Mail: opens the contact app */}
            <button
              onClick={() => openApp('mail')}
              className="rounded-md px-2 py-0.5 transition-colors hover:bg-white/15"
            >
              {t('menu.mail')}
            </button>

            {/* Help: reopens the welcome dialog */}
            <button
              onClick={() => setWelcomeOpen(true)}
              className="rounded-md px-2 py-0.5 transition-colors hover:bg-white/15"
            >
              {t('menu.help')}
            </button>
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
      </header>

      {/* About-this-portfolio dialog */}
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

      {/* Welcome dialog: shown on desktop entry, reopened from Help */}
      <AnimatePresence>
        {welcomeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] flex items-center justify-center bg-black/40 px-4"
            onClick={() => setWelcomeOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-md rounded-2xl p-7 text-white/90"
            >
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
              <p className="mt-3 text-right text-sm italic text-white/70">{t('welcome.signature')}</p>
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setWelcomeOpen(false)}
                  className="rounded-full bg-blue-500 px-6 py-2 text-[13px] font-semibold text-white transition-transform active:scale-[0.97]"
                >
                  {t('welcome.cta')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
