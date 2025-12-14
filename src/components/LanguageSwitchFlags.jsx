import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitchFlags({ onChange }) {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "es").toLowerCase();

  const setLng = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.setAttribute("lang", lng);
    localStorage.setItem("lng", lng);
    if (onChange) onChange(lng);
  };

  useEffect(() => {
    const saved = localStorage.getItem("lng");
    const lng = saved || current;
    document.documentElement.setAttribute("lang", lng);
    if (saved && saved !== current) i18n.changeLanguage(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="lang-flags" role="group" aria-label="Language">
      <button
        className={`flag-btn ${current === "es" ? "active" : ""}`}
        onClick={() => setLng("es")}
        aria-pressed={current === "es"}
        title="Español"
      >
        <span className="flag-ico" aria-hidden="true">
          <img src="/flags/es.svg" alt="" />
        </span>
        <span className="flag-txt">ES</span>
      </button>
      <button
        className={`flag-btn ${current === "en" ? "active" : ""}`}
        onClick={() => setLng("en")}
        aria-pressed={current === "en"}
        title="English"
      >
        <span className="flag-ico" aria-hidden="true">
          <img src="/flags/en.svg" alt="" />
        </span>
        <span className="flag-txt">EN</span>
      </button>
    </div>
  );
}
