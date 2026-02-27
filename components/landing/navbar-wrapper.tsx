"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

interface NavbarWrapperProps {
  children: React.ReactNode
}

export function NavbarWrapper({ children }: NavbarWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const isLandingPage = pathname === "/"
  const isTransparent = isLandingPage && !isScrolled

  useEffect(() => {
    if (!isLandingPage) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isLandingPage])

  return (
    <div data-transparent={isTransparent ? "true" : "false"} className="contents">
      {children}
    </div>
  )
}
