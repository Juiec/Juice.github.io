import { useBreakpoint } from "../hooks/useBreakpoint"
import Eyebrow from "./Eyebrow"
import SectionHeading from "./SectionHeading"

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

export default function Skills() {
  const { sm, md: isMobile } = useBreakpoint()
  return (
    <section
      id="skills"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: isMobile ? "auto" : "clamp(760px, 92vh, 980px)",
        padding: sm ? "72px 20px 100px" : isMobile ? "90px 28px 100px" : "100px 64px 64px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
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
