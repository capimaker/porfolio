import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null); // "ok" | "error" | null

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    setToast(null);

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      formRef.current.reset();
      setToast("ok");
    } catch (err) {
      console.error(err);
      setToast("error");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const tmr = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(tmr);
  }, [toast]);

  return (
    <section id="contact" className="section">
      <div className="container contact-wrap">
        <h2>{t("contact_title")}</h2>
        <p className="contact-sub">{t("contact_sub")}</p>

        <form ref={formRef} onSubmit={onSubmit} className="contact-card" noValidate>
          {/* honeypot anti-bots */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" />

          <div className="form-grid">
            <div className="field">
              <input
                id="from_name"
                name="from_name"
                type="text"
                placeholder=" "
                required
                aria-label={t("contact_name_label")}
              />
              <label htmlFor="from_name">{t("contact_name_label")}</label>
            </div>

            <div className="field">
              <input
                id="reply_to"
                name="reply_to"
                type="email"
                placeholder=" "
                required
                aria-label={t("contact_email_label")}
              />
              <label htmlFor="reply_to">{t("contact_email_label")}</label>
            </div>
          </div>

          <div className="field">
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder=" "
              required
              aria-label={t("contact_message_label")}
            />
            <label htmlFor="message">{t("contact_message_label")}</label>
          </div>

          <button type="submit" className="btn contact-btn" disabled={sending} aria-busy={sending}>
            <span className="btn-contents">
              {sending ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  {t("contact_sending")}
                </>
              ) : (
                t("contact_send")
              )}
            </span>
          </button>

          {/* estado accesible */}
          <div className="sr-live" aria-live="polite">
            {toast === "ok" && t("contact_sent_ok")}
            {toast === "error" && t("contact_sent_error")}
          </div>
        </form>

        {/* toast visual */}
        {toast && (
          <div className={`toast ${toast === "ok" ? "ok" : "error"}`} role="status">
            {toast === "ok" ? t("contact_sent_ok") : t("contact_sent_error")}
          </div>
        )}
      </div>
    </section>
  );
}
