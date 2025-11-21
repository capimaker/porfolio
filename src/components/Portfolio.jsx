import React, { useState } from "react";
import { projects } from "../data/portfolio";
import { useTranslation } from "react-i18next";

export default function Portfolio() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  const tabs = [
    
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
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
            <div className="thumb" key={i}>
              <img src={p.img} alt={p.title} />
              <div className="overlay">
                <div>
                  <span className="proj-title">{p.title}</span>
                  <p className="proj-tag">{p.tag}</p>

                  <div className="project-links">
                    <a
                     href={p.url}                 
                     target="_blank"
                     rel="noreferrer"
                     className="btn ghost"
                    >
                     🔗 {p.demo || "Demo"}        
                    </a>
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn ghost"
                    >
                      💻 GitHub
                    </a>
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
