import "./nav.css";

export default function Nav() {
  return (
    <nav className="navbar">
      <a href="#home" className="logo">
        Lakshya Shrivastava
      </a>

      <div className="nav-links">
        <a href="#about">ABOUT ME</a>
        <a href="#contact">CONTACT</a>
      </div>
    </nav>
  );
}