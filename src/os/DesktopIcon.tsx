import type { ReactNode } from 'react'
import { useIsMobile } from './useIsMobile'

interface DesktopIconProps {
  label: string
  icon: ReactNode
  selected: boolean
  onSelect: () => void
  onOpen: () => void
}

/**
 * Selection lives in the parent, not in focus: Safari on macOS does not focus
 * buttons on click, so a blur-based deselect never fires there.
 */
export default function DesktopIcon({ label, icon, selected, onSelect, onOpen }: DesktopIconProps) {
  const isMobile = useIsMobile()

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        if (isMobile) onOpen()
        else onSelect()
      }}
      onDoubleClick={onOpen}
      onKeyDown={(e) => {
        // Enter opens, like a double click; preventDefault stops the click that would only select
        if (e.key === 'Enter') {
          e.preventDefault()
          onOpen()
        }
      }}
      onFocus={onSelect}
      className="flex w-24 flex-col items-center gap-1 rounded-lg p-1 outline-none"
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
          selected ? 'bg-white/20' : ''
        }`}
      >
        {icon}
      </span>
      <span
        className={`max-w-full truncate rounded px-1.5 py-px text-xs font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] ${
          selected ? 'bg-blue-500/90 [text-shadow:none]' : ''
        }`}
      >
        {label}
      </span>
    </button>
  )
}
