import { useState, type ReactNode } from 'react'
import { useIsMobile } from './useIsMobile'

interface DesktopIconProps {
  label: string
  icon: ReactNode
  onOpen: () => void
}

export default function DesktopIcon({ label, icon, onOpen }: DesktopIconProps) {
  const [selected, setSelected] = useState(false)
  const isMobile = useIsMobile()

  return (
    <button
      onClick={() => {
        if (isMobile) onOpen()
        else setSelected(true)
      }}
      onDoubleClick={onOpen}
      onBlur={() => setSelected(false)}
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
