import { useEffect, useState } from 'react'

/** Menu-bar date and time; ticks on its own so the rest of the bar does not re-render. */
export default function Clock({ locale }: { locale: string }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <span className="hidden px-1 sm:inline">
        {now.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' })}
      </span>
      <span className="px-1 tabular-nums">
        {now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
      </span>
    </>
  )
}
