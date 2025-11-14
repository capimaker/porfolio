import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer id="contact">
      <div className="container" style={{ textAlign: "center" }}>
        
        <div
          style={{
            marginTop: 12,
            display: "flex",
            gap: 12,
            justifyContent: "center",
            opacity: 0.9,
          }}
        >
         <div className="resume-socials">
          <a href="https://github.com/capimaker" target="_blank" rel="noreferrer" aria-label="GitHub">
            <img src="/github.svg" alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/carlos_ramos7/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <img src="/in.svg" alt="LinkedIn" />
          </a>
        </div>
        </div>


        <p
          style={{
            marginTop: 12,
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          © {new Date().getFullYear()} Carlos Ramos · {t("footer_made")}
        </p>
      </div>
    </footer>
  );
}
