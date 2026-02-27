"use client"

import { useRef, useEffect, useState } from "react"

interface NavbarShellProps {
  children: (isTransparent: boolean) => React.ReactNode
}

export function NavbarShell({ children }: NavbarShellProps) {
  const navRef = useRef<HTMLElement>(null)
  const [isTransparent, setIsTransparent] = useState(false)

  useEffect(() => {
    const checkTransparency = () => {
      const wrapper = navRef.current?.closest("[data-transparent]")
      const value = wrapper?.getAttribute("data-transparent") === "true"
      setIsTransparent(value)
    }

    checkTransparency()

    const observer = new MutationObserver(checkTransparency)
    const wrapper = navRef.current?.closest("[data-transparent]")
    if (wrapper) {
      observer.observe(wrapper, { attributes: true, attributeFilter: ["data-transparent"] })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isTransparent
          ? "bg-transparent/60 backdrop-blur border-white/10"
          : "bg-background/95 backdrop-blur border-border supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      {children(isTransparent)}
    </nav>
  )
}
