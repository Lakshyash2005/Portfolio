import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import "./Projects.css";

import {
  SiReact, SiJavascript, SiHtml5, SiCss, SiFramer, SiVite,
  SiPython, SiSpringboot, SiDjango,
  SiGit, SiGithub, SiShopify, SiVercel, SiVscodium, SiFigma,
  SiGoogleanalytics, SiGoogletagmanager,
} from "react-icons/si";
import { FaJava, FaNodeJs, FaMobileAlt, FaPaintBrush, FaSearch, FaChartLine, FaBullseye } from "react-icons/fa";


const projects = [
  {
    id: "01",
    title: "J.A.R.V.I.S",
    subtitle: "AI Voice Assistant",
    description:
      "Built a Python-based AI desktop assistant with real-time voice interaction, integrating speech recognition, NLP, and automation for hands-free productivity.",
    work: [
      "Real-time voice command recognition",
      "Text-to-speech & speech-to-text pipelines",
      "App launching, web search & system control",
      "Weather, news & email integration",
      "Conversational AI with NLP",
    ],
    tech: ["Python", "SpeechRecognition", "pyttsx3", "OpenAI API", "NLP", "Automation"],
    year: "2026",
    type: "AI / DESKTOP",
    link: null,
  },
  {
    id: "02",
    title: "Astro Palmistry",
    subtitle: "Frontend Design & Development",
    description:
      "Designed and developed a modern, responsive website for Astro-Palmistry by Ayush — a platform offering expert astrology, palmistry, and numerology guidance. Built with a premium aesthetic that blends ancient mysticism with clean, contemporary web design.",
    work: [
      "Full frontend design & development from scratch",
      "Premium UI with mystical visual identity",
      "Responsive layouts for all devices",
      "SEO-optimized structure & meta content",
      "Smooth scroll animations & micro-interactions",
      "Contact & consultation booking flow",
    ],
    tech: ["React", "Vite", "CSS3", "JavaScript", "Responsive Design", "SEO"],
    year: "2025",
    type: "CLIENT WORK",
    link: "https://astropalmistrybyayush.com/",
  },
  {
    id: "03",
    title: "Astro Vedaa",
    subtitle: "Graphy Course Platform",
    description:
      "Designed and customized a complete online course platform on Graphy for Ayush Awasthi — the youngest verified astro-palmist. The platform hosts certification programs in Astrology, Palmistry, and Numerology with 25,000+ enrolled students.",
    work: [
      "Custom Graphy website design & theming",
      "Course landing pages & enrollment flows",
      "Premium branding with mystical aesthetic",
      "Mega menu & responsive navigation",
      "WhatsApp integration & community CTAs",
      "Live webinar & session management setup",
    ],
    tech: ["Graphy", "Custom CSS", "JavaScript", "UI/UX Design", "Branding"],
    year: "2025",
    type: "CLIENT WORK",
    link: "https://ayush6515.graphy.com/",
  },
  {
    id: "04",
    title: "Karmakosha",
    subtitle: "Shopify E-commerce Store",
    description:
      "Designed, developed and optimized a Shopify e-commerce store specializing in certified Rudraksha, gemstones and spiritual products.",
    work: [
      "Customized Shopify themes & Liquid templates",
      "Responsive UI/UX improvements",
      "SEO-friendly content & meta optimization",
      "Google Analytics, Tag Manager & Meta Pixel",
      "Payment gateway & WhatsApp Business integration",
      "Performance & conversion optimization",
    ],
    tech: ["Shopify", "Liquid", "HTML5", "CSS", "JavaScript", "Google Analytics", "SEO"],
    year: "2024",
    type: "CLIENT WORK",
    link: null,
  },
  {
    id: "05",
    title: "Payroll System",
    subtitle: "Management Dashboard",
    description:
      "Developed a full-stack Payroll Management System with role-based access, automated salary calculations, and an admin dashboard for managing employees and departments.",
    work: [
      "Role-based authentication (Admin/Employee)",
      "Automated salary & deduction calculations",
      "Department & employee CRUD operations",
      "Payslip generation & export",
      "Admin analytics dashboard",
    ],
    tech: ["Java", "Spring Boot", "MySQL", "Hibernate", "HTML", "CSS", "JavaScript"],
    year: "2025",
    type: "FULL-STACK",
    link: null,
  },
];

