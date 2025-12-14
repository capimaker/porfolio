import React, { useState, useEffect } from "react";
import useTheme from "../hooks/useTheme";
import { useTranslation } from "react-i18next";
import LanguageSwitchFlags from "./LanguageSwitchFlags";

export default function Navbar() {
  const { t } = useTranslation();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { id: "home", label: t("nav_home") },
    { id: "resume", label: t("nav_resume") },
    { id: "portfolio", label: t("nav_portfolio") },
    { id: "contact", label: t("nav_contact") },
  ];

  const handleLinkClick = () => setMenuOpen(false);
  const handleLanguageChange = () => setMenuOpen(false);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="brand">
          Carlos <span>Ramos</span>
        </div>

        <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LanguageSwitchFlags onChange={handleLanguageChange} />
        </div>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`menu ${menuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleLinkClick}
              className={active === link.id ? "active-link" : ""}
            >
              {link.label}
            </a>
          ))}

          <button
            className="theme-toggle"
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}
