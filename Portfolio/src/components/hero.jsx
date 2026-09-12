import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import "./hero.css";

const WireframeTorus = () => {
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Constant rotation + subtle mouse interaction
    meshRef.current.rotation.x = t * 0.2 + mouse.current.y * 0.3;
    meshRef.current.rotation.y = t * 0.3 + mouse.current.x * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[10, 3, 200, 32]} />
      <meshBasicMaterial color="#555555" wireframe transparent opacity={0.3} />
    </mesh>
  );
};

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const title1 = "LAKSHYA".split("");
  const title2 = "SHRIVASTAVA".split("");

  const letterVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)", rotateX: -90 },
    visible: (i) => ({
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      rotateX: 0,
      transition: { duration: 0.8, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section className="hero-section" id="home" ref={containerRef}>
      <motion.div style={{ scale, opacity, width: "100%", height: "100%", willChange: "transform, opacity" }}>
      
      {/* 3D Background */}
      <div className="hero-canvas-container">
        <Canvas camera={{ position: [0, 0, 30], fov: 50 }}>
          <WireframeTorus />
        </Canvas>
      </div>

      {/* Massive Typographic Mask */}
      <div className="hero-typography">
        <h1 className="hero-title" style={{ perspective: "1000px" }}>
          <div style={{ display: "inline-block" }}>
            {title1.map((char, i) => (
              <motion.span 
                key={`t1-${i}`} 
                custom={i} 
                initial="hidden" 
                animate="visible" 
                variants={letterVariants}
                style={{ display: "inline-block", transformOrigin: "bottom" }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <br />
          <div className="hero-title-outline" style={{ display: "inline-block" }}>
            {title2.map((char, i) => (
              <motion.span 
                key={`t2-${i}`} 
                custom={i + title1.length} 
                initial="hidden" 
                animate="visible" 
                variants={letterVariants}
                style={{ display: "inline-block", transformOrigin: "bottom" }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </h1>
        
        {/* Cinematic Metadata Subheadings */}
        <div className="hero-metadata meta-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            CREATIVE<br/>DEVELOPER
          </motion.div>
        </div>

        <div className="hero-metadata meta-right">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
          >
            BASED IN<br/>INDIA
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div 
            className="scroll-line"
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
      </motion.div>
    </section>
  );
}