const techStack = [
  {
    category: "FRONTEND",
    items: [
      { icon: <SiReact />, label: "React" },
      { icon: <SiJavascript />, label: "JavaScript" },
      { icon: <SiHtml5 />, label: "HTML5" },
      { icon: <SiCss />, label: "CSS3" },
      { icon: <SiFramer />, label: "Framer Motion" },
      { icon: <SiVite />, label: "Vite" },
      { icon: <FaMobileAlt />, label: "Responsive" },
    ],
  },
  {
    category: "BACKEND",
    items: [
      { icon: <SiPython />, label: "Python" },
      { icon: <FaJava />, label: "Java" },
      { icon: <SiSpringboot />, label: "Spring Boot" },
      { icon: <FaNodeJs />, label: "Node.js" },
      { icon: <SiDjango />, label: "Django" },
    ],
  },
  {
    category: "TOOLS & PLATFORMS",
    items: [
      { icon: <SiGit />, label: "Git" },
      { icon: <SiGithub />, label: "GitHub" },
      { icon: <SiShopify />, label: "Shopify" },
      { icon: <SiVercel />, label: "Vercel" },
      { icon: <SiVscodium />, label: "VS Code" },
      { icon: <SiFigma />, label: "Figma" },
    ],
  },
  {
    category: "DESIGN & SEO",
    items: [
      { icon: <FaPaintBrush />, label: "UI/UX" },
      { icon: <SiGoogleanalytics />, label: "Analytics" },
      { icon: <SiGoogletagmanager />, label: "GTM" },
      { icon: <FaSearch />, label: "SEO" },
      { icon: <FaBullseye />, label: "Meta Pixel" },
      { icon: <FaChartLine />, label: "Branding" },
    ],
  },
];

const StickyCard = ({ project, index, progress, range, targetScale }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Scale down and dim the card as the global scroll progresses
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0.3]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="sticky-card-wrapper" style={{ top: `calc(15vh + ${index * 30}px)` }}>
      <motion.article
        ref={cardRef}
        className={`bento-item sticky-card interactive`}
        style={{ scale, opacity }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Spotlight Overlay */}
        <motion.div
          className="bento-spotlight"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`
          }}
        />
        
        {/* Massive Watermark */}
        <div className="bento-watermark">{project.id}</div>

        <div className="bento-content-wrapper sticky-card-content">
          
          <div className="sticky-left">
            <div className="bento-meta">
              <span className="bento-type">{project.type}</span>
              <span className="bento-year">{project.year}</span>
            </div>
            
            <div className="bento-tech sticky-tech">
              {project.tech.map((t, i) => (
                <span key={i} className="bento-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="sticky-right">
            <h3 className="bento-title sticky-title">
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="bento-link">
                  {project.title} ↗
                </a>
              ) : (
                project.title
              )}
            </h3>
            <p className="bento-desc sticky-desc">{project.description}</p>
          </div>

        </div>
      </motion.article>
    </div>
  );
};

export default function Projects() {
  const containerRef = useRef(null);
  
  // Track scroll progress of the entire Projects section for the parallax scale effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section className="projects" id="projects" ref={containerRef}>
      <div className="focused-container">
      {/* Section Header */}
      <div className="projects-top">
        <span className="projects-label">projects/02</span>
        <motion.span 
          className="projects-line" 
          initial={{ scaleX: 0 }} 
          whileInView={{ scaleX: 1 }} 
          transition={{ duration: 1, ease: "easeOut" }} 
          style={{ transformOrigin: "left" }} 
        />
      </div>

      <motion.div
        className="projects-heading-wrap"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="projects-heading">
          SELECTED <span className="dim">WORK.</span>
        </h2>
        <p className="projects-subheading">
          A curated collection of projects where design meets engineering.
        </p>
      </motion.div>

      {/* Sticky Card Stack */}
      <div className="projects-sticky-stack">
        {projects.map((project, index) => {
          // Calculate parallax scale target based on position in stack
          const targetScale = 1 - ((projects.length - index) * 0.04);
          const range = [index * (1 / projects.length), 1];
          
          return (
            <StickyCard 
              key={project.id} 
              project={project} 
              index={index} 
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
            />
          );
        })}
      </div>
      
      {/* =========================================
          TECH STACK SECTION
      ========================================= */}
      <div className="techstack-section">
        <motion.div
          className="techstack-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="techstack-label">stack/03</span>
          <motion.span 
            className="techstack-line" 
            initial={{ scaleX: 0 }} 
            whileInView={{ scaleX: 1 }} 
            transition={{ duration: 1, ease: "easeOut" }} 
            style={{ transformOrigin: "left" }} 
          />
        </motion.div>

        <motion.h3
          className="techstack-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.04, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          TECH <span className="dim">STACK.</span>
        </motion.h3>

        <div className="techstack-grid">
          {techStack.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              className="techstack-category"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: groupIndex * 0.04, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <span className="techstack-category-label">{group.category}</span>
              <div className="techstack-items">
                {group.items.map((item, i) => (
                  <motion.span
                    key={i}
                    className="techstack-item"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="techstack-icon">{item.icon}</span>
                    {item.label}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
