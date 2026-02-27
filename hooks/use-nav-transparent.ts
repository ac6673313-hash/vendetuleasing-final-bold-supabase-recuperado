"use client"

import { useState, useEffect, useCallback } from "react"

/**
 * Hook that reads the `data-transparent` attribute from the closest <nav> ancestor.
 * Used by client components inside the navbar to know if the nav is transparent.
 */
export function useNavTransparent(ref: React.RefObject<HTMLElement | null>) {
  const [isTransparent, setIsTransparent] = useState(false)

  const check = useCallback(() => {
    if (!ref.current) return
    const nav = ref.current.closest("nav")
    const value = nav?.getAttribute("data-transparent") === "true"
    setIsTransparent(value)
  }, [ref])

  useEffect(() => {
    check()

    const nav = ref.current?.closest("nav")
    if (!nav) return

    const observer = new MutationObserver(check)
    observer.observe(nav, { attributes: true, attributeFilter: ["data-transparent"] })
    return () => observer.disconnect()
  }, [check, ref])

  return isTransparent
}
