import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import "./Footer.css";

export default function Footer({ onOpenContact }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-top-left">
          <span className="footer-label">Email</span>
          <a href="mailto:hello@lakshya.com" className="footer-email">
          shrivastavalakshya0909@gmail.com
          </a>
        </div>
        
        <div className="footer-top-right">
          <span className="footer-label">Social</span>
          <div className="footer-social-icons">
            <a
              href="https://www.linkedin.com/in/lakshya-shrivastava"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/Lakshyash2005"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-middle">
       
        <span>© 2026 Lakshya Shrivastava</span>
      </div>

      <div className="footer-bottom-text">
        LAKSHYA
      </div>
    </footer>
  );
}