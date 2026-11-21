import { beforeAll, describe, expect, it } from 'vitest'
import i18next, { type TFunction } from 'i18next'
import en from '../locales/en.json'
import es from '../locales/es.json'
import { projects } from '../data/portfolio'
import { runCommand } from './terminalCommands'

let tEn: TFunction
let tEs: TFunction

beforeAll(async () => {
  const init = async (lng: string, translation: object) => {
    const instance = i18next.createInstance()
    await instance.init({ lng, resources: { [lng]: { translation } }, interpolation: { escapeValue: false } })
    return instance.t
  }
  tEn = await init('en', en)
  tEs = await init('es', es)
})

/** A translation key printed as-is means it is missing from the locale file */
const hasRawKey = (lines: string[]) => lines.some((l) => /\b(terminal|about|apps|projectTags)\.[\w-]+/.test(l))

describe('runCommand', () => {
  it('help lists every command, translated in both languages', () => {
    for (const t of [tEn, tEs]) {
      const { output } = runCommand('help', t)
      expect(output.length).toBe(11)
      expect(hasRawKey(output)).toBe(false)
    }
  })

  it('is case and whitespace insensitive', () => {
    expect(runCommand('  HELP ', tEn).output).toEqual(runCommand('help', tEn).output)
  })

  it('projects prints one entry per project with its link', () => {
    const { output } = runCommand('projects', tEn)
    expect(output).toHaveLength(projects.length * 2)
    expect(hasRawKey(output)).toBe(false)
    for (const p of projects) expect(output.join('\n')).toContain(p.url ?? p.repo)
  })

  it('experience and education read the translated lists', () => {
    for (const cmd of ['experience', 'education']) {
      const { output } = runCommand(cmd, tEs)
      expect(output.length).toBeGreaterThan(0)
      expect(output.every((l) => /^\[.+\] .+ @ .+/.test(l))).toBe(true)
    }
  })

  it('contact and cv ask the UI to open their window', () => {
    expect(runCommand('contact', tEn).effect).toEqual({ type: 'open', app: 'mail' })
    expect(runCommand('cv', tEn).effect).toEqual({ type: 'open', app: 'cv' })
    expect(runCommand('open cv', tEn).effect).toEqual({ type: 'open', app: 'cv' })
  })

  it('clear asks the UI to empty the screen', () => {
    expect(runCommand('clear', tEn)).toEqual({ output: [], effect: { type: 'clear' } })
  })

  it('an unknown command reports it like zsh does', () => {
    expect(runCommand('sudo rm -rf /', tEn).output).toEqual(['zsh: command not found: sudo rm -rf /'])
  })
})
