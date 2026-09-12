import { motion } from "framer-motion";
import "./Footer.css";

export default function Footer({ onOpenContact }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h1 className="footer-huge-text">
          Lakshya Shrivastava
        </h1>
        
        <div className="footer-links">
          <a href="https://github.com/Lakshyash2005" target="_blank" rel="noreferrer">GITHUB</a>
          <a href="https://www.linkedin.com/in/lakshya-shrivastava" target="_blank" rel="noreferrer">LINKEDIN</a>
          <a href="#" target="_blank" rel="noreferrer">INSTAGRAM</a>
          <a href="mailto:shrivastavalakshya0909@gmail.com">EMAIL</a>
        </div>
        
        <div className="footer-copyright">
          © 2026 All Rights Reserved.
        </div>
      </div>

      <motion.button 
        className="footer-fab" 
        onClick={onOpenContact}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        +
      </motion.button>
    </footer>
  );
}