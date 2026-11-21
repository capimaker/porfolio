import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface DropdownProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

/** Menu-bar dropdown; a transparent full-screen layer closes it on outside click. */
export default function Dropdown({ open, onClose, children }: DropdownProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-[510]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="glass absolute left-0 top-full z-[520] mt-1.5 w-56 rounded-xl p-1.5 text-[13px] font-normal"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
