import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Resume() {
  const { t } = useTranslation();
  const [active, setActive] = useState("biography");
  const sectionRef = useRef(null);

  // Reveal observer
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      root.querySelectorAll(".reveal-item").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    root.querySelectorAll(".reveal-item").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [active]);

  const tabs = [
    { id: "biography", labelKey: "resume_tab_bio" },
    { id: "skills", labelKey: "resume_tab_skills" },
    { id: "education", labelKey: "resume_tab_edu" },
  ];

  const renderContent = () => {
    switch (active) {
      case "biography": {
        const items = t("resume_experience_items", { returnObjects: true }) || [];
        return (
          <div className="resume-section">
            <h3>{t("resume_experience_title")}</h3>
            <div className="timeline">
              {items.map((exp, idx) => (
                <div
                  key={idx}
                  className="timeline-item reveal-item"
                  style={{ "--d": `${idx * 90}ms` }}
                >
                  <div className="timeline-icon" aria-hidden="true">
                    &bull;
                  </div>
                  <div className="timeline-content">
                    <h4>{exp.title}</h4>
                    <p className="org">
                      {exp.company} - <span>{exp.years}</span>
                    </p>
                    <p className="desc">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case "skills": {
        const skills = t("resume_skills_items", { returnObjects: true }) || [];
        return (
          <div className="resume-section">
            <h3>{t("resume_skills_title")}</h3>
            <div className="skills-grid">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className={`skill-card reveal-item ${skill.class || ""}`}
                  style={{ "--d": `${idx * 80}ms` }}
                >
                  <img src={skill.icon} alt={skill.name} className={skill.class || ""} />
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case "education": {
        const items = t("resume_education_items", { returnObjects: true }) || [];
        return (
          <div className="resume-section">
            <h3>{t("resume_education_title")}</h3>
            <div className="timeline">
              {items.map((edu, idx) => (
                <div
                  key={idx}
                  className="timeline-item reveal-item"
                  style={{ "--d": `${idx * 90}ms` }}
                >
                  <div className="timeline-icon" aria-hidden="true">
                    &bull;
                  </div>
                  <div className="timeline-content">
                    <h4>{edu.title}</h4>
                    <p className="org">
                      {edu.institution} - <span>{edu.years}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <section id="resume" className="section" ref={sectionRef}>
      <div className="container">
        <div className="resume-header center">
          <h2 className="resume-title">{t("resume_title")}</h2>
        </div>

        <div className="resume-socials">
          <a href="https://github.com/capimaker" target="_blank" rel="noreferrer" aria-label="GitHub">
            <img src="/github.svg" alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/carlos_ramos7/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <img src="/in.svg" alt="LinkedIn" />
          </a>
        </div>

        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${active === tab.id ? "active" : ""}`}
              onClick={() => setActive(tab.id)}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        <div className="resume-content">{renderContent()}</div>
      </div>
    </section>
  );
}
