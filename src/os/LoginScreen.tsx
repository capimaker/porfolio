import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Globe } from '@phosphor-icons/react'
import { profile } from '../data/portfolio'

export default function LoginScreen({ onLogin }: { onLogin: (name: string) => void }) {
  const { t, i18n } = useTranslation()
  const [now, setNow] = useState(() => new Date())
  const [name, setName] = useState('')

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(timer)
  }, [])

  const lang = i18n.language.startsWith('es') ? 'es' : 'en'
  const locale = lang === 'es' ? 'es-ES' : 'en-US'
  const date = now.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })
  const time = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.45 } }}
      className="wallpaper fixed inset-0 z-[800] flex flex-col items-center"
    >
      <div className="absolute inset-0 bg-black/25 backdrop-blur-2xl" />

      <button
        onClick={() => i18n.changeLanguage(lang === 'es' ? 'en' : 'es')}
        className="glass absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase text-white/90 transition-transform active:scale-95"
      >
        <Globe size={14} />
        {lang}
      </button>

      <div className="relative z-10 mt-[10vh] text-center text-white">
        <p className="text-lg font-medium capitalize text-white/85">{date}</p>
        <p className="text-[86px] font-bold leading-none tracking-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.25)]">
          {time}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onLogin(name.trim().slice(0, 30))
        }}
        className="relative z-10 mt-auto mb-[12vh] flex flex-col items-center"
      >
        <img
          src={profile.avatar}
          alt={profile.name}
          className="h-24 w-24 rounded-full object-cover shadow-2xl ring-2 ring-white/40"
        />
        <h1 className="mt-4 text-xl font-semibold text-white">{t('login.name')}</h1>
        <p className="text-sm text-white/70">{t('login.role')}</p>
        <div className="mt-5 flex items-center gap-2">
          <input
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            autoComplete="off"
            placeholder={t('login.placeholder')}
            aria-label={t('login.placeholder')}
            className="glass w-56 rounded-full px-4 py-2 text-center text-sm text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            aria-label={t('login.enter')}
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform active:scale-90"
          >
            <ArrowRight size={16} weight="bold" />
          </button>
        </div>
      </form>
    </motion.div>
  )
}
