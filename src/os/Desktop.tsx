import { lazy, Suspense, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FilePdf, FileText, Folder } from '@phosphor-icons/react'
import Window from './Window'
import DesktopIcon from './DesktopIcon'
import { APP_META, useWindows, type AppId } from './windowContext'
import { useIsMobile } from './useIsMobile'

// Each app is its own chunk, loaded the first time its window opens
const ProjectsApp = lazy(() => import('../apps/ProjectsApp'))
const AboutApp = lazy(() => import('../apps/AboutApp'))
const TerminalApp = lazy(() => import('../apps/TerminalApp'))
const CVApp = lazy(() => import('../apps/CVApp'))
const MailApp = lazy(() => import('../apps/MailApp'))
const ReelApp = lazy(() => import('../apps/ReelApp'))

const APP_CONTENT: Record<AppId, React.ReactNode> = {
  projects: <ProjectsApp />,
  about: <AboutApp />,
  terminal: <TerminalApp />,
  cv: <CVApp />,
  mail: <MailApp />,
  reel: <ReelApp />,
}

const APP_ORDER: AppId[] = ['projects', 'about', 'terminal', 'cv', 'mail', 'reel']

export default function Desktop() {
  const { t } = useTranslation()
  const { windows, openApp } = useWindows()
  const isMobile = useIsMobile()
  const areaRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={areaRef} className="relative min-h-0 flex-1">
      {/* Desktop shortcuts, macOS style: top-right column */}
      <div className="absolute right-2 top-2 flex flex-col items-end gap-2">
        <DesktopIcon
          label={t('desktop.projectsFolder')}
          icon={<Folder size={46} weight="fill" className="text-sky-400 drop-shadow-lg" />}
          onOpen={() => openApp('projects')}
        />
        <DesktopIcon
          label={t('desktop.cvFile')}
          icon={<FilePdf size={46} weight="duotone" className="text-red-400 drop-shadow-lg" />}
          onOpen={() => openApp('cv')}
        />
        <DesktopIcon
          label={t('desktop.readme')}
          icon={<FileText size={46} weight="duotone" className="text-white/90 drop-shadow-lg" />}
          onOpen={() => openApp('about')}
        />
      </div>

      <AnimatePresence>
        {APP_ORDER.filter((id) => windows[id].open).map((id) => {
          const meta = APP_META[id]
          const index = APP_ORDER.indexOf(id)
          const areaW = areaRef.current?.clientWidth ?? window.innerWidth
          const areaH = areaRef.current?.clientHeight ?? window.innerHeight - 110
          const width = Math.min(meta.width, areaW - 24)
          const height = Math.min(meta.height, areaH - 24)
          // Cascade windows a bit, but never past the right/bottom edge
          const x = isMobile
            ? 0
            : Math.min(Math.max(12, (areaW - width) / 2 + (index - 2) * 44), Math.max(12, areaW - width - 12))
          const y = isMobile
            ? 0
            : Math.min(Math.max(8, (areaH - height) / 2 + (index - 2) * 24 - 20), Math.max(8, areaH - height - 8))
          return (
            <Window
              key={id}
              id={id}
              title={t(meta.titleKey)}
              initialX={x}
              initialY={y}
              initialWidth={width}
              initialHeight={height}
              dragArea={areaRef}
            >
              <Suspense fallback={null}>{APP_CONTENT[id]}</Suspense>
            </Window>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
