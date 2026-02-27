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
    <nav
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isTransparent
          ? "bg-transparent/60 backdrop-blur border-white/10"
          : "bg-background/95 backdrop-blur border-border supports-[backdrop-filter]:bg-background/60"
      }`}
      data-transparent={isTransparent}
    >
      {children}
    </nav>
  )
}
