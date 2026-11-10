import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoginScreen from './os/LoginScreen'
import MenuBar from './os/MenuBar'
import Desktop from './os/Desktop'
import Dock from './os/Dock'
import { WindowProvider } from './os/WindowManager'

type Phase = 'login' | 'desktop'

export default function App() {
  const [phase, setPhase] = useState<Phase>('login')
  const [session, setSession] = useState(0)
  const [userName, setUserName] = useState('')

  // "Restart" and "Log out" both return to the login screen
  const logout = () => {
    setSession((s) => s + 1)
    setPhase('login')
  }

  return (
    <AnimatePresence>
      {phase === 'login' && (
        <LoginScreen
          key="login"
          onLogin={(name) => {
            setUserName(name)
            setPhase('desktop')
          }}
        />
      )}
      {phase === 'desktop' && (
        <motion.div
          key={`desktop-${session}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="wallpaper flex h-full flex-col"
        >
          <WindowProvider>
            <MenuBar onRestart={logout} onLogout={logout} userName={userName} />
            <Desktop />
            <Dock />
          </WindowProvider>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
