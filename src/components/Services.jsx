import React from "react";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();
  const items = t("services_items", { returnObjects: true });
  const list = Array.isArray(items) ? items : [];

  return (
    <section id="services" className="section">
      <div className="container">
        <h2>{t("services_title")}</h2>

        <div className="grid">
          {list.map((s, idx) => (
            <article className="card" key={idx}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
