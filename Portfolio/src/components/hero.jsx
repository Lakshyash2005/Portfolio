import { useState, useRef, useMemo } from "react";
import "./hero.css";

// Generate rough hand-drawn jagged circle path
function generateRoughCirclePath(cx, cy, radius, points = 60) {
  if (radius <= 0) return "";
  let d = "";

  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;

    // Irregular radius variation for rough/hand-drawn feel
    const noise =
      Math.sin(angle * 7) * 0.08 +
      Math.sin(angle * 13) * 0.05 +
      Math.cos(angle * 5) * 0.06 +
      Math.sin(angle * 19) * 0.04;

    const r = radius * (1 + noise);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);

    if (i === 0) {
      d += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
    } else {
      d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
  }
  d += " Z";
  return d;
}

export default function Hero() {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, w: 1000, h: 800 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, w: rect.width, h: rect.height });
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const radius = hovered ? 165 : 0;
  const roughPath = useMemo(() => {
    return generateRoughCirclePath(mousePos.x, mousePos.y, radius, 80);
  }, [mousePos.x, mousePos.y, radius]);

  return (
    <section className="portfolio-section" id="home">
      <div
        className="portfolio-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* SVG overlay for clip + rough border */}
        <svg
          className="stamp-svg-overlay"
          width="100%"
          height="100%"
          viewBox={`0 0 ${mousePos.w} ${mousePos.h}`}
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id="rough-clip">
              {roughPath ? <path d={roughPath} /> : null}
            </clipPath>
          </defs>

          {/* Rough red outline */}
          {hovered && roughPath && (
            <>
              <path d={roughPath} className="rough-border-outer" />
              <path d={roughPath} className="rough-border-inner" />
            </>
          )}
        </svg>

        {/* Base layer (image 1) */}
        <img
          className="portfolio-image image-one"
          src="/images/image1.png"
          alt="Portfolio"
        />

        {/* Revealed layer clipped to rough shape */}
        <div
          className="hover-layer"
          style={{
            clipPath: hovered ? "url(#rough-clip)" : "none",
            WebkitClipPath: hovered ? "url(#rough-clip)" : "none",
            opacity: hovered ? 1 : 0,
          }}
        >
          <img
            className="portfolio-image image-two"
            src="/images/image2.jpg"
            alt="Portfolio Hover"
          />
          <div className="hover-content">
            {/* <span>FEATURED WORK</span> */}
            <h2>Explore Project</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
