import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import "./Contact.css";

export default function Contact({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="contact-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="contact-container"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              className="contact-close-btn"
              onClick={onClose}
              aria-label="Close form"
            >
              ✕
            </button>

            <div className="contact-top">
              <span>CONTACT / 04</span>
              <div></div>
            </div>

            <div className="contact-grid">
              {/* LEFT */}
              <div className="contact-heading">
                <h2>
                  LET'S
                  <br />
                  WORK
                  <br />
                  <span>TOGETHER.</span>
                </h2>

                <p>
                  Have a project in mind?
                  Let's turn your idea into something great.
                </p>
              </div>

              {/* RIGHT */}
              {submitted ? (
                <div className="contact-success-msg">
                  <h3>Message Sent! 🚀</h3>
                  <p>Thank you for reaching out. I'll get back to you shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Your Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      rows="4"
                      placeholder="Tell me about your project..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit">
                    SEND MESSAGE
                    <span>↗</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}