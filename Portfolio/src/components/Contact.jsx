import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object to gather all form inputs
    const formData = new FormData(e.target);
    
    // Add the Web3Forms Access Key from environment variables
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey) {
      console.error("Web3Forms Access Key is missing! Did you restart the server?");
      alert("Error: Web3Forms Access Key is missing. Please restart your dev server.");
      return;
    }
    
    formData.append("access_key", accessKey);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    console.log("Submitting form data:", object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const result = await response.json();
      console.log("Web3Forms response:", result);
      
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        alert("Form submission failed: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error: Could not submit form.");
    }
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
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <Magnetic>
              <motion.button
                className="contact-close-btn"
                onClick={onClose}
                aria-label="Close form"
                whileTap={{ scale: 0.92 }}
              >
                ✕
              </motion.button>
            </Magnetic>

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
                      name="name"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Your Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Tell me about your project..."
                      required
                    ></textarea>
                  </div>

                  <Magnetic>
                    <motion.button type="submit" whileTap={{ scale: 0.98 }}>
                      SEND MESSAGE
                      <span>↗</span>
                    </motion.button>
                  </Magnetic>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}