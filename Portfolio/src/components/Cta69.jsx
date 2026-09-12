import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Magnetic from "./Magnetic";
import "./Cta69.css";

const REPEATS = 1;

export default function Cta69({
  onOpenContact,
  badge = { label: "GET IN TOUCH" },
  heading = "LET'S BUILD SOMETHING GREAT.",
  button = {
    label: "Start the conversation",
    href: `https://wa.me/918319013690?text=${encodeURIComponent(
      "Hi Lakshya! I came across your portfolio and would love to discuss a project with you."
    )}`
  },
  labels = {
    marqueePhrase: "CREATIVE DEVELOPMENT ✦ WEB EXPERIENCES ✦ INTERACTION DESIGN ✦ MOTION & CODE ✦ RESPONSIVE WEB ✦ DIGITAL CRAFT ✦ BUILT DIFFERENT",
    note: "Have a project in mind, an idea to build, or just want to connect? Let's talk.",
    footnote: "Available for select freelance & full-time opportunities."
  },
  className = ""
}) {
  const marqueePhrase = labels.marqueePhrase;
  const marqueeLine = marqueePhrase
    ? `${marqueePhrase} ✦ `.repeat(REPEATS)
    : "";

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <section className={`cta69-section ${className}`} id="contact" ref={container}>
      {/* Giant scrolling backdrop marquee */}
      {marqueePhrase && (
        <div aria-hidden="true" className="cta69-marquee-bg">
          <motion.div className="cta69-marquee-track" style={{ x }}>
            <span className="cta69-marquee-text">{marqueeLine}</span>
            <span className="cta69-marquee-text">{marqueeLine}</span>
          </motion.div>
        </div>
      )}

      {/* Centered foreground content */}
      <div className="focused-container">
        <div className="cta69-content">
        {badge && (
          <div
            className="cta69-badge"
            style={{ cursor: "pointer" }}
            onClick={onOpenContact}
          >
            <span className="cta69-badge-dot" />
            <span>{badge.label}</span>
          </div>
        )}

        {heading && <h2 className="cta69-heading">{heading}</h2>}

        {labels.note && <p className="cta69-note">{labels.note}</p>}

        {button && (
          <div className="cta69-action" style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <Magnetic>
              <button
                onClick={onOpenContact}
                className="cta69-button"
                style={{ cursor: "pointer" }}
              >
                <span>Fill Contact Form</span>
                <span className="cta69-button-arrow">✉</span>
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cta69-button"
              >
                <span>{button.label}</span>
                <span className="cta69-button-arrow">↗</span>
              </a>
            </Magnetic>
          </div>
        )}

        {labels.footnote && (
          <p className="cta69-footnote">{labels.footnote}</p>
        )}
        </div>
      </div>
    </section>
  );
}
