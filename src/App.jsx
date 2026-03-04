import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const SKILLS = {
  "Languages": [
    { name: "Java", level: 90 },
    { name: "Python", level: 72 },
  ],
  "Web": [
    { name: "HTML", level: 88 }, { name: "CSS", level: 85 },
    { name: "JavaScript", level: 82 }, { name: "React", level: 80 },
  ],
  "Frameworks": [
    { name: "Spring Boot", level: 87 },
    { name: "Hibernate", level: 80 },
    { name: "Flask", level: 70 },
  ],
  "Database": [{ name: "MySQL", level: 85 }],
  "Tools": [
    { name: "Git/GitHub", level: 85 },
    { name: "Postman", level: 80 },
    { name: "OpenKM", level: 75 },
  ],
  "IDEs": [
    { name: "VS Code", level: 90 },
    { name: "Eclipse", level: 82 },
    { name: "IntelliJ IDEA", level: 78 },
  ],
  "Technologies": [
    { name: "OCR", level: 75 },
    { name: "ICR", level: 70 },
  ],
};

const EXPERIENCES = [
  {
    role: "Software Developer",
    company: "Aryan Imaging and Business Consultancy",
    period: "Current",
    current: true,
    points: [
      "Building scalable backend systems using Java, Spring Boot, and Python Flask",
      "Developing and maintaining RESTful APIs for document and imaging workflows",
      "Working with OpenKM Document Management System for digital document storage, retrieval, and workflow automation",
      "Implementing OCR (Optical Character Recognition) and ICR (Intelligent Character Recognition) pipelines to extract and process text from scanned documents and handwritten forms",
      "Collaborating with cross-functional teams on product features and system integrations",
    ],
  },
  {
    role: "Research and Development Intern",
    company: "NetSpaceIndia, Nashik",
    period: "Jul 2024 – Sep 2024",
    current: false,
    points: ["Developed backend modules using Java and Spring technologies", "Analyzed system requirements and designed scalable components", "Optimized business logic and database queries", "Participated in debugging, testing, and system improvement"],
  },
  {
    role: "Web Development Intern",
    company: "Cognifront, Nashik",
    period: "Jan 2024 – Feb 2024",
    current: false,
    points: ["Developed responsive web pages using HTML, CSS, and JavaScript", "Built UI components following modern design standards", "Worked on API integration and frontend-backend communication", "Performed cross-browser testing and UI improvements"],
  },
];

const PROJECTS = [
  {
    title: "FinCrime Detection System",
    description: "A rule-based financial transaction monitoring system to detect suspicious and fraudulent activities with behavioral and threshold analysis.",
    tech: ["Java", "Spring Boot", "MySQL", "React"],
    icon: "🛡️",
    gradient: "from-red-500/20 to-orange-500/20",
    border: "border-red-500/30",
    accent: "#ef4444",
  },
  {
    title: "Product Management API",
    description: "RESTful API supporting full CRUD operations with layered architecture, Hibernate ORM, request validation, and global exception handling.",
    tech: ["Java", "Spring Boot", "Hibernate", "MySQL", "Postman"],
    icon: "⚡",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    accent: "#3b82f6",
  },
  {
    title: "Bookio",
    description: "A responsive online book-selling UI with interactive components, Bootstrap grid, and full mobile compatibility.",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    icon: "📚",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    accent: "#10b981",
  },
];

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ children, className = "", delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useScrollReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = () => {
      start += 2;
      if (start >= value) { setCount(value); return; }
      setCount(start);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, value]);
  return <span ref={ref}>{count}</span>;
}

