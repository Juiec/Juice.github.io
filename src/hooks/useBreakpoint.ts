import { useEffect, useState } from "react"

export function useBreakpoint() {
  const get = () => ({
    sm: typeof window !== "undefined" ? window.innerWidth <= 480 : false,
    md: typeof window !== "undefined" ? window.innerWidth <= 768 : false,
    lg: typeof window !== "undefined" ? window.innerWidth <= 1024 : false,
    short: typeof window !== "undefined" ? window.innerHeight <= 950 : false,
  })

  const [bp, setBp] = useState(get)

  useEffect(() => {
    const fn = () => setBp(get())
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }, [])

  return bp
}

export function useMobile() {
  return useBreakpoint().md
}
