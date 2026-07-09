import { useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  EnvelopeSimple,
  FilePdf,
  Folder,
  GithubLogo,
  LinkedinLogo,
  TerminalWindow,
  Trash,
} from '@phosphor-icons/react'
import { useWindows, type AppId } from './windowContext'
import { useIsMobile } from './useIsMobile'
import { profile } from '../data/portfolio'

const BASE = 52
const PEAK = 82

interface DockEntry {
  key: string
  labelKey: string
  appId?: AppId
  href?: string
  tile: ReactNode
}

const DOCK_APPS: DockEntry[] = [
  {
    key: 'projects',
    labelKey: 'apps.projects',
    appId: 'projects',
    tile: (
      <span className="flex h-full w-full items-center justify-center rounded-[22%] bg-gradient-to-b from-sky-300 to-blue-600">
        <Folder size="55%" weight="fill" className="text-white drop-shadow" />
      </span>
    ),
  },
  {
    key: 'about',
    labelKey: 'apps.about',
    appId: 'about',
    tile: (
      <img
        src={profile.avatar}
        alt=""
        className="h-full w-full rounded-[22%] object-cover"
        draggable={false}
      />
    ),
  },
  {
    key: 'terminal',
    labelKey: 'apps.terminal',
    appId: 'terminal',
    tile: (
      <span className="flex h-full w-full items-center justify-center rounded-[22%] bg-gradient-to-b from-zinc-700 to-zinc-950">
        <TerminalWindow size="55%" weight="fill" className="text-white/90" />
      </span>
    ),
  },
  {
    key: 'cv',
    labelKey: 'apps.cv',
    appId: 'cv',
    tile: (
      <span className="flex h-full w-full items-center justify-center rounded-[22%] bg-gradient-to-b from-rose-400 to-red-600">
        <FilePdf size="55%" weight="fill" className="text-white drop-shadow" />
      </span>
    ),
  },
  {
    key: 'mail',
    labelKey: 'apps.mail',
    appId: 'mail',
    tile: (
      <span className="flex h-full w-full items-center justify-center rounded-[22%] bg-gradient-to-b from-cyan-300 to-blue-500">
        <EnvelopeSimple size="55%" weight="fill" className="text-white drop-shadow" />
      </span>
    ),
  },
]

const DOCK_LINKS: DockEntry[] = [
  {
    key: 'github',
    labelKey: 'apps.github',
    href: profile.github,
    tile: (
      <span className="flex h-full w-full items-center justify-center rounded-[22%] bg-gradient-to-b from-zinc-600 to-zinc-900">
        <GithubLogo size="58%" weight="fill" className="text-white" />
      </span>
    ),
  },
  {
    key: 'linkedin',
    labelKey: 'apps.linkedin',
    href: profile.linkedin,
    tile: (
      <span className="flex h-full w-full items-center justify-center rounded-[22%] bg-gradient-to-b from-sky-500 to-blue-700">
        <LinkedinLogo size="58%" weight="fill" className="text-white" />
      </span>
    ),
  },
]

function DockIcon({
  entry,
  mouseX,
  magnify,
}: {
  entry: DockEntry
  mouseX: MotionValue<number>
  magnify: boolean
}) {
  const { t } = useTranslation()
  const { windows, openApp } = useWindows()
  const ref = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return Infinity
    return val - bounds.x - bounds.width / 2
  })
  const widthRaw = useTransform(distance, [-140, 0, 140], [BASE, magnify ? PEAK : BASE, BASE])
  const width = useSpring(widthRaw, { mass: 0.1, stiffness: 180, damping: 14 })

  const isOpen = entry.appId ? windows[entry.appId].open : false
  const label = t(entry.labelKey)

  const handleClick = () => {
    if (entry.appId) openApp(entry.appId)
    else if (entry.href) window.open(entry.href, '_blank', 'noopener')
  }

  return (
    <div className="relative flex flex-col items-center">
      {hovered && (
        <span className="glass pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium text-white/90">
          {label}
        </span>
      )}
      <motion.button
        ref={ref}
        aria-label={label}
        style={{ width, height: width }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        whileTap={{ scale: 0.9 }}
        className="relative block shrink-0"
      >
        {entry.tile}
      </motion.button>
      <span
        className={`absolute -bottom-[7px] h-1 w-1 rounded-full bg-white/80 ${isOpen ? '' : 'invisible'}`}
      />
    </div>
  )
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity)
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()
  const magnify = !isMobile && !reduceMotion

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 z-[400] flex justify-center px-2">
      <motion.nav
        onMouseMove={(e) => magnify && mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass pointer-events-auto flex items-end gap-2 rounded-[24px] px-3 pb-2.5 pt-2"
        aria-label="Dock"
      >
        {DOCK_APPS.map((entry) => (
          <DockIcon key={entry.key} entry={entry} mouseX={mouseX} magnify={magnify} />
        ))}
        <span className="mx-0.5 h-10 w-px self-center bg-white/25" />
        {DOCK_LINKS.map((entry) => (
          <DockIcon key={entry.key} entry={entry} mouseX={mouseX} magnify={magnify} />
        ))}
        {!isMobile && (
          <>
            <span className="mx-0.5 h-10 w-px self-center bg-white/25" />
            <DockIcon
              entry={{
                key: 'trash',
                labelKey: 'apps.trash',
                tile: (
                  <span className="glass flex h-full w-full items-center justify-center rounded-[22%]">
                    <Trash size="52%" weight="duotone" className="text-white/85" />
                  </span>
                ),
              }}
              mouseX={mouseX}
              magnify={magnify}
            />
          </>
        )}
      </motion.nav>
    </div>
  )
}
