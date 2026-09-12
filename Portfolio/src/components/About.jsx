import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import BlurText from "./BlurText";
import Magnetic from "./Magnetic";
import "./About.css";

export default function About() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const handleImageMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  const handleImageMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <section className="about" id="about" ref={container}>
      <div className="focused-container">
        <div className="about-top">
        <span className="about-label">about/01</span>
        <motion.span 
          className="about-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      <div className="about-grid">
        <div className="about-left">
          <motion.div
            className="about-number"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            01
          </motion.div>

          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.6, rotateZ: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
            viewport={{ once: true }}
            className="about-card-wrapper"
          >
            <div
              className="about-image-card"
              onMouseMove={handleImageMouseMove}
              onMouseLeave={handleImageMouseLeave}
            >
            {/* Cyberpunk HUD Reticles */}
            <div className="card-hud-corner corner-tl" />
            <div className="card-hud-corner corner-tr" />
            <div className="card-hud-corner corner-bl" />
            <div className="card-hud-corner corner-br" />

            {/* Glowing spotlight following cursor */}
            <div className="about-image-glare" />

            {/* Photo */}
            <img
              src="/images/profile.jpg"
              alt="Lakshya Shrivastava"
              className="about-image"
            />

            {/* Vignette & scanline gradient */}
            <div className="about-image-overlay" />

            {/* Top status indicator */}
            <div className="about-status-tag">
              <span className="status-live-dot" />
              <span>AVAILABLE</span>
            </div>

            {/* Bottom Floating Glass Badge */}
            <div className="about-image-badge">
              <div className="badge-info">
                <span className="badge-name">LAKSHYA SHRIVASTAVA</span>
                <span className="badge-role">CREATIVE DEV</span>
              </div>
              <div className="badge-icon">↗</div>
            </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <h2 className="about-interactive-text">
            <div className="about-text-content">
              <BlurText
                text="I BUILD"
                delay={60}
                animateBy="letters"
                direction="top"
                className="about-blur-line"
              />
              <br />
              <BlurText
                text="DIGITAL"
                delay={60}
                animateBy="letters"
                direction="top"
                className="about-blur-line about-blur-dim"
              />
              <br />
              <BlurText
                text="EXPERIENCES."
                delay={60}
                animateBy="letters"
                direction="top"
                className="about-blur-line"
              />
            </div>
          </h2>

          <p className="about-description">
            I’m Lakshya — a developer who enjoys turning ideas into digital experiences I care about clean interfaces, thoughtful interactions, and the small details that make a website feel alive. I’m constantly learning, experimenting, and building — with the goal of creating work that is not only functional, but memorable.
          </p>

          <div className="about-info">
            <div>
              <span>FOCUS</span>
              <p>Web Development & UI</p>
            </div>
            <div>
              <span>BASED IN</span>
              <p>India</p>
            </div>
            <div>
              <span>CURRENTLY</span>
              <p>Building & Exploring</p>
            </div>
          </div>

          <Magnetic>
            <a href="#projects" className="about-button">
              Explore my work
              <span>↗</span>
            </a>
          </Magnetic>
        </motion.div>
      </div>
      </div>
    </section>
  );
}