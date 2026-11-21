import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowSquareOut, BatteryFull, Check, Globe, WifiHigh } from '@phosphor-icons/react'
import { APP_META, useWindows } from './windowContext'
import { profile } from '../data/portfolio'
import CapiMark from './CapiMark'
import Dropdown from './Dropdown'
import Clock from './Clock'
import AboutDialog from './AboutDialog'
import WelcomeDialog from './WelcomeDialog'

type MenuId = 'system' | 'file' | 'edit' | 'view' | 'go'

interface MenuBarProps {
  /** "Restart" and "Log out" both go back to the login screen */
  onLogout: () => void
  userName?: string
}

const ITEM_CLASS = 'flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left hover:bg-blue-500/80'
const PLAIN_BUTTON_CLASS = 'rounded-md px-2 py-0.5 transition-colors hover:bg-white/15'

export default function MenuBar({ onLogout, userName }: MenuBarProps) {
  const { t, i18n } = useTranslation()
  const { focusedApp, openApp } = useWindows()
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [welcomeOpen, setWelcomeOpen] = useState(true)
  const [copied, setCopied] = useState(false)

  const lang = i18n.language.startsWith('es') ? 'es' : 'en'
  const appName = focusedApp ? t(APP_META[focusedApp].titleKey) : t('menu.appName')

  const toggle = (id: MenuId) => setOpenMenu((cur) => (cur === id ? null : id))
  const close = () => setOpenMenu(null)
  const menuButtonProps = (id: MenuId) => ({
    onClick: () => toggle(id),
    className: `${PLAIN_BUTTON_CLASS} ${openMenu === id ? 'bg-white/15' : ''}`,
    'aria-haspopup': true,
    'aria-expanded': openMenu === id,
  })

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

  const fileItems = [
    { label: t('about.tabSkills'), action: () => openApp('about', 'skills') },
    { label: t('about.tabExperience'), action: () => openApp('about', 'experience') },
    { label: t('about.tabEducation'), action: () => openApp('about', 'education') },
    { label: t('apps.projects'), action: () => openApp('projects') },
    { label: t('apps.cv'), action: () => openApp('cv') },
    { label: t('apps.about'), action: () => openApp('about', 'bio') },
  ]

  return (
    <>
      <header className="glass relative z-[500] flex h-8 shrink-0 items-center justify-between rounded-none border-x-0 border-t-0 px-3 text-[13px] font-medium text-white/90">
        <div className="flex items-center gap-1">
          {/* System menu (the logo) */}
          <span className="relative">
            <button {...menuButtonProps('system')} aria-label="Menu">
              <CapiMark size={15} />
            </button>
            <Dropdown open={openMenu === 'system'} onClose={close}>
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
              <button onClick={onLogout} className={ITEM_CLASS}>
                {t('menu.restart')}
              </button>
              <button onClick={onLogout} className={ITEM_CLASS}>
                {t('menu.logout')}
              </button>
            </Dropdown>
          </span>

          {/* App name opens the portfolio window */}
          <button onClick={() => openApp('projects')} className={`${PLAIN_BUTTON_CLASS} font-bold`}>
            {appName}
          </button>

          <nav className="hidden items-center md:flex">
            {/* File: direct access to every section */}
            <span className="relative">
              <button {...menuButtonProps('file')}>
                {t('menu.file')}
              </button>
              <Dropdown open={openMenu === 'file'} onClose={close}>
                {fileItems.map((item) => (
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
              <button {...menuButtonProps('edit')}>
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
              <button {...menuButtonProps('view')}>
                {t('menu.view')}
              </button>
              <Dropdown open={openMenu === 'view'} onClose={close}>
                {(['es', 'en'] as const).map((code) => (
                  <button key={code} onClick={() => switchLang(code)} className={ITEM_CLASS}>
                    <span className="w-4">{lang === code && <Check size={13} weight="bold" />}</span>
                    {code === 'es' ? 'Español' : 'English'}
                  </button>
                ))}
              </Dropdown>
            </span>

            {/* Go: external profiles */}
            <span className="relative">
              <button {...menuButtonProps('go')}>
                {t('menu.go')}
              </button>
              <Dropdown open={openMenu === 'go'} onClose={close}>
                {[
                  { label: 'GitHub', href: profile.github },
                  { label: 'LinkedIn', href: profile.linkedin },
                ].map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" onClick={close} className={ITEM_CLASS}>
                    {link.label}
                    <ArrowSquareOut size={12} className="ml-auto text-white/50" />
                  </a>
                ))}
              </Dropdown>
            </span>

            <button onClick={() => openApp('mail')} className={PLAIN_BUTTON_CLASS}>
              {t('menu.mail')}
            </button>

            <button onClick={() => setWelcomeOpen(true)} className={PLAIN_BUTTON_CLASS}>
              {t('menu.help')}
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => i18n.changeLanguage(lang === 'es' ? 'en' : 'es')}
            className={`${PLAIN_BUTTON_CLASS} flex items-center gap-1 uppercase`}
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
          >
            <Globe size={14} />
            {lang}
          </button>
          <span className="hidden items-center gap-2 px-1 sm:flex">
            <WifiHigh size={16} />
            <BatteryFull size={20} />
          </span>
          <Clock locale={lang === 'es' ? 'es-ES' : 'en-US'} />
        </div>
      </header>

      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <WelcomeDialog
        open={welcomeOpen}
        userName={userName}
        onClose={() => setWelcomeOpen(false)}
        onSeeProjects={() => {
          setWelcomeOpen(false)
          openApp('projects')
        }}
      />
    </>
  )
}
