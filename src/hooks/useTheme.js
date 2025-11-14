import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.add("theme-transition");
    html.classList.remove("active");

    setTimeout(() => {
      setTheme(prev => (prev === "dark" ? "light" : "dark"));
      html.classList.add("active");
    }, 50);

    setTimeout(() => {
      html.classList.remove("theme-transition");
    }, 600);
  };

  return { theme, toggleTheme };
}
