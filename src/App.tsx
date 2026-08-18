import {
  useState,
  useEffect,
  useRef,
  Fragment,
  type CSSProperties,
  type PointerEvent,
} from "react"

// ─── Responsive hooks ────────────────────────────────────────────────────────
function useBreakpoint() {
  const get = () => ({
    sm: window.innerWidth <= 480,   // phone portrait
    md: window.innerWidth <= 768,   // phone landscape / small tablet
    lg: window.innerWidth <= 1024,  // tablet
  })
  const [bp, setBp] = useState(get)
  useEffect(() => {
    const fn = () => setBp(get())
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }, [])
  return bp
}

function useMobile() {
  return useBreakpoint().md
}

// ─── Shared UI atoms ─────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

function SectionHeading({
  children,
  style,
}: {
  children: React.ReactNode
  style?: CSSProperties
}) {
  return (
    <h2 className="section-heading" style={style}>
      {children}
    </h2>
  )
}

function FormLabel({ children }: { children: React.ReactNode }) {
  return <label className="form-label">{children}</label>
}

// ─── Grid background ─────────────────────────────────────────────────────────
function GridBackground() {
  const [hovering, setHovering] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const mask = `radial-gradient(circle at ${cursor.x}px ${cursor.y}px, #000 80px, transparent 140px)`

  const shared: CSSProperties = {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
    backgroundSize: "40px 40px",
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      onPointerEnter={() => setHovering(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setHovering(false)}
    >
      <div
        style={{
          ...shared,
          backgroundImage:
            "linear-gradient(rgba(17,17,16,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,16,0.06) 1px, transparent 1px)",
        }}
      />
      <div
        style={{
          ...shared,
          backgroundImage:
            "linear-gradient(rgba(17,17,16,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,16,0.14) 1px, transparent 1px)",
          opacity: hovering ? 1 : 0,
          maskImage: mask,
          WebkitMaskImage: mask,
          transition: "opacity 0.2s",
        }}
      />
    </div>
  )
}

// ─── 3D Wireframe Cube ───────────────────────────────────────────────────────
function WireframeCube() {
  const faces = ["front", "back", "left", "right", "top", "bottom"]
  const stars = [
    { top: "8%",    left: "10%",  delay: "0s"   },
    { top: "15%",  right: "12%",  delay: "0.8s" },
    { bottom: "18%", left: "8%", delay: "1.4s" },
    { bottom: "10%", right: "15%", delay: "0.4s" },
    { top: "40%",   left: "4%",   delay: "1.8s" },
    { top: "30%",  right: "6%",   delay: "1.1s" },
  ]

  return (
    <div className="wireframe-scene" style={{ width: 384, height: 384, position: "relative" }}>
      {stars.map(({ delay, ...pos }, i) => (
        <span key={i} className="star" style={{ ...(pos as CSSProperties), animationDelay: delay }}>
          ✦
        </span>
      ))}
      <div className="wireframe-orbit" style={{ width: 624, height: 228, animation: "orbit-a 8s linear infinite" }} />
      <div className="wireframe-orbit" style={{ width: 528, height: 192, animation: "orbit-b 14s linear infinite", opacity: 0.5 }} />
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
function Nav({ onLogoClick, activeSection }: { onLogoClick?: () => void; activeSection?: number }) {
  const { sm, md: isMobile } = useBreakpoint()
  const [scrolled, setScrolled] = useState(false)
  const [pill, setPill] = useState<{ left: number; width: number; height: number; top: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // index aligns with SNAP_SECTIONS: hero=0, mission=1, projects=2, skills=3, contact=4
  const links = [
    { label: "About",    href: "#mission",  icon: "◉", sectionIdx: 1 },
    { label: "Projects", href: "#projects", icon: "□", sectionIdx: 2 },
    { label: "Skills",   href: "#skills",   icon: "△", sectionIdx: 3 },
    { label: "Contact",  href: "#contact",  icon: "✦", sectionIdx: 4 },
  ]

  useEffect(() => {
    const activeIdx = links.findIndex(l => l.sectionIdx === activeSection)
    if (activeIdx === -1) { setPill(null); return }
    const el = linkRefs.current[activeIdx]
    const container = containerRef.current
    if (!el || !container) return
    const er = el.getBoundingClientRect()
    const cr = container.getBoundingClientRect()
    setPill({ left: er.left - cr.left, width: er.width, height: er.height, top: er.top - cr.top })
  }, [activeSection])

  if (isMobile) {
    return (
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(17,17,16,0.08)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          minHeight: 72,
        }}
      >
        {links.map((link) => {
          const isActive = activeSection === link.sectionIdx
          return (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                textDecoration: "none",
                fontSize: 11,
                fontWeight: 500,
                color: isActive ? "#111110" : "#9b9b98",
                transition: "color 0.2s",
                flex: 1,
                paddingTop: 12,
                paddingBottom: 10,
                minHeight: 68,
              }}
            >
              <span style={{
                fontSize: 20,
                opacity: isActive ? 1 : 0.4,
                transition: "opacity 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                transform: isActive ? "scale(1.15)" : "scale(1)",
                display: "block",
              }}>
                {link.icon}
              </span>
              <span>{link.label}</span>
            </a>
          )
        })}
      </nav>
    )
  }

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
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "box-shadow 0.3s",
      }}
    >
      <button
        onClick={onLogoClick}
        className="font-display"
        style={{
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: "-0.02em",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: "inherit",
        }}
      >
        Learning Designer
      </button>

      <div ref={containerRef} style={{ display: "flex", alignItems: "center", gap: 4, position: "relative" }}>
        {/* sliding pill */}
        {pill && (
          <div
            style={{
              position: "absolute",
              top: pill.top,
              left: pill.left,
              width: pill.width,
              height: pill.height,
              background: "#111110",
              borderRadius: 8,
              transition: "left 0.38s cubic-bezier(0.34,1.56,0.64,1), width 0.38s cubic-bezier(0.34,1.56,0.64,1)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
        )}
        {links.map((link, idx) => {
          const isActive = activeSection === link.sectionIdx
          return (
            <a
              key={link.label}
              ref={el => { linkRefs.current[idx] = el }}
              href={link.href}
              style={{
                color: isActive ? "#f8f8f6" : "#6b6b68",
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                position: "relative",
                zIndex: 1,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = "#111110"
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = "#6b6b68"
              }}
            >
              {link.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const { sm, md: isMobile } = useBreakpoint()
  return (
    <section
      id="hero"
      style={{
        minHeight: "100svh",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        alignItems: "center",
        padding: sm ? "72px 20px 100px" : isMobile ? "90px 28px 100px" : "100px 64px 64px",
        maxWidth: 1200,
        margin: "0 auto",
        textAlign: isMobile ? "center" : "left",
      }}
    >
      <div>
        <Eyebrow>Machine Learning Engineer • Learning Designer</Eyebrow>
        <h1
          className="font-display"
          style={{
            fontSize: sm ? "clamp(34px,10vw,52px)" : isMobile ? "clamp(38px,8vw,60px)" : "clamp(36px,6vw,84px)",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: "0 0 20px",
            wordWrap: "break-word",
          }}
        >
          Bridging AI
          <br />
          with{" "}
          <span style={{ fontWeight: 600, fontStyle: "italic", position: "relative", display: "inline-block" }}>
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
            fontSize: sm ? 15 : 17,
            lineHeight: 1.7,
            color: "#6b6b68",
            maxWidth: isMobile ? "100%" : 380,
            marginBottom: sm ? 28 : 40,
            marginInline: isMobile ? "auto" : undefined,
          }}
        >
          I build AI systems that are practical, explainable, and designed for
          real educational environments. My work spans AI literacy, computer
          vision, and human-centered design.
        </p>
        <div
          style={{
            display: "flex",
            gap: sm ? 8 : 12,
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "center",
          }}
        >
          <a href="#projects" className="btn-primary" style={{ width: isMobile ? "100%" : "auto", textAlign: "center" }}>
            View work
          </a>
          <a href="#contact" className="btn-outline" style={{ width: isMobile ? "100%" : "auto", textAlign: "center" }}>
            Read Research
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Mission ─────────────────────────────────────────────────────────────────
function Mission() {
  const { sm, md: isMobile } = useBreakpoint()
  const [tab, setTab] = useState(0)

  const tabs = ["Education", "Focus", "Experience"]

  const education = [
    {
      period: "2022 – 2026",
      degree: "B.Sc. Learning Design & Technology",
      institution: "Chinese University of Hong Kong (CUHK)",
      detail: "Final-year project on AI writing declaration toolkits. Coursework spans educational technology, AI literacy, learning analytics, and instructional design.",
      tags: ["AI Literacy", "EdTech", "Learning Analytics"],
    },
  ]

  const focus = [
    {
      area: "Machine Learning Engineering",
      icon: "◈",
      desc: "Building production-grade CV pipelines with YOLO, MediaPipe, and PyTorch. Emphasis on real-time inference, edge deployment, and system reliability.",
      tags: ["Python", "PyTorch", "YOLO", "Edge AI"],
    },
    {
      area: "EdTech & AI Literacy",
      icon: "◉",
      desc: "Designing tools and curricula that help students and educators engage with AI responsibly. Focus on transparency, non-punitive frameworks, and explainability.",
      tags: ["Curriculum Design", "React", "Responsible AI"],
    },
    {
      area: "Human-Centred Design",
      icon: "△",
      desc: "Grounding AI systems in user needs through iterative prototyping, usability testing, and context-aware design — particularly in educational environments.",
      tags: ["UX Research", "Prototyping", "Accessibility"],
    },
  ]

  const experience = [
    {
      period: "2026 — Present",
      role: "AI Engineer",
      org: "Autonomous Patrolling Project",
      type: "Contract",
      desc: "Developing an autonomous patrolling system integrating YOLO-based detection with edge AI hardware. Responsible for the full CV pipeline and deployment.",
    },
    {
      period: "2024 — 2025",
      role: "Computer Vision Researcher",
      org: "Figure Skating AI Project",
      type: "Research",
      desc: "Built an AI-assisted judging system using VideoPose3D for 3D skeleton reconstruction and YOLO for athlete detection across broadcast footage.",
    },
    {
      period: "2024",
      role: "CV Engineer",
      org: "Smart Smoking Detection",
      type: "Project",
      desc: "Implemented real-time smoking detection using YOLOE-26 and MediaPipe pose estimation with temporal verification to reduce false positives.",
    },
  ]

  return (
    <section
      id="mission"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: sm ? "96px 20px 80px" : isMobile ? "100px 32px 100px" : "128px 64px 120px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "35fr 65fr",
        gap: isMobile ? 48 : 64,
        alignItems: "start",
      }}>

        {/* ── Left: heading + intro ── */}
        <div style={{ position: isMobile ? "static" : "sticky", top: 100, paddingBottom: isMobile ? 4 : 0 }}>
          <Eyebrow>About me</Eyebrow>
          <SectionHeading style={{ lineHeight: 1.1, margin: "0 0 20px" }}>
            Building at the <em>intersection</em>
            {" "}of AI and Education.
          </SectionHeading>
          <p style={{ fontSize: sm ? 15 : 16, lineHeight: 1.8, color: "#6b6b68", margin: 0 }}>
            The challenge isn't whether people use AI — it's helping them use it responsibly,
            transparently, and effectively. I build deployable systems that sit at that boundary.
          </p>
        </div>

        {/* ── Right: tabs + panels ── */}
        <div>

      {/* Tab row */}
      <div style={{
        display: "flex",
        gap: 0,
        borderBottom: "1px solid rgba(17,17,16,0.10)",
        marginBottom: sm ? 32 : 40,
        overflowX: "auto",
      }}>
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              background: "none",
              border: "none",
              borderBottom: tab === i ? "2px solid #111110" : "2px solid transparent",
              marginBottom: -1,
              padding: sm ? "12px 18px" : "14px 28px",
              fontSize: sm ? 13 : 14,
              fontWeight: 500,
              color: tab === i ? "#111110" : "#9b9b98",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "color 0.18s, border-color 0.18s",
              letterSpacing: "0.02em",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div style={{ minHeight: sm ? 280 : 320 }}>

        {/* ── Education ── */}
        {tab === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 0, animation: "tab-in 0.22s ease" }}>
            {education.map((e) => (
              <div
                key={e.degree}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "160px 1fr",
                  gap: isMobile ? 12 : 40,
                  padding: sm ? "24px 0" : "32px 0",
                  borderBottom: "1px solid rgba(17,17,16,0.08)",
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", color: "#9b9b98", textTransform: "uppercase" }}>
                    {e.period}
                  </div>
                </div>
                <div>
                  <div className="font-display" style={{ fontSize: sm ? 20 : 24, fontWeight: 400, letterSpacing: "-0.01em", marginBottom: 4 }}>
                    {e.degree}
                  </div>
                  <div style={{ fontSize: 14, color: "#6b6b68", marginBottom: 14 }}>{e.institution}</div>
                  <p style={{ fontSize: sm ? 14 : 15, lineHeight: 1.75, color: "#6b6b68", margin: "0 0 16px", maxWidth: 560 }}>
                    {e.detail}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {e.tags.map((tag) => (
                      <span key={tag} style={{ fontSize: 12, fontWeight: 500, border: "1px solid rgba(17,17,16,0.14)", padding: "3px 10px", borderRadius: 100 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Focus ── */}
        {tab === 1 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
              gap: isMobile ? 0 : 1,
              border: "1px solid rgba(17,17,16,0.10)",
              animation: "tab-in 0.22s ease",
            }}
          >
            {focus.map((f, idx) => (
              <div
                key={f.area}
                style={{
                  padding: sm ? "24px 20px" : "32px 28px",
                  borderRight: isMobile ? "none" : idx < focus.length - 1 ? "1px solid rgba(17,17,16,0.10)" : "none",
                  borderBottom: isMobile && idx < focus.length - 1 ? "1px solid rgba(17,17,16,0.10)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <span style={{ fontSize: 22, lineHeight: 1 }}>{f.icon}</span>
                <div className="font-display" style={{ fontSize: sm ? 17 : 19, fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                  {f.area}
                </div>
                <p style={{ fontSize: sm ? 13 : 14, lineHeight: 1.75, color: "#6b6b68", margin: 0, flexGrow: 1 }}>
                  {f.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {f.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 11, fontWeight: 500, border: "1px solid rgba(17,17,16,0.12)", padding: "2px 9px", borderRadius: 100 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Experience ── */}
        {tab === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 0, animation: "tab-in 0.22s ease" }}>
            {experience.map((ex, i) => (
              <div
                key={ex.role + ex.org}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "160px 1fr",
                  gap: isMobile ? 10 : 40,
                  padding: sm ? "24px 0" : "28px 0",
                  borderBottom: "1px solid rgba(17,17,16,0.08)",
                  borderTop: i === 0 ? "1px solid rgba(17,17,16,0.08)" : "none",
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", color: "#9b9b98", textTransform: "uppercase", marginBottom: 4 }}>
                    {ex.period}
                  </div>
                  <span style={{
                    display: "inline-block",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#6b6b68",
                    background: "rgba(17,17,16,0.05)",
                    padding: "2px 8px",
                    borderRadius: 4,
                  }}>
                    {ex.type}
                  </span>
                </div>
                <div>
                  <div className="font-display" style={{ fontSize: sm ? 18 : 22, fontWeight: 400, letterSpacing: "-0.01em", marginBottom: 3 }}>
                    {ex.role}
                  </div>
                  <div style={{ fontSize: 14, color: "#6b6b68", marginBottom: 10 }}>{ex.org}</div>
                  <p style={{ fontSize: sm ? 13 : 14, lineHeight: 1.75, color: "#6b6b68", margin: 0, maxWidth: 560 }}>
                    {ex.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>{/* end tab panels */}
        </div>{/* end right column */}
      </div>{/* end split grid */}
    </section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const { sm, md: isMobile, lg: isTablet } = useBreakpoint()
  const [showAll, setShowAll] = useState(false)

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
    {
      title: "AI-Powered Autonomous Patrolling",
      year: "2026",
      desc: "Autonomous AI patrolling system integrating computer vision and edge AI.",
      tech: ["Python", "YOLO", "Edge AI"],
      tag: "Computer Vision",
    },
    {
      title: "Another Project",
      year: "2024",
      desc: "Project description.",
      tech: ["React", "TypeScript"],
      tag: "Development",
    },
  ]

  const cols = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)"
  const collapsedHeight = sm ? 640 : isMobile ? 760 : isTablet ? 500 : 380

  return (
    <section
      id="projects"
      style={{
        padding: sm ? "60px 20px" : isMobile ? "80px 32px" : "100px 64px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: isMobile ? "stretch" : "flex-end",
          marginBottom: isMobile ? 28 : 48,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 16 : 12,
        }}
      >
        <div>
          <Eyebrow>Selected Work</Eyebrow>
          <SectionHeading style={{ margin: 0 }}>Projects</SectionHeading>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            fontSize: 13,
            color: "#6b6b68",
            background: "none",
            border: "1px solid rgba(17,17,16,0.15)",
            borderRadius: 8,
            cursor: "pointer",
            padding: isMobile ? "12px 0" : "8px 16px",
            width: isMobile ? "100%" : "auto",
            letterSpacing: "0.02em",
          }}
        >
          {showAll ? "Show Less ↑" : "All Projects →"}
        </button>
      </div>

      <div
        style={{
          maxHeight: showAll ? "2000px" : `${collapsedHeight}px`,
          overflow: "hidden",
          transition: "max-height 0.8s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          className="projects-grid"
          style={{ gridTemplateColumns: cols }}
        >
          {projects.map((p, index) => {
            const hidden = !showAll && index >= 3
            return (
              <article
                key={p.title}
                className="card"
                style={{
                  borderRadius: 16,
                  padding: sm ? "24px 20px" : "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  opacity: hidden ? 0 : 1,
                  transform: hidden ? "translateY(40px)" : "translateY(0)",
                  pointerEvents: hidden ? "none" : "auto",
                  transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(17,17,16,0.12)"
                  e.currentTarget.style.transform = hidden ? "translateY(40px)" : "translateY(-3px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 4px rgba(17,17,16,0.04)"
                  e.currentTarget.style.transform = hidden ? "translateY(40px)" : "translateY(0)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span
                    style={{
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
                  <span style={{ fontSize: 13, color: "#6b6b68" }}>{p.year}</span>
                </div>

                <h3
                  className="font-display"
                  style={{ fontSize: sm ? 18 : 22, fontWeight: 400, letterSpacing: "-0.01em", margin: "0 0 12px" }}
                >
                  {p.title}
                </h3>

                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6b6b68", margin: "0 0 24px", flexGrow: 1 }}>
                  {p.desc}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
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
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Skills marquee ───────────────────────────────────────────────────────────
function SkillMarquee() {
  const rows = [
    { items: ["Python", "PyTorch", "TensorFlow", "React", "Tailwind", "Node.js", "TypeScript"], cls: "marquee-left" },
    { items: ["YOLO", "MediaPipe", "OpenCV", "VideoPose3D", "Edge AI", "Computer Vision", "YOLOE"], cls: "marquee-right" },
    { items: ["AI Literacy", "Learning Design", "EdTech", "Research", "Human-Centered AI", "Responsible AI"], cls: "marquee-left-slow" },
    { items: ["PyTorch", "NumPy", "Pandas", "FastAPI", "Docker", "Linux", "Git"], cls: "marquee-right-slow" },
    { items: ["Curriculum Design", "Explainability", "Prototyping", "UX Research", "Figma", "Accessibility", "Ethics"], cls: "marquee-left" },
  ]

  return (
    <div className="skills-marquee">
      {rows.map(({ items, cls }, ri) => (
        <div key={ri} className={`marquee-track ${cls}`}>
          {[...items, ...items, ...items].map((skill, i) => (
            <div key={i} className="marquee-item">
              <span className="skill-word">{skill}</span>
              <span className="skill-dot">•</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function Skills() {
  const { sm, md: isMobile } = useBreakpoint()
  return (
    <section
      id="skills"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100svh",
        padding: sm ? "36px 0 48px" : isMobile ? "48px 0 56px" : "64px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: sm ? "0 20px" : isMobile ? "0 24px" : "0 64px",
          marginBottom: isMobile ? 32 : 36,
          width: "100%",
        }}
      >
        <Eyebrow>Capabilities</Eyebrow>
        <SectionHeading>Skills</SectionHeading>
      </div>
      <SkillMarquee />
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const { sm, md: isMobile, lg: isTablet } = useBreakpoint()

  const socials = [
    { label: "GitHub",   handle: import.meta.env.VITE_GITHUB_HANDLE,   href: import.meta.env.VITE_GITHUB_URL },
    { label: "LinkedIn", handle: import.meta.env.VITE_LINKEDIN_HANDLE, href: import.meta.env.VITE_LINKEDIN_URL },
  ]

  const actions = [
    {
      label: "Email Me",
      description: import.meta.env.VITE_EMAIL,
      href: `mailto:${import.meta.env.VITE_EMAIL}`,
      icon: "✉",
    },
    {
      label: "WhatsApp Chat",
      description: import.meta.env.VITE_WHATSAPP_NUMBER,
      href: import.meta.env.VITE_WHATSAPP_URL,
      icon: "◎",
    },
    {
      label: "Download Resume",
      description: "PDF · Updated Aug 2026",
      href: import.meta.env.VITE_RESUME_PATH,
      icon: "↓",
      download: true,
    },
  ]

  const inkLine = (
    <svg width="100%" height="10" viewBox="0 0 400 10" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
      <path
        d="M0,5 C25,3.2 55,7 95,4.8 C135,2.6 165,7.4 210,5.2 C255,3 285,7.6 325,4.6 C358,2.2 382,6.2 400,5"
        stroke="rgba(17,17,16,0.22)"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <section
      id="contact"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Main content */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        padding: sm ? "60px 20px 48px" : isMobile ? "80px 32px 48px" : "100px 64px 56px",
      }}>
        <Eyebrow>Let's talk</Eyebrow>
        <SectionHeading style={{ margin: sm ? "0 0 36px" : "0 0 56px" }}>Get in touch</SectionHeading>

        <div
          className="contact-grid"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 36 : isTablet ? 48 : 80,
            alignItems: "start",
          }}
        >
          {/* Left — intro + social links */}
          <div>
            <p style={{ fontSize: sm ? 14 : 16, lineHeight: 1.8, color: "#6b6b68", marginBottom: sm ? 28 : 40, maxWidth: 360 }}>
              Currently open to ML Engineering roles in EdTech and Computer Vision.
              If you're building something in that space, I'd love to hear about it.
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {socials.map((s, i) => (
                <Fragment key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textDecoration: "none",
                      padding: sm ? "16px 0" : "20px 0",
                      transition: "opacity 0.18s",
                      color: "inherit",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.5")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  >
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6b68", marginBottom: 2 }}>
                        {s.label}
                      </div>
                      <div style={{ fontSize: sm ? 13 : 15 }}>{s.handle}</div>
                    </div>
                    <span style={{ fontSize: 13, opacity: 0.45 }}>↗</span>
                  </a>
                  {inkLine}
                </Fragment>
              ))}
            </div>
          </div>

          {/* Right — action cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {actions.map((a) => (
              <a
                key={a.label}
                href={a.href}
                {...(a.download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
                className="action-card"
                style={{ padding: sm ? "20px 20px" : "28px 24px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1, opacity: 0.35 }}>
                    {a.icon}
                  </span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 2 }}>{a.label}</div>
                    <div style={{ fontSize: 13, color: "#6b6b68" }}>{a.description}</div>
                  </div>
                </div>
                <span style={{ fontSize: 14, opacity: 0.35, flexShrink: 0 }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer — ink line full-width, text near edges */}
      <div>
        {inkLine}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          padding: sm ? "14px 20px 20px" : "16px 32px 24px",
        }}>
          <span className="font-display" style={{ fontSize: 15, fontWeight: 600 }}>Portfolio</span>
          <span style={{ fontSize: 12, color: "#6b6b68" }}>© 2026 — ML Engineer</span>
        </div>
      </div>
    </section>
  )
}

// ─── Scrolling cube ───────────────────────────────────────────────────────────
function ScrollingCube() {
  const isMobile = useMobile()
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
      setSmoothProgress((prev) => {
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

  const eased =
    smoothProgress < 0.5
      ? 4 * smoothProgress ** 3
      : 1 - (-2 * smoothProgress + 2) ** 3 / 2

  const scale = 1 + eased * 2.6
  const opacity = isMobile ? 0 : 1.0 - eased * 0.77
  const translateX = -8 + eased * 30

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: isMobile ? "80%" : "54%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 0,
        transform: `translateX(${translateX}%) scale(${scale})`,
        opacity,
        transformOrigin: "center center",
        willChange: "transform, opacity",
      }}
    >
      <WireframeCube />
    </div>
  )
}

// ─── Scroll snap engine ───────────────────────────────────────────────────────
const SNAP_SECTIONS = ["hero", "mission", "projects", "skills", "contact"]

function playSnap() {
  try {
    type AC = typeof AudioContext
    const Ctx: AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: AC }).webkitAudioContext
    const ctx = new Ctx()
    const now = ctx.currentTime

    // Soft sine thump — low, padded, gentle
    const osc = ctx.createOscillator(); osc.type = "sine"
    osc.frequency.setValueAtTime(200, now)
    osc.frequency.exponentialRampToValueAtTime(85, now + 0.14)
    const oscG = ctx.createGain()
    oscG.gain.setValueAtTime(0, now)
    oscG.gain.linearRampToValueAtTime(0.28, now + 0.006)
    oscG.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
    osc.connect(oscG); oscG.connect(ctx.destination)
    osc.start(now); osc.stop(now + 0.2)

    // Airy high shimmer — barely audible breath
    const shimmer = ctx.createOscillator(); shimmer.type = "sine"; shimmer.frequency.value = 1100
    const shimG = ctx.createGain()
    shimG.gain.setValueAtTime(0, now)
    shimG.gain.linearRampToValueAtTime(0.04, now + 0.004)
    shimG.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
    shimmer.connect(shimG); shimG.connect(ctx.destination)
    shimmer.start(now); shimmer.stop(now + 0.12)

    setTimeout(() => ctx.close(), 400)
  } catch {}
}

function useScrollSnap(onSection: (i: number) => void): (idx: number) => void {
  const cbRef = useRef(onSection)
  useEffect(() => { cbRef.current = onSection })

  const goToRef = useRef<(idx: number) => void>(() => {})

  useEffect(() => {
    let busy = false
    let touchStartY = 0

    function tops() {
      return SNAP_SECTIONS.map((id) => {
        const el = document.getElementById(id)
        return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : 0
      })
    }

    function currentIndex() {
      const t = tops()
      const mid = window.scrollY + window.innerHeight * 0.35
      let idx = 0
      for (let i = 0; i < t.length; i++) if (mid >= t[i]) idx = i
      return idx
    }

    function springTo(targetY: number, onDone: () => void) {
      let pos = window.scrollY
      let vel = 0
      const k = 310, b = 27
      let last: number | null = null

      function step(t: number) {
        if (last === null) { last = t; requestAnimationFrame(step); return }
        const dt = Math.min((t - last) / 1000, 0.05)
        last = t
        vel += (-k * (pos - targetY) - b * vel) * dt
        pos += vel * dt
        window.scrollTo(0, Math.max(0, pos))
        if (Math.abs(vel) > 0.8 || Math.abs(pos - targetY) > 0.8) {
          requestAnimationFrame(step)
        } else {
          window.scrollTo(0, targetY)
          onDone()
        }
      }
      requestAnimationFrame(step)
    }

    function goTo(idx: number) {
      if (busy) return
      if (idx < 0 || idx >= SNAP_SECTIONS.length) return
      busy = true
      cbRef.current(idx) // update nav immediately so pill slides before spring settles
      playSnap()
      springTo(tops()[idx], () => { busy = false })
    }

    goToRef.current = goTo

    function atEdge(dir: "down" | "up") {
      const idx = currentIndex()
      const el = document.getElementById(SNAP_SECTIONS[idx])
      if (!el) return true
      const sectionTop = tops()[idx]
      const sectionBottom = sectionTop + el.offsetHeight
      const pad = 6
      if (dir === "down") return window.scrollY + window.innerHeight >= sectionBottom - pad
      return window.scrollY <= sectionTop + pad
    }

    function onWheel(e: WheelEvent) {
      if (busy) return
      if (e.deltaY > 0 && atEdge("down")) {
        e.preventDefault()
        goTo(currentIndex() + 1)
      } else if (e.deltaY < 0 && atEdge("up")) {
        e.preventDefault()
        goTo(currentIndex() - 1)
      }
      // otherwise: don't preventDefault → browser scrolls within the section normally
    }

    function onTouchStart(e: TouchEvent) { touchStartY = e.touches[0].clientY }
    function onTouchEnd(e: TouchEvent) {
      if (busy) return
      const dy = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(dy) < 50) return
      if (dy > 0 && atEdge("down")) goTo(currentIndex() + 1)
      else if (dy < 0 && atEdge("up")) goTo(currentIndex() - 1)
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  return (idx: number) => goToRef.current(idx)
}

const SECTION_LABELS = ["Intro", "About", "Projects", "Skills", "Contact"]

function SectionDots({ active }: { active: number }) {
  const isMobile = useMobile()
  if (isMobile) return null
  return (
    <div
      style={{
        position: "fixed",
        right: 28,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        zIndex: 200,
      }}
    >
      {SNAP_SECTIONS.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={SECTION_LABELS[i]}
          onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView() }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              display: "block",
              width: i === active ? 7 : 4,
              height: i === active ? 7 : 4,
              borderRadius: "50%",
              background: i === active ? "#111110" : "rgba(17,17,16,0.22)",
              transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow: i === active ? "0 0 0 2px rgba(17,17,16,0.12)" : "none",
            }}
          />
        </a>
      ))}
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const isMobile = useMobile()
  const [activeSection, setActiveSection] = useState(0)
  const snapTo = useScrollSnap(setActiveSection)

  // Update nav only after scrolling stops (covers nav-link clicks and logo click)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const update = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const distances = SNAP_SECTIONS.map((id) => {
          const el = document.getElementById(id)
          return el ? Math.abs(el.getBoundingClientRect().top) : Infinity
        })
        setActiveSection(distances.indexOf(Math.min(...distances)))
      }, 60)
    }
    window.addEventListener("scroll", update, { passive: true })
    return () => {
      window.removeEventListener("scroll", update)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div style={{ background: "#f8f8f6", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <GridBackground />
      <ScrollingCube />
      <SectionDots active={activeSection} />
      <div style={{ position: "relative", zIndex: 1, paddingBottom: isMobile ? "calc(72px + env(safe-area-inset-bottom, 0px))" : 0 }}>
        <Nav onLogoClick={() => snapTo(0)} activeSection={activeSection} />
        <Hero />
        <Mission />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  )
}
