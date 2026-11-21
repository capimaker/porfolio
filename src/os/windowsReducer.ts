import type { AppId, WindowState } from './windowContext'

export interface WindowsState {
  windows: Record<AppId, WindowState>
  /** Highest z-index handed out so far; the next raised window gets topZ + 1 */
  topZ: number
}

export type WindowsAction =
  | { type: 'open'; id: AppId; payload?: string }
  | { type: 'close'; id: AppId }
  | { type: 'minimize'; id: AppId }
  | { type: 'toggleMaximize'; id: AppId }
  | { type: 'focus'; id: AppId }

const closedWindow = (): WindowState => ({ open: false, minimized: false, maximized: false, zIndex: 0 })

export function createInitialState(): WindowsState {
  return {
    windows: {
      projects: closedWindow(),
      about: closedWindow(),
      terminal: closedWindow(),
      cv: closedWindow(),
      mail: closedWindow(),
    },
    topZ: 1,
  }
}

function update(state: WindowsState, id: AppId, patch: Partial<WindowState>, topZ = state.topZ): WindowsState {
  return { topZ, windows: { ...state.windows, [id]: { ...state.windows[id], ...patch } } }
}

export function windowsReducer(state: WindowsState, action: WindowsAction): WindowsState {
  const win = state.windows[action.id]
  switch (action.type) {
    case 'open': {
      const z = state.topZ + 1
      return update(
        state,
        action.id,
        {
          open: true,
          minimized: false,
          zIndex: z,
          payload: action.payload !== undefined ? { value: action.payload, n: z } : win.payload,
        },
        z,
      )
    }
    case 'close':
      return update(state, action.id, { open: false, minimized: false, maximized: false })
    case 'minimize':
      return update(state, action.id, { minimized: true })
    case 'toggleMaximize':
      return update(state, action.id, { maximized: !win.maximized })
    case 'focus':
      // Already the front window: keep the same state object so nothing re-renders
      if (win.zIndex === state.topZ) return state
      return update(state, action.id, { zIndex: state.topZ + 1 }, state.topZ + 1)
  }
}

/** The open, non-minimized window with the highest z-index, if any. */
export function getFocusedApp(windows: Record<AppId, WindowState>): AppId | null {
  let top: AppId | null = null
  let topZ = 0
  for (const id of Object.keys(windows) as AppId[]) {
    const w = windows[id]
    if (w.open && !w.minimized && w.zIndex > topZ) {
      top = id
      topZ = w.zIndex
    }
  }
  return top
}
