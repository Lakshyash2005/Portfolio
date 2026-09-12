import "./nav.css";

export default function Nav({ onOpenContact }) {
  return (
    <nav className="navbar">
      <a href="#home" className="logo">
        Lakshya Shrivastava
      </a>

      <div className="nav-links">
        <a href="#about">ABOUT ME</a>
        <a
          href="#contact"
          onClick={(e) => {
            if (onOpenContact) {
              e.preventDefault();
              onOpenContact();
            }
          }}
        >
          CONTACT
        </a>
      </div>
    </nav>
  );
}