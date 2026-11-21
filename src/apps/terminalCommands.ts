import type { TFunction } from 'i18next'
import { profile, projects, skills } from '../data/portfolio'
import type { AppId } from '../os/windowContext'

const NEOFETCH_ART = String.raw`
   ______            _
  / ____/___ _____  (_)
 / /   / __ '/ __ \/ /
/ /___/ /_/ / /_/ / /
\____/\__,_/ .___/_/
          /_/`

const HELP_KEYS = [
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
] as const

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

export interface CommandResult {
  output: string[]
  /** Side effect the terminal UI must apply after printing the output */
  effect?: { type: 'clear' } | { type: 'open'; app: AppId }
}

/** Parses one line typed in the terminal. Pure: no React, no DOM. */
export function runCommand(raw: string, t: TFunction): CommandResult {
  const cmd = raw.trim().toLowerCase()

  switch (cmd) {
    case '':
      return { output: [] }
    case 'help':
      return {
        output: [
          t('terminal.helpIntro'),
          ...HELP_KEYS.map((key) => {
            const name = key === 'cv' ? 'open cv' : key
            return `  ${name.padEnd(12)} ${t(`terminal.help.${key}`)}`
          }),
        ],
      }
    case 'whoami':
      return { output: [`${profile.name} (${profile.nick})`, t('about.role'), t('about.bio')] }
    case 'skills':
      return { output: [skills.map((s) => s.name).join(' · ')] }
    case 'projects':
      return {
        output: projects.flatMap((p) => [
          `${p.title.padEnd(14)} ${t(`projectTags.${p.id}`)}`,
          `  ${p.url ?? p.repo}`,
        ]),
      }
    case 'experience': {
      const items = t('about.experience', { returnObjects: true }) as unknown as ExperienceItem[]
      return { output: items.map((item) => `[${item.years}] ${item.title} @ ${item.company}`) }
    }
    case 'education': {
      const items = t('about.education', { returnObjects: true }) as unknown as EducationItem[]
      return { output: items.map((item) => `[${item.years}] ${item.title} @ ${item.institution}`) }
    }
    case 'contact':
      return { output: [`> ${t('apps.mail')}`], effect: { type: 'open', app: 'mail' } }
    case 'cv':
    case 'open cv':
      return { output: [`> ${t('apps.cv')}`], effect: { type: 'open', app: 'cv' } }
    case 'neofetch':
      return {
        output: [
          NEOFETCH_ART,
          `${profile.nick}@capiOS`,
          '---------------',
          'OS:      capiOS (web)',
          'Host:    portfolio.carlosramos',
          'Shell:   zsh 5.9',
          'Stack:   TypeScript · React · Next.js · Node.js · PostgreSQL',
          `GitHub:  ${profile.github}`,
          `Email:   ${profile.email}`,
        ],
      }
    case 'clear':
      return { output: [], effect: { type: 'clear' } }
    default:
      return { output: [`zsh: ${t('terminal.notFound')}: ${cmd}`] }
  }
}
