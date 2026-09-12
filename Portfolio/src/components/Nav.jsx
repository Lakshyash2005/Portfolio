import "./nav.css";
import Magnetic from "./Magnetic";

export default function Nav({ onOpenContact }) {
  return (
    <nav className="pill-nav">
      <Magnetic>
        <a href="#home" className="pill-nav-item">
          Home
        </a>
      </Magnetic>
      
      <div className="pill-nav-separator" />
      
      <Magnetic>
        <a href="#about" className="pill-nav-item">
          About
        </a>
      </Magnetic>
      
      <div className="pill-nav-separator" />
      
      <Magnetic>
        <a href="#projects" className="pill-nav-item">
          Projects
        </a>
      </Magnetic>

      <div className="pill-nav-separator" />

      <Magnetic>
        <a 
          href="#contact" 
          className="pill-nav-item"
          onClick={(e) => {
            if (onOpenContact) {
              e.preventDefault();
              onOpenContact();
            }
          }}
        >
          Contact
        </a>
      </Magnetic>
    </nav>
  );
}