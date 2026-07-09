import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AppleLogo } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

const BOOT_MS = 2600

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (reduceMotion) {
      onDone()
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / BOOT_MS)
      setProgress(p)
      if (p < 1) raf = requestAnimationFrame(tick)
      else onDone()
    }
    raf = requestAnimationFrame(tick)
    // rAF is paused in hidden tabs; make sure the boot still finishes there
    const fallback = setTimeout(onDone, BOOT_MS + 500)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fallback)
    }
  }, [onDone, reduceMotion])

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      onClick={onDone}
      className="fixed inset-0 z-[900] flex cursor-pointer flex-col items-center justify-center bg-black"
    >
      <AppleLogo size={88} weight="fill" className="text-white" />
      <div className="mt-14 h-1.5 w-44 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <span className="absolute bottom-8 text-xs text-white/40">{t('boot.skip')}</span>
    </motion.div>
  )
}
