import React from "react";
import { motion } from "framer-motion";
import avatar from "../assets/yo.png";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/public/CarlosRamos_CV.pdf"; // ruta al archivo PDF     
    link.download = "CarlosRamos_CV.pdf";       // nombre del archivo al descargar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <motion.div
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="hero-card"
        >
          <div className="avatar-glow">
            <img src={avatar} alt="Avatar de Carlos" className="avatar-img" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
