import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowSquareOut, Folder, GithubLogo } from '@phosphor-icons/react'
import { projects, type Project } from '../data/portfolio'

type Filter = 'all' | 'frontend' | 'backend'

const FILTERS: Filter[] = ['all', 'frontend', 'backend']

export default function ProjectsApp() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible =
    filter === 'all' ? projects : projects.filter((p) => p.type.includes(filter))

  return (
    <div className="flex h-full text-white/90">
      {/* Finder sidebar */}
      <aside className="hidden w-44 shrink-0 flex-col gap-0.5 border-r border-white/10 bg-white/5 p-3 sm:flex">
        <span className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wide text-white/45">
          {t('finder.favorites')}
        </span>
        {FILTERS.map((f) => {
          const count = f === 'all' ? projects.length : projects.filter((p) => p.type.includes(f)).length
          return (
            <button
              key={f}
              onClick={() => {
                setFilter(f)
                setSelected(null)
              }}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] transition-colors ${
                filter === f ? 'bg-blue-500/80 text-white' : 'hover:bg-white/10'
              }`}
            >
              <Folder size={15} weight="fill" className={filter === f ? 'text-white' : 'text-sky-400'} />
              <span className="flex-1 text-left">{t(`finder.${f}`)}</span>
              <span className="text-xs text-white/50">{count}</span>
            </button>
          )
        })}
      </aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile filter pills */}
        <div className="flex gap-1.5 border-b border-white/10 p-2 sm:hidden">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f)
                setSelected(null)
              }}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                filter === f ? 'bg-blue-500 text-white' : 'bg-white/10'
              }`}
            >
              {t(`finder.${f}`)}
            </button>
          ))}
        </div>

        {selected ? (
          <ProjectDetail project={selected} onBack={() => setSelected(null)} />
        ) : (
          <>
            <div className="os-scroll grid flex-1 auto-rows-min grid-cols-2 gap-4 overflow-y-auto p-4 md:grid-cols-3">
              {visible.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelected(project)}
                  className="group flex flex-col gap-1.5 rounded-xl p-2 text-left transition-colors hover:bg-white/10"
                >
                  <span className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-white/10">
                    <img
                      src={project.img}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="text-[13px] font-semibold leading-tight">{project.title}</span>
                  <span className="text-xs leading-tight text-white/55">{project.tag}</span>
                </button>
              ))}
              {visible.length === 0 && (
                <p className="col-span-full py-10 text-center text-sm text-white/50">
                  {t('finder.empty')}
                </p>
              )}
            </div>
            <footer className="border-t border-white/10 px-4 py-1.5 text-center text-xs text-white/45">
              {visible.length} {t('finder.items')}
            </footer>
          </>
        )}
      </div>
    </div>
  )
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const { t } = useTranslation()
  return (
    <div className="os-scroll flex-1 overflow-y-auto p-4">
      <button
        onClick={onBack}
        className="mb-3 flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-[13px] font-medium transition-colors hover:bg-white/20"
      >
        <ArrowLeft size={14} weight="bold" />
        {t('finder.back')}
      </button>

      <div className="overflow-hidden rounded-xl bg-white/10">
        <img src={project.img} alt={project.title} className="max-h-72 w-full object-cover" />
      </div>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">{project.title}</h2>
          <p className="text-sm text-white/60">{project.tag}</p>
        </div>
        <div className="flex gap-2">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-blue-500 px-4 py-1.5 text-[13px] font-semibold text-white transition-transform active:scale-95"
            >
              <ArrowSquareOut size={14} weight="bold" />
              {t('finder.demo')}
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/25"
          >
            <GithubLogo size={14} weight="fill" />
            {t('finder.repo')}
          </a>
        </div>
      </div>

      <h3 className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-white/45">
        {t('finder.techs')}
      </h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {project.techs.map((tech) => (
          <span
            key={tech.name}
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium"
          >
            <img src={tech.icon} alt="" className="h-4 w-4 object-contain" />
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  )
}
