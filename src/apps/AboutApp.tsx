import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindows } from '../os/windowContext'
import {
  Briefcase,
  Code,
  Database,
  DownloadSimple,
  GithubLogo,
  GraduationCap,
  LinkedinLogo,
  MapPin,
  PenNib,
} from '@phosphor-icons/react'
import { profile, skills } from '../data/portfolio'

type Tab = 'bio' | 'experience' | 'education' | 'skills'

interface ServiceItem {
  title: string
  desc: string
}
interface ExperienceItem {
  title: string
  company: string
  years: string
  description: string
}
interface EducationItem {
  title: string
  institution: string
  years: string
}

const SERVICE_ICONS = [Code, PenNib, Database]

const TAB_IDS: Tab[] = ['bio', 'experience', 'education', 'skills']

export default function AboutApp() {
  const { t } = useTranslation()
  const { windows } = useWindows()
  const [tab, setTab] = useState<Tab>('bio')

  // Deep link from the File menu: openApp('about', 'skills' | 'experience' | ...)
  const payload = windows.about.payload
  useEffect(() => {
    if (payload && TAB_IDS.includes(payload.value as Tab)) setTab(payload.value as Tab)
  }, [payload])

  const services = t('about.services', { returnObjects: true }) as unknown as ServiceItem[]
  const experience = t('about.experience', { returnObjects: true }) as unknown as ExperienceItem[]
  const education = t('about.education', { returnObjects: true }) as unknown as EducationItem[]

  const tabs: { id: Tab; label: string }[] = [
    { id: 'bio', label: t('about.tabBio') },
    { id: 'experience', label: t('about.tabExperience') },
    { id: 'education', label: t('about.tabEducation') },
    { id: 'skills', label: t('about.tabSkills') },
  ]

  return (
    <div className="flex h-full flex-col text-white/90">
      {/* Profile header */}
      <div className="flex flex-wrap items-center gap-4 border-b border-white/10 p-5">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="h-20 w-20 rounded-full object-cover ring-2 ring-white/25"
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold leading-tight">{t('about.greeting')}</h1>
          <p className="text-sm text-white/65">{t('about.role')}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-white/50">
            <MapPin size={12} weight="fill" />
            {t('about.location')}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={profile.cvUrl}
            download="Carlos_Ramoscv.pdf"
            className="flex items-center gap-1.5 rounded-full bg-blue-500 px-4 py-1.5 text-[13px] font-semibold text-white transition-transform active:scale-95"
          >
            <DownloadSimple size={14} weight="bold" />
            {t('about.downloadCv')}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 transition-colors hover:bg-white/25"
          >
            <GithubLogo size={16} weight="fill" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 transition-colors hover:bg-white/25"
          >
            <LinkedinLogo size={16} weight="fill" />
          </a>
        </div>
      </div>

      {/* Segmented control */}
      <div className="flex gap-1 border-b border-white/10 px-5 py-3">
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              tab === item.id ? 'bg-blue-500 text-white' : 'text-white/70 hover:bg-white/10'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="os-scroll flex-1 overflow-y-auto p-5">
        {tab === 'bio' && (
          <div>
            <p className="max-w-[60ch] text-sm leading-relaxed text-white/80">{t('about.bio')}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {services.map((service, i) => {
                const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length]
                return (
                  <div key={service.title} className="rounded-xl bg-white/8 p-4">
                    <Icon size={22} className="text-sky-400" />
                    <h3 className="mt-2 text-[13px] font-semibold">{service.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">{service.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {tab === 'experience' && (
          <ul className="space-y-4">
            {experience.map((item) => (
              <li key={`${item.company}-${item.title}`} className="flex gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Briefcase size={15} className="text-sky-400" />
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="text-[13px] font-semibold">{item.title}</h3>
                    <span className="rounded-full bg-white/10 px-2 py-px text-[11px] text-white/60">
                      {item.years}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-sky-300/90">{item.company}</p>
                  <p className="mt-1 max-w-[65ch] text-xs leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {tab === 'education' && (
          <ul className="space-y-3">
            {education.map((item) => (
              <li key={item.title} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <GraduationCap size={15} className="text-sky-400" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[13px] font-semibold">{item.title}</h3>
                  <p className="text-xs text-white/60">{item.institution}</p>
                </div>
                <span className="shrink-0 rounded-full bg-white/10 px-2 py-px text-[11px] text-white/60">
                  {item.years}
                </span>
              </li>
            ))}
          </ul>
        )}

        {tab === 'skills' && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center gap-2 rounded-xl bg-white/8 p-3"
              >
                <img src={skill.icon} alt="" className="h-9 w-9 object-contain" />
                <span className="text-xs font-medium text-white/80">{skill.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
