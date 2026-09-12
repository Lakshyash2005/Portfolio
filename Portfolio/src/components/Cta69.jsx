import "./Cta69.css";

const REPEATS = 1;

export default function Cta69({
  badge = { label: "GET IN TOUCH" },
  heading = "Let's make something worth keeping.",
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

  return (
    <section className={`cta69-section ${className}`} id="contact">
      {/* Giant scrolling backdrop marquee */}
      {marqueePhrase && (
        <div aria-hidden="true" className="cta69-marquee-bg">
          <div className="cta69-marquee-track">
            <span className="cta69-marquee-text">{marqueeLine}</span>
            <span className="cta69-marquee-text">{marqueeLine}</span>
          </div>
        </div>
      )}

      {/* Centered foreground content */}
      <div className="cta69-content">
        {badge && (
          <div className="cta69-badge">
            <span className="cta69-badge-dot" />
            <span>{badge.label}</span>
          </div>
        )}

        {heading && <h2 className="cta69-heading">{heading}</h2>}

        {labels.note && <p className="cta69-note">{labels.note}</p>}

        {button && (
          <div className="cta69-action">
            <a
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cta69-button"
            >
              <span>{button.label}</span>
              <span className="cta69-button-arrow">↗</span>
            </a>
          </div>
        )}

        {labels.footnote && (
          <p className="cta69-footnote">{labels.footnote}</p>
        )}
      </div>
    </section>
  );
}
