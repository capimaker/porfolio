import { useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FilePdf, FileText, Folder } from '@phosphor-icons/react'
import Window from './Window'
import DesktopIcon from './DesktopIcon'
import { APP_META, useWindows, type AppId } from './windowContext'
import { useIsMobile } from './useIsMobile'
import ProjectsApp from '../apps/ProjectsApp'
import AboutApp from '../apps/AboutApp'
import TerminalApp from '../apps/TerminalApp'
import CVApp from '../apps/CVApp'
import MailApp from '../apps/MailApp'
import ReelApp from '../apps/ReelApp'

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
          const x = isMobile ? 0 : Math.max(12, (areaW - width) / 2 + (index - 2) * 44)
          const y = isMobile ? 0 : Math.max(8, (areaH - height) / 2 + (index - 2) * 24 - 20)
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
              {APP_CONTENT[id]}
            </Window>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
