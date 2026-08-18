import { useState } from "react"
import { useBreakpoint } from "../hooks/useBreakpoint"
import Eyebrow from "./Eyebrow"
import SectionHeading from "./SectionHeading"

export default function Mission() {
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
        minHeight: isMobile ? "auto" : "clamp(520px, 72vh, 760px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: sm ? "72px 20px 100px" : isMobile ? "90px 28px 100px" : "100px 64px 64px",
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
          <SectionHeading style={{ lineHeight: 1.1, margin: "0 0 20px", fontSize: "clamp(2.3rem, 3vw, 4rem)" }}>
            Building at the <em>intersection</em>
            {" "}of AI and Education.
          </SectionHeading>
          <p style={{ fontSize: "clamp(15px, 1.2vw, 16px)", lineHeight: 1.8, color: "#6b6b68", margin: 0 }}>
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
                  <div className="font-display" style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", fontWeight: 400, letterSpacing: "-0.01em", marginBottom: 4 }}>
                    {e.degree}
                  </div>
                  <div style={{ fontSize: "clamp(0.8rem, 0.9vw, 0.875rem)", color: "#6b6b68", marginBottom: 14 }}>{e.institution}</div>
                  <p style={{ fontSize: "clamp(0.875rem, 1vw, 0.9375rem)", lineHeight: 1.75, color: "#6b6b68", margin: "0 0 16px", maxWidth: 560 }}>
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
                <div className="font-display" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.2rem)", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                  {f.area}
                </div>
                <p style={{ fontSize: "clamp(0.8125rem, 0.95vw, 0.875rem)", lineHeight: 1.75, color: "#6b6b68", margin: 0, flexGrow: 1 }}>
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
                  <div className="font-display" style={{ fontSize: "clamp(1.1rem, 1.7vw, 1.4rem)", fontWeight: 400, letterSpacing: "-0.01em", marginBottom: 3 }}>
                    {ex.role}
                  </div>
                  <div style={{ fontSize: "clamp(0.8rem, 0.9vw, 0.875rem)", color: "#6b6b68", marginBottom: 10 }}>{ex.org}</div>
                  <p style={{ fontSize: "clamp(0.8125rem, 0.95vw, 0.875rem)", lineHeight: 1.75, color: "#6b6b68", margin: 0, maxWidth: 560 }}>
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
