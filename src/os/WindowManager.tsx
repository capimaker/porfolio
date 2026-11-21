import { useMemo, useReducer, type ReactNode } from 'react'
import { WindowManagerContext, type AppId } from './windowContext'
import { createInitialState, getFocusedApp, windowsReducer } from './windowsReducer'

export function WindowProvider({ children }: { children: ReactNode }) {
  const [{ windows }, dispatch] = useReducer(windowsReducer, undefined, createInitialState)

  // dispatch is stable, so these callbacks never change identity
  const actions = useMemo(
    () => ({
      openApp: (id: AppId, payload?: string) => dispatch({ type: 'open', id, payload }),
      closeApp: (id: AppId) => dispatch({ type: 'close', id }),
      minimizeApp: (id: AppId) => dispatch({ type: 'minimize', id }),
      toggleMaximize: (id: AppId) => dispatch({ type: 'toggleMaximize', id }),
      focusApp: (id: AppId) => dispatch({ type: 'focus', id }),
    }),
    [],
  )

  const value = useMemo(
    () => ({ windows, focusedApp: getFocusedApp(windows), ...actions }),
    [windows, actions],
  )

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>
}
