// src/components/ScrollParallaxBg.jsx
import { useEffect } from "react";

export default function ScrollParallaxBg() {
  useEffect(() => {
    // Respeta accesibilidad: no animar si el usuario lo pide
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const root = document.documentElement;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const s = window.scrollY;
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        const t = s / max; // 0 -> 1

        // Desplazamientos sutiles (ajusta a tu gusto)
        const x = 50 + (t * 20 - 10);             // -10% a +10% horizontal
        const y = 50 + Math.sin(t * 2 * Math.PI) * 6; // oscilación vertical ~±6%

        root.style.setProperty("--bg-x", `${x}%`);
        root.style.setProperty("--bg-y", `${y}%`);

        ticking = false;
      });
    };

    // inicializa posición
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
