import { createContext, useContext } from 'react'

export type AppId = 'projects' | 'about' | 'terminal' | 'cv' | 'mail' | 'reel'

export const APP_META: Record<AppId, { titleKey: string; width: number; height: number }> = {
  projects: { titleKey: 'apps.projects', width: 880, height: 580 },
  about: { titleKey: 'apps.about', width: 780, height: 580 },
  terminal: { titleKey: 'apps.terminal', width: 660, height: 430 },
  cv: { titleKey: 'apps.cv', width: 740, height: 640 },
  mail: { titleKey: 'apps.mail', width: 620, height: 540 },
  reel: { titleKey: 'apps.reel', width: 820, height: 520 },
}

export interface WindowState {
  open: boolean
  minimized: boolean
  maximized: boolean
  zIndex: number
  /* Optional deep-link (e.g. About tab); n makes each openApp call distinct */
  payload?: { value: string; n: number }
}

export interface WindowManagerValue {
  windows: Record<AppId, WindowState>
  focusedApp: AppId | null
  openApp: (id: AppId, payload?: string) => void
  closeApp: (id: AppId) => void
  minimizeApp: (id: AppId) => void
  toggleMaximize: (id: AppId) => void
  focusApp: (id: AppId) => void
}

export const WindowManagerContext = createContext<WindowManagerValue | null>(null)

export function useWindows() {
  const ctx = useContext(WindowManagerContext)
  if (!ctx) throw new Error('useWindows must be used inside WindowProvider')
  return ctx
}
