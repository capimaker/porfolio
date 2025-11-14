import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitch() {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "es").toLowerCase();

  const setLng = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.setAttribute("lang", lng);
    localStorage.setItem("lng", lng);
  };

  useEffect(() => {
    const saved = localStorage.getItem("lng");
    if (saved && saved !== current) setLng(saved);
    else document.documentElement.setAttribute("lang", current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="lang-segmented" role="group" aria-label="Language switch">
      <button
        className={`seg-btn ${current === "es" ? "active" : ""}`}
        onClick={() => setLng("es")}
        aria-pressed={current === "es"}
      >
        ES
      </button>
      <button
        className={`seg-btn ${current === "en" ? "active" : ""}`}
        onClick={() => setLng("en")}
        aria-pressed={current === "en"}
      >
        EN
      </button>
      <span className={`seg-thumb ${current === "en" ? "right" : ""}`} aria-hidden="true" />
    </div>
  );
}
