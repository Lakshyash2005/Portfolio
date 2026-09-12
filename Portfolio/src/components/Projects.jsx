import { motion } from "framer-motion";
import { useState } from "react";
import "./Projects.css";

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
    title: "Ayush Academy",
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


export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section className="projects" id="projects">
      {/* Section Header */}
      <div className="projects-top">
        <span className="projects-label">projects/02</span>
        <span className="projects-line" />
      </div>

      <motion.div
        className="projects-heading-wrap"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="projects-heading">
          SELECTED <span className="dim">WORK.</span>
        </h2>
        <p className="projects-subheading">
          A curated collection of projects where design meets engineering.
        </p>
      </motion.div>

      {/* Project List */}
      <div className="projects-list">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className={`project-item ${activeProject === index ? "active" : ""}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            onMouseEnter={() => setActiveProject(index)}
            onMouseLeave={() => setActiveProject(null)}
          >
            {/* Top row: number + type + year */}
            <div className="project-meta-row">
              <span className="project-number">{project.id}</span>
              <span className="project-type">{project.type}</span>
              <span className="project-year">{project.year}</span>
            </div>

            {/* Title row */}
            <div className="project-title-row">
              <h3 className="project-title">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-title-link"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <span className="project-subtitle">{project.subtitle}</span>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-arrow"
                >
                  ↗
                </a>
              ) : (
                <span className="project-arrow">↗</span>
              )}
            </div>

            {/* Expandable content */}
            <motion.div
              className="project-expand"
              initial={false}
              animate={{
                height: activeProject === index ? "auto" : 0,
                opacity: activeProject === index ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="project-expand-inner">
                <p className="project-description">{project.description}</p>

                <div className="project-details">
                  <div className="project-work">
                    <span className="detail-label">KEY WORK</span>
                    <ul>
                      {project.work.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-tech">
                    <span className="detail-label">TECH STACK</span>
                    <div className="tech-tags">
                      {project.tech.map((t, i) => (
                        <span key={i} className="tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom separator line */}
            <div className="project-separator">
              <div className="separator-fill" />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
