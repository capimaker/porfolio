import React from "react";
import { motion as Motion } from "framer-motion";
import avatarWebp from "../assets/yo.webp";
import avatarAvif from "../assets/yo.avif";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/CarlosRamos_CV.pdf"; // archivo en la carpeta public
    link.download = "CarlosRamos_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="hero-subtitle">{t("hero_subtitle")}</p>
          <h1 className="hero-title">{t("hero_title")}</h1>
          <p className="hero-desc">{t("hero_desc")}</p>

          <div className="cta">
            <a className="btn" href="#portfolio">
              {t("btn_projects")}
            </a>

            <button
              type="button"
              className="btn ghost"
              onClick={handleDownloadCV}
            >
              {t("btn_cv")}
            </button>
          </div>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="hero-card"
        >
          <div className="avatar-glow">
            <picture>
              <source srcSet={avatarAvif} type="image/avif" />
              <source srcSet={avatarWebp} type="image/webp" />
              <img src={avatarWebp} alt="Avatar de Carlos" className="avatar-img" loading="lazy" />
            </picture>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
