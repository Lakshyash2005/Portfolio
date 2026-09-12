import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./intro.css";

const introTexts = [
  { text: "HELLO", duration: 600, className: "intro-outline" },
  { text: "नमस्ते", duration: 600, className: "intro-outline" },
  { text: "안녕하세요", duration: 600, className: "intro-outline" },
  { text: "I'M LAKSHYA.", duration: 600, className: "" },
  // { text: "DEVELOPER.", duration: 600, className: "" },
  { text: "I BUILD", duration: 600, className: "intro-outline" },
  { text: "DIGITAL EXPERIENCES.", duration: 800, className: "" },
  { text: "CREATIVE DEVELOPER", duration: 800, className: "intro-gradient" }
];

export default function Intro({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Lock scroll during intro
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (index < introTexts.length) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, introTexts[index].duration);
      return () => clearTimeout(timer);
    } else {
      // Sequence finished, trigger fade out of the whole intro overlay
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
        document.body.style.overflow = "auto";
      }, 1000); // 1s for the container fade out animation
    }
  }, [index, onComplete]);

  // Motion variants for premium cinematic text
  const textVariants = {
    initial: {
      opacity: 0,
      scale: 0.96,
      y: 15,
      filter: "blur(12px)"
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      y: -10,
      filter: "blur(8px)",
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      className="intro-container"
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        opacity: isFadingOut ? 0 : 1,
        scale: isFadingOut ? 1.05 : 1 // cinematic subtle scale out
      }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="intro-content">
        <AnimatePresence mode="wait">
          {index < introTexts.length && (
            <motion.h1
              key={index}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`intro-text ${introTexts[index].className || ""}`}
            >
              {introTexts[index].text}
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Line */}
      <motion.div
        className="intro-line"
        initial={{ width: "0px", opacity: 0 }}
        animate={{
          width: isFadingOut ? "120px" : "120px",
          opacity: isFadingOut ? 0 : 1
        }}
        transition={{
          width: { duration: 4.0, ease: "linear" },
          opacity: { duration: 0.4, ease: "easeOut" }
        }}
      />
    </motion.div>
  );
}