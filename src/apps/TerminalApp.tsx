import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindows } from '../os/windowContext'
import { runCommand } from './terminalCommands'

interface Line {
  type: 'input' | 'output'
  text: string
}

const PROMPT = 'capi@portfolio ~ %'

export default function TerminalApp() {
  const { t } = useTranslation()
  const { openApp } = useWindows()
  const [lines, setLines] = useState<Line[]>([{ type: 'output', text: t('terminal.welcome') }])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useRef<string[]>([])
  // Position while browsing history with the arrow keys; null when typing a new command
  const historyIndex = useRef<number | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [lines])

  const run = (raw: string) => {
    const entry = raw.trim()
    if (entry && history.current[history.current.length - 1] !== entry) history.current.push(entry)
    historyIndex.current = null

    const { output, effect } = runCommand(raw, t)
    if (effect?.type === 'clear') {
      setLines([])
      return
    }
    if (effect?.type === 'open') openApp(effect.app)
    setLines((prev) => [
      ...prev,
      { type: 'input', text: raw },
      ...output.map((text): Line => ({ type: 'output', text })),
    ])
  }

  const onHistoryKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const items = history.current
    if (e.key === 'ArrowUp' && items.length > 0) {
      e.preventDefault()
      const index = historyIndex.current === null ? items.length - 1 : Math.max(0, historyIndex.current - 1)
      historyIndex.current = index
      setInput(items[index])
    } else if (e.key === 'ArrowDown' && historyIndex.current !== null) {
      e.preventDefault()
      const index = historyIndex.current + 1
      historyIndex.current = index < items.length ? index : null
      setInput(index < items.length ? items[index] : '')
    }
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
            onKeyDown={onHistoryKey}
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
