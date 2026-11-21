import { describe, expect, it } from 'vitest'
import { createInitialState, getFocusedApp, windowsReducer, type WindowsAction } from './windowsReducer'

const run = (...actions: WindowsAction[]) => actions.reduce(windowsReducer, createInitialState())

describe('windowsReducer', () => {
  it('starts with every window closed and nothing focused', () => {
    const state = createInitialState()
    expect(Object.values(state.windows).every((w) => !w.open)).toBe(true)
    expect(getFocusedApp(state.windows)).toBeNull()
  })

  it('opening a window brings it to the front', () => {
    const state = run({ type: 'open', id: 'projects' }, { type: 'open', id: 'about' })
    expect(state.windows.about.zIndex).toBeGreaterThan(state.windows.projects.zIndex)
    expect(getFocusedApp(state.windows)).toBe('about')
  })

  it('focusing a window behind raises it above the others', () => {
    const state = run(
      { type: 'open', id: 'projects' },
      { type: 'open', id: 'about' },
      { type: 'focus', id: 'projects' },
    )
    expect(getFocusedApp(state.windows)).toBe('projects')
  })

  it('focusing the window already in front returns the same state object', () => {
    const before = run({ type: 'open', id: 'projects' })
    expect(windowsReducer(before, { type: 'focus', id: 'projects' })).toBe(before)
  })

  it('a minimized window loses focus and reopening restores it', () => {
    let state = run({ type: 'open', id: 'projects' }, { type: 'open', id: 'cv' }, { type: 'minimize', id: 'cv' })
    expect(getFocusedApp(state.windows)).toBe('projects')

    state = windowsReducer(state, { type: 'open', id: 'cv' })
    expect(state.windows.cv.minimized).toBe(false)
    expect(getFocusedApp(state.windows)).toBe('cv')
  })

  it('closing a maximized window resets it so it reopens at normal size', () => {
    let state = run({ type: 'open', id: 'mail' }, { type: 'toggleMaximize', id: 'mail' })
    expect(state.windows.mail.maximized).toBe(true)

    state = windowsReducer(state, { type: 'close', id: 'mail' })
    expect(state.windows.mail).toMatchObject({ open: false, maximized: false, minimized: false })
  })

  it('a deep-link payload is stored and stays distinct on every open', () => {
    const first = run({ type: 'open', id: 'about', payload: 'skills' })
    const second = windowsReducer(first, { type: 'open', id: 'about', payload: 'skills' })
    expect(second.windows.about.payload?.value).toBe('skills')
    expect(second.windows.about.payload?.n).not.toBe(first.windows.about.payload?.n)
  })

  it('opening without a payload keeps the previous one', () => {
    const state = run({ type: 'open', id: 'about', payload: 'education' }, { type: 'open', id: 'about' })
    expect(state.windows.about.payload?.value).toBe('education')
  })
})
