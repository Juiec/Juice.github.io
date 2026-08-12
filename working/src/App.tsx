import {
  useState,
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
} from "react"

// ─── Faint grid background ───────────────────────────────────────────────────
function GridBackground() {
  const [hovering, setHovering] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const mask = `radial-gradient(circle at ${cursor.x}px ${cursor.y}px, #000 80px, transparent 140px)`

  const base: CSSProperties = {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
    backgroundImage:
      "linear-gradient(rgba(17,17,16,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,16,0.06) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  }
  const hover: CSSProperties = {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
    backgroundImage:
      "linear-gradient(rgba(17,17,16,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,16,0.14) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    opacity: hovering ? 1 : 0,
    maskImage: mask,
    WebkitMaskImage: mask,
    transition: "opacity 0.2s",
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      onPointerEnter={() => setHovering(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setHovering(false)}
    >
      <div style={base} />
      <div style={hover} />
    </div>
  )
}

// ─── 3D Wireframe Cube ───────────────────────────────────────────────────────
function WireframeCube() {
  const faces = ["front", "back", "left", "right", "top", "bottom"]
  return (
    <div className="wireframe-scene" style={{ width: 320, height: 320, position: "relative" }}>
      {[
        { top: "8%", left: "10%", delay: "0s" },
        { top: "15%", right: "12%", delay: "0.8s" },
        { bottom: "18%", left: "8%", delay: "1.4s" },
        { bottom: "10%", right: "15%", delay: "0.4s" },
        { top: "40%", left: "4%", delay: "1.8s" },
        { top: "30%", right: "6%", delay: "1.1s" },
      ].map((s, i) => (
        <span key={i} className="star" style={{ ...(s as CSSProperties), animationDelay: s.delay }}>✦</span>
      ))}
      <div className="wireframe-orbit" style={{ width: 360, height: 130, animation: "orbit-a 8s linear infinite" }} />
      <div className="wireframe-orbit" style={{ width: 300, height: 110, animation: "orbit-b 14s linear infinite", opacity: 0.5 }} />
      <div className="wireframe-cube" style={{ marginTop: 20 }}>
        {faces.map((f) => (
          <div key={f} className={`wireframe-face face-${f}`}>
            <div className="face-inner">
              {Array.from({ length: 9 }).map((_, i) => <span key={i} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Navigation ──────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const links = ["About", "Projects", "Skills", "Contact"]

  return (
    <nav
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        width: "min(860px, calc(100% - 32px))",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderRadius: 14,
        border: "1px solid rgba(17,17,16,0.08)",
        boxShadow: scrolled
          ? "0 8px 32px rgba(17,17,16,0.12), 0 2px 8px rgba(17,17,16,0.06)"
          : "0 2px 16px rgba(17,17,16,0.08)",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
        transition: "box-shadow 0.3s",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: "-0.02em",
        }}
      >
        Learning Designer
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              color: "#6b6b68",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: 8,
              transition: "color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              ;(e.target as HTMLElement).style.color = "#111110"
              ;(e.target as HTMLElement).style.background =
                "rgba(17,17,16,0.05)"
            }}
            onMouseLeave={(e) => {
              ;(e.target as HTMLElement).style.color = "#6b6b68"
              ;(e.target as HTMLElement).style.background = "transparent"
            }}
          >
            {l}
          </a>
        ))}
        <a
          href="#contact"
          style={{
            marginLeft: 4,
            background: "#111110",
            color: "#f8f8f6",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 600,
            padding: "8px 18px",
            borderRadius: 9,
            textDecoration: "none",
            transition: "background 0.2s, transform 0.15s",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            ;(e.target as HTMLElement).style.background = "#2a2a28"
          }}
          onMouseLeave={(e) => {
            ;(e.target as HTMLElement).style.background = "#111110"
          }}
        >
          Contact
        </a>
      </div>
    </nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        alignItems: "center",
        padding: "100px 64px 64px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6b6b68",
            marginBottom: 24,
          }}
        >
          Machine Learning Engineer
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(52px,6vw,84px)",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: "0 0 24px",
            color: "#111110",
          }}
        >
          Bridging AI
          <br />
          with{" "}
          <span
            style={{
              fontWeight: 600,
              fontStyle: "italic",
              position: "relative",
              display: "inline-block",
            }}
          >
            Education
            <span
              style={{
                position: "absolute",
                bottom: 4,
                left: 0,
                right: 0,
                height: 10,
                background: "#e8ff5a",
                zIndex: -1,
                borderRadius: 2,
                transform: "skewX(-4deg)",
              }}
            />
          </span>
          <br />& Technology.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.7,
            color: "#6b6b68",
            maxWidth: 380,
            marginBottom: 40,
          }}
        >
          Deploying trustworthy AI systems for EdTech and Computer Vision.
          Practical solutions for real-world impact.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <a
            href="#projects"
            style={{
              background: "#111110",
              color: "#f8f8f6",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 600,
              padding: "12px 28px",
              borderRadius: 10,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.background = "#2a2a28")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.background = "#111110")
            }
          >
            View work
          </a>
          <a
            href="#contact"
            style={{
              background: "transparent",
              color: "#111110",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 500,
              padding: "12px 28px",
              borderRadius: 10,
              textDecoration: "none",
              border: "1.5px solid rgba(17,17,16,0.2)",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.borderColor =
                "rgba(17,17,16,0.6)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.borderColor =
                "rgba(17,17,16,0.2)")
            }
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  const stats = [
    { value: "CUHK", label: "B.Sc. Learning Design" },
    { value: "EdTech", label: "AI Literacy Focus" },
    { value: "CV", label: "Computer Vision" },
    { value: "Deploy", label: "Production Ready" },
  ]

  return (
    <section
      id="about"
      style={{ padding: "100px 64px", maxWidth: 1200, margin: "0 auto" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6b6b68",
              marginBottom: 16,
            }}
          >
            About
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px,4vw,52px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: "0 0 24px",
              color: "#111110",
            }}
          >
            Building at the
            <br />
            <em>intersection</em> of
            <br />
            AI and Education.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.75,
              color: "#6b6b68",
              marginBottom: 16,
            }}
          >
            I am a Machine Learning Engineer specializing in Educational
            Technology. My work bridges technical engineering with pedagogical
            theory.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.75,
              color: "#6b6b68",
              margin: 0,
            }}
          >
            I build deployable AI solutions that are practical, explainable, and
            usable. My focus is on system reliability and responsible AI
            adoption.
          </p>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {stats.map((s) => (
            <div
              key={s.value}
              style={{
                background: "#ffffff",
                border: "1px solid rgba(17,17,16,0.08)",
                borderRadius: 14,
                padding: "28px 24px",
                boxShadow: "0 1px 4px rgba(17,17,16,0.04)",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 24px rgba(17,17,16,0.1)"
                ;(e.currentTarget as HTMLElement).style.transform =
                  "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  "0 1px 4px rgba(17,17,16,0.04)"
                ;(e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)"
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 48,
                  fontWeight: 600,
                  color: "#111110",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "#6b6b68",
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const projects = [
    {
      title: "Trust-Based Writing Toolkit",
      year: "2025",
      desc: "A non-punitive AI writing declaration toolkit to promote responsible authorship. Focuses on AI literacy and academic integrity.",
      tech: ["FYP", "AI Literacy", "React"],
      tag: "EdTech",
    },
    {
      title: "Smart Smoking Detection",
      year: "2024",
      desc: "Real-time detection using YOLOE-26 and MediaPipe pose estimation. Reduces false positives via temporal verification logic.",
      tech: ["Python", "YOLOE", "OpenCV"],
      tag: "Computer Vision",
    },
    {
      title: "Figure Skating AI",
      year: "2024",
      desc: "AI-assisted judging system using YOLO for detection and VideoPose3D for 2D-to-3D skeleton reconstruction.",
      tech: ["Python", "VideoPose3D", "YOLO"],
      tag: "Research",
    },
  ]

  return (
    <section
      id="projects"
      style={{ padding: "100px 64px", maxWidth: 1200, margin: "0 auto" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 48,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6b6b68",
              marginBottom: 12,
            }}
          >
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px,4vw,52px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              margin: 0,
              color: "#111110",
            }}
          >
            Projects
          </h2>
        </div>
        <a
          href="#contact"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "#6b6b68",
            textDecoration: "none",
            borderBottom: "1px solid rgba(17,17,16,0.2)",
            paddingBottom: 2,
          }}
        >
          All projects →
        </a>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {projects.map((p) => (
          <article
            key={p.title}
            style={{
              background: "#ffffff",
              border: "1px solid rgba(17,17,16,0.08)",
              borderRadius: 16,
              padding: "32px 28px",
              boxShadow: "0 1px 4px rgba(17,17,16,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: 0,
              cursor: "pointer",
              transition: "box-shadow 0.25s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.boxShadow =
                "0 12px 40px rgba(17,17,16,0.12)"
              ;(e.currentTarget as HTMLElement).style.transform =
                "translateY(-3px)"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.boxShadow =
                "0 1px 4px rgba(17,17,16,0.04)"
              ;(e.currentTarget as HTMLElement).style.transform =
                "translateY(0)"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6b6b68",
                  background: "rgba(17,17,16,0.05)",
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                {p.tag}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "#6b6b68",
                }}
              >
                {p.year}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "#111110",
                margin: "0 0 12px",
              }}
            >
              {p.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "#6b6b68",
                margin: "0 0 24px",
                flexGrow: 1,
              }}
            >
              {p.desc}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#111110",
                    border: "1px solid rgba(17,17,16,0.15)",
                    padding: "3px 10px",
                    borderRadius: 100,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  const categories = [
    {
      label: "Engineering",
      skills: [
        "Python",
        "PyTorch",
        "TensorFlow",
        "React",
        "Tailwind CSS",
        "Node.js",
      ],
    },
    {
      label: "Computer Vision",
      skills: ["YOLO", "YOLOE", "MediaPipe", "OpenCV", "VideoPose3D", "NumPy"],
    },
    {
      label: "Infrastructure",
      skills: ["NVIDIA Jetson", "Edge AI", "Git", "Docker", "Linux", "QA"],
    },
  ]

  return (
    <section
      id="skills"
      style={{ padding: "100px 64px", maxWidth: 1200, margin: "0 auto" }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#6b6b68",
          marginBottom: 12,
        }}
      >
        Capabilities
      </p>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px,4vw,52px)",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          margin: "0 0 56px",
          color: "#111110",
        }}
      >
        Skills
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {categories.map((cat) => (
          <div
            key={cat.label}
            style={{ display: "flex", alignItems: "flex-start", gap: 40 }}
          >
            <div style={{ width: 120, flexShrink: 0, paddingTop: 6 }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6b6b68",
                }}
              >
                {cat.label}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cat.skills.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#111110",
                    border: "1.5px solid rgba(17,17,16,0.15)",
                    padding: "7px 16px",
                    borderRadius: 100,
                    background: "#ffffff",
                    transition: "background 0.15s, border-color 0.15s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background =
                      "#111110"
                    ;(e.currentTarget as HTMLElement).style.color = "#f8f8f6"
                    ;(e.currentTarget as HTMLElement).style.borderColor =
                      "#111110"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background =
                      "#ffffff"
                    ;(e.currentTarget as HTMLElement).style.color = "#111110"
                    ;(e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(17,17,16,0.15)"
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const socials = [
    { label: "GitHub", handle: "github.com/you", href: "#" },
    { label: "LinkedIn", handle: "linkedin.com/in/you", href: "#" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section
      id="contact"
      style={{ padding: "100px 64px 140px", maxWidth: 1200, margin: "0 auto" }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#6b6b68",
          marginBottom: 12,
        }}
      >
        Let's talk
      </p>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px,4vw,52px)",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          margin: "0 0 64px",
          color: "#111110",
        }}
      >
        Get in touch
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        {/* Social links */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.75,
              color: "#6b6b68",
              marginBottom: 40,
              maxWidth: 340,
            }}
          >
            I am available for ML Engineering roles in EdTech and Computer
            Vision.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  paddingBottom: 20,
                  borderBottom: "1px solid rgba(17,17,16,0.08)",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.opacity = "0.6")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.opacity = "1")
                }
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#6b6b68",
                      marginBottom: 2,
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      color: "#111110",
                    }}
                  >
                    {s.handle}
                  </div>
                </div>
                <span style={{ fontSize: 16, color: "#111110" }}>↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div>
          {sent ? (
            <div
              style={{
                background: "#ffffff",
                border: "1px solid rgba(17,17,16,0.08)",
                borderRadius: 16,
                padding: "48px 40px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>✦</div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 400,
                  color: "#111110",
                  margin: "0 0 12px",
                }}
              >
                Message sent.
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "#6b6b68",
                }}
              >
                I'll be in touch shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 32 }}
            >
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#6b6b68",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Name
                </label>
                <input
                  className="underline-input"
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#6b6b68",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Email
                </label>
                <input
                  className="underline-input"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#6b6b68",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Message
                </label>
                <textarea
                  className="underline-input"
                  required
                  placeholder="Tell me about your project..."
                  rows={4}
                  style={{ resize: "none" }}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                />
              </div>
              <button
                type="submit"
                style={{
                  background: "#111110",
                  color: "#f8f8f6",
                  border: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 600,
                  padding: "14px 32px",
                  borderRadius: 10,
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "#2a2a28")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "#111110")
                }
              >
                Send message →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(17,17,16,0.08)",
        padding: "24px 64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 16,
          fontWeight: 600,
          color: "#111110",
        }}
      >
        Portfolio
      </span>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: "#6b6b68",
        }}
      >
        © 2026 — ML Engineer
      </span>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
// ─── Scrolling cube fixed background ─────────────────────────────────────────
function ScrollingCube() {
  const [smoothProgress, setSmoothProgress] = useState(0)
  const rawProgress = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 800
      rawProgress.current = Math.min(window.scrollY / (vh * 0.7), 1)
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    const tick = () => {
      setSmoothProgress(prev => {
        const next = prev + (rawProgress.current - prev) * 0.07
        return Math.abs(next - rawProgress.current) < 0.0001 ? rawProgress.current : next
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Ease in-out cubic for smoother feel
  const eased = smoothProgress < 0.5
    ? 4 * smoothProgress ** 3
    : 1 - (-2 * smoothProgress + 2) ** 3 / 2

  const scale = 1 + eased * 2.6
  const opacity = 1 - eased * 0.88

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: "-12%",
        width: "54%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 0,
        transform: `scale(${scale})`,
        opacity,
        transformOrigin: "center center",
        willChange: "transform, opacity",
      }}
    >
      <WireframeCube />
    </div>
  )
}

export default function App() {
  return (
    <div
      style={{
        background: "#f8f8f6",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <GridBackground />
      <ScrollingCube />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
