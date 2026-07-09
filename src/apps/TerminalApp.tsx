import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { profile, projects, skills } from '../data/portfolio'
import { useWindows } from '../os/windowContext'

interface Line {
  type: 'input' | 'output'
  text: string
}

const PROMPT = 'capi@portfolio ~ %'

const NEOFETCH_ART = String.raw`
   ______            _
  / ____/___ _____  (_)
 / /   / __ '/ __ \/ /
/ /___/ /_/ / /_/ / /
\____/\__,_/ .___/_/
          /_/`

interface ExperienceItem {
  title: string
  company: string
  years: string
}
interface EducationItem {
  title: string
  institution: string
  years: string
}

export default function TerminalApp() {
  const { t } = useTranslation()
  const { openApp } = useWindows()
  const [lines, setLines] = useState<Line[]>([{ type: 'output', text: t('terminal.welcome') }])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    const out: string[] = []

    switch (cmd) {
      case '':
        break
      case 'help': {
        out.push(t('terminal.helpIntro'))
        const helpKeys = [
          'help',
          'whoami',
          'skills',
          'projects',
          'experience',
          'education',
          'contact',
          'cv',
          'neofetch',
          'clear',
        ]
        helpKeys.forEach((key) => {
          const name = key === 'cv' ? 'open cv' : key
          out.push(`  ${name.padEnd(12)} ${t(`terminal.help.${key}`)}`)
        })
        break
      }
      case 'whoami':
        out.push(`${profile.name} (${profile.nick})`)
        out.push(t('about.role'))
        out.push(t('about.bio'))
        break
      case 'skills':
        out.push(skills.map((s) => s.name).join(' · '))
        break
      case 'projects':
        projects.forEach((p) => {
          out.push(`${p.title.padEnd(14)} ${p.tag}`)
          out.push(`  ${p.url ?? p.repo}`)
        })
        break
      case 'experience': {
        const items = t('about.experience', { returnObjects: true }) as unknown as ExperienceItem[]
        items.forEach((item) => out.push(`[${item.years}] ${item.title} @ ${item.company}`))
        break
      }
      case 'education': {
        const items = t('about.education', { returnObjects: true }) as unknown as EducationItem[]
        items.forEach((item) => out.push(`[${item.years}] ${item.title} @ ${item.institution}`))
        break
      }
      case 'contact':
        openApp('mail')
        out.push(`> ${t('apps.mail')}`)
        break
      case 'cv':
      case 'open cv':
        openApp('cv')
        out.push(`> ${t('apps.cv')}`)
        break
      case 'neofetch':
        out.push(NEOFETCH_ART)
        out.push(`${profile.nick}@capiOS`)
        out.push('---------------')
        out.push('OS:      capiOS 26 Tahoe (web)')
        out.push('Host:    portfolio.carlosramos')
        out.push('Shell:   zsh 5.9')
        out.push('Stack:   MERN + TypeScript')
        out.push(`GitHub:  ${profile.github}`)
        out.push(`Email:   ${profile.email}`)
        break
      case 'clear':
        setLines([])
        return
      default:
        out.push(`zsh: ${t('terminal.notFound')}: ${cmd}`)
    }

    setLines((prev) => [
      ...prev,
      { type: 'input', text: raw },
      ...out.map((text): Line => ({ type: 'output', text })),
    ])
  }

  return (
    <div
      className="flex h-full cursor-text flex-col bg-black/60 p-3 font-mono text-[13px] leading-relaxed text-emerald-50"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="os-scroll flex-1 overflow-y-auto whitespace-pre-wrap">
        {lines.map((line, i) =>
          line.type === 'input' ? (
            <div key={i}>
              <span className="text-sky-300">{PROMPT}</span> {line.text}
            </div>
          ) : (
            <div key={i} className="text-white/85">
              {line.text}
            </div>
          ),
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            run(input)
            setInput('')
          }}
          className="flex gap-2"
        >
          <span className="shrink-0 text-sky-300">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            autoCapitalize="off"
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal"
            className="w-full bg-transparent text-emerald-50 caret-emerald-300 outline-none"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
