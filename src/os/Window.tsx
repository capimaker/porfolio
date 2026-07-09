import { useRef, useState, type ReactNode } from 'react'
import { animate, motion, useDragControls, useMotionValue, useReducedMotion } from 'framer-motion'
import { useWindows, type AppId } from './windowContext'
import { useIsMobile } from './useIsMobile'

const MIN_WIDTH = 360
const MIN_HEIGHT = 280

interface WindowProps {
  id: AppId
  title: string
  initialX: number
  initialY: number
  initialWidth: number
  initialHeight: number
  dragArea: React.RefObject<HTMLDivElement | null>
  children: ReactNode
}

export default function Window({
  id,
  title,
  initialX,
  initialY,
  initialWidth,
  initialHeight,
  dragArea,
  children,
}: WindowProps) {
  const { windows, focusedApp, closeApp, minimizeApp, toggleMaximize, focusApp } = useWindows()
  const win = windows[id]
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()

  const dragControls = useDragControls()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const savedOffset = useRef({ x: 0, y: 0 })
  const frameRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight })

  const isFocused = focusedApp === id
  const fullscreen = isMobile || win.maximized

  const handleMaximize = () => {
    if (isMobile) return
    if (!win.maximized) {
      savedOffset.current = { x: x.get(), y: y.get() }
      animate(x, 0, { duration: reduceMotion ? 0 : 0.25 })
      animate(y, 0, { duration: reduceMotion ? 0 : 0.25 })
    } else {
      animate(x, savedOffset.current.x, { duration: reduceMotion ? 0 : 0.25 })
      animate(y, savedOffset.current.y, { duration: reduceMotion ? 0 : 0.25 })
    }
    toggleMaximize(id)
  }

  const handleResizeStart = (e: React.PointerEvent) => {
    if (fullscreen) return
    e.preventDefault()
    e.stopPropagation()
    focusApp(id)
    const startX = e.clientX
    const startY = e.clientY
    const startW = size.width
    const startH = size.height
    const el = frameRef.current
    const onMove = (ev: PointerEvent) => {
      const w = Math.max(MIN_WIDTH, startW + ev.clientX - startX)
      const h = Math.max(MIN_HEIGHT, startH + ev.clientY - startY)
      if (el) {
        el.style.width = `${w}px`
        el.style.height = `${h}px`
      }
    }
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      setSize({
        width: Math.max(MIN_WIDTH, startW + ev.clientX - startX),
        height: Math.max(MIN_HEIGHT, startH + ev.clientY - startY),
      })
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <motion.div
      ref={frameRef}
      drag={!fullscreen}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={dragArea}
      onPointerDown={() => focusApp(id)}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 24 }}
      animate={
        win.minimized
          ? reduceMotion
            ? { opacity: 0, transitionEnd: { visibility: 'hidden' } }
            : { opacity: 0, scale: 0.6, y: 320, transitionEnd: { visibility: 'hidden' } }
          : { opacity: 1, scale: 1, y: 0, visibility: 'visible' }
      }
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      className={`absolute flex flex-col overflow-hidden glass ${
        fullscreen ? 'inset-0 rounded-none md:rounded-none' : 'rounded-xl'
      } ${isFocused ? '' : 'brightness-[0.92]'}`}
      style={{
        zIndex: win.zIndex,
        x: fullscreen ? 0 : x,
        y: fullscreen ? 0 : y,
        ...(fullscreen
          ? {}
          : { left: initialX, top: initialY, width: size.width, height: size.height }),
      }}
    >
      {/* Title bar: drag handle + traffic lights */}
      <div
        className="group relative flex h-10 shrink-0 cursor-default select-none items-center border-b border-white/10 px-3"
        onPointerDown={(e) => {
          if (!fullscreen) dragControls.start(e)
        }}
        onDoubleClick={handleMaximize}
        style={{ touchAction: 'none' }}
      >
        <div className="flex items-center gap-2">
          <button
            aria-label="Cerrar"
            onClick={() => closeApp(id)}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] text-[9px] font-bold leading-none text-black/60"
          >
            <span className="opacity-0 transition-opacity group-hover:opacity-100">×</span>
          </button>
          <button
            aria-label="Minimizar"
            onClick={() => minimizeApp(id)}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] text-[9px] font-bold leading-none text-black/60"
          >
            <span className="opacity-0 transition-opacity group-hover:opacity-100">−</span>
          </button>
          <button
            aria-label="Maximizar"
            onClick={handleMaximize}
            onPointerDown={(e) => e.stopPropagation()}
            className={`flex h-3 w-3 items-center justify-center rounded-full text-[9px] font-bold leading-none text-black/60 ${
              isMobile ? 'bg-white/20' : 'bg-[#28c840]'
            }`}
          >
            <span className="opacity-0 transition-opacity group-hover:opacity-100">+</span>
          </button>
        </div>
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold text-white/85">
          {title}
        </span>
      </div>

      <div className="os-scroll min-h-0 flex-1 overflow-auto bg-[#171a2c]/85">{children}</div>

      {!fullscreen && (
        <div
          onPointerDown={handleResizeStart}
          className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize"
          style={{ touchAction: 'none' }}
        />
      )}
    </motion.div>
  )
}
