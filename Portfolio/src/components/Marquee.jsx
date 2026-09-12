import "./Marquee.css";

export default function Marquee({
  items = [
   "java "
  ],
  speed = 28,
  reverse = false
}) {
  const renderList = (keyPrefix) => (
    <div className={`marquee-track ${reverse ? "reverse" : ""}`} style={{ animationDuration: `${speed}s` }}>
      {items.map((item, index) => (
        <span key={`${keyPrefix}-${index}`} className="marquee-item">
          <span className="marquee-text">{item}</span>
          <span className="marquee-star">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="marquee-section" aria-hidden="true">
      <div className="marquee-ribbon">
        <div className="marquee-line">
          {renderList("track-1")}
          {renderList("track-2")}
        </div>
      </div>
    </section>
  );
}
