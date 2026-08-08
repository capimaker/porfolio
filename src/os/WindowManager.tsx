import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { WindowManagerContext, type AppId, type WindowState } from './windowContext'

const createInitialWindows = (): Record<AppId, WindowState> => ({
  projects: { open: false, minimized: false, maximized: false, zIndex: 0 },
  about: { open: false, minimized: false, maximized: false, zIndex: 0 },
  terminal: { open: false, minimized: false, maximized: false, zIndex: 0 },
  cv: { open: false, minimized: false, maximized: false, zIndex: 0 },
  mail: { open: false, minimized: false, maximized: false, zIndex: 0 },
  reel: { open: false, minimized: false, maximized: false, zIndex: 0 },
})

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState(createInitialWindows)
  const zCounter = useRef(1)

  const focusApp = useCallback((id: AppId) => {
    zCounter.current += 1
    const z = zCounter.current
    setWindows((prev) =>
      prev[id].zIndex === z ? prev : { ...prev, [id]: { ...prev[id], zIndex: z } },
    )
  }, [])

  const openApp = useCallback((id: AppId, payload?: string) => {
    zCounter.current += 1
    const z = zCounter.current
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        open: true,
        minimized: false,
        zIndex: z,
        payload: payload !== undefined ? { value: payload, n: z } : prev[id].payload,
      },
    }))
  }, [])

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: false, minimized: false, maximized: false },
    }))
  }, [])

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], minimized: true } }))
  }, [])

  const toggleMaximize = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], maximized: !prev[id].maximized },
    }))
  }, [])

  const focusedApp = useMemo(() => {
    let top: AppId | null = null
    let topZ = 0
    ;(Object.keys(windows) as AppId[]).forEach((id) => {
      const w = windows[id]
      if (w.open && !w.minimized && w.zIndex > topZ) {
        top = id
        topZ = w.zIndex
      }
    })
    return top
  }, [windows])

  const value = useMemo(
    () => ({ windows, focusedApp, openApp, closeApp, minimizeApp, toggleMaximize, focusApp }),
    [windows, focusedApp, openApp, closeApp, minimizeApp, toggleMaximize, focusApp],
  )

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>
}
