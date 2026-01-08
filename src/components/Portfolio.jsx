import React, { useState } from "react";
import { projects } from "../data/portfolio";
import { useTranslation } from "react-i18next";
import placeholderImg from "../assets/placeholder.jpg";

export default function Portfolio() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) =>
          Array.isArray(p.type) ? p.type.includes(filter) : p.type === filter
        );

  const tabs = [
    { id: "all", label: t("portfolio_tab_all") },
    { id: "frontend", label: t("portfolio_tab_frontend") },
    { id: "backend", label: t("portfolio_tab_backend") },
  ];

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <h2>{t("portfolio_title")}</h2>
        <p className="portfolio-desc">{t("portfolio_desc")}</p>

        {/* Tabs */}
        <div className="portfolio-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${filter === tab.id ? "active" : ""}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((p, i) => (
            <div className="thumb flip-card" key={i}>
              <div className="flip-inner">
                <div className="flip-front">
                  <picture>
                    {p.imgAvif && <source srcSet={p.imgAvif} type="image/avif" />}
                    {p.imgWebp && <source srcSet={p.imgWebp} type="image/webp" />}
                    <img
                      className={`project-img ${p.imgClass || ""}`}
                      src={p.img || placeholderImg}
                      alt={p.title}
                      loading="lazy"
                      onError={(e) => {
                        if (e.currentTarget.src !== placeholderImg) {
                          e.currentTarget.src = placeholderImg;
                        }
                      }}
                    />
                  </picture>
                </div>

                <div className="flip-back">
                  <span className="proj-title">{p.title}</span>
                  <p className="proj-tag">{p.tag}</p>

                  {Array.isArray(p.techs) && p.techs.length > 0 && (
                    <div className="proj-techs" aria-label={t("portfolio_tech_stack", { defaultValue: "Tech stack" })}>
                      {p.techs.map((tech, idx) => (
                        <span
                          key={`${tech.name}-${idx}`}
                          className="tech-wrap"
                          data-name={tech.name}
                          title={tech.name}
                        >
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className={`tech-icon ${tech.class || ""}`}
                            loading="lazy"
                          />
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="proj-badges">
                    {p.url && <span className="badge">{t("portfolio_badge_demo")}</span>}
                    {p.repo && <span className="badge">{t("portfolio_badge_repo")}</span>}
                  </div>

                  <div className="project-links">
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn ghost"
                        aria-label={`${t("portfolio_btn_demo")} ${p.title}`}
                      >
                        {p.demo || t("portfolio_btn_demo")}
                      </a>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="btn ghost"
                        aria-label={`GitHub ${p.title}`}
                      >
                        {t("portfolio_btn_repo")}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.7 }}>
            {t("portfolio_empty")}
          </p>
        )}
      </div>
    </section>
  );
}