const TypeWriter = ({ texts, accent = "#4ade80" }) => {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[idx];
    const timeout = setTimeout(() => {
      if (!del) {
        setDisplay(cur.slice(0, char + 1));
        if (char + 1 === cur.length) { setTimeout(() => setDel(true), 1500); }
        else setChar(c => c + 1);
      } else {
        setDisplay(cur.slice(0, char - 1));
        if (char - 1 === 0) { setDel(false); setIdx(i => (i + 1) % texts.length); setChar(0); }
        else setChar(c => c - 1);
      }
    }, del ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [display, del, char, idx, texts]);
  return <span>{display}<span style={{ color: accent, animation: "blink 1s step-end infinite" }}>|</span></span>;
};

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [dark, setDark] = useState(true);

  // Theme tokens
  const t = dark ? {
    bg:          "#0a0a0f",
    bgAlt:       "rgba(255,255,255,0.01)",
    text:        "#e8e8f0",
    textMuted:   "rgba(232,232,240,0.6)",
    textFaint:   "rgba(232,232,240,0.4)",
    accent:      "#4ade80",        // light green
    accentDim:   "rgba(74,222,128,0.15)",
    accentBorder:"rgba(74,222,128,0.3)",
    accentGlow:  "rgba(74,222,128,0.4)",
    border:      "rgba(255,255,255,0.06)",
    borderHover: "rgba(74,222,128,0.3)",
    card:        "rgba(255,255,255,0.02)",
    navBg:       "rgba(10,10,15,0.95)",
    gridLine:    "rgba(74,222,128,0.03)",
    orb1:        "rgba(74,222,128,0.07)",
    orb2:        "rgba(59,130,246,0.05)",
    codeColor1:  "rgba(74,222,128,0.18)",
    codeColor2:  "rgba(59,130,246,0.18)",
    tagBg:       "rgba(255,255,255,0.04)",
    tagBorder:   "rgba(255,255,255,0.09)",
    infoBg:      "rgba(74,222,128,0.04)",
    infoBorder:  "rgba(74,222,128,0.12)",
    infoLeft:    "rgba(74,222,128,0.5)",
    inputBg:     "rgba(255,255,255,0.04)",
    inputBorder: "rgba(255,255,255,0.08)",
    footerBorder:"rgba(255,255,255,0.06)",
    footerText:  "rgba(232,232,240,0.2)",
    btnPrimaryBg:"linear-gradient(135deg, #4ade80, #22c55e)",
    btnPrimaryColor: "#0a0a0f",
    tlLine:      "#4ade80",
  } : {
    bg:          "#f8fff8",
    bgAlt:       "#edfaed",
    text:        "#0d1f0d",
    textMuted:   "rgba(13,31,13,0.65)",
    textFaint:   "rgba(13,31,13,0.4)",
    accent:      "#16a34a",        // parrot green
    accentDim:   "rgba(22,163,74,0.1)",
    accentBorder:"rgba(22,163,74,0.35)",
    accentGlow:  "rgba(22,163,74,0.35)",
    border:      "rgba(13,31,13,0.1)",
    borderHover: "rgba(22,163,74,0.4)",
    card:        "rgba(255,255,255,0.7)",
    navBg:       "rgba(248,255,248,0.95)",
    gridLine:    "rgba(22,163,74,0.05)",
    orb1:        "rgba(22,163,74,0.08)",
    orb2:        "rgba(134,239,172,0.15)",
    codeColor1:  "rgba(22,163,74,0.2)",
    codeColor2:  "rgba(22,163,74,0.12)",
    tagBg:       "rgba(22,163,74,0.06)",
    tagBorder:   "rgba(22,163,74,0.18)",
    infoBg:      "rgba(22,163,74,0.05)",
    infoBorder:  "rgba(22,163,74,0.18)",
    infoLeft:    "#16a34a",
    inputBg:     "rgba(255,255,255,0.8)",
    inputBorder: "rgba(22,163,74,0.2)",
    footerBorder:"rgba(13,31,13,0.08)",
    footerText:  "rgba(13,31,13,0.3)",
    btnPrimaryBg:"linear-gradient(135deg, #16a34a, #15803d)",
    btnPrimaryColor: "#ffffff",
    tlLine:      "#16a34a",
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://formspree.io/f/xwvngrpl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setFormSent(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormSent(false), 4000);
      }
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Mono', 'Courier New', monospace", background: t.bg, color: t.text, overflowX: "hidden", transition: "background 0.4s ease, color 0.4s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bebas+Neue&family=Playfair+Display:wght@700;900&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        
        .noise-bg::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
          opacity: 0.4;
        }
        
        .grid-bg {
          background-image: linear-gradient(${t.gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px);
          background-size: 60px 60px;
        }
        
        .glow-text { text-shadow: 0 0 40px ${t.accentGlow}, 0 0 80px ${t.accentGlow}; }
        
        .skill-bar { transition: width 1.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        
        .project-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .project-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 48px rgba(0,0,0,0.2);
        }

        .nav-link {
          position: relative;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: ${t.accent};
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        
        .btn-primary {
          background: ${t.btnPrimaryBg};
          color: ${t.btnPrimaryColor};
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          letter-spacing: 0.05em;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px ${t.accentGlow};
        }
        
        .btn-secondary {
          background: transparent;
          border: 1px solid ${t.accentBorder};
          color: ${t.accent};
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.05em;
        }
        .btn-secondary:hover {
          background: ${t.accentDim};
          border-color: ${t.accent};
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        .pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        
        .timeline-line {
          background: linear-gradient(to bottom, ${t.tlLine}, transparent);
        }
        
        .contact-input {
          background: ${t.inputBg};
          border: 1px solid ${t.inputBorder};
          color: ${t.text};
          outline: none;
          font-family: 'DM Mono', monospace;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .contact-input:focus {
          border-color: ${t.accentBorder};
          box-shadow: 0 0 0 3px ${t.accentDim};
        }
        
        .scanline::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.06) 2px,
            rgba(0,0,0,0.06) 4px
          );
          pointer-events: none;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Theme toggle button */
        .theme-toggle {
          background: ${t.accentDim};
          border: 1px solid ${t.accentBorder};
          color: ${t.accent};
          cursor: pointer;
          border-radius: 20px;
          padding: 0.35rem 0.9rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.2s;
          user-select: none;
        }
        .theme-toggle:hover {
          background: ${t.accentBorder};
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 2rem",
        background: scrolled ? t.navBg : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.accentBorder}` : "none",
        transition: "all 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px",
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.15em", color: t.accent, userSelect: "none", cursor: "default" }}>
          HRY
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link.toLowerCase())}
              className="nav-link"
              style={{ background: "none", border: "none", color: t.textMuted, cursor: "pointer", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {link}
            </button>
          ))}
          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={() => setDark(d => !d)}>
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="grid-bg noise-bg" style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "6rem 2rem 2rem",
      }}>
        <div style={{ position: "absolute", top: "20%", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, ${t.orb1} 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: "300px", height: "300px", borderRadius: "50%", background: `radial-gradient(circle, ${t.orb2} 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div className="floating" style={{ position: "absolute", top: "15%", left: "3%", fontSize: "0.65rem", color: t.codeColor1, fontFamily: "monospace", lineHeight: 1.8, userSelect: "none" }}>
          {`@RestController\npublic class ApiController {\n  @GetMapping("/api")\n  public Response get() {\n    return service.fetch();\n  }\n}`}
        </div>
        <div className="floating" style={{ position: "absolute", bottom: "20%", right: "3%", fontSize: "0.65rem", color: t.codeColor2, fontFamily: "monospace", lineHeight: 1.8, userSelect: "none", animationDelay: "3s" }}>
          {`const App = () => {\n  const [data] = useState();\n  return (\n    <div className="app">\n      {data.map(render)}\n    </div>\n  );\n}`}
        </div>

        <div style={{ textAlign: "center", maxWidth: "900px", position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: t.accent, marginBottom: "1.5rem", textTransform: "uppercase" }}>
            ◆ Available for opportunities ◆
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 10vw, 8rem)", lineHeight: 0.95, letterSpacing: "0.05em", marginBottom: "1rem" }}>
            <span style={{ display: "block", color: t.text }}>HEMANT</span>
            <span className="glow-text" style={{ display: "block", color: t.accent }}>RAM YADAV</span>
          </h1>

          <div style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: t.textMuted, margin: "1.5rem 0", minHeight: "2em" }}>
            <TypeWriter texts={["Java Full Stack Developer", "Spring Boot Engineer", "React Developer", "Backend Architect"]} accent={t.accent} />
          </div>

          <p style={{ fontSize: "0.9rem", color: t.textFaint, maxWidth: "560px", margin: "0 auto 3rem", lineHeight: 1.8, letterSpacing: "0.02em" }}>
            Building scalable backend systems and modern web applications using Java, Spring Boot, and React. Pune, Maharashtra.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("projects")} style={{ padding: "0.85rem 2rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px" }}>
              View Projects →
            </button>
            <a href="https://github.com/hemantyadav2804" target="_blank" rel="noreferrer">
              <button className="btn-secondary" style={{ padding: "0.85rem 2rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px" }}>
                GitHub Profile
              </button>
            </a>
            <button className="btn-secondary" onClick={() => scrollTo("contact")} style={{ padding: "0.85rem 2rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px" }}>
              Contact Me
            </button>
          </div>

          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", marginTop: "5rem", paddingTop: "3rem", borderTop: `1px solid ${t.border}` }}>
            {[
              { label: "Projects Built", value: 3 },
              { label: "Internships", value: 2 },
              { label: "Tech Skills", value: 15 },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", color: t.accent, lineHeight: 1 }}>
                  <AnimatedCounter value={stat.value} />+
                </div>
                <div style={{ fontSize: "0.65rem", color: t.textFaint, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.3rem" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: t.textFaint, marginBottom: "0.5rem", textTransform: "uppercase" }}>Scroll</div>
          <div style={{ width: "1px", height: "40px", background: `linear-gradient(to bottom, ${t.accent}, transparent)`, margin: "0 auto", animation: "float 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "8rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <RevealSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: t.accent, textTransform: "uppercase", marginBottom: "1rem" }}>// 01. About</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "0.05em", lineHeight: 1, marginBottom: "2rem", color: t.text, whiteSpace: "nowrap" }}>
                WHO AM <span style={{ color: t.accent }}>I?</span>
              </h2>
              <div style={{ width: "60px", height: "2px", background: t.accent, marginBottom: "2rem" }} />
              <p style={{ color: t.textMuted, lineHeight: 2, fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                I am a Computer Science Engineering graduate with strong experience in Java Full Stack Development. I specialize in building scalable backend systems using Spring Boot and developing modern frontend interfaces with React.
              </p>
              <p style={{ color: t.textMuted, lineHeight: 2, fontSize: "0.9rem", marginBottom: "2rem" }}>
                I have experience working on real-world applications, REST APIs, and database-driven systems. Currently working as a Software Developer at <span style={{ color: t.accent }}>Aryan Imaging and Business Consultancy</span>.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="mailto:hemantyadav5k@gmail.com">
                  <button className="btn-primary" style={{ padding: "0.7rem 1.5rem", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: "2px" }}>
                    📧 Email Me
                  </button>
                </a>
                <a href="https://linkedin.com/in/hemantyadav36" target="_blank" rel="noreferrer">
                  <button className="btn-secondary" style={{ padding: "0.7rem 1.5rem", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: "2px" }}>
                    LinkedIn →
                  </button>
                </a>
              </div>
            </div>
            <div>
              {[
                { icon: "📍", label: "Location", value: "Pune, Maharashtra, India" },
                { icon: "💼", label: "Status", value: "Software Developer @ Aryan Imaging" },
                { icon: "🎓", label: "Degree", value: "B.E. CS & Design, KKWCE — CGPA 7.96" },
                { icon: "📞", label: "Phone", value: "+91-8805211668" },
              ].map((info, i) => (
                <RevealSection key={info.label} delay={i * 100}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "1.2rem 1.5rem", marginBottom: "0.75rem",
                    background: t.card,
                    border: `1px solid ${t.border}`,
                    borderRadius: "4px",
                    borderLeft: `2px solid ${t.accent}`,
                  }}>
                    <span style={{ fontSize: "1.2rem" }}>{info.icon}</span>
                    <div>
                      <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: t.accent, textTransform: "uppercase", marginBottom: "0.2rem" }}>{info.label}</div>
                      <div style={{ fontSize: "0.82rem", color: t.text }}>{info.value}</div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "8rem 2rem", background: t.bgAlt, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <RevealSection>
            <div style={{ marginBottom: "4rem" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: t.accent, textTransform: "uppercase", marginBottom: "1rem" }}>// 02. Experience</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "0.05em", color: t.text }}>
                WORK <span style={{ color: t.accent }}>HISTORY</span>
              </h2>
            </div>
          </RevealSection>
          <div style={{ position: "relative" }}>
            <div className="timeline-line" style={{ position: "absolute", left: "16px", top: "8px", bottom: 0, width: "1px" }} />
            {EXPERIENCES.map((exp, i) => (
              <RevealSection key={i} delay={i * 150}>
                <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem", position: "relative" }}>
                  <div style={{ flexShrink: 0, marginTop: "6px" }}>
                    <div className={exp.current ? "pulse-dot" : ""} style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      background: exp.current ? t.accent : t.accentDim,
                      border: exp.current ? "none" : `1px solid ${t.accentBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.7rem", color: exp.current ? (dark ? "#0a0a0f" : "#fff") : t.accent,
                      position: "relative", zIndex: 1,
                    }}>
                      {exp.current ? "●" : "○"}
                    </div>
                  </div>
                  <div style={{
                    flex: 1, padding: "1.5rem 2rem",
                    background: t.card,
                    border: `1px solid ${exp.current ? t.accentBorder : t.border}`,
                    borderRadius: "4px",
                    borderLeft: `2px solid ${exp.current ? t.accent : t.border}`,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 500, color: exp.current ? t.accent : t.text, marginBottom: "0.25rem" }}>{exp.role}</h3>
                        <div style={{ fontSize: "0.8rem", color: t.textMuted }}>{exp.company}</div>
                      </div>
                      <span style={{
                        padding: "0.25rem 0.75rem", fontSize: "0.6rem", letterSpacing: "0.1em",
                        background: exp.current ? t.accentDim : t.card,
                        border: `1px solid ${exp.current ? t.accentBorder : t.border}`,
                        color: exp.current ? t.accent : t.textFaint,
                        borderRadius: "2px", whiteSpace: "nowrap",
                      }}>{exp.period}</span>
                    </div>
                    <ul style={{ paddingLeft: "1rem" }}>
                      {exp.points.map((pt, pi) => (
                        <li key={pi} style={{ fontSize: "0.8rem", color: t.textMuted, lineHeight: 1.8, marginBottom: "0.25rem" }}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "8rem 2rem", borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <RevealSection>
            <div style={{ marginBottom: "4rem" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: t.accent, textTransform: "uppercase", marginBottom: "1rem" }}>// 03. Skills</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "0.05em", color: t.text }}>
                TECHNICAL <span style={{ color: t.accent }}>ARSENAL</span>
              </h2>
            </div>
          </RevealSection>

          {[
            { label: "Languages",    items: ["Java", "Python"] },
            { label: "Web",          items: ["HTML", "CSS", "JavaScript", "React"] },
            { label: "Frameworks",   items: ["Spring Boot", "Hibernate", "Flask"] },
            { label: "Database",     items: ["MySQL"] },
            { label: "Tools",        items: ["Git / GitHub", "Postman", "OpenKM"] },
            { label: "IDEs",         items: ["VS Code", "Eclipse", "IntelliJ IDEA"] },
            { label: "Technologies", items: ["OCR", "ICR"] },
            { label: "Soft Skills",  items: ["Problem Solving", "Communication", "Teamwork", "Time Management"] },
          ].map((row, i) => (
            <RevealSection key={row.label} delay={i * 60}>
              <div style={{
                display: "flex", alignItems: "flex-start", gap: "2rem",
                padding: "1.25rem 0",
                borderBottom: `1px solid ${t.border}`,
              }}>
                <div style={{ minWidth: "130px", paddingTop: "0.3rem" }}>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: t.accent, textTransform: "uppercase" }}>
                    {row.label}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", flex: 1 }}>
                  {row.items.map(item => (
                    <span key={item} style={{
                      padding: "0.35rem 0.85rem",
                      fontSize: "0.75rem",
                      letterSpacing: "0.04em",
                      color: t.text,
                      background: t.tagBg,
                      border: `1px solid ${t.tagBorder}`,
                      borderRadius: "3px",
                      transition: "border-color 0.2s, color 0.2s",
                      cursor: "default",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = t.accentBorder; e.currentTarget.style.color = t.accent; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = t.tagBorder; e.currentTarget.style.color = t.text; }}
                    >{item}</span>
                  ))}
                </div>
              </div>
            </RevealSection>
          ))}

          <RevealSection delay={500}>
            <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {[
                { title: "OpenKM", desc: "Open-source Document Management System for storing, organizing, and retrieving digital documents. Supports workflows, version control, metadata tagging, and role-based access control." },
                { title: "OCR — Optical Character Recognition", desc: "Converts printed or typed text in scanned images and PDFs into machine-readable digital text. Used in document digitization, data extraction, and automated processing pipelines." },
                { title: "ICR — Intelligent Character Recognition", desc: "Extends OCR by recognizing handwritten text using machine learning. Adapts to varied handwriting styles — used in form processing, banking, healthcare, and government document automation." },
              ].map(info => (
                <div key={info.title} style={{
                  padding: "1.25rem 1.5rem",
                  background: t.infoBg,
                  border: `1px solid ${t.infoBorder}`,
                  borderLeft: `2px solid ${t.infoLeft}`,
                  borderRadius: "3px",
                }}>
                  <div style={{ fontSize: "0.62rem", color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>ℹ {info.title}</div>
                  <p style={{ fontSize: "0.75rem", color: t.textMuted, lineHeight: 1.75 }}>{info.desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "8rem 2rem", background: t.bgAlt, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <RevealSection>
            <div style={{ marginBottom: "4rem" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: t.accent, textTransform: "uppercase", marginBottom: "1rem" }}>// 04. Projects</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "0.05em", color: t.text }}>
                FEATURED <span style={{ color: t.accent }}>WORK</span>
              </h2>
            </div>
          </RevealSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {PROJECTS.map((proj, i) => (
              <RevealSection key={proj.title} delay={i * 120}>
                <div className="project-card" style={{
                  padding: "2rem",
                  background: t.card,
                  border: `1px solid ${t.border}`,
                  borderRadius: "4px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${proj.accent}, transparent)` }} />
                  <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", fontSize: "2rem", opacity: 0.2 }}>{proj.icon}</div>
                  <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{proj.icon}</div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 500, color: t.text, marginBottom: "0.75rem", letterSpacing: "0.02em" }}>{proj.title}</h3>
                  <p style={{ fontSize: "0.8rem", color: t.textMuted, lineHeight: 1.8, marginBottom: "1.5rem" }}>{proj.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    {proj.tech.map(tech => (
                      <span key={tech} style={{
                        padding: "0.25rem 0.6rem", fontSize: "0.6rem", letterSpacing: "0.08em",
                        background: `${proj.accent}18`, border: `1px solid ${proj.accent}40`,
                        color: proj.accent, borderRadius: "2px",
                      }}>{tech}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <a href="https://github.com/hemantyadav2804" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                      <button style={{
                        padding: "0.5rem 1rem", fontSize: "0.65rem", letterSpacing: "0.08em",
                        background: t.tagBg, border: `1px solid ${t.border}`,
                        color: t.textMuted, cursor: "pointer", borderRadius: "2px",
                        fontFamily: "inherit", textTransform: "uppercase",
                      }}>GitHub →</button>
                    </a>
                    <button style={{
                      padding: "0.5rem 1rem", fontSize: "0.65rem", letterSpacing: "0.08em",
                      background: "transparent", border: `1px solid ${t.border}`,
                      color: t.textFaint, cursor: "not-allowed", borderRadius: "2px",
                      fontFamily: "inherit", textTransform: "uppercase",
                    }}>Live Demo</button>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <RevealSection>
            <div style={{ marginBottom: "4rem" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: t.accent, textTransform: "uppercase", marginBottom: "1rem" }}>// 05. Education</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "0.05em", color: t.text }}>
                ACADEMIC <span style={{ color: t.accent }}>BACKGROUND</span>
              </h2>
            </div>
          </RevealSection>
          {[
            { degree: "Java Full Stack Developer Course", inst: "IT Prenuer, Pune", year: "2025–2026", detail: "Java, Spring Boot, Hibernate, HTML, CSS, React, JavaScript, MySQL", badge: "Certification" },
            { degree: "B.E. Computer Science and Design Engineering", inst: "K K Wagh College of Engineering, Nashik", year: "2021–2025", detail: "CGPA: 7.96", badge: "Bachelor's" },
            { degree: "Higher Secondary Certificate (12th)", inst: "K S K W College, Nashik", year: "2021", detail: "Percentage: 81.3%", badge: "HSC" },
            { degree: "Secondary School Certificate (10th)", inst: "K B H Vidyalaya, Nashik", year: "2019", detail: "Percentage: 77.4%", badge: "SSC" },
          ].map((edu, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div style={{
                display: "flex", gap: "1.5rem", marginBottom: "1.5rem",
                padding: "1.5rem 2rem",
                background: t.card,
                border: `1px solid ${t.border}`,
                borderRadius: "4px",
                position: "relative",
              }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "2px", background: i < 2 ? t.accent : t.accentBorder, borderRadius: "0 0 0 4px" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontSize: "0.95rem", color: t.text, fontWeight: 500 }}>{edu.degree}</h3>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ padding: "0.2rem 0.6rem", fontSize: "0.58rem", letterSpacing: "0.1em", background: t.accentDim, border: `1px solid ${t.accentBorder}`, color: t.accent, borderRadius: "2px", textTransform: "uppercase" }}>{edu.badge}</span>
                      <span style={{ fontSize: "0.7rem", color: t.textFaint }}>{edu.year}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: t.textMuted, marginBottom: "0.35rem" }}>{edu.inst}</div>
                  <div style={{ fontSize: "0.75rem", color: t.accent, opacity: 0.85 }}>{edu.detail}</div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "8rem 2rem", background: t.bgAlt, borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <RevealSection>
            <div style={{ marginBottom: "4rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: t.accent, textTransform: "uppercase", marginBottom: "1rem" }}>// 06. Contact</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "0.05em", color: t.text, marginBottom: "1rem" }}>
                LET'S <span style={{ color: t.accent }}>CONNECT</span>
              </h2>
              <p style={{ fontSize: "0.85rem", color: t.textMuted, letterSpacing: "0.02em" }}>
                Open to new opportunities and collaborations. Drop a message!
              </p>
            </div>
          </RevealSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
            <RevealSection>
              <div>
                {[
                  { icon: "📧", label: "Email", value: "hemantyadav5k@gmail.com", href: "mailto:hemantyadav5k@gmail.com" },
                  { icon: "📞", label: "Phone", value: "+91-8805211668", href: "tel:+918805211668" },
                  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/hemantyadav36", href: "https://linkedin.com/in/hemantyadav36" },
                  { icon: "🐙", label: "GitHub", value: "github.com/hemantyadav2804", href: "https://github.com/hemantyadav2804" },
                ].map(c => (
                  <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "1rem",
                      padding: "1rem 1.2rem", marginBottom: "0.75rem",
                      background: t.card, border: `1px solid ${t.border}`,
                      borderRadius: "4px", transition: "border-color 0.2s", cursor: "pointer",
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = t.accentBorder}
                      onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
                    >
                      <span style={{ fontSize: "1.1rem" }}>{c.icon}</span>
                      <div>
                        <div style={{ fontSize: "0.58rem", letterSpacing: "0.15em", color: t.accent, textTransform: "uppercase", marginBottom: "0.15rem" }}>{c.label}</div>
                        <div style={{ fontSize: "0.78rem", color: t.text }}>{c.value}</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </RevealSection>
            <RevealSection delay={150}>
              <div>
                {formSent ? (
                  <div style={{ padding: "3rem", textAlign: "center", background: t.accentDim, border: `1px solid ${t.accentBorder}`, borderRadius: "4px" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✅</div>
                    <div style={{ color: t.accent, fontSize: "0.9rem", letterSpacing: "0.05em" }}>Message sent successfully!</div>
                  </div>
                ) : (
                  <form onSubmit={handleForm}>
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.15em", color: t.textMuted, textTransform: "uppercase", marginBottom: "0.5rem" }}>Your Name</label>
                      <input className="contact-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "2px", fontSize: "0.85rem" }} />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.15em", color: t.textMuted, textTransform: "uppercase", marginBottom: "0.5rem" }}>Email Address</label>
                      <input type="email" className="contact-input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "2px", fontSize: "0.85rem" }} />
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.15em", color: t.textMuted, textTransform: "uppercase", marginBottom: "0.5rem" }}>Message</label>
                      <textarea className="contact-input" rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "2px", fontSize: "0.85rem", resize: "vertical" }} />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: "100%", padding: "0.9rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px" }}>
                      Send Message →
                    </button>
                  </form>
                )}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "2.5rem 2rem", borderTop: `1px solid ${t.footerBorder}`, textAlign: "center", background: t.bg }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.2em", color: t.accent, marginBottom: "1rem" }}>
          HEMANT RAM YADAV
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
          {[
            { label: "GitHub", href: "https://github.com/hemantyadav2804" },
            { label: "LinkedIn", href: "https://linkedin.com/in/hemantyadav36" },
            { label: "Email", href: "mailto:hemantyadav5k@gmail.com" },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
              style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: t.textFaint, textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = t.accent}
              onMouseLeave={e => e.target.style.color = t.textFaint}
            >{l.label}</a>
          ))}
        </div>
        <div style={{ fontSize: "0.65rem", color: t.footerText, letterSpacing: "0.08em" }}>
          © 2025 Hemant Ram Yadav — Java Full Stack Developer
        </div>
      </footer>
    </div>
  );
}
