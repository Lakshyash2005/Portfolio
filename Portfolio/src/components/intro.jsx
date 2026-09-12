import React, { useEffect, useState, useRef } from "react";
import "./intro.css";

export default function Intro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef(null);

  // Counter progress 0 -> 100
  useEffect(() => {
    let start = performance.now();
    const duration = 3800; // 4.2 seconds

    let frameId;
    const updateProgress = (now) => {
      const elapsed = now - start;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(current);

      if (current < 100) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        // Trigger exit shortly after 100%
        setTimeout(() => {
          setExiting(true);
        }, 500);
        setTimeout(() => {
          onComplete();
        }, 1300);
      }
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  // Handle mouse move for 3D perspective and spotlight
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleSkip = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const firstName = "LAKSHYA".split("");
  const lastName = "SHRIVASTAVA".split("");

  // 3D tilt calculation
  const tiltX = (mousePos.y - 0.5) * -16;
  const tiltY = (mousePos.x - 0.5) * 20;

  return (
    <div
      ref={containerRef}
      className={`intro-container ${exiting ? "intro-exiting" : ""}`}
      onMouseMove={handleMouseMove}
      onClick={handleSkip}
    >
      {/* Ambient glowing spotlight following mouse */}
      <div
        className="intro-spotlight"
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
        }}
      />

      {/* Cybernetic grid & scanlines */}
      <div className="intro-grid-overlay" />
      <div className="intro-noise-overlay" />

      {/* Header HUD */}
      <div className="intro-hud-top">
        <div className="hud-badge">
          <span className="hud-dot" />
          <span>PORTFOLIO // 2026</span>
        </div>
        <div className="hud-counter">
          <span className="counter-num">{progress.toString().padStart(3, "0")}</span>
          <span className="counter-unit">%</span>
        </div>
      </div>

      {/* Main 3D Kinetic Typography Stage */}
      <div
        className="intro-stage"
        style={{
          transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        }}
      >
        {/* Giant ambient background watermark */}
        <div className="watermark-text" aria-hidden="true">
          LAKSHYA
        </div>

        {/* Laser horizon accent line */}
        <div className="laser-accent-line">
          <div className="laser-pulse" />
        </div>

        {/* First Name */}
        <div className="name-line line-primary">
          {firstName.map((char, index) => (
            <span
              key={`first-${index}`}
              className="kinetic-letter"
              style={{
                animationDelay: `${0.2 + index * 0.08}s`,
                "--index": index,
              }}
            >
              <span className="letter-inner" data-char={char}>
                {char}
              </span>
            </span>
          ))}
        </div>

        {/* Decorative Divider */}
        <div className="name-divider">
          <span className="divider-line left" />
          <span className="divider-symbol">◈</span>
          <span className="divider-tag">DESIGN & CODE ARCHITECTURE</span>
          <span className="divider-symbol">◈</span>
          <span className="divider-line right" />
        </div>

        {/* Last Name */}
        <div className="name-line line-secondary">
          {lastName.map((char, index) => (
            <span
              key={`last-${index}`}
              className="kinetic-letter secondary-letter"
              style={{
                animationDelay: `${0.8 + index * 0.05}s`,
                "--index": index,
              }}
            >
              <span className="letter-inner" data-char={char}>
                {char}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Footer HUD & Prompt */}
      <div className="intro-hud-bottom">
        <div className="hud-status">
          <span className="status-label">STATUS:</span>
          <span className="status-val">SYSTEMS READY</span>
        </div>

        <div className="hud-prompt">
          <span className="pulse-prompt">CLICK ANYWHERE TO ENTER</span>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}