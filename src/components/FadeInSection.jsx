import React from "react";
import { motion as Motion } from "framer-motion";

export default function FadeInSection({ children, delay = 0 }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true }}
    >
      {children}
    </Motion.div>
  );
}
