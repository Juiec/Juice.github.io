import type { CSSProperties } from "react"

export default function SectionHeading({
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
