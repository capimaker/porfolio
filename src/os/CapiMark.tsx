/** Personal monogram used instead of a third-party logo (menu bar). */
export default function CapiMark({ size = 16 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.62, borderRadius: size * 0.28 }}
      className="inline-flex items-center justify-center bg-white font-bold leading-none text-[#0b1020]"
    >
      c
    </span>
  )
}
