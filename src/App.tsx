import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BootScreen from './os/BootScreen'
import LoginScreen from './os/LoginScreen'
import MenuBar from './os/MenuBar'
import Desktop from './os/Desktop'
import Dock from './os/Dock'
import { WindowProvider } from './os/WindowManager'

type Phase = 'boot' | 'login' | 'desktop'

export default function App() {
  const [phase, setPhase] = useState<Phase>('boot')
  const [session, setSession] = useState(0)

  const restart = () => {
    setSession((s) => s + 1)
    setPhase('boot')
  }
  const logout = () => {
    setSession((s) => s + 1)
    setPhase('login')
  }

  return (
    <AnimatePresence mode="wait">
      {phase === 'boot' && <BootScreen key="boot" onDone={() => setPhase('login')} />}
      {phase === 'login' && <LoginScreen key="login" onLogin={() => setPhase('desktop')} />}
      {phase === 'desktop' && (
        <motion.div
          key={`desktop-${session}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="wallpaper flex h-full flex-col"
        >
          <WindowProvider>
            <MenuBar onRestart={restart} onLogout={logout} />
            <Desktop />
            <Dock />
          </WindowProvider>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
